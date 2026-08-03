# Privacy Policy vs. Actual Data Flows — Audit (2026-08-03)

Repo: /Users/mykeesema/dev/mykei-sentinel/.claude/worktrees/may-2026-original (branch round2-deploy, read-only research, no edits made)

Privacy policy source: src/pages/PrivacyPage.tsx (route /privacy, registered in src/App.tsx:76), "Last updated: 10 April 2026".

---

## 1. LOI form (Pilot.tsx -> send-loi Worker -> Resend)

What the code actually does:
- src/pages/Pilot.tsx:262-270 - form collects and submits fullName, storeName, storeAddress, email, phone, storeType, theftLoss, plus a client-generated signed PDF (attachment) and a Turnstile token, via fetch('https://send-loi.michaelesema.workers.dev', ...) (Pilot.tsx:272-275).
- workers/send-loi/worker.js:146-156 - worker parses all these fields server-side.
- workers/send-loi/worker.js:252-271 - data (name, store name, email, phone, address, store type, annual theft loss, plus the signed PDF as a base64 attachment) is sent via the Resend API (api.resend.com/emails) to protocol@mykei.io and michael.e@mykei.io, with reply_to set to the submitter's email.
- Comment at worker.js:4-6 confirms: does NOT email the retailer a copy; only sends the internal notification with attachment.
- Rate limiting is by IP (worker.js:136-144), and PDF/size/Turnstile validation occurs, but none of this is disclosed to the data subject.

What the privacy policy says:
- "What data we collect" (PrivacyPage.tsx:62): "We collect information you submit through our forms on this website, including your name, business name, email address, and telephone number." - generic, does not mention store address or estimated annual theft loss (both collected and emailed) as specific data categories, and does not describe the signed PDF / e-signature captured on the canvas (Pilot.tsx:441-446, pdfBase64 at worker.js:209).
- "Third-party services" (PrivacyPage.tsx:86): "Transactional emails are delivered via Resend (SOC 2 Type II)." - Resend is named, but only in a generic "transactional emails" context; it does not disclose that Resend specifically receives and transmits the LOI submission (name, address, phone, email, theft-loss figure, signed PDF).
- "Lawful basis" (PrivacyPage.tsx:66): states legitimate interest for "form submission data ... to respond to your enquiry and evaluate your suitability for the ADN pilot programme" - this does cover the LOI form in general terms.
- "How long we keep it" (PrivacyPage.tsx:70): "Enquiry and pilot application data is retained for up to 24 months from the date of submission, or until you request erasure." - appears to cover LOI data, though not named explicitly, and doesn't address Resend's own retention of the message/attachment on its side.

Gaps - LOI form:
1. Store address and theft-loss estimate are collected and transmitted but not named as data categories in "What data we collect."
2. The signature/signed PDF is not mentioned anywhere in the policy.
3. Resend is named as a processor for "transactional emails" generally, but the policy does not specifically disclose that the full LOI submission content (including the PDF) is sent to Resend and stored/transmitted by them, nor Resend's own retention.
4. No mention of Cloudflare Workers as the processing environment/sub-processor for this specific flow (Cloudflare is named only for "hosting and DNS" at PrivacyPage.tsx:86, not for form-processing compute).
5. Retention period for LOI submissions relies on the general "24 months" enquiry bucket - not explicit that it covers this flow by name.

---

## 2. GA4 and CookieYes

What the code actually does:
- index.html (root <head>): loads https://www.googletagmanager.com/gtag/js?id=G-7GCJY8N89S (GA4) unconditionally as an async script tag, then calls gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' }) followed immediately by gtag('config', 'G-7GCJY8N89S'). Consent Mode is set to denied by default (defensible pattern), but the gtag.js script itself is always loaded/executed regardless of consent (only the storage/consent signal is denied per Google Consent Mode v2) - a nuance the policy doesn't capture.
- index.html: loads CookieYes via <script id="cookieyes" ... src="https://cdn-cookieyes.com/client_data/3827feeaf5b6081f66aa049a/script.js">.
- public/_headers: CSP connect-src allows https://www.google-analytics.com, https://cdn-cookieyes.com, https://log.cookieyes.com; script-src allows https://www.googletagmanager.com and https://cdn-cookieyes.com.

What the privacy policy says:
- "What data we collect" (PrivacyPage.tsx:62): "If you have consented to analytics, we collect anonymised usage data through Google Analytics." - asserts collection is conditional on consent.
- "Lawful basis" (PrivacyPage.tsx:66): analytics processed under consent (Art. 6(1)(a)); opt-out via browser settings or "the opt-out mechanism provided by Google Analytics" - no mention of CookieYes as the actual consent-management mechanism used on this site.
- "Cookies" (PrivacyPage.tsx:78): mentions _ga, _gid cookies "if you have opted in to analytics" but never names CookieYes, the consent banner tool actually running on the site.
- CookieYes is not named anywhere in the privacy policy.

Gaps - GA4/CookieYes:
1. CookieYes (the actual consent-management platform loaded on every page) is never named in the policy, despite being the mechanism that should gate analytics consent - a direct omission of a processor/tool that manages personal data (consent records, IP-based geolocation for CMP compliance).
2. The policy says analytics data is "anonymised" and only collected "if you have consented" - broadly consistent with Consent Mode default-denied, but doesn't explain that gtag.js loads unconditionally on every page load and Google still receives cookieless pings under Consent Mode v2 for modeling. This is a claim-safety-adjacent nuance since "anonymised" and "only if consented" is a stronger claim than the literal technical behaviour.
3. No opt-out mechanism specific to CookieYes described (only generic Google Analytics browser add-on/opt-out).

---

## 3. Cloudflare Turnstile

What the code actually does:
- src/pages/Pilot.tsx:15: TURNSTILE_SITE_KEY constant; Pilot.tsx:90 loads https://challenges.cloudflare.com/turnstile/v0/api.js; widget rendered invisibly (Pilot.tsx:96-103) and executed on submit (Pilot.tsx:152-154), producing a token sent to the worker.
- workers/send-loi/worker.js:79-109: server-side verification against https://challenges.cloudflare.com/turnstile/v0/siteverify, which sends the visitor's IP (remoteIp / CF-Connecting-IP, worker.js:91,134) to Cloudflare for verification.
- public/_headers: CSP script-src/frame-src explicitly allow https://challenges.cloudflare.com.

What the privacy policy says:
- No mention of Turnstile anywhere in PrivacyPage.tsx. "Third-party services" section (PrivacyPage.tsx:86) lists Cloudflare only for "website hosting and DNS," not for bot verification/Turnstile, which involves transmitting the visitor's IP address and browser signals to Cloudflare's challenge service as part of the LOI form flow.

Gaps - Turnstile:
1. Turnstile is not disclosed at all - no processor naming, no explanation that solving the challenge sends IP/device signals to Cloudflare, no lawful basis stated for this specific processing (likely legitimate interest for fraud/spam prevention, but currently unstated).

---

## 4. ICO registration number and registered office address

What the code actually does / canonical text elsewhere:
- Company number 16984969 appears consistently across the site (src/components/Footer.tsx:34, PrivacyPage.tsx:58, Pilot.tsx:168,252,256,340,479, and 20+ other pages) - consistent.
- Footer canonical text (src/components/Footer.tsx:34-37): "Company Number: 16984969 | Registered in England & Wales" / "Manchester, United Kingdom" - no street-level registered office address anywhere in the footer either.
- Pilot.tsx PDF footer (Pilot.tsx:170,256): "Prestwich, Manchester" is used as a location descriptor but not framed as the formal registered office address.
- ZC157652 (ICO registration number) does not appear anywhere in the repository - confirmed via repo-wide grep across .tsx/.ts/.html files: zero matches.

What the privacy policy says:
- "Who we are" (PrivacyPage.tsx:58): "Mykei Securities Ltd is a company registered in England & Wales (Company Number: 16984969), with a registered address in Manchester, United Kingdom." - company number present; full registered office address (street/postcode) is not given, only "Manchester, United Kingdom."
- No ICO registration number is present anywhere in the privacy policy or the rest of the site.

Gaps - ICO/address:
1. ICO registration number ZC157652 is entirely absent from the site (privacy policy and elsewhere). Given the company processes personal data (LOI forms, analytics, contact forms), this is a compliance/trust gap.
2. No full registered office address (street address, postcode) appears anywhere in the privacy policy - only "Manchester, United Kingdom," insufficient to identify the controller's registered office as typically expected in a Companies-House-compliant privacy notice.

---

## Summary of gaps (10 total)

LOI form (5): store address & theft-loss not named as collected categories; signed PDF/signature not mentioned; Resend's specific role in this flow not disclosed; Cloudflare Workers as compute/processor not named; retention coverage for this flow only implicit.

GA4/CookieYes (3): CookieYes never named despite being the live consent tool; "anonymised"/"only if consented" framing overstates what Consent-Mode-denied technically guarantees (gtag.js still loads and pings unconditionally); no CookieYes-specific opt-out described.

Turnstile (1): not disclosed at all - no processor naming, no lawful basis, no mention that IP/device data goes to Cloudflare's challenge service.

ICO/address (2, most likely to be flagged externally): ICO registration number ZC157652 is absent site-wide; no full registered office street address anywhere, only "Manchester."

Most serious gap: the complete absence of ICO registration number ZC157652 combined with no full registered office address - this is the identity/accountability information a regulator or a data subject would look for first when checking who the controller actually is, and it's missing everywhere on the site, not just the privacy policy. Close second: CookieYes (the live consent-management tool) is never named despite being the mechanism the policy relies on to gate analytics under consent.
