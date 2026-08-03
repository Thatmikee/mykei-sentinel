import { Helmet } from "react-helmet-async";

const PROOF_POINTS = [
  { label: "UK Patent Filed", value: "No. 2606630.8" },
  { label: "Company Registered", value: "England & Wales" },
  { label: "Independent Retail Pilot", value: "Now open" },
  { label: "Device", value: "ADN Prototype Built" },
];

const WHY_NOW = [
  "UK retail theft reached £2.2 billion in 2023. A 26-year high with no structural solution.",
  "Police enforce a de facto £200 threshold; organised retail crime operates below it deliberately.",
  "CCTV captures footage. It does not stop resale. The economic loop remains intact.",
  "Forensic marking technology is proven in asset recovery. It has never been productised for retail shelf defence.",
  "Marketplace platforms face growing legal pressure to verify item provenance, creating a demand-side pull for registry infrastructure.",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Detection",
    body: "The ADN sensor array detects sweep-speed hand movements consistent with organised shelf theft. Not slow browsing. Not accidental contact. Organised extraction.",
  },
  {
    step: "02",
    title: "Forensic Marking",
    body: "On trigger, the device deploys a controlled batch-identifiable marker onto nearby items. Each cartridge batch is unique to the deployment event and recorded in the Mykei Registry with a tamper-aware audit trail.",
  },
  {
    step: "03",
    title: "Registry & Consequence",
    body: "Cartridge-linked event records are entered into the Mykei Registry. Batch references are submitted for verification workflows, making theft-linked goods harder to sell without a traceable record and disrupting the resale incentive.",
  },
];

const BUSINESS_MODEL = [
  { label: "Installation", value: "Under 1 hour, no retrofit required" },
  { label: "Staffing", value: "Zero additional staff needed" },
  { label: "Monitoring", value: "No active monitoring required" },
  { label: "Revenue model", value: "Subscription per device (recurring)" },
  { label: "Target stores", value: "Independent retailers, convenience, pharmacy chains" },
  { label: "Pilot structure", value: "Non-binding LOIs signed, Manchester, pilot open" },
];

export default function OverviewPage() {
  return (
    <>
      <Helmet>
        <title>Assessor Overview, Mykei Securities Ltd</title>
        <meta
          name="description"
          content="A 60-second overview of Mykei Securities: what the ADN system does, why now, and the evidence behind it."
        />
      </Helmet>

      <style>{`
        .ov-page {
          background: #FFFFFF;
          min-height: 100vh;
          font-family: 'Sora', sans-serif;
          color: #1E1E1E;
        }

        /* NAV */
        .ov-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #FFFFFF;
          border-bottom: 1px solid #E8E8E8;
          padding: 0 52px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ov-nav-brand {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1E1E1E;
          text-decoration: none;
        }
        .ov-nav-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8a7a5a;
        }

        /* HERO */
        .ov-hero {
          background: #FFFFFF;
          border-bottom: 1px solid #E8E8E8;
          padding: 64px 52px 56px;
          max-width: 900px;
          margin: 0 auto;
        }
        .ov-hero-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a7a5a;
          margin-bottom: 16px;
        }
        .ov-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          line-height: 1.2;
          color: #1E1E1E;
          margin: 0 0 20px;
        }
        .ov-hero p {
          font-size: 17px;
          line-height: 1.7;
          color: #444;
          max-width: 700px;
          margin: 0 0 32px;
        }

        /* PROOF BAR */
        .ov-proof {
          background: #F8F8F8;
          border-top: 2px solid #D4AF37;
          border-bottom: 1px solid #E8E8E8;
          padding: 0 52px;
          display: flex;
          gap: 0;
          overflow-x: auto;
        }
        .ov-proof-item {
          padding: 18px 36px 18px 0;
          min-width: 180px;
        }
        .ov-proof-item-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8a7a5a;
          margin-bottom: 4px;
        }
        .ov-proof-item-value {
          font-size: 14px;
          font-weight: 600;
          color: #1E1E1E;
        }

        /* SECTIONS */
        .ov-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 64px 52px;
          border-bottom: 1px solid #E8E8E8;
        }
        .ov-section:last-of-type {
          border-bottom: none;
        }
        .ov-section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #D4AF37;
          margin-bottom: 12px;
        }
        .ov-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 700;
          color: #1E1E1E;
          margin: 0 0 28px;
        }

        /* WHY NOW */
        .ov-why-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ov-why-list li {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          padding-left: 24px;
          position: relative;
        }
        .ov-why-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #D4AF37;
          font-weight: 600;
        }

        /* HOW IT WORKS */
        .ov-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ov-step {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0 24px;
          padding: 28px 0;
          border-bottom: 1px solid #E8E8E8;
        }
        .ov-step:last-child {
          border-bottom: none;
        }
        .ov-step-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 28px;
          font-weight: 700;
          color: #D4AF37;
          padding-top: 2px;
        }
        .ov-step-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #1E1E1E;
          margin: 0 0 8px;
        }
        .ov-step-body {
          font-size: 15px;
          line-height: 1.65;
          color: #444;
          margin: 0;
        }

        /* BUSINESS MODEL */
        .ov-model-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }
        .ov-model-card {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 8px;
          padding: 20px 22px;
        }
        .ov-model-card-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8a7a5a;
          margin-bottom: 6px;
        }
        .ov-model-card-value {
          font-size: 15px;
          font-weight: 600;
          color: #1E1E1E;
          line-height: 1.4;
        }

        /* FOUNDER */
        .ov-founder {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 8px;
          padding: 32px 36px;
        }
        .ov-founder p {
          font-size: 16px;
          line-height: 1.7;
          color: #333;
          margin: 0 0 16px;
        }
        .ov-founder p:last-child { margin: 0; }
        .ov-founder-credit {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #E8E8E8;
          font-size: 13px;
          color: #8a7a5a;
        }

        /* CTA */
        .ov-cta {
          background: #FFFFFF;
          border-top: 2px solid #D4AF37;
          border-bottom: 1px solid #E8E8E8;
          padding: 48px 52px;
          text-align: center;
        }
        .ov-cta h2 {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #1E1E1E;
          margin: 0 0 12px;
        }
        .ov-cta p {
          font-size: 15px;
          color: #666;
          margin: 0 0 28px;
        }
        .ov-cta-links {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ov-btn-primary {
          display: inline-block;
          background: #D4AF37;
          color: #1E1E1E;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }
        .ov-btn-primary:hover { background: #c9a030; }
        .ov-btn-secondary {
          display: inline-block;
          background: transparent;
          color: #1E1E1E;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 8px;
          border: 1px solid #E8E8E8;
          text-decoration: none;
          cursor: pointer;
        }
        .ov-btn-secondary:hover { border-color: #D4AF37; }

        /* FOOTER NOTE */
        .ov-footnote {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px 52px;
          font-size: 12px;
          color: #aaa;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .ov-nav { padding: 0 20px; }
          .ov-hero { padding: 48px 20px 40px; }
          .ov-proof { padding: 0 20px; }
          .ov-section { padding: 48px 20px; }
          .ov-cta { padding: 40px 20px; }
          .ov-footnote { padding: 20px; }
          .ov-step { grid-template-columns: 56px 1fr; }
        }
      `}</style>

      <div className="ov-page">
        {/* NAV */}
        <nav className="ov-nav">
          <a href="/" className="ov-nav-brand">Mykei Securities Ltd</a>
          <span className="ov-nav-label">Assessor Overview</span>
        </nav>

        {/* HERO */}
        <div style={{ background: "#FFFFFF" }}>
          <div className="ov-hero">
            <p className="ov-hero-label">Assessor Overview, 60 Seconds</p>
            <h1>Forensic Infrastructure for UK Retail Theft</h1>
            <p>
              Mykei Securities is a UK-based forensic infrastructure company. The ADN device
              detects defined theft events, triggers controlled marker deployment, and records
              cartridge-linked activations in the Mykei Registry. No cameras. No confrontation. Non-confrontational by design.
            </p>
          </div>
        </div>

        {/* PROOF BAR */}
        <div className="ov-proof">
          {PROOF_POINTS.map((p) => (
            <div className="ov-proof-item" key={p.label}>
              <div className="ov-proof-item-label">{p.label}</div>
              <div className="ov-proof-item-value">{p.value}</div>
            </div>
          ))}
        </div>

        {/* WHY NOW */}
        <section className="ov-section">
          <p className="ov-section-label">Why Now</p>
          <h2>Five Converging Pressures</h2>
          <ul className="ov-why-list">
            {WHY_NOW.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* HOW IT WORKS */}
        <section className="ov-section" style={{ background: "#FFFFFF" }}>
          <p className="ov-section-label">How It Works</p>
          <h2>Three-Stage System</h2>
          <div className="ov-steps">
            {HOW_IT_WORKS.map((s) => (
              <div className="ov-step" key={s.step}>
                <div className="ov-step-num">{s.step}</div>
                <div>
                  <p className="ov-step-title">{s.title}</p>
                  <p className="ov-step-body">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BUSINESS MODEL */}
        <section className="ov-section">
          <p className="ov-section-label">Business Model</p>
          <h2>Subscription Infrastructure, Not a Product Sale</h2>
          <div className="ov-model-grid">
            {BUSINESS_MODEL.map((item) => (
              <div className="ov-model-card" key={item.label}>
                <div className="ov-model-card-label">{item.label}</div>
                <div className="ov-model-card-value">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FOUNDER */}
        <section className="ov-section" style={{ background: "#FFFFFF" }}>
          <p className="ov-section-label">Founder</p>
          <h2>Michael Esema, Founder & Systems Architect</h2>
          <div className="ov-founder">
            <p>
              Michael Esema identified the gap between forensic capability and retail deployment
              in 2024, after observing that existing solutions captured evidence without removing
              the economic incentive. DNA marking technology existed. Registry infrastructure
              existed. No one had connected them into a deployable, subscription-based retail system.
            </p>
            <p>
              The ADN prototype was designed, modelled, and tested under constraint, without
              institutional funding, without a lab environment, and without a team. The UK patent
              application (No. 2606630.8) was filed in March 2026. The Independent Retail Pilot is
              now open, with non-binding letters of intent signed by independent retailers in Greater Manchester.
            </p>
            <p>
              The question being answered now is not whether the technology works. It is whether
              the deployment infrastructure can scale to serve the 70,000+ independent retailers
              in the UK who currently have no forensic protection at the shelf level.
            </p>
            <div className="ov-founder-credit">
              Michael Esema · Founder, Mykei Securities Ltd ·{" "}
              <a href="/founder" style={{ color: "#8a7a5a", textDecoration: "underline" }}>
                Full founder statement →
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="ov-cta">
          <h2>Request Pilot Evaluation</h2>
          <p>For assessors, partners, and institutional contacts who want to go deeper.</p>
          <div className="ov-cta-links">
            <a href="/evidence" className="ov-btn-primary">Full Evidence Package</a>
            <a href="/contact" className="ov-btn-secondary">Request Pilot Evaluation</a>
            <a href="/adn" className="ov-btn-secondary">ADN Technical Spec</a>
          </div>
        </div>

        {/* FOOTNOTE */}
        <div className="ov-footnote">
          This page presents factual information about Mykei Securities Ltd, kept current as of the last update to this page.
          Pilot deployment figures are forward-looking based on confirmed partner discussions.
          Patent pending. Company registered in England &amp; Wales.
        </div>
      </div>
    </>
  );
}
