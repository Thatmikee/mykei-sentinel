import PageSEO from "@/components/PageSEO";

const STEPS = [
  {
    number: "01",
    title: "The shelf event is detected",
    text: "The ADN watches the shelf zone for a defined theft pattern. It is looking for rapid movement across a group of products, not a face, a body, or a customer profile.",
    detail: "Input: shelf movement pattern",
  },
  {
    number: "02",
    title: "The device decides locally",
    text: "The device checks whether the movement looks like normal browsing or a bulk sweep. That decision happens at the shelf, so the system does not need a camera feed to decide what happened.",
    detail: "Output: trigger or ignore",
  },
  {
    number: "03",
    title: "A controlled marker is deployed",
    text: "If the trigger condition is met, the ADN deploys a controlled marker through the front outlet. Marker selection is subject to supplier specification, SDS review, COSHH review, and store suitability.",
    detail: "Output: marker deployment",
  },
  {
    number: "04",
    title: "The Mykei Registry creates the record",
    text: "The activation creates a cartridge linked event record. The record can include the device, store, shelf zone, timestamp, cartridge session, and marker batch reference.",
    detail: "Output: timestamped event record",
  },
  {
    number: "05",
    title: "Verification becomes possible",
    text: "If goods are later recovered, the marker and registry record can support verification workflows. The point is not to chase the thief. The point is to make stolen stock harder to move without a traceable story attached to it.",
    detail: "Output: verification workflow",
  },
];

const RECORD_FIELDS = [
  ["Device", "Which ADN unit fired"],
  ["Store", "Which retail site it belongs to"],
  ["Shelf", "Which product zone was protected"],
  ["Cartridge", "Which cartridge session was active"],
  ["Batch", "Which marker batch reference applies"],
  ["Time", "When the event happened"],
  ["Note", "What staff or reviewers add later"],
  ["Audit", "What changed after the event"],
];

const BOUNDARIES = [
  "No facial recognition",
  "No suspect database",
  "No customer profiling",
  "No live marketplace takedown claim",
  "No public authority endorsement claim",
  "No promised theft reduction claim",
];

const FAQS = [
  {
    question: "What is the simple idea behind Mykei?",
    answer: "Most retail security records theft after it happens. Mykei creates a theft related inventory event: marker deployed, cartridge session logged, registry record created. That record is what changes the resale problem.",
  },
  {
    question: "Does the ADN identify people?",
    answer: "No. The ADN is designed around shelf events, not suspect identity. It does not use facial recognition, biometric identification, or a suspect database.",
  },
  {
    question: "What does the marker prove?",
    answer: "The marker helps show that a marked item is connected to a deployment event. The exact performance depends on the marker supplier, specification, safety documents, and store environment.",
  },
  {
    question: "What does the registry prove?",
    answer: "The registry shows where, when, and under which cartridge session the marker was deployed. It connects the physical marker to a structured event record.",
  },
  {
    question: "Does Mykei remove listings from resale sites?",
    answer: "No. Mykei creates registry linked event records that may support future secondary market verification workflows, subject to agreements and compliance review.",
  },
  {
    question: "What should a retailer do next?",
    answer: "If repeat theft is hitting a specific shelf or category, get in touch. Mykei can review the store type, product category, staff risk, and deployment suitability before any installation is discussed.",
  },
];

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "How the ADN works",
        description: "A plain language explanation of the ADN, controlled marker deployment, and Mykei Registry event records.",
        about: ["Retail theft prevention", "Forensic retail defence", "Mykei Registry", "Controlled marker deployment"],
        author: { "@type": "Person", name: "Michael Esema" },
        publisher: { "@type": "Organization", name: "Mykei Securities Ltd", url: "https://mykei.io" },
        mainEntityOfPage: "https://mykei.io/howitworks",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function HowItWorksPage() {
  return (
    <>
      <PageSEO
        title="How the ADN Works | Mykei Securities"
        description="A plain explanation of the ADN: shelf event detection, controlled marker deployment, cartridge linked records, and the Mykei Registry."
        canonical="https://mykei.io/howitworks"
        keywords="how the ADN works, Mykei Registry, retail theft prevention, forensic retail defence, controlled marker deployment, shelf level retail security, shoplifting prevention, organised retail crime, retail loss prevention, no camera retail security"
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "How It Works", url: "https://mykei.io/howitworks" },
        ]}
        ogImage="https://mykei.io/social-share.png"
        ogImageAlt="Mykei ADN system explanation"
      />
      <JsonLd />
      <style>{`
        .hiw-page {
          min-height: 100vh;
          background: #ffffff;
          color: #1e1e1e;
          font-family: 'Sora', system-ui, sans-serif;
        }
        .hiw-page * { box-sizing: border-box; }
        .hiw-section { padding: 88px clamp(24px, 6vw, 72px); }
        .hiw-section.tight { padding-top: 64px; padding-bottom: 64px; }
        .hiw-band { background: #f8f8f6; border-top: 1px solid #e8e4dc; border-bottom: 1px solid #e8e4dc; }
        .hiw-inner { max-width: 1120px; margin: 0 auto; }
        .hiw-narrow { max-width: 760px; }
        .hiw-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #765c14;
          margin-bottom: 18px;
        }
        .hiw-hero {
          padding-top: 120px;
          min-height: 76svh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hiw-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(45,18,4,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(45,18,4,0.025) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }
        .hiw-hero .hiw-inner { position: relative; z-index: 1; }
        .hiw-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #e8e4dc;
          border-radius: 6px;
          padding: 7px 14px;
          background: #ffffff;
          margin-bottom: 34px;
        }
        .hiw-dot { width: 6px; height: 6px; border-radius: 50%; background: #d4af37; }
        .hiw-badge span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.13em;
          color: #4a2008;
        }
        .hiw-h1 {
          max-width: 900px;
          margin: 0 0 26px;
          color: #2d1204;
          font-size: clamp(42px, 7vw, 82px);
          line-height: 1.02;
          letter-spacing: -0.045em;
          font-weight: 800;
        }
        .hiw-h1 span { color: #765c14; }
        .hiw-lead {
          max-width: 680px;
          color: #475569;
          font-size: clamp(17px, 1.45vw, 20px);
          line-height: 1.75;
          margin: 0 0 34px;
        }
        .hiw-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .hiw-btn {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          padding: 13px 24px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
        }
        .hiw-btn.primary { background: #4a2008; color: #ffffff; }
        .hiw-btn.secondary { background: #ffffff; color: #2d1204; border: 1px solid #d9dee8; }
        .hiw-h2 {
          margin: 0 0 18px;
          max-width: 760px;
          color: #1e1e1e;
          font-size: clamp(30px, 4.2vw, 54px);
          line-height: 1.08;
          letter-spacing: -0.035em;
          font-weight: 800;
        }
        .hiw-h2 span { color: #765c14; }
        .hiw-copy {
          max-width: 680px;
          color: #4b5563;
          font-size: 16px;
          line-height: 1.78;
          margin: 0;
        }
        .hiw-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; }
        .hiw-card {
          border: 1px solid #e8e4dc;
          border-radius: 8px;
          background: #ffffff;
          padding: clamp(24px, 3vw, 34px);
        }
        .hiw-card.dark { background: #0a0b0a; border-color: #0a0b0a; color: #f5f5f0; }
        .hiw-card-title { margin: 0 0 12px; font-size: 18px; font-weight: 800; color: inherit; }
        .hiw-card-text { margin: 0; color: #4b5563; line-height: 1.72; font-size: 15px; }
        .hiw-card.dark .hiw-eyebrow { color: #d4af37; }
        .hiw-card.dark .hiw-card-text { color: rgba(245,245,240,0.86); }
        .hiw-loop { display: grid; gap: 16px; margin-top: 42px; }
        .hiw-step {
          display: grid;
          grid-template-columns: 74px 1fr minmax(180px, 260px);
          gap: 24px;
          align-items: start;
          border: 1px solid #e8e4dc;
          border-radius: 8px;
          padding: 24px;
          background: #ffffff;
        }
        .hiw-step-number {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(118,92,20,0.35);
          color: #765c14;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 11px;
        }
        .hiw-step h3 { margin: 0 0 8px; color: #1e1e1e; font-size: 20px; line-height: 1.25; }
        .hiw-step p { margin: 0; color: #4b5563; line-height: 1.72; font-size: 15px; }
        .hiw-step-detail {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.55;
          color: #765c14;
          background: #f8f8f6;
          border: 1px solid #e8e4dc;
          border-radius: 6px;
          padding: 12px;
        }
        .hiw-record-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 36px; }
        .hiw-record {
          border: 1px solid #e8e4dc;
          border-radius: 8px;
          padding: 18px;
          background: #ffffff;
        }
        .hiw-record strong {
          display: block;
          color: #2d1204;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .hiw-record span { color: #4b5563; font-size: 14px; line-height: 1.5; }
        .hiw-boundaries { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 34px; }
        .hiw-boundary {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          border: 1px solid #e8e4dc;
          background: #ffffff;
          border-radius: 8px;
          padding: 16px;
          color: #2d1204;
          font-size: 14px;
          font-weight: 600;
        }
        .hiw-boundary span {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid rgba(118,92,20,0.35);
          flex: 0 0 auto;
          color: #765c14;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
        }
        .hiw-mini-flow {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-top: 34px;
        }
        .hiw-mini-flow div {
          background: #f8f8f6;
          border: 1px solid #e8e4dc;
          border-radius: 8px;
          padding: 16px;
          min-height: 96px;
        }
        .hiw-mini-flow strong {
          display: block;
          color: #765c14;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .hiw-mini-flow span { color: #2d1204; font-weight: 700; font-size: 14px; line-height: 1.35; }
        .hiw-faq { display: grid; gap: 14px; margin-top: 36px; }
        .hiw-faq details {
          border: 1px solid #e8e4dc;
          border-radius: 8px;
          background: #ffffff;
          padding: 18px 20px;
        }
        .hiw-faq summary {
          cursor: pointer;
          color: #1e1e1e;
          font-weight: 700;
          font-size: 15px;
        }
        .hiw-faq p { margin: 14px 0 0; color: #4b5563; line-height: 1.72; font-size: 14px; }
        .hiw-cta {
          background: #0a0b0a;
          color: #f5f5f0;
          border-radius: 10px;
          padding: clamp(32px, 5vw, 56px);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 28px;
          align-items: center;
        }
        .hiw-cta h2 { color: #ffffff; margin: 0 0 12px; font-size: clamp(28px, 4vw, 46px); line-height: 1.08; letter-spacing: -0.035em; }
        .hiw-cta p { color: rgba(245,245,240,0.86); margin: 0; line-height: 1.7; max-width: 620px; }
        .hiw-cta-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .hiw-cta .hiw-btn.primary { background: #d4af37; color: #1e1e1e; }
        .hiw-cta .hiw-btn.secondary { background: transparent; color: #ffffff; border-color: rgba(255,255,255,0.28); }
        @media (max-width: 900px) {
          .hiw-hero { min-height: auto; padding-top: 104px; }
          .hiw-grid-2, .hiw-cta { grid-template-columns: 1fr; }
          .hiw-step { grid-template-columns: 1fr; gap: 14px; }
          .hiw-record-grid { grid-template-columns: repeat(2, 1fr); }
          .hiw-boundaries { grid-template-columns: 1fr 1fr; }
          .hiw-mini-flow { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .hiw-section { padding: 64px 24px; }
          .hiw-hero { padding-top: 92px; }
          .hiw-h1 { font-size: clamp(36px, 10vw, 48px); letter-spacing: -0.04em; }
          .hiw-lead { font-size: 16px; }
          .hiw-actions, .hiw-cta-actions { width: 100%; }
          .hiw-btn { width: 100%; }
          .hiw-record-grid, .hiw-boundaries { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="hiw-page">
        <section className="hiw-section hiw-hero">
          <div className="hiw-inner">
            <div className="hiw-badge"><span>Mykei Securities Ltd</span><i className="hiw-dot" /><span>How the ADN works</span></div>
            <h1 className="hiw-h1">Theft is one event. <span>Resale is the system.</span></h1>
            <p className="hiw-lead">The ADN is designed for the moment a shelf loss becomes more than missing stock. It is intended to detect a defined theft pattern, deploy a controlled marker, and create a Mykei Registry record that can support verification later.</p>
            <div className="hiw-actions">
              <a className="hiw-btn primary" href="/signal">Follow the Research</a>
              <a className="hiw-btn secondary" href="/adn-1">View ADN details</a>
            </div>
          </div>
        </section>

        <section className="hiw-section tight hiw-band">
          <div className="hiw-inner hiw-grid-2">
            <div>
              <div className="hiw-eyebrow">The concept</div>
              <h2 className="hiw-h2">Old security asks: who took it? <span>Mykei asks: what happens to the goods next?</span></h2>
            </div>
            <p className="hiw-copy">CCTV records a theft. A guard may confront it. A tag may slow it down. But the resale path often stays open. Mykei changes the event itself by linking the stolen stock to a marker and a registry record. That is the heart of Economic Sterilisation.</p>
          </div>
        </section>

        <section className="hiw-section">
          <div className="hiw-inner">
            <div className="hiw-eyebrow">The ADN loop</div>
            <h2 className="hiw-h2">Five things happen. Each one has a job.</h2>
            <p className="hiw-copy">A first time visitor should understand the loop in a few seconds. The ADN is designed as a shelf level event system. It is intended to turn a defined theft pattern into a physical marker and a structured record.</p>
            <div className="hiw-loop">
              {STEPS.map((step) => (
                <article className="hiw-step" key={step.number}>
                  <div className="hiw-step-number">{step.number}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <div className="hiw-step-detail">{step.detail}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hiw-section hiw-band">
          <div className="hiw-inner hiw-grid-2">
            <article className="hiw-card">
              <div className="hiw-eyebrow">Marker</div>
              <h2 className="hiw-h2">The marker says: this item was touched by a deployment event.</h2>
              <p className="hiw-card-text">The marker is the physical link. It is intended to be selected for the research environment and subject to supplier specification, SDS review, COSHH review, and deployment suitability. The claim must match the supplier documents.</p>
            </article>
            <article className="hiw-card dark">
              <div className="hiw-eyebrow">Registry</div>
              <h2 className="hiw-h2" style={{ color: "#fff" }}>The registry says: where, when, and under which cartridge session.</h2>
              <p className="hiw-card-text">The Mykei Registry is the digital record. It connects the marker deployment to a device, store, shelf zone, timestamp, cartridge session, and marker batch reference. The marker is physical. The registry gives it context.</p>
            </article>
          </div>
        </section>

        <section className="hiw-section">
          <div className="hiw-inner">
            <div className="hiw-eyebrow">What the registry can hold</div>
            <h2 className="hiw-h2">A theft event becomes structured data.</h2>
            <p className="hiw-copy">This is why Mykei is infrastructure, not just hardware. The device matters, but the event record is what turns shelf loss into something that can be checked, reviewed, and explained.</p>
            <div className="hiw-record-grid">
              {RECORD_FIELDS.map(([name, text]) => (
                <div className="hiw-record" key={name}>
                  <strong>{name}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hiw-section hiw-band">
          <div className="hiw-inner">
            <div className="hiw-eyebrow">What Mykei does not do</div>
            <h2 className="hiw-h2">The system records retail events, not people.</h2>
            <p className="hiw-copy">This boundary is part of the product. Mykei is designed to avoid the surveillance path that many retailers and customers already distrust.</p>
            <div className="hiw-boundaries">
              {BOUNDARIES.map((item) => (
                <div className="hiw-boundary" key={item}><span>✓</span>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="hiw-section">
          <div className="hiw-inner">
            <div className="hiw-eyebrow">The public explanation</div>
            <h2 className="hiw-h2">From shelf loss to resale doubt.</h2>
            <p className="hiw-copy">A thief wants stock that can move cleanly. Mykei creates a record that makes the story harder. What shelf did it come from? Which store? Which cartridge session? Which marker batch? That is the point.</p>
            <div className="hiw-mini-flow">
              <div><strong>Start</strong><span>Goods are swept from a protected shelf</span></div>
              <div><strong>Detect</strong><span>The ADN is designed to recognise the defined shelf event</span></div>
              <div><strong>Mark</strong><span>A controlled marker is deployed</span></div>
              <div><strong>Record</strong><span>The Mykei Registry creates the event record</span></div>
              <div><strong>Verify</strong><span>Recovered goods can be checked against the record</span></div>
            </div>
          </div>
        </section>

        <section className="hiw-section hiw-band">
          <div className="hiw-inner">
            <div className="hiw-eyebrow">Common questions</div>
            <h2 className="hiw-h2">Questions a serious buyer will ask.</h2>
            <div className="hiw-faq">
              {FAQS.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="hiw-section">
          <div className="hiw-inner">
            <div className="hiw-cta">
              <div>
                <h2>Does your store have a shelf that keeps getting hit?</h2>
                <p>The research continues. Mykei reviews store type, product category, theft pattern, staff risk, and deployment suitability before any installation is discussed.</p>
              </div>
              <div className="hiw-cta-actions">
                <a className="hiw-btn primary" href="/signal">Follow the Research</a>
                <a className="hiw-btn secondary" href="/enterprise">Strategic review</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
