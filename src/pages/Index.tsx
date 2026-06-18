import { useState, useEffect, useRef } from "react";
import PageSEO from "@/components/PageSEO";

/* ── SILVER PARTICLES (continuous data-drift, communicates active system) ── */
function SilverParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 14 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.6,
      o: Math.random() * 0.16 + 0.06,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,165,195,${p.o})`;
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(id); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", willChange: "transform" }} />;
}

/* ── SCROLL REVEAL ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── ANIMATED COUNTER ── */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t: number | null = null;
    const step = (ts: number) => {
      if (!t) t = ts;
      const p = Math.min((ts - t) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── FIGHTS WORD: fires once on scroll entry, impact-shake + red flash ── */
function FightsWord() {
  const { ref, visible } = useReveal(0.3);
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={visible ? "mk-fights mk-fights--go" : "mk-fights"}
    >
      fights
    </span>
  );
}

/* ── REVEAL WRAPPER ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [vote, setVote] = useState<"yes"|"no"|null>(() => localStorage.getItem("mykei_vote") as "yes"|"no"|null);
  const [voteCounts, setVoteCounts] = useState<{yes:number,no:number}>(() => {
    try { return JSON.parse(localStorage.getItem("mykei_vote_counts") || "null") || {yes:0,no:0}; } catch { return {yes:0,no:0}; }
  });

  const castVote = (v: "yes"|"no") => {
    if (vote) return;
    const next = { ...voteCounts, [v]: voteCounts[v] + 1 };
    localStorage.setItem("mykei_vote", v);
    localStorage.setItem("mykei_vote_counts", JSON.stringify(next));
    setVote(v); setVoteCounts(next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinks = [
    ["ADN", "/adn"],
    ["How It Works", "/howitworks"],
    ["Economic Sterilisation", "/economic-sterilisation"],
    ["Signal", "/signal"],
  ];

  return (
    <>
      <PageSEO
        title="Mykei Securities | Anti-Resale Crime and Asset Integrity"
        description="Mykei Securities helps shops make stolen goods harder to sell. Security hardware that marks stock, creates a record, and makes resale the risky part. Manchester, UK."
        canonical="https://mykei.io"
        ogImageAlt="Mykei Securities anti-resale crime and asset integrity system"
        keywords="Mykei Securities, Michael Esema, Economic Sterilisation, anti-resale crime, asset integrity, Market Reduction Approach, Mike Sutton, stolen goods markets, resale confidence reduction, Mykei Protocol, Mykei Registry, ADN R&D, construction theft, solar theft, tool theft"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://mykei.io/#org",
              "name": "Mykei Securities Ltd",
              "url": "https://mykei.io",
              "logo": "https://mykei.io/mykei-logo.png",
              "foundingDate": "2026",
              "founder": {
                "@type": "Person",
                "@id": "https://michaelesema.com/#person",
                "name": "Michael Esema",
                "givenName": "Michael",
                "familyName": "Esema",
                "url": "https://michaelesema.com",
                "jobTitle": "Founder & CEO",
                "worksFor": { "@id": "https://mykei.io/#org" },
                "sameAs": [
                  "https://michaelesema.com",
                  "https://www.linkedin.com/in/michaelesema",
                  "https://mykei.io"
                ],
                "description": "Michael Esema is the founder of Mykei Securities Ltd and proposer of Economic Sterilisation as a modern operational extension of Market Reduction theory. UK patent application No. 2606630.8.",
                "knowsAbout": ["Economic Sterilisation", "Market Reduction Approach", "anti-resale crime", "asset integrity", "asset marking", "evidence workflows", "organised retail crime", "ADN R&D"]
              },
              "description": "Mykei Securities Ltd is an anti-resale crime and asset-integrity company. It links asset marking, registry records, evidence workflows and resale-confidence reduction.",
              "address": { "@type": "PostalAddress", "addressLocality": "Manchester", "addressCountry": "GB" },
              "knowsAbout": ["Economic Sterilisation", "Market Reduction Approach", "Mike Sutton", "Anti-resale crime", "Asset integrity", "Stolen goods markets", "Resale confidence reduction", "Asset marking", "Evidence workflows", "Mykei Registry", "Mykei Protocol", "Construction theft", "Solar theft", "Tool theft", "Retail theft economics", "ADN R&D"],
              "sameAs": ["https://mykei.io"]
            },
            {
              "@type": "WebSite",
              "@id": "https://mykei.io/#website",
              "url": "https://mykei.io",
              "name": "Mykei Securities",
              "description": "Anti-resale crime and asset-integrity systems for marking, registry records, evidence workflows and resale-confidence reduction.",
              "publisher": { "@id": "https://mykei.io/#org" },
              "inLanguage": "en-GB"
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://mykei.io/#localbusiness",
              "name": "Mykei Securities Ltd",
              "description": "Anti-resale crime and asset-integrity company developing Economic Sterilisation, the Mykei Protocol, registry records and ADN R&D.",
              "url": "https://mykei.io",
              "email": "protocol@mykei.io",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Manchester",
                "addressRegion": "Greater Manchester",
                "addressCountry": "GB"
              },
              "geo": { "@type": "GeoCoordinates", "latitude": "53.4808", "longitude": "-2.2426" },
              "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
              "sameAs": ["https://mykei.io", "https://www.linkedin.com/company/mykei-securities"],
              "priceRange": "££"
            }
          ]
        })}
      />
      <div className="mk-silver-bg" aria-hidden="true" />
      <div className="mk-grain" aria-hidden="true" />
      <SilverParticles />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', system-ui, sans-serif; background: transparent; color: #1A1A1A; }

        /* ── GLOBAL SILVER LAYER (fixed, behind everything) ── */
        .mk-silver-bg {
          position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden;
          background: linear-gradient(145deg,
            #ffffff   0%,
            #fafafd  11%,
            #f0f0f8  24%,
            #e8e8f4  38%,
            #ededf6  52%,
            #f2f2f9  67%,
            #fafafd  82%,
            #ffffff 100%
          );
        }
        /* depth blob — slow organic light mass drifting — transform-only = GPU composited, no paint */
        .mk-silver-bg::before {
          content: '';
          position: absolute; inset: -20%;
          background: radial-gradient(ellipse 60% 50% at 30% 60%, rgba(200,200,220,0.22) 0%, transparent 70%);
          animation: silver-depth 14s linear infinite;
          will-change: transform;
        }
        /* primary chrome sheen — transform-only = GPU composited, no paint */
        .mk-silver-bg::after {
          content: '';
          position: absolute;
          top: -100%; left: -80%;
          width: 35%; height: 300%;
          background: linear-gradient(
            90deg,
            transparent             0%,
            rgba(255,255,255,0)    33%,
            rgba(210,218,255,0.45) 44%,
            rgba(255,255,255,0.92) 50%,
            rgba(210,218,255,0.45) 56%,
            rgba(255,255,255,0)    67%,
            transparent           100%
          );
          animation: silver-sweep 6s ease-in-out infinite;
          animation-delay: 0.8s;
          will-change: transform, opacity;
        }
        /* grain overlay — breaks flat-gradient flatness, makes silver feel metallic */
        .mk-grain {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.038;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C%2Fsvg%3E");
          background-size: 180px 180px;
        }
        a { text-decoration: none; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* "fights" — impact shake + red flash, fires once on entry */
        @keyframes mk-fights-impact {
          0%   { transform: translateX(0) skewX(0deg);  color: inherit; }
          7%   { transform: translateX(-4px) skewX(-4deg); color: #DC2626; }
          15%  { transform: translateX(4px)  skewX(3deg);  color: #DC2626; }
          23%  { transform: translateX(-3px) skewX(-2deg); }
          31%  { transform: translateX(3px)  skewX(2deg);  color: #DC2626; }
          42%  { transform: translateX(-1px); color: #DC2626; }
          55%  { transform: translateX(0); color: #1E1E1E; }
          100% { transform: translateX(0) skewX(0deg);  color: #1E1E1E; }
        }
        .mk-fights { display: inline; }
        @media (prefers-reduced-motion: no-preference) {
          .mk-fights--go {
            animation: mk-fights-impact 0.7s cubic-bezier(0.16,1,0.3,1) both;
            animation-delay: 0.45s;
          }
        }

        @keyframes silver-depth {
          0%   { transform: scale(1) translate(0%, 0%); }
          33%  { transform: scale(1.14) translate(6%, -4%); }
          66%  { transform: scale(0.93) translate(-5%, 8%); }
          100% { transform: scale(1) translate(0%, 0%); }
        }
        @keyframes silver-sweep {
          0%   { transform: translateX(-10%) rotate(12deg); opacity: 0; }
          6%   { opacity: 1; }
          55%  { opacity: 0.9; }
          85%  { opacity: 0; transform: translateX(290%) rotate(12deg); }
          100% { transform: translateX(-10%) rotate(12deg); opacity: 0; }
        }

        /* ── NAV ── */
        .mk-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 52px; height: 60px; transition: background 0.25s, border-color 0.25s;
        }
        .mk-nav.scrolled {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #E8E8E8;
        }
        .mk-nav-brand { display: flex; flex-direction: row; align-items: center; gap: 10px; }
        .mk-nav-brand-texts { display: flex; flex-direction: column; gap: 2px; }
        .mk-nav-brand-name { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #111111; line-height: 1; }
        .mk-nav-brand-sub { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase; color: #111111; }
        .mk-nav-links { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; }
        .mk-nav-links a { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: #555555; padding: 4px 16px; transition: color 0.15s; }
        .mk-nav-links a:hover { color: #111111; }
        .mk-nav-cta { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; background: #111111; padding: 9px 20px; border: 1px solid #111111; transition: background 0.2s, color 0.2s; }
        .mk-nav-cta:hover { background: #2A2A2A; border-color: #2A2A2A; color: #fff; }
        .mk-more-wrap { position: relative; display: inline-flex; align-items: center; margin-left: 8px; }
        .mk-more-btn { background: none; border: 1px solid #E8E8E8; border-radius: 6px; cursor: pointer; padding: 6px 14px; display: inline-flex; align-items: center; gap: 5px; transition: border-color 0.15s; font-family: 'Sora', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #1A1A1A; }
        .mk-more-btn:hover { border-color: #111111; color: #111111; }
        .mk-more-menu { position: absolute; top: calc(100% + 8px); right: 0; min-width: 220px; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); z-index: 200; padding: 8px 0; }
        .mk-more-menu a { display: block; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #111111; text-decoration: none; padding: 9px 18px; transition: background 0.12s; }
        .mk-more-menu a:hover { background: #F5F5F5; color: #111111; }
        .mk-more-divider { height: 1px; background: #E8E8E8; margin: 6px 0; }
        .mk-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        .mk-hamburger span { display: block; width: 22px; height: 1.5px; background: #111111; }

        /* ── HERO ── */
        .mk-hero {
          min-height: 100dvh; display: flex; align-items: center;
          padding: 80px 52px 56px; position: relative; overflow: hidden;
          background: rgba(255,255,255,0.72);
        }
        .mk-hero-inner {
          position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 340px; gap: 80px; align-items: center;
        }

        /* Identity headline */
        .mk-hero-identity {
          font-size: clamp(42px, 5.5vw, 72px);
          font-weight: 800; line-height: 1.04; letter-spacing: -2.5px; color: #111111; margin-bottom: 28px;
        }
        .mk-identity-accent { color: #DC2626; font-style: italic; }
        .mk-vision-accent {
          display: inline;
          background: #111111;
          color: #ffffff;
          font-style: italic;
          padding: 0 6px 2px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }

        .mk-hero-body {
          font-size: 18px; line-height: 1.75; color: #475569; max-width: 520px; margin-bottom: 36px;
        }

        .mk-hero-actions {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .mk-btn-primary {
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600;
          color: #fff; background: #111111; padding: 14px 32px; border-radius: 6px;
          display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;
          white-space: nowrap;
        }
        .mk-btn-primary:hover { background: #2A2A2A; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.25); }
        .mk-btn-secondary {
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 500;
          color: #111111; border: 1.5px solid #D8D0C8; padding: 13px 28px; border-radius: 6px; transition: all 0.2s;
          white-space: nowrap;
        }
        .mk-btn-secondary:hover { border-color: #111111; }

        /* Hero right stats column */
        .mk-hero-stats {
          display: flex; flex-direction: column; gap: 0;
          padding-left: 40px; border-left: 1px solid #E8E8E8;
        }
        .mk-hero-stat {
          padding: 28px 0; border-bottom: 1px solid #E8E8E8;
        }
        .mk-hero-stat:last-child { border-bottom: none; }
        .mk-hero-stat-num {
          font-family: 'Sora', sans-serif; font-size: 38px; font-weight: 800;
          color: #111111; line-height: 1; letter-spacing: -1.5px; margin-bottom: 8px;
        }
        .mk-hero-stat-num span { color: #111111; }
        .mk-hero-stat-label {
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.8px;
          text-transform: uppercase; color: #64748b; line-height: 1.5;
        }

        .mk-proof-item { display: flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #475569; }
        .mk-proof-check { width: 15px; height: 15px; border-radius: 50%; background: #f0faf4; border: 1px solid #86efac; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #16a34a; flex-shrink: 0; }

        /* ── PROOF BAR ── */
        .mk-proof-bar {
          background: rgba(255,255,255,0.72);
          padding: 0 52px;
        }
        .mk-proof-bar-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: auto 1fr;
          align-items: stretch; min-height: 88px;
        }
        .mk-proof-bar-label {
          display: flex; align-items: center;
          padding: 0 32px 0 0; border-right: 1px solid #E8E8E8;
          gap: 10px; min-width: 160px;
        }
        .mk-proof-bar-dot { width: 7px; height: 7px; border-radius: 50%; background: #2D7D46; animation: blink 2s ease-in-out infinite; flex-shrink: 0; }
        .mk-proof-bar-status { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #2D7D46; }
        .mk-proof-bar-sub { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 1px; color: #555555; margin-top: 3px; }
        .mk-proof-bar-items {
          display: flex; align-items: center; flex-wrap: wrap;
          padding: 20px 0 20px 32px; gap: 0;
        }
        .mk-proof-bar-item {
          display: flex; align-items: center; gap: 10px;
          padding: 4px 28px 4px 0;
          border-right: 1px solid #E8E8E8;
          margin-right: 28px;
        }
        .mk-proof-bar-item:last-child { border-right: none; margin-right: 0; }
        .mk-proof-icon {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1px solid rgba(17,17,17,0.35);
          background: #FFFFFF;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;
          color: #111111; flex-shrink: 0;
        }
        .mk-proof-text { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 0.8px; color: #555; line-height: 1.5; }
        .mk-proof-text strong { color: #111111; font-weight: 700; display: block; font-size: 11px; }

        /* ── IN-STORE REALITY ── */
        .mk-reality {
          background: rgba(255,255,255,0.72); padding: 72px 52px;
        }
        .mk-reality-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .mk-reality-img {
          border: 1px solid rgba(17,17,17,0.3); border-radius: 10px;
          background: rgba(17,17,17,0.06);
          aspect-ratio: 4/3; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          position: relative; overflow: hidden;
        }
        .mk-reality-img::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(17,17,17,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(17,17,17,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .mk-reality-placeholder { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #111111; text-align: center; position: relative; z-index: 1; }
        .mk-reality-placeholder-icon { font-size: 32px; opacity: 0.3; margin-bottom: 4px; }
        .mk-reality-caption { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.5px; color: #555555; text-align: center; margin-top: 10px; font-style: italic; }

        /* ── COMMERCIAL READINESS ── */
        .mk-commercial {
          background: rgba(255,255,255,0.72); padding: 72px 52px;
        }
        .mk-commercial-inner { max-width: 1100px; margin: 0 auto; }
        .mk-commercial-grid {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 40px;
        }
        .mk-commercial-item {
          padding: 24px 0;
          text-align: left; border-top: 1px solid #E8E8E8;
        }
        .mk-commercial-icon {
          font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;
          color: #111111; margin-bottom: 12px; letter-spacing: 1px;
        }
        .mk-commercial-label { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 0.8px; text-transform: uppercase; color: #111111; font-weight: 600; margin-bottom: 4px; }
        .mk-commercial-sub { font-size: 11.5px; color: #64748b; line-height: 1.5; }

        /* ── DESIGNED FOR ── */
        .mk-designed { background: rgba(255,255,255,0.72); padding: 72px 52px; }
        .mk-designed-inner { max-width: 1100px; margin: 0 auto; }
        .mk-designed-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
        .mk-designed-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 16px 0; border-top: 1px solid #E8E8E8;
        }
        .mk-designed-check { font-size: 11px; color: #111111; flex-shrink: 0; margin-top: 3px; font-weight: 700; }
        .mk-designed-text { font-size: 14px; color: #111111; line-height: 1.6; font-weight: 500; }

        /* ── WHY NOW ── */
        .mk-why-now {
          background: rgba(255,255,255,0.72); padding: 72px 52px;
        }
        .mk-why-now-inner { max-width: 1100px; margin: 0 auto; }
        .mk-why-now-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
        .mk-why-now-item {
          display: flex; align-items: flex-start; gap: 14px; padding: 18px 0;
          border-top: 1px solid #E8E8E8;
        }
        .mk-why-now-text { font-size: 14px; color: #111111; line-height: 1.65; }

        /* ── TRUST BAR (legacy, removed) ── */
        .mk-trust { display: none; }
        .mk-trust-item { display: none; }
        .mk-trust-sep { display: none; }

        /* ── MARKET ── */
        .mk-market { background: rgba(255,255,255,0.72); padding: 96px 52px; position: relative; }
        .mk-market-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
        .mk-section-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 2.5px; text-transform: uppercase; color: #111111; margin-bottom: 14px; }
        .mk-h2-light { font-family: 'Sora', system-ui, sans-serif; font-size: clamp(30px,3.8vw,50px); font-weight: 700; color: #fff; letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.08; }
        .mk-sub-light { font-size: 16px; color: rgba(255,255,255,0.78); max-width: 520px; line-height: 1.7; margin-bottom: 52px; }

        /* Stat row */
        .mk-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; margin-bottom: 64px; }
        .mk-stat-card {
          padding: 40px 32px; border-right: 1px solid #E8E8E8;
        }
        .mk-stat-card:last-child { border-right: none; }
        .mk-stat-num { font-size: 38px; font-weight: 800; color: #111111; letter-spacing: -1px; line-height: 1; }
        .mk-stat-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.8px; text-transform: uppercase; color: #64748b; margin-top: 10px; line-height: 1.6; }
        .mk-market-note { border-left: 2px solid #111111; padding: 4px 0 4px 20px; font-size: 15px; color: #374151; line-height: 1.75; max-width: 760px; margin-top: 48px; }
        .mk-market-note strong { color: #1A1A1A; font-weight: 700; }

        /* ── TECH ── */
        .mk-tech {
          padding: 96px 52px;
          background: rgba(255,255,255,0.72);
        }
        .mk-tech-inner { max-width: 1100px; margin: 0 auto; }
        .mk-tech-steps { display: flex; flex-direction: column; gap: 0; margin-top: 64px; }
        .mk-tech-step {
          display: grid; grid-template-columns: 120px 1fr;
          gap: 48px; align-items: start;
          padding: 40px 0; border-top: 1px solid #E8E8E8;
        }
        .mk-tech-step:first-child { border-top: none; padding-top: 0; }
        .mk-tech-arrow { width: 120px; text-align: center; color: #BFBFBF; font-size: 20px; line-height: 1; margin: -6px 0; padding: 0; }
        .mk-tech-step-num {
          width: 72px; height: 72px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 800;
          color: #888; line-height: 1; letter-spacing: 0;
          border: 1px solid #E2E2E2; background: #fff;
          box-shadow: 0 0 0 0 rgba(17,17,17,0);
          transition: all 0.3s ease;
        }
        .mk-tech-step:hover .mk-tech-step-num {
          color: #fff; background: #111111; border-color: #111111;
          box-shadow: 0 0 0 6px rgba(17,17,17,0.08), 0 8px 28px rgba(17,17,17,0.28);
        }
        .mk-tech-step-body {}
        .mk-tech-step-title { font-size: 22px; font-weight: 700; color: #1E1E1E; margin-bottom: 12px; line-height: 1.2; }
        .mk-tech-step-desc { font-size: 16px; color: #475569; line-height: 1.75; max-width: 580px; }
        .mk-tech-note { border-left: 2px solid #111111; padding: 4px 0 4px 20px; font-size: 14px; color: #374151; line-height: 1.6; margin-top: 48px; }
        .mk-tech-note strong { color: #111111; }
        .mk-h2-dark { font-family: 'Sora', system-ui, sans-serif; font-size: clamp(30px,3.8vw,50px); font-weight: 700; color: #1E1E1E; letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.08; }
        .mk-sub-dark { font-size: 16px; color: #64748b; max-width: 520px; line-height: 1.7; margin-bottom: 0; }

        /* ── SPECS ── */
        .mk-specs {
          padding: 96px 52px;
          background: rgba(255,255,255,0.72);
          position: relative; overflow: hidden;
        }
        .mk-specs-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 1; }
        .mk-terminal { background: #FFFFFF; border-radius: 8px; padding: 28px; border: 1px solid #E8E8E8; font-family: 'JetBrains Mono', monospace; }
        .mk-terminal-bar { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid #E8E8E8; }
        .mk-terminal-dots { display: flex; gap: 6px; }
        .mk-terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
        .mk-terminal-filename { font-size: 10px; color: #555555; letter-spacing: 1px; }
        .mk-terminal-verified { font-size: 9px; color: #111111; letter-spacing: 0.8px; }
        .mk-terminal-heading { font-size: 10.5px; color: #555555; margin-bottom: 16px; letter-spacing: 0.5px; }
        .mk-terminal-row { display: grid; grid-template-columns: 160px 16px 1fr; margin-bottom: 6px; font-size: 12px; }
        .mk-tr-key { color: #555555; } .mk-tr-sep { color: #111111; } .mk-tr-val { color: #111111; }
        .mk-specs-text h3 { font-family: 'Sora', system-ui, sans-serif; font-size: 26px; font-weight: 700; color: #1E1E1E; margin-bottom: 12px; letter-spacing: -0.3px; }
        .mk-specs-text p { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 16px; }
        .mk-specs-cert { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.2px; text-transform: uppercase; color: #555555; }

        /* ── SURVEY ── */
        .mk-survey {
          padding: 96px 52px;
          background: rgba(255,255,255,0.72);
          position: relative; overflow: hidden;
        }
        .mk-survey::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 50% 60% at 50% 0%, rgba(17,17,17,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 10% 100%, rgba(17,17,17,0.06) 0%, transparent 50%);
        }
        .mk-survey-inner { max-width: 600px; margin: 0 auto; }
        .mk-submit-btn { background: #111111; color: #fff; border: none; padding: 14px 32px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 6px; font-family: 'Sora', sans-serif; transition: all 0.2s; }
        .mk-submit-btn:hover { background: #2A2A2A; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(17,17,17,0.28); }
        .mk-form-note { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #475569; text-align: center; letter-spacing: 0.5px; }
        .mk-learn-note { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #475569; letter-spacing: 1px; text-transform: uppercase; margin-top: 36px; margin-bottom: 14px; }
        .mk-learn-btn {
          display: inline-block;
          text-decoration: none;
          padding: 13px 32px;
          border-radius: 6px;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
          color: #111111;
          background: #fff;
          animation: mk-glow-cycle 3s ease-in-out infinite;
        }
        @keyframes mk-glow-cycle {
          0%   { box-shadow: 0 0 12px 3px rgba(30,30,30,0.2);   border-color: #1E1E1E; color: #1E1E1E; }
          50%  { box-shadow: 0 0 16px 4px rgba(17,17,17,0.5); border-color: #111111; color: #111111; }
          100% { box-shadow: 0 0 12px 3px rgba(30,30,30,0.2);   border-color: #1E1E1E; color: #1E1E1E; }
        }
        .mk-learn-btn:hover { transform: translateY(-2px); }

        /* ── FOOTER ── */
        .mk-footer { padding: 28px 52px; background: rgba(255,255,255,0.72); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .mk-footer-name { font-size: 12px; font-weight: 700; letter-spacing: 0.5px; color: #111111; }
        .mk-footer-meta { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #555555; letter-spacing: 0.5px; margin-top: 2px; }
        .mk-footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #475569; letter-spacing: 0.5px; }

        /* ── MOBILE ── */
        .mk-mobile-menu { background: #fff; border-bottom: 1px solid #e2e8f3; padding: 16px 24px; display: flex; flex-direction: column; gap: 4px; }
        .mk-mobile-link { font-size: 15px; font-weight: 500; color: #111111; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .mk-mobile-cta { font-size: 14px; font-weight: 700; color: #fff; background: #111111; padding: 12px; border-radius: 6px; text-align: center; margin-top: 8px; }

        @media (max-width: 1024px) {
          .mk-hero-inner { grid-template-columns: 1fr; }
          .mk-stats-grid { grid-template-columns: 1fr 1fr; }
          .mk-tech-grid { grid-template-columns: 1fr; }
          .mk-specs-inner { grid-template-columns: 1fr; }
        }
        .mk-tablet-stats {
          display: none;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 32px;
        }
        .mk-tablet-stat {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 8px;
          padding: 14px 20px;
          flex: 1;
          min-width: 140px;
        }
        .mk-tablet-stat-num {
          font-family: 'Sora', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #111111;
          line-height: 1;
          margin-bottom: 4px;
        }
        .mk-tablet-stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8.5px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #64748b;
          line-height: 1.5;
        }
        @media (max-width: 1024px) {
          .mk-reality-inner { grid-template-columns: 1fr; }
          .mk-commercial-grid { grid-template-columns: repeat(2, 1fr); }
          .mk-designed-grid { grid-template-columns: 1fr; }
          .mk-why-now-grid { grid-template-columns: 1fr; }
          .mk-proof-bar-inner { grid-template-columns: 1fr; }
          .mk-proof-bar-label { border-right: none; border-bottom: 1px solid rgba(17,17,17,0.2); padding: 16px 0; }
          .mk-proof-bar-items { padding: 16px 0; flex-wrap: wrap; gap: 12px; }
          .mk-proof-bar-item { border-right: none; padding: 4px 0; margin-right: 0; }
        }
        @media (max-width: 768px) {
          .mk-nav { padding: 0 20px; }
          .mk-nav-links, .mk-nav-cta, .mk-more-wrap { display: none; }
          .mk-hamburger { display: flex; }
          .mk-hero { min-height: auto; padding: 88px 24px 48px; }
          .mk-hero-identity { font-size: clamp(33px, 8.7vw, 38px); letter-spacing: -1.2px; }
          .mk-market, .mk-tech, .mk-specs, .mk-survey { padding: 64px 24px; }
          .mk-reality, .mk-commercial, .mk-designed, .mk-why-now { padding: 48px 24px; }
          .mk-proof-bar { padding: 0 24px; }
          .mk-footer { padding: 12px 24px; }
          .mk-stats-grid { grid-template-columns: 1fr 1fr; }
          .mk-commercial-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`mk-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="/" className="mk-nav-brand">
          <img src="/mykei-logo.png" alt="Mykei Securities" style={{ height: 32, width: "auto", objectFit: "contain" }} />
          <div className="mk-nav-brand-texts">
            <span className="mk-nav-brand-name">MYKEI SECURITIES LTD</span>
            <span className="mk-nav-brand-sub">Forensic Retail Defence</span>
          </div>
        </a>
        <ul className="mk-nav-links">
          {navLinks.map(([label, href]) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
        </ul>
        <a href="/enterprise" className="mk-nav-cta">Discuss the Pilot</a>
        <div className="mk-more-wrap">
          <button className="mk-more-btn" onClick={() => setMoreOpen(v => !v)} aria-label="More pages">
            More <span style={{ fontSize: 10, lineHeight: 1 }}>▾</span>
          </button>
          {moreOpen && (
            <div className="mk-more-menu" onMouseLeave={() => setMoreOpen(false)}>
              <a href="/howitworks" onClick={() => setMoreOpen(false)}>How It Works</a>
              <a href="/adn" onClick={() => setMoreOpen(false)}>ADN Device</a>
              <a href="/economic-sterilisation" onClick={() => setMoreOpen(false)}>Economic Sterilisation</a>
              <a href="/enterprise" onClick={() => setMoreOpen(false)}>Enterprise</a>
              <div className="mk-more-divider" />
              <a href="/signal" onClick={() => setMoreOpen(false)}>Signal</a>
              <a href="/contact" onClick={() => setMoreOpen(false)}>Contact</a>
            </div>
          )}
        </div>
        <button className="mk-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mk-mobile-menu" style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 199, overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
          <a href="/adn" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>ADN Device</a>
          <a href="/howitworks" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="/economic-sterilisation" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Economic Sterilisation</a>
          <div style={{ height: 1, background: "#E8E8E8", margin: "6px 0" }} />
          <a href="/enterprise" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Enterprise</a>
          <a href="/signal" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Signal</a>
          <a href="/contact" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/enterprise" className="mk-mobile-cta" onClick={() => setMenuOpen(false)}>Discuss the Pilot</a>
        </div>
      )}

      {/* HERO */}
      <section className="mk-hero">
        <div className="mk-hero-inner">
          <div>
            <h1 className="mk-hero-identity">
              The problem is not<br />
              the theft.<br />
              <span className="mk-identity-accent">It is the resale.</span>
            </h1>

            <p className="mk-hero-body">
              Stolen goods have value because they can be sold. Mykei makes them harder to sell. By marking the goods, logging the incident, and poisoning the resale market before anyone gets to the door.
            </p>

            <div className="mk-hero-actions">
              <a href="/enterprise" className="mk-btn-primary">Discuss the Pilot</a>
              <a href="#how-it-works" className="mk-btn-secondary">How it works</a>
            </div>
          </div>

          <div className="mk-hero-stats">
            <div className="mk-hero-stat">
              <div className="mk-hero-stat-num">£8.1<span> Billion</span></div>
              <div className="mk-hero-stat-label">UK retail crime annually</div>
            </div>
            <div className="mk-hero-stat">
              <div className="mk-hero-stat-num">0</div>
              <div className="mk-hero-stat-label">Staff confrontations needed</div>
            </div>
            <div className="mk-hero-stat">
              <div className="mk-hero-stat-num" style={{ fontSize: 28 }}>Patent<span> pending</span></div>
              <div className="mk-hero-stat-label">UK application No. 2606630.8</div>
            </div>
          </div>
        </div>
      </section>


      {/* WHY WE EXIST */}
      <section style={{ background: "rgba(255,255,255,0.72)", padding: "100px clamp(24px,6vw,96px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "repeating-linear-gradient(transparent, transparent 47px, #111111 47px, #111111 48px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(38px,5.5vw,76px)", fontWeight: 700, lineHeight: 1.05, color: "#1E1E1E", margin: "0 0 clamp(40px,5vw,72px)", maxWidth: 820 }}>
              A world where stealing<br />simply <span className="mk-vision-accent">stops making sense.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "start" }}>
            <Reveal delay={0.05}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#111111", marginBottom: 20 }}>Vision</div>
                <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(18px,2vw,26px)", fontWeight: 400, lineHeight: 1.55, color: "#1E1E1E", margin: "0 0 24px" }}>
                  A high street where a shop owner does not have to choose between confronting a thief and watching their stock walk out. Where stolen goods are harder to sell because the buyers know the risk.
                </p>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.8, color: "#374151", margin: 0 }}>
                  This is not optimism. It is mathematics. Theft pays because stolen goods can be sold. Make them harder to sell and the maths stops working. That is the whole idea.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#111111", marginBottom: 20 }}>Mission</div>
                <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(18px,2vw,26px)", fontWeight: 400, lineHeight: 1.55, color: "#1E1E1E", margin: "0 0 24px" }}>
                  Give independent retailers the one thing security has rarely offered: a way to make stolen goods harder to cash out.
                </p>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.8, color: "#374151", margin: "0 0 32px" }}>
                  Mykei Securities builds security hardware for independent shops. Not the big chains with entire security teams. The butcher, the pharmacy, the corner shop. The people who built something and do not deserve to watch it slowly disappear.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REGISTER → MARK → EVIDENCE */}
      <section style={{ padding: "88px clamp(24px,6vw,80px)", background: "rgba(255,255,255,0.72)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 0 }}>
          {[
            { word: "Register", sub: "Your stock is on record before the incident. Not after.", color: "#15803d" },
            { word: "Mark",     sub: "Goods are marked, not people.",                           color: "#c27803" },
            { word: "Evidence", sub: "Timestamped, hash-chained, already filed before anyone reaches the door.", color: "#b91c1c" },
          ].map(({ word, sub, color }, i) => (
            <div key={word} style={{ display: "flex", alignItems: "flex-start", gap: 0, flex: i < 2 ? "0 0 auto" : "1" }}>
              <div>
                <div style={{ fontFamily: "'Sora',system-ui,sans-serif", fontSize: "clamp(48px,5.5vw,88px)", fontWeight: 800, color, lineHeight: 1, letterSpacing: "-2.5px" }}>{word}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "#6B7280", marginTop: 12, maxWidth: 200, lineHeight: 1.6, letterSpacing: "0.2px" }}>{sub}</div>
              </div>
              {i < 2 && (
                <div style={{ fontSize: 24, color: "#111111", margin: "18px 32px 0", fontWeight: 300 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mk-tech">
        <div className="mk-tech-inner">
          <Reveal>
            <h2 className="mk-h2-dark">The shelf <FightsWord /> back.</h2>
            <p className="mk-sub-dark">Sweep happens. ADN fires. Goods are marked. Record is created. All before anyone reaches the door.</p>
          </Reveal>
          <div className="mk-tech-steps">
            <Reveal delay={0}>
              <div className="mk-tech-step">
                <div className="mk-tech-step-num">01</div>
                <div className="mk-tech-step-body">
                  <h3 className="mk-tech-step-title">The device detects the sweep</h3>
                  <p className="mk-tech-step-desc">A small unit sits on the shelf. The moment stock is taken in bulk, it knows. No cameras. No staff involvement. No alarm that embarrasses honest customers.</p>
                </div>
              </div>
            </Reveal>
            <div className="mk-tech-arrow">↓</div>
            <Reveal delay={0.1}>
              <div className="mk-tech-step">
                <div className="mk-tech-step-num">02</div>
                <div className="mk-tech-step-body">
                  <h3 className="mk-tech-step-title">The goods are marked</h3>
                  <p className="mk-tech-step-desc">The taken stock receives a forensic marker automatically. Not visible to the thief. Linked to your shop, the date, and the batch incident. Permanently.</p>
                </div>
              </div>
            </Reveal>
            <div className="mk-tech-arrow">↓</div>
            <Reveal delay={0.2}>
              <div className="mk-tech-step">
                <div className="mk-tech-step-num">03</div>
                <div className="mk-tech-step-body">
                  <h3 className="mk-tech-step-title">A tamper-proof record is created</h3>
                  <p className="mk-tech-step-desc">Every incident is logged to the Mykei Registry. Hash-chained and append-only. If the goods surface online or at a market, the record already exists. Stolen stock becomes harder to sell.</p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <div className="mk-tech-note">
              <strong>No cameras. No confrontation. No biometric data.</strong> Your staff do not need to do anything. The shelf handles it.
            </div>
          </Reveal>
        </div>
      </section>


      {/* PUBLIC VOTE */}
      <section style={{ background: "rgba(255,255,255,0.72)", padding: "72px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Sora',system-ui,sans-serif", fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#1E1E1E", marginBottom: 12, lineHeight: 1.2 }}>
              Does this make sense to you?
            </h2>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, color: "#64748b", marginBottom: 36, lineHeight: 1.7 }}>
              One question. No email. No sign-up. Just a vote.
            </p>
            {!vote ? (
              <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                {(["yes","no"] as const).map(v => (
                  <button key={v} onClick={() => castVote(v)} style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700,
                    letterSpacing: 2, textTransform: "uppercase",
                    padding: "16px 44px", borderRadius: 6, cursor: "pointer", border: "none",
                    background: v === "yes" ? "#1E1E1E" : "#fff",
                    color: v === "yes" ? "#fff" : "#1E1E1E",
                    boxShadow: v === "no" ? "inset 0 0 0 1.5px #E8E8E8" : "none",
                    transition: "all 0.18s",
                  }}>{v === "yes" ? "Yes" : "No"}</button>
                ))}
              </div>
            ) : (
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 700, color: vote === "yes" ? "#2D7D46" : "#C0392B" }}>
                {vote === "yes" ? "Thanks. That means a lot." : "Fair enough. We'll keep working."}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* PILOT CTA */}
      <section id="pilot-survey" className="mk-survey">
        <div className="mk-survey-inner" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="mk-h2-dark">Your cameras recorded it. Your stock still walked. What now?</h2>
            <p className="mk-sub-dark" style={{ marginBottom: 36 }}>We do not take every case. Tell us about yours.</p>
            <a href="/enterprise" className="mk-submit-btn" style={{ display: "inline-block", textDecoration: "none" }}>Discuss the Pilot</a>
            <p className="mk-form-note" style={{ marginTop: 20 }}>No pressure. Just a conversation. Company No. 16984969</p>
            <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/howitworks" className="mk-learn-btn">See How It Works →</a>
              <a href="/howitworks#demo" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#111111", color: "#fff",
                fontFamily: "'JetBrains Mono',monospace",
                fontWeight: 700, fontSize: 11, letterSpacing: 2,
                textTransform: "uppercase",
                padding: "16px 36px", borderRadius: 8, textDecoration: "none",
                boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
                transition: "all 0.3s ease",
              }}>
                ▶ ADN in Action
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mk-footer">
        <div>
          <img src="/mykei-logo.png" alt="Mykei Securities" style={{ height: 36, width: "auto", objectFit: "contain", marginBottom: 10 }} />
          <div className="mk-footer-name">MYKEI SECURITIES</div>
          <div className="mk-footer-meta">Co. No: 16984969 · Registered in England & Wales · Manchester · Patent application No. 2606630.8 (UK)</div>
          <div className="mk-footer-meta" style={{ marginTop: 6 }}>
            Enterprise &amp; multi-site enquiries: <a href="mailto:protocol@mykei.io" style={{ color: "inherit", textDecoration: "underline" }}>protocol@mykei.io</a>
          </div>
        </div>
        <div className="mk-footer-copy">© 2026 MYKEI SECURITIES. ALL RIGHTS RESERVED.</div>
      </footer>
    </>
  );
}
