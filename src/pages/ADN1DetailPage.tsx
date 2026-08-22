// src/pages/ADN1DetailPage.tsx
// Route: /adn (canonical); /adn-1 redirects here

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const MODES = [
  {
    id: "HIGH",
    label: "HIGH Sensitivity",
    colour: "text-red-400",
    border: "border-red-400/30",
    bg: "bg-red-400/5",
    dot: "bg-red-400",
    stores: "Jewellers · Off-licences · Cosmetics counters",
    detail:
      "Triggers on rapid single-item removal events above a low velocity threshold. Every stolen unit represents significant loss, this mode sacrifices false-positive tolerance for maximum protection.",
  },
  {
    id: "STANDARD",
    label: "STANDARD Sensitivity",
    colour: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/5",
    dot: "bg-primary",
    stores: "Convenience stores · Independent retail",
    detail:
      "Default configuration. Requires combined velocity threshold and multi-item zone-clearing trajectory before triggering. Targets organised bulk-sweep events while tolerating normal customer browsing.",
  },
  {
    id: "AMBIENT",
    label: "AMBIENT Mode",
    colour: "text-blue-400",
    border: "border-blue-400/30",
    bg: "bg-blue-400/5",
    dot: "bg-blue-400",
    stores: "Restocking · Maintenance · Demonstrations",
    detail:
      "PIN-authenticated. Raises detection thresholds significantly so legitimate high-movement events do not trigger the forensic system. Time-bounded, auto-revert, fully audit-logged.",
  },
];

const SEQUENCE = [
  { n: "01", title: "DETECT",      body: "Dual ToF sensors map a 3D velocity vector across both detection zones. When the kinetic signature matches the configured bulk-sweep threshold, the trigger fires in under 200ms." },
  { n: "02", title: "MARK",        body: "The Ultrasonic Deployment Module deploys a burst of invisible batch-identifiable marker compound onto the stolen goods and the individual carrying them. Subject to marker supplier specification, SDS/COSHH review, and deployment environment review." },
  { n: "03", title: "LOG",         body: "An AES-256-GCM encrypted marker deployment event record is designed to be transmitted to the Mykei secure cloud registry via MQTT over TLS 1.3, once the registry is live. The record would contain timestamp, node ID, zone, ToF vector data, and the cartridge batch reference." },
  { n: "04", title: "DISRUPT",     body: "The cartridge batch reference is registered in the Mykei Registry, linked to the device, store, and timestamp. The event record is designed to support verification and investigation workflows, making theft-linked goods harder to sell anonymously." },
];

export default function ADN1DetailPage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    // Page-level SEO
    document.title = "ADN Retail Security Device · Bulk Sweep Theft Detection | Mykei";
    // Product Schema JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "adn1-product-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "name": "ADN shelf defence node",
      "headline": "ADN shelf defence node, Technical Specification",
      "description": "The ADN is a shelf-mounted retail security device using kinetic signature analysis to detect bulk sweep retail theft. It triggers controlled marker deployment and logs a cartridge-linked event record to the Mykei Registry. No cameras. No biometrics. No biometric or suspect identity data captured.",
      "author": { "@type": "Person", "@id": "https://michaelesema.com/#person", "name": "Michael Esema" },
      "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" },
      "url": "https://mykei.io/adn",
      "about": { "@type": "DefinedTerm", "name": "Economic Sterilisation", "url": "https://mykei.io/economic-sterilisation" }
    });
    if (!document.getElementById("adn1-product-schema")) document.head.appendChild(script);

    return () => {
      document.getElementById("adn1-product-schema")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Home nav ── */}
      <div className="container px-6 pt-8 flex items-center justify-between flex-wrap gap-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase"
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 11, letterSpacing: "2.5px", color: "#D8001F", textTransform: "uppercase" as const }}>MYKEI</span>
          Home
        </a>
        <a
          href="/adn-in-action"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded"
          style={{ background: "#D8001F", color: "#050505", padding: "9px 20px", textDecoration: "none", letterSpacing: "1.5px" }}
        >
          ▶ ADN in Action
        </a>
      </div>

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

        <div className="container relative z-10 px-6 max-w-5xl">
          <motion.div {...fade(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary tracking-wider">ADN · ACTIVE FORENSIC DEFENCE</span>
            </div>
          </motion.div>

          <motion.h1 {...fade(0.1)} className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Active Forensic<br />
            <span className="text-primary">Defence System</span>
          </motion.h1>

          <motion.p {...fade(0.2)} className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-10">
            A shelf-mounted node designed to detect bulk retail theft in real time,
            trigger controlled marker deployment, and register a cartridge-linked event record,
            designed to complete within 200 milliseconds, with no human intervention.
          </motion.p>

          <motion.div {...fade(0.3)} className="flex flex-wrap gap-3">
            {["No camera", "No facial recognition", "No biometric data", "Silent · Autonomous · Non-confrontational"].map(t => (
              <span key={t} className="font-mono text-xs px-3 py-1.5 border border-border rounded text-muted-foreground">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── The principle ── */}
      <section className="py-16 border-y border-border">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="text-center max-w-3xl mx-auto">
            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-4">Economic Sterilisation</p>
            <p className="text-2xl md:text-3xl font-bold leading-snug mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Thieves steal to resell.<br />
              <span className="text-primary">If they can't sell it, there's no point stealing it.</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The ADN does not try to physically prevent theft or identify criminals. It disrupts
              the resale incentive at the moment of the crime, making theft-linked goods harder to
              sell anonymously and removing the economic rationale behind organised retail theft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Detection sequence ── */}
      <section className="py-20">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Activation Sequence</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Four steps. Under two seconds.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {SEQUENCE.map((s, i) => (
              <motion.div key={s.n} {...fade(i * 0.1)}
                className="relative glow-border rounded-lg p-6 overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-primary/20" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-primary/20" />
                <div className="font-mono text-4xl font-bold text-primary/10 absolute top-4 right-6 select-none group-hover:text-primary/20 transition-colors">
                  {s.n}
                </div>
                <span className="font-mono text-xs text-primary tracking-[0.15em] mb-3 block">{s.n} · {s.title}</span>
                <p className="text-muted-foreground text-sm leading-relaxed pr-8">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sensitivity modes ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Configurable Detection</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Three sensitivity modes</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Calibrated for your store type and risk profile. Configurable from the retailer dashboard or companion app.
            </p>
          </motion.div>

          <div className="space-y-4">
            {MODES.map((mode, i) => (
              <motion.div key={mode.id} {...fade(i * 0.1)}
                className={`rounded-lg border ${mode.border} ${mode.bg} p-6`}
              >
                <div className="flex flex-wrap items-start gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${mode.dot}`} />
                    <span className={`font-mono text-sm font-bold ${mode.colour} tracking-wider`}>{mode.label}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-0.5">{mode.stores}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{mode.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(0.4)} className="mt-6 p-4 border border-border rounded bg-card font-mono text-xs text-muted-foreground">
            <span className="text-foreground">AUDIT NOTE:</span> Every sensitivity mode change and Inhibit Mode activation is
            timestamped and written to the tamper-aware audit trail. No configuration change can be used retrospectively
            to explain away a genuine theft event.
          </motion.div>
        </div>
      </section>

      {/* ── Staff override ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div {...fade(0)}>
              <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Operational Governance</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>PIN-Authenticated Inhibit Protocol</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Staff enter a four-digit PIN via the device or companion app to activate Inhibit Mode before
                working in the detection zone. The forensic system disables for a defined window while the
                ToF sensors continue passive logging.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every inhibit activation, its time, duration, staff code, and reason, is written as a
                tamper-evident entry in the Mykei event log. The system reverts to active mode
                automatically when the window expires.
              </p>
            </motion.div>
            <motion.div {...fade(0.2)} className="space-y-3">
              {[
                { label: "Default inhibit window",    value: "15 minutes" },
                { label: "Maximum configurable",      value: "60 minutes" },
                { label: "Extension method",          value: "Second PIN entry (also logged)" },
                { label: "Auto-revert",               value: "Yes, on window expiry" },
                { label: "Log entry contains",        value: "Time · Duration · Staff code · Reason" },
                { label: "Sensor during inhibit",     value: "Passive ToF logging continues" },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border/50 font-mono text-xs">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="text-primary">{r.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Legal precedent ── */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-10">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Evidence Pathway</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Designed to support evidential workflows</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "3,000+", label: "UK prosecutions supported by forensic marking compound evidence across the industry (industry data)" },
              { stat: "CPS", label: "Crown Prosecution Service guidance references forensic marking evidence in retail theft cases" },
              { stat: "Batch-linked", label: "Every ADN activation is cartridge-linked, timestamped, and recorded in the Mykei Registry for verification workflows" },
            ].map((item, i) => (
              <motion.div key={i} {...fade(i * 0.15)} className="glow-border rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fade(0.5)} className="mt-8 font-mono text-xs text-muted-foreground max-w-2xl">
            The ADN uses a batch-identifiable marker compound, uniquely cartridge-linked per activation event.
            Each deployment event record is designed to support evidential and investigation workflows. Marker specification subject to supplier SDS/COSHH review.
          </motion.p>
        </div>
      </section>

      {/* ── ADN Platform Family ── */}
      <section className="py-16 border-t border-border" style={{ background: "#FFFFFF" }}>
        <div className="container px-6 max-w-5xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="adn-family-grid">
            <motion.div {...fade(0)}>
              <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">ADN platform</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>The ADN platform.</h2>
              <p className="text-muted-foreground leading-relaxed">
                ADN is Mykei's shelf level defence platform, currently a working prototype. It is designed to combine non-visual detection, controlled marker deployment, and signed event registration in one system. It is not yet deployed in stores.
              </p>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Batch-linked evidence record</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Every event, fully traceable.</h2>
              <p className="text-muted-foreground leading-relaxed">
                ADN is built around a batch-linked evidence model. Each event record is designed to connect device ID, timestamp, store reference, event type, and forensic batch reference. This creates a traceable bridge between the physical marker and the digital registry entry.
              </p>
            </motion.div>
          </div>
          <style>{`@media (max-width: 720px) { .adn-family-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* ── Market ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-10">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">The Market</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>The problem is large. The solution is absent.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { stat: "50,000+", label: "independent convenience retailers in the UK", source: "ACS Local Shop Report 2026" },
              { stat: "£1.76B", label: "retail shrinkage recorded annually", source: "BRC Retail Crime Survey 2025" },
              { stat: "£313M", label: "spent on security, with no reduction in losses", source: "ACS Crime Report 2026" },
            ].map((item, i) => (
              <motion.div key={i} {...fade(i * 0.12)} className="border border-border rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-3 font-mono">{item.stat}</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.label}</p>
                <span className="font-mono text-[10px] text-muted-foreground/60 tracking-wider uppercase">{item.source}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fade(0.4)} className="font-mono text-xs text-muted-foreground max-w-2xl">
            Market sizing at scale has not yet been validated against a live pilot and is not published here pending that evidence. Existing approaches to retail theft, CCTV, EAS tagging, forensic marking, focus on detection or deterrence at the point of theft; ADN is intended to act on the resale value of goods after removal, which we believe is a distinct approach, though we have not conducted an exhaustive competitor review to confirm no other operator addresses this angle.
          </motion.p>
        </div>
      </section>

      {/* ── Commercial Model ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-10">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Commercial Model</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Unit economics built for the shopkeeper.</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Priced against the cash position of an independent retailer, not an enterprise procurement cycle.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div {...fade(0.1)}>
              {[
                { label: "Device fee (one-time)",          value: "To be scoped per pilot" },
                { label: "Monthly subscription",           value: "To be scoped per pilot" },
                { label: "12-month total cost",            value: "Not yet fixed" },
                { label: "24-month LTV per retailer",      value: "Not yet fixed" },
                { label: "Break-even (one bulk sweep stopped)", value: "Illustrative only, not yet field-validated" },
                { label: "Pilot commitment",               value: "Proposed 3 months, no lock-in" },
              ].map((r, i) => (
                <motion.div key={i} {...fade(i * 0.06)} className="flex justify-between items-center py-3 border-b border-border/50 font-mono text-xs">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="text-primary font-bold">{r.value}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div {...fade(0.2)} className="space-y-5">
              <div className="border border-border rounded-lg p-5">
                <div className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mb-3">Break-even scenario</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A single bulk sweep of premium goods (cigarettes, spirits, cosmetics) typically represents £150 to £400 in stock loss. Pilot pricing is being scoped against the principle that it should sit meaningfully below the cost of a single unchallenged sweep event.
                </p>
              </div>
              <div className="border border-border rounded-lg p-5">
                <div className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mb-3">Revenue model</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The ADN unit would be sold at near-cost during the pilot phase. Recurring revenue would come from the monthly subscription: cloud registry access, Mykei Registry event writes, and cartridge replenishment. LTV is expected to compound with multi-unit deployments in larger retail locations, once a pilot is underway.
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div {...fade(0.15)} className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: "Installation", sub: "Design target, under 1 hour" },
              { label: "Staff Training", sub: "Simple handover" },
              { label: "Monitoring", sub: "No behavioural monitoring" },
              { label: "Billing", sub: "Planned subscription service" },
              { label: "Scalability", sub: "Independent to multi-site" },
            ].map(({ label, sub }, i) => (
              <div key={label} className="text-center">
                <div className="font-mono text-xs text-muted-foreground tracking-wider uppercase mb-1">{String(i + 1).padStart(2, "0")}</div>
                <div className="text-sm font-bold">{label}</div>
                <div className="text-xs text-muted-foreground mt-1">{sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Regulatory ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-8">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Regulatory</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Compliance and certification pathway</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                badge: "UKCA",
                title: "UKCA Certification: in progress",
                body: "The ADN is an electronic device placed on the UK market and is subject to UKCA marking under the Electrical Equipment (Safety) Regulations 2016 and the Electromagnetic Compatibility Regulations 2016. Mykei Securities is working toward conformity assessment with a UK Approved Body. Commercial deployment at scale is planned for Q3 2027 pending certification.",
              },
              {
                badge: "IP42",
                title: "IP42 Ingress Protection",
                body: "The ADN prototype is rated IP42: protected against solid objects greater than 1mm and against water dripping at an angle up to 15 degrees. Production units will target IP54 for full retail environment compatibility.",
              },
              {
                badge: "Privacy",
                title: "Designed with privacy-by-design principles",
                body: "The ADN stores no camera data, no facial recognition data, and no biometric or suspect identity data. The event record contains sensor vectors, timestamps, and cartridge batch references, none of which are personal data under UK GDPR. No DPA registration is required for standard deployment.",
              },
              {
                badge: "GB2606630.8",
                title: "UK Patent application: pending",
                body: "UK patent application GB2606630.8, filed 23 March 2026, 17 claims. Patent pending. Filed with the UK Intellectual Property Office.",
              },
            ].map((item, i) => (
              <motion.div key={i} {...fade(i * 0.1)} className="border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-0.5 rounded tracking-wider">{item.badge}</span>
                </div>
                <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-3xl text-center">
          <motion.div {...fade(0)}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Deploy the ADN at your store</h2>
            <p className="text-muted-foreground mb-8">
              Alpha pilot places are open to independent retailers in Greater Manchester.
              Commercial terms agreed directly with Mykei. A 3-month minimum term is proposed, not yet finalised.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/pilot")}
                className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors rounded"
              >
                Request Pilot Access →
              </button>
              <button
                onClick={() => navigate("/technology/ats")}
                className="px-8 py-4 border border-border font-mono text-sm uppercase tracking-wider hover:border-primary/40 transition-colors rounded text-muted-foreground hover:text-foreground"
              >
                View ATS →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container px-6 py-8 flex items-center justify-between flex-wrap gap-3 border-t border-border">
        <div className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
          Mykei Securities Ltd · Co. 16984969
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          © 2026 Mykei Securities Ltd · <a href="/" className="hover:text-primary transition-colors">mykei.io</a>
        </div>
      </footer>

    </div>
  );
}
