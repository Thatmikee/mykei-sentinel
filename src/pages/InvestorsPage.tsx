import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const GOLD = "#D8001F";
const INK = "#1A1A18";
const PAPER = "#FFFFFF";
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
      <a href="/adn" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}`, padding: "7px 14px", textDecoration: "none" }}>
        Product
      </a>
    </nav>
  );
}

export default function InvestorsPage() {
  useEffect(() => {
    document.title = "Investor Relations | Mykei Securities Ltd";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Investor relations for Mykei Securities Ltd. Market opportunity, traction, and use of funds for the ADN forensic retail security system.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://mykei.io/investors";
    // noindex, shared selectively, not for search
    let noindex = document.querySelector('meta[name="robots"]');
    if (!noindex) {
      noindex = document.createElement("meta");
      noindex.setAttribute("name", "robots");
      document.head.appendChild(noindex);
    }
    noindex.setAttribute("content", "noindex,nofollow");
    return () => { noindex?.setAttribute("content", "index,follow"); };
  }, []);

  return (
    <>
      <SimpleNav />
      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 80 }}>

        {/* HEADER */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "80px 40px 64px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
            Mykei Securities Ltd, Investor Relations
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.1, color: INK, marginBottom: 24 }}>
            The market that didn't exist<br />until the theft rate made it inevitable.
          </h1>
          <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.75, maxWidth: 560 }}>
            This page is shared selectively. If you received this link, it is because someone thought the opportunity warranted your attention.
          </p>
        </section>

        {/* VISION */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            The thesis
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: INK, marginBottom: 20, lineHeight: 1.3 }}>
                Theft is a logistics problem. We solve the logistics.
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
                Professional retail theft is profitable because the stolen goods have a market. CCTV, guards, and alarms address the theft event. None of them address the resale market that makes the event worth committing.
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                Mykei's approach is to make the goods commercially compromised. ADN applies a UV-verifiable controlled marker compound to stolen merchandise and creates a batch-linked event record in the Mykei Registry. That record supports resale disruption, insurer review, and law-enforcement verification workflows. The forensic incentive for theft is removed.
              </p>
            </div>
            <div>
              <div style={{ background: "#fff", border: `1px solid ${RULE}`, borderRadius: 8, padding: "28px 24px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>
                  Market context
                </div>
                {[
                  ["$796B", "global retail theft losses annually"],
                  ["$31.2B", "AI loss prevention market by 2030"],
                  ["6.2M", "UK retail theft incidents in 2024"],
                  ["83%", "repeat theft reduction, Met Police programme 2024, third-party forensic marking (not Mykei's own result)"],
                  ["<10%", "police clear-up rate for retail theft"],
                ].map(([val, label]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: `1px solid ${RULE}` }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: INK }}>{val}</span>
                    <span style={{ fontSize: 12, color: MUTED, maxWidth: 200, textAlign: "right", lineHeight: 1.4 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRACTION */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Current traction
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
            {[
              { stat: "17", label: "claims in pending patent application", note: "No. 2606630.8 (UK), filed 23 March 2026, patent pending" },
              { stat: "5", label: "pilot partner slots open", note: "Greater Manchester" },
              { stat: "1", label: "founder, zero investors to date", note: "Revenue-first approach. No dilution before traction." },
            ].map(({ stat, label, note }) => (
              <div key={stat} style={{ borderTop: `2px solid ${GOLD}`, paddingTop: 20 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: INK, lineHeight: 1, marginBottom: 8 }}>{stat}</div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5, marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#BBBBB4", letterSpacing: "0.1em", lineHeight: 1.5 }}>{note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* USE OF FUNDS */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Use of funds
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: INK, marginBottom: 20, lineHeight: 1.3 }}>
                The capital goes to two places.
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
                First: hardware production at scale. The current ADN unit is a hand-assembled bench prototype. Investment unlocks contract manufacturing, which reduces unit cost and enables a national rollout.
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                Second: the Mykei Registry. The registry is the network layer of the product. Its value scales with the number of active deployments. Capital here funds platform integrations and the API infrastructure that makes the registry useful to insurers and law enforcement.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 20 }}>
                Everything else is covered by pilot revenue. The pricing model is designed to be cash-flow positive from the first five deployments.
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                If this is interesting to you, the conversation starts with a call. There is no deck to request. The product is the pitch.
              </p>
              <a
                href="mailto:protocol@mykei.io?subject=Investor enquiry"
                style={{ display: "inline-block", marginTop: 24, background: INK, color: "#fff", padding: "13px 28px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}
              >
                Start the conversation
              </a>
            </div>
          </div>
        </section>

        {/* FOUNDER NOTE */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px 96px" }}>
          <blockquote style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 24, maxWidth: 600 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", color: INK, lineHeight: 1.7, marginBottom: 20 }}>
              "I am not building a security company. I am building the infrastructure that makes theft economically irrational. The security company is just the first application."
            </p>
            <cite style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, fontStyle: "normal" }}>
              Michael Esema, Founder & CEO, Mykei Securities Ltd
            </cite>
          </blockquote>
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
