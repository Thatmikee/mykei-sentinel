// src/pages/SignalClinical.tsx
// The Signal — the red edition. Front page of a retail security publication.
//
// WHY THIS EXISTS
// The /signal front passed an AI-design audit on every obvious count and still
// failed the harder test: warm cream + serif display + gold accent is one of
// the three clusters AI design collapses into. The clinical rebuild fixed the
// palette but replaced one tell with another — a four-swatch colour legend, a
// department tally strip, and twenty-seven rows of identical weight. That is a
// dashboard, not a magazine.
//
// THE DIRECTION
// One red, one ink, white paper. Scale contrast carries the hierarchy the way
// it does in a print title. Nothing is colour-coded.
//
// STRUCTURE, AND WHERE IT COMES FROM
// The front was previously organised into five departments named Evidence,
// Data, Policy, Field and Doctrine. Those were invented here. No magazine uses
// them, and a taxonomy nobody outside this repo recognises is a liability
// dressed as an editorial system.
//
// This version uses the actual architecture of a magazine, which is positional
// rather than topical:
//   Cover          the one piece the issue is sold on
//   The well       the features, the long substantial reads, set large
//   Front of book  the short pieces, set compact, headline and date
//   Back of book   the complete dated index of everything published
// Weight is derived from what we already record, length and landmark status,
// so nothing has to be hand-classified into a category somebody invented.
//
//   Ground   Hard white. Paper you photocopy, not paper you frame.
//   Ink      Cool near-black (#111318). One ink doing the work.
//   Red      #D8001F, 5.33:1 on white, so it is legible at body size as well
//            as display size. It belongs to the PUBLICATION — nameplate,
//            department heads, kickers. It never grades a source.
//   Type     IBM Plex Sans, drawn by IBM for technical documentation, against
//            JetBrains Mono for every figure, date and reference. The NAMEPLATE
//            is the single exception: Playfair Display, because the masthead of
//            a magazine is a wordmark rather than a heading, and a trade title
//            is recognised by it. Body copy stays sans. Do not "restore
//            consistency" by setting the nameplate in Plex.
//
// WHY GRADE IS NO LONGER A COLOURED SQUARE
// The evidence grade used to be a coloured dot nested inside the No. column.
// Two problems. Removing that column would have silently removed the grade
// with it, and hot red collided head-on with the existing "Single-source" red
// in the same four-swatch legend. Grade is now set in words in the margin,
// which is more legible, survives greyscale, and leaves red to the masthead.

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { blogPosts, type BlogPostMeta } from "@/data/blogPosts";
import PageSEO from "@/components/PageSEO";
import SignalSearch from "@/components/SignalSearch";

/* ── Tokens ───────────────────────────────────────────────────────────── */
// Single source of truth, shared with the article pages of this edition.
import { RED_EDITION, RED_TYPE } from "@/styles/signalRed";

const { GROUND, INK, INK_2, INK_3, RULE, RULE_2, RED } = RED_EDITION;
const { SANS, MONO, DISPLAY } = RED_TYPE;

/**
 * Evidence grade per piece, derived from tags rather than hand-assigned, so a
 * new piece grades itself and nobody can quietly upgrade their own sourcing.
 * Set in words, never in colour. The full scheme is published on the masthead.
 */
function gradeOf(post: BlogPostMeta): string | null {
  const t = post.tags.map(x => x.toLowerCase()).join(" ");
  // Word boundaries matter here. An earlier version matched a bare "act",
  // which is a substring of "tactical" and "action", and so graded a piece
  // tagged "tactical multi-zone sensor array" as PRIMARY evidence. Printing an
  // unearned high grade is worse than printing none.
  if (/evidence review|research|\bstudy\b|randomised|peer.reviewed/.test(t)) return "Independent";
  if (/\bons\b|legislation|\bpolice\b|home office|\bact\b|statutory instrument|hansard/.test(t)) return "Primary";
  if (/\bbrc\b|\bacs\b|survey|vendor|smartwater|selectadna/.test(t)) return "Industry";
  // No match means we have not graded this piece, which is not the same as
  // grading it weak. An earlier draft printed "Single source" here and so
  // labelled twenty of twenty-seven entries with a verdict nobody had reached.
  // Grade is a claim about sourcing and has to be earned by reading the piece.
  return null;
}

/** Meta line. Grade is omitted entirely when the piece has not been graded. */
function metaLine(post: BlogPostMeta, withReadingTime = false): string {
  const parts = [isoShort(post.date)];
  const g = gradeOf(post);
  if (g) parts.push(g);
  if (withReadingTime) parts.push(post.readingTime);
  return parts.join(" · ");
}

function isoShort(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/** Section head with a rule running off to the right. Standing furniture. */
function SectionRule({ id, children }: { id?: string; children: React.ReactNode }) {
  // Set in the display face, sentence case. Every section previously opened
  // with an uppercase letterspaced mono micro-label, which is the reflex
  // eyebrow that generated pages apply to everything. Caps are now reserved
  // for the masthead dateline, where they are genuine newspaper furniture.
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 22 }}>
      <h2 id={id} style={{
        fontFamily: DISPLAY, fontSize: "clamp(20px,2.1vw,27px)", letterSpacing: "-0.015em",
        color: INK, margin: 0, fontWeight: 900, whiteSpace: "nowrap", lineHeight: 1,
      }}>{children}</h2>
      <div aria-hidden style={{ flex: 1, height: 1, background: RULE }} />
    </div>
  );
}

function Label({ children, color = INK_3, size = 10 }: {
  children: React.ReactNode; color?: string; size?: number;
}) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: size, letterSpacing: "0.09em",
      textTransform: "uppercase", color,
    }}>{children}</span>
  );
}

/** Dates and reading times. Mono and tabular, but NOT shouted in caps. */
function Meta({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: 11, color: INK_3,
      fontVariantNumeric: "tabular-nums", letterSpacing: "0.01em",
    }}>{children}</span>
  );
}

export default function SignalClinical() {
  const rows = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  /** Minutes, parsed from the readingTime string we already record. */
  const minutesOf = (p: BlogPostMeta) => parseInt(p.readingTime, 10) || 0;

  const lead = rows.find(p => p.landmark) ?? rows[0];
  const rest = rows.filter(p => p.slug !== lead.slug);

  // The well: the substantial pieces. Front of book: the short ones. Split on
  // evidence we already hold rather than on a category somebody assigned.
  const isFeature = (p: BlogPostMeta) => p.landmark === true || minutesOf(p) >= 7;
  // Three, not four. The well grid is 6 + 3 + 3 columns, so a fourth item
  // wraps to a second row on its own and leaves a hole beside it.
  const well = rest.filter(isFeature).slice(0, 3);
  const wellSlugs = new Set(well.map(p => p.slug));
  const frontOfBook = rest.filter(p => !wellSlugs.has(p.slug) && !isFeature(p)).slice(0, 8);

  // Back of book carries EVERYTHING, including pieces shown above. An index
  // that omits what it has already displayed is not an index.
  const backOfBook = rows;

  const issueNo = String(rows.length).padStart(3, "0");
  const revised = isoShort(rows[0].date);

  return (
    <div style={{
      background: GROUND, minHeight: "100vh", color: INK, fontFamily: SANS,
      position: "relative",
    }}>
      <PageSEO
        title="The Signal | Retail security, reviewed against the evidence"
        description="A standing review of the evidence behind retail security claims: research, data, policy and what actually happens in shops."
        canonical="https://mykei.io/signal"
        breadcrumbs={[["Home","https://mykei.io"],["The Signal","/signal"]]}
      />

      <style>{`
        .sg-link { text-decoration: none; color: inherit; display: block; }
        .sg-link:focus-visible { outline: 2px solid ${RED}; outline-offset: 4px; }

        /* Headline hover draws a rule rather than recolouring the text. A
           colour swap on a serif-free headline reads as a broken link; a rule
           drawing in reads as a page that is paying attention. */
        .sg-head { position: relative; display: inline; background-image: linear-gradient(${RED}, ${RED});
                   background-repeat: no-repeat; background-position: 0 100%;
                   background-size: 0% 2px; transition: background-size 260ms cubic-bezier(.2,.7,.3,1); }
        .sg-link:hover .sg-head, .sg-link:focus-visible .sg-head { background-size: 100% 2px; }

        /* One orchestrated page load. Staggered, short, and once. */
        @keyframes sg-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .sg-rise { animation: sg-rise 620ms cubic-bezier(.16,.84,.44,1) both; }

        /* Playfair drop cap on the lead. The nameplate face reappearing once in
           the body is what ties a masthead to its page. */
        .sg-drop::first-letter {
          font-family: ${DISPLAY}; font-weight: 900; color: ${RED};
          float: left; font-size: 3.35em; line-height: 0.82;
          padding: 6px 12px 0 0; margin-top: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sg-head { transition: none; }
          .sg-rise { animation: none; }
        }
        @media (max-width: 900px) {
          .sg-plate { grid-template-columns: 1fr !important; gap: 20px !important; }
          .sg-lead  { grid-template-columns: 1fr !important; }
          .sg-tier  { grid-template-columns: 1fr !important; }
          .sg-dept  { grid-template-columns: 1fr !important; gap: 12px !important; }
          .sg-feature { grid-column: auto !important; }
          .sg-fob { grid-template-columns: 1fr !important; }
          .sg-index { grid-template-columns: 1fr !important; gap: 5px !important; }
          .sg-ghost { display: none !important; }
        }
      `}</style>

      {/* Paper grain. Barely there, but a flat white ground is the thing that
          makes a clinical page read as a wireframe rather than a printed page. */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.5,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/><feColorMatrix type='saturate' values='0'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.032'/></svg>\")",
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>

      <div aria-hidden style={{ height: 7, background: RED }} />

      {/* ── MASTHEAD ─────────────────────────────────────────────────────
          Nameplate plus furniture. A trade title is recognised by the block
          as a whole: dateline above, hairline rules, standing matter below. */}
      <header style={{ borderBottom: `2px solid ${INK}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(16px,4vw,44px) 20px" }}>

          <div className="sg-rise" style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: 16, padding: "11px 0", borderBottom: `1px solid ${RULE}`, flexWrap: "wrap",
          }}>
            <Label color={INK_2}>Mykei Securities Ltd · Manchester</Label>
            <Label color={INK_2}>No. {issueNo}</Label>
            <Label color={INK_2}>{revised}</Label>
          </div>

          <h1 className="sg-rise" style={{
            fontFamily: DISPLAY, fontSize: "clamp(46px,12vw,150px)", fontWeight: 900,
            letterSpacing: "-0.012em", lineHeight: 0.94, margin: 0,
            color: RED, textTransform: "uppercase", padding: "14px 0 8px",
            animationDelay: "60ms",
          }}>
            The Signal
          </h1>

          <div aria-hidden style={{ height: 1, background: INK, marginBottom: 16 }} />

          <div className="sg-plate sg-rise" style={{
            display: "grid", gridTemplateColumns: "minmax(0,1fr) auto",
            alignItems: "end", gap: 40, animationDelay: "120ms",
          }}>
            <div>
              <p style={{
                fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.45, color: INK,
                margin: 0, maxWidth: "44ch", fontWeight: 500, letterSpacing: "-0.012em",
              }}>
                Retail security, reviewed against the evidence.
              </p>
              <p style={{
                fontSize: 13, lineHeight: 1.6, color: INK_2, margin: "8px 0 0", maxWidth: "58ch",
              }}>
                Research, data, policy, and what actually happens in shops.
                Published by a company that sells into this field, which is
                stated on every page rather than buried.
              </p>
            </div>

            <div style={{ display: "grid", gap: 14, justifyItems: "end" }}>
            <SignalSearch />
            <dl style={{ margin: 0, display: "grid", gap: 5, minWidth: 168, width: "100%" }}>
              {[
                ["Entries", String(rows.length)],
                ["Revised", revised],
                ["Method", "Stated in full"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
                  <dt><Label>{k}</Label></dt>
                  <dd style={{
                    margin: 0, fontFamily: MONO, fontSize: 11.5, fontWeight: 500,
                    fontVariantNumeric: "tabular-nums", color: INK,
                  }}>{v}</dd>
                </div>
              ))}
            </dl>
            </div>
          </div>
        </div>
      </header>

      {/* ── LEAD ─────────────────────────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${RULE}` }}>
        {/* Narrower measure. The cover story is the one thing on this page
            somebody actually reads at length, so it gets a reading width
            rather than the page-wide container used everywhere else. */}
        <div style={{ maxWidth: 1010, margin: "0 auto", padding: "clamp(30px,5vh,58px) clamp(16px,4vw,44px)" }}>
          <div className="sg-lead sg-rise" style={{
            display: "grid", gridTemplateColumns: "minmax(0,1fr) 228px",
            gap: "clamp(26px,4vw,60px)", animationDelay: "180ms",
          }}>
            <div>
              <Label color={RED} size={11}>Cover story</Label>

              <Link to={`/signal/${lead.slug}`} className="sg-link" style={{ marginTop: 14 }}>
                <h2 style={{
                  fontFamily: SANS, fontSize: "clamp(30px,4.6vw,60px)", fontWeight: 600,
                  letterSpacing: "-0.035em", lineHeight: 1.04, margin: "0 0 18px",
                  textWrap: "balance",
                }}>
                  <span className="sg-head">{lead.title}</span>
                </h2>
                <p className="sg-drop" style={{
                  fontSize: "clamp(15.5px,1.5vw,18px)", lineHeight: 1.66, color: INK_2,
                  margin: "0 0 20px", maxWidth: "64ch",
                }}>
                  {lead.summary}
                </p>
                <span style={{
                  fontFamily: MONO, fontSize: 11, letterSpacing: "0.07em",
                  textTransform: "uppercase", color: RED,
                  borderBottom: `1px solid ${RED}`, paddingBottom: 3,
                }}>
                  Read in full →
                </span>
              </Link>
            </div>

            {/* No coloured left stripe. A red rule down the side of a panel is
                the most reliable single tell of generated design, and this
                aside does not need one: it is already separated by position,
                measure and a neutral hairline, which is how a print sidebar
                has always been set. */}
            <aside style={{ borderTop: `1px solid ${INK}`, paddingTop: 16, alignSelf: "start" }}>
              {gradeOf(lead) && (
                <>
                  <Label>Evidence grade</Label>
                  <div style={{
                    fontFamily: SANS, fontSize: 21, fontWeight: 600, letterSpacing: "-0.02em",
                    margin: "6px 0 18px", lineHeight: 1.2,
                  }}>{gradeOf(lead)}</div>
                </>
              )}

              {lead.sourcesCited !== undefined && (
                <>
                  <Label>Sources cited</Label>
                  <div style={{
                    fontFamily: MONO, fontSize: 32, fontWeight: 500, lineHeight: 1,
                    margin: "6px 0 14px", fontVariantNumeric: "tabular-nums",
                  }}>{String(lead.sourcesCited).padStart(2, "0")}</div>
                </>
              )}

              {lead.sourceNote && (
                <p style={{ fontSize: 12.5, lineHeight: 1.65, color: INK_2, margin: 0 }}>
                  {lead.sourceNote}
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ── THE WELL ─────────────────────────────────────────────────
          The features. In print this is the centre of the magazine and it is
          where the substantial reads live. First one runs wider, because a
          row of identical columns is the shape a template produces. */}
      <section aria-labelledby="well-heading" style={{ borderBottom: `2px solid ${INK}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(26px,4vh,46px) clamp(16px,4vw,44px)" }}>
          <SectionRule id="well-heading">The well</SectionRule>

          <div className="sg-tier sg-rise" style={{
            display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))",
            gap: "clamp(22px,3vw,44px)", animationDelay: "240ms",
          }}>
            {well.map((post, i) => (
              <Link key={post.slug} to={`/signal/${post.slug}`}
                className={`sg-link${i === 0 ? " sg-feature" : ""}`}
                style={{ gridColumn: i === 0 ? "span 6" : "span 3" }}>
                <h3 style={{
                  fontFamily: SANS,
                  fontSize: i === 0 ? "clamp(21px,2.4vw,30px)" : "clamp(17px,1.6vw,20px)",
                  fontWeight: 600, letterSpacing: "-0.024em", lineHeight: 1.18,
                  margin: "0 0 10px", textWrap: "balance",
                }}>
                  <span className="sg-head">{post.title}</span>
                </h3>
                <p style={{
                  fontSize: i === 0 ? 15 : 13.5, lineHeight: 1.6, color: INK_2, margin: "0 0 12px",
                }}>
                  {post.summary}
                </p>
                <Meta>{metaLine(post, true)}</Meta>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRONT OF BOOK ────────────────────────────────────────────
          Short pieces, set compact. Headline and date, nothing else: the
          point of a front of book is that you can scan the whole of it. */}
      {frontOfBook.length > 0 && (
        <section aria-labelledby="fob-heading" style={{ borderBottom: `1px solid ${RULE}` }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(26px,4vh,44px) clamp(16px,4vw,44px)" }}>
            <SectionRule id="fob-heading">Front of book</SectionRule>

            <div className="sg-fob" style={{
              display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              columnGap: "clamp(30px,5vw,72px)",
            }}>
              {frontOfBook.map(post => (
                <Link key={post.slug} to={`/signal/${post.slug}`} className="sg-link" style={{
                  padding: "12px 0", borderBottom: `1px solid ${RULE_2}`,
                }}>
                  <h3 style={{
                    fontFamily: SANS, fontSize: 16, fontWeight: 500,
                    letterSpacing: "-0.014em", lineHeight: 1.35, margin: "0 0 5px",
                  }}>
                    <span className="sg-head">{post.title}</span>
                  </h3>
                  <Meta>{metaLine(post, true)}</Meta>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BACK OF BOOK ─────────────────────────────────────────────
          The complete dated index. Everything published, newest first,
          including the pieces shown above. An index that omits what it has
          already displayed is not an index. */}
      <section aria-labelledby="bob-heading">
        {/* Wider. A dense dated register wants the run of the page; forcing it
            into the same measure as the features is the single-container
            reflex, not a decision. */}
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(26px,4vh,46px) clamp(16px,4vw,44px) 76px" }}>
          <SectionRule id="bob-heading">Back of book</SectionRule>

          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {backOfBook.map(post => (
              <li key={post.slug}>
                <Link to={`/signal/${post.slug}`} className="sg-link sg-index" style={{
                  display: "grid", gridTemplateColumns: "minmax(0,1fr) auto",
                  gap: 20, alignItems: "baseline",
                  padding: "11px 0", borderBottom: `1px solid ${RULE_2}`,
                }}>
                  <span style={{
                    fontFamily: SANS, fontSize: 15.5, fontWeight: 500,
                    letterSpacing: "-0.012em", lineHeight: 1.4,
                  }}>
                    <span className="sg-head">{post.title}</span>
                  </span>
                  <Meta>{metaLine(post, true)}</Meta>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FOOT ─────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `2px solid ${INK}` }}>
        <div style={{
          maxWidth: 1180, margin: "0 auto", padding: "22px clamp(16px,4vw,44px) 40px",
          display: "flex", flexWrap: "wrap", gap: "14px 30px", alignItems: "baseline",
        }}>
          <Label color={INK_2}>Mykei Securities Ltd · Company 16984969 · England and Wales</Label>
          <div style={{ flex: 1, minWidth: 20 }} />
          <Link to="/signal/masthead" className="sg-link"><Label color={RED}>Masthead and method</Label></Link>
          <Link to="/signal/magazine" className="sg-link"><Label color={INK_2}>Previous edition</Label></Link>
          <Label color={INK_2}>protocol@mykei.io</Label>
        </div>
      </footer>

      </div>
    </div>
  );
}
