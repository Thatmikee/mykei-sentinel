import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const GOLD = "#0D9488";
const INK = "#1E1E1E";
const PAPER = "#FAFAF8";
const MUTED = "#6B6B65";
const RULE = "#E8E8E4";

function SimpleNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav aria-label="Site navigation" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 56, padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(250,250,248,0.97)" : "rgba(250,250,248,1)",
      borderBottom: `1px solid ${RULE}`,
      backdropFilter: "blur(12px)",
    }}>
      <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: INK, textDecoration: "none" }}>
        Mykei Securities
      </a>
      <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}`, padding: "7px 14px", textDecoration: "none" }}>
        Follow the Research
      </a>
    </nav>
  );
}

function NewsletterForm() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <a
        href="mailto:protocol@mykei.io?subject=State of Retail Theft Report"
        style={{ padding: "11px 20px", background: INK, color: "#fff", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}
      >
        Request the report
      </a>
      <span style={{ fontSize: 12, color: MUTED }}>protocol@mykei.io</span>
    </div>
  );
}

/* Static data preview */
const PREVIEW_DATA = [
  { label: "UK theft incidents (2024)", value: "6.2M", src: "ACS Crime Report" },
  { label: "Global retail theft losses", value: "$796B", src: "Global Retail Theft Barometer" },
  { label: "Average loaded cost per incident", value: "£461.86", src: "BRC Retail Crime Survey" },
  { label: "Proprietary Forensic Marking Compound repeat theft reduction", value: "83%", src: "Met Police programme, 2024" },
  { label: "Arrests in Met Proprietary Forensic Marking Compound pilot", value: "32", src: "Metropolitan Police, 2024" },
  { label: "AI loss prevention market (2030 est.)", value: "$31.2B", src: "Grand View Research" },
];

export default function StateOfTheftPage() {
  useEffect(() => {
    document.title = "State of Retail Theft | Mykei Securities Research Dashboard";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Mykei Securities tracks the data behind retail theft: global losses, UK incident counts, forensic marking results, and the economics of organised retail crime. Sign up for the quarterly report.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://mykei.io/state-of-theft";
  }, []);

  return (
    <>
      <SimpleNav />
      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 80 }}>

        {/* HERO */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "80px 40px 64px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
            Mykei Securities Ltd, Research
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.1, color: INK, marginBottom: 24 }}>
            State of Retail Theft.
          </h1>
          <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.75, maxWidth: 560, marginBottom: 40 }}>
            The data behind retail crime: incident volumes, economic losses, forensic deterrence results, and the resale platforms that make theft profitable. Updated quarterly.
          </p>
          <div style={{ maxWidth: 480 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 14 }}>
              Request the first edition
            </p>
            <NewsletterForm />
          </div>
        </section>

        {/* DATA PREVIEW */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 40 }}>
            Key figures
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
            {PREVIEW_DATA.map(({ label, value, src }) => (
              <div key={label} style={{ borderTop: `1px solid ${RULE}`, paddingTop: 20 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: INK, lineHeight: 1, marginBottom: 8 }}>
                  {value}
                </div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, marginBottom: 6 }}>{label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#BBBBB4", letterSpacing: "0.1em" }}>{src}</div>
              </div>
            ))}
          </div>
        </section>

        {/* COVERAGE AREAS */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            What the report covers
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: INK, marginBottom: 16 }}>
                The quarterly edition tracks four areas.
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                Each report combines published crime surveys (ACS, BRC, ONS) with data from Mykei-deployed ADN units: incident detection rates, controlled marker deployment frequency, and Mykei Registry event records.
              </p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Incident volume: UK and global figures by sector",
                "Economic cost: loaded cost per incident, insurance adjustment data",
                "Forensic outcomes: Proprietary Forensic Marking Compound and ADN deployment results",
                "Resale intelligence: platform-level stolen goods flagging rates",
              ].map(item => (
                <li key={item} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${RULE}`, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                  <span style={{ color: GOLD, fontSize: 14, lineHeight: 1.6, minWidth: 14 }}>+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PILOT CTA */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px 96px" }}>
          <div style={{ maxWidth: 520 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: INK, marginBottom: 16, lineHeight: 1.25 }}>
              The first edition is in preparation.
            </h2>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 28 }}>
              If you are a retailer and want early access to the data and the ADN research programme, follow the research updates.
            </p>
            <a
              href="/signal"
              style={{ display: "inline-block", padding: "12px 24px", background: INK, color: "#fff", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Follow the Research
            </a>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        *:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        @media (max-width: 640px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
