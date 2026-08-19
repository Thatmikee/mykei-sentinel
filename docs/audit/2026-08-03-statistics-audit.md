# Statistics Audit — 2026-08-03

NOTE: Repo write access to docs/audit/ was blocked by worktree isolation guard (this is a read-only research subagent). Findings saved here instead: /tmp/2026-08-03-statistics-audit.md

Scope: all .tsx under src/pages/ and src/components/, plus index.html. Numeric stats about retail theft, crime cost, market size.
Repo: mykei-sentinel worktree `round2-deploy` at `.claude/worktrees/may-2026-original` (read-only research, no edits made).

| Figure | Page / file:line | Source cited (Y/N + name) | Year given (Y/N) | Context quote |
|---|---|---|---|---|
| £2.2B | src/pages/Index.tsx:605 | N (no org named on page near this stat) | N | `{ num: "£2.2B", label: "Reported annual\ncost of retail theft" }` — no citation, no year, in homepage stat-strip array |
| 20M+ | src/pages/Index.tsx:606 | N | N | `{ num: "20M+", label: "Reported theft\nincidents in a year" }` — no citation, no year |
| 6.2M | src/pages/StateOfTheftPage.tsx:52 | Y — "ACS Crime Report" | partial — label says "(2024)" but not clear if that's the report year or incident year | `{ label: "UK theft incidents (2024)", value: "6.2M", src: "ACS Crime Report" }` |
| $796B | src/pages/StateOfTheftPage.tsx:53 | Y — "Global Retail Theft Barometer" | N | `{ label: "Global retail theft losses", value: "$796B", src: "Global Retail Theft Barometer" }` — no year given; this Checkpoint Systems report is stale (last published ~2015) |
| £461.86 | src/pages/StateOfTheftPage.tsx:54 | Y — "BRC Retail Crime Survey" | N | `{ label: "Average loaded cost per incident", value: "£461.86", src: "BRC Retail Crime Survey" }` — no year/edition specified |
| 83% | src/pages/StateOfTheftPage.tsx:55 | Y — "Met Police programme, 2024" | Y (2024) | `{ label: "Proprietary Forensic Marking Compound repeat theft reduction", value: "83%", src: "Met Police programme, 2024" }` |
| 32 (arrests) | src/pages/StateOfTheftPage.tsx:56 | Y — "Metropolitan Police, 2024" | Y (2024) | `{ label: "Arrests in Met Proprietary Forensic Marking Compound pilot", value: "32", src: "Metropolitan Police, 2024" }` |
| $31.2B | src/pages/StateOfTheftPage.tsx:57 | Y — "Grand View Research" | Y — "(2030 est.)" | `{ label: "AI loss prevention market (2030 est.)", value: "$31.2B", src: "Grand View Research" }` — forward projection |
| $796 billion | src/pages/BlogBeyondBuzzerPage.tsx:249 | needs check of surrounding paragraph | needs check | "The result: $796 billion in annual retail theft losses globally. Shoplifting in..." |
| 83% (repeat) | src/pages/BlogBeyondBuzzerPage.tsx:404 | Y — "police-run programmes" (unnamed specific force) | N | "Proprietary Forensic Marking Compound reduced burglaries and theft by 83% in police-run programmes; SmartWater cut Homebase stock loss by 20% (both third-party results, not Mykei's own)." |
| 20% (Homebase stock loss) | src/pages/BlogBeyondBuzzerPage.tsx:275, :404 | Y — SmartWater/Homebase named | N | "Homebase cut stock loss by 20% after implementing SmartWater, another forensic..." |
| £150,000 (stolen goods recovered) | src/pages/BlogBeyondBuzzerPage.tsx:43 | N — reads as illustrative/hypothetical case block | N | "5,000 items tagged. 15 arrests. £150,000 in stolen goods recovered. Forensic link to suspect. Evidence used in prosecution." |
| 5,000 items tagged / 15 arrests | src/pages/BlogBeyondBuzzerPage.tsx:43 | N | N | same line as above |
| $796 billion (headline) | src/pages/BlogBeyondBuzzerPage.tsx:425 | N in headline itself | N | "The $796 Billion Problem: Why Retailers Are Losing the War on Theft" |

## Cross-check notes (per task brief)
- Homepage £2.2B (Index.tsx:605) is UNDATED and UNSOURCED. Traces to BRC Retail Crime Survey 2025 "customer theft" subset of a £4.2bn total (which includes crime-prevention costs) — page doesn't disclose it's a subset, doesn't name BRC, doesn't give a year.
- Newer BRC Crime Report 2026 (Feb 2026) reports 5.5M detected shop theft incidents costing ~£400M, plus £100m+ parcel theft — different methodology (detected/reported vs. survey-estimated total cost). Site does not reference this newer report anywhere found. The undated £2.2B/20M+ figures are challengeable given a newer report exists from the same body, though the two BRC figures aren't strictly comparable/superseding.
- $796B "Global Retail Theft Barometer" figure (StateOfTheftPage.tsx:53; BlogBeyondBuzzerPage.tsx:249/425) is a widely circulated but dated (pre-2016) Checkpoint Systems figure never updated — presenting it undated reads as current when it's a decade+ old. Significant accuracy/claim-safety issue.

## Blog796BillionPage.tsx (worst offender — dense, largely unsourced)
| Figure | file:line | Source (Y/N) | Year (Y/N) | Context |
|---|---|---|---|---|
| $796 billion | Blog796BillionPage.tsx:44,55,84,256,389,399 | N (repeated throughout, no org/report named inline) | N | "Global retail theft costs $796 billion a year." / "Retail theft costs the world $796 billion every year." |
| $9 billion | Blog796BillionPage.tsx:44,84,256-257,399 | N | N | "organised retail crime accounts for $9 billion in preventable losses" (US-specific per line 256-257, but SEO meta strips that qualifier) |
| $150 billion by 2026 | Blog796BillionPage.tsx:260 | N | Y (2026, but this is a projection year not a data year) | "ORC losses past $150 billion annually by 2026." — no source named, projection presented as near-fact |
| 5.8 million (UK shop theft incidents) | Blog796BillionPage.tsx:263-264 | N | N ("the past year" undated) | "In the UK, retailers recorded around 5.8 million incidents of shop theft over the past year." — conflicts with StateOfTheftPage.tsx's 6.2M and Index.tsx's 20M+ for the same underlying claim type, no reconciliation |
| 27% (shoplifting up) | Blog796BillionPage.tsx:264, 306, 307 | N | N | "Shoplifting is up 27% in the country's largest cities." / "Theft is still up 27%." — no baseline year or source |
| 83% (Proprietary Forensic Marking Compound reduction) | Blog796BillionPage.tsx:368, 403 | N (no police force/programme named in these lines, unlike StateOfTheftPage which cites "Met Police programme, 2024") | N | "Proprietary Forensic Marking Compound has demonstrated up to 83% reductions" |
| £150,000 / 15 arrests | Blog796BillionPage.tsx:370 | N | N | "items lead to 15 arrests and the recovery of £150,000 in stolen goods" — same unsourced case block as BlogBeyondBuzzerPage.tsx:43 |
| 20% (Homebase/SmartWater) | Blog796BillionPage.tsx:371 | Y — SmartWater/Homebase named | N | "Homebase cut stock loss by 20% using SmartWater." |

Blog796BillionPage.tsx is the single worst offender: it repeats the stale/undated $796B figure at least 6 times (title, meta description, JSON-LD schema, body copy, pull-quote, and FAQ/key-takeaways block), stacks it with an unsourced $9B and an unsourced $150B-by-2026 projection, and gives a UK incident count (5.8M) that contradicts the 6.2M figure on StateOfTheftPage.tsx and the 20M+ figure on Index.tsx — three different incident counts across the site with no reconciliation.

## Coverage status
Fully checked: src/pages/Index.tsx (stat strip section), src/pages/StateOfTheftPage.tsx (full file, 187 lines), src/pages/BlogBeyondBuzzerPage.tsx (grep hits only, not full read).

NOT YET individually reviewed (grep found no numeric theft/crime/market hits in the broad pattern search, but full read not done for all): remaining files in src/pages (ADN1DetailPage, ADN1InActionPage, ATSDetailPage, Blog796BillionPage, BlogIndexPage, BlogPostPage, BriefIndex, CertificationPage, ContactPage, EconomicSterilisationPage, EnterprisePage, EvidencePage, FounderPage, GlossaryESPage, HowItWorksPage, InvestorsPage, OverviewPage, Pilot, PressPage, PrivacyPage, ProtocolPage, Roadmap, all Signal*Page files, TermsPage) and src/components (ADN1FlowDiagram, ContactSection, Footer, GoldShelfBackground, HeroSection, LOILeadCaptureForm, missionSection, SignalShareBar, SimEventLog, SpecsSection, TechnologySection) and index.html. Note: Blog796BillionPage.tsx (by filename alone) almost certainly contains the $796B figure and needs a full read — this task ran out of turns before completing that pass.
