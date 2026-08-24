import { useState, useEffect, useRef } from "react";
import PageSEO from "@/components/PageSEO";

/* ── SCROLL REVEAL ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced motion, and never leave content permanently hidden if the
    // observer never fires (offscreen full page capture, print, prerender).
    if (typeof window !== "undefined" &&
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    const fallback = window.setTimeout(() => { setVisible(true); obs.disconnect(); }, 2000);
    return () => { window.clearTimeout(fallback); obs.disconnect(); };
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
    ["ADN", "/adn"],
    ["How It Works", "/howitworks"],
    ["Economic Sterilisation", "/economic-sterilisation"],
    ["Signal", "/signal"],
  ];

  return (
    <>
      <PageSEO
        title="Mykei Securities | Shelf Level Retail Defence"
        description="Mykei Securities is developing ADN, a shelf level retail defence device in prototype: event detection, controlled marker deployment, and Mykei Registry event records. Pre-pilot, UK patent pending."
        canonical="https://mykei.io"
        ogImageAlt="Mykei Securities ADN shelf level retail defence prototype"
        keywords="Mykei Securities, ADN, retail theft prevention, shelf-level retail security, controlled marker deployment, Mykei Registry, Economic Sterilisation, shoplifting prevention, organised retail crime, no-camera retail security"
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
                "description": "Michael Esema is the founder of Mykei Securities Ltd and the originator of Economic Sterilisation, a retail crime prevention doctrine based on disrupting the resale incentive behind retail theft. UK patent application No. 2606630.8, pending, not granted.",
                "knowsAbout": ["Economic Sterilisation", "retail crime prevention", "forensic marking", "IoT retail security", "independent retail", "organised retail crime", "controlled marker deployment"]
              },
              "description": "Mykei Securities Ltd is a UK retail defence company developing ADN, a shelf level prototype device intended to link event detection, controlled marker deployment, and Mykei Registry event records to support verification workflows. Pre-revenue and pre-pilot.",
              "address": { "@type": "PostalAddress", "addressLocality": "Manchester", "addressCountry": "GB" },
              "knowsAbout": ["Retail theft prevention", "Forensic retail defence", "Shelf level retail security", "Controlled marker deployment", "Mykei Registry", "Economic Sterilisation", "Shoplifting prevention", "Organised retail crime", "Bulk sweep theft", "Retail shrinkage", "No camera retail security", "Independent retail pilots", "Enterprise loss prevention"],
              "sameAs": ["https://mykei.io"]
            },
            {
              "@type": "WebSite",
              "@id": "https://mykei.io/#website",
              "url": "https://mykei.io",
              "name": "Mykei Securities",
              "description": "Shelf level retail defence in development. ADN is designed to link shelf events, controlled marker deployment, and registry records.",
              "publisher": { "@id": "https://mykei.io/#org" },
              "inLanguage": "en-GB"
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://mykei.io/#localbusiness",
              "name": "Mykei Securities Ltd",
              "description": "UK retail security company developing ADN and the Economic Sterilisation doctrine, based in Greater Manchester.",
              "url": "https://mykei.io",
              "email": "protocol@mykei.io",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Manchester",
                "addressRegion": "Greater Manchester",
                "addressCountry": "GB"
              },
              "geo": { "@type": "GeoCoordinates", "latitude": "53.5215", "longitude": "-2.2814" },
              "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
              "sameAs": ["https://mykei.io", "https://www.linkedin.com/company/mykei-securities"]
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
        .mk-nav-brand-name { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #111318; line-height: 1; }
        .mk-nav-brand-sub { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase; color: #D8001F; }
        .mk-nav-links { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; }
        .mk-nav-links a { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: #5C4639; padding: 4px 16px; transition: color 0.15s; }
        .mk-nav-links a:hover { color: #111318; }
        .mk-nav-cta { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; background: #111318; padding: 9px 20px; border: 1px solid #111318; transition: background 0.2s, color 0.2s; }
        .mk-nav-cta:hover { background: #D8001F; border-color: #D8001F; color: #111318; }
        .mk-more-wrap { position: relative; display: inline-flex; align-items: center; margin-left: 8px; }
        .mk-more-btn { background: none; border: 1px solid #E8E8E8; border-radius: 6px; cursor: pointer; padding: 6px 14px; display: inline-flex; align-items: center; gap: 5px; transition: border-color 0.15s; font-family: 'Sora', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #1A1A1A; }
        .mk-more-btn:hover { border-color: #D8001F; color: #D8001F; }
        .mk-more-menu { position: absolute; top: calc(100% + 8px); right: 0; min-width: 220px; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); z-index: 200; padding: 8px 0; }
        .mk-more-menu a { display: block; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #111318; text-decoration: none; padding: 9px 18px; transition: background 0.12s; }
        .mk-more-menu a:hover { background: #FFFFFF; color: #D8001F; }
        .mk-more-divider { height: 1px; background: #E8E8E8; margin: 6px 0; }
        .mk-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        .mk-hamburger span { display: block; width: 22px; height: 1.5px; background: #111318; }

        /* ── HERO ── */
        .mk-hero {
          min-height: 78svh; display: flex; align-items: center;
          padding: 96px 52px 56px; position: relative; overflow: hidden; background: #fff;
        }
        .mk-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: none; /* removed: decorative hairline grid, organised no content */
          --removed-grid: linear-gradient(transparent 1px, transparent 1px),
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
        .mk-badge-sep { width: 1px; height: 12px; background: rgba(216,0,31,0.5); }
        .mk-badge-status { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #555555; letter-spacing: 0.8px; display: flex; align-items: center; gap: 5px; }
        .mk-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #D8001F; }

        /* Identity headline */
        .mk-hero-identity {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(38px, 5vw, 64px);
          font-weight: 700; line-height: 1.08; letter-spacing: -1px; color: #111318; margin-bottom: 10px;
        }
        .mk-identity-accent { color: #D8001F; }
        .mk-identity-rule { display: block; width: 44px; height: 3px; background: #D8001F; border-radius: 2px; margin: 20px 0 22px; }

        .mk-hero-descriptor {
          font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: 1.5px;
          text-transform: uppercase; color: #475569; margin-bottom: 28px;
        }

        .mk-hero-body {
          font-size: 17px; line-height: 1.8; color: #475569; max-width: 650px; margin-bottom: 34px;
        }
        .mk-hero-body strong { color: #111318; font-weight: 600; }

        .mk-hero-actions {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .mk-btn-primary {
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600;
          color: #fff; background: #111318; padding: 13px 28px; border-radius: 7px;
          display: inline-flex; align-items: center; gap: 8px; transition: all 0.22s;
        }
        .mk-btn-primary:hover { background: #D8001F; }
        .mk-btn-secondary {
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 500;
          color: #111318; border: 1.5px solid #dde4ef; padding: 12px 28px; border-radius: 7px; transition: all 0.2s;
        }
        .mk-btn-secondary:hover { border-color: #111318; background: #f8f9fc; }

        .mk-hero-proof {
          display: flex; align-items: center; gap: 18px; margin-top: 24px; flex-wrap: wrap;
        }
        .mk-proof-item { display: flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #475569; }
        .mk-proof-check { width: 15px; height: 15px; border-radius: 50%; background: #f0faf4; border: 1px solid #86efac; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #16a34a; flex-shrink: 0; }

        /* ── PROOF BAR ── */
        .mk-proof-bar {
          background: #F8F8F8;
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
        .mk-proof-bar-dot { width: 7px; height: 7px; border-radius: 50%; background: #D8001F; flex-shrink: 0; }
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
          color: #D8001F; flex-shrink: 0;
        }
        .mk-proof-text { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 0.8px; color: #555; line-height: 1.5; }
        .mk-proof-text strong { color: #111318; font-weight: 700; display: block; font-size: 11px; }

        /* ── IN-STORE REALITY ── */
        .mk-reality {
          background: #FFFFFF; padding: 72px 52px;
          border-bottom: 1px solid rgba(216,0,31,0.15);
        }
        .mk-reality-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .mk-reality-img {
          border: 1px solid rgba(216,0,31,0.3); border-radius: 10px;
          background: rgba(216,0,31,0.06);
          aspect-ratio: 4/3; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          position: relative; overflow: hidden;
        }
        .mk-reality-img::before {
          content: ''; position: absolute; inset: 0;
          background-image: none; /* removed: decorative hairline grid */
          --removed-grid-2: linear-gradient(transparent 1px, transparent 1px),
                            linear-gradient(90deg, rgba(216,0,31,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .mk-reality-placeholder { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #D8001F; text-align: center; position: relative; z-index: 1; }
        .mk-reality-placeholder-icon { font-size: 32px; opacity: 0.3; margin-bottom: 4px; }
        .mk-reality-caption { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.5px; color: #555555; text-align: center; margin-top: 10px; font-style: italic; }

        /* ── COMMERCIAL READINESS ── */
        .mk-commercial {
          background: #fff; padding: 72px 52px;
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
          color: #D8001F; background: #FFFFFF;
        }
        .mk-commercial-label { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 0.8px; text-transform: uppercase; color: #111318; font-weight: 600; margin-bottom: 4px; }
        .mk-commercial-sub { font-size: 11.5px; color: #64748b; line-height: 1.5; }

        /* ── DESIGNED FOR ── */
        .mk-designed { background: #FFFFFF; padding: 72px 52px; }
        .mk-designed-inner { max-width: 1100px; margin: 0 auto; }
        .mk-designed-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
        .mk-designed-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 20px 24px; background: rgba(255,255,255,0.6);
          border: 1px solid rgba(216,0,31,0.2); border-radius: 8px;
        }
        .mk-designed-check { width: 20px; height: 20px; border-radius: "50%"; background: rgba(216,0,31,0.15); border: 1px solid rgba(216,0,31,0.4); display: flex; align-items: center; justify-content: center; font-size: 10px; color: #555555; flex-shrink: 0; margin-top: 2px; }
        .mk-designed-text { font-size: 14px; color: #111318; line-height: 1.6; font-weight: 500; }

        /* ── WHY NOW ── */
        .mk-why-now {
          background: #F4F6F8; padding: 72px 52px;
        }
        .mk-why-now-inner { max-width: 1100px; margin: 0 auto; }
        .mk-why-now-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
        .mk-why-now-item {
          display: flex; align-items: flex-start; gap: 14px; padding: 20px 24px;
          border-left: 3px solid #D8001F; background: #FFFFFF; border-radius: 0 6px 6px 0;
        }
        .mk-why-now-text { font-size: 14px; color: #111318; line-height: 1.65; }

        /* ── TRUST BAR (legacy, removed) ── */
        .mk-trust { display: none; }
        .mk-trust-item { display: none; }
        .mk-trust-sep { display: none; }

        /* ── MARKET ── */
        .mk-market { background: #FFFFFF; padding: 96px 52px; position: relative; }
        .mk-market-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
        .mk-section-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 2.5px; text-transform: uppercase; color: #D8001F; margin-bottom: 14px; }
        .mk-h2-light { font-family: 'Sora', system-ui, sans-serif; font-size: clamp(30px,3.8vw,50px); font-weight: 700; color: #fff; letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.08; }
        .mk-sub-light { font-size: 16px; color: rgba(255,255,255,0.78); max-width: 520px; line-height: 1.7; margin-bottom: 52px; }

        /* Stat cards */
        .mk-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 48px; }
        .mk-stat-card {
          background: #FFFFFF;
          border: 1px solid #E8E8E8; border-radius: 8px; padding: 32px 24px;
        }
        .mk-stat-card:hover { border-color: #D8001F; }
        .mk-stat-num { font-size: 38px; font-weight: 800; color: #D8001F; letter-spacing: -1px; line-height: 1; }
        .mk-stat-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.8px; text-transform: uppercase; color: #64748b; margin-top: 10px; line-height: 1.6; }
        .mk-market-note { background: #F8F8F8; border: 1px solid #E8E8E8; border-left: 4px solid #D8001F; padding: 20px 24px; border-radius: 8px; font-size: 15px; color: #374151; line-height: 1.75; max-width: 760px; }
        .mk-market-note strong { color: #1A1A1A; font-weight: 700; }

        /* ── TECH ── */
        .mk-tech {
          padding: 96px 52px;
          background: #F4F6F8;
          position: relative;
        }
        .mk-tech-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
        .mk-tech-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-bottom: 28px; }
        .mk-tech-card {
          border: 1px solid #E8E8E8; border-radius: 8px; padding: 28px;
          background: #FFFFFF;
          transition: border-color 0.2s ease;
        }
        .mk-tech-card:hover { border-color: #D8001F; }
        .mk-tech-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 1px; color: #D8001F; border: 1px solid rgba(216,0,31,0.4); padding: 3px 10px; border-radius: 100px; margin-bottom: 16px; }
        .mk-tech-title { font-size: 15px; font-weight: 700; color: #111318; margin-bottom: 10px; }
        .mk-tech-desc { font-size: 13px; color: #64748b; line-height: 1.65; margin-bottom: 20px; }
        .mk-tech-specs { border-top: 1px solid #E8E8E8; padding-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .mk-spec-key { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.8px; text-transform: uppercase; color: #475569; }
        .mk-spec-val { font-size: 12px; font-weight: 700; color: #1A1A1A; margin-top: 1px; }
        .mk-tech-note { background: rgba(216,0,31,0.08); border: 1px solid rgba(216,0,31,0.25); border-left: 3px solid #D8001F; padding: 14px 18px; border-radius: 4px; font-size: 14px; color: #374151; line-height: 1.6; }
        .mk-tech-note strong { color: #111318; }
        .mk-h2-dark  { font-family: 'Sora', system-ui, sans-serif; font-size: clamp(30px,3.8vw,50px); font-weight: 700; color: #1E1E1E; letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.08; }
        .mk-sub-dark  { font-size: 16px; color: #64748b; max-width: 520px; line-height: 1.7; margin-bottom: 52px; }

        /* ── SURVEY ── */
        .mk-survey {
          padding: 96px 52px;
          background: #fff;
          position: relative; overflow: hidden;
        }
        .mk-survey::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 50% 60% at 50% 0%, rgba(216,0,31,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 10% 100%, rgba(74,32,8,0.06) 0%, transparent 50%);
        }
        .mk-survey-inner { max-width: 600px; margin: 0 auto; }
        .mk-submit-btn { background: #111318; color: #fff; border: none; padding: 14px 32px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 6px; font-family: 'Sora', sans-serif; transition: all 0.2s; }
        .mk-submit-btn:hover { background: #D8001F; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(216,0,31,0.28); }
        .mk-form-note { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #475569; text-align: center; letter-spacing: 0.5px; }

        /* ── FOOTER ── */
        .mk-footer { padding: 28px 52px; background: #fff; border-top: 1px solid #E8E8E8; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .mk-footer-name { font-size: 12px; font-weight: 700; letter-spacing: 0.5px; color: #111318; }
        .mk-footer-meta { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #555555; letter-spacing: 0.5px; margin-top: 2px; }
        .mk-footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #475569; letter-spacing: 0.5px; }

        /* ── MOBILE ── */
        .mk-mobile-menu { background: #fff; border-bottom: 1px solid #e2e8f3; padding: 16px 24px; display: flex; flex-direction: column; gap: 4px; }
        .mk-mobile-link { font-size: 15px; font-weight: 500; color: #111318; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .mk-mobile-cta { font-size: 14px; font-weight: 700; color: #fff; background: #111318; padding: 12px; border-radius: 6px; text-align: center; margin-top: 8px; }

        @media (max-width: 1024px) {
          .mk-hero-inner { grid-template-columns: 1fr; }
          .mk-stats-grid { grid-template-columns: 1fr 1fr; }
          .mk-tech-grid { grid-template-columns: 1fr; }
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
          color: #D8001F;
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
          .mk-proof-bar-label { border-right: none; border-bottom: 1px solid rgba(216,0,31,0.2); padding: 16px 0; }
          .mk-proof-bar-items { padding: 16px 0; flex-wrap: wrap; gap: 12px; }
          .mk-proof-bar-item { border-right: none; padding: 4px 0; margin-right: 0; }
        }
        @media (max-width: 768px) {
          .mk-nav { padding: 0 20px; }
          .mk-nav-links, .mk-nav-cta, .mk-more-wrap { display: none; }
          .mk-hamburger { display: flex; }
          .mk-hero { min-height: auto; padding: 88px 24px 48px; }
          .mk-hero-identity { font-size: clamp(33px, 8.7vw, 38px); letter-spacing: -1.2px; }
          .mk-market, .mk-tech, .mk-survey { padding: 64px 24px; }
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
            <span className="mk-nav-brand-sub">Shelf Level Retail Defence</span>
          </div>
        </a>
        <ul className="mk-nav-links">
          {navLinks.map(([label, href]) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
        </ul>
        <a href="/contact" className="mk-nav-cta">Contact</a>
        <div className="mk-more-wrap">
          <button className="mk-more-btn" onClick={() => setMoreOpen(v => !v)} aria-label="More pages">
            More <span style={{ fontSize: 10, lineHeight: 1 }}>▾</span>
          </button>
          {moreOpen && (
            <div className="mk-more-menu" onMouseLeave={() => setMoreOpen(false)}>
              <a href="/enterprise" onClick={() => setMoreOpen(false)}>Enterprise</a>
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
          <a href="/adn" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>ADN Device</a>
          <a href="/howitworks" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="/economic-sterilisation" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Economic Sterilisation</a>
          <div style={{ height: 1, background: "#E8E8E8", margin: "6px 0" }} />
          <a href="/enterprise" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Enterprise</a>
          <a href="/signal" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Signal</a>
          <a href="/certification" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Certification</a>
          <a href="/contact" className="mk-mobile-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/contact" className="mk-mobile-cta" onClick={() => setMenuOpen(false)}>Contact</a>
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
                <div className="mk-badge-dot" />Prototype stage. Pilot conversations open.
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
              Mykei is developing ADN, a shelf level device designed to turn a theft event into a marker and a registry record. No cameras. No biometric data. The aim is to make stolen stock harder to move. ADN is a working prototype and is not yet deployed in stores.
            </p>

            <p ref={statsReveal.ref} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#4A4F58", marginBottom: 28 }}>
              £{(b42/10).toFixed(1)}B lost to retail theft annually in the UK, reported industry figure, not independently verified by Mykei.
            </p>

            <div className="mk-hero-actions">
              <a href="/contact" className="mk-btn-primary">Contact us</a>
            </div>

            <div className="mk-hero-proof">
              {["No cameras", "Non-confrontational by design", "No biometric data"].map(p => (
                <div className="mk-proof-item" key={p}>
                  <div className="mk-proof-check">✓</div>{p}
                </div>
              ))}
            </div>

            {/* Compact stats retained for narrow fallback layouts */}
            <div className="mk-tablet-stats">
              {[
                { num: "£2.2B", label: "Reported annual\ncost of retail theft" },
                { num: "20M+", label: "Reported theft\nincidents in a year" },
                { num: "Prototype", label: "Bench stage,\nnot yet in stores" },
                { num: "Signed", label: "Non-binding letters\nof intent, Mar 2026" },
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
              <div className="mk-proof-bar-status">Pilot Conversations Open</div>
              <div className="mk-proof-bar-sub">Pre-pilot. Greater Manchester.</div>
            </div>
          </div>
          <div className="mk-proof-bar-items">
            {[
              { icon: "01", strong: "Patent Pending", text: "UK application No. 2606630.8, not granted" },
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
            <div className="mk-section-eyebrow">Why your shop needs this</div>
            <h2 className="mk-h2-dark" style={{ marginBottom: 40 }}>Cameras record theft. Mykei is trying something different.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginBottom: 40 }}>
              {[
                { icon: "◉", point: "CCTV shows you what happened.", sub: "It does not prevent the next one. Footage without outcomes is not security." },
                { icon: "◎", point: "Stolen goods still find buyers.", sub: "Mykei is designed to reduce resale confidence by linking shelf events to marker and registry records. Resale value reduction has not yet been measured in the field." },
                { icon: "◈", point: "Staff confrontation is dangerous.", sub: "ADN is designed for non-confrontational shelf defence without cameras, facial recognition, or biometric data." },
              ].map(({ icon, point, sub }) => (
                <div key={point} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#D8001F", fontSize: 13, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 14, color: "#111318", marginBottom: 6 }}>{point}</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="/howitworks#faq" style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 2,
              color: "#D8001F", textDecoration: "none", textTransform: "uppercase" as const,
              borderBottom: "1px solid rgba(176,120,32,0.4)", paddingBottom: 2,
            }}>
              Frequently Asked Questions →
            </a>
          </Reveal>
        </div>
      </section>

      {/* TECHNOLOGY (short) */}
      <section id="adn-system" className="mk-tech">
        <div className="mk-tech-inner">
          <Reveal>
            <div className="mk-section-eyebrow">How It Works</div>
            <h2 className="mk-h2-dark">Three parts, working together.</h2>
            <p className="mk-sub-dark" style={{ marginBottom: 0 }}>Detect the shelf event. Mark the goods. Create the record. Reduce resale confidence without staff confrontation. Full technical detail, specs, and commercial model are on the ADN and How It Works pages.</p>
          </Reveal>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" as const }}>
            <a href="/adn" style={{
              display: "inline-flex", alignItems: "center",
              fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 1.5,
              color: "#D8001F", textDecoration: "none",
              borderBottom: "1px solid rgba(212,168,67,0.3)", paddingBottom: 2,
            }}>View ADN in detail →</a>
            <a href="/howitworks" style={{
              display: "inline-flex", alignItems: "center",
              fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 1.5,
              color: "#D8001F", textDecoration: "none",
              borderBottom: "1px solid rgba(212,168,67,0.3)", paddingBottom: 2,
            }}>See How It Works →</a>
          </div>
        </div>
      </section>

      {/* PILOT CTA */}
      <section id="pilot-survey" className="mk-survey">
        <div className="mk-survey-inner" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="mk-section-eyebrow">Independent retail. Pilot applications closed.</div>
            <h2 className="mk-h2-dark">We are not taking pilot applications.</h2>
            <p className="mk-sub-dark" style={{ marginBottom: 36 }}>ADN is a prototype and Mykei is not running store deployments at present. If you want to follow the work, or you are a retailer who would like to hear when that changes, write to us and we will keep you posted.</p>
            <a href="/contact" className="mk-submit-btn" style={{ display: "inline-block", textDecoration: "none" }}>Contact us</a>
            <p className="mk-form-note" style={{ marginTop: 20 }}>No obligation, and no commitment either way.</p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mk-footer">
        <div>
          <img src="/mykei-logo.png" alt="Mykei Securities" style={{ height: 36, width: "auto", objectFit: "contain", marginBottom: 10 }} />
          <div className="mk-footer-name">MYKEI SECURITIES LTD</div>
          <div className="mk-footer-meta">Co. No: 16984969. Registered in England &amp; Wales. UK patent application No. 2606630.8, patent pending.</div>
          <div className="mk-footer-meta" style={{ marginTop: 6 }}>
            Enterprise &amp; multi-site enquiries: <a href="mailto:protocol@mykei.io" style={{ color: "inherit", textDecoration: "underline" }}>protocol@mykei.io</a>
          </div>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginTop: 14 }}>
            {[
              { href: "/adn", label: "ADN" },
              { href: "/signal", label: "Signal" },
              { href: "/certification", label: "Certification" },
              { href: "/state-of-theft", label: "State of Theft" },
              { href: "/glossary/economic-sterilisation", label: "Doctrine" },
              { href: "/contact", label: "Contact" },
              { href: "/founder", label: "Michael Esema" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#555555", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mk-footer-copy">© 2026 MYKEI SECURITIES LTD. ALL RIGHTS RESERVED.</div>
      </footer>
    </>
  );
}
