// Route: /doctrine -- michaelesema.com/doctrine
// Canonical: https://michaelesema.com/doctrine
// The permanent, citable, shareable home of Economic Sterilisation.
// No product mentions. No innovation language. The idea, precisely.

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";

const GOLD = "#C9A84C";
const INK = "#1A1A18";
const MUTED = "#5A5A54";
const RULE = "#E4E4E0";
const PAPER = "#FAFAF8";

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      aria-label="Site navigation"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 56, padding: "0 clamp(24px, 5vw, 64px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(250,250,248,0.97)" : PAPER,
        borderBottom: `1px solid ${scrolled ? RULE : "transparent"}`,
        backdropFilter: "blur(10px)",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <a
        href="/"
        aria-label="Michael Esema home"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: "0.18em",
          textTransform: "uppercase", color: INK, textDecoration: "none",
        }}
      >
        Michael Esema
      </a>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <a
          href="/press"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.14em",
            textTransform: "uppercase", color: MUTED, textDecoration: "none",
          }}
        >
          Press
        </a>
        <a
          href="https://mykei.io"
          target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.14em",
            textTransform: "uppercase", color: GOLD, textDecoration: "none",
            border: `1px solid ${GOLD}`, padding: "6px 14px",
          }}
        >
          Mykei.io
        </a>
      </div>
    </nav>
  );
}

function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position: "fixed", top: 56, left: 0, zIndex: 99,
        height: 2, width: `${pct}%`,
        background: GOLD, transition: "width 0.1s linear",
      }}
    />
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, v } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Economic Sterilisation",
  "description": "The doctrine that makes theft economically irrational by removing the resale value of stolen goods. Coined by Michael Esema, Manchester, 2025.",
  "author": {
    "@type": "Person",
    "@id": "https://michaelesema.com/#person",
    "name": "Michael Esema",
    "alternateName": "Michael Essien Esema",
    "url": "https://michaelesema.com",
    "jobTitle": "Founder & CEO, Mykei Securities Ltd",
    "homeLocation": "Manchester, United Kingdom",
    "sameAs": [
      "https://michaelesema.com",
      "https://mykei.io",
      "https://www.linkedin.com/in/michaelesema"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mykei Securities Ltd",
    "url": "https://mykei.io"
  },
  "datePublished": "2025-01-01",
  "dateModified": "2026-03-23",
  "url": "https://michaelesema.com/doctrine",
  "mainEntityOfPage": "https://michaelesema.com/doctrine",
  "about": {
    "@type": "DefinedTerm",
    "name": "Economic Sterilisation",
    "alternateName": ["Theft Economic Sterilisation System", "TESS", "Economic Sterilization"],
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Mykei Securities Retail Security Glossary",
      "url": "https://mykei.io/economic-sterilisation"
    }
  },
  "keywords": [
    "Economic Sterilisation", "Michael Esema", "retail theft doctrine",
    "resale value theft", "forensic marking retail", "theft deterrence economics",
    "Manchester entrepreneur", "Mykei Securities"
  ],
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["#doctrine-lede", "#doctrine-essay"]
  }
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "clamp(16px, 1.8vw, 19px)",
  lineHeight: 1.85,
  color: INK,
  marginBottom: 28,
  fontWeight: 400,
};

const pullStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "clamp(20px, 2.5vw, 26px)",
  lineHeight: 1.5,
  color: INK,
  fontStyle: "italic",
  marginBottom: 28,
  marginTop: 12,
  paddingLeft: 24,
  borderLeft: `3px solid ${GOLD}`,
};

export default function DoctrinePage() {
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify(SCHEMA);
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  return (
    <>
      <PageSEO
        title="Economic Sterilisation -- Michael Esema"
        description="The doctrine that makes theft economically irrational. Coined by Michael Esema, Manchester, 2025. Every security system ever built tried to stop the thief. This one closes the market they sell into."
        canonical="https://michaelesema.com/doctrine"
        ogType="article"
        keywords="economic sterilisation, Michael Esema, retail theft doctrine, resale value theft, forensic marking retail, Mykei Securities, Manchester"
        breadcrumbs={[["Michael Esema", "https://michaelesema.com"], ["Doctrine", "/doctrine"]]}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&family=Sora:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${PAPER}; color: ${INK}; font-family: 'Sora', sans-serif; }
        ::selection { background: rgba(201,168,76,0.2); }
        *:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      <a href="#main-content" style={{
        position: "absolute", top: -40, left: 0,
        background: GOLD, color: INK, padding: "8px 16px", zIndex: 9999,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
        textDecoration: "none",
        transition: "top 0.2s",
      }}
        onFocus={e => (e.currentTarget.style.top = "0")}
        onBlur={e => (e.currentTarget.style.top = "-40px")}
      >
        Skip to main content
      </a>

      <Nav />
      <ProgressBar />

      <main id="main-content">

        {/* HEADER */}
        <header style={{
          maxWidth: 720, margin: "0 auto",
          padding: "clamp(104px, 14vw, 160px) clamp(24px, 6vw, 48px) clamp(56px, 6vw, 80px)",
        }}>
          <Fade>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: "0.22em",
              textTransform: "uppercase", color: GOLD,
              marginBottom: 32,
            }}>
              Coined 2025 &nbsp;&middot;&nbsp; Michael Esema &nbsp;&middot;&nbsp; Manchester
            </p>

            <h1
              id="doctrine-lede"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(40px, 6.5vw, 76px)",
                fontWeight: 400, lineHeight: 1.08,
                color: INK, marginBottom: 28,
                letterSpacing: "-0.01em",
              }}
            >
              Economic<br />
              <em style={{ fontStyle: "italic", color: GOLD }}>Sterilisation</em>
            </h1>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(17px, 2.2vw, 22px)",
              fontStyle: "italic", fontWeight: 400,
              color: MUTED, lineHeight: 1.65,
              maxWidth: 540, marginBottom: 0,
            }}>
              Make theft economically irrational.
            </p>
          </Fade>
        </header>

        {/* DIVIDER */}
        <div style={{
          maxWidth: 720, margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 48px)",
          marginBottom: "clamp(56px, 6vw, 80px)",
        }}>
          <div aria-hidden="true" style={{ height: 1, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
        </div>

        {/* ESSAY */}
        <article
          id="doctrine-essay"
          aria-label="Economic Sterilisation doctrine essay by Michael Esema"
          style={{
            maxWidth: 720, margin: "0 auto",
            padding: "0 clamp(24px, 6vw, 48px) clamp(80px, 10vw, 128px)",
          }}
        >
          <Fade>
            <p style={bodyStyle}>
              For a hundred years, retail security asked the same question: how do we stop the thief?
              Every answer built in that direction. Cameras to watch them. Tags to alarm on them.
              Guards to confront them. Software to track their faces. The premise was that if you made
              theft difficult enough, riskier enough, uncomfortable enough, it would stop.
            </p>
          </Fade>

          <Fade delay={0.05}>
            <p style={bodyStyle}>
              None of it worked. Not in any meaningful sense.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              UK retailers spent &pound;1.8 billion on security in 2025. Retail theft cost them
              &pound;2.2 billion in the same year. The theft number was the highest ever recorded.
              The spending number was the highest ever recorded. Those two facts, held together,
              tell you everything about the quality of the question being asked.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={pullStyle}>
              The question was wrong.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              Theft survives because stolen goods have somewhere to go. A person who sweeps a
              shelf of razors, electronics, or skincare products is not acting on impulse. They
              are running a logistics operation. They have buyers. They have platforms. They have
              an economic model that works. Arrest them and you interrupt their supply chain for a
              week. The buyers, the platforms, the economics: those remain untouched. Within days,
              someone else fills the gap.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              I spent four years in hospitality finance in Nigeria watching institutions record
              failure rather than prevent it. Loss reports filed. Costs absorbed. Losses normalised
              into the operating model as though they were weather, unavoidable, nobody's fault.
              Then I came to Manchester and found UK retail doing the same thing at greater scale.
              Better cameras. Heavier tags. Thicker reports. The same losses, year after year,
              accepted as an industry condition rather than a solvable problem.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              I started asking what happens to the goods after they leave the store.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              The answer changed everything. The substantial majority of stolen goods are sold
              through online marketplaces. Retail theft is not a crime problem with an economic
              side effect. It is an economic operation with a crime component. The theft only
              happens because the resale exists. Remove the resale market and you remove the
              reason to steal. The calculation that makes theft rational collapses.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              This is not complicated. In retrospect, it is obvious. But nothing in a century
              of retail security thinking was built around it. Every system ever deployed aimed
              at the act of theft, not its commercial consequence.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={pullStyle}>
              I coined the term Economic Sterilisation in 2025 to name the doctrine precisely.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              Sterilisation, because it is permanent, not deterrent. The goal is not to make
              theft harder. The goal is to make the outcome harder to resell. When goods are marked at
              the moment of theft with a batch code registered to a specific event, location, and
              timestamp, they carry that record. The mark is designed to be durable. The
              record is cryptographically signed and tamper-aware. When those goods reach the resale market, they are already
              evidence. The buyer, the platform, the market: all of them become impossible terrain
              for those goods.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              The deterrence that follows is mathematical, not psychological. When it becomes
              known that goods from a specific location cannot be moved, that location leaves the
              target list. Economic Sterilisation does not require confrontation. It does not
              require identifying a face or pursuing an individual. It requires only that the
              goods become worth less than the cost of taking them. Once that is true, the
              economics of organised retail theft stops working.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              The industry spent &pound;1.8 billion in 2025 on systems that have never, in a
              hundred years of deployment, removed the resale value of a single stolen good.
              That is the size of the gap. That is what this doctrine fills.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={bodyStyle}>
              I filed a UK patent application on 23 March 2026. Not because the idea needs
              protecting from imitation. Because a patent is how a civilisation marks the moment
              someone first stated a thing that had not been stated before. GB2606630.8 is
              that marker.
            </p>
          </Fade>

          <Fade delay={0.08}>
            <p style={{ ...bodyStyle, marginBottom: 0 }}>
              The doctrine is simple: close the market that theft sells into, and theft stops
              making sense as an enterprise. Every technical decision, every design choice, every
              commercial structure, follows from that one sentence.
            </p>
          </Fade>

          {/* ATTRIBUTION */}
          <Fade delay={0.12}>
            <footer style={{
              marginTop: 64, paddingTop: 32,
              borderTop: `1px solid ${RULE}`,
            }}>
              <dl style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div>
                  <dt style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: MUTED,
                    marginBottom: 4,
                  }}>
                    Written by
                  </dt>
                  <dd style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18, fontWeight: 400, color: INK,
                  }}>
                    Michael Esema
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Affiliation and date</dt>
                  <dd style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: MUTED, letterSpacing: "0.06em",
                  }}>
                    Founder &amp; CEO, Mykei Securities Ltd &nbsp;&middot;&nbsp;
                    Manchester, United Kingdom &nbsp;&middot;&nbsp; 2025
                  </dd>
                </div>
                <div style={{ marginTop: 8 }}>
                  <dt style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: MUTED, letterSpacing: "0.1em",
                    textTransform: "uppercase", display: "inline",
                  }}>
                    Cite as:&nbsp;
                  </dt>
                  <dd style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: MUTED, display: "inline",
                    fontStyle: "italic",
                  }}>
                    Michael Esema, "Economic Sterilisation," michaelesema.com/doctrine, 2025.
                  </dd>
                </div>
              </dl>
            </footer>
          </Fade>

        </article>

        {/* RELATED */}
        <aside
          aria-label="Further reading"
          style={{ borderTop: `1px solid ${RULE}`, background: "#F5F5F2" }}
        >
          <div style={{
            maxWidth: 720, margin: "0 auto",
            padding: "clamp(48px, 6vw, 72px) clamp(24px, 6vw, 48px)",
          }}>
            <Fade>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: MUTED,
                marginBottom: 32,
              }}>
                Further reading
              </p>
              <nav aria-label="Further reading links">
                {[
                  {
                    href: "https://mykei.io/economic-sterilisation",
                    label: "Economic Sterilisation -- full definition and FAQ on mykei.io",
                    external: true,
                  },
                  {
                    href: "/press",
                    label: "Press kit -- biography, media contact, and talking points",
                    external: false,
                  },
                ].map(({ href, label, external }) => (
                  <a
                    key={href}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "18px 0", borderBottom: `1px solid ${RULE}`,
                      textDecoration: "none", color: INK,
                      fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 400,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={e => (e.currentTarget.style.color = INK)}
                  >
                    <span>{label}</span>
                    <span aria-hidden="true" style={{ color: GOLD, fontSize: 16, marginLeft: 16 }}>
                      {external ? "↗" : "→"}
                    </span>
                  </a>
                ))}
              </nav>
            </Fade>
          </div>
        </aside>

      </main>

      <footer role="contentinfo" style={{
        borderTop: `1px solid ${RULE}`,
        padding: "24px clamp(24px, 5vw, 64px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, background: PAPER,
      }}>
        <small style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, color: MUTED, letterSpacing: "0.06em",
        }}>
          &copy; 2026 Michael Esema &nbsp;&middot;&nbsp; Mykei Securities Ltd &nbsp;&middot;&nbsp; Co. 16984969
        </small>
        <a
          href="https://mykei.io"
          target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, color: GOLD, letterSpacing: "0.1em",
            textDecoration: "none", textTransform: "uppercase",
          }}
        >
          mykei.io
        </a>
      </footer>
    </>
  );
}
