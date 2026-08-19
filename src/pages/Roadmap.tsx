import { useState, useEffect } from "react";

const PHASES = [
  {
    quarter: "Q1 2026",
    title: "Foundation",
    status: "done",
    milestones: [
      { text: "Company incorporated, No. 16984969", done: true },
      { text: "Founder and co-director funding used for initial setup", done: true },
      { text: "Encrypted Logic Core prototype on breadboard", done: true },
      { text: "Dual Tactical Multi-zone Sensor Array I²C address resolution confirmed", done: true },
      { text: "Bulk-sweep kinetic detection algorithm written", done: true },
      { text: "Patent application filed, No. 2606630.8 (UK) (17 claims)", done: true },
      { text: "Technical Data Sheet published", done: true },
      { text: "mykei.io website launched with full tech documentation", done: true },
      { text: "Pilot fit conversations open with independent retailers", done: true },
      { text: "Business plan finalised, March 2026", done: true },
      { text: "Investor pitch deck published, v2", done: true },
      { text: "Innovation grant application submitted", done: true },
      { text: "Pilot fit conversations open with prospective retailers", done: false },
    ],
  },
  {
    quarter: "Q2 2026",
    title: "Integration",
    status: "delayed",
    milestones: [
      { text: "Marker supplier confirmed and SDS/COSHH review complete", done: false },
      { text: "Batch-identifiable marker integrated and field-tested", done: false },
      { text: "Production enclosure (3D printed)", done: false },
      { text: "Mykei Registry design finalised, cartridge-linked event records logging designed", done: false },
      { text: "End-to-end system demo (detection → marker deployment → registry event)", done: false },
      { text: "5 pilot sites hardware-live in Greater Manchester", done: false },
      { text: "First real theft event recorded on registry", done: false },
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Evidence",
    status: "active",
    milestones: [
      { text: "First cartridge-linked event record submitted to support police investigation", done: false },
      { text: "First insurance claim supported by marker deployment event record", done: false },
      { text: "Retailer management dashboard live", done: false },
      { text: "10+ active pilot sites", done: false },
      { text: "BIRA partnership introduction", done: false },
      { text: "Press coverage secured", done: false },
      { text: "Seed funding round opened", done: false },
    ],
  },
  {
    quarter: "Q4 2026",
    title: "Registry",
    status: "planned",
    milestones: [
      { text: "Secondary market monitoring integrations (pathway under evaluation)", done: false },
      { text: "25+ active sites across Greater Manchester", done: false },
      { text: "Jewellery vertical launched", done: false },
      { text: "Law enforcement portal, beta access", done: false },
      { text: "Northern England expansion plan signed off", done: false },
      { text: "Seed round closed", done: false },
    ],
  },
  {
    quarter: "2027",
    title: "National",
    status: "planned",
    milestones: [
      { text: "100+ registry partners across the UK", done: false },
      { text: "Law enforcement read access, national rollout", done: false },
      { text: "Enterprise loss prevention partnerships", done: false },
      { text: "First prosecution using ADN registry evidence", done: false },
      { text: "Series A funding round", done: false },
      { text: "International market assessment, ROI, US", done: false },
    ],
  },
];

const STATUS_CONFIG = {
  active:  { label: "IN PROGRESS", bg: "rgba(201,168,76,0.12)", border: "rgba(201,168,76,0.4)", color: "#c9a84c", dot: "#c9a84c" },
  next:    { label: "UP NEXT",     bg: "rgba(15,31,61,0.08)",   border: "rgba(15,31,61,0.2)",   color: "#0f1f3d", dot: "#0f1f3d" },
  planned: { label: "PLANNED",     bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.25)", color: "#94a3b8", dot: "#94a3b8" },
  done:    { label: "DONE",        bg: "rgba(34,197,94,0.10)",   border: "rgba(34,197,94,0.3)",   color: "#16a34a", dot: "#16a34a" },
  delayed: { label: "BEHIND SCHEDULE", bg: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.25)", color: "#b91c1c", dot: "#b91c1c" },
};

export default function Roadmap() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalDone  = PHASES.flatMap(p => p.milestones).filter(m => m.done).length;
  const totalAll   = PHASES.flatMap(p => p.milestones).length;
  const pct        = Math.round((totalDone / totalAll) * 100);

  const navLinks = [
    ["Home",         "/"],
    ["How It Works", "/howitworks"],
    ["Pilot",        "/pilot"],
    ["Roadmap",      "/roadmap"],
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #f8f9fc; color: #0f1f3d; }
        a { text-decoration: none; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        /* NAV */
        .rm-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 52px; height: 64px; transition: all 0.3s ease;
        }
        .rm-nav.scrolled {
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(221,228,239,0.7);
          box-shadow: 0 2px 20px rgba(15,31,61,0.05);
        }
        .rm-nav-brand { display: flex; flex-direction: column; gap: 2px; }
        .rm-nav-brand-name { font-size: 13px; font-weight: 700; letter-spacing: 0.5px; color: #0f1f3d; line-height: 1; }
        .rm-nav-brand-sub  { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase; color: #c9a84c; }
        .rm-nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
        .rm-nav-links a { font-size: 13px; font-weight: 500; color: #475569; padding: 6px 14px; border-radius: 6px; transition: all 0.15s; }
        .rm-nav-links a:hover, .rm-nav-links a.active { color: #0f1f3d; background: rgba(15,31,61,0.04); }
        .rm-nav-cta { font-size: 13px; font-weight: 600; color: #fff; background: #4A2008; padding: 8px 20px; border-radius: 6px; transition: all 0.2s; }
        .rm-nav-cta:hover { background: #c9a84c; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(201,168,76,0.3); }
        .rm-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        .rm-hamburger span { display: block; width: 22px; height: 2px; background: #0f1f3d; border-radius: 2px; }
        .rm-mobile-menu { background: #fff; border-bottom: 1px solid #e2e8f3; padding: 16px 24px; display: flex; flex-direction: column; gap: 4px; }
        .rm-mobile-link { font-size: 15px; font-weight: 500; color: #0f1f3d; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .rm-mobile-cta { font-size: 14px; font-weight: 700; color: #fff; background: #4A2008; padding: 12px; border-radius: 6px; text-align: center; margin-top: 8px; }

        /* HERO HEADER */
        .rm-header {
          background: #FFFFFF;
          background-image: radial-gradient(rgba(201,168,76,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          padding: 120px 52px 64px;
          position: relative; overflow: hidden;
        }
        .rm-header::before {
          content: ''; position: absolute; inset: 0;
          background: transparent;
          pointer-events: none;
        }
        .rm-header-inner {
          max-width: 1100px; margin: 0 auto;
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: end;
          animation: fadeUp 0.7s ease both;
        }
        .rm-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 2.5px; text-transform: uppercase; color: #D4AF37; margin-bottom: 14px; }
        .rm-h1 { font-size: clamp(28px, 4vw, 48px); font-weight: 800; color: #1E1E1E; letter-spacing: -1px; line-height: 1.1; margin-bottom: 12px; }
        .rm-subline { font-size: 15px; color: #6E6E6E; max-width: 480px; line-height: 1.7; font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: 0.3px; }

        /* Progress widget */
        .rm-progress-widget {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 12px; padding: 24px 28px;
          min-width: 200px; text-align: center;
        }
        .rm-progress-pct { font-size: 42px; font-weight: 800; color: #c9a84c; letter-spacing: -2px; line-height: 1; }
        .rm-progress-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-top: 6px; }
        .rm-progress-bar-bg { background: rgba(255,255,255,0.06); border-radius: 100px; height: 4px; margin-top: 14px; overflow: hidden; }
        .rm-progress-bar-fill { background: linear-gradient(90deg, #c9a84c, #f0d080); border-radius: 100px; height: 4px; transition: width 1.2s ease; }
        .rm-progress-counts { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.2); margin-top: 8px; }

        /* FLOW DIAGRAM */
        .rm-flow-wrapper { background: #fff; border-bottom: 1px solid #e2e8f3; padding: 40px 52px; overflow-x: auto; }
        .rm-flow { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 0; }
        .rm-flow-node {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          cursor: pointer; flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .rm-flow-node:hover { transform: translateY(-2px); }
        .rm-flow-pill {
          padding: 9px 20px; border-radius: 100px; border: 1.5px solid;
          font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500;
          letter-spacing: 0.5px; transition: all 0.2s; white-space: nowrap;
        }
        .rm-flow-quarter { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1px; text-transform: uppercase; color: #94a3b8; }
        .rm-flow-connector {
          flex: 1; display: flex; align-items: center; position: relative;
          min-width: 32px; margin: 0 2px; padding-bottom: 28px;
        }
        .rm-flow-line { height: 1.5px; flex: 1; background: #e2e8f3; }
        .rm-flow-arrow { width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 7px solid #e2e8f3; flex-shrink: 0; }
        .rm-flow-arrow.gold { border-left-color: #c9a84c; }
        .rm-flow-line.gold { background: linear-gradient(90deg, #c9a84c, #e8d080); }

        /* CARDS GRID */
        .rm-cards-section { padding: 48px 52px 80px; }
        .rm-cards-inner { max-width: 1100px; margin: 0 auto; }
        .rm-cards-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }

        .rm-card {
          border: 1px solid #e2e8f3; border-radius: 10px; background: #fff;
          overflow: hidden; transition: all 0.25s ease; cursor: pointer;
        }
        .rm-card.rm-card-selected {
          border-color: #c9a84c;
          box-shadow: 0 8px 32px rgba(201,168,76,0.12), 0 0 0 1px rgba(201,168,76,0.15);
        }
        .rm-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(15,31,61,0.08); }
        .rm-card-head { padding: 16px; border-bottom: 1px solid #f1f5f9; }
        .rm-card-quarter { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
        .rm-card-title { font-size: 14px; font-weight: 700; color: #0f1f3d; margin-bottom: 10px; }
        .rm-card-badge { display: inline-flex; align-items: center; gap: 5px; font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 0.8px; text-transform: uppercase; padding: 3px 9px; border-radius: 100px; border: 1px solid; }
        .rm-card-dot { width: 5px; height: 5px; border-radius: 50%; animation: blink 2s ease-in-out infinite; }
        .rm-card-body { padding: 14px 16px; }
        .rm-card-counter { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 12px; }
        .rm-milestone { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 9px; }
        .rm-milestone:last-child { margin-bottom: 0; }
        .rm-ms-dot { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center; font-size: 8px; }
        .rm-ms-dot.done { background: #f0faf4; border: 1px solid #86efac; color: #16a34a; }
        .rm-ms-dot.todo { background: #f8f9fc; border: 1px solid #e2e8f3; }
        .rm-ms-text { font-size: 11px; color: #475569; line-height: 1.4; }
        .rm-ms-text.done { color: #94a3b8; text-decoration: line-through; text-decoration-color: #cbd5e1; }

        /* FOOTER */
        .rm-footer { padding: 24px 52px; background: #fff; border-top: 1px solid #e2e8f3; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .rm-footer-name { font-size: 12px; font-weight: 700; letter-spacing: 0.5px; color: #0f1f3d; }
        .rm-footer-meta { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #94a3b8; letter-spacing: 0.5px; margin-top: 2px; }
        .rm-footer-note { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #cbd5e1; letter-spacing: 0.3px; }

        @media (max-width: 1024px) {
          .rm-cards-grid { grid-template-columns: repeat(3, 1fr); }
          .rm-header-inner { grid-template-columns: 1fr; }
          .rm-progress-widget { min-width: unset; text-align: left; display: flex; align-items: center; gap: 20px; }
        }
        @media (max-width: 768px) {
          .rm-nav { padding: 0 20px; }
          .rm-nav-links, .rm-nav-cta { display: none; }
          .rm-hamburger { display: flex; }
          .rm-header { padding: 100px 24px 48px; }
          .rm-flow-wrapper { padding: 28px 24px; }
          .rm-cards-section { padding: 32px 24px 60px; }
          .rm-cards-grid { grid-template-columns: 1fr 1fr; }
          .rm-footer { padding: 20px 24px; }
        }
        @media (max-width: 480px) {
          .rm-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`rm-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="/" className="rm-nav-brand">
          <span className="rm-nav-brand-name">MYKEI SECURITIES LTD</span>
          <span className="rm-nav-brand-sub">Forensic Infrastructure</span>
        </a>
        <ul className="rm-nav-links">
          {navLinks.map(([label, href]) => (
            <li key={label}>
              <a href={href} className={href === "/roadmap" ? "active" : ""}>{label}</a>
            </li>
          ))}
          <li><a href="https://michaelesema.com" target="_blank" rel="noreferrer">Founder</a></li>
        </ul>
        <a href="/pilot" className="rm-nav-cta">Join the Pilot →</a>
        <button className="rm-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="rm-mobile-menu" style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 199 }}>
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className="rm-mobile-link" onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href="https://michaelesema.com" target="_blank" rel="noreferrer" className="rm-mobile-link" onClick={() => setMenuOpen(false)}>Founder</a>
          <a href="/pilot" className="rm-mobile-cta" onClick={() => setMenuOpen(false)}>Join the Pilot →</a>
        </div>
      )}

      {/* HEADER */}
      <div className="rm-header">
        <div className="rm-header-inner">
          <div>
            <div className="rm-eyebrow">Product Roadmap · Mykei Securities Ltd</div>
            <h1 className="rm-h1">Q1 complete.<br />ADN deploying Q2.</h1>
            <p className="rm-subline">
              Patent filed. Independent retailers in Greater Manchester have signed non-binding letters of intent. Website live. Investor pitch out.<br />
              Now we put ADN on the shelf.
            </p>
          </div>
          <div className="rm-progress-widget">
            <div className="rm-progress-pct">{pct}%</div>
            <div className="rm-progress-label">Overall complete</div>
            <div className="rm-progress-bar-bg">
              <div className="rm-progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="rm-progress-counts">{totalDone} of {totalAll} milestones</div>
          </div>
        </div>
      </div>

      {/* FLOW DIAGRAM */}
      <div className="rm-flow-wrapper">
        <div className="rm-flow">
          {PHASES.map((phase, i) => {
            const cfg = STATUS_CONFIG[phase.status as keyof typeof STATUS_CONFIG];
            const isSelected = selected === i;
            const isActive = phase.status === "active";
            return (
              <>
                <div
                  key={phase.quarter}
                  className="rm-flow-node"
                  onClick={() => setSelected(i === selected ? null : i)}
                >
                  <div
                    className="rm-flow-pill"
                    style={{
                      background: isSelected ? cfg.color : (isActive ? "rgba(201,168,76,0.08)" : "#f8f9fc"),
                      borderColor: isSelected ? cfg.color : cfg.border,
                      color: isSelected ? "#fff" : cfg.color,
                      fontWeight: isActive || isSelected ? 600 : 400,
                      boxShadow: isSelected ? `0 4px 16px ${cfg.color}30` : "none",
                    }}
                  >
                    {phase.quarter} · {phase.title}
                  </div>
                  <div className="rm-flow-quarter">{cfg.label}</div>
                </div>
                {i < PHASES.length - 1 && (
                  <div className="rm-flow-connector" key={`conn-${i}`}>
                    <div className={`rm-flow-line ${i === 0 ? "gold" : ""}`} />
                    <div className={`rm-flow-arrow ${i === 0 ? "gold" : ""}`} />
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>

      {/* MILESTONE CARDS */}
      <div className="rm-cards-section">
        <div className="rm-cards-inner">
          <div className="rm-cards-grid">
            {PHASES.map((phase, i) => {
              const cfg = STATUS_CONFIG[phase.status as keyof typeof STATUS_CONFIG];
              const done = phase.milestones.filter(m => m.done).length;
              const isSelected = selected === i;
              return (
                <div
                  key={phase.quarter}
                  className={`rm-card ${isSelected ? "rm-card-selected" : ""}`}
                  onClick={() => setSelected(i === selected ? null : i)}
                >
                  <div className="rm-card-head">
                    <div className="rm-card-quarter">{phase.quarter}</div>
                    <div className="rm-card-title">{phase.title}</div>
                    <div
                      className="rm-card-badge"
                      style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
                    >
                      <div
                        className="rm-card-dot"
                        style={{
                          background: cfg.dot,
                          animation: phase.status === "active" ? "blink 2s ease-in-out infinite" : "none",
                        }}
                      />
                      {cfg.label}
                    </div>
                  </div>
                  <div className="rm-card-body">
                    <div className="rm-card-counter">{done}/{phase.milestones.length} complete</div>
                    {phase.milestones.map((m, j) => (
                      <div className="rm-milestone" key={j}>
                        <div className={`rm-ms-dot ${m.done ? "done" : "todo"}`}>
                          {m.done ? "✓" : ""}
                        </div>
                        <span className={`rm-ms-text ${m.done ? "done" : ""}`}>{m.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="rm-footer">
        <div>
          <div className="rm-footer-name">MYKEI SECURITIES LTD</div>
          <div className="rm-footer-meta">Co. No: 16984969 · Registered in England & Wales · Manchester · Patent-pending: UK application No. 2606630.8</div>
        </div>
        <div className="rm-footer-note">Roadmap indicative, subject to change · protocol@mykei.io</div>
      </footer>
    </>
  );
}
