// src/pages/ATSDetailPage.tsx
// Route: /technology/ats

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const LAYERS = [
  {
    n: "01",
    title: "EDGE, ADN-1 Node",
    body: "AES-256-GCM encrypted local processing on the Encrypted Logic Core. The Forensic Event Package is assembled at the edge, timestamp, node ID, ToF vector data, forensic batch code, before transmission begins.",
  },
  {
    n: "02",
    title: "TRANSMISSION, MQTT over TLS 1.3",
    body: "The encrypted packet travels over MQTT protocol to the Mykei secure cloud registry. End-to-end TLS 1.3 encryption ensures the event record cannot be intercepted or altered in transit. Sub-50ms cloud latency.",
  },
  {
    n: "03",
    title: "REGISTRY, Forensic Digital Twin Platform",
    body: "The Mykei secure cloud registry receives and stores the event with cryptographic signing. The tamper-aware audit trail is designed so that alteration, deletion, or backdating can be detected. Row-level security ensures each retailer sees only their own data.",
  },
  {
    n: "04",
    title: "REGISTRY, Mykei Registry",
    body: "The cartridge-linked event record is created in the Mykei Registry. The record connects device ID, timestamp, store, and batch code. This supports verification, law-enforcement review, and insurer workflows.",
  },
];

const SPECS = [
  { label: "PROTOCOL",          value: "MQTT" },
  { label: "TRANSPORT",         value: "TLS 1.3" },
  { label: "CLOUD PROVIDER",    value: "Secure cloud registry" },
  { label: "LATENCY",           value: "< 50ms" },
  { label: "UPTIME SLA",        value: "99.99%" },
  { label: "EDGE ENCRYPTION",   value: "AES-256-GCM" },
  { label: "RECORD INTEGRITY",  value: "Cryptographically signed" },
  { label: "DATA ACCESS",       value: "Row-level security (RLS)" },
  { label: "AUDIT LOG",         value: "Tamper-aware · Evidential workflow ready" },
  { label: "REGISTRY MODEL",    value: "Batch-linked event record" },
  { label: "INFRASTRUCTURE",    value: "UK / EU AWS regions" },
  { label: "DATA OWNERSHIP",    value: "Retailer retains all event data" },
];

const REGISTRY_FEATURES = [
  {
    title: "Forensic Digital Twin",
    body: "Every theft event creates a cryptographically protected digital record that mirrors the physical forensic marker. The two cannot be separated, the compound on the goods and the cloud record are linked by the unique batch code.",
  },
  {
    title: "Secondary Market Disruption",
    body: "Registry-linked event records create a traceable batch reference for every marker deployment. This supports future secondary-market verification workflows. Secondary market integrations are a planned pathway, subject to compliance review.",
  },
  {
    title: "Insurance Evidence Export",
    body: "Retailers can export verified Forensic Event Package reports directly for insurance submissions. The cryptographically signed record constitutes verified loss evidence without requiring manual documentation.",
  },
  {
    title: "Law Enforcement Portal",
    body: "Officers can cross-reference a recovered item's forensic compound code against the registry to confirm theft origin, store, date, and time, without involving the retailer in the query.",
  },
];

export default function ATSDetailPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Home nav ── */}
      <div className="container px-6 pt-8 flex items-center justify-between flex-wrap gap-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase"
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 11, letterSpacing: "2.5px", color: "#D4A843", textTransform: "uppercase" as const }}>MYKEI</span>
          Home
        </a>
        <a
          href="/adn-1"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded"
          style={{ background: "#D4A843", color: "#050505", padding: "9px 20px", textDecoration: "none", letterSpacing: "1.5px" }}
        >
          ▶ ADN-1 in Action
        </a>
      </div>

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />

        <div className="container relative z-10 px-6 max-w-5xl">
          <motion.div {...fade(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary tracking-wider">ATS · ALARM TRANSMISSION SYSTEM</span>
            </div>
          </motion.div>

          <motion.h1 {...fade(0.1)} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Forensic Cloud<br />
            <span className="text-primary">Registry Infrastructure</span>
          </motion.h1>

          <motion.p {...fade(0.2)} className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-10">
            The ATS is the secure transmission and cloud enforcement layer of the Mykei system.
            It takes the physical forensic event detected by the ADN-1 and converts it into a
            cryptographically protected, tamper-aware digital record that supports verification
            and investigation workflows.
          </motion.p>

          <motion.div {...fade(0.3)} className="flex flex-wrap gap-3">
            {["End-to-end TLS 1.3", "Tamper-aware audit trail", "Cryptographically signed", "High-availability cloud registry"].map(t => (
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
            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-4">Forensic Digital Twin</p>
            <p className="text-2xl md:text-3xl font-bold leading-snug mb-4">
              The DNA compound on the goods.<br />
              <span className="text-primary">The digital record in the cloud.</span><br />
              Linked. Permanent. Designed to support evidential workflows.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The ATS ensures that every forensic marking event on the shelf has an identical,
              cryptographically secured digital counterpart in the cloud, creating an unbreakable
              chain of custody from the moment of theft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Architecture layers ── */}
      <section className="py-20">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">System Architecture</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">Four layers. One chain of custody.</h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-4">
              {LAYERS.map((layer, i) => (
                <motion.div key={layer.n} {...fade(i * 0.1)}
                  className="relative glow-border rounded-lg p-6 md:pl-16 overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-primary/20" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-primary/20" />

                  {/* Step dot */}
                  <div className="hidden md:flex absolute left-[18px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border border-primary/40 items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>

                  <span className="font-mono text-xs text-primary tracking-[0.15em] mb-2 block">{layer.n} · {layer.title}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{layer.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Registry features ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Mykei Registry</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">Cartridge-linked event records at scale</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              The registry is not a passive record. Every marker deployment event is cartridge-linked, timestamped, and designed to support verification and investigation workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {REGISTRY_FEATURES.map((f, i) => (
              <motion.div key={i} {...fade(i * 0.1)}
                className="glow-border rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <h3 className="font-mono text-xs text-primary tracking-wider uppercase">{f.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical specifications ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-5xl">
          <motion.div {...fade(0)} className="mb-12">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Infrastructure</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">Technical specifications</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
            {SPECS.map((spec, i) => (
              <motion.div key={i} {...fade(i * 0.04)} className="bg-background p-5">
                <div className="font-mono text-[10px] text-muted-foreground tracking-wider mb-2">{spec.label}</div>
                <div className="font-mono text-sm text-primary">{spec.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy & compliance ── */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div {...fade(0)}>
              <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">Privacy & Compliance</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">GDPR-compliant by architecture</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                No personal data enters the ATS. The detection mechanism at the edge is a laser vector,
                not a camera. No images, no biometrics, no facial scans are ever captured or transmitted.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All forensic data is stored on AWS UK and EU regional infrastructure. Retailers retain
                ownership of their own event data. Mykei operates as a data processor, not a data controller,
                for retailer-specific records.
              </p>
            </motion.div>
            <motion.div {...fade(0.2)} className="space-y-3">
              {[
                { label: "Personal data collected",   value: "None" },
                { label: "Images captured",           value: "None" },
                { label: "Biometric processing",      value: "None" },
                { label: "Data storage",              value: "AWS UK / EU regions" },
                { label: "Data controller",           value: "Retailer retains ownership" },
                { label: "Mykei role",                value: "Data processor only" },
                { label: "Compliance",                value: "GDPR · UK GDPR" },
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

      {/* ── CTA ── */}
      <section className="py-20 border-t border-border">
        <div className="container px-6 max-w-3xl text-center">
          <motion.div {...fade(0)}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">See the full system in action</h2>
            <p className="text-muted-foreground mb-8">
              The ADN-1 and ATS operate as one integrated system. Request pilot access to deploy
              both at your store as part of the Alpha cohort.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/#contact")}
                className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors rounded"
              >
                Request Pilot Access →
              </button>
              <button
                onClick={() => navigate("/adn-1")}
                className="px-8 py-4 border border-border font-mono text-sm uppercase tracking-wider hover:border-primary/40 transition-colors rounded text-muted-foreground hover:text-foreground"
              >
                View ADN-1 →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
