# mykei.io Site Route Inventory — 2026-08-03

Repo: /Users/mykeesema/dev/mykei-sentinel/.claude/worktrees/may-2026-original (branch round2-deploy)
Read-only research. No edits made to site code.

## 1. Routes registered in src/App.tsx

Real page routes (render a component):

| Path | Component |
|---|---|
| / | src/pages/Index.tsx |
| /pilot | src/pages/Pilot.tsx |
| /howitworks | src/pages/HowItWorksPage.tsx |
| /roadmap | src/pages/Roadmap.tsx |
| /adn | src/pages/ADN1DetailPage.tsx |
| /technology/ats | src/pages/ATSDetailPage.tsx |
| /adn-in-action | src/pages/ADN1InActionPage.tsx |
| /founder | src/pages/FounderPage.tsx |
| /michael-esema | src/pages/FounderPage.tsx (same component, second path) |
| /economic-sterilisation | src/pages/EconomicSterilisationPage.tsx |
| /economic-sterilization | src/pages/EconomicSterilisationPage.tsx (same component, US spelling alias) |
| /blog/the-796-billion-problem | src/pages/Blog796BillionPage.tsx |
| /blog/beyond-the-buzzer | src/pages/BlogBeyondBuzzerPage.tsx |
| /glossary/economic-sterilisation | src/pages/GlossaryESPage.tsx |
| /glossary/economic-sterilization | src/pages/GlossaryESPage.tsx (same component, US spelling alias) |
| /privacy | src/pages/PrivacyPage.tsx |
| /contact | src/pages/ContactPage.tsx |
| /terms | src/pages/TermsPage.tsx |
| /certification | src/pages/CertificationPage.tsx |
| /state-of-theft | src/pages/StateOfTheftPage.tsx |
| /investors | src/pages/InvestorsPage.tsx |
| /enterprise | src/pages/EnterprisePage.tsx |
| /signal | src/pages/BriefIndex.tsx |
| /signal/cctv-313-million-movie-ticket | src/pages/SignalCCTVScamPage.tsx |
| /signal/salford-to-vinted-black-market | src/pages/SignalSalfordVintedPage.tsx |
| /signal/surgeon-not-camera-200ms | src/pages/SignalSurgeonNotCameraPage.tsx |
| /signal/shopkeeper-maths-adn-cost | src/pages/SignalShopkeeperMathsPage.tsx |
| /signal/david-robinson-gmb-cctv-theatre | src/pages/SignalDMRGMBPage.tsx |
| /signal/fog-security-systems-debunked | src/pages/SignalFogSecurityPage.tsx |
| /signal/shoplifting-133-percent-london-1-in-14 | src/pages/SignalShopliftingSystemPage.tsx |
| /signal/police-200-pound-threshold | src/pages/SignalPolicethresholdPage.tsx |
| /signal/safergems-jewellery-theft-ai-police-response | src/pages/SignalSaferGemsPage.tsx |
| /signal/coop-named-the-enemy-economics-unchanged | src/pages/SignalCoopCrimeWarPage.tsx |
| /signal/:slug | src/pages/BlogPostPage.tsx (catch-all for posts stored in src/data/blogPosts, e.g. waitrose-smart-cabinets-resale-problem, stop-calling-it-shoplifting-lost-stock, january-/february-/march-/april- files, plus older /brief/* slugs) |
| /brief | redirects to /signal |
| /brief/newsletter | redirects to /signal |
| /brief/:slug | src/pages/BlogPostPage.tsx (legacy /brief/* path, same component as /signal/:slug) |
| /protocol | src/pages/ProtocolPage.tsx |
| * (catch-all) | src/pages/NotFound.tsx |

Pure redirects (Navigate replace, no component of their own):

| Path | Redirects to |
|---|---|
| /how-it-works | /howitworks |
| /adn-1 | /adn |
| /technology/adn-1 | /adn |
| /adn-1-in-action | /adn-in-action |
| /blog | /signal |
| /overview | /howitworks |
| /evidence | /adn |
| /thesis | /economic-sterilisation |
| /press | /founder |
| /signal/newsletter | /signal |
| /subscribe | /pilot |

Total distinct real-page routes: 34 (counting /founder+/michael-esema as one page reachable by two paths, and both spelling-alias pairs as one page each; /signal/:slug and /brief/:slug counted as one dynamic route). Plus 11 redirect-only paths and the catch-all 404.

## 2. URLs currently in public/sitemap.xml (33 entries)

```
https://mykei.io/
https://mykei.io/howitworks
https://mykei.io/economic-sterilisation
https://mykei.io/glossary/economic-sterilisation
https://mykei.io/adn
https://mykei.io/adn-in-action
https://mykei.io/technology/ats
https://mykei.io/pilot
https://mykei.io/signal
https://mykei.io/signal/cctv-313-million-movie-ticket
https://mykei.io/signal/salford-to-vinted-black-market
https://mykei.io/signal/surgeon-not-camera-200ms
https://mykei.io/signal/shopkeeper-maths-adn-cost
https://mykei.io/signal/safergems-jewellery-theft-ai-police-response
https://mykei.io/signal/shoplifting-133-percent-london-1-in-14
https://mykei.io/signal/police-200-pound-threshold
https://mykei.io/signal/david-robinson-gmb-cctv-theatre
https://mykei.io/signal/fog-security-systems-debunked
https://mykei.io/founder
https://mykei.io/state-of-theft
https://mykei.io/certification
https://mykei.io/enterprise
https://mykei.io/contact
https://mykei.io/privacy
https://mykei.io/signal/coop-named-the-enemy-economics-unchanged
https://mykei.io/signal/waitrose-smart-cabinets-resale-problem
https://mykei.io/signal/stop-calling-it-shoplifting-lost-stock
https://mykei.io/signal/january-retail-theft-stopped-looking-random
https://mykei.io/signal/february-brc-retail-crime-noise
https://mykei.io/signal/march-chocolate-case-pattern-evidence
https://mykei.io/signal/april-cctv-evidence-gap
https://mykei.io/protocol
```

Not in sitemap: /investors, /roadmap (deliberately excluded, see section 5), /terms, /glossary/economic-sterilization (US alias), /economic-sterilization (US alias), /michael-esema alias, /blog/the-796-billion-problem, /blog/beyond-the-buzzer, and all redirect-only paths.

## 3. Downloadable assets in public/

Confirmed: zero PDFs or other user-downloadable files exist in public/. Only images (.png/.jpeg/.svg), favicon.ico, llms.txt, robots.txt, sitemap.xml, _redirects, _headers, and .well-known/security.txt. Fonts excluded per instructions (none found in public/ anyway).

This matches expectations: functions/_middleware.js (lines 436-439, 468-473) has a REMOVED_ASSET_PATHS set explicitly returning 410 Gone for:
- /Mykei_Economic_Sterilisation_White_Paper.pdf
- /Mykei_ADN1_Pilot_Programme_Overview.pdf

Both are gone from the filesystem and from the CDN response — the PDF unpublish from earlier this session is confirmed intact.

## 4 & 6. Nav/footer reachability per route

Legend: "shared" = imports src/components/Footer.tsx (the shadcn/dark-theme footer, distinct from Index.tsx's own inline light-theme footer). Several pages render fully custom inline nav/footer JSX rather than any shared component.

| Route | Component file | In sitemap? | Linked from primary nav (Index navLinks/More)? | Linked from any footer? | Own nav/footer rendered? | Flags |
|---|---|---|---|---|---|---|
| / | Index.tsx | Yes | n/a (home) | n/a | Yes, full inline nav (L515-536) + inline footer (L718-749) | none |
| /pilot | Pilot.tsx | Yes | Yes (CTA button in nav, not navLinks array) | Reachable via every page's Register Interest/pilot CTA | No nav, no footer JSX at all (grep confirms none) | Missing nav/footer entirely |
| /howitworks | HowItWorksPage.tsx | Yes | Yes (navLinks) | No | No nav, no footer JSX at all | Missing nav/footer entirely |
| /roadmap | Roadmap.tsx | No (excluded) | No | No | Yes, own .rm-nav (L264) + .rm-footer (L405) | Unlinked from real nav (only found in HeroSection.tsx, a dead/unimported component, and NotFound.tsx's View Roadmap 404-page button, neither is real site nav). Noindexed via functions/_middleware.js ROUTE_META['/roadmap'].noindex: true, excluded from sitemap.xml. Confirmed still unlinked + noindexed, consistent with prior session finding, not re-flagging as new. |
| /adn | ADN1DetailPage.tsx | Yes | Yes (navLinks) | Yes (Footer.tsx pattern + Index footer, both link /adn) | No nav element, has a minimal footer (L466-473, just company name/copyright/home link, no nav links) | Missing nav (page has no way back to other sections except the small footer's / link) |
| /technology/ats | ATSDetailPage.tsx | Yes | No (not in navLinks or More dropdown) | No | No real nav (only a small Home/ADN in Action link bar, L78-93), no footer at all | Reachable only via TechnologySection.tsx (a homepage content link) and content links inside /adn and /economic-sterilisation, not via nav/footer. Missing nav/footer entirely |
| /adn-in-action | ADN1InActionPage.tsx | Yes | No | No | Yes, own .adn-nav (L991) + .adn-footer (L1082) | Reachable only via content links on /adn and /technology/ats, not via primary nav/footer |
| /founder | FounderPage.tsx | Yes | No (not in mk-more-menu, only in Index footer + Footer.tsx) | Yes (both footer patterns) | Yes, own .fn-nav (L145) + inline footer (L391) | none |
| /michael-esema | FounderPage.tsx (alias) | No | No | No | same as /founder | Alias path not in sitemap or nav, canonical /founder is |
| /economic-sterilisation | EconomicSterilisationPage.tsx | Yes | Yes (navLinks) | No | Yes, own .es-nav (L198) + inline footer (L463) | none |
| /economic-sterilization | EconomicSterilisationPage.tsx (alias) | No | No | No | same as above | US-spelling alias, unlinked, unindexed, fine, expected redirect-equivalent |
| /blog/the-796-billion-problem | Blog796BillionPage.tsx | No | No | No | Yes, own .b-nav (L172) + .b-footer (L447) | Legacy blog post, not in sitemap, not linked from nav/footer anywhere found |
| /blog/beyond-the-buzzer | BlogBeyondBuzzerPage.tsx | No | No | No | Yes, own .b-nav (L177) + .b-footer (L451) | Same as above |
| /glossary/economic-sterilisation | GlossaryESPage.tsx | Yes | No (not in navLinks/More) | Yes (both footer patterns, Doctrine label) | Yes, own .g-nav (L183) + inline footer (L416) | none |
| /glossary/economic-sterilization | GlossaryESPage.tsx (alias) | No | No | No | same as above | US-spelling alias |
| /privacy | PrivacyPage.tsx | Yes | No | Yes (both footer patterns) | Uses shared Footer.tsx + own SimpleNav (L18) | none |
| /contact | ContactPage.tsx | Yes | Yes (More dropdown) | Yes (both footer patterns) | Uses shared Footer.tsx + own SimpleNav (L12) | none |
| /terms | TermsPage.tsx | No | No | Yes (both footer patterns) | Uses shared Footer.tsx + own nav (L12) | Not in sitemap despite being footer-linked from every page, minor inconsistency, not a claim-safety issue |
| /certification | CertificationPage.tsx | Yes | Yes (More dropdown) | Yes (both footer patterns) | Uses shared Footer.tsx + own nav (L19) | none |
| /state-of-theft | StateOfTheftPage.tsx | Yes | No | Yes (both footer patterns) | Uses shared Footer.tsx + own nav (L18) | none |
| /investors | InvestorsPage.tsx | No | No | No | Uses shared Footer.tsx + own nav (L18) | Only inbound link found anywhere in the codebase is ContactPage.tsx L70 (Investor enquiry form in a content list, not the page's nav/footer). Not in sitemap. Default index,follow robots (no override in _middleware.js), so if reachable at all it would be indexable, but since it's genuinely one click from /contact, not flagging as unlinked the way /protocol is (see section 5) |
| /enterprise | EnterprisePage.tsx | Yes | Yes (More dropdown) | No | Uses shared Footer.tsx + own nav (L18) | none |
| /signal | BriefIndex.tsx | Yes | Yes (navLinks) | No | Yes, own nav (L71) + footer (L443) | none |
| /signal/* (9 individual posts + BlogPostPage dynamic slugs) | Signal*Page.tsx / BlogPostPage.tsx via BlogPostLayout.tsx | Mixed, see section 2, 6 of the newer slugs not yet in sitemap: waitrose-smart-cabinets-resale-problem, stop-calling-it-shoplifting-lost-stock, january-, february-, march-, april- | No individually (only /signal index is in nav) | No | Each Signal*Page.tsx has its own inline nav (sticky, same visual pattern); BlogPostPage.tsx uses BlogPostLayout.tsx which has its own nav (L92) + footer (L259) | All reachable only via /signal index page links, consistent with normal blog-index pattern, not flagging |
| /protocol | ProtocolPage.tsx | Yes | No | No | Uses shared Footer.tsx + own nav (L22) | See section 5, unlinked but indexed |

## 5. Unlinked-but-indexed routes (flagged)

/protocol — FLAG: unlinked but indexed.
- In public/sitemap.xml (confirmed, section 2).
- /protocol does have a ROUTE_META entry in functions/_middleware.js (L92-102) but no noindex: true, so it serves index, follow (default from index.html L68, meta name="robots" content="index, follow").
- The only place /protocol appears anywhere in src/ is the route registration in App.tsx L101. Confirmed via repo-wide grep for "/protocol" and to="/protocol", zero nav/footer/content links found on any page.
- This route is fully live, indexed, sitemapped, and completely unreachable by clicking anything on the site. It also carries distinct Nigeria/Asset-Proof Nigeria positioning language in its meta description (registry-first field validation for high-value movable assets across solar, estate, school, warehouse, and SME contexts) that is off-brand for the UK retail-ADN positioning of the rest of the site — worth a product decision on whether this should be linked, unpublished, or deliberately kept as a dark/unlisted page (in which case it should NOT be in the sitemap and should be noindexed like /roadmap).

/roadmap — confirmed still correctly excluded, not re-flagged.
- Noindexed via functions/_middleware.js L223 (noindex: true), excluded from sitemap.xml.
- Its only inbound links are HeroSection.tsx (dead, unimported component, grepped repo-wide, confirmed no other file imports it) and NotFound.tsx's 404-page View Roadmap button (not primary nav/footer).
- Status unchanged from what was found earlier this session.

No other route in the sitemap was found to be unlinked from all nav/footer.

## 6. Routes missing nav and/or footer entirely (flagged)

Confirmed by grepping each page component's actual JSX (not inferred from filename):

- /pilot (Pilot.tsx) — no nav, no footer anywhere in the file.
- /howitworks (HowItWorksPage.tsx) — no nav, no footer anywhere in the file.
- /technology/ats (ATSDetailPage.tsx) — no real nav (only a two-link bar: Home + ADN in Action CTA), no footer at all.
- /adn (ADN1DetailPage.tsx) — no nav at all; has a minimal footer (company name/copyright/home link only, no page links).

These are four of the most important routes on the site (/adn is the flagship product page, /howitworks and /pilot are primary nav destinations and the main conversion path). A visitor landing on any of these mid-scroll has no way to navigate elsewhere on the site except browser back or a single hardcoded Home link.

---

Claim-safety note: this was a route-inventory pass only, no claim-language audit was performed. /protocol's meta description language (field validation) should be checked against Claim Safety Rules separately given it touches a different jurisdiction/product line (Asset-Proof Nigeria) than the rest of the ADN site.
