# Infrastructure audit — 2026-08-03

Checked live against `https://mykei.io/` via curl, and against `hstspreload.org`'s API. Not from repo code alone — these are the actual served headers/responses.

## 1. Content-Security-Policy — current state

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com https://cdn-cookieyes.com;
style-src 'self' 'unsafe-inline';
font-src 'self' data:;
img-src 'self' data: https:;
frame-src https://challenges.cloudflare.com;
connect-src 'self' https://www.google-analytics.com https://cdn-cookieyes.com https://log.cookieyes.com https://send-loi.michaelesema.workers.dev;
frame-ancestors 'none';
base-uri 'self';
form-action 'self' https://send-loi.michaelesema.workers.dev
```

This is the state AFTER this session's fixes (fonts self-hosted, so style-src/font-src no longer need Google; log.cookieyes.com added to connect-src to fix the 403). `region1.google-analytics.com` deliberately NOT added — GA4 stays CSP-blocked until CookieYes consent is verified working, which this session could not confirm (browser extension never connected).

## 2. access-control-allow-origin: * — FIXED 2026-08-10, was wrong that it needed dashboard access

```
access-control-allow-origin: *
```

Confirmed present on every response from `https://mykei.io/`, including this run's curl check. Grepped the entire repo for `Access-Control-Allow-Origin` — the only occurrence is in `workers/send-loi/worker.js:68`, which correctly reflects a specific validated origin, not a wildcard. This header is not set by `public/_headers`, not set by `functions/_middleware.js`, not set anywhere in git-tracked code.

**Correction, 2026-08-10:** this was fixable from the repo after all. Cloudflare Pages' `_headers` file supports an explicit removal directive — a line reading `! Access-Control-Allow-Origin` under the `/*` block strips a header injected by the platform default, without needing dashboard access. Added in commit `7a67fff`, confirmed live: a fresh `curl -I https://mykei.io/` after deploy shows no `access-control-allow-origin` header at all, while the rest of the header set (CSP, HSTS, X-XSS-Protection, etc.) is unchanged. The `send-loi` worker's own scoped CORS (`workers/send-loi/worker.js:68`) is untouched and still correctly reflects a specific validated origin, not a wildcard.

## 3. www → apex redirect — CONFIRMED WORKING

```
$ curl -I https://www.mykei.io/
HTTP/2 301
location: https://mykei.io/
```

Live and correct, shipped in this session's first commit (`fee1c95`).

## 4. HSTS preload — HEADER CLAIMS IT, DOMAIN IS NOT ACTUALLY ON THE LIST

Live header: `strict-transport-security: max-age=31536000; includeSubDomains; preload`

Checked against the actual Chrome/Firefox/Safari HSTS preload list via `hstspreload.org`'s API:

```json
{
  "name": "mykei.io",
  "status": "unknown",
  "bulk": false,
  "preloadedDomain": ""
}
```

`status: "unknown"` means mykei.io has never been submitted to the preload list, or the submission never completed. The header technically satisfies the *prerequisites* for submission (correct max-age, includeSubDomains, preload directive all present — hstspreload.org would likely accept a submission today), but sending the `preload` directive without actually being on the list is not itself harmful (browsers ignore it if you're not listed) — it's just not doing anything yet. It is not a security hole, but it is a claim gap: if any copy anywhere on the site or in materials asserts "HSTS preloaded" as a completed fact, that would be inaccurate. This session did not find such a claim in site copy, only the header itself.

**Action needed (not a code fix, an out-of-band step):** submit https://mykei.io to https://hstspreload.org/ directly. This is safe once the domain and all subdomains are confirmed to serve HTTPS correctly, which they appear to (www redirects to https apex correctly, no mixed content found this session).

## 5. CookieYes 403 — CORRECTED 2026-08-04: root cause is a dead client ID, not CSP

**Earlier entry in this document was wrong and is corrected here.** It previously claimed adding `log.cookieyes.com` to `connect-src` (commit `e309f5c`) "fixed the 403." That's not possible: CSP is browser-enforced and can only block a request the browser makes — it can never cause a third-party origin to return an HTTP 403. The `log.cookieyes.com` connect-src entry is still correct to have (it was a real gap) but it did not fix this issue.

**Actual root cause, confirmed 2026-08-04 via curl and Playwright against live production:** the CookieYes script URL itself —
```
https://cdn-cookieyes.com/client_data/3827feeaf5b6081f66aa049a/script.js
```
— returns 403 directly from CookieYes's own application (body: "We can't find the page you are looking for… contact support@cookieyes.com"), reproducible from a bare curl with no site/browser context at all. A known-live third-party CookieYes client ID was tested against the same endpoint with zero headers and returned 200 with a real script body. Random/invalid IDs return the exact same 403 as ours. Referer and Origin headers (mykei.io, www.mykei.io, none, example.com) made no difference. This rules out a CSP, referer-policy, or domain-canonicalisation cause on our side — the client ID `3827feeaf5b6081f66aa049a` is not recognised by CookieYes's own system, most likely an expired/suspended account or a deleted site registration (the ID was added 21 May 2026 per commit `05fc0c7`).

**No code fix exists for this.** It requires Michael to log into the CookieYes dashboard, check the account/billing status for mykei.io, and either re-register the domain (new snippet, new ID) or confirm the ID and contact CookieYes support. The consent banner does not render at all right now, and GA4 remains deliberately blocked in CSP (`region1.google-analytics.com` not in `connect-src`) until a working consent mechanism is confirmed live in a real browser — do not relax that until this is fixed on CookieYes's side and re-verified.

## 6. Sitemap / robots.txt — already fixed this session, confirmed via file read

`/.netlify/` disallow removed, redirected URLs removed from sitemap, `/roadmap` removed from sitemap and noindexed. Not re-litigated here, see commits `30782ab` and `7fc4ea8`.
