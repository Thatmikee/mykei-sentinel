import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import PageSEO from "@/components/PageSEO";

const INK    = "#0F0C08";
const GOLD   = "#B8962E";
const PAPER  = "#FAFAF6";
const WARM   = "#F2EDE3";
const MUTED  = "#6B5E4A";
const RULE   = "#DDD5C4";
const WHITE  = "#FFFFFF";

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

const sorted           = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const retailCrimeFiles = sorted.filter(p => p.tags.includes("Retail Crime Files"));
const mainStories      = sorted.filter(p => !p.tags.includes("Retail Crime Files"));
const lead             = mainStories.find(p => p.landmark) ?? mainStories[0];
const secondary        = mainStories.filter(p => p.slug !== lead.slug).slice(0, 3);
const rest             = mainStories.filter(p => p.slug !== lead.slug).slice(3);

export default function BriefIndex() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div style={{ backgroundColor: PAPER, minHeight: "100vh", color: INK }}>
      <PageSEO
        title="The Signal | Retail Security Intelligence | Mykei Securities"
        description="Research and analysis on retail theft economics, forensic security, and Economic Sterilisation. Published for independent retailers, investors, policy-makers, and anyone fighting organised retail crime."
        canonical="https://mykei.io/signal"
        keywords="retail theft intelligence, economic sterilisation, organised retail crime, ADN-1 forensic security, Manchester retail pilot, retail crime for small businesses, shoplifting for accountants, theft economics for investors, retail security for enterprise"
        ogImageAlt="The Signal: retail security intelligence by Mykei Securities"
        breadcrumbs={[["Home","https://mykei.io"],["The Signal","/signal"]]}
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": "https://mykei.io/signal",
          "name": "The Signal",
          "description": "Retail security intelligence. Research on Economic Sterilisation, organised retail crime, and the ADN-1 pilot.",
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

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : WHITE,
        borderBottom: `1px solid ${RULE}`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px,4vw,48px)", height: 56,
        transition: "box-shadow 0.2s",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.05)" : "none",
      }}>
        <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: INK, textDecoration: "none" }}>
          Mykei Securities
        </a>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a href="/howitworks" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>How It Works</a>
          <a href="/pilot" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}`, padding: "7px 14px", textDecoration: "none" }}>
            Apply for Pilot
          </a>
        </div>
      </nav>

      {/* MASTHEAD */}
      <header style={{ background: WHITE, paddingTop: 56, borderBottom: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px clamp(16px,4vw,48px) 0" }}>

          {/* Top rule */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 2, background: INK }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap" }}>
              Retail Security Intelligence
            </span>
            <div style={{ flex: 1, height: 2, background: INK }} />
          </div>

          {/* Nameplate */}
          <h1 style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(56px,10vw,120px)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: INK,
            textAlign: "center",
            marginBottom: 16,
          }}>
            The Signal
          </h1>

          {/* Dateline */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
            borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`,
            padding: "10px 0", marginBottom: 0,
          }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>
              Published by Mykei Securities Ltd · Manchester, UK
            </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: "0.1em", color: MUTED }}>
              {today}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD }}>
              Vol. 1 · Issue {sorted.length}
            </span>
          </div>
        </div>
      </header>

      {/* LEAD + 3 SECONDARY */}
      <section style={{ background: WHITE, borderBottom: `2px solid ${INK}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1px 1fr",
            gap: 0,
            padding: "40px 0",
          }} className="signal-lead-grid">

            {/* Lead story */}
            <div style={{ paddingRight: "clamp(20px,3vw,40px)" }}>
              {lead.landmark && (
                <div style={{
                  display: "inline-block",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: WHITE, background: INK,
                  padding: "3px 10px", marginBottom: 18,
                }}>
                  Landmark Read
                </div>
              )}
              <Link to={`/signal/${lead.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
                  {formatDate(lead.date)} · {lead.readingTime}
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "clamp(24px,3.2vw,38px)",
                  fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em",
                  color: INK, marginBottom: 18,
                  borderBottom: `2px solid ${INK}`, paddingBottom: 16,
                }}>
                  {lead.title}
                </h2>
                <p style={{ fontSize: 15.5, lineHeight: 1.85, color: MUTED, marginBottom: 24 }}>
                  {lead.summary}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                  {lead.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: INK, border: `1px solid ${RULE}`, padding: "2px 8px",
                    }}>{tag}</span>
                  ))}
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: GOLD,
                  borderBottom: `1px solid ${GOLD}`, paddingBottom: 2,
                }}>
                  Read the full piece
                </span>
              </Link>
            </div>

            {/* Column rule */}
            <div style={{ background: RULE }} />

            {/* 3 secondary */}
            <div style={{ paddingLeft: "clamp(20px,3vw,40px)", display: "flex", flexDirection: "column", gap: 0 }}>
              {secondary.map((post, i) => (
                <div key={post.slug} style={{
                  paddingBottom: i < secondary.length - 1 ? 24 : 0,
                  marginBottom: i < secondary.length - 1 ? 24 : 0,
                  borderBottom: i < secondary.length - 1 ? `1px solid ${RULE}` : "none",
                }}>
                  <Link to={`/signal/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                      {formatDate(post.date)}
                    </div>
                    <h3 style={{
                      fontFamily: "'Playfair Display',Georgia,serif",
                      fontSize: "clamp(15px,1.7vw,19px)",
                      fontWeight: 700, lineHeight: 1.3, color: INK,
                      marginBottom: 8, letterSpacing: "-0.01em",
                    }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.75, color: MUTED }}>
                      {post.summary}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RETAIL CRIME FILES */}
      {retailCrimeFiles.length > 0 && (
        <section style={{ background: INK, color: WHITE, borderBottom: `2px solid ${INK}` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px clamp(16px,4vw,48px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.6fr", gap: "clamp(28px,5vw,64px)", alignItems: "start" }} className="press-grid">
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
                  Retail Crime Files
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "clamp(28px,4vw,46px)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  color: WHITE,
                  marginBottom: 18,
                }}>
                  A monthly record of what the security industry keeps missing.
                </h2>
                <p style={{ color: "rgba(255,255,255,0.76)", fontSize: 15, lineHeight: 1.8, marginBottom: 0 }}>
                  Each file reviews one month of UK retail crime reporting and extracts the Mykei lesson: the shelf event needs a record.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
                {retailCrimeFiles.map((post) => (
                  <Link key={post.slug} to={`/signal/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <article style={{
                      height: "100%",
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(255,255,255,0.045)",
                      padding: 22,
                      borderRadius: 4,
                    }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
                        {post.tags[1]} · {post.readingTime}
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, lineHeight: 1.2, color: WHITE, marginBottom: 12 }}>
                        {post.title.replace(/^(January|February|March|April) File: /, "")}
                      </h3>
                      <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "rgba(255,255,255,0.74)" }}>
                        {post.summary}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL EDITIONS */}
      {rest.length > 0 && (
        <>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px clamp(16px,4vw,48px) 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ height: 1, flex: 1, background: RULE }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap" }}>
                All editions
              </span>
              <div style={{ height: 1, flex: 1, background: RULE }} />
            </div>
          </div>

          <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px clamp(16px,4vw,48px) 80px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))",
              border: `1px solid ${RULE}`,
            }}>
              {rest.map((post, i) => (
                <Link key={post.slug} to={`/signal/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <article
                    style={{
                      padding: "28px 24px",
                      borderRight: `1px solid ${RULE}`,
                      borderBottom: `1px solid ${RULE}`,
                      background: WHITE,
                      transition: "background 0.15s",
                      cursor: "pointer",
                      height: "100%", boxSizing: "border-box",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = WARM; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = WHITE; }}
                  >
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
                      {formatDate(post.date)} · {post.readingTime}
                    </div>
                    <h2 style={{
                      fontFamily: "'Playfair Display',Georgia,serif",
                      fontSize: "clamp(16px,1.8vw,20px)",
                      fontWeight: 700, lineHeight: 1.3, color: INK,
                      marginBottom: 10, letterSpacing: "-0.01em",
                      borderBottom: `1px solid ${RULE}`, paddingBottom: 10,
                    }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: 13.5, lineHeight: 1.75, color: MUTED, marginBottom: 14 }}>
                      {post.summary}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{
                          fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5,
                          letterSpacing: "0.09em", textTransform: "uppercase",
                          color: MUTED, border: `1px solid ${RULE}`, padding: "2px 6px",
                        }}>{tag}</span>
                      ))}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </main>
        </>
      )}

      {/* PRESS & MEDIA */}
      <section style={{ background: WHITE, borderTop: `2px solid ${INK}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px clamp(16px,4vw,48px)" }}>

          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <div style={{ height: 1, flex: 1, background: RULE }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, whiteSpace: "nowrap" }}>
              For journalists &amp; media
            </span>
            <div style={{ height: 1, flex: 1, background: RULE }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "start" }} className="press-grid">

            {/* Founder bio */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Founder bio for publication</div>
              <blockquote style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 20, margin: "0 0 24px" }}>
                <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 15, fontStyle: "italic", color: INK, lineHeight: 1.75 }}>
                  Michael Esema is the founder and CEO of Mykei Securities Ltd. He invented the ADN-1, a patent-pending shelf-mounted retail defence device that detects bulk-sweep theft events, triggers controlled marker deployment, and records cartridge-linked activations in the Mykei Registry. He coined the doctrine of Economic Sterilisation in 2025 (UK patent application No. 2606630.8). A former Head Accountant at B's Hive, he holds an MSc from Manchester Metropolitan University, an MBA from the Nigerian Defence Academy, and a BSc from Benson Idahosa University. The Independent Retail Pilot is active, with 5 signed LOIs in Greater Manchester.
                </p>
              </blockquote>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <a href="/founder" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}>Full founder profile</a>
                <a href="https://www.linkedin.com/in/michaelesema" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>LinkedIn</a>
              </div>
            </div>

            {/* Facts + downloads + contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              {/* Key facts */}
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 14 }}>Key facts</div>
                {[
                  "Global retail theft: $796 billion annually",
                  "UK retail crime incidents: 5.8 million (ACS 2026)",
                  "Patent application: GB2606630.8, 17 claims",
                  "ADN-1 response time: under 3 seconds",
                  "Independent Retail Pilot: 2026, 5 signed LOIs",
                  "Privacy-by-design: no camera, no biometric or suspect identity data",
                ].map(fact => (
                  <div key={fact} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${RULE}`, fontSize: 12.5, color: MUTED, lineHeight: 1.5 }}>
                    <span style={{ color: GOLD, flexShrink: 0 }}>+</span>{fact}
                  </div>
                ))}
              </div>

              {/* Downloads */}
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 14 }}>Downloads</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="/social-share.png" download style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>
                    Press image 1200×630 →
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 14 }}>Media contact</div>
                <a href="mailto:protocol@mykei.io" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.08em", color: GOLD, textDecoration: "none" }}>
                  protocol@mykei.io
                </a>
                <p style={{ fontSize: 12, color: MUTED, marginTop: 6, lineHeight: 1.6 }}>
                  Interviews, comment on retail crime data, ADN-1 technical spec. 24-hour response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: WARM, borderTop: `1px solid ${RULE}`, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
          Independent Retail Pilot · 2026
        </div>
        <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: INK, marginBottom: 12, lineHeight: 1.25, maxWidth: 560, margin: "0 auto 12px" }}>
          Five retailers. Direct founder support. No middlemen.
        </p>
        <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, color: MUTED, marginBottom: 32, lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px" }}>
          Michael visits every site personally before installation. Founders pricing. No automated sequences.
        </p>
        <a href="/pilot" style={{
          display: "inline-block", background: INK, color: WHITE,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          textDecoration: "none", padding: "14px 40px", borderRadius: 2,
        }}>
          Apply Now
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: WHITE, borderTop: `1px solid ${RULE}`, padding: "24px clamp(16px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: MUTED, letterSpacing: "0.06em" }}>
          &copy; {new Date().getFullYear()} Mykei Securities Ltd · Company No. 16984969 · Manchester, UK
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[["Home","/"],["How It Works","/howitworks"],["Privacy","/privacy"]].map(([l,h]) => (
            <a key={l} href={h} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=JetBrains+Mono:wght@400;500&family=Sora:wght@400;500&display=swap');
        @media (max-width: 720px) {
          .signal-lead-grid { grid-template-columns: 1fr !important; }
          .signal-lead-grid > div:nth-child(2) { display: none; }
          .press-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
