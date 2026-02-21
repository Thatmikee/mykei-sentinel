import { useState } from "react";

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
      alert("Submission failed. Please email us directly at info@mykei.io");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#fff", color: "#1a1a2e", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 3rem", borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, background: "#fff", zIndex: 100 }}>
        <div>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", color: "#1a1a2e" }}>MYKEI SECURITIES LTD</div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "#888" }}>FORENSIC INFRASTRUCTURE</div>
        </div>
        <div style={{ display: "flex", gap: "2rem", fontSize: "0.65rem", letterSpacing: "0.12em" }}>
          {["ADN-1 SYSTEM", "MARKET CASE", "FOUNDER", "PILOT SURVEY"].map(item => (
            <a key={item} href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}
              style={{ textDecoration: "none", color: "#1a1a2e" }}>{item}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "8rem 3rem 6rem", maxWidth: "900px" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#4a90d9", marginBottom: "1.5rem" }}>ACTIVE FORENSIC DEFENCE</p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "2rem", fontFamily: "sans-serif" }}>
          Sterilizing the <span style={{ color: "#4a90d9" }}>Shadow Market.</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#444", maxWidth: "600px", lineHeight: 1.7, marginBottom: "1rem" }}>
          The black market thrives in retail blind spots. We don't just watch — we neutralize.
          Introducing the <strong>ADN-1 (Active Deterrent Node)</strong>: forensic-grade infrastructure
          backed by AWS predictive telemetry.
        </p>
        <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Because you can't sell what the system never let go of.</p>
      </section>

      {/* MARKET CASE */}
      <section id="market-case" style={{ background: "#1a1a2e", color: "#fff", padding: "5rem 3rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#4a90d9", marginBottom: "1rem" }}>THE MARKET PROBLEM</p>
        <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", marginBottom: "3rem" }}>The £4.2 Billion Crisis</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {[
            { stat: "£4.2B", label: "Total UK retail crime cost (2025/26)" },
            { stat: "£2.2B", label: "Direct customer theft losses" },
            { stat: "20M+", label: "Theft incidents recorded last year" },
            { stat: "£1.8B", label: "Spent on passive security — with rising losses" },
          ].map(({ stat, label }) => (
            <div key={stat} style={{ borderLeft: "3px solid #4a90d9", paddingLeft: "1rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#4a90d9" }}>{stat}</div>
              <div style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "0.3rem" }}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{ color: "#ccc", maxWidth: "700px", lineHeight: 1.8, fontSize: "0.95rem" }}>
          Organised Crime Groups (OCGs) systematically target multiple stores using bulk sweep techniques,
          immediately converting stolen inventory through online resale channels. Existing CCTV, guards,
          and EAS tags do nothing to attack the underlying economics. <strong style={{ color: "#fff" }}>As long as stolen goods retain
          resale value, theft remains rational.</strong> Mykei removes that value at the point of theft.
        </p>
      </section>

      {/* TECHNOLOGY */}
      <section id="adn-1-system" style={{ padding: "5rem 3rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#4a90d9", marginBottom: "1rem" }}>DEFENCE ARCHITECTURE</p>
        <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", marginBottom: "0.5rem" }}>The Technology</h2>
        <p style={{ color: "#555", marginBottom: "3rem", maxWidth: "600px" }}>
          Integrated hardware and cloud infrastructure designed for one purpose: <strong>Economic Sterilization</strong> —
          marking high-value stock with forensic DNA mist to eliminate resale value.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {[
            {
              tag: "ADN-1", title: "Active Deterrence Node",
              desc: "A shelf-integrated unit using 940nm VCSEL Time-of-Flight sensors to detect bulk sweep behaviour with sub-200ms response. On trigger: piezoelectric atomization deploys invisible synthetic DNA forensic mist.",
              specs: [["SENSOR", "VL53L0X ToF"], ["LASER", "940nm VCSEL"], ["RESPONSE", "<200ms"], ["PROCESSOR", "Dual-core ESP32"]]
            },
            {
              tag: "ATS", title: "Alarm Transmission System",
              desc: "Encrypted cloud layer transmitting real-time theft alerts to the management dashboard. TLS 1.3 secured forensic event packages — admissible as legal evidence.",
              specs: [["PROTOCOL", "TLS 1.3"], ["LATENCY", "<50ms"], ["UPTIME", "99.99%"], ["ENCRYPTION", "AES-256-GCM"]]
            },
            {
              tag: "FDT", title: "Forensic Digital Twin",
              desc: "Every marked item is cryptographically logged as Toxic Inventory. API hooks to major resale platforms (eBay, Facebook Marketplace) flag or remove listings matching theft events.",
              specs: [["REGISTRY", "AWS IoT Core"], ["STANDARD", "ISO 27001"], ["GDPR", "Privacy-by-Design"], ["LOG", "Immutable Audit Trail"]]
            },
          ].map(({ tag, title, desc, specs }) => (
            <div key={tag} style={{ border: "1px solid #e5e5e5", padding: "1.5rem", borderRadius: "4px" }}>
              <span style={{ fontSize: "0.6rem", border: "1px solid #4a90d9", color: "#4a90d9", padding: "2px 8px", borderRadius: "20px" }}>{tag}</span>
              <h3 style={{ margin: "0.8rem 0 0.5rem", fontFamily: "sans-serif", fontSize: "1.1rem" }}>{title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.6, marginBottom: "1rem" }}>{desc}</p>
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {specs.map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: "0.55rem", color: "#999", letterSpacing: "0.1em" }}>{k}</div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4a90d9" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#f8f8f8", padding: "1rem 1.5rem", borderRadius: "4px", display: "inline-block", fontSize: "0.8rem" }}>
          <span style={{ color: "#4a90d9", fontWeight: 700 }}>KEY OUTCOME:</span> Forensic DNA marking eliminates resale value at point of theft.
          Privacy-by-Design — no facial recognition, no personal data captured.
        </div>
      </section>

      {/* TECHNICAL SPECS */}
      <section id="aws-specs" style={{ background: "#f8f9fa", padding: "5rem 3rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#4a90d9", marginBottom: "1rem" }}>SYSTEM SPECIFICATIONS</p>
        <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", marginBottom: "2rem" }}>Technical Specs</h2>
        <div style={{ background: "#1a1a2e", color: "#e0e0e0", padding: "2rem", borderRadius: "8px", maxWidth: "600px", fontSize: "0.85rem" }}>
          <div style={{ marginBottom: "1rem", display: "flex", gap: "6px" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
            <span style={{ marginLeft: "0.5rem", color: "#666", fontSize: "0.7rem" }}>ADN-1_SPEC_SHEET.cfg</span>
          </div>
          <div style={{ color: "#4a90d9", marginBottom: "1rem" }}>$ cat /sys/device/specs</div>
          {[
            ["PROCESSOR", "Dual-core ESP32"],
            ["SENSOR", "VL53L0X ToF"],
            ["LASER", "940nm VCSEL"],
            ["RESPONSE TIME", "<200ms"],
            ["CONNECTIVITY", "Encrypted Wi-Fi/LTE"],
            ["ENCRYPTION", "AES-256-GCM"],
            ["CLOUD PROTOCOL", "TLS 1.3"],
            ["POWER", "PoE / 12V DC"],
            ["CLOUD INFRA", "AWS IoT Core + MQTT"],
            ["COMPLIANCE", "UK Retail Security Standards"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "160px 20px 1fr", marginBottom: "0.4rem", color: "#ccc" }}>
              <span>{k}</span><span style={{ color: "#4a90d9" }}>::</span><span style={{ color: "#98d98e" }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: "1rem", color: "#4a90d9" }}>$ _</div>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#999" }}>
          COMPLIANT WITH UK RETAIL SECURITY STANDARDS · ISO 27001 CERTIFIED INFRASTRUCTURE
        </p>
      </section>

      {/* FOUNDER */}
      <section id="founder" style={{ padding: "5rem 3rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#4a90d9", marginBottom: "1rem" }}>EXECUTIVE PROFILE</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", maxWidth: "900px" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", marginBottom: "0.3rem" }}>
              Michael Esema, <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: "1.2rem" }}>MBA, MSc</span>
            </h2>
            <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1rem" }}>
              Founder & Architect of the ADN-1. A specialist in forensic infrastructure with a decade-long
              track record of closing systemic leaks in high-stakes environments across government,
              national infrastructure, and high-volume retail.
            </p>
            <p style={{ color: "#555", lineHeight: 1.7 }}>
              Mykei Securities Ltd was founded on a single insight: retail security has never directly
              attacked the resale economy that sustains organised theft. The ADN-1 was designed to fix that.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { label: "INSTITUTIONAL GOVERNANCE", text: "President of NUASA (2018). Spearheaded financial accountability and forensic audit protocols for student-led institutional bodies." },
              { label: "NATIONAL INFRASTRUCTURE", text: "DFA Office, NEMA. Developed understanding of infrastructure vulnerability and asset leakage within national crisis management frameworks." },
              { label: "RETAIL & HOSPITALITY INTELLIGENCE", text: "Scaled high-volume retail environments in Abuja (Silent Party 9ja / Luxury Lounges) through real-time asset protection and logistical integrity." },
              { label: "ACADEMIC FOUNDATION", text: "MBA and MSc providing strategic and analytical frameworks applied directly to the commercial architecture of the ADN-1 system." },
            ].map(({ label, text }) => (
              <div key={label}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "#4a90d9", fontWeight: 700, marginBottom: "0.3rem" }}>{label}</div>
                <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILOT SURVEY FORM */}
      <section id="pilot-survey" style={{ background: "#1a1a2e", color: "#fff", padding: "5rem 3rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#4a90d9", marginBottom: "1rem" }}>SECURE CHANNEL</p>
        <h2 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "sans-serif", marginBottom: "0.5rem" }}>Request Pilot Access</h2>
        <p style={{ color: "#aaa", marginBottom: "3rem", maxWidth: "500px" }}>
          We are selecting a small cohort of Manchester-area retailers for our Phase 1 pilot programme.
          Complete this survey to register your interest and help us understand your security challenges.
        </p>

        {submitted ? (
          <div style={{ border: "1px solid #4a90d9", padding: "2rem", borderRadius: "4px", maxWidth: "500px" }}>
            <div style={{ color: "#4a90d9", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>✓ Survey received.</div>
            <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
              Thank you for your interest in the Mykei ADN-1 pilot programme.
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
            style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <input type="hidden" name="form-name" value="retailer-pilot-survey" />
            <input type="hidden" name="bot-field" style={{ display: "none" }} />

            {/* Name */}
            <div>
              <label style={labelStyle}>YOUR NAME *</label>
              <input name="name" required placeholder="Full name" style={inputStyle} />
            </div>

            {/* Role */}
            <div>
              <label style={labelStyle}>YOUR ROLE *</label>
              <select name="role" required style={inputStyle}>
                <option value="">Select your role</option>
                <option>Store Owner / Director</option>
                <option>Store Manager</option>
                <option>Loss Prevention / Security Manager</option>
                <option>Procurement / Buying</option>
                <option>Other</option>
              </select>
            </div>

            {/* Organisation */}
            <div>
              <label style={labelStyle}>ORGANISATION / STORE NAME *</label>
              <input name="organisation" required placeholder="Company or store name" style={inputStyle} />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>EMAIL ADDRESS *</label>
              <input name="email" type="email" required placeholder="your@email.com" style={inputStyle} />
            </div>

            {/* Theft problem */}
            <div>
              <label style={labelStyle}>HOW SIGNIFICANT IS THEFT TO YOUR BUSINESS? *</label>
              <select name="theft_impact" required style={inputStyle}>
                <option value="">Select one</option>
                <option>Critical — major financial impact, affecting viability</option>
                <option>Significant — noticeable losses affecting margin</option>
                <option>Moderate — manageable but growing concern</option>
                <option>Minor — not a current priority</option>
              </select>
            </div>

            {/* Highest stolen goods */}
            <div>
              <label style={labelStyle}>WHAT ARE YOUR HIGHEST-VALUE STOLEN PRODUCT CATEGORIES?</label>
              <input name="stolen_categories" placeholder="e.g. baby formula, alcohol, cosmetics, electronics" style={inputStyle} />
            </div>

            {/* Security spend */}
            <div>
              <label style={labelStyle}>APPROXIMATE ANNUAL SECURITY SPEND</label>
              <select name="security_spend" style={inputStyle}>
                <option value="">Prefer not to say</option>
                <option>Under £5,000</option>
                <option>£5,000 – £20,000</option>
                <option>£20,000 – £50,000</option>
                <option>£50,000 – £100,000</option>
                <option>Over £100,000</option>
              </select>
            </div>

            {/* Pilot interest */}
            <div>
              <label style={labelStyle}>PILOT INTEREST *</label>
              <select name="pilot_interest" required style={inputStyle}>
                <option value="">Select one</option>
                <option>Yes — I would participate in a paid pilot</option>
                <option>Yes — I would participate in a free pilot</option>
                <option>Possibly — I need more information first</option>
                <option>Not at this time</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>DESCRIBE YOUR CURRENT SECURITY CHALLENGES</label>
              <textarea name="message" rows={4} placeholder="Tell us about your biggest retail crime challenges..." style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ background: submitting ? "#333" : "#4a90d9", color: "#fff", border: "none", padding: "1rem", fontSize: "0.75rem", letterSpacing: "0.15em", cursor: submitting ? "not-allowed" : "pointer", borderRadius: "2px", fontFamily: "'Courier New', monospace" }}
            >
              {submitting ? "SUBMITTING..." : "SUBMIT SURVEY"}
            </button>
            <p style={{ fontSize: "0.65rem", color: "#666", textAlign: "center" }}>
              All communications are encrypted and confidential. Company No. 16984969.
            </p>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2rem 3rem", borderTop: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em" }}>MYKEI SECURITIES LTD</div>
          <div style={{ fontSize: "0.6rem", color: "#999", marginTop: "0.2rem" }}>Company Number: 16984969 | Registered in England & Wales | Manchester, United Kingdom</div>
        </div>
        <div style={{ fontSize: "0.6rem", color: "#999" }}>© 2026 MYKEI SECURITIES LTD. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0d0d1a",
  border: "1px solid #333",
  color: "#fff",
  padding: "0.7rem 0.9rem",
  fontSize: "0.85rem",
  fontFamily: "'Courier New', monospace",
  borderRadius: "2px",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.6rem",
  letterSpacing: "0.15em",
  color: "#888",
  marginBottom: "0.4rem",
};
