import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const COMPARISON = [
  { aspect: "Primary mechanism", traditional: "Deter, detect, or delay", es: "Remove commercial value" },
  { aspect: "What it targets", traditional: "The act of theft", es: "The incentive for theft" },
  { aspect: "Requires staff action", traditional: "Yes, confront or report", es: "No, fully autonomous" },
  { aspect: "Uses cameras / biometrics", traditional: "Almost always", es: "No camera or biometric identification" },
  { aspect: "Effective after theft occurs", traditional: "No", es: "Yes, goods become harder to move without a traceable record" },
  { aspect: "Addresses resale market", traditional: "No", es: "Yes, forensic record supports resale disruption" },
  { aspect: "Reduces repeat theft", traditional: "Marginally", es: "Systematically, no ROI for thieves" },
  { aspect: "Evidential record", traditional: "Sometimes (CCTV)", es: "Cryptographically signed, designed to support evidential workflows" },
];

const FAQS = [
  {
    q: "What is Michael Esema's contribution?",
    a: "Michael Esema proposes Economic Sterilisation as a modern operational framework for applying Market Reduction theory to asset marking, registry records, evidence workflows and resale-confidence reduction. The term is Mykei's framing; the wider stolen-goods-market lineage predates Mykei."
  },
  {
    q: "Is Economic Sterilisation the same as DNA tagging?",
    a: "No. DNA tagging is one component of the implementation. Economic Sterilisation is the doctrine, the outcome goal of removing resale value. It encompasses forensic marking (DNA), real-time cloud logging, and batch-linked event records designed to disrupt resale and support evidential workflows."
  },
  {
    q: "What is the Theft Economic Sterilisation System (TESS)?",
    a: "TESS is the alternate name for the complete doctrine and product category. It stands for Theft Economic Sterilisation System. The ADN is an early implementation of TESS, currently at prototype stage."
  },
  {
    q: "How is this different from existing security systems?",
    a: "Existing systems (CCTV, EAS tags, security guards) target the act of theft, they deter, detect, or document it. Economic Sterilisation targets the incentive: if stolen goods cannot be sold, the economic case for theft collapses before the theft even happens."
  },
  {
    q: "Can stolen goods be cleaned of the DNA marker?",
    a: "Mykei uses controlled marker chemistry subject to supplier SDS and COSHH review. The marker is UV-detectable and designed to adhere to fabric, skin, and packaging for post-event verification. Removal resistance and detectability depend on the specific formulation used. The forensic value is the batch-linked registry record, not the marker alone."
  },
  {
    q: "What about offline black market sales?",
    a: "The physical marker creates a traceable link between goods and a registry event record regardless of where the goods appear. If marked items are recovered, the registry-linked event record identifies the source store, shelf, and timestamp. UV detection is a core selection criterion for Mykei's marker sourcing. Receiving stolen goods is a criminal offence under the Theft Act 1968. The forensic link supports investigation workflows without requiring confrontation."
  },
  {
    q: "Where can I read more about the ADN implementation?",
    a: "Full technical specifications are at mykei.io/adn-1. The cloud registry (Mykei Registry) is documented at mykei.io/technology/ats."
  },
];

export default function EconomicSterilisationPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Page-level schema
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": "Economic Sterilisation",
        "alternateName": ["Theft Economic Sterilisation System", "TESS", "Economic Sterilization"],
        "description": "The systematic disruption of resale incentive from stolen goods through forensic marking and registry event records, eliminating the commercial incentive for theft at the point it occurs. Where conventional security deters or detects, Economic Sterilisation disrupts the commercial outcome that makes theft worthwhile.",
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": "Mykei Securities Retail Security Glossary",
          "url": "https://mykei.io"
        },
        "url": "https://mykei.io/economic-sterilisation",
        "dateCreated": "2025",
        "author": {
          "@type": "Person",
          "@id": "https://michaelesema.com/#person",
          "name": "Michael Esema",
          "alternateName": ["Michael Essien Esema", "Mike Esema"],
          "url": "https://michaelesema.com"
        },
        "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a }
        }))
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Economic Sterilisation, Definition, Doctrine, and Market Reduction Lineage",
        "description": "Economic Sterilisation is Mykei's operational framework for reducing the resale confidence of stolen goods through marking, registry records, evidence workflows and lawful verification. It builds on Market Reduction theory.",
        "author": {
          "@type": "Person",
          "name": "Michael Esema",
          "url": "https://michaelesema.com"
        },
        "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" },
        "datePublished": "2025-01-01",
        "dateModified": "2026-03-30T00:00:00+00:00",
        "url": "https://mykei.io/economic-sterilisation",
        "mainEntityOfPage": "https://mykei.io/economic-sterilisation",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["#es-definition", "#es-doctrine", "#es-attribution"]
        }
      }
    ]);
    document.head.appendChild(schema);

    document.title = "Economic Sterilisation, Definition & Doctrine | Mykei Securities";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Economic Sterilisation is Mykei's doctrine for reducing the resale incentive behind retail theft by linking theft-related events to marker and registry records. Coined by Michael Esema, Mykei Securities, 2025.");

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.head.removeChild(schema);
    };
  }, []);

  return (
    <>
      <PageSEO
        title="Economic Sterilisation: The Doctrine Coined by Michael Esema | Mykei Securities"
        description="Economic Sterilisation: the systematic disruption of resale incentive through forensic marking and registry event records. Coined by Michael Esema, Mykei Securities Ltd, 2025. The doctrine behind the ADN."
        canonical="https://mykei.io/economic-sterilisation"
        ogType="article"
        keywords="economic sterilisation, TESS, theft economic sterilisation system, Michael Esema, retail theft doctrine, forensic deterrence, resale blocking, economic sterilisation for small businesses, economic sterilisation for retailers, economic sterilisation for accountants, economic sterilisation for lawyers, economic sterilisation for startups, economic sterilisation for nonprofits, economic sterilisation for universities, economic sterilisation for government employees, economic sterilisation for enterprise companies, economic sterilization for teams"
        ogImageAlt="Economic Sterilisation: the doctrine that disrupts the resale incentive behind retail theft"
        breadcrumbs={[["Home","https://mykei.io"],["Economic Sterilisation","/economic-sterilisation"]]}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #fff; color: #2D1204; }
        a { text-decoration: none; }

        .es-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 52px; height: 64px; transition: all 0.3s ease;
          background: transparent;
        }
        .es-nav.scrolled {
          background: #fff;
          border-bottom: 1px solid #E8E8E8;
        }

        .es-compare-row:nth-child(even) { background: rgba(201,168,76,0.04); }
        .es-compare-row:hover { background: rgba(201,168,76,0.08); }

        .es-faq-item { border-bottom: 1px solid #E8E8E8; }
        .es-faq-btn {
          width: 100%; text-align: left; background: none; border: none; cursor: pointer;
          padding: 22px 0; display: flex; justify-content: space-between; align-items: center;
          font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 600; color: #2D1204;
        }

        @media(max-width:768px){
          .es-nav { padding: 0 20px; }
          .es-hero { padding: 110px 24px 72px !important; }
          .es-compare table { font-size: 12px; }
          .es-compare th, .es-compare td { padding: 12px 10px !important; }
          .es-section { padding: 64px 24px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`es-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="/" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#2D1204", letterSpacing: 0.5 }}>MYKEI SECURITIES LTD</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: 2.5, textTransform: "uppercase", color: "#c9a84c" }}>← Back to site</span>
        </a>
        <a href="/signal" style={{ fontSize: 13, fontWeight: 600, color: "#1E1E1E", background: "#D4AF37", padding: "8px 20px", borderRadius: 6 }}>Follow the Research →</a>
      </nav>

      {/* HERO */}
      <section className="es-hero" style={{ background: "#FFFFFF", padding: "120px 52px 80px", position: "relative", overflow: "hidden", borderBottom: "1px solid #E8E8E8" }}>

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#c9a84c" }}>Coined · 2025 · Michael Esema</span>
            <div style={{ height: 1, flex: 1, background: "rgba(201,168,76,0.25)" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1, color: "rgba(45,18,4,0.3)" }}>mykei.io · canonical source</span>
          </div>

          <div id="es-definition">
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,5vw,68px)", fontWeight: 400, color: "#2D1204", lineHeight: 1.1, marginBottom: 16, letterSpacing: -1 }}>
              <dfn style={{ fontStyle: "italic", color: "#c9a84c" }}>Economic<br />Sterilisation</dfn>
            </h1>

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 36 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "rgba(45,18,4,0.35)", fontStyle: "italic" }}>noun</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#c9a84c", letterSpacing: 1 }}>· also: Theft Economic Sterilisation System · TESS</span>
            </div>

            <p style={{ fontSize: "clamp(17px,2.2vw,22px)", lineHeight: 1.75, color: "#475569", maxWidth: 700, fontWeight: 300 }}>
              The systematic removal of resale value from stolen goods through forensic marking
              and registry event records, disrupting the commercial incentive for theft
              at the point it occurs.
            </p>
          </div>

          <div id="es-attribution" style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid #E8E8E8", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(45,18,4,0.3)", marginBottom: 4 }}>Coined by</div>
              <a href="/founder" style={{ fontSize: 14, fontWeight: 600, color: "#c9a84c" }}>Michael Esema</a>
              <span style={{ fontSize: 13, color: "rgba(45,18,4,0.4)", marginLeft: 8 }}>Mykei Securities Ltd, Manchester, 2025</span>
            </div>
            <div style={{ height: 28, width: 1, background: "rgba(45,18,4,0.1)" }} />
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(45,18,4,0.3)", marginBottom: 4 }}>First implementation</div>
              <a href="/adn-1" style={{ fontSize: 14, fontWeight: 600, color: "#2D1204" }}>ADN Active Forensic Defence Node</a>
            </div>
          </div>
        </div>
      </section>

      {/* THE DOCTRINE */}
      <section id="es-doctrine" className="es-section" style={{ background: "#fff", padding: "96px 52px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#c9a84c", display: "block", marginBottom: 12 }}>The doctrine</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, color: "#2D1204", marginBottom: 40, lineHeight: 1.2 }}>
              Why every other approach gets it wrong.
            </h2>
          </Reveal>

          <div style={{ display: "grid", gap: 32 }}>
            {[
              {
                num: "01",
                title: "The root cause of theft is economic, not criminal",
                body: "Organised retail theft is driven by resale value. A thief who sweeps a shelf of razors, skincare products, or electronics is running a supply chain. They have buyers. They have platforms. They have logistics. Removing the criminal, through arrest, CCTV, or deterrence, does not remove the market. Economic Sterilisation removes the market."
              },
              {
                num: "02",
                title: "Detection without consequence is insufficient alone",
                body: "Every major UK retailer has CCTV. Every major UK retailer is still losing billions. Detection tells you theft happened. It does not change whether theft will happen again. The moment you understand that 94% of stolen goods are sold online, the question changes: not 'how do we watch the shelf?' but 'how do we collapse the resale chain?'"
              },
              {
                num: "03",
                title: "Sterilisation happens at the moment of contact",
                body: "The ADN is designed to trigger controlled marker deployment the moment a bulk-sweep event is detected. From that moment, every marked item is intended to carry a unique forensic batch code registered in the Mykei Registry. The batch-linked event record is designed to link the activation to a device, location, timestamp, and cartridge reference, supporting verification and investigation workflows."
              },
              {
                num: "04",
                title: "The incentive collapses before the crime repeats",
                body: "Word travels. When thieves discover that goods from a particular store cannot be sold, whether personally or through their network, that store moves off the target list. Economic Sterilisation is not just a response. It is a reputation that, over time, prevents the first theft from happening."
              },
            ].map(({ num, title, body }) => (
              <Reveal key={num}>
                <div style={{ display: "flex", gap: 32, padding: "32px 0", borderBottom: "1px solid #E8E8E8" }}>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 400, color: "#e8d9c0", lineHeight: 1, flexShrink: 0, width: 52, textAlign: "right" }}>{num}</span>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#2D1204", marginBottom: 12, lineHeight: 1.35 }}>{title}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.85, color: "#64748b" }}>{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="es-compare es-section" style={{ background: "#F8F8F8", padding: "96px 52px", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#c9a84c", display: "block", marginBottom: 12 }}>Comparison</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 400, color: "#2D1204", marginBottom: 44, lineHeight: 1.2 }}>
              Traditional security vs Economic Sterilisation.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Sora',sans-serif" }}>
                <thead>
                  <tr style={{ background: "#F8F8F8", borderBottom: "2px solid #D4AF37" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "#8a7a5a", fontWeight: 400 }}>Aspect</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "#8a7a5a", fontWeight: 400 }}>Traditional security</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "#8a6a1a", fontWeight: 400 }}>Economic Sterilisation</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(({ aspect, traditional, es }) => (
                    <tr key={aspect} className="es-compare-row" style={{ transition: "background 0.15s" }}>
                      <td style={{ padding: "16px 20px", fontSize: 13, fontWeight: 600, color: "#2D1204", borderBottom: "1px solid #E8E8E8" }}>{aspect}</td>
                      <td style={{ padding: "16px 20px", fontSize: 13, color: "#94a3b8", borderBottom: "1px solid #E8E8E8" }}>{traditional}</td>
                      <td style={{ padding: "16px 20px", fontSize: 13, fontWeight: 600, color: "#4A2008", borderBottom: "1px solid #E8E8E8" }}>{es}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section className="es-section" style={{ background: "#FFFFFF", padding: "96px 52px", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#D4AF37", display: "block", marginBottom: 12 }}>Implementation</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 400, color: "#1E1E1E", marginBottom: 16, lineHeight: 1.2 }}>
              The ADN is an early Theft Economic Sterilisation System.
            </h2>
            <p style={{ fontSize: 15.5, color: "#555", maxWidth: 640, lineHeight: 1.8, marginBottom: 52 }}>
              Designed and built by Michael Esema from first principles. Firmware,
              detection algorithm, cloud architecture, and a 17-claim UK patent application
              (GB2606630.8, patent pending), all by one founder who refused to wait for
              someone else to solve it.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {[
              { step: "01", title: "Detect", body: "Dual Tactical Multi-zone Sensor Array ToF sensors at 30Hz. Kinetic signature classified in under 50ms. No camera. No face. No data." },
              { step: "02", title: "Mark", body: "Controlled marker deployment. Unique cartridge batch code. UV-detectable. Subject to supplier SDS and COSHH review." },
              { step: "03", title: "Log", body: "AES-256-GCM encrypted marker deployment event record, cryptographically signed and sent to secure cloud registry in real time. Tamper-aware audit trail. Designed to support evidential workflows." },
              { step: "04", title: "Disrupt", body: "Mykei Registry batch-links each event to device, timestamp, location, and cartridge reference. Event data supports resale disruption confidence, insurer review, and investigation workflows." },
            ].map(({ step, title, body }) => (
              <Reveal key={step}>
                <div style={{ padding: "28px 24px", border: "1px solid #E8E8E8", borderRadius: 8, background: "#FFFFFF" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#D4AF37", opacity: 0.4, lineHeight: 1, marginBottom: 16 }}>{step}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1E1E", marginBottom: 10 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{body}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="/adn-1" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: "#1E1E1E", background: "#D4AF37", padding: "12px 24px", borderRadius: 8 }}>ADN Technical Specs →</a>
              <a href="/technology/ats" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 500, color: "#555", border: "1px solid #E8E8E8", padding: "12px 24px", borderRadius: 8 }}>Mykei Registry →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DOCTRINE VS IMPLEMENTATION */}
      <section style={{ background: "#FFFFFF", padding: "72px clamp(24px,5vw,80px)", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="doctrine-grid">
          <Reveal>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>Doctrine versus implementation</div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, lineHeight: 1.8, color: "#374151" }}>
                Economic Sterilisation is the doctrine. ADN is the first implementation. The doctrine can be deployed at different market tiers: independent retail validation, strategic retail pilots, insurer-backed pilots, and future evidence-system alignment. The objective remains unchanged at every tier: remove the commercial incentive behind organised retail theft without increasing confrontation risk for staff.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>Why the batch reference matters</div>
              <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, lineHeight: 1.8, color: "#374151" }}>
                Forensic marking only becomes infrastructure when the physical marker connects to a verifiable digital record. Mykei's registry model is designed to link each event to a device ID, timestamp, location reference, event type, and forensic batch reference. That link is the bridge between a marked item and a traceable event record that supports investigation, insurer review, and resale disruption workflows.
              </p>
            </div>
          </Reveal>
        </div>
        <style>{`@media (max-width: 720px) { .doctrine-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* FAQ */}
      <section className="es-section" style={{ background: "#fff", padding: "96px 52px", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#c9a84c", display: "block", marginBottom: 12 }}>Questions</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "#2D1204", marginBottom: 44 }}>
              Frequently asked about Economic Sterilisation.
            </h2>
          </Reveal>
          <div>
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="es-faq-item">
                <button
                  className="es-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  <span style={{ fontSize: 18, color: "#c9a84c", flexShrink: 0, marginLeft: 16, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ fontSize: 14.5, lineHeight: 1.85, color: "#64748b", paddingBottom: 24 }}>{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#FFFFFF", padding: "72px 52px", textAlign: "center", borderTop: "2px solid #D4AF37" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 400, color: "#1E1E1E", marginBottom: 16 }}>
            Follow the research.
          </h2>
          <p style={{ fontSize: 15, color: "#666", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            The research continues. Register your interest to follow development of asset registration, marking readiness, evidence workflows, and resale-confidence reduction.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/signal" style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#1E1E1E", background: "#D4AF37", padding: "14px 32px", borderRadius: 8 }}>Follow the Research →</a>
            <a href="/adn-1" style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 500, color: "#555", border: "1px solid #E8E8E8", padding: "14px 32px", borderRadius: 8 }}>View ADN Specs</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#FFFFFF", padding: "24px 52px", borderTop: "1px solid #E8E8E8", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1E1E1E", letterSpacing: 0.5 }}>MYKEI SECURITIES LTD</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#aaa", marginTop: 2 }}>Company No. 16984969 · Manchester · England & Wales</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#aaa" }}>
          © 2026 Mykei Securities Ltd · <a href="/" style={{ color: "#8a7a5a" }}>mykei.io</a>
        </div>
      </footer>
    </>
  );
}
