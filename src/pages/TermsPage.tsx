import { useEffect } from "react";
import Footer from "@/components/Footer";

const GOLD = "#D8001F";
const INK = "#1E1E1E";
const PAPER = "#FFFFFF";
const MUTED = "#6B6B65";
const RULE = "#E8E8E4";

function SimpleNav() {
  return (
    <nav aria-label="Site navigation" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 56, padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(250,250,248,0.97)",
      borderBottom: `1px solid ${RULE}`,
      backdropFilter: "blur(12px)",
    }}>
      <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: INK, textDecoration: "none" }}>
        Mykei Securities
      </a>
    </nav>
  );
}

const section: React.CSSProperties = {
  maxWidth: 740,
  margin: "0 auto",
  padding: "0 40px 56px",
};

const h2: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: 22,
  fontWeight: 400,
  color: INK,
  marginBottom: 16,
  marginTop: 48,
  lineHeight: 1.3,
};

const p: React.CSSProperties = {
  fontSize: 15,
  color: MUTED,
  lineHeight: 1.85,
  marginBottom: 16,
};

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Service | Mykei Securities Ltd";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Terms of Service for Mykei Securities Ltd. Governing the use of mykei.io and the ADN Independent Retail Pilot programme.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://mykei.io/terms";
    let noindex = document.querySelector('meta[name="robots"]');
    if (!noindex) {
      noindex = document.createElement("meta");
      noindex.setAttribute("name", "robots");
      document.head.appendChild(noindex);
    }
    noindex.setAttribute("content", "noindex, follow");
    return () => { noindex?.setAttribute("content", "index, follow"); };
  }, []);

  return (
    <>
      <SimpleNav />

      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 80 }}>

        <header style={{ maxWidth: 740, margin: "0 auto", padding: "80px 40px 48px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>
            Legal
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400, lineHeight: 1.1, color: INK, marginBottom: 16 }}>
            Terms of Service
          </h1>
          <p style={{ ...p, color: MUTED }}>
            Last updated: 18 April 2026. These terms govern your use of mykei.io and participation in the Mykei Securities Independent Retail Pilot.
          </p>
        </header>

        <div style={{ paddingTop: 48, paddingBottom: 80 }}>

          <div style={section}>
            <h2 style={h2}>1. Who we are</h2>
            <p style={p}>
              Mykei Securities Ltd is a company registered in England and Wales (Company No. 16984969). We can be contacted at protocol@mykei.io.
            </p>

            <h2 style={h2}>2. What these terms cover</h2>
            <p style={p}>
              These terms apply to all visitors to mykei.io, to organisations registering interest in an independent retail pilot, and to any party evaluating ADN. Registering interest and any letter of interest are non-binding and do not create a contract.
            </p>

            <h2 style={h2}>3. Website use</h2>
            <p style={p}>
              You may use mykei.io for lawful purposes only. You must not use the site in any way that breaches applicable law, infringes intellectual property rights, transmits unsolicited commercial communications, or attempts to gain unauthorised access to any part of our systems.
            </p>
            <p style={p}>
              Content on mykei.io, including Signal articles, technical documentation, and the Economic Sterilisation doctrine, is the intellectual property of Mykei Securities Ltd and Michael Esema. You may share or quote from it with attribution. You may not reproduce it commercially without written permission.
            </p>

            <h2 style={h2}>4. Independent Retail Pilot</h2>
            <p style={p}>
              The Independent Retail Pilot is not open for applications and Mykei is not accepting Letters of Intent. Letters of Intent submitted previously did not constitute a binding contract; they expressed an intention to discuss participation and nothing more.
            </p>
            <p style={p}>
              Pilot pricing is scoped per pilot and confirmed in writing before device installation. No lock-in applies after the initial pilot term.
            </p>
            <p style={p}>
              Mykei Securities reserves the right to refuse or withdraw pilot participation at any time if a retailer's premises are found to be unsuitable for safe device deployment or if the retailer is in breach of applicable law.
            </p>

            <h2 style={h2}>5. Intellectual property</h2>
            <p style={p}>
              UK patent application No. 2606630.8, the "Economic Sterilisation" doctrine, the "Theft Economic Sterilisation System (TESS)" terminology, the "Mykei Registry" terminology, and the ADN product name are the intellectual property of Mykei Securities Ltd and/or Michael Esema. Unauthorised use, reproduction, or commercial exploitation of these terms or the underlying technology is prohibited.
            </p>

            <h2 style={h2}>6. Limitation of liability</h2>
            <p style={p}>
              The ADN is a detection and forensic marking device. It is not a substitute for a complete security strategy. Mykei Securities does not guarantee that use of the ADN will eliminate retail theft losses. To the maximum extent permitted by law, Mykei Securities Ltd excludes all liability for indirect or consequential losses arising from reliance on information on this site.
            </p>

            <h2 style={h2}>7. Governing law</h2>
            <p style={p}>
              These terms are governed by the law of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2 style={h2}>8. Changes to these terms</h2>
            <p style={p}>
              We may update these terms as the business develops. The "last updated" date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated terms.
            </p>

            <h2 style={h2}>9. Contact</h2>
            <p style={p}>
              Questions about these terms: <a href="mailto:protocol@mykei.io" style={{ color: GOLD, textDecoration: "none" }}>protocol@mykei.io</a>
            </p>
          </div>

        </div>

      </main>

      <Footer />

      <style>{`
        *:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; border-radius: 2px; }
        @media (max-width: 640px) {
          header, div[style*="max-width: 740px"] { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
