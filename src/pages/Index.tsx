import { useState, useEffect, useRef } from "react";
import PageSEO from "@/components/PageSEO";

/* ── SCROLL REVEAL ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
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

/* ── REVEAL WRAPPER ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
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
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statsReveal = useReveal(0.3);

  const b42 = useCounter(22, 2200, statsReveal.visible);
  const m20 = useCounter(20, 2000, statsReveal.visible);
  const b18 = useCounter(18, 1800, statsReveal.visible);

  // suppress unused warning
  void submitting; void setSubmitting;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinks = [
    ["ADN-1", "/adn-1"],
    ["How It Works", "/howitworks"],
    ["Economic Sterilisation", "/economic-sterilisation"],
    ["Signal", "/signal"],
  ];

  return (
    <>
      <PageSEO
        title="Mykei Securities | Anti-Resale Crime and Asset Integrity"
        description="Mykei Securities develops anti-resale crime and asset-integrity systems for marking, registry records, evidence workflows and resale-confidence reduction."
        canonical="https://mykei.io"
        ogImageAlt="Mykei Securities anti-resale crime and asset integrity system"
        keywords="Mykei Securities, Michael Esema, Economic Sterilisation, anti-resale crime, asset integrity, Market Reduction Approach, Mike Sutton, stolen goods markets, resale confidence reduction, Mykei Protocol, Mykei Registry, ADN-1 R&D, construction theft, solar theft, tool theft"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://mykei.io/#org",
              "name": "Mykei Securities Ltd",
              "url": "https://mykei.io",
              "logo": "https://mykei.io/mykei-logo.png",
              "foundingDate": "2025",
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
                "knowsAbout": ["Economic Sterilisation", "Market Reduction Approach", "anti-resale crime", "asset integrity", "asset marking", "evidence workflows", "organised retail crime", "ADN-1 R&D"]
              },
              "description": "Mykei Securities Ltd is an anti-resale crime and asset-integrity company. It links asset marking, registry records, evidence workflows and resale-confidence reduction.",
              "address": { "@type": "PostalAddress", "addressLocality": "Manchester", "addressCountry": "GB" },
              "knowsAbout": ["Economic Sterilisation", "Market Reduction Approach", "Mike Sutton", "Anti-resale crime", "Asset integrity", "Stolen goods markets", "Resale confidence reduction", "Asset marking", "Evidence workflows", "Mykei Registry", "Mykei Protocol", "Construction theft", "Solar theft", "Tool theft", "Retail theft economics", "ADN-1 R&D"],
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
              "description": "Anti-resale crime and asset-integrity company developing Economic Sterilisation, the Mykei Protocol, registry records and ADN-1 R&D.",
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
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', system-ui, sans-serif; background: #fff; color: #1A1A1A; }
        a { text-decoration: none; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* ── NAV ── */
        .mk-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 52px; height: 60px; transition: background 0.25s, border-color 0.25s;
        }
        .mk-nav.scrolled {
          background: #FFFFFF;
          border-bottom: 1px solid #E8E8E8;
        }
        .mk-nav-brand { display: flex; flex-direction: row; align-items: center; gap: 10px; }
        .mk-nav-brand-texts { display: flex; flex-direction: column; gap: 2px; }
        .mk-nav-brand-name { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #2D1204; line-height: 1; }
        .mk-nav-brand-sub { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase; color: #765C14; }
        .mk-nav-links { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; }
        .mk-nav-links a { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: #5C4639; padding: 4px 16px; transition: color 0.15s; }
        .mk-nav-links a:hover { color: #2D1204; }
        .mk-nav-cta { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; background: #2D1204; padding: 9px 20px; border: 1px solid #2D1204; transition: background 0.2s, color 0.2s; }
        .mk-nav-cta:hover { background: #c9a84c; border-color: #765C14; color: #2D1204; }
        .mk-more-wrap { position: relative; display: inline-flex; align-items: center; margin-left: 8px; }
        .mk-more-btn { background: none; border: 1px solid #E8E8E8; border-radius: 6px; cursor: pointer; padding: 6px 14px; display: inline-flex; align-items: center; gap: 5px; transition: border-color 0.15s; font-family: 'Sora', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #1A1A1A; }
        .mk-more-btn:hover { border-color: #765C14; color: #765C14; }
        .mk-more-menu { position: absolute; top: calc(100% + 8px); right: 0; min-width: 220px; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); z-index: 200; padding: 8px 0; }
        .mk-more-menu a { display: block; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #2D1204; text-decoration: none; padding: 9px 18px; transition: background 0.12s; }
        .mk-more-menu a:hover { background: #FFFFFF; color: #765C14; }
        .mk-more-divider { height: 1px; background: #E8E8E8; margin: 6px 0; }
        .mk-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        .mk-hamburger span { display: block; width: 22px; height: 1.5px; background: #2D1204; }

        /* ── HERO ── */
        .mk-hero {
          min-height: 78svh; display: flex; align-items: center;
          padding: 96px 52px 56px; position: relative; overflow: hidden; background: #fff;
        }
        .mk-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(45,18,4,0.022) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(45,18,4,0.022) 1px, transparent 1px);
          background-size: 52px 52px; pointer-events: none;
        }
        .mk-hero::after { display: none; }
        .mk-hero-inner {
          position: relative; z-index: 2; max-width: 900px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr; gap: 0; align-items: center;
        }

        /* Company badge */
        .mk-company-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 6px; padding: 7px 14px;
          margin-bottom: 32px;
        }
        .mk-badge-label { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 500; color: #555555; letter-spacing: 1.2px; text-transform: uppercase; }
        .mk-badge-sep { width: 1px; height: 12px; background: rgba(212,175,55,0.5); }
        .mk-badge-status { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #555555; letter-spacing: 0.8px; display: flex; align-items: center; gap: 5px; }
        .mk-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #c9a84c; animation: blink 2s ease-in-out infinite; }

        /* Identity headline */
        .mk-hero-identity {
          font-size: clamp(38px, 5vw, 64px);
          font-weight: 800; line-height: 1.08; letter-spacing: -2px; color: #2D1204; margin-bottom: 10px;
        }
        .mk-identity-accent { color: #765C14; }
        .mk-identity-rule { display: block; width: 44px; height: 3px; background: #c9a84c; border-radius: 2px; margin: 20px 0 22px; }

        .mk-hero-descriptor {
          font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: 1.5px;
          text-transform: uppercase; color: #475569; margin-bottom: 28px;
        }

        .mk-hero-body {
          font-size: 17px; line-height: 1.8; color: #475569; max-width: 650px; margin-bottom: 34px;
        }
        .mk-hero-body strong { color: #2D1204; font-weight: 600; }

        .mk-hero-actions {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .mk-btn-primary {
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600;
          color: #fff; background: #4A2008; padding: 13px 28px; border-radius: 7px;
          display: inline-flex; align-items: center; gap: 8px; transition: all 0.22s;
        }
        .mk-btn-primary:hover { background: #D4AF37; }
        .mk-btn-secondary {
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 500;
          color: #2D1204; border: 1.5px solid #dde4ef; padding: 12px 28px; border-radius: 7px; transition: all 0.2s;
        }
        .mk-btn-secondary:hover { border-color: #4A2008; background: #f8f9fc; }

        .mk-hero-proof {
          display: flex; align-items: center; gap: 18px; margin-top: 24px; flex-wrap: wrap;
        }
        .mk-proof-item { display: flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #475569; }
        .mk-proof-check { width: 15px; height: 15px; border-radius: 50%; background: #f0faf4; border: 1px solid #86efac; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #16a34a; flex-shrink: 0; }

        /* ── PROOF BAR ── */
        .mk-proof-bar {
          background: #F8F8F8;
          border-top: 2px solid #D4AF37;
          border-bottom: 1px solid #E8E8E8;
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
          border: 1px solid rgba(118,92,20,0.35);
          background: #FFFFFF;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;
          color: #765C14; flex-shrink: 0;
        }
        .mk-proof-text { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 0.8px; color: #555; line-height: 1.5; }
        .mk-proof-text strong { color: #2D1204; font-weight: 700; display: block; font-size: 11px; }

        /* ── IN-STORE REALITY ── */
        .mk-reality {
          background: #FFFFFF; padding: 72px 52px;
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .mk-reality-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .mk-reality-img {
          border: 1px solid rgba(201,168,76,0.3); border-radius: 10px;
          background: rgba(201,168,76,0.06);
          aspect-ratio: 4/3; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          position: relative; overflow: hidden;
        }
        .mk-reality-img::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .mk-reality-placeholder { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #765C14; text-align: center; position: relative; z-index: 1; }
        .mk-reality-placeholder-icon { font-size: 32px; opacity: 0.3; margin-bottom: 4px; }
        .mk-reality-caption { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.5px; color: #555555; text-align: center; margin-top: 10px; font-style: italic; }

        /* ── COMMERCIAL READINESS ── */
        .mk-commercial {
          background: #fff; padding: 72px 52px;
          border-top: 1px solid #E8E8E8;
        }
        .mk-commercial-inner { max-width: 1100px; margin: 0 auto; }
        .mk-commercial-grid {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 40px;
        }
        .mk-commercial-item {
          border: 1px solid #E8E8E8; border-radius: 8px; padding: 24px 20px;
          text-align: center; background: #FFFFFF;
        }
        .mk-commercial-icon {
          width: 28px; height: 28px; margin: 0 auto 12px;
          border-radius: 50%; border: 1px solid rgba(118,92,20,0.35);
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;
          color: #765C14; background: #FFFFFF;
        }
        .mk-commercial-label { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 0.8px; text-transform: uppercase; color: #2D1204; font-weight: 600; margin-bottom: 4px; }
        .mk-commercial-sub { font-size: 11.5px; color: #64748b; line-height: 1.5; }

        /* ── DESIGNED FOR ── */
        .mk-designed { background: #FFFFFF; padding: 72px 52px; }
        .mk-designed-inner { max-width: 1100px; margin: 0 auto; }
        .mk-designed-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
        .mk-designed-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 20px 24px; background: rgba(255,255,255,0.6);
          border: 1px solid rgba(201,168,76,0.2); border-radius: 8px;
        }
        .mk-designed-check { width: 20px; height: 20px; border-radius: "50%"; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.4); display: flex; align-items: center; justify-content: center; font-size: 10px; color: #555555; flex-shrink: 0; margin-top: 2px; }
        .mk-designed-text { font-size: 14px; color: #2D1204; line-height: 1.6; font-weight: 500; }

        /* ── WHY NOW ── */
        .mk-why-now {
          background: #fff; padding: 72px 52px;
          border-top: 1px solid #E8E8E8;
        }
        .mk-why-now-inner { max-width: 1100px; margin: 0 auto; }
        .mk-why-now-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
        .mk-why-now-item {
          display: flex; align-items: flex-start; gap: 14px; padding: 20px 24px;
          border-left: 3px solid #c9a84c; background: #FFFFFF; border-radius: 0 6px 6px 0;
        }
        .mk-why-now-text { font-size: 14px; color: #2D1204; line-height: 1.65; }

        /* ── TRUST BAR (legacy, removed) ── */
        .mk-trust { display: none; }
        .mk-trust-item { display: none; }
        .mk-trust-sep { display: none; }

        /* ── MARKET ── */
        .mk-market { background: #FFFFFF; padding: 96px 52px; position: relative; border-top: 1px solid #E8E8E8; }
        .mk-market-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
        .mk-section-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 2.5px; text-transform: uppercase; color: #765C14; margin-bottom: 14px; }
        .mk-h2-light { font-family: 'Sora', system-ui, sans-serif; font-size: clamp(30px,3.8vw,50px); font-weight: 700; color: #fff; letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.08; }
        .mk-sub-light { font-size: 16px; color: rgba(255,255,255,0.78); max-width: 520px; line-height: 1.7; margin-bottom: 52px; }

        /* Stat cards */
        .mk-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 48px; }
        .mk-stat-card {
          background: #FFFFFF;
          border: 1px solid #E8E8E8; border-radius: 8px; padding: 32px 24px;
        }
        .mk-stat-card:hover { border-color: #765C14; }
        .mk-stat-num { font-size: 38px; font-weight: 800; color: #765C14; letter-spacing: -1px; line-height: 1; }
        .mk-stat-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.8px; text-transform: uppercase; color: #64748b; margin-top: 10px; line-height: 1.6; }
        .mk-market-note { background: #F8F8F8; border: 1px solid #E8E8E8; border-left: 4px solid #D4AF37; padding: 20px 24px; border-radius: 8px; font-size: 15px; color: #374151; line-height: 1.75; max-width: 760px; }
        .mk-market-note strong { color: #1A1A1A; font-weight: 700; }

        /* ── TECH ── */
        .mk-tech {
          padding: 96px 52px;
          background: #FFFFFF;
          border-top: 1px solid #E8E8E8;
          position: relative;
        }
        .mk-tech-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
        .mk-tech-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-bottom: 28px; }
        .mk-tech-card {
          border: 1px solid #E8E8E8; border-radius: 8px; padding: 28px;
          background: #FFFFFF;
          transition: border-color 0.2s ease;
        }
        .mk-tech-card:hover { border-color: #765C14; }
        .mk-tech-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1px; color: #765C14; border: 1px solid rgba(201,168,76,0.4); padding: 3px 10px; border-radius: 100px; margin-bottom: 16px; }
        .mk-tech-title { font-size: 15px; font-weight: 700; color: #2D1204; margin-bottom: 10px; }
        .mk-tech-desc { font-size: 13px; color: #64748b; line-height: 1.65; margin-bottom: 20px; }
        .mk-tech-specs { border-top: 1px solid #E8E8E8; padding-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .mk-spec-key { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.8px; text-transform: uppercase; color: #475569; }
        .mk-spec-val { font-size: 12px; font-weight: 700; color: #1A1A1A; margin-top: 1px; }
        .mk-tech-note { background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.25); border-left: 3px solid #c9a84c; padding: 14px 18px; border-radius: 4px; font-size: 14px; color: #374151; line-height: 1.6; }
        .mk-tech-note strong { color: #2D1204; }
        .mk-h2-dark  { font-family: 'Sora', system-ui, sans-serif; font-size: clamp(30px,3.8vw,50px); font-weight: 700; color: #1E1E1E; letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.08; }
        .mk-sub-dark  { font-size: 16px; color: #64748b; max-width: 520px; line-height: 1.7; margin-bottom: 52px; }

        /* ── SPECS ── */
        .mk-specs {
          padding: 96px 52px;
          background: #F8F8F8;
          border-top: 1px solid #E8E8E8;
          position: relative; overflow: hidden;
        }
        .mk-specs-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 1; }
        .mk-terminal { background: #FFFFFF; border-radius: 8px; padding: 28px; border: 1px solid #E8E8E8; font-family: 'JetBrains Mono', monospace; }
        .mk-terminal-bar { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid #E8E8E8; }
        .mk-terminal-dots { display: flex; gap: 6px; }
        .mk-terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
        .mk-terminal-filename { font-size: 10px; color: #555555; letter-spacing: 1px; }
        .mk-terminal-verified { font-size: 9px; color: #765C14; letter-spacing: 0.8px; }
        .mk-terminal-heading { font-size: 10.5px; color: #555555; margin-bottom: 16px; letter-spacing: 0.5px; }
        .mk-terminal-row { display: grid; grid-template-columns: 160px 16px 1fr; margin-bottom: 6px; font-size: 12px; }
        .mk-tr-key { color: #555555; } .mk-tr-sep { color: #765C14; } .mk-tr-val { color: #2D1204; }
        .mk-specs-text h3 { font-family: 'Sora', system-ui, sans-serif; font-size: 26px; font-weight: 700; color: #1E1E1E; margin-bottom: 12px; letter-spacing: -0.3px; }
        .mk-specs-text p { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 16px; }
        .mk-specs-cert { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.2px; text-transform: uppercase; color: #555555; }

        /* ── SURVEY ── */
        .mk-survey {
          padding: 96px 52px;
          background: #fff;
          position: relative; overflow: hidden;
        }
        .mk-survey::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 50% 60% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 10% 100%, rgba(74,32,8,0.06) 0%, transparent 50%);
        }
        .mk-survey-inner { max-width: 600px; margin: 0 auto; }
        .mk-submit-btn { background: #4A2008; color: #fff; border: none; padding: 14px 32px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 6px; font-family: 'Sora', sans-serif; transition: all 0.2s; }
        .mk-submit-btn:hover { background: #c9a84c; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,168,76,0.28); }
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
          color: #4A2008;
          background: #fff;
          animation: mk-glow-cycle 3s ease-in-out infinite;
        }
        @keyframes mk-glow-cycle {
          0%   { box-shadow: 0 0 12px 3px rgba(30,30,30,0.2);   border-color: #1E1E1E; color: #1E1E1E; }
          50%  { box-shadow: 0 0 16px 4px rgba(212,175,55,0.5); border-color: #765C14; color: #765C14; }
          100% { box-shadow: 0 0 12px 3px rgba(30,30,30,0.2);   border-color: #1E1E1E; color: #1E1E1E; }
        }
        .mk-learn-btn:hover { transform: translateY(-2px); }

        /* ── FOOTER ── */
        .mk-footer { padding: 28px 52px; background: #fff; border-top: 1px solid #E8E8E8; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .mk-footer-name { font-size: 12px; font-weight: 700; letter-spacing: 0.5px; color: #2D1204; }
        .mk-footer-meta { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #555555; letter-spacing: 0.5px; margin-top: 2px; }
        .mk-footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #475569; letter-spacing: 0.5px; }

        /* ── MOBILE ── */
        .mk-mobile-menu { background: #fff; border-bottom: 1px solid #e2e8f3; padding: 16px 24px; display: flex; flex-direction: column; gap: 4px; }
        .mk-mobile-link { font-size: 15px; font-weight: 500; color: #2D1204; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .mk-mobile-cta { font-size: 14px; font-weight: 700; color: #fff; background: #4A2008; padding: 12px; border-radius: 6px; text-align: center; margin-top: 8px; }

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
          color: #765C14;
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
          .mk-proof-bar-label { border-right: none; border-bottom: 1px solid rgba(201,168,76,0.2); padding: 16px 0; }
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
              <a href="/adn-1" onClick={() => setMoreOpen(false)}>ADN-1 Device</a>
              <a href="/economic-sterilisation" onClick={() => setMoreOpen(false)}>Economic Sterilisation</a>
              <a href="/enterprise" onClick={() => setMoreOpen(false)}>Enterprise</a>
              <div className="mk-more-divider" />
              <a href="/signal" onClick={() => setMoreOpen(false)}>Signal</a>
              <a href="/certification" onClick={() => setMoreOpen(false)}>Certification</a>
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
          <a href="/adn-1" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>ADN-1 Device</a>
          <a href="/howitworks" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="/economic-sterilisation" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Economic Sterilisation</a>
          <div style={{ height: 1, background: "#E8E8E8", margin: "6px 0" }} />
          <a href="/enterprise" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Enterprise</a>
          <a href="/signal" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Signal</a>
          <a href="/certification" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Certification</a>
          <a href="/contact" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/enterprise" className="mk-mobile-cta" onClick={() => setMenuOpen(false)}>Discuss the Pilot</a>
        </div>
      )}

      {/* HERO */}
      <section className="mk-hero">
        <div className="mk-hero-inner">
          <div>
            <div className="mk-company-badge">
              <span className="mk-badge-label">Mykei Securities Ltd</span>
              <div className="mk-badge-sep" />
              <span className="mk-badge-status">
                <div className="mk-badge-dot" />Pilot fit reviews open
              </span>
            </div>

            <h1 className="mk-hero-identity">
              The problem is not<br />
              the theft.<br />
              <span className="mk-identity-accent">It is the resale.</span>
              <span className="mk-identity-rule" />
            </h1>

            <div className="mk-hero-descriptor">
              Shelf level retail defence for stores hit by repeat theft.
            </div>

            <p className="mk-hero-body">
              ADN-1 helps retailers turn shelf theft into a marker and registry record. No cameras. No chasing. No biometric data. Just a cleaner way to make stolen stock harder to move. And since the Crime and Policing Act 2026, shop theft of any value can be prosecuted. The bottleneck is evidence. Evidence is what we build.
            </p>

            <div className="mk-hero-actions">
              <a href="/enterprise" className="mk-btn-primary">Check Store Fit</a>
              <a href="#adn-1-system" className="mk-btn-secondary">See the 3 Step Loop</a>
            </div>

            <div className="mk-hero-proof">
              {["No cameras", "No confrontation", "No biometric data", "UK registered"].map(p => (
                <div className="mk-proof-item" key={p}>
                  <div className="mk-proof-check">✓</div>{p}
                </div>
              ))}
            </div>

            {/* Compact stats retained for narrow fallback layouts */}
            <div className="mk-tablet-stats">
              {[
                { num: "£2.2B", label: "UK retail theft\nannually" },
                { num: "20M+", label: "Theft incidents\nper year" },
                { num: "< 200ms", label: "ADN-1 response\ntime" },
                { num: "1", label: "Enterprise pilot\nproof target" },
              ].map(s => (
                <div className="mk-tablet-stat" key={s.num}>
                  <div className="mk-tablet-stat-num">{s.num}</div>
                  <div className="mk-tablet-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PROOF BAR */}
      <div className="mk-proof-bar">
        <div className="mk-proof-bar-inner">
          <div className="mk-proof-bar-label">
            <div className="mk-proof-bar-dot" />
            <div>
              <div className="mk-proof-bar-status">Enterprise Pilot Reviews Open</div>
              <div className="mk-proof-bar-sub">Asset Integrity Pilot · Network/Enterprise</div>
            </div>
          </div>
          <div className="mk-proof-bar-items">
            {[
              { icon: "01", strong: "Controlled Evidence", text: "Prototype and registry demos" },
              { icon: "02", strong: "Patent Application", text: "UK application No. 2606630.8" },
              { icon: "03", strong: "Enterprise Route", text: "Network and enterprise pilot review" },
              { icon: "04", strong: "Privacy Posture", text: "No cameras or biometric data" },
            ].map(({ icon, strong, text }) => (
              <div className="mk-proof-bar-item" key={strong}>
                <span className="mk-proof-icon">{icon}</span>
                <div className="mk-proof-text">
                  <strong>{strong}</strong>
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY YOUR SHOP NEEDS THIS */}
      <section id="why" style={{ background: "#FFFFFF", padding: "72px 52px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div className="mk-section-eyebrow">Why asset-heavy organisations need this</div>
            <h2 className="mk-h2-dark" style={{ marginBottom: 40 }}>The old answer was a camera. The right answer is forensic science.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginBottom: 40 }}>
              {[
                { icon: "◉", point: "CCTV shows you what happened.", sub: "It does not prevent the next one. Footage without outcomes is not security." },
                { icon: "◎", point: "Stolen goods still find buyers.", sub: "Mykei reduces resale confidence by linking shelf events to marker and registry records." },
                { icon: "◈", point: "Staff confrontation is dangerous.", sub: "ADN-1 is designed for non-confrontational shelf defence without cameras, facial recognition, or biometric data." },
              ].map(({ icon, point, sub }) => (
                <div key={point} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#765C14", fontSize: 13, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 14, color: "#2D1204", marginBottom: 6 }}>{point}</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="/howitworks#faq" style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 2,
              color: "#B07820", textDecoration: "none", textTransform: "uppercase" as const,
              borderBottom: "1px solid rgba(176,120,32,0.4)", paddingBottom: 2,
            }}>
              Frequently Asked Questions →
            </a>
          </Reveal>
        </div>
      </section>

      {/* IN-STORE REALITY */}
      <section className="mk-reality">
        <div className="mk-reality-inner">
          <Reveal>
            <div>
              <div className="mk-section-eyebrow">In-Store Deployment</div>
              <h2 className="mk-h2-dark" style={{ marginBottom: 20 }}>Enterprise Asset Integrity Pilot.</h2>
              <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 24, maxWidth: 480 }}>
                Mykei is seeking one enterprise or network pilot with 50 to 500 valuable assets to test registration, marking readiness, evidence workflows and resale-confidence reduction.
              </p>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" as const }}>
                {[
                  { n: "50-500", l: "Target assets" },
                  { n: "Open", l: "Pilot partner search" },
                  { n: "Evidence", l: "Readiness audit" },
                ].map(({ n, l }) => (
                  <div key={n}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: "#2D1204" }}>{n}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#555555", letterSpacing: "1px", textTransform: "uppercase" as const, marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARKET CASE */}
      {/* PROOF TODAY: only true, verifiable numbers */}
      <section id="proof-today" className="mk-market" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="mk-market-inner">
          <Reveal>
            <div className="mk-section-eyebrow">What Exists Today</div>
            <h2 className="mk-h2-dark">No inflated claims. These numbers are real.</h2>
          </Reveal>
          <div className="mk-stats-grid" style={{ marginBottom: 0 }}>
            {[
              { num: "17", label: "Patent claims filed. UK application 2606630.8, pending" },
              { num: "3", label: "Firmware generations built and demonstrated" },
              { num: "2", label: "Filmed prototype demonstrations, 2026" },
              { num: "1995", label: "The research lineage we extend. Sutton's Market Reduction Approach" },
            ].map(({ num, label }) => (
              <div className="mk-stat-card" key={label}>
                <div className="mk-stat-num">{num}</div>
                <div className="mk-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="market-case" className="mk-market">
        <div className="mk-market-inner">
          <Reveal>
            <div className="mk-section-eyebrow">The Enemy</div>
            <h2 className="mk-h2-dark">Organised retail crime is not impulsive. It is a supply chain. And your shop is in it.</h2>
            <p className="mk-sub-dark">Professional crews treat your shelves as a warehouse. They sweep the stock, move it through resale channels, and come back next week. CCTV records it. Tags slow honest customers. Guards get hurt. None of it touches the economics. The resale market is the engine Mykei targets.</p>
          </Reveal>
          <div ref={statsReveal.ref} className="mk-stats-grid">
            {[
              { num: `£${(b42/10).toFixed(1)}B`, label: "UK retail crime cost annually" },
              { num: `${m20}M+`, label: "Theft incidents recorded last year" },
              { num: `£${(b18/10).toFixed(1)}B`, label: "Spent on security. Losses still rising." },
              { num: "Resale", label: "Where stolen stock becomes cash" },
            ].map(({ num, label }) => (
              <div className="mk-stat-card" key={label}>
                <div className="mk-stat-num">{num}</div>
                <div className="mk-stat-label">{label}</div>
              </div>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mk-market-note">
              Existing security watches crime happen but leaves the incentive untouched.{" "}
              <strong>As long as stolen goods can be sold, theft is worth the risk.</strong>{" "}
              Mykei reduces resale confidence by linking the shelf event to marker and registry records.
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="adn-1-system" className="mk-tech">
        <div className="mk-tech-inner">
          <Reveal>
            <div className="mk-section-eyebrow">How It Works</div>
            <h2 className="mk-h2-dark">Three parts. One outcome.</h2>
            <p className="mk-sub-dark">Detect the shelf event. Mark the goods. Create the record. Reduce resale confidence without staff confrontation.</p>
          </Reveal>
          <div className="mk-tech-grid">
            {[
              {
                tag: "ADN-1",
                title: "The detection node",
                desc: "A compact shelf-mounted device that silently detects sweep theft in under 50 milliseconds. No cameras, no confrontation, no biometric data of any kind. Fully automatic.",
                specs: [["PHYSICS","ToF laser 940nm"],["DECISION","< 50ms"],["PRIVACY","No camera / biometric"],["PATENT","UK application"]],
                link: "/howitworks", linkLabel: "See How It Works →",
              },
              {
                tag: "ATS",
                title: "The alert system",
                desc: "The moment a sweep is confirmed, a cartridge-linked event record is created and transmitted to the Mykei secure cloud registry in real time. Tamper-aware audit trail. Designed to support evidential workflows.",
                specs: [["ALERT","Real-time"],["LATENCY","Under 50ms"],["AUDIT","Tamper-aware"],["EVIDENTIAL","Designed for workflows"]],
                link: "/technology/ats", linkLabel: "View ATS →",
              },
              {
                tag: "FDT",
                title: "Economic Sterilisation",
                desc: "Every activation is logged to the Mykei Registry, linking the event to a device, location, timestamp, and cartridge batch reference. The batch-linked event record supports verification, insurer review, and investigation workflows.",
                specs: [["REGISTRY","Mykei Registry"],["BATCH","Linked event record"],["EVIDENCE","Verification workflow"],["LOG","Timestamped record"]],
                link: "/technology/ats", linkLabel: "View Registry →",
              },
            ].map(({ tag, title, desc, specs, link, linkLabel }, i) => (
              <Reveal key={tag} delay={i * 0.12}>
                <div className="mk-tech-card">
                  <span className="mk-tech-tag">{tag}</span>
                  <h3 className="mk-tech-title">{title}</h3>
                  <p className="mk-tech-desc">{desc}</p>
                  <div className="mk-tech-specs">
                    {specs.map(([k, v]) => (
                      <div key={k}><div className="mk-spec-key">{k}</div><div className="mk-spec-val">{v}</div></div>
                    ))}
                  </div>
                  {link && (
                    <a href={link} style={{
                      display: "inline-flex", alignItems: "center", marginTop: 20,
                      fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 1.5,
                      color: "#765C14", textDecoration: "none",
                      borderBottom: "1px solid rgba(212,168,67,0.3)", paddingBottom: 2,
                    }}>{linkLabel}</a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mk-tech-note">
              <strong>The point:</strong> Controlled marker deployment and a batch-linked registry record make stolen goods harder to sell without a traceable record. No cameras. No facial recognition. No biometric or suspect identity data.
            </div>
          </Reveal>
        </div>
      </section>


      {/* COMMERCIAL READINESS */}
      <section className="mk-commercial">
        <div className="mk-commercial-inner">
          <Reveal>
            <div className="mk-section-eyebrow">Commercial Model</div>
            <h2 className="mk-h2-dark">Designed for pilots. Built to scale.</h2>
            <p className="mk-sub-dark">ADN-1 is built for practical retail environments: shelf-level event detection, controlled marker deployment, and registry event records without camera-based monitoring.</p>
          </Reveal>
          <div className="mk-commercial-grid">
            {[
              { icon: "01", label: "Installation", sub: "Under 1 hour" },
              { icon: "02", label: "Staff Training", sub: "Simple handover" },
              { icon: "03", label: "Monitoring", sub: "No behavioural monitoring" },
              { icon: "04", label: "Billing", sub: "Subscription-based service" },
              { icon: "05", label: "Scalability", sub: "Independent to multi-site" },
            ].map(({ icon, label, sub }) => (
              <Reveal key={label}>
                <div className="mk-commercial-item">
                  <div className="mk-commercial-icon">{icon}</div>
                  <div className="mk-commercial-label">{label}</div>
                  <div className="mk-commercial-sub">{sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGNED FOR */}
      <section className="mk-designed">
        <div className="mk-designed-inner">
          <Reveal>
            <div className="mk-section-eyebrow">Designed For</div>
            <h2 className="mk-h2-dark">Built for the retailers security has failed.</h2>
          </Reveal>
          <div className="mk-designed-grid">
            {[
              "Prototype and registry demos facing repeat theft",
              "High-footfall convenience stores",
              "Urban retail environments with organised crime exposure",
              "Multi-site operators seeking scalable protection",
            ].map((text) => (
              <Reveal key={text}>
                <div className="mk-designed-item">
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#555555", flexShrink: 0, marginTop: 2 }}>✓</div>
                  <div className="mk-designed-text">{text}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="mk-why-now">
        <div className="mk-why-now-inner">
          <Reveal>
            <div className="mk-section-eyebrow">Why Now</div>
            <h2 className="mk-h2-dark">The conditions for Economic Sterilisation have arrived.</h2>
            <p className="mk-sub-dark">Four converging pressures are making the legacy security model obsolete. Mykei addresses all four simultaneously.</p>
          </Reveal>
          <div className="mk-why-now-grid">
            {[
              "Organised retail crime is increasing across the UK, outpacing investment in conventional deterrence.",
              "Online resale platforms are accelerating theft liquidity, turning stolen goods into cash within hours.",
              "Rising costs of guards and surveillance are pricing independent retailers out of adequate protection.",
              "Growing regulatory pressure on biometric monitoring is closing off the CCTV-based approach entirely.",
            ].map((text) => (
              <Reveal key={text}>
                <div className="mk-why-now-item">
                  <div className="mk-why-now-text">{text}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why we exist, moved below proof sections */}
      <section style={{ background: "#fff", padding: "100px clamp(24px,6vw,96px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "repeating-linear-gradient(transparent, transparent 47px, #2D1204 47px, #2D1204 48px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#765C14", marginBottom: 24 }}>
              Why We Exist
            </div>
            <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(38px,5.5vw,76px)", fontWeight: 700, lineHeight: 1.05, color: "#1E1E1E", margin: "0 0 clamp(40px,5vw,72px)", maxWidth: 820 }}>
              A world where stealing<br />simply stops making sense.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "start" }}>
            <Reveal delay={0.05}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#765C14", marginBottom: 20 }}>Vision</div>
                <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(18px,2vw,26px)", fontWeight: 400, lineHeight: 1.55, color: "#1E1E1E", margin: "0 0 24px" }}>
                  A high street where independent shops do not have to choose between confronting thieves and watching their stock walk out. Where organised retail crime has less resale confidence. Where stolen goods are harder to move.
                </p>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.8, color: "#374151", margin: 0 }}>
                  This is not optimism. It is mathematics. Reduce the resale reward and theft becomes less rational. Every professional crew, every opportunist, every repeat offender runs the same calculation. Change the answer and you change the behaviour.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#765C14", marginBottom: 20 }}>Mission</div>
                <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(18px,2vw,26px)", fontWeight: 400, lineHeight: 1.55, color: "#1E1E1E", margin: "0 0 24px" }}>
                  Give independent retailers the one thing security has rarely offered: a way to make stolen goods harder to cash out.
                </p>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.8, color: "#374151", margin: "0 0 32px" }}>
                  Mykei Securities builds forensic hardware for the shops that keep the high street alive. Not the big chains with entire loss-prevention departments. The butcher, the pharmacy, the corner shop, the specialist retailer. The people who built something and do not deserve to have it slowly taken from them.
                </p>
                <div style={{ display: "flex", gap: 40, flexWrap: "wrap" as const }}>
                  {[["Register","asset identity and evidence baseline"],["Mark","physical deterrence without biometric tracking"],["Evidence","records linked to owner, site, asset and incident"]].map(([n, l]) => (
                    <div key={n}>
                      <div style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "#1E1E1E", lineHeight: 1 }}>{n}</div>
                      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, color: "#7A6A52", marginTop: 6, maxWidth: 140, lineHeight: 1.4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TWO-TRACK SECTION */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,80px)", borderTop: "1px solid rgba(212,175,55,0.18)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div className="mk-section-eyebrow" style={{ marginBottom: 10 }}>Built for pilots. Designed for scale.</div>
            <h2 className="mk-h2-dark" style={{ marginBottom: 20 }}>Two routes. One doctrine.</h2>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.8, color: "#374151", maxWidth: 640, marginBottom: 56 }}>
              Mykei.s first commercial proof route is an enterprise or network asset-integrity pilot where asset records, marking readiness and evidence workflows can be tested with measurable before-and-after evidence.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="two-track-grid">
            <Reveal delay={0.05}>
              <div style={{ border: "1px solid rgba(212,175,55,0.3)", borderRadius: 8, padding: "clamp(28px,4vw,44px)", background: "#FFFFFF" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#765C14", marginBottom: 16 }}>Asset Integrity Validation</div>
                <h3 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(18px,2vw,24px)", fontWeight: 400, color: "#1E1E1E", marginBottom: 16, lineHeight: 1.3 }}>For asset-heavy operators facing theft, resale and evidence risk.</h3>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, lineHeight: 1.8, color: "#374151", marginBottom: 28 }}>
                  Used to validate asset records, marking readiness, incident evidence workflows and resale-confidence reduction in a controlled enterprise or network pilot. Marker selection remains subject to supplier specification, SDS/COSHH review and site fit.
                </p>
                <div style={{ borderTop: "1px solid rgba(212,175,55,0.2)", paddingTop: 20, marginBottom: 24 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555555", marginBottom: 10 }}>Pilot Scope</div>
                  <div style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 22, fontWeight: 700, color: "#1E1E1E" }}>Scoped pilot</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, color: "#374151", marginTop: 4 }}>No public retail pricing is active; pilot scope is set after review</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, color: "#555555", marginTop: 8, lineHeight: 1.6 }}>One pilot partner should involve approximately 50 to 500 assets and produce a credible case study.</div>
                </div>
                <a href="/enterprise" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1E1E1E", color: "#fff", padding: "12px 24px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", borderRadius: 4 }}>Discuss Pilot</a>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ border: "1px solid rgba(212,175,55,0.3)", borderRadius: 8, padding: "clamp(28px,4vw,44px)", background: "#FFFFFF" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#765C14", marginBottom: 16 }}>Enterprise and Network Pilots</div>
                <h3 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(18px,2vw,24px)", fontWeight: 400, color: "#1E1E1E", marginBottom: 16, lineHeight: 1.3 }}>For insurers, brokers, contractors, hire firms, solar operators and infrastructure networks.</h3>
                <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, lineHeight: 1.8, color: "#374151", marginBottom: 28 }}>
                  For organisations that own, insure, finance, maintain or move valuable assets and need cleaner records, better evidence and lower resale confidence after theft.
                </p>
                <div style={{ borderTop: "1px solid rgba(212,175,55,0.2)", paddingTop: 20, marginBottom: 24 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555555", marginBottom: 10 }}>Strategic / Enterprise Pricing</div>
                  <div style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 22, fontWeight: 700, color: "#1E1E1E" }}>Scoped per pilot</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, color: "#374151", marginTop: 4 }}>Based on deployment size, forensic chemistry requirements, and batch-control architecture.</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, color: "#555555", marginTop: 8, lineHeight: 1.6 }}>Strategic pilot pricing is set case by case. Contact us to discuss suitability and scope.</div>
                </div>
                <a href="/enterprise" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#1E1E1E", padding: "12px 24px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", borderRadius: 4, border: "1px solid rgba(30,30,30,0.3)" }}>Discuss Strategic Pilot</a>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .two-track-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* PILOT CTA */}
      <section id="pilot-survey" className="mk-survey">
        <div className="mk-survey-inner" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="mk-section-eyebrow">Enterprise Pilot Review</div>
            <h2 className="mk-h2-dark">Build the first credible pilot.</h2>
            <p className="mk-sub-dark" style={{ marginBottom: 36 }}>Mykei is looking for one serious network or enterprise pilot to test asset registration, marking readiness and evidence workflows across 50 to 500 assets.</p>
            <a href="/enterprise" className="mk-submit-btn" style={{ display: "inline-block", textDecoration: "none" }}>Discuss the Pilot</a>
            <p className="mk-form-note" style={{ marginTop: 20 }}>Claim-safe pilot review · Legal and operational scope required · Company No. 16984969</p>
            <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/howitworks" className="mk-learn-btn">See How It Works →</a>
              <a href="/howitworks#demo" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#D4AF37", color: "#050505",
                fontFamily: "'JetBrains Mono',monospace",
                fontWeight: 700, fontSize: 11, letterSpacing: 2,
                textTransform: "uppercase",
                padding: "16px 36px", borderRadius: 8, textDecoration: "none",
                boxShadow: "0 8px 40px rgba(212,168,67,0.35)",
                transition: "all 0.3s ease",
              }}>
                ▶ ADN-1 in Action
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mk-footer">
        <div>
          <img src="/mykei-logo.png" alt="Mykei Securities" style={{ height: 36, width: "auto", objectFit: "contain", marginBottom: 10 }} />
          <div className="mk-footer-name">MYKEI SECURITIES LTD</div>
          <div className="mk-footer-meta">Co. No: 16984969 · Registered in England & Wales · Manchester · Patent application No. 2606630.8 (UK)</div>
          <div className="mk-footer-meta" style={{ marginTop: 6 }}>
            Enterprise &amp; multi-site enquiries: <a href="mailto:protocol@mykei.io" style={{ color: "inherit", textDecoration: "underline" }}>protocol@mykei.io</a>
          </div>
        </div>
        <div className="mk-footer-copy">© 2026 MYKEI SECURITIES LTD. ALL RIGHTS RESERVED.</div>
      </footer>
    </>
  );
}
