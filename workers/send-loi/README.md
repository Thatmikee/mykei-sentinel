# send-loi worker

Receives the Pilot (`/pilot`) LOI form submission from mykei.io, verifies the
Turnstile token, checks the attachment is actually a small real PDF, rate
limits by IP, and emails an internal notification to `protocol@mykei.io` and
`michael.e@mykei.io` with the signed PDF attached (via Resend). It does
**not** email the retailer — the signed PDF the retailer sees is generated
entirely client-side in `src/pages/Pilot.tsx`.

## Why this exists as a repo now

Until 2026-07-31 this worker was deployed straight from the Cloudflare
dashboard with no git history anywhere. `worker.js` here was pulled from the
live deployment via the Cloudflare API and went through two review passes
(a manual security audit, then the `workers-best-practices`,
`turnstile-spin`, and `cloudflare-email-service` Cloudflare skills) that
found:

1. Turnstile token accepted from the client but never verified server-side at
   all (CAPTCHA bypassable by POSTing directly to the worker URL).
2. Once verification was added: wrong request shape (multipart instead of
   the canonical `application/x-www-form-urlencoded`), no check on the
   response's `action` field, no timeout on the siteverify call, and a parse
   error that could bypass the fail-closed behavior. `Pilot.tsx` was updated
   to send `action: "pilot-loi"` on the widget so the worker has something to
   check against.
3. Form fields interpolated into the notification email's HTML with no
   escaping (HTML/markup injection into a real, internally-read email); no
   plain-text fallback alongside the HTML body (hurts spam scoring and some
   clients only render text/plain).
4. `Access-Control-Allow-Origin: '*'` instead of the actual site origins
   (mykei.io, www.mykei.io, and *.mykei-sentinel.pages.dev previews).
5. No file-size or MIME/magic-byte check on the "PDF" attachment, and the
   size check that was added only ran *after* buffering the file into
   memory — Content-Length is now checked before the body is parsed at all.
6. No rate limiting — a verified, valid submission could still be replayed
   to burn Resend quota or flood the inbox.
7. No `observability` config and unstructured `console.error` logging.
8. The original attachment-to-base64 conversion built one string via
   repeated concatenation over every byte — effectively O(n^2), a real risk
   of hitting the Worker's CPU time limit near the size cap. Replaced with
   chunked encoding.

## Considered and deliberately not changed

Cloudflare has its own native Email Sending binding (`env.EMAIL.send()`, no
API key required) as an alternative to calling the Resend REST API directly.
Switching to it would mean onboarding mykei.io to a second email service and
reshaping this integration — a real architectural decision, not a bug fix,
so it wasn't done here. Worth considering separately if you want to drop the
Resend dependency.

## Before deploying

```
wrangler secret put RESEND_API_KEY        # copy from the existing live worker
wrangler secret put TURNSTILE_SECRET_KEY  # done 2026-07-31, from the Cloudflare
                                           # Turnstile dashboard, same widget as
                                           # the site key in Pilot.tsx
wrangler deploy
```

The `[[ratelimits]]` block and `[observability]` block in `wrangler.toml` are
picked up automatically on deploy. The worker code checks `env.RATE_LIMITER`
defensively, so it still works even before that binding is present.

`Pilot.tsx` was updated in this same session to send `action: "pilot-loi"` on
the Turnstile widget render — this worker's `EXPECTED_TURNSTILE_ACTION`
constant must match that value, or every real submission will be rejected.
