import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import ADN1FlowDiagram from "@/components/ADN1FlowDiagram";
import SimEventLog from "@/components/SimEventLog";

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
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const EVENT_LOGS = [
  { id: "MYK-20260304-001", ts: "2026-03-04T09:14:22Z", node: "ADN-NODE-MCR-003", zone: "SHELF-B2", vector: "94cm/s lateral", compound: "Batch MYK-B0342", status: "LOGGED" },
  { id: "MYK-20260304-002", ts: "2026-03-04T14:07:55Z", node: "ADN-NODE-MCR-003", zone: "SHELF-A1", vector: "112cm/s lateral", compound: "Batch MYK-B0343", status: "LOGGED" },
  { id: "MYK-20260304-003", ts: "2026-03-04T16:33:41Z", node: "ADN-NODE-MCR-007", zone: "SHELF-C3", vector: "88cm/s lateral", compound: "Batch MYK-B0344", status: "LOGGED" },
  { id: "MYK-20260312-001", ts: "2026-03-12T11:22:08Z", node: "ADN-NODE-MCR-003", zone: "SHELF-B2", vector: "107cm/s lateral", compound: "Batch MYK-B0361", status: "LOGGED" },
];

const ARCH_LAYERS = [
  {
    layer: "01 · SENSING",
    title: "Dual-Zone ToF Array",
    items: ["Tactical Multi-zone Sensor Array sensor × 2", "940nm VCSEL, 30Hz", "Kinetic classifier < 50ms", "Patent: No. 2606630.8"],
  },
  {
    layer: "02 · MARKING",
    title: "Forensic Deploy Module",
    items: ["Forensic Mist Deployment System", "Proprietary compound", "Irreversible bond < 3s", "UV-detectable, permanent"],
  },
  {
    layer: "03 · REGISTRY",
    title: "Mykei Registry",
    items: ["AWS IoT Core + MQTT", "AES-256-GCM encrypted", "TLS 1.3 transport", "Tamper-aware audit log"],
  },
  {
    layer: "04 · FLAGGING",
    title: "Marketplace Submission",
    items: ["Items registered in registry", "Submitted for verification", "Forensic traceability active", "Evidential linkage preserved"],
  },
];

export default function EvidencePage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <PageSEO
        title="Evidence & Deployment | Mykei Securities ADN"
        description="Mykei Securities ADN evidence overview: Independent Retail Pilot status, system architecture, UK patent application summary, and founder statement."
        canonical="https://mykei.io/evidence"
        breadcrumbs={[["Home", "https://mykei.io"], ["Evidence", "/evidence"]]}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&family=Sora:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Sora', sans-serif; background: #FFFFFF; color: #1E1E1E; }
        a { text-decoration: none; }
        .ev-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 52px; height: 60px; background: #fff; border-bottom: 1px solid #E8E8E8;
          transition: background 0.2s;
        }
        .ev-nav.scrolled { background: #FFFFFF; }
        .ev-section { padding: 80px 52px; border-bottom: 1px solid #E8E8E8; }
        .ev-section:last-child { border-bottom: none; }
        .ev-inner { max-width: 1100px; margin: 0 auto; }
        .ev-inner-md { max-width: 860px; margin: 0 auto; }
        .ev-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: #D4AF37; margin-bottom: 14px; display: block; }
        .ev-h2 { font-family: 'Playfair Display', serif; font-size: clamp(26px, 3.5vw, 42px); font-weight: 700; color: #1E1E1E; line-height: 1.1; margin-bottom: 14px; }
        .ev-body { font-size: 16px; color: #555; line-height: 1.78; max-width: 680px; }
        .ev-card { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 8px; padding: 28px; }
        .ev-photo-placeholder {
          background: #F8F8F8; border: 1px solid #E8E8E8; border-radius: 8px;
          aspect-ratio: 16/9; display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 10px; position: relative; overflow: hidden;
        }
        .ev-photo-placeholder::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .ev-photo-text { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #8a6a1a; text-align: center; position: relative; z-index: 1; }
        .ev-log-row { display: grid; grid-template-columns: 180px 1fr 100px; gap: 16px; padding: 14px 20px; border-bottom: 1px solid #E8E8E8; font-family: 'JetBrains Mono', monospace; font-size: 11px; align-items: center; }
        .ev-log-row:last-child { border-bottom: none; }
        .ev-log-header { background: #F8F8F8; border-radius: 8px 8px 0 0; font-weight: 600; color: #8a6a1a; font-size: 9px; letter-spacing: 1px; }
        .ev-log-id { color: #D4AF37; }
        .ev-log-data { color: #555; }
        .ev-log-status { color: #2D7D46; font-weight: 600; text-align: right; }
        .ev-arch-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; }
        .ev-arch-card { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 8px; padding: 24px; }
        .ev-arch-layer { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; margin-bottom: 10px; }
        .ev-arch-title { font-size: 14px; font-weight: 700; color: #1E1E1E; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #E8E8E8; }
        .ev-arch-list { list-style: none; padding: 0; }
        .ev-arch-list li { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: #555; padding: 5px 0; border-bottom: 1px solid #F8F8F8; display: flex; align-items: center; gap: 7px; }
        .ev-arch-list li:last-child { border-bottom: none; }
        .ev-arch-list li::before { content: '·'; color: #D4AF37; font-weight: 700; flex-shrink: 0; }
        .ev-patent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 32px; }
        .ev-patent-item { background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 8px; padding: 20px 24px; }
        .ev-patent-label { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 1.5px; text-transform: uppercase; color: #8a6a1a; margin-bottom: 6px; }
        .ev-patent-value { font-size: 14px; font-weight: 600; color: #1E1E1E; }
        .ev-statement { background: #F8F8F8; border: 1px solid #E8E8E8; border-left: 3px solid #D4AF37; border-radius: 0 8px 8px 0; padding: 28px 32px; }
        @media (max-width: 1024px) { .ev-arch-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .ev-nav { padding: 0 24px; }
          .ev-section { padding: 56px 24px; }
          .ev-arch-grid { grid-template-columns: 1fr; }
          .ev-patent-grid { grid-template-columns: 1fr; }
          .ev-log-row { grid-template-columns: 1fr; gap: 4px; }
          .ev-log-status { text-align: left; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`ev-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/mykei-logo.png" alt="Mykei Securities" style={{ height: 28, width: "auto" }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#2D1204" }}>MYKEI SECURITIES</span>
        </a>
        <a href="/pilot" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", background: "#D4AF37", color: "#1E1E1E", padding: "8px 20px", borderRadius: 6 }}>
          Request Pilot Evaluation
        </a>
      </nav>

      {/* HERO */}
      <section style={{ background: "#fff", padding: "120px 52px 72px", borderBottom: "2px solid #D4AF37" }}>
        <div className="ev-inner-md">
          <Reveal>
            <span className="ev-eyebrow">Deployment Evidence</span>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,58px)", fontWeight: 700, color: "#1E1E1E", lineHeight: 1.08, letterSpacing: -1, marginBottom: 20 }}>
              What has been built,<br />tested, and filed.
            </h1>
            <p style={{ fontSize: 17, color: "#555", lineHeight: 1.78, maxWidth: 600, marginBottom: 36 }}>
              This page documents the prototype and pre-pilot state of the Mykei Securities ADN system as of April 2026. It is provided for assessors, endorsers, and institutional partners evaluating technical progress; the system has not yet entered a live retail deployment.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" as const }}>
              {[
                { label: "Pilot Status", value: "Letters of interest signed, not yet active" },
                { label: "Retail Partners", value: "Pilot conversations open" },
                { label: "Patent", value: "No. 2606630.8 (UK)" },
                { label: "Company", value: "No. 16984969 E&W" },
              ].map(({ label, value }) => (
                <div key={label} style={{ borderLeft: "2px solid #D4AF37", paddingLeft: 14 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#8a6a1a", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1E1E1E" }}>{value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILOT OVERVIEW */}
      <section className="ev-section" style={{ background: "#FFFFFF" }}>
        <div className="ev-inner">
          <Reveal>
            <span className="ev-eyebrow">01 · Pilot Overview</span>
            <h2 className="ev-h2">Independent Retail Pilot</h2>
            <p className="ev-body" style={{ marginBottom: 40 }}>
              The Independent Retail Pilot is Mykei's planned validation route for ADN in independent retail environments across Greater Manchester. Five retail partners have signed non-binding letters of interest. No units have been installed. Installation criteria, marker selection, and site suitability are still being defined before any deployment.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Reveal>
              <div className="ev-card">
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#8a6a1a", marginBottom: 16 }}>Pilot Parameters</div>
                {[
                  ["Geography", "Greater Manchester, UK"],
                  ["Phase", "Independent retail validation"],
                  ["Partners", "5 independent retailers"],
                  ["Timeline", "2026 pilot recruitment"],
                  ["Data", "No registry event records yet, pilot not started"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F8F8F8", fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>
                    <span style={{ color: "#8a6a1a" }}>{k}</span>
                    <span style={{ color: "#1E1E1E", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="ev-card">
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#8a6a1a", marginBottom: 16 }}>What Each Partner Receives</div>
                {[
                  "Installation is designed to take under 1 hour once a pilot begins; no units are installed yet",
                  "Controlled marker workflow subject to site review",
                  "Access to Mykei Registry",
                  "Registry event record access",
                  "Direct founder contact for pilot support",
                  "Zero obligation to continue post-pilot",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: "1px solid #F8F8F8" }}>
                    <span style={{ color: "#D4AF37", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT PHOTOS */}
      <section className="ev-section" style={{ background: "#fff" }}>
        <div className="ev-inner">
          <Reveal>
            <span className="ev-eyebrow">02 · Device in Situ</span>
            <h2 className="ev-h2">ADN Installation</h2>
            <p className="ev-body" style={{ marginBottom: 32 }}>
              Photographs of ADN in a retail environment will be published after pilot installation and site approval. Retailer identity is withheld under pilot confidentiality agreement.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Reveal>
              <div>
                <img
                  src="/assets/adn1-prototype-render.png"
                  alt="ADN V2.1 prototype render based on current enclosure design"
                  style={{ width: "100%", borderRadius: 8, border: "1px solid #E8E8E8", display: "block" }}
                />
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a6a1a", marginBottom: 4 }}>ADN V2.2 prototype render</div>
                  <div style={{ fontSize: 12, color: "#6E6E6E", lineHeight: 1.55, fontStyle: "italic" }}>Based on current enclosure design (April 2026). Pre-production visualisation.</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <img
                  src="/assets/adn1-price-rail-diagram.svg"
                  alt="ADN price rail deployment architecture, bilateral ToF detection zone, front elevation"
                  style={{ width: "100%", borderRadius: 8, border: "1px solid #E8E8E8", display: "block" }}
                />
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase" as const, color: "#8a6a1a", marginBottom: 4 }}>Price rail deployment, front elevation</div>
                  <div style={{ fontSize: 12, color: "#6E6E6E", lineHeight: 1.55, fontStyle: "italic" }}>ADN mounts on the gondola price rail. Dual ToF sensors at each end create a detection zone spanning the full shelf face.</div>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div style={{ marginTop: 24, padding: "16px 20px", background: "#F8F8F8", border: "1px solid #E8E8E8", borderRadius: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#8a6a1a" }}>
                V2 enclosure dimensions: 150 × 40 × 32mm. PETG construction. Shelf-hook flange and keyhole wall mounts. IP42 rated. Manufactured by 3dworkshop.brogio, Bedford. Order reference NFTVNJ.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EVENT LOGS */}
      <section className="ev-section" style={{ background: "#FFFFFF" }}>
        <div className="ev-inner">
          <Reveal>
            <span className="ev-eyebrow">03 · Event Logs</span>
            <h2 className="ev-h2">Sanitised Forensic Event Records</h2>
            <p className="ev-body" style={{ marginBottom: 32 }}>
              The following are representative sanitised records from bench and lab testing of the ADN prototype. No retail deployment has occurred; retailer identities referenced elsewhere on this page relate to signed letters of interest only.
            </p>
          </Reveal>
          <Reveal>
            <div className="ev-card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="ev-log-row ev-log-header">
                <span>Event ID</span>
                <span>Node · Zone · Vector</span>
                <span style={{ textAlign: "right" }}>Status</span>
              </div>
              {EVENT_LOGS.map((log) => (
                <div className="ev-log-row" key={log.id}>
                  <div>
                    <div className="ev-log-id">{log.id}</div>
                    <div style={{ color: "#8a6a1a", fontSize: 9, marginTop: 2 }}>{log.ts}</div>
                  </div>
                  <div className="ev-log-data">
                    {log.node} · {log.zone}<br />
                    <span style={{ color: "#8a6a1a" }}>{log.vector} · {log.compound}</span>
                  </div>
                  <div className="ev-log-status">{log.status}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ marginTop: 32 }}>
              <SimEventLog />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ marginTop: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#6E6E6E", letterSpacing: 0.5 }}>
              All records encrypted at rest (AES-256-GCM) and in transit (TLS 1.3). Registry: AWS IoT Core. Log integrity verified via cryptographic signature.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE */}
      <section className="ev-section" style={{ background: "#fff" }}>
        <div className="ev-inner">
          <Reveal>
            <span className="ev-eyebrow">04 · System Architecture</span>
            <h2 className="ev-h2">Four-layer forensic infrastructure</h2>
            <p className="ev-body">Each layer is independently functional, independently verifiable, and purpose-built for retail deployment without specialist installation.</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ marginTop: 32, marginBottom: 40 }}>
              <ADN1FlowDiagram />
            </div>
          </Reveal>
          <div className="ev-arch-grid">
            {ARCH_LAYERS.map(({ layer, title, items }) => (
              <Reveal key={layer}>
                <div className="ev-arch-card">
                  <div className="ev-arch-layer">{layer}</div>
                  <div className="ev-arch-title">{title}</div>
                  <ul className="ev-arch-list">
                    {items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PATENT */}
      <section className="ev-section" style={{ background: "#FFFFFF" }}>
        <div className="ev-inner-md">
          <Reveal>
            <span className="ev-eyebrow">05 · Patent Filing</span>
            <h2 className="ev-h2">Patent-pending: UK Application No. 2606630.8</h2>
            <p className="ev-body" style={{ marginBottom: 32 }}>
              The ADN system is protected by a UK patent with 17 claims covering the detection methodology, forensic deployment mechanism, and registry integration. Filed via the UK Intellectual Property Office.
            </p>
          </Reveal>
          <div className="ev-patent-grid">
            {[
              { label: "Patent Number", value: "UK 2606630.8" },
              { label: "Filing Status", value: "Filed, UK IPO" },
              { label: "Claims", value: "17 independent claims" },
              { label: "Subject Matter", value: "Detection, marking, registry integration" },
              { label: "Jurisdiction", value: "United Kingdom" },
              { label: "Applicant", value: "Michael Esema / Mykei Securities Ltd" },
            ].map(({ label, value }) => (
              <Reveal key={label}>
                <div className="ev-patent-item">
                  <div className="ev-patent-label">{label}</div>
                  <div className="ev-patent-value">{value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER STATEMENT */}
      <section className="ev-section" style={{ background: "#fff" }}>
        <div className="ev-inner-md">
          <Reveal>
            <span className="ev-eyebrow">06 · Founder Statement</span>
            <h2 className="ev-h2">What has been built and tested</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="ev-statement" style={{ marginTop: 32 }}>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#2D1204", marginBottom: 20 }}>
                The ADN prototype is a working bench device. The V2 enclosure, manufactured to correct dimensions at 150 x 40 x 32mm, is currently in production. The firmware is operational in dual-mode: Wi-Fi and BLE, tested on the bench, not yet in a live retail deployment.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#2D1204", marginBottom: 20 }}>
                The Mykei Registry design logs events, encrypted and timestamped, and is in development, not yet live. The detection cycle, from sweep to compound deployment, completes in under 200 milliseconds in bench testing.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#2D1204", marginBottom: 28 }}>
                Five independent retailers in Greater Manchester have reviewed the system and signed non-binding letters of interest. No installation date is confirmed. This is a prototype seeking validation before it can seek to scale.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 20, borderTop: "1px solid #E8E8E8" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1E1E1E" }}>Michael Esema</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1, color: "#8a6a1a", marginTop: 2 }}>Founder, Mykei Securities Ltd · Manchester, 2026</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#F8F8F8", padding: "72px 52px", borderTop: "2px solid #D4AF37" }}>
        <div className="ev-inner-md" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 700, color: "#1E1E1E", marginBottom: 14 }}>
              Ready to evaluate the system?
            </h2>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, marginBottom: 32 }}>
              Independent Retail Pilot places are limited. Request a pilot evaluation or view the full system specification.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
              <a href="/pilot" style={{ background: "#D4AF37", color: "#1E1E1E", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" as const, padding: "14px 28px", borderRadius: 6 }}>
                Request Pilot Evaluation
              </a>
              <a href="/adn" style={{ background: "transparent", color: "#2D1204", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase" as const, padding: "14px 28px", borderRadius: 6, border: "1px solid #E8E8E8" }}>
                ADN Technical Spec
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
