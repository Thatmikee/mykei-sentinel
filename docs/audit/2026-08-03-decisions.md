# Decision list — 2026-08-03

Every item below was deferred rather than acted on, across this session and the one before it. Grouped by what's actually still relevant now vs what's been overtaken by events (the AMMIC cohort loss, fixes already shipped this session).

## Still open, needs your decision

3. **Roadmap Q2/Q3 status contradiction.** Q2 2026 is marked `status: "delayed"` ("BEHIND SCHEDULE") while Q3 2026 is marked `status: "active"` ("IN PROGRESS") even though Q3's milestones depend on Q2's undone work. Also the hero subhead reads "Q1 complete. ADN deploying Q2." which reads as on-track despite Q2's own delayed status. I don't know which is actually true (is Q2 genuinely delayed, or is that stale?) so I didn't touch it. Needs you to say what's actually true right now.

4. **Statistics: the whole set needs re-sourcing, not just the homepage figure.** The statistics audit found 22+ distinct theft/crime/market figures, 12 with no source at all, 15 with no year. Worst offender is `Blog796BillionPage.tsx`, which repeats an unsourced/undated "$796B Global Retail Theft Barometer" figure 6+ times alongside an unsourced $9B and an unsourced "$150B by 2026" projection, and states 5.8M UK incidents against 6.2M on `StateOfTheftPage.tsx` and 20M+ on the homepage — three different numbers for what reads as the same claim, never reconciled. A dedicated research agent is currently verifying what the actual current published figures are (BRC's latest report, whether the "Global Retail Theft Barometer" figure is real/current/correctly attributed) — I'll bring you real numbers rather than ask you to pick between unsourced ones.

5. **ICO registration number ZC157652 is absent from the entire site**, not just the privacy policy. Recommend adding it to the privacy policy and the footer alongside the existing company number, since it's the piece of controller-identity information most likely to be checked first by anyone verifying the company's data-protection standing.

6. **Privacy policy doesn't name CookieYes, Resend (the LOI email processor), or Turnstile as processors**, doesn't state a retention period for LOI form data, and its own address disclosure just says "Manchester, United Kingdom" rather than the full registered office used elsewhere on the site. 10 gaps total, full list in `docs/audit/2026-08-03-privacy-audit.md`. I haven't drafted replacement text, that's a legal-content decision, not a mechanical fix.

7. **`/protocol` is unlinked but still indexed**, and carries off-brand Nigeria/"Asset-Proof Nigeria" language that doesn't match the current UK-retail-security positioning. New finding this session, not previously known. Needs a decision: noindex it, delete it, or fold it into the current site properly.

8. **`/pilot`, `/howitworks`, `/technology/ats` have no nav or footer at all** (site inventory found this in addition to the `/adn` fix already shipped this session). I fixed `/adn` because it was explicitly named; these three weren't on the original list, so I flagged rather than fixed.

9. **Unhedged "detects"/"autonomous" claims, partially fixed.** A follow-up pass this session hedged `GlossaryESPage.tsx:372`, `ADN1DetailPage.tsx:130-132`, `brief/IndependentRetailerEconomics.tsx:82,99-100`, and both `PressPage.tsx:96/114` founder bio blurbs, plus one more instance the hardened claim-safety gate caught in `Blog796BillionPage.tsx:371`. Still open: `BriefIndex.tsx`, `ThesisPage.tsx:38`, `BlogBeyondBuzzerPage.tsx:326`. Full list with file:line and quotes in `docs/audit/2026-08-03-claim-sweep.md`. They need your read on how far to hedge each one, some may be fine in context.

10. **CookieYes banner render/consent-recording is still unverified.** The CSP fix that should resolve the 403 is live, but no browser session was available this session (Chrome extension never connected) to actually watch the banner render and record a choice. GA4 stays blocked until this is genuinely confirmed, not assumed.

11. **`access-control-allow-origin: *` on site responses is not fixable from this repo.** It's not in any git-tracked code, must be a Cloudflare Pages dashboard setting or Transform Rule. Needs your dashboard access.

12. **HSTS header claims `preload` but mykei.io was never actually submitted to the browser preload list** (`hstspreload.org` shows `status: "unknown"`). Not a security hole, just an unfulfilled claim. Submitting is a 5-minute action at hstspreload.org once you confirm you're comfortable with the irreversibility (once accepted, HTTPS becomes mandatory for the domain in participating browsers, permanently, until you're removed from a future browser release, which takes months).

## Superseded / no longer relevant

- **University/innovation centre/PrintCity/Innovate UK confidentiality** — you confirmed this still applies even after losing the AMMIC cohort. Not stale, still binding. No site copy references it, and none will.
- **Prerendering** — still not started, still correctly out of scope for a single session, no new information changes that.

## Already fixed this session (for reference, not re-opening)

www→apex redirect, PDF unpublish, X-XSS-Protection, CookieYes CSP allowance (fix shipped, verification still pending per #10 above), Twitter card sync, meta-keywords removal, sitemap/robots cleanup, adn1→adn slug, `/roadmap` noindex, `/adn` footer+CTA, LOI count claims removed from 14 files, homepage dedup, nav dedup, duplicate address removal, font self-hosting.

**Fabricated false-positive claim** (was #1) — the "false positive rate below 0.3%" line in `SignalSurgeonNotCameraPage.tsx` was removed entirely, no hedge, matching the original recommendation. Shipped in commit `1caecb6`.

**Vinted "flagging" claim** (was #2) — the registry-flags-items-on-Vinted claim in `SignalDMRGMBPage.tsx:208` was removed, matching the no-integration statement in `public/llms.txt`. Shipped in the same commit `1caecb6`. The claim-safety gate (`scripts/claim-safety-gate.sh`) now also bans this specific claim shape so it can't silently return, while leaving the bare word "Vinted" unbanned since it's used legitimately as a marketplace name across many other pages.
