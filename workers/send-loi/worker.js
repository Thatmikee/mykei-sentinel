// send-loi Cloudflare Worker — receives the Pilot.tsx LOI form submission,
// verifies the Turnstile token, checks the attachment is actually a small PDF,
// rate-limits by IP, and emails an internal notification (protocol@mykei.io,
// michael.e@mykei.io) with the signed PDF attached (via Resend). It does NOT
// email the retailer — the signed PDF the retailer sees is generated entirely
// client-side in src/pages/Pilot.tsx.
//
// Pulled from the live deployment via the Cloudflare API on 2026-07-31 and
// corrected for (see README.md for the full list):
//   1. Turnstile verified server-side: canonical form-urlencoded siteverify
//      request, 10s timeout, fails closed on any error, checks success,
//      the expected action ("pilot-loi", set client-side in Pilot.tsx), and
//      that the token's hostname actually belongs to this project.
//   2. All form fields HTML-escaped before the notification email; a
//      plain-text fallback is sent alongside the HTML body.
//   3. CORS restricted to mykei.io / www.mykei.io / *.mykei-sentinel.pages.dev.
//   4. Request size rejected via Content-Length BEFORE the body is parsed at
//      all; the PDF attachment is further checked for declared size, real
//      buffered size, and "%PDF-" magic bytes.
//   5. Per-IP rate limiting via a native Workers rate-limit binding.
//   6. Structured JSON logging + observability enabled in wrangler.toml.
//   7. Base64 encoding done in fixed-size chunks (avoids call-stack overflow
//      and O(n^2) string-concatenation cost at the size cap boundary).
//
// Required secrets (set via `wrangler secret put <NAME>` before deploying):
//   RESEND_API_KEY       — already configured on the live worker.
//   TURNSTILE_SECRET_KEY — set 2026-07-31; was previously missing entirely.

const ALLOWED_EXACT_ORIGINS = new Set([
  "https://mykei.io",
  "https://www.mykei.io",
  "https://mykei-sentinel.pages.dev",
]);
const ALLOWED_PREVIEW_ORIGIN = /^https:\/\/[a-z0-9-]+\.mykei-sentinel\.pages\.dev$/;

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5MB, a signed one-page LOI PDF is a few hundred KB
const MAX_BODY_BYTES = 7 * 1024 * 1024; // attachment cap + multipart/base64 overhead + other fields

function isAllowedOrigin(origin) {
  return ALLOWED_EXACT_ORIGINS.has(origin) || ALLOWED_PREVIEW_ORIGIN.test(origin);
}

function uint8ArrayToBase64(bytes) {
  const CHUNK_SIZE = 8192;
  const chunks = [];
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    chunks.push(String.fromCharCode(...bytes.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(chunks.join(""));
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
  if (isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function logError(message, fields) {
  console.error(JSON.stringify({ message, ...fields }));
}

const EXPECTED_TURNSTILE_ACTION = "pilot-loi";

async function verifyTurnstile(token, secretKey, remoteIp) {
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return false;

  let data;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
    });
    if (!res.ok) return false;
    data = await res.json();
  } catch (err) {
    // Network error, timeout, or non-JSON body from siteverify. Fail closed.
    return false;
  }

  if (!data.success) return false;
  if (data.action !== EXPECTED_TURNSTILE_ACTION) return false;
  // Defense in depth: the verified token should have been issued for one of
  // our own hostnames, not replayed from somewhere else.
  if (data.hostname && !(data.hostname === "mykei.io" || data.hostname === "www.mykei.io" || data.hostname.endsWith(".mykei-sentinel.pages.dev"))) {
    return false;
  }
  return true;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders(origin) });
    }

    // Reject clearly-oversized requests from Content-Length BEFORE parsing
    // the body at all, so we never buffer an attacker-controlled multipart
    // payload into memory just to find out it's too big.
    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ success: false, error: "Request too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";

    if (env.RATE_LIMITER) {
      const { success } = await env.RATE_LIMITER.limit({ key: clientIp });
      if (!success) {
        return new Response(
          JSON.stringify({ success: false, error: "Too many requests. Please try again shortly." }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
        );
      }
    }

    try {
      const formData = await request.formData();
      const pdfFile = formData.get("attachment");
      const fullName = formData.get("fullName") || "Not provided";
      const storeName = formData.get("storeName") || "Not provided";
      const email = formData.get("email") || "Not provided";
      const storeAddress = formData.get("storeAddress") || "";
      const phone = formData.get("phone") || "";
      const storeType = formData.get("storeType") || "";
      const theftLoss = formData.get("theftLoss") || "";
      const turnstileToken = formData.get("cf-turnstile-response");

      const turnstileOk = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, clientIp);
      if (!turnstileOk) {
        return new Response(
          JSON.stringify({ success: false, error: "Verification failed. Please retry the form." }),
          { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
        );
      }

      if (!pdfFile) {
        return new Response(JSON.stringify({ success: false, error: "No PDF file" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });
      }

      const declaredType = pdfFile.type || "";
      const declaredSize = typeof pdfFile.size === "number" ? pdfFile.size : 0;
      if (declaredType && declaredType !== "application/pdf") {
        return new Response(JSON.stringify({ success: false, error: "Attachment must be a PDF" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });
      }
      if (declaredSize > MAX_ATTACHMENT_BYTES) {
        return new Response(JSON.stringify({ success: false, error: "Attachment too large" }), {
          status: 413,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });
      }

      const pdfBuffer = await pdfFile.arrayBuffer();
      if (pdfBuffer.byteLength > MAX_ATTACHMENT_BYTES) {
        return new Response(JSON.stringify({ success: false, error: "Attachment too large" }), {
          status: 413,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });
      }
      // Real PDFs start with the "%PDF-" magic bytes; a renamed non-PDF file
      // (e.g. an .html or .exe with a spoofed content-type/filename) won't.
      const header = new Uint8Array(pdfBuffer.slice(0, 5));
      const headerText = String.fromCharCode(...header);
      if (headerText !== "%PDF-") {
        return new Response(JSON.stringify({ success: false, error: "Attachment is not a valid PDF" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });
      }

      // Convert file to base64 in chunks: avoids both a call-stack overflow
      // from spreading a huge typed array at once, and the O(n^2) cost of
      // building one string via repeated `+=` concatenation over every byte.
      const pdfBase64 = uint8ArrayToBase64(new Uint8Array(pdfBuffer));

      const safeFullName = escapeHtml(fullName);
      const safeStoreName = escapeHtml(storeName);
      const safeEmail = escapeHtml(email);
      const safePhone = escapeHtml(phone);
      const safeStoreAddress = escapeHtml(storeAddress);
      const safeStoreType = escapeHtml(storeType);
      const safeTheftLoss = escapeHtml(theftLoss);

      const emailHtml = `
        <h2>New Letter of Intent</h2>
        <p><strong>Retailer:</strong> ${safeFullName}</p>
        <p><strong>Store:</strong> ${safeStoreName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone || "&mdash;"}</p>
        <p><strong>Address:</strong> ${safeStoreAddress}</p>
        <p><strong>Store Type:</strong> ${safeStoreType}</p>
        <p><strong>Annual Theft Loss:</strong> &pound;${safeTheftLoss || "&mdash;"}</p>
        <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        <p>The signed LOI is attached.</p>
      `;

      // Plain-text fallback: some clients only render text/plain, and having
      // one improves spam-filter scoring versus an HTML-only message.
      const emailText = [
        "New Letter of Intent",
        `Retailer: ${fullName}`,
        `Store: ${storeName}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Address: ${storeAddress}`,
        `Store Type: ${storeType}`,
        `Annual Theft Loss: £${theftLoss || "-"}`,
        `Submitted: ${new Date().toISOString()}`,
        "The signed LOI is attached.",
      ].join("\n");

      // Reply-To must itself be a plausible email address, not raw attacker
      // input echoed back into an SMTP header. Reject obviously invalid values
      // rather than passing them through to Resend unchecked.
      const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Mykei Securities <protocol@mykei.io>",
          to: ["protocol@mykei.io", "michael.e@mykei.io"],
          ...(emailLooksValid ? { reply_to: email } : {}),
          subject: `New LOI: ${storeName} - ${fullName}`,
          html: emailHtml,
          text: emailText,
          attachments: [
            {
              filename: `LOI-${storeName.replace(/[^a-zA-Z0-9-]+/g, "-")}.pdf`,
              content: pdfBase64,
            },
          ],
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        logError("Resend error", { status: resendResponse.status, error });
        return new Response(JSON.stringify({ success: false, error: "Email service error" }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    } catch (err) {
      logError("Worker error", { error: err instanceof Error ? err.message : String(err) });
      return new Response(JSON.stringify({ success: false, error: "Internal error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }
  },
};
