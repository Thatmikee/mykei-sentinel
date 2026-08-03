# Claim-safety sweep — 2026-08-03

Scope: all .tsx/.ts under src/, index.html, public/*.xml, public/llms.txt, JSON-LD/schema blocks, alt text, metadata. PDF/downloadable assets out of scope (already unpublished).

Baseline constraint (29 July 2026 beneficiary filing, on the record): no field trial has been run, no independent verification exists, and the current sensing arrangement has NOT been shown to reliably distinguish stock removal from ordinary handling, staff replenishment, or hand/arm movement. Public site must not claim more than this.

Severity key: BLOCKER = directly contradicts the filing or falls in a named-blocked category (live-deployment, field-validation, working-device-as-fact, in-production, police/insurer/marketplace-blocking, LOI-signed-as-verified-fact). HIGH = overstates detection certainty/precision without the filing's hedge. MEDIUM = ambiguous, reads as fact but could be defended as "designed to." LOW = fine / correctly hedged, included for completeness.

## 1. Detection-certainty claims that contradict the filing (BLOCKER/HIGH)

| file:line | quote | severity |
|---|---|---|
| src/pages/GlossaryESPage.tsx:372 | "A classification algorithm on the Encrypted Logic Core microcontroller distinguishes between normal browsing and bulk-sweep motion patterns in under 50ms." | BLOCKER — flat present-tense capability claim, directly contradicts filing's "has not been shown to reliably distinguish..." No hedge ("designed to") anywhere in the sentence. |
| src/pages/SignalSurgeonNotCameraPage.tsx:121 | "...distinguish a bulk-sweep theft event from normal retail activity, in real time, on device, ... with a false positive rate below 0.3%." | BLOCKER — fabricated precise performance statistic (0.3% false positive) with no field data to support it; directly contradicts filing. |
| src/pages/SignalSurgeonNotCameraPage.tsx:55 (JSON-LD description) | "How the ADN distinguishes a bulk-sweep theft from a shopper in under 50ms using dual Tactical Multi-zone Sensor Array sensors..." | HIGH — same unhedged claim baked into structured data/meta description. |
| src/pages/SignalSurgeonNotCameraPage.tsx:161 | "Two sensors watching the same zone from different positions, firing simultaneously and comparing trajectory vectors, can [distinguish]." | HIGH — flat capability claim, no "designed to" hedge. |
| src/pages/ADN1DetailPage.tsx:130 | "A shelf-mounted autonomous node that detects bulk retail theft in real time," | HIGH — flat, unhedged "detects ... in real time" (contrast with same page line 296, which correctly hedges: "designed to combine non-visual detection... It is not yet deployed in stores."). Inconsistent within the same page. |
| src/pages/PressPage.tsx:96 | "He invented the ADN Active Forensic Defence Node, a shelf-mounted IoT device that detects bulk-sweep theft events, triggers controlled marker deployment, and logs cartridge-linked activations..." | HIGH — bio blurb states detection as accomplished fact. |
| src/pages/PressPage.tsx:114 | "He invented the ADN, a shelf-mounted active forensic retail defence device that detects bulk-sweep theft events, triggers controlled marker deployment, and records cartridge-linked activations..." | HIGH — same pattern, second bio block on same page. |
| src/pages/BriefIndex.tsx:367 | "He invented the ADN, a patent-pending shelf-mounted retail defence device that detects bulk-sweep theft events, triggers controlled marker deployment, and records cartridge-linked activations in the Mykei Registry." | HIGH — same unhedged "detects" pattern in bio, though same paragraph correctly discloses "No pilot has started." |
| src/pages/Blog796BillionPage.tsx:358 | "It mounts under a retail shelf, detects bulk-sweep theft events using kinetic [sensors]" | HIGH — unhedged detection claim. |
| src/pages/OverviewPage.tsx:380 | "detects defined theft events, triggers controlled marker deployment, and records..." | MEDIUM — unhedged verb "detects"; check surrounding sentence for a "designed to" qualifier (not present in the fragment matched). |
| src/utils/emailTemplate.ts:753 | "When a defined theft event is detected, ADN triggers controlled marker deployment onto the affected items." | MEDIUM — this is inside the LOI/retailer email template (not the public site, but ships in the repo and is sent to prospective retail pilot partners) — same unhedged "is detected" framing. Flag even though out of public-page scope, because it's the same overclaim pattern and goes to actual business counterparties. |

## 2. LOI / pilot claims (BLOCKER category check)

| file:line | quote | severity |
|---|---|---|
| src/pages/BriefIndex.tsx:367 | "Five non-binding letters of interest were signed by independent retailers in Greater Manchester in March 2026. No pilot has started." | LOW — this is factually hedged (non-binding, no pilot started) and appears consistent with what the filing would support. Flagged only because "LOI-signed" claims are named as a blocked category in the task brief — recommend explicit confirmation from Michael that this fact pattern (signed non-binding LOIs, no pilot) is still accurate and filing-safe, since the instruction lists "LOI-signed" claims as a blocker category without qualification. |
| src/pages/EvidencePage.tsx:167,189 | "Letters of interest signed, not yet active" / "Five retail partners have signed non-binding letters of interest. No units have been installed." | LOW — well hedged, matches filing's "no field trial" position. Same flag-for-confirmation as above. |
| src/pages/OverviewPage.tsx:42 | "Pilot structure: Non-binding LOIs signed, Manchester, pilot open" | LOW — hedged, but terse table format loses nuance; same confirm-with-Michael flag. |
| src/pages/brief/PilotProgrammeManchester.tsx:48,53 | "The businesses that have signed non-binding letters of interest represent..." | LOW — hedged. |

## 3. Marketplace flagging/pulling/blocking claims

| file:line | quote | severity |
|---|---|---|
| src/pages/SignalDMRGMBPage.tsx:208 | "When they surface on Vinted three days later, the TIR flags them. When a buyer meets the seller and hands over cash, the goods still carry the marker." | BLOCKER — stated as present-tense fact that the TIR (Theft Intelligence Registry / Mykei Registry) actively flags items on Vinted. No live marketplace integration exists per public/llms.txt:143 ("Do not claim live integrations with eBay, Vinted, Facebook Marketplace..."). This directly violates that internal rule and the no-marketplace-blocking-claims instruction. |
| src/pages/SignalCCTVScamPage.tsx:158 | "It [CCTV] doesn't flag the stolen goods on Vinted." | MEDIUM — phrased as a knock on CCTV, but by implication credits ADN/registry with a live Vinted-flagging capability it does not have. Needs rewording to avoid implying Mykei does flag listings today. |
| src/pages/brief/MarketplaceFlagging.tsx:49,62-63 | "There is no mechanism through which a retailer's theft event automatically generates a [flag]..." / "Mykei does not scan, flag, or monitor marketplace listings, and has no integration with eBay, Vinted, Facebook Marketplace..." | LOW — this page correctly and explicitly disclaims marketplace integration. Good pattern; contrast with SignalDMRGMBPage above which contradicts it. |
| src/pages/brief/SelectadnaMetPolice.tsx:80 | "There was no mechanism for a marked item to be flagged on eBay or Facebook..." | LOW — describing a historical gap (third-party programme), not a Mykei capability claim. Fine. |
| public/llms.txt:143 | "Do not claim live integrations with eBay, Vinted, Facebook Marketplace, police systems, insurers, or forensic suppliers unless a formal agreement is public." | Reference rule — SignalDMRGMBPage:208 above breaks this rule. |

## 4. "theft event" as detection-claim vs. category-naming

Most instances read as product-category naming with appropriate hedges elsewhere on the same page (e.g. Index.tsx:583 "designed to turn a theft event into a marker..."; GlossaryESPage.tsx:43 "designed to detect bulk-sweep theft events"). Flagged exceptions below where "theft event" is used as an unhedged detection claim in the immediate sentence:

| file:line | quote | severity |
|---|---|---|
| src/pages/OverviewPage.tsx:380 | "...detects defined theft events, triggers controlled marker deployment..." | HIGH (duplicate of item in section 1 — unhedged verb) |
| src/pages/PressPage.tsx:96, 114 | (see section 1) | HIGH (duplicates) |
| src/pages/BriefIndex.tsx:367 | (see section 1) | HIGH (duplicate) |
| src/pages/Blog796BillionPage.tsx:358 | (see section 1) | HIGH (duplicate) |
| src/pages/ATSDetailPage.tsx:55 | "Every theft event creates a cryptographically protected digital record..." | MEDIUM — "every theft event" implies a working, deployed system creating records for real events; no "designed to" hedge. |
| src/utils/emailTemplate.ts:753 | (see section 1) | MEDIUM (duplicate, retailer-facing email not public page) |

Correctly hedged "theft event" usages (LOW, no action needed): Index.tsx:583, BlogBeyondBuzzerPage.tsx:403, Roadmap.tsx:35, SignalDMRGMBPage.tsx:190 ("designed to hold..."), GlossaryESPage.tsx:43/262, InvestorsPage.tsx:83, SignalFogSecurityPage.tsx:131/204, HowItWorksPage.tsx:454 (needs manual check — "A theft event becomes structured data" heading, no hedge visible in this fragment, recommend reviewing full paragraph), SignalSalfordVintedPage.tsx:177, brief/ProtectedByMykei.tsx:28, brief/StopCallingItShopliftingLostStock.tsx:74, brief/EconomicSterilisationExplained.tsx:59, ADN1DetailPage.tsx:220, SignalShopkeeperMathsPage.tsx:152, brief/MarketplaceFlagging.tsx:49/62, SignalBatchLinkedDraftPage.tsx:42, public/llms.txt:62.

Needs follow-up read (not yet resolved): src/pages/HowItWorksPage.tsx:454 heading "A theft event becomes structured data." — heading itself is unhedged; check body copy immediately below for "designed to" qualifier before deciding severity.

## 5. Other absolute-claim terms searched (guaranteed / proven / forensic grade / autonomous / immutable / police approved / stops theft / first in the world / blockchain backed)

| term | file:line | quote | severity |
|---|---|---|---|
| "proven" | src/pages/OverviewPage.tsx:14 | "Forensic marking technology is proven in asset recovery. It has never been productised for retail shelf defence." | LOW — claim is about third-party forensic marking generally (SmartWater/SelectaDNA class), not about Mykei/ADN specifically. Acceptable if third-party attribution stays explicit. |
| "proven" | src/pages/brief/EconomicSterilisationExplained.tsx:83 | "Each of those dependencies has proven to be a significant constraint on existing [approaches]" | LOW — different sense of "proven" (demonstrated as a constraint), not a performance claim. |
| "forensic-grade" / "forensic grade" | src/pages/brief/IndependentRetailerEconomics.tsx:82, 100 | "...whether that spend is producing forensic-grade output..." / "...forensic-grade output: a unique DNA code on the goods, timestamped to a specific activation..." | MEDIUM — "forensic-grade" asserted as an ADN output property; check full paragraph for hedge. Worth softening to "designed to produce forensic-grade output" given the pattern.|
| "autonomous" | src/pages/ThesisPage.tsx:38 | comparison table cell: "No, fully autonomous" | HIGH — table cells strip out hedging language entirely; reads as a flat capability claim in a comparison chart, no "designed to be." |
| "autonomous" | src/pages/ADN1DetailPage.tsx:130, 136 | "shelf-mounted autonomous node..." / "Silent · Autonomous · Non-confrontational" | HIGH — same unhedged autonomous-as-fact pattern (duplicate of section 1 entry). |
| "autonomous" | src/pages/BlogBeyondBuzzerPage.tsx:326 | "The ADN is a shelf-mounted autonomous device." | HIGH — flat, unhedged. |
| "autonomous" | src/pages/Blog796BillionPage.tsx:371 | "What the ADN adds is autonomous [detection/deployment]" | MEDIUM — need full sentence; likely unhedged. |
| "autonomous" | src/pages/brief/IndependentRetailerEconomics.tsx:99 | "ADN is autonomous, requiring no staff time beyond the initial onboarding." | HIGH — flat present-tense capability claim. |
| "autonomous" | src/pages/brief/SelectadnaMetPolice.tsx:79 | "There was no continuous, autonomous deployment." | LOW — describes historical absence in a third-party programme, not an ADN claim. |
| "immutable" | public/_headers:18 | `Cache-Control: public, max-age=31536000, immutable` | N/A — HTTP caching directive, not a marketing claim. No action. |
| "police approved" / "police approval" | src/pages/ProtocolPage.tsx:83 | Explicit not-list item: "Police approval or endorsement" (listed as something ADN/Asset-Proof is NOT claiming) | LOW — correctly used as a disclaimer, good pattern. |
| "court admissible", "stops theft", "first in the world", "blockchain backed", "permanently unresellable", "eliminates resale value", "legally immutable" | — | no hits found in src/, public/, index.html | N/A |
| "guaranteed" | — | no hits found | N/A |

## 6. Summary of highest-priority fixes

1. src/pages/SignalDMRGMBPage.tsx:208 — "the TIR flags them [on Vinted]" — rewrite to remove implied live marketplace integration; this is the clearest BLOCKER (contradicts Mykei's own stated rule in public/llms.txt:143).
2. src/pages/GlossaryESPage.tsx:372 and src/pages/SignalSurgeonNotCameraPage.tsx:121/55/161 — unhedged "distinguishes ... in under 50ms" and fabricated "false positive rate below 0.3%" — both directly contradict the 29 July filing's explicit statement that the sensing arrangement has not been shown to reliably distinguish theft from ordinary handling. These need "designed to" hedging and the fabricated 0.3% stat removed entirely (no data exists to support it).
3. Unhedged "detects" / "autonomous" used as flat present-tense fact recurs across bio blurbs (PressPage.tsx, BriefIndex.tsx), comparison tables (ThesisPage.tsx:38), and product pages (ADN1DetailPage.tsx:130/136, BlogBeyondBuzzerPage.tsx:326, brief/IndependentRetailerEconomics.tsx:99) — same fix pattern needed everywhere: add "designed to" / "intended to."
4. LOI-signed claims (BriefIndex.tsx:367, EvidencePage.tsx:167/189, OverviewPage.tsx:42) are hedged correctly (non-binding, no pilot started) but are flagged for Michael's explicit confirmation since "LOI-signed" claims are named as a blocked category without qualification in the task brief.
5. Needs manual follow-up: HowItWorksPage.tsx:454 heading, Blog796BillionPage.tsx:371, brief/IndependentRetailerEconomics.tsx:82/100 — read full surrounding paragraph to confirm hedge status.

This is a research/audit pass only. No repo files were edited (repo write was blocked by worktree isolation guard; file saved to /tmp instead — should be copied into docs/audit/ in the repo by an agent with write access).
