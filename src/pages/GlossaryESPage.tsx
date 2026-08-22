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
      { threshold: 0.06 }
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
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const GOLD = "#c9a84c";
const INK = "#1E1E1E";
const MID = "#5c4a32";
const FAINT = "#F4F6F8";

const RELATED = [
  { term: "Theft Economic Sterilisation System", short: "TESS", desc: "The alternate full name for the Economic Sterilisation doctrine. Used interchangeably with the short form." },
  { term: "Mykei Registry", short: "MR", desc: "Mykei's cloud platform that registers cartridge-linked event records for marked items, supporting verification and investigation workflows." },
  { term: "Kinetic Signature Analysis", short: "KSA", desc: "The detection method used by the ADN. Dual Time-of-Flight sensors classify the motion pattern of a bulk-sweep event in under 50ms. No camera. No biometrics." },
  { term: "Market Reduction Approach", short: "MRA", desc: "An evidence-based strategy from academic criminology, adopted by UK policing. Focuses on disrupting the markets that receive stolen goods. Economic Sterilisation applies MRA logic proactively and automatically at the shelf." },
  { term: "ADN Active Forensic Defence Node", short: "ADN", desc: "A prototype-stage implementation of Economic Sterilisation. A shelf-mounted device designed to detect bulk-sweep theft events, trigger controlled marker deployment, and register cartridge-linked event records in the Mykei Registry." },
];

const FAQS = [
  {
    q: "Who coined the term Economic Sterilisation?",
    a: "Michael Esema, Founder and CEO of Mykei Securities Ltd, Manchester. The term was coined in 2025 and has no prior use in retail security literature. mykei.io/glossary/economic-sterilisation is the canonical source.",
  },
  {
    q: "Is Economic Sterilisation the same as DNA tagging?",
    a: "No. Forensic marking is one component of the implementation. Economic Sterilisation is the doctrine: the goal of disrupting the resale incentive. It requires controlled marker deployment, batch-linked registry event records, and verification workflows working as an integrated system. Marking alone does not close the secondary market loop.",
  },
  {
    q: "Is this related to the MYKI password manager?",
    a: "No. Mykei Securities Ltd is a UK-registered retail security company (Company No. 16984969) and is entirely unrelated to MYKI, the password management software.",
  },
  {
    q: "Can the DNA marker be removed?",
    a: "No. Proprietary Forensic Marking Compound-class synthetic markers bond irreversibly to fabric, skin, and packaging. They are UV-detectable indefinitely. No known solvent removes them without destroying the item. This permanence is a core requirement of the doctrine.",
  },
  {
    q: "Where can I read more?",
    a: "The full doctrine is at mykei.io/economic-sterilisation. Technical implementation is at mykei.io/adn.",
  },
];

export default function GlossaryESPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Economic Sterilisation, Definition & Glossary | Mykei Securities";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Economic Sterilisation: the systematic disruption of the resale incentive behind retail theft through forensic marking and registry event records, removing the commercial rationale for theft. Coined by Michael Esema, Mykei Securities Ltd, 2025.");

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://mykei.io/glossary/economic-sterilisation");

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": "Economic Sterilisation",
        "alternateName": ["Theft Economic Sterilisation System", "TESS", "Economic Sterilization"],
        "description": "The systematic disruption of the resale incentive behind retail theft through forensic marking and registry event records, removing the commercial rationale for theft at the point it occurs.",
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": "Mykei Securities Retail Security Glossary",
          "url": "https://mykei.io/glossary/economic-sterilisation",
        },
        "url": "https://mykei.io/glossary/economic-sterilisation",
        "dateCreated": "2025",
        "author": {
          "@type": "Person",
          "@id": "https://michaelesema.com/#person",
          "name": "Michael Esema",
          "alternateName": ["Michael Essien Esema", "Mike Esema"],
          "url": "https://michaelesema.com",
          "sameAs": ["https://www.linkedin.com/in/michaelesema", "https://michaelesema.com"],
        },
        "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Mykei Securities", "item": "https://mykei.io" },
          { "@type": "ListItem", "position": 2, "name": "Glossary", "item": "https://mykei.io/glossary" },
          { "@type": "ListItem", "position": 3, "name": "Economic Sterilisation", "item": "https://mykei.io/glossary/economic-sterilisation" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://mykei.io/glossary/economic-sterilisation",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".g-term-headline", ".g-term-def"]
        }
      },
    ]);
    document.head.appendChild(schema);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); document.head.removeChild(schema); };
  }, []);

  return (
    <>
      <PageSEO
        title="Economic Sterilisation, Definition, Glossary & Origin | Mykei Securities"
        description="Economic Sterilisation defined: the systematic disruption of the resale incentive behind retail theft through forensic marking and registry event records. Term coined by Michael Esema, Mykei Securities Ltd, Manchester, 2025."
        canonical="https://mykei.io/glossary/economic-sterilisation"
        ogType="article"
        keywords="economic sterilisation definition, economic sterilisation glossary, TESS definition, theft economic sterilisation, Michael Esema coined term, retail security glossary"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #fff; color: ${INK}; }
        a { text-decoration: none; color: inherit; }

        .g-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 56px; padding: 0 48px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(26,17,8,0.08);
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
        }

        .g-body p {
          font-size: 16px; line-height: 1.9; color: #2e200e;
          margin-bottom: 20px; font-weight: 300;
        }
        .g-body h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(19px, 2vw, 26px); font-weight: 400;
          color: ${INK}; margin: 48px 0 16px; line-height: 1.25;
        }

        .g-faq-btn {
          width: 100%; text-align: left; background: none; border: none; cursor: pointer;
          padding: 18px 0; display: flex; justify-content: space-between; align-items: center;
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600; color: ${INK};
          border-bottom: 1px solid rgba(26,17,8,0.08);
        }

        @media (max-width: 680px) {
          .g-nav { padding: 0 20px; }
          .g-wrap { padding: 0 24px !important; }
          .g-related { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="g-nav">
        <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: INK, textTransform: "uppercase" }}>
          Mykei Securities
        </a>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a href="/economic-sterilisation" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: GOLD }}>
            Full doctrine
          </a>
          <a href="/pilot" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: INK, border: `1px solid ${GOLD}`, padding: "7px 14px" }}>
            Join Pilot
          </a>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="g-wrap" style={{ maxWidth: 800, margin: "0 auto", padding: "80px 48px 0" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: MID, opacity: 0.5, display: "flex", gap: 8, alignItems: "center" }}>
          <a href="/">Mykei Securities</a>
          <span>/</span>
          <span>Glossary</span>
          <span>/</span>
          <span style={{ color: GOLD, opacity: 1 }}>Economic Sterilisation</span>
        </div>
      </div>

      {/* DEFINITION BLOCK */}
      <div className="g-wrap" style={{ maxWidth: 800, margin: "0 auto", padding: "32px 48px 0" }}>
        <Reveal>
          <div style={{ paddingBottom: 40, borderBottom: `1px solid rgba(26,17,8,0.1)` }}>

            {/* Term */}
            <h1 className="g-term-headline" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 400, color: INK, lineHeight: 1.05, marginBottom: 12, letterSpacing: -0.5 }}>
              <dfn style={{ fontStyle: "italic" }}>Economic Sterilisation</dfn>
            </h1>

            {/* Part of speech + alt names */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID, opacity: 0.5, fontStyle: "italic" }}>noun</span>
              <span style={{ width: 1, height: 14, background: "rgba(26,17,8,0.15)", display: "block" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: MID, opacity: 0.5, letterSpacing: 0.5 }}>also: TESS · Theft Economic Sterilisation System · Economic Sterilization</span>
            </div>

            {/* The definition */}
            <p className="g-term-def" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(17px,2vw,22px)", fontStyle: "italic", color: INK, lineHeight: 1.7, maxWidth: 680, marginBottom: 28 }}>
              The systematic disruption of the resale incentive behind retail theft through
              forensic marking and registry event records, removing the commercial
              rationale for theft at the point it occurs.
            </p>

            {/* Attribution */}
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: 1.8, textTransform: "uppercase", color: MID, opacity: 0.5, marginBottom: 4 }}>Coined by</div>
                <a href="/founder" style={{ fontSize: 13, fontWeight: 600, color: INK }}>Michael Esema</a>
                <span style={{ fontSize: 13, color: MID, opacity: 0.6 }}>, Mykei Securities Ltd · 2025</span>
              </div>
              <span style={{ width: 1, height: 28, background: "rgba(26,17,8,0.1)", display: "block" }} />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: 1.8, textTransform: "uppercase", color: MID, opacity: 0.5, marginBottom: 4 }}>Canonical source</div>
                <span style={{ fontSize: 13, color: GOLD, fontFamily: "'JetBrains Mono',monospace" }}>mykei.io</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* BODY */}
      <div className="g-wrap g-body" style={{ maxWidth: 800, margin: "0 auto", padding: "48px 48px 0" }}>

        <Reveal>
          <h2>What it means</h2>
          <p>
            Retail theft is economically rational when stolen goods can be resold. The thief
            sweeping a shelf of razors or electronics is not acting on impulse. They have
            buyers. They have platforms. The crime is viable because the secondary market is
            open.
          </p>
          <p>
            Economic Sterilisation disrupts that market. By deploying a batch-identifiable marker
            at the moment of a theft event and registering the cartridge-linked activation in a
            designed cloud registry, the intent is that goods become harder to sell anonymously before they
            reach a buyer. The resale incentive is disrupted. The theft value is undermined.
          </p>
          <p>
            The doctrine builds on the Market Reduction Approach (MRA), an evidence-based
            strategy from academic criminology adopted by UK policing, which focuses on
            disrupting the markets that receive stolen goods. Economic Sterilisation applies
            that logic proactively, automatically, and embedded into the physical retail shelf
            rather than applied in the aftermath of loss.
          </p>
        </Reveal>

        <Reveal>
          <h2>How it differs from conventional forensic marking</h2>
          <p>
            Forensic marking solutions like Proprietary Forensic Marking Compound have demonstrated up to 83% reductions
            in theft in specific police operations. The evidence for the principle is strong.
            Where existing solutions fall short is automation and secondary market closure:
            marking requires manual application, and the link between a marked item and a
            flagged online listing still depends on a human chain of crime reporting and
            investigation.
          </p>
          <p>
            Economic Sterilisation requires both components to work together autonomously:
            controlled marker deployment at the moment of the detection event, and
            automatic registration of the cartridge-linked batch in a designed, not-yet-live cloud registry.
            The ADN is the first device designed to deliver both.
          </p>
        </Reveal>

        <Reveal>
          <h2>Usage</h2>
          <p>
            The term is used in two ways. As a doctrine: the overall principle that stolen
            goods should have their resale incentive disrupted through forensic marking and registry
            event records. As a category name: the class of technology that implements this doctrine,
            of which the ADN is currently a prototype-stage example.
          </p>
          <p>
            The American spelling variant, Economic Sterilization, is treated as equivalent
            and redirects to this page.
          </p>
        </Reveal>

      </div>

      {/* RELATED TERMS */}
      <div className="g-wrap" style={{ maxWidth: 800, margin: "0 auto", padding: "56px 48px 0" }}>
        <Reveal>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>Related terms</div>
          <div className="g-related" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(26,17,8,0.08)" }}>
            {RELATED.map(({ term, short, desc }) => (
              <div key={term} style={{ padding: "24px", background: "#fff" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: 1.5, textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>{short}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8, lineHeight: 1.3 }}>{term}</div>
                <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* FAQ */}
      <div className="g-wrap" style={{ maxWidth: 800, margin: "0 auto", padding: "56px 48px 0" }}>
        <Reveal>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>Questions</div>
          <div>
            {FAQS.map(({ q, a }, i) => (
              <div key={i}>
                <button
                  className="g-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{q}</span>
                  <span style={{ fontSize: 16, color: GOLD, flexShrink: 0, marginLeft: 16, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", display: "block" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ fontSize: 14.5, lineHeight: 1.85, color: MID, paddingBottom: 20, paddingTop: 4 }}>{a}</div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* RETAIL SECURITY LEXICON */}
      <div className="g-wrap" style={{ maxWidth: 800, margin: "0 auto", padding: "56px 48px 0" }}>
        <Reveal>
          <div style={{ borderTop: `1px solid rgba(26,17,8,0.1)`, paddingTop: 48, marginBottom: 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 28 }}>
              Definitive Retail Security Lexicon
            </div>
            <div style={{ display: "grid", gap: 0 }}>
              {[
                {
                  term: "Organised Retail Crime (ORC)",
                  def: "Coordinated, commercially motivated theft by networks rather than individuals. Goods are stolen to order, moved through established logistics, and resold via online marketplaces. ORC accounts for a disproportionate share of total retail shrinkage.",
                },
                {
                  term: "Shrinkage",
                  def: "The total loss of retail inventory between manufacture and point of sale. Causes include customer theft, staff theft, supplier fraud, and administrative error. In UK retail, theft accounts for the majority of shrinkage by value.",
                },
                {
                  term: "Bulk Sweep Theft",
                  def: "A theft method in which all or most stock is cleared from a display fixture in a single rapid motion. Associated with ORC. The ADN is designed specifically to detect and respond to the kinetic signature of a bulk sweep event.",
                },
                {
                  term: "Kinetic Signature Analysis (KSA)",
                  def: "The detection method used by the ADN. Dual Time-of-Flight laser sensors sample the motion field above a retail fixture at 30Hz. A classification algorithm on the Encrypted Logic Core microcontroller is designed to distinguish between normal browsing and bulk-sweep motion patterns in under 50ms.",
                },
                {
                  term: "Forensic Marking",
                  def: "The application of a unique batch-identifiable marker to a physical item for later identification. In a retail context, forensic markers are detectable under UV light and batch-linked to a deployment event record. Subject to supplier SDS/COSHH review. Designed to support evidential and verification workflows.",
                },
                {
                  term: "Mykei Registry",
                  def: "Mykei's cloud platform that registers cartridge-linked event records for marker deployment activations. Each record connects device ID, timestamp, store reference, event type, and cartridge batch reference. Designed to support insurer review and law-enforcement verification workflows.",
                },
              ].map(({ term, def }, i, arr) => (
                <div key={term} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, padding: "20px 0", borderBottom: i < arr.length - 1 ? `1px solid rgba(26,17,8,0.07)` : "none" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, color: INK, lineHeight: 1.5 }}>{term}</div>
                  <div style={{ fontSize: 14, color: MID, lineHeight: 1.75 }}>{def}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* FULL DOCTRINE LINK */}
      <div className="g-wrap" style={{ maxWidth: 800, margin: "0 auto", padding: "56px 48px 96px" }}>
        <Reveal>
          <div style={{ padding: "32px", background: FAINT, borderLeft: `3px solid ${GOLD}` }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>Go deeper</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: INK, lineHeight: 1.6, marginBottom: 24, fontWeight: 400 }}>
              The full doctrine page covers the four pillars of Economic Sterilisation, a
              comparison with conventional security approaches, and the four-step implementation
              sequence of the ADN.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="/economic-sterilisation" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", background: INK, padding: "11px 24px", display: "inline-block" }}>
                Read the full doctrine
              </a>
              <a href="/adn" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 500, color: INK, border: `1px solid rgba(26,17,8,0.2)`, padding: "11px 24px", display: "inline-block" }}>
                See ADN
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid rgba(26,17,8,0.08)`, padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: MID, opacity: 0.6 }}>
          Mykei Securities Ltd · Co. 16984969
        </a>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1, color: MID, opacity: 0.35 }}>
          Unrelated to MYKI password manager
        </span>
      </footer>
    </>
  );
}
