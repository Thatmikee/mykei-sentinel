import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

const GOLD = "#C9A84C";
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
        Apply for ADN
      </a>
    </nav>
  );
}

const FACTS = [
  "Global retail theft: $796 billion annually (Global Retail Theft Barometer)",
  "UK retail crime incidents: 5.5 million (BRC Crime Survey, 2026)",
  "Patent: Application No. 2606630.8 (UK IPO), 17 claims, filed 23 March 2026, receipt issued 26 March 2026",
  "Independent Retail Pilot: 2026, pre-pilot conversations open",
  "ADN response time: under 3 seconds from detection to deployment",
  "Pricing to be scoped per pilot",
  "No camera, no biometric data, no facial recognition, no personal data by design",
  "Forensic marker compound: UV-verifiable, batch-identifiable, designed to support evidential workflows",
];

export default function PressPage() {
  useEffect(() => {
    document.title = "Press Kit | Mykei Securities Ltd";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Press kit for Mykei Securities Ltd: founder bio, company facts, logos, and media contact. ADN forensic retail security. Manchester, UK.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://mykei.io/press";
  }, []);

  return (
    <>
      <PageSEO
        title="Press Kit | Mykei Securities Ltd, ADN Forensic Retail Security"
        description="Press resources for Mykei Securities Ltd: founder biography, company fact sheet, product overview, logos, and media contact. ADN forensic retail defence. Manchester, UK. Company No. 16984969."
        canonical="https://mykei.io/press"
        keywords="Mykei Securities press kit, Michael Esema biography, ADN press, retail security media, economic sterilisation press"
      />
      <SimpleNav />
      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 80 }}>

        {/* HEADER */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "80px 40px 64px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
            Media &amp; Press
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.1, color: INK, marginBottom: 24 }}>
            For journalists and media.
          </h1>
          <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.75, maxWidth: 540 }}>
            Founder biography, company facts, product overview, downloadable assets, and direct contact.
            If you are writing about retail crime, forensic security, or the Manchester pilot, start here.
          </p>
        </section>

        {/* FOUNDER BIO */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Founder bio
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: INK, marginBottom: 16 }}>
                Michael Esema
              </h2>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>
                Founder &amp; CEO, Mykei Securities Ltd
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
                Michael Esema is the founder and CEO of Mykei Securities Ltd. He invented the ADN Active Forensic Defence Node, a shelf-mounted IoT device designed to detect bulk-sweep theft events, trigger controlled marker deployment, and log cartridge-linked activations in the Mykei Registry.
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
                In 2025, he coined the doctrine of Economic Sterilisation: the systematic disruption of the resale incentive behind retail theft through forensic marking and registry event records. UK patent application No. 2606630.8.
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
                Before founding Mykei, Michael progressed from Head Accountant to Assistant Manager at B's Hive, where he developed an operational understanding of the financial toll retail theft places on independent businesses. That direct experience shaped every design decision in the ADN.
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                He holds an MSc from Manchester Metropolitan University (2024, Merit), an MBA from the Nigerian Defence Academy (2022), and a BSc from Benson Idahosa University (2018). He is a Lean Six Sigma practitioner, a Level 7 Project Management Advanced Diploma holder, and a recipient of the NUASA Most Auspicious Male Award. The Independent Retail Pilot is open for expressions of interest in 2026.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>
                Short bio (for publication)
              </p>
              <blockquote style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 20, margin: "0 0 28px" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontStyle: "italic", color: INK, lineHeight: 1.7 }}>
                  Michael Esema is the founder and CEO of Mykei Securities Ltd. He invented the ADN, a shelf-mounted active forensic retail defence device designed to detect bulk-sweep theft events, trigger controlled marker deployment, and record cartridge-linked activations in the Mykei Registry. He coined the doctrine of Economic Sterilisation in 2025 (UK patent application No. 2606630.8). A former Head Accountant and Assistant Manager at B's Hive, he holds an MSc from Manchester Metropolitan University, an MBA from the Nigerian Defence Academy, and a BSc from Benson Idahosa University. He is a recipient of the NUASA Most Auspicious Male Award.
                </p>
              </blockquote>
              <a
                href="https://www.linkedin.com/in/michaelesema"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}
              >
                linkedin.com/in/michaelesema
              </a>
            </div>
          </div>
        </section>

        {/* FACT SHEET */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Company fact sheet
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {FACTS.map(fact => (
              <li key={fact} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: `1px solid ${RULE}`, fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
                <span style={{ color: GOLD, minWidth: 12, lineHeight: "1.5em" }}>+</span>
                {fact}
              </li>
            ))}
          </ul>
        </section>

        {/* DOWNLOADABLE ASSETS */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Downloadable assets
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div>
              <div style={{ background: "#0A0D09", padding: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, height: 120 }}>
                <img src="/logo.png" alt="Mykei Securities logo on dark background" style={{ height: 48, objectFit: "contain" }} />
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 8 }}>Primary logo</p>
              <a
                href="/mykei-logo.png"
                download
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}
              >
                Download logo
              </a>
            </div>
            <div>
              <div style={{ background: "#0A0D09", borderRadius: 8, overflow: "hidden", marginBottom: 12, height: 120, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <img src="/social-share.png" alt="Mykei Securities social share image" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 8 }}>Social share image (1200 x 630)</p>
              <a
                href="/social-share.png"
                download
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}
              >
                Download image
              </a>
            </div>
          </div>
          <div style={{ marginTop: 32, paddingTop: 32, borderTop: `1px solid ${RULE}` }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>Doctrine</p>
            <a
              href="/economic-sterilisation"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}
            >
              Read Economic Sterilisation
            </a>
          </div>
        </section>

        {/* RESEARCH & ANALYSIS */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Research &amp; analysis
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                href: "/blog/the-796-billion-problem",
                date: "April 2026",
                tag: "Retail Economics",
                title: "The $796 Billion Problem",
                sub: "Retail theft is not a crime problem. It is an economics problem. Every solution the industry has tried is fighting the wrong battle.",
              },
              {
                href: "/blog/beyond-the-buzzer",
                date: "April 2026",
                tag: "Forensic Security",
                title: "Beyond the Buzzer",
                sub: "The EAS tag and the security buzzer have been the frontline of retail theft prevention for forty years. They have failed. Here is what works instead.",
              },
            ].map(({ href, date, tag, title, sub }) => (
              <a
                key={href}
                href={href}
                style={{ display: "block", padding: "28px 0", borderBottom: `1px solid ${RULE}`, textDecoration: "none", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD }}>{tag}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: MUTED, opacity: 0.6 }}>{date}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 400, color: INK, marginBottom: 8, lineHeight: 1.2 }}>{title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, maxWidth: 560, margin: 0 }}>{sub}</p>
              </a>
            ))}
            <div style={{ paddingTop: 20 }}>
              <a href="/blog" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}>
                All research →
              </a>
            </div>
          </div>
        </section>

        {/* MEDIA CONTACT */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px 96px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Media contact
          </div>
          <div style={{ maxWidth: 480 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: INK, marginBottom: 16 }}>
              Get in touch.
            </h2>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 24 }}>
              We aim to respond to media enquiries within 24 hours. For interview requests, comment on retail crime data, or access to the ADN technical specification, contact the press team directly.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="mailto:protocol@mykei.io" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.1em", color: GOLD, textDecoration: "none" }}>
                protocol@mykei.io
              </a>
              <a href="https://www.linkedin.com/in/michaelesema" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.1em", color: MUTED, textDecoration: "none" }}>
                linkedin.com/in/michaelesema
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        *:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        @media (max-width: 640px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
