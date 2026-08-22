---
name: Mykei / The Signal
version: 1.0.0
updated: 2026-08-22
runtime_source_of_truth: src/styles/signalRed.ts
status: authoritative for agents, derived from code

color:
  ground:   "#FFFFFF"
  ink:      "#111318"
  ink_2:    "#4A4F58"
  ink_3:    "#767D88"
  rule:     "#D8DBE0"
  rule_2:   "#EDEFF2"
  tint:     "#F4F6F8"
  accent:   "#D8001F"
  on_dark:  "#F7F8FA"

contrast_measured_on_ground:
  ink:   "17.9:1"
  ink_2: "8.0:1"
  ink_3: "4.5:1"
  accent: "5.3:1"

type:
  display: "'Playfair Display', Georgia, serif"
  sans:    "'IBM Plex Sans', system-ui, sans-serif"
  mono:    "'JetBrains Mono', ui-monospace, monospace"
  display_scope: nameplate and section heads only
  measure:
    lead: 1010
    body: 1180
    index: 1320

dials:
  design_variance: 6
  motion_intensity: 3
  visual_density: 3

radius_scale: [0, 2, 8, 10]
motion_max_duration_ms: 420
---

# Mykei / The Signal design system

This file is the agent-facing description of the visual identity. `src/styles/signalRed.ts`
is what actually runs. When the two disagree, the TypeScript wins and this file is stale,
so fix this file rather than the code.

## Why this document exists

The defining defect of this codebase has been divergent tokens. The accent was declared
five separate times and drifted into five values, two of which failed WCAG AA. The ground
colour was declared six times and drifted into six creams (`#FAFAF6`, `#F8F3ED`, `#FAF8F3`,
`#FAFAF8`, `#F5F1EB`, `#f5f1eb`), which is why the site read as unresolved rather than warm.
Both are now single-sourced. Do not reintroduce a local colour constant in a page file.

## Ground

White. Not off-white, not warm paper, not cream. The publication prints evidence, and the
nearest physical analogue is a journal page and a court exhibit, not a lifestyle magazine.
Warm grounds also carry a specific liability here: beige and cream backgrounds are the
single most over-produced palette in machine-generated design, so warmth reads as
unconsidered even when it was chosen deliberately.

## The accent

One red, `#D8001F`, at 5.3:1 on white, which passes AA at every size including the 10px
mono labels. It belongs to the publication: nameplate, department heads, kickers, rules.

The accent never encodes an evidence grade. Grades are set in words, so they survive
greyscale, photocopying and colour blindness. If a red element is not pointing at the
publication's own furniture, it should be INK or INK_2 instead.

## Tint, and the trap inside it

`TINT` (`#F4F6F8`) fills pull quotes, key-takeaway boxes and source panels.

It exists because of a failure mode worth recording. On the legacy cream pages, those
panels were filled with the same cream as the page. The fill was doing two jobs, and the
panel only read as a panel because it matched the paper. Setting those fills to white
during the migration would not have made them white, it would have made them disappear,
taking the shape of every pull quote with them. Any future ground change must ask the same
question of every light value on the page.

TINT is a surface and never a text colour. Text on it uses INK.

## Type

One decorative face, and it belongs to the wordmark. A magazine is allowed exactly one, and
Playfair Display is already self-hosted for the other edition, so it costs no new bytes and
stays inside the CSP, which blocks Google Fonts. Body copy is IBM Plex Sans, drawn by IBM
for technical documentation. Every figure, date and reference is JetBrains Mono, because a
number that can be checked should look like a number that can be checked.

Measures vary by role rather than sitting at one width. The lead runs narrower than the
index on purpose: the lead is read, the index is scanned.

## Motion

MOTION_INTENSITY is 3 and that is a constraint, not an omission. This is a trust-first
publication for retail security, policing and policy readers, and the taste rules that
govern the rest of the design explicitly let that override aesthetic preference.

Permitted: a single entry rise on the nameplate, a rule-draw on section-head hover.
Everything is suppressed under `prefers-reduced-motion`.

Not permitted here: scroll hijacking, pinned sections, marquees, parallax, WebGPU or
canvas backgrounds. A page that argues from evidence cannot also perform. WebGPU is
available tooling for Teal Sand Studios work; it does not belong on the Signal.

## House rules that are not negotiable

- No em dash anywhere a reader can see it. Use a period, a comma or a colon.
- No invented taxonomies. Sections are named from real magazine architecture (front of
  book, the well, back of book) rather than categories a model found appealing.
- Claim safety governs copy. Every figure is attributed or it does not run.
- The contact address is protocol@mykei.io. No other address has ever existed.
