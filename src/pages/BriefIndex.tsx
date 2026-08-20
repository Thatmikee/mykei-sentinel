// src/pages/BriefIndex.tsx
// The Signal — magazine front.
//
// This was a newspaper-style front page: nameplate, lead plus three secondary,
// then a card grid. Structurally that is a landing page wearing a masthead.
//
// A magazine opens with a COVER: one issue, one cover line set enormous, a few
// secondary lines, a folio. Then CONTENTS. Then the archive. The typographic
// range is the point — a cover line at ~96px against contents at 13px is what
// separates a publication from a blog index.

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts, fileOf, DEPARTMENTS, DEPARTMENT_BLURB } from "@/data/blogPosts";
import PageSEO from "@/components/PageSEO";
import { SIGNAL } from "@/styles/signalTokens";

const INK    = SIGNAL.INK;
const GOLD   = SIGNAL.ACCENT;
const PAPER  = SIGNAL.PAPER;
const MUTED  = SIGNAL.MUTED;
const RULE   = SIGNAL.RULE;
const WHITE  = SIGNAL.SURFACE;

const DISPLAY = "'Playfair Display',Georgia,serif";
const MONO    = "'JetBrains Mono',ui-monospace,monospace";

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function monthYear(iso: string): string {
  const [year, month] = iso.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-GB", {
    month: "long", year: "numeric",
  });
}

const sorted       = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const cover        = sorted.find(p => p.landmark) ?? sorted[0];
const coverLines   = sorted.filter(p => p.slug !== cover.slug).slice(0, 3);
const archive      = sorted.filter(p => p.slug !== cover.slug);
const latestIssue  = sorted.reduce((max, p) => Math.max(max, fileOf(p).issue ?? 0), 0);

const contents = DEPARTMENTS
  .map(d => ({
    department: d,
    blurb: DEPARTMENT_BLURB[d],
    posts: sorted.filter(p => fileOf(p).department === d),
  }))
  .filter(g => g.posts.length > 0);

/** Small caps utility label. Used for folios, eyebrows and department marks. */
function Folio({ children, color = MUTED, size = 9, wrap = false }: {
  children: React.ReactNode; color?: string; size?: number; wrap?: boolean;
}) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: size, letterSpacing: "0.22em",
      textTransform: "uppercase", color,
      // Nav labels must never break mid-phrase; long colophon lines must.
      whiteSpace: wrap ? "normal" : "nowrap",
    }}>
      {children}
    </span>
  );
}

export default function BriefIndex() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ backgroundColor: PAPER, minHeight: "100vh", color: INK }}>
      <PageSEO
        title="The Signal | Retail Security Intelligence | Mykei Securities"
        description="Research and analysis on retail theft economics, forensic security, and Economic Sterilisation. Published for independent retailers, investors, policy-makers, and anyone fighting organised retail crime."
        canonical="https://mykei.io/signal"
        keywords="retail theft intelligence, economic sterilisation, organised retail crime, ADN forensic security, retail crime research, evidence review, retail security for enterprise"
        ogImageAlt="The Signal: retail security intelligence by Mykei Securities"
        breadcrumbs={[["Home","https://mykei.io"],["The Signal","/signal"]]}
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": "https://mykei.io/signal",
          "name": "The Signal",
          "description": "Retail security intelligence. Research on Economic Sterilisation, organised retail crime, and the ADN.",
          "url": "https://mykei.io/signal",
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" },
          "blogPost": sorted.slice(0, 6).map(p => ({
            "@type": "BlogPosting",
            "headline": p.title,
            "description": p.summary,
            "url": `https://mykei.io/signal/${p.slug}`,
            "author": { "@type": "Person", "name": "Michael Esema", "url": "https://michaelesema.com" },
            "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd" },
            "datePublished": p.date,
            "keywords": p.tags?.join(", "),
          })),
        })}
      />

      <style>{`
        /* The running head overflowed its 54px bar at 375px: every label
           wrapped and collided. Tighten, then shed the least important link. */
        @media (max-width: 720px) {
          .sig-nav-secondary { display: none !important; }
        }
        /* Inline styles sit on the inner span, so the override must target it. */
        @media (max-width: 460px) {
          .sig-nav-wordmark span { font-size: 7.5px !important; letter-spacing: 0.1em !important; }
          .sig-nav-cta span { font-size: 7.5px !important; letter-spacing: 0.1em !important; }
          .sig-nav-cta { padding: 6px 9px !important; }
        }
        @media (max-width: 900px) {
          .sig-cover-grid { grid-template-columns: 1fr !important; }
          .sig-cover-rail { border-left: none !important; padding-left: 0 !important;
                            border-top: 1px solid ${RULE}; padding-top: 28px; margin-top: 28px; }
          .sig-contents-grid { grid-template-columns: 1fr !important; }
        }
        .sig-link { text-decoration: none; color: inherit; display: block; }
        .sig-link:focus-visible { outline: 3px solid ${GOLD}; outline-offset: 4px; }
        .sig-row { transition: background 160ms ease; }
        .sig-row:hover { background: ${WHITE}; }
        @media (prefers-reduced-motion: reduce) {
          .sig-row { transition: none; }
        }
      `}</style>

      {/* ─── RUNNING HEAD ─────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,250,246,0.96)" : "transparent",
        borderBottom: scrolled ? `1px solid ${RULE}` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px,4vw,48px)", height: 54,
        transition: "background 200ms ease, border-color 200ms ease",
      }}>
        <a href="/" className="sig-link sig-nav-wordmark"><Folio color={INK} size={9}>Mykei Securities</Folio></a>
        <div style={{ display: "flex", gap: "clamp(14px,2.5vw,26px)", alignItems: "center" }}>
          <Link to="/signal/masthead" className="sig-link"><Folio>Masthead</Folio></Link>
          <a href="/howitworks" className="sig-link sig-nav-secondary"><Folio>How It Works</Folio></a>
          <a href="/contact" className="sig-link sig-nav-cta" style={{
            color: GOLD, border: `1px solid ${GOLD}`, padding: "7px 14px",
          }}><Folio color={GOLD}>Get New Reviews</Folio></a>
        </div>
      </nav>

      {/* ─── COVER ────────────────────────────────────────────────────── */}
      <header style={{
        minHeight: "100svh", display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "78px clamp(16px,4vw,48px) 32px",
        maxWidth: 1240, margin: "0 auto", boxSizing: "border-box",
      }}>
        {/* Nameplate */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 2, background: INK }} />
            <Folio size={8}>Retail Security Intelligence</Folio>
            <div style={{ flex: 1, height: 2, background: INK }} />
          </div>

          <h1 style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(52px,13vw,168px)",
            // Playfair has deep descenders. At 0.84 the 'g' in Signal collided
            // with the folio rule and obscured the issue number.
            fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.045em",
            textAlign: "center", margin: "0 0 6px",
          }}>
            The Signal
          </h1>

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            flexWrap: "wrap", gap: 8,
            borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`,
            padding: "9px 0",
          }}>
            <Folio size={8.5}>Published by Mykei Securities Ltd · Manchester</Folio>
            <Folio size={8.5} color={GOLD}>Vol. 1 · No. {latestIssue}</Folio>
            <Folio size={8.5}>{monthYear(cover.date)}</Folio>
          </div>
        </div>

        {/* Cover line + rail */}
        <div className="sig-cover-grid" style={{
          display: "grid", gridTemplateColumns: "minmax(0,1.9fr) minmax(0,1fr)",
          gap: "clamp(24px,4vw,56px)", alignItems: "start",
          padding: "clamp(28px,5vh,56px) 0",
        }}>
          <div>
            <div style={{ marginBottom: 18 }}>
              <Folio color={GOLD}>{fileOf(cover).department}</Folio>
              <Folio color={MUTED}>{"  ·  "}{cover.readingTime}</Folio>
            </div>

            <Link to={`/signal/${cover.slug}`} className="sig-link">
              <h2 style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(28px,4vw,54px)",
                fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.025em",
                margin: "0 0 20px", textWrap: "balance",
              }}>
                {cover.title}
              </h2>
              <p style={{
                fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.7, color: MUTED,
                maxWidth: "62ch", margin: "0 0 22px",
              }}>
                {cover.summary}
              </p>
              <span style={{
                fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em",
                textTransform: "uppercase", color: GOLD,
                borderBottom: `1px solid ${GOLD}`, paddingBottom: 3,
              }}>
                Read this issue
              </span>
            </Link>
          </div>

          {/* Also in this issue */}
          <aside className="sig-cover-rail" style={{
            borderLeft: `1px solid ${RULE}`, paddingLeft: "clamp(20px,2.5vw,34px)",
          }}>
            <div style={{ marginBottom: 16 }}><Folio size={8}>Also in this issue</Folio></div>
            {coverLines.map((p) => (
              <Link key={p.slug} to={`/signal/${p.slug}`} className="sig-link" style={{ marginBottom: 18 }}>
                <div style={{ marginBottom: 5 }}>
                  <Folio size={8} color={GOLD}>{fileOf(p).department}</Folio>
                </div>
                <div style={{
                  fontFamily: DISPLAY, fontSize: "clamp(15px,1.5vw,18px)",
                  lineHeight: 1.28, letterSpacing: "-0.01em",
                }}>
                  {p.title}
                </div>
              </Link>
            ))}
          </aside>
        </div>

        <div style={{ textAlign: "center" }}><Folio size={8}>Contents below</Folio></div>
      </header>

      {/* ─── CONTENTS ─────────────────────────────────────────────────── */}
      <section aria-labelledby="contents-heading" style={{
        background: WHITE, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}`,
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(40px,7vh,84px) clamp(16px,4vw,48px)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
            <h2 id="contents-heading" style={{
              fontFamily: DISPLAY, fontSize: "clamp(24px,3.2vw,38px)",
              fontWeight: 700, letterSpacing: "-0.02em", margin: 0,
            }}>
              Contents
            </h2>
            <div style={{ flex: 1, height: 1, background: RULE }} />
            <Folio size={8}>{sorted.length} pieces</Folio>
          </div>

          <div className="sig-contents-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
            gap: "clamp(28px,4vw,52px)",
          }}>
            {contents.map((g) => (
              <div key={g.department}>
                <div style={{
                  display: "flex", alignItems: "baseline", gap: 10,
                  borderBottom: `2px solid ${INK}`, paddingBottom: 8, marginBottom: 4,
                }}>
                  <Folio color={INK} size={10}>{g.department}</Folio>
                  <div style={{ flex: 1 }} />
                  <Folio size={8}>{g.posts.length}</Folio>
                </div>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: MUTED, margin: "10px 0 14px" }}>
                  {g.blurb}
                </p>

                {g.posts.map((p) => {
                  const { issue } = fileOf(p);
                  return (
                    <Link key={p.slug} to={`/signal/${p.slug}`} className="sig-link sig-row" style={{
                      display: "flex", gap: 12, alignItems: "baseline",
                      padding: "9px 6px 9px 0", borderBottom: `1px solid ${RULE}`,
                    }}>
                      <span style={{
                        fontFamily: MONO, fontSize: 10, color: GOLD,
                        minWidth: 26, fontVariantNumeric: "tabular-nums",
                      }}>
                        {issue !== undefined ? String(issue).padStart(2, "0") : "—"}
                      </span>
                      <span style={{
                        fontFamily: DISPLAY, fontSize: 15, lineHeight: 1.35, flex: 1,
                      }}>
                        {p.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARCHIVE ──────────────────────────────────────────────────── */}
      <section aria-labelledby="archive-heading" style={{
        maxWidth: 1240, margin: "0 auto",
        padding: "clamp(40px,7vh,84px) clamp(16px,4vw,48px) 96px",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32 }}>
          <h2 id="archive-heading" style={{
            fontFamily: DISPLAY, fontSize: "clamp(20px,2.6vw,30px)",
            fontWeight: 700, letterSpacing: "-0.02em", margin: 0,
          }}>
            The archive
          </h2>
          <div style={{ flex: 1, height: 1, background: RULE }} />
        </div>

        <div style={{ borderTop: `1px solid ${RULE}` }}>
          {archive.map((post) => {
            const { department, issue } = fileOf(post);
            return (
              <Link key={post.slug} to={`/signal/${post.slug}`} className="sig-link sig-row" style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,auto) minmax(0,1fr) minmax(0,auto)",
                gap: "clamp(12px,3vw,32px)", alignItems: "baseline",
                padding: "18px 8px", borderBottom: `1px solid ${RULE}`,
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 10, color: GOLD,
                  minWidth: 26, fontVariantNumeric: "tabular-nums",
                }}>
                  {issue !== undefined ? String(issue).padStart(2, "0") : "—"}
                </span>
                <span>
                  <span style={{
                    fontFamily: DISPLAY, fontSize: "clamp(16px,1.9vw,21px)",
                    lineHeight: 1.3, letterSpacing: "-0.012em", display: "block",
                    marginBottom: 5,
                  }}>
                    {post.title}
                  </span>
                  <Folio size={8}>{department}</Folio>
                </span>
                <span style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <Folio size={8.5}>{formatDate(post.date)}</Folio>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── COLOPHON ─────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `2px solid ${INK}`, background: WHITE }}>
        <div style={{
          maxWidth: 1240, margin: "0 auto",
          padding: "36px clamp(16px,4vw,48px)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <Folio size={8.5} wrap>The Signal · Mykei Securities Ltd · Company 16984969</Folio>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/signal/masthead" className="sig-link"><Folio size={8.5}>Masthead</Folio></Link>
            <a href="/privacy" className="sig-link"><Folio size={8.5}>Privacy</Folio></a>
            <a href="mailto:protocol@mykei.io" className="sig-link"><Folio size={8.5} color={GOLD}>protocol@mykei.io</Folio></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
