import { useState, useEffect } from "react";
import PageSEO from "@/components/PageSEO";
import Footer from "@/components/Footer";

const FOREST = "#1A3A2A";
const GROVE  = "#2D5C3F";
const BRASS  = "#C9A84C";
const IVORY  = "#F8F5EE";
const INK    = "#1E1E16";
const MUTED  = "#66665A";
const RULE   = "#DED9CC";
const WHITE  = "#FFFFFF";

function SimpleNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      aria-label="Site navigation"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, padding: "0 clamp(20px,5vw,48px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? `${FOREST}F2` : FOREST,
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
        transition: "background 200ms",
      }}
    >
      <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
        Mykei Securities
      </a>
      <a
        href="/adn-1"
        style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: BRASS, border: `1px solid ${BRASS}`, padding: "7px 14px", textDecoration: "none" }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
      >
        ADN
      </a>
    </nav>
  );
}

const workflowSteps = [
  { num: "01", label: "Mark",             detail: "Apply a unique visible identifier to the asset at point of registration." },
  { num: "02", label: "Register",         detail: "Record ownership, serial number, model, and assigned location in the Asset-Proof registry." },
  { num: "03", label: "Photograph",       detail: "Create a timestamped visual ownership record from multiple angles." },
  { num: "04", label: "Document",         detail: "Capture purchase evidence, chain of custody, and any distinguishing details." },
  { num: "05", label: "Flag Stolen",      detail: "Lock the asset record when theft occurs. The stolen flag cannot be silently deleted." },
  { num: "06", label: "Issue Pack",       detail: "Generate an incident report with ownership record, photos, and chain of custody for investigation." },
];

const recordedItems = [
  "Asset type, description, make and model",
  "Serial number or unique identifier",
  "Owner name and contact details",
  "Photographs from multiple angles",
  "Purchase or acquisition evidence",
  "Assigned location and registration date",
  "Deployed marker reference (where applicable)",
  "Stolen flag and incident date (locked on activation)",
];

const sectors = [
  "Solar companies and battery dealers",
  "Inverter and generator suppliers",
  "Panel and cable distributors",
  "Estate and compound managers",
  "Warehouse and logistics operators",
  "Construction companies and site managers",
  "Schools, churches, and facility administrators",
  "Security installers adding registry to their service offer",
];

const notList = [
  "ADN, a different product for UK retail shelves",
  "Forensic DNA at this stage",
  "Police approval or endorsement",
  "An insurance product or policy",
  "A theft guarantee or recovery promise",
  "A real-time GPS tracking system",
  "A guarding or patrol service",
];

export default function ProtocolPage() {
  return (
    <>
      <PageSEO
        title="Asset-Proof Nigeria | Mykei Securities"
        description="Asset-Proof Nigeria is Mykei's registry-first field programme for making high-value movable assets harder to sell without a traceable record, including solar batteries, inverters, generators, tools, and estate equipment."
        canonical="https://mykei.io/protocol"
        ogType="website"
        ogImage="https://mykei.io/social-share.png"
        ogImageAlt="Asset-Proof Nigeria by Mykei Securities"
      />

      <SimpleNav />

      <a
        href="#main-content"
        style={{ position: "absolute", left: -9999, top: 8, zIndex: 9999, background: FOREST, color: WHITE, padding: "8px 16px", borderRadius: 4, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
        onFocus={e => { e.currentTarget.style.left = "8px"; }}
        onBlur={e => { e.currentTarget.style.left = "-9999px"; }}
      >
        Skip to main content
      </a>

      <main id="main-content" style={{ paddingTop: 60, background: IVORY }}>

        {/* 1. Hero */}
        <section
          aria-labelledby="protocol-heading"
          style={{
            background: FOREST,
            padding: "clamp(72px,12vw,112px) clamp(20px,5vw,48px) clamp(64px,10vw,96px)",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <div style={{ width: 28, height: 2, background: BRASS }} aria-hidden="true" />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)" }}>
                Mykei · Registry-First Programme · Nigeria
              </span>
            </div>
            <h1
              id="protocol-heading"
              style={{ fontSize: "clamp(2.25rem,7vw,3.75rem)", fontWeight: 700, lineHeight: 1.06, color: WHITE, margin: "0 0 22px", letterSpacing: "-0.025em", maxWidth: 640 }}
            >
              Asset-Proof Nigeria
            </h1>
            <p style={{ fontSize: "clamp(1.125rem,3vw,1.375rem)", fontWeight: 400, color: "rgba(255,255,255,0.88)", margin: "0 0 32px", lineHeight: 1.5, maxWidth: 520 }}>
              Make high-value assets harder to sell without a traceable record.
            </p>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.78)", maxWidth: 600, margin: 0 }}>
              A registry-first field programme for solar batteries, inverters, generators,
              panels, cables, tools, estate equipment, warehouse goods, construction assets,
              and school, church and facility property across Nigeria.
            </p>
          </div>
        </section>

        <div style={{ height: 3, background: `linear-gradient(90deg,${BRASS} 0%,transparent 70%)` }} aria-hidden="true" />

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(20px,5vw,48px)" }}>

          {/* 2. What Asset-Proof is */}
          <section aria-labelledby="what-heading" style={{ padding: "clamp(56px,9vw,80px) 0" }}>
            <h2 id="what-heading" style={{ fontSize: "clamp(1.125rem,2.8vw,1.375rem)", fontWeight: 700, color: INK, marginBottom: 20, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              What Asset-Proof is
            </h2>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: MUTED, margin: "0 0 20px" }}>
              Asset-Proof Nigeria is Mykei's registry-first field programme for making
              high-value movable assets harder to sell without a traceable record. It is not a device
              product. It is a structured ownership record, a marked asset, and a stolen flag
              that cannot be quietly removed.
            </p>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: MUTED, margin: 0 }}>
              The programme tests one premise: if an asset has a registered owner, a
              documented identity, and a locked stolen flag, it becomes harder to move
              through informal markets without raising questions.
            </p>
          </section>

          <div style={{ height: 1, background: RULE }} aria-hidden="true" />

          {/* Bridge line, doctrine connection */}
          <section aria-labelledby="bridge-heading" style={{ padding: "clamp(40px,7vw,60px) 0" }}>
            <h2 id="bridge-heading" style={{ fontSize: "clamp(1.125rem,2.8vw,1.375rem)", fontWeight: 700, color: INK, marginBottom: 20, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              How this connects to Mykei's doctrine
            </h2>
            <blockquote
              style={{
                borderLeft: `3px solid ${BRASS}`,
                margin: 0,
                padding: "16px 0 16px 24px",
                fontStyle: "normal",
              }}
            >
              <p style={{ fontSize: "clamp(1rem,2.4vw,1.125rem)", lineHeight: 1.75, color: INK, margin: 0, fontWeight: 500 }}>
                Asset-Proof tests the registry-first side of Economic Sterilisation in Nigeria.
                ADN tests the active shelf-level side in UK retail.
              </p>
            </blockquote>
            <p style={{ fontSize: "clamp(0.9375rem,2.2vw,1rem)", lineHeight: 1.8, color: MUTED, margin: "20px 0 0" }}>
              Economic Sterilisation is the doctrine that theft becomes less rewarding when
              stolen goods cannot be sold without a traceable record. Asset-Proof applies that logic using
              a registry and a mark. ADN applies it using a shelf sensor and a controlled
              marker. Both operate on the same economic premise. Neither is the other product.
            </p>
          </section>

          <div style={{ height: 1, background: RULE }} aria-hidden="true" />

          {/* 3. Why Nigeria */}
          <section aria-labelledby="why-heading" style={{ padding: "clamp(56px,9vw,80px) 0" }}>
            <h2 id="why-heading" style={{ fontSize: "clamp(1.125rem,2.8vw,1.375rem)", fontWeight: 700, color: INK, marginBottom: 20, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              Why Nigeria, why movable assets
            </h2>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: MUTED, margin: "0 0 20px" }}>
              Solar batteries, inverters, generators, and panel systems represent significant
              capital for Nigerian businesses, schools, and households. They are portable,
              high-value, and widely traded in informal markets where provenance is rarely
              checked. A stolen inverter can change hands in hours with no questions asked.
            </p>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: MUTED, margin: 0 }}>
              That lack of traceable ownership is not a cultural problem. It is a structural one. Asset-Proof
              is designed to change the structure: registered assets have an identity, and
              that identity does not disappear when they are taken.
            </p>
          </section>

          <div style={{ height: 1, background: RULE }} aria-hidden="true" />

          {/* 4. Registry-first workflow */}
          <section aria-labelledby="workflow-heading" style={{ padding: "clamp(56px,9vw,80px) 0" }}>
            <h2 id="workflow-heading" style={{ fontSize: "clamp(1.125rem,2.8vw,1.375rem)", fontWeight: 700, color: INK, marginBottom: 28, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              The registry-first workflow
            </h2>
            <ol aria-label="Asset-Proof six-step workflow" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 2 }}>
              {workflowSteps.map((step) => (
                <li
                  key={step.num}
                  style={{
                    display: "flex", gap: 24,
                    padding: "18px 0",
                    borderBottom: `1px solid ${RULE}`,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 600, color: GROVE, minWidth: 24, paddingTop: 4, flexShrink: 0, letterSpacing: "0.06em" }}
                  >
                    {step.num}
                  </span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 700, color: INK, fontSize: "0.9375rem" }}>{step.label}</span>
                    <span aria-hidden="true" style={{ color: RULE, margin: "0 10px", fontSize: "0.75rem" }}> / </span>
                    <span style={{ color: MUTED, fontSize: "0.9375rem", lineHeight: 1.65 }}>{step.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div style={{ height: 1, background: RULE }} aria-hidden="true" />

          {/* 5. What gets recorded */}
          <section aria-labelledby="records-heading" style={{ padding: "clamp(56px,9vw,80px) 0" }}>
            <h2 id="records-heading" style={{ fontSize: "clamp(1.125rem,2.8vw,1.375rem)", fontWeight: 700, color: INK, marginBottom: 24, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              What gets recorded
            </h2>
            <ul aria-label="Fields recorded in the Asset-Proof registry" style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 0 }}>
              {recordedItems.map(item => (
                <li
                  key={item}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, color: MUTED, fontSize: "1rem", lineHeight: 1.7, borderBottom: `1px solid ${RULE}`, padding: "12px 0" }}
                >
                  <span aria-hidden="true" style={{ color: GROVE, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem", paddingTop: 4 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "clamp(0.9375rem,2.2vw,1rem)", lineHeight: 1.8, color: MUTED, margin: 0 }}>
              No suspect database. No personal data on third parties. The registry records
              assets and ownership events, not people or surveillance data.
            </p>
          </section>

          <div style={{ height: 1, background: RULE }} aria-hidden="true" />

          {/* 6. Who this is for */}
          <section aria-labelledby="who-heading" style={{ padding: "clamp(56px,9vw,80px) 0" }}>
            <h2 id="who-heading" style={{ fontSize: "clamp(1.125rem,2.8vw,1.375rem)", fontWeight: 700, color: INK, marginBottom: 24, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              Who Asset-Proof is for
            </h2>
            <ul aria-label="Target sectors for Asset-Proof Nigeria" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 0 }}>
              {sectors.map(item => (
                <li
                  key={item}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, color: MUTED, fontSize: "1rem", lineHeight: 1.7, borderBottom: `1px solid ${RULE}`, padding: "12px 0" }}
                >
                  <span aria-hidden="true" style={{ color: GROVE, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem", paddingTop: 4 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div style={{ height: 1, background: RULE }} aria-hidden="true" />

          {/* 7. What this is not */}
          <section aria-labelledby="not-heading" style={{ padding: "clamp(56px,9vw,80px) 0" }}>
            <h2 id="not-heading" style={{ fontSize: "clamp(1.125rem,2.8vw,1.375rem)", fontWeight: 700, color: INK, marginBottom: 24, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              What Asset-Proof is not
            </h2>
            <ul aria-label="Asset-Proof scope limitations" style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gap: 0 }}>
              {notList.map(item => (
                <li
                  key={item}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, color: MUTED, fontSize: "1rem", lineHeight: 1.7, borderBottom: `1px solid ${RULE}`, padding: "12px 0" }}
                >
                  <span aria-hidden="true" style={{ color: GROVE, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem", paddingTop: 4 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: MUTED, margin: 0 }}>
              Advanced marking tiers, including microdots, taggants, and forensic markers, are
              being evaluated for later pilot stages. They are not part of the current
              programme.
            </p>
          </section>

          <div style={{ height: 1, background: RULE }} aria-hidden="true" />

          {/* 8. Pilot intake */}
          <section aria-labelledby="pilot-heading" style={{ padding: "clamp(56px,9vw,80px) 0" }}>
            <h2 id="pilot-heading" style={{ fontSize: "clamp(1.125rem,2.8vw,1.375rem)", fontWeight: 700, color: INK, marginBottom: 20, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              Pilot intake
            </h2>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: MUTED, margin: "0 0 20px" }}>
              Asset-Proof Nigeria is in its validation phase. We are working with a small
              number of organisations across Lagos and Abuja to test the workflow before
              wider deployment.
            </p>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: MUTED, margin: "0 0 20px" }}>
              A pilot typically starts with 10 to 25 assets, one team member trained to
              operate the registry, and a 30-day review. The first conversation takes 10
              minutes. No commitment required.
            </p>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: MUTED, margin: 0 }}>
              If your organisation manages high-value movable assets and you want to
              understand whether this makes sense for your situation, request a briefing
              below.
            </p>
          </section>

        </div>

        {/* 9. CTA */}
        <section
          aria-labelledby="contact-heading"
          style={{ background: FOREST, padding: "clamp(56px,9vw,88px) clamp(20px,5vw,48px)", textAlign: "center" }}
        >
          <div style={{ maxWidth: 540, margin: "0 auto" }}>
            <div style={{ width: 32, height: 2, background: BRASS, margin: "0 auto 28px" }} aria-hidden="true" />
            <h2
              id="contact-heading"
              style={{ fontSize: "clamp(1.375rem,3.5vw,1.75rem)", fontWeight: 700, color: WHITE, margin: "0 0 20px", lineHeight: 1.2, letterSpacing: "-0.015em" }}
            >
              Request an Asset-Proof briefing
            </h2>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.0625rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.82)", margin: "0 0 36px" }}>
              We are currently accepting pilot conversations with solar companies,
              battery dealers, estates, schools, churches, warehouses, construction
              operators, and security installers across Nigeria.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <a
                href="mailto:protocol@mykei.io?subject=Asset-Proof Nigeria Briefing Request"
                aria-label="Request Asset-Proof briefing by email at protocol@mykei.io"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 36px", background: BRASS, color: INK, borderRadius: 4, fontWeight: 700, fontSize: "0.9375rem", textDecoration: "none", letterSpacing: "0.01em", transition: "opacity 150ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.82"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                Request Asset-Proof briefing
              </a>
              <a
                href="mailto:protocol@mykei.io?subject=Asset-Proof Nigeria Registry-First Pilot"
                aria-label="Discuss a registry-first pilot by email at protocol@mykei.io"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 44, padding: "0 28px", background: "transparent", color: "rgba(255,255,255,0.88)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 4, fontWeight: 500, fontSize: "0.875rem", textDecoration: "none", letterSpacing: "0.01em", transition: "opacity 150ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                Discuss registry-first pilot
              </a>
            </div>
            <p style={{ marginTop: 24, fontSize: "0.8125rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.6 }}>
              protocol@mykei.io &mdash; no pitch deck required
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
