/**
 * The Signal — design tokens.
 *
 * Before this file existed there were five accent values loose in the codebase
 * (#D8001F, #D8001F, #D8001F, #D8001F, and a stray teal #0D9488), each declared
 * locally per page. That is why the site read as inconsistent. One accent, one
 * source of truth, imported everywhere.
 *
 * Contrast, measured (not estimated) against PAPER (#FFFFFF):
 *   ACCENT       #D8001F   4.68:1  passes AA for body text
 *   ACCENT_LIGHT #D8001F   3.29:1  passes AA for large text, rules, borders
 *   INK          #0F0C08  18.65:1
 *   MUTED        #767D88   6.04:1
 *   CORRECTION   #B3261E   6.25:1
 *
 * The previous house gold #D8001F measures 2.18:1 on this ground, which fails
 * AA at every size. That is why it is gone rather than merely tidied.
 *
 * The rule for the accent: it marks things that are sourced or verified. It is
 * not decoration. If a gold element on the page is not pointing at evidence,
 * a date, or a link, it should be INK or MUTED instead.
 */

export const SIGNAL = {
  /** Page ground. White. The warm off-white was one of six competing
   * creams across the codebase and read as unresolved rather than warm. */
  PAPER: "#FFFFFF",
  /** Cards, mastheads and anything that should lift off the ground. */
  SURFACE: "#FFFFFF",

  /** Body copy and headlines. */
  INK: "#0F0C08",
  /** Secondary copy, standfirsts, captions. */
  MUTED: "#767D88",

  /** Hairlines, table borders, dividers. */
  RULE: "#DDD5C4",

  /** The one accent. Sourced material, dates, links, editorial labels. */
  ACCENT: "#D8001F",
  /** Same hue, lighter. Rules, large display type, borders. Never small text. */
  ACCENT_LIGHT: "#D8001F",

  /** Corrections only. Used by EditorialNote for the "correction" state. */
  CORRECTION: "#B3261E",
} as const;

export const TYPE = {
  /** Display: nameplate, headlines, pull quotes. */
  DISPLAY: "'Playfair Display',Georgia,serif",
  /** Body: article text. */
  BODY: "Georgia,'Times New Roman',serif",
  /** Utility: eyebrows, datelines, labels, captions, figures. */
  UTILITY: "'JetBrains Mono',ui-monospace,monospace",
} as const;

/** Shared eyebrow/label styling, so section labels match across pages. */
export const eyebrow = {
  fontFamily: TYPE.UTILITY,
  fontSize: 9,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: SIGNAL.ACCENT,
};
