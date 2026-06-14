import { useEffect, useState } from "react";

function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const billions = useCounter(42, 2000, visible);
  const retailers = useCounter(6000, 2400, visible);
  const seconds = useCounter(3, 1600, visible);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .mk-hero {
          font-family: 'Outfit', sans-serif;
          background: #ffffff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #e8ecf4;
        }

        .mk-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 52px;
          height: 68px;
          border-bottom: 1px solid #edf0f7;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .mk-nav-brand {
          display: flex;
          flex-direction: column;
          gap: 1px;
          text-decoration: none;
        }

        .mk-nav-brand-name {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #0D1B4B;
          line-height: 1;
        }

        .mk-nav-brand-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #E8820C;
          line-height: 1;
        }

        .mk-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mk-nav-links a {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #4a5568;
          text-decoration: none;
          letter-spacing: 0.2px;
          transition: color 0.15s ease;
        }

        .mk-nav-links a:hover { color: #0D1B4B; }

        .mk-nav-cta {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
          color: #ffffff;
          background: #0D1B4B;
          text-decoration: none;
          padding: 9px 22px;
          border-radius: 4px;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .mk-nav-cta:hover {
          background: #E8820C;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(232,130,12,0.25);
        }

        .mk-trust {
          background: #0D1B4B;
          padding: 0 52px;
          height: 36px;
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .mk-trust-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .mk-trust-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #E8820C;
          flex-shrink: 0;
        }

        .mk-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 400px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 52px;
          width: 100%;
          align-items: center;
        }

        .mk-left {
          padding: 72px 64px 72px 0;
          border-right: 1px solid #edf0f7;
        }

        .mk-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff8f0;
          border: 1px solid #fde4c0;
          border-radius: 100px;
          padding: 5px 14px 5px 10px;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
        }
        .mk-tag.vis { opacity: 1; transform: translateY(0); }

        .mk-tag-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #E8820C;
          animation: blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .mk-tag-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: #E8820C;
          letter-spacing: 0.5px;
        }

        .mk-h1 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(36px, 4.2vw, 56px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1.2px;
          color: #0D1B4B;
          margin: 0 0 8px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        .mk-h1.vis { opacity: 1; transform: translateY(0); }

        .mk-h1-orange { color: #E8820C; }

        .mk-h1-rule {
          display: block;
          width: 48px;
          height: 3px;
          background: #E8820C;
          border-radius: 2px;
          margin: 20px 0 24px;
        }

        .mk-body {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.75;
          color: #4a5568;
          max-width: 460px;
          margin: 0 0 36px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
        }
        .mk-body.vis { opacity: 1; transform: translateY(0); }

        .mk-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
        }
        .mk-actions.vis { opacity: 1; transform: translateY(0); }

        .mk-btn-primary {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          background: #0D1B4B;
          text-decoration: none;
          padding: 13px 28px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s ease;
          letter-spacing: 0.2px;
        }
        .mk-btn-primary:hover {
          background: #E8820C;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(232,130,12,0.25);
        }

        .mk-btn-secondary {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #0D1B4B;
          background: transparent;
          border: 1.5px solid #d1d9ec;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 4px;
          transition: all 0.15s ease;
        }
        .mk-btn-secondary:hover {
          border-color: #0D1B4B;
          background: #f8f9fc;
        }

        .mk-proof {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 24px;
          opacity: 0;
          transition: opacity 0.7s ease 0.65s;
          flex-wrap: wrap;
        }
        .mk-proof.vis { opacity: 1; }

        .mk-proof-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.5px;
          color: #718096;
        }

        .mk-proof-check {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #f0faf4;
          border: 1px solid #b2dfc4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: #2d8a5e;
          flex-shrink: 0;
        }

        .mk-right {
          padding: 40px 0 40px 48px;
          opacity: 0;
          transform: translateX(12px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
        }
        .mk-right.vis { opacity: 1; transform: translateX(0); }

        .mk-panel {
          border: 1px solid #e2e8f3;
          border-radius: 8px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 32px rgba(13,27,75,0.06), 0 1px 4px rgba(13,27,75,0.04);
        }

        .mk-panel-head {
          background: #0D1B4B;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mk-panel-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        .mk-panel-live {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 1px;
          color: #E8820C;
        }

        .mk-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #E8820C;
          animation: blink 1.4s ease-in-out infinite;
        }

        .mk-panel-body { padding: 4px 0; }

        .mk-event {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 20px;
          border-bottom: 1px solid #f0f4fb;
        }
        .mk-event:last-child { border-bottom: none; }

        .mk-event-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }
        .mk-event-icon.orange { background: #fff4e8; }
        .mk-event-icon.navy   { background: #eef1fb; }
        .mk-event-icon.green  { background: #f0faf4; }
        .mk-event-icon.red    { background: #fff0f0; }

        .mk-event-content { flex: 1; min-width: 0; }

        .mk-event-title {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #1a2a5e;
        }

        .mk-event-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #a0aec0;
          letter-spacing: 0.3px;
          margin-top: 2px;
        }

        .mk-event-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.8px;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 100px;
          flex-shrink: 0;
        }
        .mk-event-badge.orange { background: #fff4e8; color: #E8820C; }
        .mk-event-badge.navy   { background: #eef1fb; color: #0D1B4B; }
        .mk-event-badge.green  { background: #f0faf4; color: #2d8a5e; }
        .mk-event-badge.red    { background: #fff0f0; color: #c53030; }

        .mk-panel-foot {
          background: #f8f9fc;
          border-top: 1px solid #edf0f7;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mk-panel-foot-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 1px;
          color: #a0aec0;
          text-transform: uppercase;
        }

        .mk-panel-foot-status {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #2d8a5e;
          font-weight: 500;
        }

        .mk-stats {
          border-top: 1px solid #edf0f7;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: #f8f9fc;
          opacity: 0;
          transition: opacity 0.8s ease 0.85s;
        }
        .mk-stats.vis { opacity: 1; }

        .mk-stat {
          padding: 28px 52px;
          border-right: 1px solid #edf0f7;
        }
        .mk-stat:last-child { border-right: none; }

        .mk-stat-num {
          font-family: 'Outfit', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #0D1B4B;
          letter-spacing: -0.8px;
          line-height: 1;
        }
        .mk-stat-num span { color: #E8820C; }

        .mk-stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #718096;
          margin-top: 6px;
        }

        @media (max-width: 1024px) {
          .mk-main { grid-template-columns: 1fr; padding: 0 32px; }
          .mk-left { padding: 56px 0; border-right: none; border-bottom: 1px solid #edf0f7; }
          .mk-right { padding: 40px 0; }
          .mk-nav { padding: 0 32px; }
          .mk-trust { padding: 0 32px; }
          .mk-stat { padding: 24px 32px; }
        }

        @media (max-width: 768px) {
          .mk-nav-links { display: none; }
          .mk-stats { grid-template-columns: 1fr 1fr; }
          .mk-stat:nth-child(3) { border-top: 1px solid #edf0f7; grid-column: 1 / -1; border-right: none; }
          .mk-trust { gap: 12px; flex-wrap: wrap; height: auto; padding: 10px 24px; }
          .mk-h1 { font-size: 34px; }
        }
      `}</style>

      <div className="mk-hero">

        {/* Navbar */}
        <nav className="mk-nav">
          <a href="/" className="mk-nav-brand">
            <span className="mk-nav-brand-name">MYKEI SECURITIES LTD</span>
            <span className="mk-nav-brand-sub">Forensic Infrastructure</span>
          </a>
          <ul className="mk-nav-links">
            <li><a href="#technology">ADN System</a></li>
            <li><a href="#mission">Market Case</a></li>
            <li><a href="#specs">Technology</a></li>
            <li><a href="/roadmap">Roadmap</a></li>
          </ul>
          <a href="/signal" className="mk-nav-cta">Follow the Research →</a>
        </nav>

        {/* Trust bar */}
        <div className="mk-trust">
          {["Company No. 16984969", "Registered in England & Wales", "Manchester, UK", "5 Retailers: Letters of Intent Signed", "Patent-pending: UK application No. 2606630.8"].map((item, i) => (
            <div className="mk-trust-item" key={i}>
              {i > 0 && <div className="mk-trust-dot" />}
              {item}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="mk-main">
          <div className="mk-left">
            <div className={`mk-tag ${visible ? "vis" : ""}`}>
              <div className="mk-tag-dot" />
              <span className="mk-tag-text">Active Forensic Defence · Manchester, UK</span>
            </div>

            <h1 className={`mk-h1 ${visible ? "vis" : ""}`}>
              Theft pays when<br />
              stolen goods stay <span className="mk-h1-orange">anonymous.</span><br />
              Mykei changes that.
              <span className="mk-h1-rule" />
            </h1>

            <p className={`mk-body ${visible ? "vis" : ""}`}>
              The ADN doesn't try to stop the thief. It triggers controlled marker deployment, registers a cartridge-linked event, and is designed to make those goods harder to sell anonymously the moment they leave the shelf.
              Batch-identifiable marker. Secure registry. The resale incentive is disrupted.{" "}
              <strong style={{ color: "#0D1B4B", fontWeight: 600 }}>Economic Sterilisation.</strong>
            </p>

            <div className={`mk-actions ${visible ? "vis" : ""}`}>
              <a href="#specs" className="mk-btn-primary">See the Technology →</a>
              <a href="/signal" className="mk-btn-secondary">Follow the Research</a>
            </div>

            <div className={`mk-proof ${visible ? "vis" : ""}`}>
              {["No cameras", "No confrontation", "UK registered", "Patent filed"].map((p, i) => (
                <div className="mk-proof-item" key={i}>
                  <div className="mk-proof-check">✓</div>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className={`mk-right ${visible ? "vis" : ""}`}>
            <div className="mk-panel">
              <div className="mk-panel-head">
                <span className="mk-panel-title">Mykei Registry</span>
                <div className="mk-panel-live"><div className="mk-live-dot" />Live</div>
              </div>
              <div className="mk-panel-body">
                {[
                  { icon: "⚡", iconType: "orange", title: "Sweep detected", sub: "Shelf 3 · Dual sensor · 0.3s", badge: "Triggered", badgeType: "orange" },
                  { icon: "🧬", iconType: "navy",   title: "Marker deployed", sub: "6 items tagged · MYK-20260304", badge: "Marked", badgeType: "navy" },
                  { icon: "☁️", iconType: "green",  title: "Registry updated", sub: "Secure cloud registry · Encrypted", badge: "Logged", badgeType: "green" },
                  { icon: "🔒", iconType: "red",    title: "Evidence logged", sub: "Registry · Batch reference · Timestamp", badge: "Logged", badgeType: "navy" },
                ].map((e, i) => (
                  <div className="mk-event" key={i}>
                    <div className={`mk-event-icon ${e.iconType}`}>{e.icon}</div>
                    <div className="mk-event-content">
                      <div className="mk-event-title">{e.title}</div>
                      <div className="mk-event-sub">{e.sub}</div>
                    </div>
                    <div className={`mk-event-badge ${e.badgeType}`}>{e.badge}</div>
                  </div>
                ))}
              </div>
              <div className="mk-panel-foot">
                <span className="mk-panel-foot-text">Event MYK-20260304-003</span>
                <span className="mk-panel-foot-status">● Registry active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`mk-stats ${visible ? "vis" : ""}`}>
          <div className="mk-stat">
            <div className="mk-stat-num">£{(billions / 10).toFixed(1)}<span>B</span></div>
            <div className="mk-stat-label">UK retail crime annually</div>
          </div>
          <div className="mk-stat">
            <div className="mk-stat-num">{retailers.toLocaleString()}<span>+</span></div>
            <div className="mk-stat-label">Independent retailers targeted</div>
          </div>
          <div className="mk-stat">
            <div className="mk-stat-num">{seconds}<span>s</span></div>
            <div className="mk-stat-label">DNA deployment on trigger</div>
          </div>
        </div>

      </div>
    </>
  );
};

export default HeroSection;
