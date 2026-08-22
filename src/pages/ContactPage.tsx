import { useEffect } from "react";
import Footer from "@/components/Footer";

const GOLD = "#765C14";
const INK = "#1A1A18";
const PAPER = "#FFFFFF";
const MUTED = "#6B6B65";
const RULE = "#E8E8E4";

function SimpleNav() {
  return (
    <nav aria-label="Site navigation" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 56, padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(250,250,248,0.97)",
      borderBottom: `1px solid ${RULE}`,
      backdropFilter: "blur(12px)",
    }}>
      <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: INK, textDecoration: "none" }}>
        Mykei Securities
      </a>
      <a href="/pilot" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}`, padding: "7px 14px", textDecoration: "none" }}>
        Apply for Pilot
      </a>
    </nav>
  );
}

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact | Mykei Securities Ltd";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Contact Mykei Securities Ltd. Reach Michael Esema directly for pilot enquiries, press, investment, and enterprise deployments of the ADN forensic retail security system.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://mykei.io/contact";
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://mykei.io/contact");
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Contact | Mykei Securities Ltd");
  }, []);

  const contacts = [
    {
      label: "Pilot enquiries",
      desc: "Independent retailers interested in the Mykei Independent Retail Pilot.",
      cta: "Apply via the pilot form",
      href: "/pilot",
      external: false,
    },
    {
      label: "General & press",
      desc: "Media enquiries, interview requests, and general questions.",
      cta: "protocol@mykei.io",
      href: "mailto:protocol@mykei.io",
      // Personal line kept for press/general; protocol@ handles automated flows
      external: true,
    },
    {
      label: "Enterprise",
      desc: "Multi-site retail groups evaluating the ADN at scale.",
      cta: "Enterprise enquiry form",
      href: "/enterprise",
      external: false,
    },
    {
      label: "Investment & partnerships",
      desc: "Corporate venture, innovation scouting, and strategic partners.",
      cta: "Investor enquiry form",
      href: "/investors",
      external: false,
    },
  ];

  return (
    <>
      <SimpleNav />

      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 80 }}>

        <section style={{ maxWidth: 880, margin: "0 auto", padding: "80px 40px 64px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
            Mykei Securities Ltd
          </div>
          <h1 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 400, lineHeight: 1.1, color: INK, marginBottom: 24 }}>
            Get in touch.
          </h1>
          <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.75, maxWidth: 520 }}>
            Michael Esema handles every enquiry directly. No sales team. No automated replies. Choose the right channel below.
          </p>
        </section>

        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {contacts.map((c) => (
              <div key={c.label} style={{ borderTop: `2px solid ${GOLD}`, paddingTop: 24 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
                  {c.label}
                </div>
                <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, marginBottom: 20 }}>{c.desc}</p>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: INK, textDecoration: "underline", letterSpacing: "0.08em" }}
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 72, paddingTop: 48, borderTop: `1px solid ${RULE}` }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>
              Company details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, fontSize: 14, color: MUTED, lineHeight: 1.9 }}>
              <div>
                <strong style={{ color: INK, fontWeight: 500 }}>Mykei Securities Ltd</strong><br />
                Company No. 16984969<br />
                England and Wales
              </div>
              <div>
                <strong style={{ color: INK, fontWeight: 500 }}>Patent</strong><br />
                UK patent application No. 2606630.8<br />
                Patent pending. Filed 23 March 2026.<br />
                <a href="https://michaelesema.com" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "none" }}>michaelesema.com</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        *:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; border-radius: 2px; }
        @media (max-width: 640px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
