// Route: /press -- michaelesema.com/press
// Canonical: https://michaelesema.com/press
// Three bio lengths, photo placeholders, key facts, speaking topics, press contact.
// Benchmark: tristanharris.com -- structured journalist toolkit.

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";

const GOLD = "#C9A84C";
const INK = "#1A1A18";
const MUTED = "#5A5A54";
const RULE = "#E4E4E0";
const PAPER = "#FAFAF8";
const LIGHT = "#F2F2EF";

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
          href="/doctrine"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.14em",
            textTransform: "uppercase", color: MUTED, textDecoration: "none",
          }}
        >
          Doctrine
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
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      aria-label={`Copy ${label}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: copied ? "#4A7C59" : GOLD,
        background: "none", border: `1px solid ${copied ? "#4A7C59" : GOLD}`,
        padding: "6px 14px", cursor: "pointer",
        transition: "color 0.2s, border-color 0.2s",
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateModified": "2026-05-24T00:00:00+00:00",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://michaelesema.com/#person",
    "name": "Michael Esema",
    "additionalName": "Essien",
    "alternateName": ["Michael Essien Esema", "Mike Esema"],
    "description": "Michael Esema (Michael Essien Esema) is a Nigerian-born entrepreneur based in Manchester, UK. Founder and CEO of Mykei Securities Ltd and proposer of Economic Sterilisation as an operational extension of Market Reduction theory.",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Mykei Securities Ltd",
      "url": "https://mykei.io"
    },
    "nationality": { "@type": "Country", "name": "Nigeria" },
    "homeLocation": { "@type": "Place", "name": "Manchester, Greater Manchester, United Kingdom" },
    "url": "https://michaelesema.com",
    "sameAs": [
      "https://michaelesema.com",
      "https://mykei.io",
      "https://www.linkedin.com/in/michaelesema",
      "https://twitter.com/michaelesema"
    ],
    "birthDate": "1996-10",
    "birthPlace": { "@type": "Place", "name": "Nigeria" },
    "alumniOf": [
      { "@type": "EducationalOrganization", "name": "Manchester Metropolitan University" },
      { "@type": "EducationalOrganization", "name": "Nigerian Defence Academy" },
      { "@type": "EducationalOrganization", "name": "Benson Idahosa University" }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Michael Esema", "item": "https://michaelesema.com" },
      { "@type": "ListItem", "position": 2, "name": "Press", "item": "https://michaelesema.com/press" }
    ]
  }
};

const ONE_LINER = "Michael Esema is the Manchester-based Founder and CEO of Mykei Securities Ltd and proposer of Economic Sterilisation, a modern operational extension of Market Reduction theory for resale-driven theft.";

const SHORT_BIO = `Michael Esema is the Founder and CEO of Mykei Securities Ltd (Company No. 16984969, Manchester). He proposes Economic Sterilisation as a modern operational extension of Market Reduction theory and filed UK Patent Application No. GB2606630.8 on 23 March 2026. He built the ADN as a patent-pending R&D pathway for event-triggered marking and registry-linked evidence while employed full-time.

He holds an MSc in International Business Management with Merit (Manchester Metropolitan University, 2024), an MBA (Nigerian Defence Academy, 2023), and a BSc in Accounting (Benson Idahosa University, 2018). Mykei has controlled prototype and registry evidence, but field validation and commercial proof remain separate gates.`;

const LONG_BIO = `His father, Obong Barr. Essien Joseph Esema, was born in 1959 into the royal family of Esema, Akai-Ubium, Nsit Ubium, Akwa Ibom State, Nigeria. He became the first Local Government Chairman of Nsit Ubium, a practicing lawyer and Principal Partner of Essien Esema and Associates, and Special Adviser to the Secretary to the Government of the Federation on legal matters. He co-authored "Power and Functions of Local Government and Area Councils in Nigeria." His life's work was building institutions to protect public resources from exploitation. He died in 2019. He did not live to see his son file a UK patent.

His mother, Mrs Mary Esema, is Deputy Director of Nigeria's National Malaria Elimination Programme and former Assistant Director at the Federal Ministry of Health. She holds a BSc in Virology from the University of Calabar. She does not treat patients one at a time. She dismantles the conditions that allow disease to spread. Her son applied the same logic to retail theft.

Michael Esema was born in October 1996 in Nigeria. He graduated with a BSc in Accounting from Benson Idahosa University in 2018, completed his National Youth Service Corps year, and spent four years in hospitality finance, moving from Head Accountant to Assistant Manager at B's Hive Hotel and Suites. He arrived in Manchester in 2023 and found UK retail doing what institutions had always done: recording failure, absorbing loss, calling it normal.

He completed an MSc in International Business Management with Merit from Manchester Metropolitan University in 2024 and holds a Level 7 Advanced Diploma in Project Management and Lean Six Sigma certification. He built the ADN personally, on £10,000, while employed full-time.

On 23 March 2026, he filed UK Patent Application No. GB2606630.8, a 17-claim patent application (patent pending) connected to event-triggered marking and registry-linked evidence. Mykei now frames the ADN as one R&D pathway inside the wider Economic Sterilisation and Mykei Protocol architecture. Mykei Securities Ltd (Company No. 16984969) was incorporated on 24 January 2026.

The doctrine: make theft economically irrational. Close the market that theft sells into. The idea did not come from a lab or an accelerator. It came from watching institutions absorb loss, deciding that was not an acceptable answer, and building something that addressed the actual cause.`;

const FACTS = [
  { label: "Patent", value: "Application No. GB2606630.8 (UK IPO), 17 claims, filed 23 March 2026, receipt issued 26 March 2026" },
  { label: "Company", value: "Mykei Securities Ltd, Company No. 16984969, incorporated 24 January 2026, Manchester" },
  { label: "Doctrine", value: "Economic Sterilisation, operational extension of Market Reduction theory." },
  { label: "Commercial proof", value: "Enterprise or network pilot still required; LOIs are interest signals, not revenue." },
  { label: "Public demo", value: "ADN demonstrated publicly at NEC Birmingham, April 2026" },
  { label: "Education", value: "MSc International Business Management, Merit (MMU, 2024); MBA (Nigerian Defence Academy, 2023); BSc Accounting (Benson Idahosa University, 2018)" },
  { label: "Certifications", value: "Lean Six Sigma; Level 7 Advanced Diploma in Project Management" },
  { label: "Social", value: "1,435 LinkedIn followers; 5,682 Twitter followers" },
  { label: "Sites", value: "michaelesema.com; mykei.io" },
  { label: "Industry context", value: "UK retail theft cost £2.2 billion in 2025, highest ever recorded. 20 million+ incidents. Industry spent £1.8 billion on security." },
  { label: "ADN spec (R&D)", value: "Shelf-mounted IoT device. Dual Time-of-Flight sensors. Forensic marker deployment. Encrypted event record to Mykei Registry (AWS IoT Core). No camera. No biometric data. Patent pending. Field validation not yet begun." },
];

const SPEAKING_TOPICS = [
  "Economic Sterilisation: the doctrine that makes theft economically irrational",
  "Why retail security has failed and what actually changes the calculus",
  "Removing the financial incentive behind organised retail theft",
  "From doctrine to device: building Mykei Securities from first principles",
  "The resale economy that sustains retail crime, and how to close it",
  "Forensic marking, IoT event records, and the future of retail loss prevention",
];

export default function PressPage() {
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
        title="Press Kit -- Michael Esema, Founder of Mykei Securities Ltd"
        description="Press resources for Michael Esema, Founder and CEO of Mykei Securities Ltd. Three bio lengths, key facts, press photo, ADN product image, speaking topics, and direct media contact. michaelesema.com/press"
        canonical="https://michaelesema.com/press"
        keywords="Michael Esema press kit, Michael Esema biography, Mykei Securities press, economic sterilisation journalist, retail theft founder Manchester, ADN press"
        breadcrumbs={[["Michael Esema", "https://michaelesema.com"], ["Press", "/press"]]}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;500&family=Sora:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${PAPER}; color: ${INK}; font-family: 'Sora', sans-serif; }
        ::selection { background: rgba(201,168,76,0.2); }
        *:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
        .press-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        @media (max-width: 680px) {
          .press-grid-2 { grid-template-columns: 1fr; gap: 32px; }
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

      <main id="main-content">

        {/* HEADER */}
        <header style={{
          maxWidth: 880, margin: "0 auto",
          padding: "clamp(96px, 12vw, 144px) clamp(24px, 5vw, 48px) clamp(56px, 6vw, 72px)",
          borderBottom: `1px solid ${RULE}`,
        }}>
          <Fade>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: "0.2em",
              textTransform: "uppercase", color: GOLD,
              marginBottom: 24,
            }}>
              Media &amp; Press
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5.5vw, 58px)",
              fontWeight: 400, lineHeight: 1.1,
              color: INK, marginBottom: 20,
            }}>
              For journalists and media.
            </h1>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.75, maxWidth: 520 }}>
              Bio in three lengths ready to copy. Key facts. Photos. Speaking topics.
              Direct contact. If you are writing about retail crime, organised theft, or
              Economic Sterilisation, start here.
            </p>
          </Fade>
        </header>

        {/* PHOTOS */}
        <section
          aria-labelledby="photos-heading"
          style={{
            maxWidth: 880, margin: "0 auto",
            padding: "clamp(56px, 6vw, 80px) clamp(24px, 5vw, 48px)",
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          <Fade>
            <h2
              id="photos-heading"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: MUTED,
                marginBottom: 32, fontWeight: 400,
              }}
            >
              Photos
            </h2>
            <div className="press-grid-2">
              <figure style={{ margin: 0 }}>
                <div style={{
                  background: LIGHT,
                  border: `1px solid ${RULE}`,
                  height: 280, borderRadius: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 12, overflow: "hidden",
                }}>
                  <img
                    src="/images/michael-esema-press.jpg"
                    alt="Michael Esema, Founder and CEO of Mykei Securities Ltd"
                    width={400} height={280}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      (e.currentTarget.parentElement as HTMLElement).style.background = LIGHT;
                    }}
                  />
                </div>
                <figcaption>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: MUTED, marginBottom: 8,
                  }}>
                    Press portrait
                  </p>
                  <p style={{ fontSize: 12, color: MUTED, marginBottom: 10 }}>
                    Michael Esema &middot; High-resolution available on request
                  </p>
                  <a
                    href="mailto:michael.e@mykei.io?subject=Press photo request"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: GOLD,
                      textDecoration: "none", borderBottom: `1px solid ${GOLD}`,
                      paddingBottom: 2,
                    }}
                  >
                    Request hi-res
                  </a>
                </figcaption>
              </figure>

              <figure style={{ margin: 0 }}>
                <div style={{
                  background: LIGHT,
                  border: `1px solid ${RULE}`,
                  height: 280, borderRadius: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 12, overflow: "hidden",
                }}>
                  <img
                    src="/images/adn1-press.jpg"
                    alt="ADN Active Forensic Defence Node -- shelf-mounted IoT device by Mykei Securities Ltd"
                    width={400} height={280}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <figcaption>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: MUTED, marginBottom: 8,
                  }}>
                    ADN product image
                  </p>
                  <p style={{ fontSize: 12, color: MUTED, marginBottom: 10 }}>
                    ADN Active Forensic Defence Node &middot; High-resolution available on request
                  </p>
                  <a
                    href="mailto:michael.e@mykei.io?subject=ADN product image request"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9, letterSpacing: "0.12em",
                      textTransform: "uppercase", color: GOLD,
                      textDecoration: "none", borderBottom: `1px solid ${GOLD}`,
                      paddingBottom: 2,
                    }}
                  >
                    Request hi-res
                  </a>
                </figcaption>
              </figure>
            </div>
          </Fade>
        </section>

        {/* BIOS */}
        <section
          aria-labelledby="bios-heading"
          style={{
            maxWidth: 880, margin: "0 auto",
            padding: "clamp(56px, 6vw, 80px) clamp(24px, 5vw, 48px)",
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          <Fade>
            <h2
              id="bios-heading"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: MUTED,
                marginBottom: 40, fontWeight: 400,
              }}
            >
              Biography
            </h2>

            {/* ONE-LINER */}
            <div style={{
              background: LIGHT, padding: "24px 28px",
              border: `1px solid ${RULE}`, marginBottom: 32,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: GOLD, fontWeight: 400,
                }}>
                  One-liner
                </h3>
                <CopyButton text={ONE_LINER} label="one-liner bio" />
              </div>
              <p style={{ fontSize: 15, color: INK, lineHeight: 1.65, fontFamily: "'Sora', sans-serif" }}>
                {ONE_LINER}
              </p>
            </div>

            {/* SHORT BIO */}
            <div style={{
              background: LIGHT, padding: "24px 28px",
              border: `1px solid ${RULE}`, marginBottom: 32,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: GOLD, fontWeight: 400,
                }}>
                  Short bio (for publication)
                </h3>
                <CopyButton text={SHORT_BIO} label="short bio" />
              </div>
              {SHORT_BIO.split("\n\n").map((p, i) => (
                <p key={i} style={{
                  fontSize: 14, color: INK, lineHeight: 1.75,
                  fontFamily: "'Sora', sans-serif",
                  marginBottom: i < SHORT_BIO.split("\n\n").length - 1 ? 16 : 0,
                }}>
                  {p}
                </p>
              ))}
            </div>

            {/* LONG BIO */}
            <div style={{
              background: LIGHT, padding: "24px 28px",
              border: `1px solid ${RULE}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <h3 style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: GOLD, fontWeight: 400,
                }}>
                  Long bio (profile-length)
                </h3>
                <CopyButton text={LONG_BIO} label="long bio" />
              </div>
              {LONG_BIO.split("\n\n").map((p, i) => (
                <p key={i} style={{
                  fontSize: 14, color: INK, lineHeight: 1.8,
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: i < LONG_BIO.split("\n\n").length - 1 ? 20 : 0,
                }}>
                  {p}
                </p>
              ))}
            </div>
          </Fade>
        </section>

        {/* KEY FACTS */}
        <section
          aria-labelledby="facts-heading"
          style={{
            maxWidth: 880, margin: "0 auto",
            padding: "clamp(56px, 6vw, 80px) clamp(24px, 5vw, 48px)",
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          <Fade>
            <h2
              id="facts-heading"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: MUTED,
                marginBottom: 32, fontWeight: 400,
              }}
            >
              Key facts
            </h2>
            <dl>
              {FACTS.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr",
                    gap: 24,
                    padding: "16px 0",
                    borderBottom: `1px solid ${RULE}`,
                    alignItems: "baseline",
                  }}
                >
                  <dt style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: MUTED,
                  }}>
                    {label}
                  </dt>
                  <dd style={{ fontSize: 13, color: INK, lineHeight: 1.65, fontFamily: "'Sora', sans-serif" }}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Fade>
        </section>

        {/* SPEAKING TOPICS */}
        <section
          aria-labelledby="speaking-heading"
          style={{
            maxWidth: 880, margin: "0 auto",
            padding: "clamp(56px, 6vw, 80px) clamp(24px, 5vw, 48px)",
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          <Fade>
            <h2
              id="speaking-heading"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: MUTED,
                marginBottom: 32, fontWeight: 400,
              }}
            >
              Speaking topics
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {SPEAKING_TOPICS.map((topic, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex", gap: 20, alignItems: "baseline",
                    padding: "18px 0", borderBottom: `1px solid ${RULE}`,
                    fontSize: 15, color: INK, lineHeight: 1.5,
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  <span aria-hidden="true" style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, color: GOLD, flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {topic}
                </li>
              ))}
            </ul>
          </Fade>
        </section>

        {/* DOCTRINE */}
        <section
          aria-labelledby="doctrine-ref-heading"
          style={{
            maxWidth: 880, margin: "0 auto",
            padding: "clamp(56px, 6vw, 80px) clamp(24px, 5vw, 48px)",
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          <Fade>
            <h2
              id="doctrine-ref-heading"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: MUTED,
                marginBottom: 24, fontWeight: 400,
              }}
            >
              The doctrine
            </h2>
            <blockquote
              cite="https://michaelesema.com/doctrine"
              style={{
                borderLeft: `3px solid ${GOLD}`, paddingLeft: 28,
                margin: 0, marginBottom: 20,
              }}
            >
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(18px, 2.2vw, 22px)",
                fontStyle: "italic", lineHeight: 1.65,
                color: INK, marginBottom: 12,
              }}>
                "A framework for reducing the resale confidence and economic acceptability of
                stolen goods through marking, registry records, evidence workflows and lawful
                verification."
              </p>
              <cite style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, color: MUTED, letterSpacing: "0.1em",
                fontStyle: "normal", display: "block",
              }}>
                Economic Sterilisation, Mykei Securities Ltd
              </cite>
            </blockquote>
            <a
              href="/doctrine"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.14em",
                textTransform: "uppercase", color: GOLD,
                textDecoration: "none", borderBottom: `1px solid ${GOLD}`,
                paddingBottom: 2,
              }}
            >
              Read the full doctrine →
            </a>
          </Fade>
        </section>

        {/* CONTACT */}
        <section
          aria-labelledby="contact-heading"
          style={{
            maxWidth: 880, margin: "0 auto",
            padding: "clamp(56px, 6vw, 80px) clamp(24px, 5vw, 48px) clamp(80px, 10vw, 120px)",
          }}
        >
          <Fade>
            <h2
              id="contact-heading"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: MUTED,
                marginBottom: 24, fontWeight: 400,
              }}
            >
              Press contact
            </h2>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 400, color: INK,
              lineHeight: 1.25, marginBottom: 20,
            }}>
              Get in touch.
            </p>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, maxWidth: 480, marginBottom: 32 }}>
              Interview requests, comment on retail crime data, access to the ADN technical
              specification, or background briefing on Economic Sterilisation. We respond to
              media enquiries within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: MUTED, marginBottom: 8,
                }}>
                  Email
                </p>
                <a
                  href="mailto:michael.e@mykei.io"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18, color: GOLD,
                    textDecoration: "none",
                  }}
                >
                  michael.e@mykei.io
                </a>
              </div>
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: MUTED, marginBottom: 8,
                }}>
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/michaelesema"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12, color: MUTED,
                    textDecoration: "none",
                  }}
                >
                  linkedin.com/in/michaelesema
                </a>
              </div>
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: MUTED, marginBottom: 8,
                }}>
                  Company
                </p>
                <a
                  href="https://mykei.io"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12, color: MUTED,
                    textDecoration: "none",
                  }}
                >
                  mykei.io
                </a>
              </div>
            </div>
          </Fade>
        </section>

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
