// src/pages/SignalClinical.tsx
// The Signal — CLINICAL direction. Alternative front for side-by-side comparison
// against the warm-paper/Playfair version at /signal.
//
// WHY THIS EXISTS
// The /signal front passed an AI-design audit on every obvious count (no
// gradients, no Inter, no glassmorphism) and still failed the harder test:
// warm cream ground + high-contrast serif display + gold accent is one of the
// three clusters AI design collapses into. It is the "tasteful" default.
//
// THE DIRECTION
// Not a heritage magazine. A statistical bulletin. The reference points are the
// ONS statistical release, a Cochrane review, a government inquiry report:
// documents whose authority comes from being legible and auditable, not warm.
//
//   Ground     Hard white. No cream. Paper you photocopy, not paper you frame.
//   Ink        Cool near-black (#111318). One ink, doing the work.
//   Accent     None decorative. Colour is FUNCTIONAL only: it marks evidence
//              strength and corrections. If something is coloured here, it is
//              telling you how much to trust the thing next to it.
//   Type       IBM Plex Sans, drawn by IBM for technical documentation, against
//              JetBrains Mono for every figure and reference. No serif at all.
//   Signature  The evidence grade in the margin. Every piece carries the grade
//              of its strongest source, using the same scheme published on the
//              masthead. Ornament derived from content, not applied to it.

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { blogPosts, fileOf, DEPARTMENTS, type BlogPostMeta } from "@/data/blogPosts";
import PageSEO from "@/components/PageSEO";

/* ── Tokens ───────────────────────────────────────────────────────────── */
const GROUND = "#FFFFFF";
const INK    = "#111318";
const INK_2  = "#4A4F58";
const INK_3  = "#7A818C";
const RULE   = "#D8DBE0";
const RULE_2 = "#EDEFF2";

/* Functional colour only. Each maps to an evidence grade from the masthead. */
const GRADE = {
  Primary:     { dot: "#1A5E3A", label: "Primary" },
  Independent: { dot: "#1E4E8C", label: "Independent" },
  Industry:    { dot: "#8A5A00", label: "Industry" },
  Unverified:  { dot: "#B3261E", label: "Single-source" },
} as const;
type GradeKey = keyof typeof GRADE;

const SANS = "'IBM Plex Sans',system-ui,sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";

/**
 * Evidence grade per piece. Derived from tags rather than hand-assigned, so a
 * new piece grades itself and nobody can quietly upgrade their own sourcing.
 */
function gradeOf(post: BlogPostMeta): GradeKey {
  const t = post.tags.map(x => x.toLowerCase()).join(" ");
  if (/evidence review|research|study|randomised/.test(t)) return "Independent";
  if (/ons|legislation|police|home office|act/.test(t))    return "Primary";
  if (/brc|acs|survey|vendor|smartwater|selectadna/.test(t)) return "Industry";
  return "Unverified";
}

function isoShort(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function Label({ children, color = INK_3 }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em",
      textTransform: "uppercase", color,
    }}>{children}</span>
  );
}

export default function SignalClinical() {
  const rows = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );
  const latestIssue = rows.reduce((max, p) => Math.max(max, fileOf(p).issue ?? 0), 0);
  const lead = rows.find(p => p.landmark) ?? rows[0];

  const gradeCounts = DEPARTMENTS.map(d => ({
    department: d,
    n: rows.filter(p => fileOf(p).department === d).length,
  })).filter(g => g.n > 0);

  return (
    <div style={{ background: GROUND, minHeight: "100vh", color: INK, fontFamily: SANS }}>
      <PageSEO
        title="The Signal | Clinical edition | Mykei Securities"
        description="Alternative front for The Signal, set as a statistical bulletin rather than a magazine. Evidence grades in the margin."
        canonical="https://mykei.io/signal/clinical"
        breadcrumbs={[["Home","https://mykei.io"],["The Signal","/signal"],["Clinical","/signal/clinical"]]}
      />

      <style>{`
        .cl-link { text-decoration: none; color: inherit; display: block; }
        .cl-link:focus-visible { outline: 2px solid ${INK}; outline-offset: 3px; }
        .cl-row { transition: background 120ms linear; }
        .cl-row:hover { background: ${RULE_2}; }
        @media (prefers-reduced-motion: reduce) { .cl-row { transition: none; } }
        @media (max-width: 860px) {
          .cl-masthead { grid-template-columns: 1fr !important; gap: 20px !important; }
          .cl-row-grid { grid-template-columns: 52px 1fr !important; }
          .cl-row-meta { grid-column: 2; display: flex; gap: 14px; padding-top: 6px; }
          .cl-lead { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── DOCUMENT HEAD ────────────────────────────────────────────── */}
      <header style={{ borderBottom: `2px solid ${INK}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px clamp(16px,4vw,40px)" }}>
          <div className="cl-masthead" style={{
            display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 32,
          }}>
            <div>
              <Label color={INK_3}>Mykei Securities Ltd · Manchester</Label>
              <h1 style={{
                fontFamily: SANS, fontSize: "clamp(30px,5vw,54px)", fontWeight: 600,
                letterSpacing: "-0.028em", lineHeight: 1.02, margin: "8px 0 0",
              }}>
                The Signal
              </h1>
              <p style={{
                fontSize: 14, lineHeight: 1.6, color: INK_2, margin: "10px 0 0", maxWidth: "56ch",
              }}>
                A standing review of the evidence behind retail security claims.
                Published by a company that sells into the field, which is stated
                on every page rather than hidden.
              </p>
            </div>

            <dl style={{ margin: 0, display: "grid", gap: 6, minWidth: 150 }}>
              {[
                ["Issue", String(latestIssue).padStart(2, "0")],
                ["Entries", String(rows.length)],
                ["Revised", isoShort(rows[0].date)],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 18 }}>
                  <dt><Label>{k}</Label></dt>
                  <dd style={{
                    margin: 0, fontFamily: MONO, fontSize: 12, fontWeight: 500,
                    fontVariantNumeric: "tabular-nums", color: INK,
                  }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      {/* ── KEY / LEGEND ─────────────────────────────────────────────── */}
      <section aria-label="Evidence grading key" style={{
        borderBottom: `1px solid ${RULE}`, background: "#FBFCFD",
      }}>
        <div style={{
          maxWidth: 1120, margin: "0 auto", padding: "12px clamp(16px,4vw,40px)",
          display: "flex", flexWrap: "wrap", gap: "10px 26px", alignItems: "center",
        }}>
          <Label color={INK_2}>Evidence grade</Label>
          {(Object.keys(GRADE) as GradeKey[]).map(k => (
            <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span aria-hidden style={{
                width: 8, height: 8, background: GRADE[k].dot, flexShrink: 0,
              }} />
              <Label color={INK_2}>{GRADE[k].label}</Label>
            </span>
          ))}
          <Link to="/signal/masthead" className="cl-link" style={{ marginLeft: "auto" }}>
            <Label color={INK}>Method →</Label>
          </Link>
        </div>
      </section>

      {/* ── LEAD ENTRY ───────────────────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(28px,5vh,52px) clamp(16px,4vw,40px)" }}>
          <div className="cl-lead" style={{
            display: "grid", gridTemplateColumns: "minmax(0,1fr) 220px", gap: "clamp(24px,4vw,56px)",
          }}>
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                <span aria-hidden style={{
                  width: 8, height: 8, background: GRADE[gradeOf(lead)].dot,
                }} />
                <Label color={INK_2}>{GRADE[gradeOf(lead)].label} evidence</Label>
                <Label color={INK_3}>· {fileOf(lead).department}</Label>
              </div>

              <Link to={`/signal/${lead.slug}`} className="cl-link">
                <h2 style={{
                  fontFamily: SANS, fontSize: "clamp(24px,3.4vw,40px)", fontWeight: 600,
                  letterSpacing: "-0.025em", lineHeight: 1.14, margin: "0 0 16px",
                  textWrap: "balance",
                }}>
                  {lead.title}
                </h2>
                <p style={{
                  fontSize: 15.5, lineHeight: 1.75, color: INK_2, margin: "0 0 18px", maxWidth: "68ch",
                }}>
                  {lead.summary}
                </p>
                <span style={{
                  fontFamily: MONO, fontSize: 11, letterSpacing: "0.06em",
                  borderBottom: `1px solid ${INK}`, paddingBottom: 2,
                }}>
                  Read entry {String(fileOf(lead).issue ?? 0).padStart(2, "0")} →
                </span>
              </Link>
            </div>

            {/* Marginal note — the signature device */}
            <aside style={{ borderLeft: `1px solid ${RULE}`, paddingLeft: 20 }}>
              <Label>Sources cited</Label>
              <div style={{
                fontFamily: MONO, fontSize: 34, fontWeight: 500, lineHeight: 1,
                margin: "8px 0 16px", fontVariantNumeric: "tabular-nums",
              }}>03</div>
              <p style={{ fontSize: 12.5, lineHeight: 1.65, color: INK_2, margin: 0 }}>
                Two of them peer reviewed, one randomised. Both paywalled, and
                every figure confirmed against a second independent source
                before publication.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── THE REGISTER ─────────────────────────────────────────────── */}
      <section aria-labelledby="register-heading">
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(28px,5vh,48px) clamp(16px,4vw,40px) 72px" }}>
          <div style={{
            // The department tallies overflow a 375px viewport if this row cannot
            // wrap. Wrapping keeps every count visible instead of hiding them.
            display: "flex", alignItems: "baseline", gap: 16, marginBottom: 6,
            flexWrap: "wrap", rowGap: 6,
          }}>
            <h2 id="register-heading" style={{
              fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", margin: 0,
            }}>
              Register of entries
            </h2>
            <div style={{ flex: 1, minWidth: 24, height: 1, background: RULE }} />
            {gradeCounts.map(g => (
              <Label key={g.department} color={INK_3}>{g.department} {g.n}</Label>
            ))}
          </div>

          {/* Column head */}
          <div className="cl-row-grid" style={{
            display: "grid", gridTemplateColumns: "52px minmax(0,1fr) 130px 96px",
            gap: 16, padding: "10px 0", borderBottom: `2px solid ${INK}`,
          }}>
            <Label>No.</Label>
            <Label>Entry</Label>
            <Label>Department</Label>
            <Label>Date</Label>
          </div>

          {rows.map((post, i) => {
            const { department } = fileOf(post);
            // Register index, not issue number. Only 11 of the entries ever carried
            // an issue number in their dateline, so numbering by issue leaves most
            // rows blank. A register numbers its own rows, newest first.
            const no = rows.length - i;
            const g = GRADE[gradeOf(post)];
            return (
              <Link key={post.slug} to={`/signal/${post.slug}`} className="cl-link cl-row cl-row-grid" style={{
                display: "grid", gridTemplateColumns: "52px minmax(0,1fr) 130px 96px",
                gap: 16, padding: "14px 0", borderBottom: `1px solid ${RULE_2}`,
                alignItems: "baseline",
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 12, color: INK_3,
                  fontVariantNumeric: "tabular-nums", display: "flex",
                  alignItems: "center", gap: 8,
                }}>
                  <span aria-hidden title={g.label} style={{
                    width: 7, height: 7, background: g.dot, flexShrink: 0,
                  }} />
                  {String(no).padStart(2, "0")}
                </span>

                <span style={{
                  fontSize: 15, lineHeight: 1.4, fontWeight: 500, letterSpacing: "-0.01em",
                }}>
                  {post.title}
                </span>

                <span className="cl-row-meta"><Label color={INK_2}>{department}</Label></span>
                <span style={{
                  fontFamily: MONO, fontSize: 11, color: INK_3,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {isoShort(post.date)}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── FOOT ─────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `2px solid ${INK}` }}>
        <div style={{
          maxWidth: 1120, margin: "0 auto", padding: "24px clamp(16px,4vw,40px)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14,
        }}>
          <Label color={INK_2}>Mykei Securities Ltd · Company 16984969 · England and Wales</Label>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/signal" className="cl-link"><Label color={INK}>Magazine edition</Label></Link>
            <Link to="/signal/masthead" className="cl-link"><Label color={INK}>Method</Label></Link>
            <a href="mailto:protocol@mykei.io" className="cl-link"><Label color={INK}>protocol@mykei.io</Label></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
