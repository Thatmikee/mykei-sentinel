import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

const GOLD = "#765C14";
const INK = "#1E1E1E";
const PAPER = "#FAFAF8";
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
      <a href="/adn-1" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}`, padding: "7px 14px", textDecoration: "none" }}>
        Product
      </a>
    </nav>
  );
}


function EnterpriseForm() {
  const [form, setForm] = useState({ name: "", company: "", title: "", email: "", storeCount: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Enterprise enquiry: " + form.company);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nTitle: ${form.title}\nEmail: ${form.email}\nStore count: ${form.storeCount}`
    );
    window.location.href = `mailto:protocol@mykei.io?subject=${subject}&body=${body}`;
    setStatus("done");
  };

  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "12px 16px",
    border: `1px solid ${RULE}`,
    borderRadius: 4,
    fontSize: 15,
    fontFamily: "inherit",
    color: INK,
    background: "#fff",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: MUTED,
    marginBottom: 8,
  };

  const draft = form.name
    ? `Subject: Introducing Mykei Securities: Strategic Retail Pilot Enquiry

Hi [Name],

I wanted to bring something to your attention that may be worth a conversation.

I have been looking at Mykei Securities, a UK company developing the ADN, a shelf-mounted active forensic defence device for high-loss retail categories. Their approach is different to CCTV or EAS tags. The device is designed to use non-visual shelf-level sensing to detect bulk-sweep theft patterns, deploy a registry-linked forensic marker, and create a timestamped event record connecting device, store, time, and marker batch.

The proposition is non-confrontational and does not process any facial or biometric data.

They are inviting enquiries from retailers interested in a structured pilot. I have submitted an initial enquiry on behalf of ${form.company} and I think it is worth a short conversation internally first.

Their website: https://mykei.io
Their doctrine: https://mykei.io/economic-sterilisation
Pilot enquiry: https://mykei.io/enterprise

Worth 15 minutes?

${form.name}
${form.title}, ${form.company}`
    : "";

  if (status === "done") {
    return (
      <div style={{ padding: "32px 0" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
          Enquiry received
        </div>
        <p style={{ fontSize: 15, color: INK, lineHeight: 1.7, marginBottom: 32 }}>
          Michael will be in touch within 48 hours. In the meantime, here is a draft you can forward to your loss-prevention or operations lead to start the internal conversation.
        </p>
        <div style={{ background: "#F7F6F2", border: "1px solid #E4E2DC", borderRadius: 6, padding: "20px 22px", marginBottom: 12 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>
            Draft — forward to your team
          </div>
          <pre style={{ fontFamily: "inherit", fontSize: 13, color: INK, lineHeight: 1.75, whiteSpace: "pre-wrap", margin: 0 }}>{draft}</pre>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(draft); }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", background: "none", border: "1px solid " + RULE, borderRadius: 4, padding: "9px 18px", color: MUTED, cursor: "pointer" }}
        >
          Copy draft
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>

      <div style={{ display: "grid", gap: 20, marginBottom: 24 }}>
        <div>
          <label htmlFor="ent-name" style={labelStyle}>Full name</label>
          <input id="ent-name" style={inputStyle} name="name" type="text" required placeholder="First Last" value={form.name} onChange={set("name")} aria-required="true" />
        </div>
        <div>
          <label htmlFor="ent-company" style={labelStyle}>Company</label>
          <input id="ent-company" style={inputStyle} name="company" type="text" required placeholder="Retail Group Ltd" value={form.company} onChange={set("company")} aria-required="true" />
        </div>
        <div>
          <label htmlFor="ent-title" style={labelStyle}>Title</label>
          <input id="ent-title" style={inputStyle} name="title" type="text" required placeholder="Head of Loss Prevention" value={form.title} onChange={set("title")} aria-required="true" />
        </div>
        <div>
          <label htmlFor="ent-email" style={labelStyle}>Email</label>
          <input id="ent-email" style={inputStyle} name="email" type="email" required placeholder="you@company.com" value={form.email} onChange={set("email")} aria-required="true" />
        </div>
        <div>
          <label htmlFor="ent-storeCount" style={labelStyle}>Estimated store count</label>
          <input id="ent-storeCount" style={inputStyle} name="storeCount" type="text" required placeholder="e.g. 1, 3–5, 10, 25, 50+" value={form.storeCount} onChange={set("storeCount")} aria-required="true" />
        </div>
      </div>


      {status === "error" && (
        <p style={{ color: "#B00020", fontSize: 13, marginBottom: 16 }}>Something went wrong. Please try again or email protocol@mykei.io.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          width: "100%",
          padding: "14px 32px",
          background: INK,
          color: "#fff",
          border: "none",
          borderRadius: 4,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: status === "sending" ? "not-allowed" : "pointer",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Sending..." : "Send Enquiry"}
      </button>

      <p style={{ marginTop: 14, fontSize: 12, color: MUTED, textAlign: "center" }}>
        This page is not publicly listed. Enquiries are handled directly by the founder.
      </p>
    </form>
  );
}

export default function EnterprisePage() {
  useEffect(() => {
    document.title = "Strategic Retail Pilots | Mykei Securities Ltd";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Strategic retail pilots for supermarkets, pharmacies, insurers, and multi-site operators. The ADN creates batch-linked forensic event records designed to disrupt resale and support loss-prevention workflows. Mykei Securities Ltd, Manchester.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://mykei.io/enterprise";
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://mykei.io/enterprise");
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Strategic Retail Pilots | Mykei Securities Ltd");
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", "Strategic retail pilots for supermarkets, pharmacies, insurers, and multi-site operators. ADN forensic event records support loss-prevention workflows. Mykei Securities Ltd.");
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute("content", "index, follow");
    return () => {};
  }, []);

  return (
    <>
      <SimpleNav />

      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 80 }}>

        {/* HEADER */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "80px 40px 64px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
            Mykei Securities Ltd, Enterprise
          </div>
          <h1 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 400, lineHeight: 1.1, color: INK, marginBottom: 24 }}>
            Strategic retail pilots.<br />Direct from the founder.
          </h1>
          <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.75, maxWidth: 560 }}>
            For larger retailers, insurers, pharmacies, supermarkets, and multi-site loss-prevention teams exploring batch-linked forensic evidence records and structured pilots around category-level loss reduction.
          </p>
        </section>

        {/* WHY STRATEGIC PILOTS MATTER */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Why strategic pilots matter
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 24, fontWeight: 400, color: INK, marginBottom: 20, lineHeight: 1.3 }}>
                Evidence-led, not surveillance-led.
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 20 }}>
                The ADN does not rely on facial recognition, cameras, or biometric identification. It is designed to create a batch-linked forensic event record when a defined shelf-level event occurs.
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                Strategic pilots allow batch-control, registry workflow, deployment density, operational supply, and loss-reduction assumptions to be tested at meaningful scale.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>Where the ADN may fit</div>
              <ul style={{ margin: 0, padding: "0 0 0 20px", fontSize: 14, color: MUTED, lineHeight: 2 }}>
                {["High-loss categories", "Pharmacies", "Supermarkets", "Health and beauty", "Alcohol and convenience", "Multi-site retail", "Insurer-backed pilots", "Organised retail crime response teams"].map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WHAT TO EXPECT */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            What to expect
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 24, fontWeight: 400, color: INK, marginBottom: 20, lineHeight: 1.3 }}>
                No sales team. No pitch deck.
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                Strategic pilots are scoped directly with Michael Esema, founder of Mykei Securities. The first conversation is a diagnostic: which categories, which store formats, which shrinkage patterns. The product is the pitch.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 20 }}>
                Strategic pilot pricing is scoped per engagement based on deployment size, forensic chemistry requirements, batch-control architecture, support needs, reporting requirements, and integration pathway.
              </p>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                Expect a response within 48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* BSIA / INSTITUTIONAL PATHWAY */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "56px 40px", borderBottom: `1px solid ${RULE}`, background: "#FFFFFF" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>
            Institutional pathway
          </div>
          <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 22, fontWeight: 400, color: INK, marginBottom: 16, lineHeight: 1.3 }}>
            From pilot to sector standard.
          </h2>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, maxWidth: 640 }}>
            Mykei's proposed institutional pathway runs in three stages. First, a structured retail pilot with a named operator, producing a documented case study with verified loss-reduction data. Second, a working-group conversation with relevant industry bodies around registry interoperability and evidence workflow standards. Third, where appropriate, a proposal for registry data integration with established secure asset databases used by UK law enforcement and insurers. Each stage depends on the one before it. The priority is getting the pilot right.
          </p>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8, marginTop: 16, maxWidth: 640 }}>
            If you are evaluating the ADN in the context of an institutional pilot, sector trial, or industry body conversation, contact us directly.
          </p>
        </section>

        {/* FORM */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px 96px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 24 }}>
                Enquire
              </div>
              <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 26, fontWeight: 400, color: INK, marginBottom: 20, lineHeight: 1.25 }}>
                Tell us about your estate.
              </h2>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8 }}>
                Store count, category, and geography help Michael understand the deployment scope before the first call.
              </p>
            </div>
            <EnterpriseForm />
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
