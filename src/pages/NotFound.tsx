import { useEffect, useState } from "react";

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Sora', sans-serif; background: #0a1628; color: #fff; }
        a { text-decoration: none; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes scan {
          0%   { transform: translateY(-100%); opacity: 0.4; }
          100% { transform: translateY(1000%); opacity: 0; }
        }

        .nf-wrap {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 40px 24px;
          position: relative; overflow: hidden;
          background: #0a1628;
          background-image: radial-gradient(rgba(216,0,31,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .nf-wrap::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(10,22,40,0.7) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Scanline effect */
        .nf-scanline {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(216,0,31,0.15), transparent);
          animation: scan 4s linear infinite;
          pointer-events: none;
        }

        .nf-inner {
          position: relative; z-index: 2; text-align: center; max-width: 520px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .nf-inner.vis { opacity: 1; transform: translateY(0); }

        .nf-terminal-label {
          font-family: 'JetBrains Mono', monospace; font-size: 9.5px;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.2); margin-bottom: 32px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .nf-dot { width: 6px; height: 6px; border-radius: 50%; background: #D8001F; animation: blink 1.5s ease-in-out infinite; }

        .nf-code {
          font-size: clamp(72px, 14vw, 120px); font-weight: 800;
          color: #D8001F; letter-spacing: -4px; line-height: 1;
          margin-bottom: 8px;
          text-shadow: 0 0 60px rgba(216,0,31,0.2);
        }

        .nf-headline {
          font-size: clamp(18px, 3vw, 24px); font-weight: 700;
          color: #fff; letter-spacing: -0.5px; margin-bottom: 16px;
        }

        .nf-body {
          font-family: 'JetBrains Mono', monospace; font-size: 12px;
          color: rgba(255,255,255,0.35); line-height: 1.8;
          letter-spacing: 0.3px; margin-bottom: 40px;
        }

        .nf-actions { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }

        .nf-btn-primary {
          font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 600;
          color: #0a1628; background: #D8001F; padding: 12px 28px; border-radius: 6px;
          transition: all 0.2s;
        }
        .nf-btn-primary:hover { background: #D8001F; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(216,0,31,0.3); }

        .nf-btn-secondary {
          font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.12);
          padding: 12px 28px; border-radius: 6px; transition: all 0.2s;
        }
        .nf-btn-secondary:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

        .nf-brand {
          position: absolute; top: 24px; left: 52px;
          font-family: 'JetBrains Mono', monospace;
        }
        .nf-brand-name { font-size: 11px; font-weight: 500; letter-spacing: 1px; color: rgba(255,255,255,0.4); }
        .nf-brand-sub  { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: #D8001F; margin-top: 2px; }

        @media (max-width: 480px) {
          .nf-brand { left: 24px; }
        }
      `}</style>

      <div className="nf-wrap">
        <div className="nf-scanline" />

        <a href="/" className="nf-brand">
          <div className="nf-brand-name">MYKEI SECURITIES LTD</div>
          <div className="nf-brand-sub">Forensic Infrastructure</div>
        </a>

        <div className={`nf-inner ${visible ? "vis" : ""}`}>
          <div className="nf-terminal-label">
            <div className="nf-dot" />
            ADN SYSTEM · PAGE NOT FOUND
            <div className="nf-dot" />
          </div>

          <div className="nf-code">404</div>
          <h1 className="nf-headline">This page has been sterilised.</h1>

          <p className="nf-body">
            No route found at this address.<br />
            It may have moved, been removed, or never existed.<br />
            The Mykei Registry has been notified.
          </p>

          <div className="nf-actions">
            <a href="/" className="nf-btn-primary">← Return to Home</a>
            <a href="/roadmap" className="nf-btn-secondary">View Roadmap</a>
          </div>
        </div>
      </div>
    </>
  );
}
