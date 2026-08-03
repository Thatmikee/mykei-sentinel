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

## 2. access-control-allow-origin: * — STILL LIVE, NOT FIXABLE FROM THIS REPO

```
access-control-allow-origin: *
```

Confirmed present on every response from `https://mykei.io/`, including this run's curl check. Grepped the entire repo for `Access-Control-Allow-Origin` — the only occurrence is in `workers/send-loi/worker.js:68`, which correctly reflects a specific validated origin, not a wildcard. This header is not set by `public/_headers`, not set by `functions/_middleware.js`, not set anywhere in git-tracked code.

**Conclusion: this must be a Cloudflare Pages dashboard-level setting** (either a legacy "Access-Control-Allow-Origin" toggle in the Pages project settings, or a Transform Rule configured outside the repo). It cannot be fixed by a commit. Needs direct Cloudflare dashboard access to locate and remove.

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

## 5. CookieYes 403 — CSP FIX SHIPPED, RUNTIME BEHAVIOUR UNVERIFIED

`log.cookieyes.com` was missing from `connect-src` (the CDN script domain `cdn-cookieyes.com` was allowed, but the consent-log endpoint it calls was not) — this was fixed in commit `e309f5c` and is confirmed live in the CSP dump above.

**What is NOT verified:** whether the banner actually renders in a real browser and whether it successfully records a consent choice against `log.cookieyes.com` without erroring for some other reason. A bare curl GET to `log.cookieyes.com` returns 401 (expected — it's an API endpoint needing a real payload, not proof of anything either way). This needs an actual browser session with console/network inspection, which was unavailable both times this was attempted this session (Chrome extension never connected). This remains genuinely unverified, not assumed working.

## 6. Sitemap / robots.txt — already fixed this session, confirmed via file read

`/.netlify/` disallow removed, redirected URLs removed from sitemap, `/roadmap` removed from sitemap and noindexed. Not re-litigated here, see commits `30782ab` and `7fc4ea8`.
