/**
 * POST /api/assess
 * Body: { query: string }
 * Calls Gemini server-side so the API key never ships to the browser.
 * Set GEMINI_KEY as a secret in Cloudflare Pages: Settings → Environment variables → Encrypt.
 */
export async function onRequestPost(context) {
  try {
    const { query } = await context.request.json();
    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ error: "Missing query" }), { status: 400 });
    }

    const safeQuery = query.replace(/["`\\]/g, "").slice(0, 500);
    const key = context.env.GEMINI_KEY;
    if (!key) {
      return new Response(JSON.stringify({ error: "Service unavailable" }), { status: 503 });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: safeQuery }],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: "You are the Mykei Securities Technical Analyst. Provide a clinical security analysis regarding bulk-sweeping retail theft and ask for the user's monthly shrinkage rate. Maintain a professional, institutional tone.",
              },
            ],
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      return new Response(JSON.stringify({ error: "Upstream error" }), { status: 502 });
    }

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 });
  }
}
