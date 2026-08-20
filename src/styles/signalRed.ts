// src/styles/signalRed.ts
// Tokens for The Signal, red edition.
//
// This file exists because the gold accent was previously declared five
// separate times across the Signal pages, drifted into five different values,
// and two of them failed WCAG AA. One source of truth, measured once.
//
// CONTRAST, measured against GROUND (#FFFFFF):
//   INK    #111318  17.9:1   body and display
//   INK_2  #4A4F58   8.0:1   secondary prose
//   INK_3  #767D88   4.5:1   labels — AA at body size, do not darken the page with it
//   RED    #D8001F   5.3:1   AA at every size, including 10px mono labels
//
// RED belongs to the PUBLICATION: nameplate, department heads, kickers, rules.
// It never encodes an evidence grade. Grades are set in words, so they survive
// greyscale, photocopying and colour blindness.

export const RED_EDITION = {
  GROUND: "#FFFFFF",
  INK:    "#111318",
  INK_2:  "#4A4F58",
  INK_3:  "#767D88",
  RULE:   "#D8DBE0",
  RULE_2: "#EDEFF2",
  RED:    "#D8001F",
} as const;

export const RED_TYPE = {
  /**
   * Nameplate only. A magazine is allowed one decorative face, and it belongs
   * to the wordmark: Vogue sets a high contrast display serif over a sans body
   * for exactly this reason. Playfair Display is already self-hosted for the
   * other edition, so this costs no new bytes and stays inside the CSP, which
   * blocks Google Fonts. Do not use it for body copy.
   */
  DISPLAY: "'Playfair Display',Georgia,serif",
  /** IBM Plex Sans, drawn by IBM for technical documentation. Self-hosted. */
  SANS: "'IBM Plex Sans',system-ui,sans-serif",
  /** Every figure, date and reference. Self-hosted. */
  MONO: "'JetBrains Mono',ui-monospace,monospace",
} as const;
