import { useState } from "react";
import { GoldShelfBackground } from "@/components/GoldShelfBackground";

const NAVY = "#0f1f3d";
const BLUE = "#2563eb";
const GOLD = "#c9a84c";
const WHITE = "#ffffff";
const LIGHT = "#f5f7fa";
const BORDER = "#dde4ef";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; }
  html { scroll-behavior: smooth; }
  a { text-decoration: none; }
  @media (max-width: 768px) {
    .nav-links { display: none !important; }
    .hero-section { padding: 4rem 1.5rem 3rem !important; }
    .two-col { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .tech-grid { grid-template-columns: 1fr !important; }
    .section-pad { padding: 3rem 1.5rem !important; }
    .footer-inner { flex-direction: column !important; align-items: flex-start !important; }
  }
`;

export default function Index() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      setSubmitted(true);
    } catch {
      alert("Submission failed. Please email protocol@mykei.io directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    ["ADN-1 SYSTEM", "#adn-1-system"],
    ["MARKET CASE", "#market-case"],
    ["FOUNDER", "#founder"],
    ["SURVEY", "/survey"],
  ];

  return (
    <>
      <GoldShelfBackground />
      <style>{globalStyles}</style>
      <div style={{ position: "relative", zIndex: 1, fontFamily: "'Inter', sans-serif", background: "transparent", color: NAVY, minHeight: "100vh" }}>

        {/* NAV */}
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2.5rem", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: WHITE, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img src="/logo.png" alt="Mykei Securities" style={{ height: "34px", width: "auto" }} />
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: NAVY }}>MYKEI SECURITIES LTD</div>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.1em", color: BLUE }}>FORENSIC INFRASTRUCTURE</div>
            </div>
          </div>

          {/* Desktop links */}
          <div className="nav-links" style={{ display: "flex", gap: "0.3rem" }}>
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} style={{
                fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em",
                color: NAVY, padding: "0.45rem 0.9rem", borderRadius: "4px",
                border: `1px solid transparent`, transition: "all 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = GOLD;
                  e.currentTarget.style.color = GOLD;
                  e.currentTarget.style.boxShadow = `0 0 8px rgba(201,168,76,0.25)`;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.color = NAVY;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >{label}</a>
            ))}
            <a href="/survey" style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em",
              color: WHITE, padding: "0.45rem 1.1rem", borderRadius: "4px",
              background: NAVY, border: `1px solid ${GOLD}`,
              boxShadow: `0 0 10px rgba(201,168,76,0.3)`,
              fontFamily: "'Inter', sans-serif",
            }}
              onMouseOver={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.borderColor = GOLD; }}
              onMouseOut={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.borderColor = GOLD; }}
            >REQUEST PILOT →</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}
            className="mobile-menu-btn">
            <div style={{ width: 22, height: 2, background: NAVY, marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: NAVY, marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: NAVY }} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ fontSize: "0.85rem", fontWeight: 600, color: NAVY, padding: "0.5rem 0", borderBottom: `1px solid ${BORDER}` }}>
                {label}
              </a>
            ))}
            <a href="/survey" style={{ fontSize: "0.85rem", fontWeight: 700, color: WHITE, background: NAVY, padding: "0.7rem 1rem", borderRadius: "4px", border: `1px solid ${GOLD}`, textAlign: "center" }}>
              REQUEST PILOT →
            </a>
          </div>
        )}

        {/* HERO */}
        <section className="hero-section" style={{ padding: "6rem 2.5rem 5rem", maxWidth: "960px", margin: "0 auto" }}>
          <img src="/logo.png" alt="Mykei" style={{ height: "64px", marginBottom: "2rem", display: "block" }} />
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "1.2rem", fontWeight: 600 }}>ACTIVE FORENSIC DEFENCE · MANCHESTER, UK</p>
          <h1 style={{
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: "1.2rem",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.02em",
            color: NAVY,
            textShadow: `2px 2px 0px rgba(201,168,76,0.15), 0 0 40px rgba(201,168,76,0.08)`,
          }}>
            <span style={{ color: GOLD, textShadow: `0 0 30px rgba(201,168,76,0.5), 2px 2px 0px rgba(201,168,76,0.3)` }}>Stolen.</span>{" "}
            <span style={{ color: NAVY, textShadow: `0 0 30px rgba(37,99,235,0.2)` }}>Marked.</span>{" "}
            <span style={{ color: BLUE, textShadow: `0 0 30px rgba(37,99,235,0.3)` }}>Worthless.</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontWeight: 600, color: NAVY, marginBottom: "1.5rem", maxWidth: "560px", lineHeight: 1.4 }}>
            Turning stolen goods into <span style={{ color: GOLD }}>toxic liabilities,</span> automatically, at the point of theft.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#475569", maxWidth: "600px", lineHeight: 1.8, marginBottom: "2rem", fontWeight: 400 }}>
            Organised retail crime costs UK businesses <strong style={{ color: NAVY }}>£4.2 billion every year</strong> — not because retailers aren't spending on security, but because no system has ever attacked the one thing that makes theft rational: <strong style={{ color: NAVY }}>the ability to resell stolen goods.</strong>
          </p>
          <p style={{ fontSize: "1rem", color: "#475569", maxWidth: "580px", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            The ADN-1 changes that. The moment theft occurs, our system applies an invisible forensic marker and registers the item as <strong style={{ color: NAVY }}>Toxic Inventory</strong> — commercially worthless, legally traceable, and blocked from resale platforms automatically.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/survey" style={{ background: NAVY, color: WHITE, padding: "0.9rem 2rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.85rem", border: `1px solid ${GOLD}`, boxShadow: `0 0 16px rgba(201,168,76,0.25)`, letterSpacing: "0.05em" }}>
              REQUEST PILOT ACCESS →
            </a>
            <a href="#adn-1-system" style={{ color: NAVY, padding: "0.9rem 2rem", borderRadius: "4px", fontWeight: 600, fontSize: "0.85rem", border: `1px solid ${BORDER}`, letterSpacing: "0.05em" }}>
              SEE THE TECHNOLOGY
            </a>
          </div>
        </section>

        {/* MARKET CASE */}
        <section id="market-case" className="section-pad" style={{ background: NAVY, padding: "5rem 2.5rem", borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "0.5rem", fontWeight: 600 }}>THE MARKET PROBLEM</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: WHITE, marginBottom: "2.5rem" }}>The £4.2 Billion Crisis</h2>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.2rem", marginBottom: "3rem" }}>
              {[
                { stat: "£4.2B", label: "Total UK retail crime cost (2025/26)" },
                { stat: "£2.2B", label: "Direct customer theft losses" },
                { stat: "20M+", label: "Theft incidents recorded last year" },
                { stat: "£1.8B", label: "Spent on passive security, yet losses continue to rise" },
              ].map(({ stat, label }) => (
                <div key={stat} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(201,168,76,0.3)`, borderTop: `3px solid ${GOLD}`, padding: "1.2rem", borderRadius: "4px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: GOLD }}>{stat}</div>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "0.3rem", lineHeight: 1.5 }}>{label}</div>
                </div>
              ))}
            </div>
            <p style={{ color: "#94a3b8", maxWidth: "680px", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Existing tools like CCTV, guards and EAS tags observe crime but leave the incentive structure untouched.{" "}
              <strong style={{ color: WHITE }}>As long as stolen goods retain resale value, theft remains rational.</strong>{" "}
              Mykei removes that value at the point of theft.
            </p>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section id="adn-1-system" className="section-pad" style={{ padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "0.5rem", fontWeight: 600 }}>DEFENCE ARCHITECTURE</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: NAVY, marginBottom: "0.5rem" }}>The Technology</h2>
            <p style={{ color: "#475569", marginBottom: "3rem", maxWidth: "560px", lineHeight: 1.7 }}>
              Integrated hardware and cloud infrastructure designed for one purpose:{" "}
              <strong>Economic Sterilization</strong> — marking high-value stock with forensic DNA mist to eliminate resale value.
            </p>
            <div className="tech-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
              {[
                { tag: "ADN-1", title: "Active Deterrence Node", desc: "Shelf-integrated unit using 940nm VCSEL Time-of-Flight sensors to detect bulk sweep behaviour with sub-200ms response. On trigger: piezoelectric atomization deploys invisible synthetic DNA forensic mist.", specs: [["SENSOR","VL53L0X ToF"],["LASER","940nm VCSEL"],["RESPONSE","<200ms"],["PROCESSOR","Dual-core ESP32"]] },
                { tag: "ATS", title: "Alarm Transmission System", desc: "Encrypted cloud layer transmitting real-time theft alerts to the management dashboard. TLS 1.3 secured forensic event packages, fully admissible as UK legal evidence.", specs: [["PROTOCOL","TLS 1.3"],["LATENCY","<50ms"],["UPTIME","99.99%"],["ENCRYPTION","AES-256-GCM"]] },
                { tag: "FDT", title: "Forensic Digital Twin", desc: "Every marked item is cryptographically logged as Toxic Inventory. API hooks to resale platforms flag or remove listings matching theft events in our registry.", specs: [["REGISTRY","AWS IoT Core"],["STANDARD","ISO 27001"],["GDPR","Privacy-by-Design"],["LOG","Immutable Audit Trail"]] },
              ].map(({ tag, title, desc, specs }) => (
                <div key={tag} style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${GOLD}`, padding: "1.5rem", background: WHITE, borderRadius: "4px" }}>
                  <span style={{ fontSize: "0.6rem", border: `1px solid ${GOLD}`, color: GOLD, padding: "2px 8px", borderRadius: "20px", fontWeight: 600 }}>{tag}</span>
                  <h3 style={{ margin: "0.8rem 0 0.5rem", fontSize: "1rem", fontWeight: 700, color: NAVY }}>{title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.6, marginBottom: "1rem" }}>{desc}</p>
                  <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                    {specs.map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: "0.55rem", color: "#94a3b8", letterSpacing: "0.08em" }}>{k}</div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: BLUE }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: LIGHT, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${GOLD}`, padding: "1rem 1.5rem", fontSize: "0.85rem", borderRadius: "2px" }}>
              <span style={{ color: GOLD, fontWeight: 700 }}>KEY OUTCOME: </span>
              <span style={{ color: "#475569" }}>Forensic DNA marking eliminates resale value at point of theft. Privacy-by-Design — no facial recognition, no personal data captured.</span>
            </div>
          </div>
        </section>

        {/* TECH SPECS */}
        <section className="section-pad" style={{ background: LIGHT, padding: "5rem 2.5rem", borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "0.5rem", fontWeight: 600 }}>SYSTEM SPECIFICATIONS</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: NAVY, marginBottom: "2rem" }}>Technical Specs</h2>
            <div style={{ background: NAVY, color: "#e0e0e0", padding: "2rem", borderRadius: "8px", maxWidth: "560px", fontSize: "0.85rem", border: `1px solid rgba(201,168,76,0.3)`, fontFamily: "'Courier New', monospace" }}>
              <div style={{ marginBottom: "1.2rem", paddingBottom: "0.8rem", borderBottom: "1px solid rgba(201,168,76,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.68rem", color: "#64748b", letterSpacing: "0.1em" }}>ADN-1_SPEC_SHEET.cfg</span>
                <span style={{ fontSize: "0.6rem", color: GOLD, letterSpacing: "0.08em" }}>VERIFIED</span>
              </div>
              <div style={{ color: GOLD, marginBottom: "1rem", fontSize: "0.75rem" }}>ADN-1 ACTIVE DETERRENT NODE — SYSTEM CONFIGURATION</div>
              {[["PROCESSOR","Dual-core ESP32"],["SENSOR","VL53L0X ToF"],["LASER","940nm VCSEL"],["RESPONSE TIME","<200ms"],["CONNECTIVITY","Encrypted Wi-Fi / LTE"],["ENCRYPTION","AES-256-GCM"],["CLOUD PROTOCOL","TLS 1.3"],["POWER","PoE / 12V DC"],["CLOUD INFRA","AWS IoT Core + MQTT"],["COMPLIANCE","UK Retail Security Standards"]].map(([k, v]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "170px 20px 1fr", marginBottom: "0.4rem" }}>
                  <span style={{ color: "#94a3b8" }}>{k}</span>
                  <span style={{ color: GOLD }}>::</span>
                  <span style={{ color: "#86efac" }}>{v}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#94a3b8" }}>
              COMPLIANT WITH UK RETAIL SECURITY STANDARDS · ISO 27001 CERTIFIED INFRASTRUCTURE
            </p>
          </div>
        </section>

        {/* FOUNDER */}
        <section id="founder" className="section-pad" style={{ padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "0.5rem", fontWeight: 600 }}>EXECUTIVE PROFILE</p>
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, color: NAVY, marginBottom: "0.3rem" }}>
                  Michael Esema,{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: "1.1rem", color: "#475569" }}>MBA, MSc</span>
                </h2>
                <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.92rem" }}>
                  Founder & Architect of the ADN-1. A specialist in forensic infrastructure and operational governance with a decade of experience closing systemic leaks in government, national emergency management, and high-volume retail environments.
                </p>
                <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.92rem" }}>
                  Mykei was built on a single insight: retail security has never directly attacked the resale economy that sustains organised theft. The ADN-1 changes that.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                {[
                  { label: "FINANCIAL GOVERNANCE & AUDIT", text: "Managed budgets up to £1.5M annually, generating strategic financial reports and maintaining strict regulatory compliance. Provided critical data support across multiple internal and external audit cycles at NEMA (National Emergency Management Agency, Nigeria)." },
                  { label: "OPERATIONAL IMPROVEMENT", text: "Delivered a quantifiable 75% enhancement in workflow efficiency following a structured operational audit. Lean Six Sigma certified (2025). PMP in progress." },
                  { label: "RETAIL & COMMERCIAL INTELLIGENCE", text: "Scaled high-volume retail environments in Abuja, generating 45% more revenue than projected through asset protection and operational integrity improvements." },
                  { label: "ACADEMIC FOUNDATION", text: "MSc International Business Management — Manchester Metropolitan University. MBA — Nigerian Defence Academy. BSc Accounting — Benson Idahosa University." },
                ].map(({ label, text }) => (
                  <div key={label} style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: "1rem" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: GOLD, fontWeight: 700, marginBottom: "0.3rem" }}>{label}</div>
                    <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SURVEY SECTION */}
        <section id="pilot-survey" className="section-pad" style={{ background: LIGHT, padding: "5rem 2.5rem", borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: "540px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, marginBottom: "0.5rem", fontWeight: 600 }}>SECURE CHANNEL</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: NAVY, marginBottom: "0.5rem" }}>Request Pilot Access</h2>
            <p style={{ color: "#475569", marginBottom: "2.5rem", lineHeight: 1.7, fontSize: "0.92rem" }}>
              We are selecting a small cohort of Greater Manchester retailers for our Phase 1 pilot programme. Complete this survey to register your interest.
            </p>

            {submitted ? (
              <div style={{ border: `2px solid ${GOLD}`, background: WHITE, padding: "2rem", borderRadius: "6px" }}>
                <div style={{ color: GOLD, fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>✓ Survey received.</div>
                <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Thank you for registering your interest in the Mykei ADN-1 pilot programme. We will be in touch within 5 working days at <strong>protocol@mykei.io</strong>.
                </p>
              </div>
            ) : (
              <form name="retailer-pilot-survey" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <input type="hidden" name="form-name" value="retailer-pilot-survey" />
                <input name="bot-field" style={{ display: "none" }} />

                {[{ label: "YOUR NAME *", name: "name", type: "text", ph: "Full name" }, { label: "EMAIL ADDRESS *", name: "email", type: "email", ph: "your@email.com" }].map(({ label, name, type, ph }) => (
                  <div key={name}>
                    <label style={labelStyle}>{label}</label>
                    <input name={name} type={type} required placeholder={ph} style={inputStyle} />
                  </div>
                ))}

                {[
                  { label: "YOUR ROLE *", name: "role", opts: ["Store Owner / Director","Store Manager","Loss Prevention / Security Manager","Procurement / Buying","Other"] },
                  { label: "HOW SIGNIFICANT IS THEFT TO YOUR BUSINESS? *", name: "theft_impact", opts: ["Critical — major financial impact","Significant — noticeable losses affecting margin","Moderate — manageable but growing","Minor — not a priority"] },
                  { label: "PILOT INTEREST *", name: "pilot_interest", opts: ["Yes — willing to participate in a paid pilot","Yes — interested in a free pilot","Possibly — need more information","Not at this time"] },
                  { label: "APPROXIMATE ANNUAL SECURITY SPEND", name: "security_spend", opts: ["Prefer not to say","Under £5,000","£5,000 – £20,000","£20,000 – £50,000","£50,000 – £100,000","Over £100,000"] },
                ].map(({ label, name, opts }) => (
                  <div key={name}>
                    <label style={labelStyle}>{label}</label>
                    <select name={name} required={label.includes("*")} style={inputStyle} defaultValue="">
                      <option value="" disabled>Select one</option>
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}

                <div>
                  <label style={labelStyle}>ORGANISATION / STORE NAME *</label>
                  <input name="organisation" required placeholder="Company or store name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>HIGHEST-VALUE STOLEN PRODUCT CATEGORIES</label>
                  <input name="stolen_categories" placeholder="e.g. baby formula, alcohol, cosmetics, electronics" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>DESCRIBE YOUR CURRENT SECURITY CHALLENGES</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your biggest retail crime challenges..." style={{ ...inputStyle, resize: "vertical" }} />
                </div>

                <button type="submit" disabled={submitting} style={{ background: submitting ? "#94a3b8" : NAVY, color: WHITE, border: `1px solid ${GOLD}`, padding: "0.95rem", fontSize: "0.8rem", letterSpacing: "0.1em", cursor: submitting ? "not-allowed" : "pointer", borderRadius: "4px", fontWeight: 700, boxShadow: `0 0 14px rgba(201,168,76,0.2)`, fontFamily: "'Inter', sans-serif" }}>
                  {submitting ? "SUBMITTING..." : "SUBMIT SURVEY →"}
                </button>
                <p style={{ fontSize: "0.65rem", color: "#94a3b8", textAlign: "center" }}>
                  All communications are encrypted and confidential. Company No. 16984969.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="section-pad footer-inner" style={{ padding: "2rem 2.5rem", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: WHITE }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img src="/logo.png" alt="Mykei" style={{ height: "28px" }} />
            <div>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: NAVY }}>MYKEI SECURITIES LTD</div>
              <div style={{ fontSize: "0.6rem", color: "#94a3b8" }}>Co. No: 16984969 | Registered in England & Wales | Manchester</div>
            </div>
          </div>
          <div style={{ fontSize: "0.6rem", color: "#94a3b8" }}>© 2026 MYKEI SECURITIES LTD. ALL RIGHTS RESERVED.</div>
        </footer>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: WHITE, border: `1px solid #dde4ef`,
  color: NAVY, padding: "0.7rem 0.9rem", fontSize: "0.88rem",
  fontFamily: "'Inter', sans-serif", borderRadius: "4px",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.62rem", letterSpacing: "0.12em",
  color: "#c9a84c", marginBottom: "0.4rem", fontWeight: 700,
};
