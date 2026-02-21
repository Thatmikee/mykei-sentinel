import { useState } from "react";

const NAVY = "#1a1a2e";
const BLUE = "#4a90d9";
const WHITE = "#ffffff";
const LIGHT = "#f4f7fb";
const BORDER = "#dde4ef";

export default function Index() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      setSubmitted(true);
    } catch {
      alert("Submission failed. Please email info@mykei.io directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: WHITE, color: NAVY, minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 3rem", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: WHITE, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <img src="/logo.png" alt="Mykei Securities Logo" style={{ height: "36px", width: "auto" }} />
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", color: NAVY }}>MYKEI SECURITIES LTD</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: BLUE }}>FORENSIC INFRASTRUCTURE</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", fontSize: "0.65rem", letterSpacing: "0.12em" }}>
          {[["ADN-1 SYSTEM", "#adn-1-system"], ["MARKET CASE", "#market-case"], ["FOUNDER", "#founder"], ["PILOT SURVEY", "#pilot-survey"]].map(([label, href]) => (
            <a key={label} href={href} style={{ textDecoration: "none", color: NAVY, transition: "color 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.color = BLUE)}
              onMouseOut={e => (e.currentTarget.style.color = NAVY)}>{label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "7rem 3rem 5rem", maxWidth: "960px", margin: "0 auto" }}>
        {/* Logo mark above headline */}
        <img src="/logo.png" alt="Mykei" style={{ height: "72px", marginBottom: "1.5rem", display: "block" }} />
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: BLUE, marginBottom: "1rem" }}>ACTIVE FORENSIC DEFENCE</p>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem", fontFamily: "sans-serif", color: NAVY }}>
          Sterilizing the <span style={{ color: BLUE }}>Shadow Market.</span>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#444", maxWidth: "620px", lineHeight: 1.8, marginBottom: "1rem" }}>
          The black market thrives in retail blind spots. We don't just watch — we neutralize.
          Introducing the <strong>ADN-1 (Active Deterrent Node)</strong>: forensic-grade hardware
          backed by AWS predictive telemetry.
        </p>
        <p style={{ fontSize: "1rem", fontWeight: 700, color: NAVY, borderLeft: `3px solid ${BLUE}`, paddingLeft: "1rem" }}>
          Because you can't sell what the system never let go of.
        </p>
      </section>

      {/* MARKET CASE */}
      <section id="market-case" style={{ background: LIGHT, padding: "5rem 3rem", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: BLUE, marginBottom: "0.5rem" }}>THE MARKET PROBLEM</p>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", color: NAVY, marginBottom: "2.5rem" }}>The £4.2 Billion Crisis</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { stat: "£4.2B", label: "Total UK retail crime cost (2025/26)" },
              { stat: "£2.2B", label: "Direct customer theft losses" },
              { stat: "20M+", label: "Theft incidents recorded last year" },
              { stat: "£1.8B", label: "Spent on passive security — losses still rising" },
            ].map(({ stat, label }) => (
              <div key={stat} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${BLUE}`, padding: "1.2rem" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: BLUE }}>{stat}</div>
                <div style={{ fontSize: "0.78rem", color: "#555", marginTop: "0.3rem", lineHeight: 1.5 }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#444", maxWidth: "700px", lineHeight: 1.8, fontSize: "0.95rem" }}>
            Organised Crime Groups (OCGs) systematically target multiple stores, clearing shelves in bulk sweeps
            for immediate resale. CCTV, guards, and EAS tags do not attack the underlying economics.{" "}
            <strong>As long as stolen goods retain resale value, theft remains rational.</strong>{" "}
            Mykei removes that value at the point of theft — not after.
          </p>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="adn-1-system" style={{ padding: "5rem 3rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: BLUE, marginBottom: "0.5rem" }}>DEFENCE ARCHITECTURE</p>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", color: NAVY, marginBottom: "0.5rem" }}>The Technology</h2>
          <p style={{ color: "#555", marginBottom: "3rem", maxWidth: "580px", lineHeight: 1.7 }}>
            Integrated hardware and cloud infrastructure designed for one purpose:{" "}
            <strong>Economic Sterilization</strong> — marking high-value stock with forensic DNA mist to eliminate resale value.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            {[
              {
                tag: "ADN-1", title: "Active Deterrence Node",
                desc: "Shelf-integrated unit using 940nm VCSEL Time-of-Flight sensors to detect bulk sweep behaviour with sub-200ms response. On trigger: piezoelectric atomization deploys invisible synthetic DNA forensic mist.",
                specs: [["SENSOR", "VL53L0X ToF"], ["LASER", "940nm VCSEL"], ["RESPONSE", "<200ms"], ["PROCESSOR", "Dual-core ESP32"]]
              },
              {
                tag: "ATS", title: "Alarm Transmission System",
                desc: "Encrypted cloud layer transmitting real-time theft alerts to the management dashboard. TLS 1.3 secured forensic event packages — admissible as UK legal evidence.",
                specs: [["PROTOCOL", "TLS 1.3"], ["LATENCY", "<50ms"], ["UPTIME", "99.99%"], ["ENCRYPTION", "AES-256-GCM"]]
              },
              {
                tag: "FDT", title: "Forensic Digital Twin",
                desc: "Every marked item is cryptographically logged as Toxic Inventory. API hooks to major resale platforms flag or remove listings matching theft events in our registry.",
                specs: [["REGISTRY", "AWS IoT Core"], ["STANDARD", "ISO 27001"], ["GDPR", "Privacy-by-Design"], ["LOG", "Immutable Audit Trail"]]
              },
            ].map(({ tag, title, desc, specs }) => (
              <div key={tag} style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${BLUE}`, padding: "1.5rem", background: WHITE }}>
                <span style={{ fontSize: "0.6rem", border: `1px solid ${BLUE}`, color: BLUE, padding: "2px 8px", borderRadius: "20px" }}>{tag}</span>
                <h3 style={{ margin: "0.8rem 0 0.5rem", fontFamily: "sans-serif", fontSize: "1.05rem", color: NAVY }}>{title}</h3>
                <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6, marginBottom: "1rem" }}>{desc}</p>
                <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                  {specs.map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: "0.55rem", color: "#999", letterSpacing: "0.1em" }}>{k}</div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: BLUE }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: LIGHT, border: `1px solid ${BORDER}`, padding: "1rem 1.5rem", display: "inline-block", fontSize: "0.8rem" }}>
            <span style={{ color: BLUE, fontWeight: 700 }}>KEY OUTCOME:</span>{" "}
            Forensic DNA marking eliminates resale value at point of theft. Privacy-by-Design — no facial recognition, no personal data captured.
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      <section style={{ background: LIGHT, padding: "5rem 3rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: BLUE, marginBottom: "0.5rem" }}>SYSTEM SPECIFICATIONS</p>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", color: NAVY, marginBottom: "2rem" }}>Technical Specs</h2>
          <div style={{ background: NAVY, color: "#e0e0e0", padding: "2rem", borderRadius: "6px", maxWidth: "580px", fontSize: "0.85rem" }}>
            <div style={{ marginBottom: "1rem", display: "flex", gap: "6px", alignItems: "center" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
              <span style={{ marginLeft: "0.5rem", color: "#666", fontSize: "0.7rem" }}>ADN-1_SPEC_SHEET.cfg</span>
            </div>
            <div style={{ color: BLUE, marginBottom: "1rem" }}>$ cat /sys/device/specs</div>
            {[["PROCESSOR","Dual-core ESP32"],["SENSOR","VL53L0X ToF"],["LASER","940nm VCSEL"],["RESPONSE TIME","<200ms"],["CONNECTIVITY","Encrypted Wi-Fi/LTE"],["ENCRYPTION","AES-256-GCM"],["CLOUD PROTOCOL","TLS 1.3"],["POWER","PoE / 12V DC"],["CLOUD INFRA","AWS IoT Core + MQTT"],["COMPLIANCE","UK Retail Security Standards"]].map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "160px 20px 1fr", marginBottom: "0.4rem" }}>
                <span style={{ color: "#ccc" }}>{k}</span>
                <span style={{ color: BLUE }}>::</span>
                <span style={{ color: "#98d98e" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: "1rem", color: BLUE }}>$ _</div>
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#999" }}>
            COMPLIANT WITH UK RETAIL SECURITY STANDARDS · ISO 27001 CERTIFIED INFRASTRUCTURE
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" style={{ padding: "5rem 3rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: BLUE, marginBottom: "0.5rem" }}>EXECUTIVE PROFILE</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", color: NAVY, marginBottom: "0.3rem" }}>
                Michael Esema,{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: "1.1rem" }}>MBA, MSc</span>
              </h2>
              <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.9rem" }}>
                Founder & Architect of the ADN-1. A specialist in forensic infrastructure and operational
                governance with a decade-long track record of closing systemic leaks in high-stakes
                environments across government, national infrastructure, and high-volume retail.
              </p>
              <p style={{ color: "#555", lineHeight: 1.8, fontSize: "0.9rem" }}>
                Mykei Securities Ltd was founded on a single insight: retail security has never directly
                attacked the resale economy that sustains organised theft. The ADN-1 was designed to fix that.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {[
                { label: "FINANCIAL GOVERNANCE & AUDIT", text: "Managed departmental budgets up to £1.5M annually at B's Hive Hotel & Suites. Processed 500+ monthly financial transactions and provided data support during internal and external audits at NEMA (National Emergency Management Agency, Nigeria)." },
                { label: "OPERATIONAL IMPROVEMENT", text: "Led operational audit delivering a quantifiable 75% enhancement in administrative workflow efficiency. Lean Six Sigma certified (2025). PMP in progress. Applied structured process improvement to complex, high-pressure environments." },
                { label: "RETAIL & HOSPITALITY INTELLIGENCE", text: "Successfully scaled high-volume retail environments in Abuja (Silent Party 9ja / Luxury Lounges), generating 45% more revenue than projected through asset protection and logistical integrity." },
                { label: "ACADEMIC FOUNDATION", text: "MSc International Business Management — Manchester Metropolitan University (2024). MBA — Nigerian Defence Academy (2022). BSc (Hons) Accounting — Benson Idahosa University (2018)." },
              ].map(({ label, text }) => (
                <div key={label} style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: "1rem" }}>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: BLUE, fontWeight: 700, marginBottom: "0.3rem" }}>{label}</div>
                  <p style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.6, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PILOT SURVEY */}
      <section id="pilot-survey" style={{ background: LIGHT, padding: "5rem 3rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: BLUE, marginBottom: "0.5rem" }}>SECURE CHANNEL</p>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", color: NAVY, marginBottom: "0.5rem" }}>Request Pilot Access</h2>
          <p style={{ color: "#555", marginBottom: "2.5rem", lineHeight: 1.7, fontSize: "0.9rem" }}>
            We are selecting a small cohort of Greater Manchester retailers for our Phase 1 pilot.
            Complete this survey to register your interest and help us understand your security challenges.
          </p>

          {submitted ? (
            <div style={{ border: `2px solid ${BLUE}`, background: WHITE, padding: "2rem", borderRadius: "4px" }}>
              <div style={{ color: BLUE, fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>✓ Survey received.</div>
              <p style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Thank you for registering your interest in the Mykei ADN-1 pilot programme.
                We will be in touch within 5 working days.
              </p>
            </div>
          ) : (
            <form
              name="retailer-pilot-survey"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <input type="hidden" name="form-name" value="retailer-pilot-survey" />
              <input name="bot-field" style={{ display: "none" }} />

              {[
                { label: "YOUR NAME *", name: "name", type: "text", placeholder: "Full name", required: true },
                { label: "EMAIL ADDRESS *", name: "email", type: "email", placeholder: "your@email.com", required: true },
              ].map(({ label, name, type, placeholder, required }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <input name={name} type={type} placeholder={placeholder} required={required} style={inputStyle} />
                </div>
              ))}

              {[
                { label: "YOUR ROLE *", name: "role", required: true, opts: ["Store Owner / Director","Store Manager","Loss Prevention / Security Manager","Procurement / Buying","Other"] },
                { label: "HOW SIGNIFICANT IS THEFT TO YOUR BUSINESS? *", name: "theft_impact", required: true, opts: ["Critical — major financial impact, affecting viability","Significant — noticeable losses affecting margin","Moderate — manageable but growing concern","Minor — not a current priority"] },
                { label: "PILOT INTEREST *", name: "pilot_interest", required: true, opts: ["Yes — willing to participate in a paid pilot","Yes — interested in a free pilot","Possibly — need more information","Not at this time"] },
                { label: "APPROXIMATE ANNUAL SECURITY SPEND", name: "security_spend", required: false, opts: ["Prefer not to say","Under £5,000","£5,000 – £20,000","£20,000 – £50,000","£50,000 – £100,000","Over £100,000"] },
              ].map(({ label, name, required, opts }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <select name={name} required={required} style={inputStyle} defaultValue="">
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

              <button type="submit" disabled={submitting} style={{ background: submitting ? "#aaa" : BLUE, color: WHITE, border: "none", padding: "1rem", fontSize: "0.75rem", letterSpacing: "0.15em", cursor: submitting ? "not-allowed" : "pointer", borderRadius: "2px", fontFamily: "'Courier New', monospace", fontWeight: 700 }}>
                {submitting ? "SUBMITTING..." : "SUBMIT SURVEY"}
              </button>
              <p style={{ fontSize: "0.65rem", color: "#999", textAlign: "center" }}>
                All communications are encrypted and confidential. Company No. 16984969.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2rem 3rem", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: WHITE }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <img src="/logo.png" alt="Mykei" style={{ height: "28px" }} />
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: NAVY }}>MYKEI SECURITIES LTD</div>
            <div style={{ fontSize: "0.6rem", color: "#999" }}>Company No: 16984969 | Registered in England & Wales | Manchester</div>
          </div>
        </div>
        <div style={{ fontSize: "0.6rem", color: "#999" }}>© 2026 MYKEI SECURITIES LTD. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#fff", border: "1px solid #dde4ef",
  color: "#1a1a2e", padding: "0.7rem 0.9rem", fontSize: "0.85rem",
  fontFamily: "'Courier New', monospace", borderRadius: "2px", boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.6rem", letterSpacing: "0.15em",
  color: "#4a90d9", marginBottom: "0.4rem", fontWeight: 700,
};
