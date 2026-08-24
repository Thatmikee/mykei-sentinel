import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageSEO from "@/components/PageSEO";

const DARK = "#1E1E1E";
const GOLD = "#D8001F";
const CREAM   = "#FFFFFF";   // page ground
const ONDARK  = "#F7F8FA";   // light type on ink blocks
const MUTED = "#767D88";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Economic Sterilisation: The Corporate Doctrine",
  description:
    "The systematic disruption of resale incentive through forensic marking and registry event records. The foundational doctrine of Mykei Securities Ltd.",
  author: {
    "@type": "Person",
    "@id": "https://michaelesema.com/#person",
    name: "Michael Esema",
  },
  publisher: {
    "@type": "Organization",
    name: "Mykei Securities Ltd",
    url: "https://mykei.io",
  },
  datePublished: "2025",
  url: "https://mykei.io/thesis",
  about: {
    "@type": "DefinedTerm",
    name: "Economic Sterilisation",
    url: "https://mykei.io/economic-sterilisation",
  },
};

const comparisonRows = [
  ["Primary mechanism", "Deter, detect, or delay", "Remove commercial value"],
  ["What it targets", "The act of theft", "The incentive for theft"],
  ["Requires staff action", "Yes", "No, designed to trigger without staff input"],
  [
    "Uses cameras or biometrics",
    "Almost always",
    "Never, GDPR by design",
  ],
  [
    "Effective after theft occurs",
    "No",
    "Yes, goods carry a registry-linked forensic record",
  ],
  ["Addresses resale market", "No", "Yes, registry-linked event records support resale verification workflows"],
  ["Reduces repeat theft", "Marginally", "Systematically"],
];

function PullQuote({ text }: { text: string }) {
  return (
    <blockquote
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 22,
        fontStyle: "italic",
        borderLeft: "3px solid #D8001F",
        padding: "20px 0 20px 28px",
        margin: "36px 0",
        color: "#1E1E1E",
      }}
    >
      {text}
    </blockquote>
  );
}

function SectionDivider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #D8001F",
        opacity: 0.4,
        margin: "48px 0",
      }}
    />
  );
}

export default function ThesisPage() {
  useEffect(() => {
    document.title = "Economic Sterilisation: The Doctrine | Mykei Securities";

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "thesis-schema";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("thesis-schema");
      if (el) el.remove();
    };
  }, []);

  return (
    <div style={{ fontFamily: "Georgia, serif", color: DARK, background: "#fff", minHeight: "100vh" }}>
      <PageSEO
        title="Economic Sterilisation: The Doctrine | Mykei Securities"
        description="The complete doctrine of Economic Sterilisation by Michael Esema. How removing resale confidence through forensic marking and registry event records attacks the economics of retail crime."
        canonical="https://mykei.io/thesis"
        ogType="article"
        keywords="economic sterilisation doctrine, Michael Esema, retail theft economics, forensic deterrence, theft incentive, Mykei Securities"
      />
      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: CREAM,
          borderBottom: `1px solid #E0D8CE`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: 56,
        }}
      >
        <Link
          to="/"
          style={{ color: DARK, textDecoration: "none", fontWeight: 700, fontSize: 16, letterSpacing: "0.04em" }}
        >
          Mykei Securities
        </Link>
        <Link
          to="/"
          style={{ color: MUTED, textDecoration: "none", fontSize: 13, letterSpacing: "0.06em" }}
        >
          mykei.io
        </Link>
      </nav>

      {/* Hero */}
      <section
        style={{
          background: DARK,
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: 40,
          paddingRight: 40,
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: GOLD,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Doctrine, 2025
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            color: ONDARK,
            fontWeight: 700,
            lineHeight: 1.15,
            margin: "0 auto 28px",
            maxWidth: 780,
          }}
        >
          Economic Sterilisation
        </h1>
        <p
          style={{
            color: "#C9BFB4",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.75,
            maxWidth: 680,
            margin: "0 auto 36px",
          }}
        >
          The systematic disruption of resale confidence through forensic marking and registry event records, eliminating the commercial incentive for theft at the point it occurs.
        </p>
        <p
          style={{
            color: GOLD,
            fontSize: 13,
            letterSpacing: "0.06em",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Michael Esema, Founder, Mykei Securities Ltd. Coined 2025.
        </p>
      </section>

      {/* Article Body */}
      <main
        style={{
          background: CREAM,
          padding: "80px 40px",
        }}
      >
        <article style={{ maxWidth: 800, margin: "0 auto" }}>

          {/* Section 1: The Problem */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={sectionHeading}>1. The Problem</h2>

            {/* Drop cap on first paragraph */}
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              <span
                style={{
                  fontSize: 72,
                  float: "left",
                  lineHeight: 0.85,
                  paddingRight: 10,
                  color: "#D8001F",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                U
              </span>
              K retail theft is not a marginal inconvenience. The British Retail Consortium reported £1.8 billion in retail shrinkage for 2024, a figure that reflects direct inventory loss before operational response costs, insurance premiums, or deterrence infrastructure are factored in. That number has grown materially year on year, and the growth is not random.
            </p>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Organised retail crime operates on a simple commercial logic: stolen goods have resale value, and that value is immediately accessible via digital marketplaces. Facebook Marketplace, Vinted, eBay, and dozens of niche resale platforms have created a secondary economy in which the friction between theft and monetisation has collapsed to near zero. A professional shoplifter operating in Greater Manchester today can list stolen goods for sale within minutes of leaving a store.
            </p>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Existing security approaches were designed for a different environment. CCTV, electronic article surveillance, security guards, and access controls were conceived before the modern resale infrastructure existed. They remain valuable in their original purpose: deterring opportunistic theft, delaying physical removal of goods, and generating evidence for prosecution. They were not designed to address the incentive structure that drives organised retail crime, and they cannot.
            </p>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              The consequence is a structural gap: no matter how sophisticated the in-store deterrent, once goods leave the building they become assets. The theft is complete. The commercial transaction follows. Prosecution rates for retail theft are low, and the economic calculus for organised offenders remains favourable.
            </p>
          </section>

          <SectionDivider />

          {/* Section 2: The Doctrine Defined */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={sectionHeading}>2. The Doctrine Defined</h2>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Economic Sterilisation is a doctrine, not a device. It is a principle governing how security infrastructure should be designed: not to prevent theft at the point of occurrence alone, but to destroy the commercial value of stolen goods permanently and automatically. The ADN system is a prototype-stage implementation of it.
            </p>

            <PullQuote text="I am not building a security company. I am building the argument that theft should not pay." />

            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              The doctrine rests on three interdependent components.
            </p>
            <h3 style={subHeading}>Forensic Marking</h3>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Goods are marked with a batch-identifiable controlled marker registered to the specific deployment event. The marking is invisible to the naked eye, UV-detectable, and subject to supplier SDS and COSHH review. Each deployment creates a tamper-aware link between the marked goods and a timestamped registry event record. This is not a deterrent sticker. It is a forensic layer that connects the physical item to a verifiable digital record.
            </p>
            <h3 style={subHeading}>Cloud Logging via the Mykei Registry</h3>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              The Mykei Registry is a designed event-record architecture, not yet a live product. When a deployment event is detected, the design intent is that it is logged with device ID, store location, timestamp, event type, and cartridge batch reference. The goal is a tamper-aware audit trail of inventory events that have left legitimate custody without authorisation. Registry records are designed to support verification, insurer review, and investigation workflows.
            </p>
            <h3 style={subHeading}>Secondary-Market Disruption</h3>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Registry-linked event records are designed to support secondary-market verification workflows. Stolen goods that are forensically marked and registry-logged carry a traceable connection to their deployment event, making anonymous resale harder to sustain. The intended pathway includes future alignment with resale platform verification and law enforcement evidence workflows, subject to commercial and compliance agreement.
            </p>

            <PullQuote text="Economic Sterilisation is not a product feature. It is a claim about causality." />

            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Together, these three components operate as a system rather than a sequence. The forensic marker makes every item batch-identifiable. The Mykei Registry converts deployment events into tamper-aware audit records. Secondary-market verification workflows extend the system's intended reach beyond the physical store and into the channels where stolen goods are monetised. The result: theft-linked goods carry a traceable forensic record that disrupts resale confidence.
            </p>
          </section>

          <SectionDivider />

          {/* Section 3: Comparison Table */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={sectionHeading}>3. Why Deterrence Has a Ceiling</h2>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Deterrence-based security operates on the assumption that raising the perceived risk of theft reduces the incidence of theft. This assumption holds for opportunistic theft and is the theoretical basis for most conventional security investment. Its limitation becomes apparent at the organised level, where professional offenders conduct rational cost-benefit analysis before each operation, factoring in deterrent measures as variables rather than prohibitions.
            </p>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Economic Sterilisation operates on a different logic. It does not raise the cost of the act. It eliminates the return.
            </p>
            <div style={{ overflowX: "auto", marginTop: 32, marginBottom: 16 }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                <thead>
                  <tr style={{ background: DARK }}>
                    <th style={thStyle}>Aspect</th>
                    <th style={thStyle}>Traditional Security</th>
                    <th style={{ ...thStyle, color: GOLD }}>Economic Sterilisation</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([aspect, traditional, sterilisation], i) => (
                    <tr
                      key={aspect}
                      style={{ background: i % 2 === 0 ? "#fff" : "#F0EBE4" }}
                    >
                      <td style={tdStyleBold}>{aspect}</td>
                      <td style={tdStyle}>{traditional}</td>
                      <td style={{ ...tdStyle, color: "#5C4A30", fontWeight: 600 }}>{sterilisation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...bodyText, color: MUTED, fontSize: 12, marginTop: 8, lineHeight: 1.8 }}>
              Comparison based on Mykei Securities analysis of publicly available retail security literature and BRC data.
            </p>
          </section>

          <SectionDivider />

          {/* Section 4: Predictive Modelling */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={sectionHeading}>4. Predictive Modelling 2026–2036</h2>
            <p style={{ ...bodyText, color: MUTED, fontSize: 13, marginBottom: 24, lineHeight: 1.8 }}>
              The following projections are Mykei Securities' own analysis based on BRC and ACS published data.
            </p>

            <h3 style={subHeading}>Current Trajectory</h3>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              UK retail theft grew approximately 27% between 2022 and 2024. Applying a conservative linear projection to this trajectory, and accounting for the structural drivers described below, annual shrinkage could reach £2.3 to £2.5 billion by 2028 to 2030 in the absence of structural intervention. This is not a worst-case scenario. It assumes growth moderates from recent rates. It does not assume acceleration.
            </p>

            <h3 style={subHeading}>Accelerating Factors</h3>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Three forces are compounding the underlying trend. First, social commerce has dramatically reduced the friction of selling second-hand goods. Platforms originally designed for peer-to-peer decluttering now serve as distribution infrastructure for organised retail crime. Second, AI-assisted listing generation allows thieves to produce convincing product descriptions that bypass simple keyword-based detection filters deployed by some platforms. Third, cross-border digital commerce has expanded the addressable resale market for UK stolen goods. Vinted alone operates across more than 20 European countries. Goods stolen in Manchester can be listed, sold, and shipped to a buyer in Poland within 48 hours.
            </p>

            <h3 style={subHeading}>The Counterfactual: Economic Sterilisation Adoption</h3>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              If 15% of UK independent retailers adopted forensic marking by 2030, the marginal profitability of organised retail crime targeting those stores collapses. Organised offenders adapt, but adaptation is not free. Identifying which stores are marked requires reconnaissance. Avoiding marked stock requires more selective targeting. Attempting to sell marked goods risks forensic exposure. Each of these adaptations represents operational cost. The doctrine does not make crime impossible. It makes it more expensive and less predictable for the offender.
            </p>

            <h3 style={subHeading}>The Network Threshold</h3>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              Economic Sterilisation compounds with geographic density. A single marked store is a harder target. Ten marked stores in a high street create a different operating environment for organised offenders: any given theft has a meaningful probability of yielding sterile inventory. The estimated threshold for geography-level deterrent effect is approximately 20 to 25% adoption across a defined retail area. Below this threshold, offenders route around marked stores. At or above it, the geography itself becomes less profitable to target.
            </p>

            <h3 style={subHeading}>2036 Scenario</h3>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              The most useful historical analogy is the adoption of commercial alarm systems in UK retail through the 1980s and 1990s. Alarm systems did not eliminate burglary. They changed its economics: professional burglars adapted techniques, targeted softer locations, or exited the market. Forensic marking is following the same adoption curve, compressed by digital distribution channels that make the doctrine's effects visible faster.
            </p>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              By 2036, the base-case scenario is a UK retail security market in which systematic forensic marking is a standard line item, embedded in retail security specifications alongside CCTV and EAS. Organised retail crime does not disappear. The incentive structure, however, changes fundamentally. Goods that cannot be sold at profit cannot justify the operational investment required to steal them at scale.
            </p>
          </section>

          <SectionDivider />

          {/* Section 5: Patent and Attribution */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={sectionHeading}>5. Patent and Attribution</h2>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              The term "Economic Sterilisation" was coined by Michael Esema in 2025. No prior use of the term in the context of retail security has been identified in published academic or commercial literature. It represents a novel framing of the relationship between forensic asset marking, digital registry systems, and commercial incentive removal.
            </p>

            <PullQuote text="The patent is 17 claims. The doctrine is one sentence." />

            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              UK patent application GB2606630.8, filed 23 March 2026, 17 claims, patent pending.
            </p>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              The ADN is a prototype-stage implementation of the Economic Sterilisation doctrine. The Independent Retail Pilot, planned across selected retailers in Greater Manchester, is intended to generate the first real-world efficacy data. Results from the pilot will be published in summary form on this site.
            </p>
            <p style={{ ...bodyText, color: MUTED, lineHeight: 1.8 }}>
              Mykei Securities Ltd. Company No. 16984969.
            </p>
          </section>

          <SectionDivider />

          {/* Founder's Note */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={sectionHeading}>Founder's Note</h2>
            <p style={{ ...bodyText, lineHeight: 1.8 }}>
              This paper is not a pitch. It is a position. Economic Sterilisation is not a security concept repurposed for retail. It is a doctrine built from first principles on the observation that theft is a commercial transaction, not a criminal impulse. Remove the commercial outcome and the transaction stops. The ADN is the implementation. The patent is the record. This page is the argument.
            </p>
            <p style={{ ...bodyText, color: MUTED, fontSize: 14, marginBottom: 16, lineHeight: 1.8 }}>
              M.E., April 2026
            </p>
            <svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 40 C20 20, 35 15, 45 30 C55 45, 60 25, 70 20 C80 15, 85 35, 90 30 C100 20, 110 10, 125 25 C135 35, 140 20, 155 15 C165 10, 175 30, 185 25 C195 20, 205 35, 210 30" stroke="#D8001F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M8 48 C50 48, 100 50, 160 47" stroke="#D8001F" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
            </svg>
          </section>

        </article>
      </main>

      {/* CTA Section */}
      <section
        style={{
          background: DARK,
          padding: "72px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: GOLD,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Independent Retail Pilot, 2026
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: ONDARK,
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 700,
            marginBottom: 16,
            lineHeight: 1.3,
          }}
        >
          Commercial terms agreed directly with Mykei.
        </h2>
        <p style={{ color: "#C9BFB4", fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
          Join the Independent Retail Pilot and be among the first retailers to deploy Economic Sterilisation in Greater Manchester.
        </p>
        <Link
          to="/contact"
          style={{
            display: "inline-block",
            background: GOLD,
            color: DARK,
            padding: "14px 36px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.08em",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Apply for the Pilot
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#120D07",
          padding: "32px 40px",
          textAlign: "center",
          color: MUTED,
          fontSize: 12,
          letterSpacing: "0.04em",
        }}
      >
        <p style={{ margin: 0 }}>
          Mykei Securities Ltd. Co. No. 16984969.{" "}
          <Link to="/thesis" style={{ color: MUTED, textDecoration: "underline" }}>Thesis</Link>
          {" · "}
          <Link to="/signal" style={{ color: MUTED, textDecoration: "underline" }}>The Brief</Link>
          {" · "}
          <Link to="/contact" style={{ color: MUTED, textDecoration: "underline" }}>Pilot</Link>
        </p>
      </footer>
    </div>
  );
}

const sectionHeading: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
  fontWeight: 700,
  color: DARK,
  borderBottom: `2px solid ${GOLD}`,
  paddingBottom: 12,
  marginBottom: 24,
  marginTop: 0,
};

const subHeading: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "1.1rem",
  fontWeight: 700,
  color: DARK,
  marginTop: 32,
  marginBottom: 12,
};

const bodyText: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.85,
  color: "#2E1F10",
  marginBottom: 20,
  marginTop: 0,
};

const thStyle: React.CSSProperties = {
  color: ONDARK,
  fontFamily: "'Arial', sans-serif",
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: 700,
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: 14,
  color: "#2E1F10",
  borderBottom: `1px solid #E0D8CE`,
  verticalAlign: "top",
};

const tdStyleBold: React.CSSProperties = {
  ...tdStyle,
  fontWeight: 700,
  color: DARK,
  width: "28%",
};
