// src/pages/SignalCoopCrimeWarPage.tsx
// The Signal · Issue 16: Co-op's public war on retail crime and why naming the enemy doesn't change the economics
// Premium editorial layout: WSJ / Financial Times print standard

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";

const GOLD = "#c9a84c";
const GOLD_DARK = "#B8922A";
const INK = "#0F0C08";
const MID = "#5c4a32";
const WARM = "#F5F1EB";
const RULE = "#DDD5C4";
const PALE = "#FAFAF7";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, visible: v };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity 0.8s cubic-bezier(.22,.68,0,1.2) ${delay}s, transform 0.8s cubic-bezier(.22,.68,0,1.2) ${delay}s` }}>
      {children}
    </div>
  );
}

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200, background: "transparent" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: GOLD, transition: "width 0.1s linear" }} />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
      <div style={{ height: 1, width: 32, background: GOLD }} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD_DARK }}>
        {children}
      </div>
    </div>
  );
}

export default function SignalCoopCrimeWarPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="Co-op Named the Enemy. Nobody Changed the Economics. | The Signal"
        description="Co-op reported over 300,000 incidents of retail crime in 2024-25 and publicly named organised gangs. The government responded with the Retail Crime Action Plan. Charges are still rare. Stolen goods are still sellable. Michael Esema on why the economics of theft have not moved."
        canonical="https://mykei.io/signal/coop-named-the-enemy-economics-unchanged"
        ogImage="https://mykei.io/og/signal-coop-named-the-enemy-economics-unchanged.png"
        keywords="Co-op retail crime 2025, Co-op shoplifting statistics UK, Retail Crime Action Plan Home Office, organised retail crime UK gangs, BRC crime survey 2025, shoplifting charges UK, retail theft prosecution rate, economic sterilisation retail, ADN-1 forensic marking, Shirine Khoury-Haq Co-op CEO"
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Co-op Named the Enemy. Nobody Changed the Economics.",
          "description": "Co-op reported over 300,000 incidents of retail crime in 2024-25. The government launched the Retail Crime Action Plan. Charge rates remain low and stolen goods remain sellable. Michael Esema on why naming the problem is not the same as solving it.",
          "url": "https://mykei.io/signal/coop-named-the-enemy-economics-unchanged",
          "datePublished": "2026-05-07T09:00:00Z",
          "dateModified": "2026-05-07T09:00:00Z",
          "author": { "@type": "Person", "name": "Michael Esema", "url": "https://mykei.io/founder" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Retail Security",
          "keywords": "Co-op, retail crime, organised retail crime, Retail Crime Action Plan, economic sterilisation, ADN-1",
          "mentions": [
            { "@type": "Organization", "name": "Co-operative Group", "alternateName": "Co-op", "sameAs": "https://www.co-operativegroup.coop" },
            { "@type": "Organization", "name": "British Retail Consortium", "alternateName": "BRC", "sameAs": "https://www.brc.org.uk" },
            { "@type": "Organization", "name": "Association of Convenience Stores", "alternateName": "ACS", "sameAs": "https://www.acs.org.uk" },
            { "@type": "Organization", "name": "Home Office", "sameAs": "https://www.gov.uk/government/organisations/home-office" },
            { "@type": "Organization", "name": "National Police Chiefs Council", "alternateName": "NPCC" },
            { "@type": "Person", "name": "Shirine Khoury-Haq", "jobTitle": "CEO", "affiliation": { "@type": "Organization", "name": "Co-operative Group" } },
            { "@type": "Person", "name": "Yvette Cooper", "jobTitle": "Home Secretary" }
          ],
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] }
        })}
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "Co-op Named the Enemy. Nobody Changed the Economics.", url: "https://mykei.io/signal/coop-named-the-enemy-economics-unchanged" },
        ]}
        articleMeta={{
          publishedTime: "2026-05-07T09:00:00Z",
          author: "Michael Esema",
          section: "Retail Security",
          tags: ["Co-op", "retail crime", "organised retail crime", "Retail Crime Action Plan", "BRC", "economic sterilisation", "ADN-1"],
        }}
      />

      <ReadingProgress />

      <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#fff", color: INK, minHeight: "100vh" }}>

        {/* ── Sticky masthead nav ── */}
        <nav aria-label="Article navigation" style={{ borderBottom: `1px solid ${RULE}`, padding: "0 40px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(16px)", zIndex: 100 }}>
          <a href="/signal" className="signal-nav-link" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: GOLD_DARK, textDecoration: "none", textTransform: "uppercase" }}>
            The Signal
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: MID }}>Issue 16 · May 2026</span>
            <a href="/pilot" className="signal-nav-cta" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", color: "#fff", background: INK, textDecoration: "none", textTransform: "uppercase", padding: "8px 18px", borderRadius: 3 }}>
              Join the Pilot
            </a>
          </div>
        </nav>

        {/* ── Hero masthead ── */}
        <div style={{ background: INK, borderBottom: `3px solid ${GOLD}` }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 48px 56px" }}>
            <Reveal>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 28, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD }}>
                  The Signal · Issue 16 · Organised Retail Crime
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", border: `1px solid rgba(201,168,76,0.5)`, color: GOLD, padding: "2px 10px", borderRadius: 2 }}>
                  Industry Analysis
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "clamp(30px, 5.5vw, 60px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 28px", maxWidth: 820 }}>
                Co-op named the enemy.<br />Nobody changed the economics.
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="article-standfirst" style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(15px, 1.8vw, 19px)", lineHeight: 1.7, color: "rgba(245,241,235,0.82)", margin: "0 0 36px", maxWidth: 680, fontStyle: "italic" }}>
                The Co-op recorded over 300,000 incidents of crime against its stores in a single year and went public about organised gangs by name. The government responded with an action plan. Charge rates stayed low. Stolen goods stayed sellable. The question that nobody answered is the only one that matters.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, borderTop: `1px solid rgba(221,213,196,0.2)`, paddingTop: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: INK, fontSize: 14, flexShrink: 0 }}>ME</div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: "#fff" }}>Michael Esema</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(245,241,235,0.55)", letterSpacing: "0.1em" }}>
                    Founder, Mykei Securities · 7 May 2026 · 7 min read
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Three-stat infographic bar ── */}
        <div style={{ background: WARM, borderBottom: `1px solid ${RULE}` }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[
              { n: "300,000+", label: "incidents of crime recorded by Co-op in 2024-25, their highest ever reported figure", src: "Co-op Crime Report 2025" },
              { n: "1 in 5", label: "shoplifting cases nationally result in a charge. In London, the ratio is closer to 1 in 14", src: "Liberal Democrats / NPCC data" },
              { n: "£2.2B", label: "estimated cost of retail crime to UK retailers in 2024, up from £1.8B the year before", src: "BRC Crime Survey 2025" },
            ].map(({ n, label, src }, i) => (
              <div key={n} style={{ padding: "32px 0", borderRight: i < 2 ? `1px solid ${RULE}` : "none", paddingRight: i < 2 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0 }}>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: INK, lineHeight: 1, marginBottom: 10, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontSize: 13, lineHeight: 1.65, color: MID, marginBottom: 8, maxWidth: 220 }}>{label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: GOLD_DARK, letterSpacing: "0.16em", textTransform: "uppercase" }}>{src}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Article body ── */}
        <article style={{ maxWidth: 720, margin: "0 auto", padding: "72px 40px 80px" }}>

          {/* Opening with drop cap */}
          <Reveal>
            <p className="article-drop-cap" style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              The Co-op does not usually make headlines by naming criminal gangs. It made them in 2025 when CEO Shirine Khoury-Haq wrote publicly that the retailer had identified organised groups responsible for a disproportionate share of its losses, and that these groups were operating with what she described as near impunity. More than 300,000 incidents in a year. Staff threatened. Store closures considered in the worst-affected areas. The tone was not a press release. It read like an organisation that had run out of polite language.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              The government responded. Yvette Cooper's Home Office launched the Retail Crime Action Plan, committing dedicated police resource to retail crime, faster charging decisions for persistent offenders, and a named retail crime unit within the National Police Chiefs Council structure. Retailers welcomed it. Security industry bodies welcomed it. It was the most coordinated institutional response to organised retail crime in a decade.
            </p>
          </Reveal>

          {/* WSJ-style pull quote — centered, with horizontal rules */}
          <Reveal>
            <blockquote aria-hidden="true" style={{ margin: "52px 0", padding: "0", textAlign: "center" }}>
              <div style={{ height: 1, background: INK, marginBottom: 28 }} />
              <p style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.45, fontStyle: "italic", color: INK, margin: "0 0 10px", fontWeight: 400 }}>
                "Retail workers should not have to face violence and abuse as part of their job. We are taking this seriously."
              </p>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: MID, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 28 }}>Home Office, Retail Crime Action Plan, 2025</div>
              <div style={{ height: 1, background: INK }} />
            </blockquote>
          </Reveal>

          {/* Section: What changed */}
          <Reveal>
            <SectionLabel>Analysis</SectionLabel>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(20px, 2.8vw, 28px)", fontWeight: 700, letterSpacing: "-0.01em", color: INK, margin: "0 0 20px", lineHeight: 1.25 }}>
              What has actually changed.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              Here is the charge rate for shoplifting nationally: approximately 1 in 5 cases. In London, closer to 1 in 14. Both figures are from NPCC and Liberal Democrats data. They have not materially improved since the action plan launched. There is no version of these numbers that represents a functioning deterrence system.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              This is not a criticism of the police. It is a description of capacity. There are roughly 149,000 police officers in England and Wales. There are roughly 530,000 recorded shoplifting offences per year, and that figure significantly undercounts actual incidents. The arithmetic does not work regardless of how much political will sits behind the action plan. You cannot charge 530,000 offences with a police force stretched across counter-terrorism, serious violence, roads, and everything else.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              The Co-op was right to name the problem publicly. They were right that organised gangs are running what amounts to a commercial operation. They are wrong if they believe more police response changes the underlying incentive structure. The gangs are not deterred by policy announcements. They respond to economics.
            </p>
          </Reveal>

          {/* Before / After panel — dark */}
          <Reveal>
            <div style={{ background: INK, color: WARM, padding: "40px 44px", margin: "52px 0", borderRadius: 2 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 28 }}>
                Retail Crime Action Plan: Before and After
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: GOLD, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid rgba(201,168,76,0.3)" }}>
                    What changed
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 14, lineHeight: 2.1, color: "rgba(245,241,235,0.82)" }}>
                    <li>Named retail crime unit in NPCC</li>
                    <li>Faster charging commitment for persistents</li>
                    <li>New assault on a retail worker offence</li>
                    <li>Industry-police data sharing framework</li>
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#e07b7b", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid rgba(224,123,123,0.3)" }}>
                    What didn't change
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 14, lineHeight: 2.1, color: "rgba(245,241,235,0.82)" }}>
                    <li>Charge rate: still 1 in 5 nationally</li>
                    <li>Stolen goods: still fully sellable on resale markets</li>
                    <li>Gang commercial margin: still intact</li>
                    <li>Frontline capacity: unchanged</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section: The unanswered question */}
          <Reveal>
            <SectionLabel>The core problem</SectionLabel>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(20px, 2.8vw, 28px)", fontWeight: 700, letterSpacing: "-0.01em", color: INK, margin: "0 0 20px", lineHeight: 1.25 }}>
              The question nobody answered.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              Every institutional response to the Co-op's report focused on the same lever: make the consequences for thieves worse. Faster charging. Dedicated units. New offences. All of it sits downstream of the crime. By the time any of these mechanisms engage, the goods have already been taken, already moved, already sold.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              The question that nobody answered is simpler: what happens to the goods once they are taken? If the answer is "they are indistinguishable from legitimately sourced stock and can be sold on eBay, Vinted, or Facebook Marketplace within hours," then the economics of organised retail crime remain intact regardless of what the Home Office publishes.
            </p>
          </Reveal>

          {/* Second centered pull quote */}
          <Reveal>
            <blockquote style={{ margin: "52px 0", padding: "0", textAlign: "center" }}>
              <div style={{ height: 1, background: INK, marginBottom: 28 }} />
              <p style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(19px, 2.4vw, 24px)", lineHeight: 1.5, fontStyle: "italic", color: INK, margin: "0 0 10px", fontWeight: 400 }}>
                Deterrence assumes the thief is weighing risk against reward. <a href="/economic-sterilisation" style={{ color: GOLD, textDecoration: "underline" }}>Economic Sterilisation</a> removes the reward. The calculation doesn't happen because the conclusion is already written into the goods.
              </p>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: MID, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 28 }}>Economic Sterilisation doctrine — Mykei Securities</div>
              <div style={{ height: 1, background: INK }} />
            </blockquote>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              Organised gangs are not running emotional operations. They are running commercial ones. They have supply chains, demand intelligence, and resale routes. The retail estate is the supply. The secondary market is the demand. Policing sits between them as friction. Friction does not stop a commercial operation generating consistent margin. It raises costs slightly. Experienced operators absorb the cost and continue.
            </p>
          </Reveal>

          {/* ── ADN-1 vs CCTV comparison table (fully accessible) ── */}
          <Reveal>
            <SectionLabel>ADN-1 versus the status quo</SectionLabel>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(20px, 2.8vw, 28px)", fontWeight: 700, letterSpacing: "-0.01em", color: INK, margin: "0 0 20px", lineHeight: 1.25 }}>
              Why ADN-1 changes the calculation.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 32, color: INK }}>
              The table below is not a marketing comparison. It is a description of where in the crime sequence each system operates, and whether that position can affect the economics of organised retail theft.
            </p>
            <div style={{ overflowX: "auto", margin: "0 0 44px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, fontFamily: "'Georgia', serif" }}>
                <caption style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD_DARK, textAlign: "left", padding: "0 0 16px", captionSide: "top" }}>
                  Deterrence model vs. Economic Sterilisation — operational comparison
                </caption>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${INK}` }}>
                    <th scope="col" style={{ padding: "12px 16px 12px 0", textAlign: "left", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: MID, fontWeight: 600, textTransform: "uppercase" }}>Dimension</th>
                    <th scope="col" style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: MID, fontWeight: 600, textTransform: "uppercase", width: "35%" }}>CCTV / Deterrence</th>
                    <th scope="col" style={{ padding: "12px 0 12px 16px", textAlign: "left", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: INK, fontWeight: 700, textTransform: "uppercase", width: "35%" }}>ADN-1 / Economic Sterilisation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["When it acts", "After the crime is complete", "At the moment of theft — under 200ms"],
                    ["What it targets", "The person — who may never be caught", "The commercial value of the goods"],
                    ["Depends on", "Police capacity, court time, charge rate", "The forensic event record already existing"],
                    ["Effect on gang margin", "Raises risk slightly — costs absorbed", "Removes the resale value from marked goods"],
                    ["Secondary market impact", "None. Goods sell at full rate.", "Batch-linked goods are a liability to hold and sell"],
                    ["Requires arrest to work", "Yes — no arrest, no consequence", "No. The goods are marked regardless of outcome."],
                    ["Works on organised crime", "Weakly — they plan around camera angles", "Yes — the economics collapse before the sale"],
                  ].map(([dim, cctv, adn], i) => (
                    <tr key={dim as string} style={{ borderBottom: `1px solid ${RULE}`, background: i % 2 === 0 ? "#fff" : PALE }}>
                      <th scope="row" style={{ padding: "16px 16px 16px 0", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: MID, fontWeight: 500, verticalAlign: "top", whiteSpace: "nowrap" }}>{dim}</th>
                      <td style={{ padding: "16px", fontSize: 14, color: INK, lineHeight: 1.6, verticalAlign: "top" }}>{cctv}</td>
                      <td style={{ padding: "16px 0 16px 16px", fontSize: 14, color: INK, lineHeight: 1.6, verticalAlign: "top", fontWeight: 500 }}>{adn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Section: What Co-op actually needs */}
          <Reveal>
            <SectionLabel>What comes next</SectionLabel>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(20px, 2.8vw, 28px)", fontWeight: 700, letterSpacing: "-0.01em", color: INK, margin: "0 0 20px", lineHeight: 1.25 }}>
              What the Co-op actually needs.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              The Co-op operates 2,600 food stores. It is not a boutique. Loss at that scale is a structural problem, not a disciplinary one. The Retail Crime Action Plan gives them better vocabulary for briefing politicians. It does not give them a mechanism for reducing the resale value of stolen goods before they leave the shelf.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              That mechanism is forensic marking at the shelf, combined with a batch-linked registry that follows the goods rather than the person. The person may not be caught. The goods are marked permanently. The event record exists from the moment of activation, not weeks later in a court file.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              Not surveillance. Not detection after the fact. A forensic record created at the shelf, batch-linked to a registry, designed to make the goods a liability to whoever holds them. The resale market does not want forensically marked, registry-logged stock. That breaks the business model. Not the charging rate. The goods.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28, color: INK }}>
              The Co-op has the scale to test this properly. Pharmacies. Health and beauty. Alcohol. High-loss lines where gangs return repeatedly because the maths keeps working. A live pilot, documented outcomes, a forensic record built for investigation and insurer review. Three years of action plans have not moved the charge rate. Time to try something that does not need an arrest to work.
            </p>
          </Reveal>

          {/* Key Takeaways — FT "At a glance" style */}
          <Reveal>
            <div className="article-key-takeaways" style={{ borderTop: `3px solid ${INK}`, borderBottom: `1px solid ${RULE}`, padding: "32px 0", margin: "56px 0" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: INK, marginBottom: 20 }}>
                Key Takeaways
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 0", fontSize: 16, lineHeight: 1, color: INK, listStyle: "none" }}>
                {[
                  "Co-op recorded over 300,000 crime incidents in 2024-25, publicly attributing a significant share to organised gangs.",
                  "The Retail Crime Action Plan committed police resource and faster charging. The national charge rate remains around 1 in 5.",
                  "Deterrence works on individuals making rational risk calculations. Organised commercial operations treat it as an overhead cost.",
                  "Stolen goods remain fully sellable on secondary markets. That economic fact is not addressed by any action plan.",
                  "Economic Sterilisation acts at the moment of theft, creating a batch-linked forensic record before the goods leave the shelf.",
                  "Large-format retailers with high-loss categories are the correct test environment for structured forensic pilots.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "14px 0", borderBottom: i < 5 ? `1px solid ${RULE}` : "none" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: GOLD_DARK, fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>0{i + 1}</span>
                    <span style={{ lineHeight: 1.65 }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Share Bar */}
          <SignalShareBar
            url="https://mykei.io/signal/coop-named-the-enemy-economics-unchanged"
            title="Co-op Named the Enemy. 300,000 Crimes Later, Stolen Goods Still Sell."
            description="The Retail Crime Action Plan launched. Charge rates didn't move. The economic incentive to steal is intact."
            hashtags={["RetailCrime", "OrganisedRetailCrime", "EconomicSterilisation", "ADN1", "Coop"]}
          />

          {/* Pilot CTA — editorial box */}
          <Reveal>
            <div style={{ border: `1px solid ${RULE}`, borderTop: `3px solid ${GOLD}`, padding: "40px 44px", margin: "52px 0", background: PALE }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD_DARK, marginBottom: 16 }}>
                Manchester Pilot Cohort — Limited Places
              </div>
              <p style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: INK, marginBottom: 12, lineHeight: 1.35 }}>
                The first cohort is limited. Applications are reviewed directly by the founder.
              </p>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.75, marginBottom: 28, maxWidth: 520 }}>
                Independent retailers, pharmacies, and convenience stores in Greater Manchester. No cameras. No confrontation. Forensic marking begins on day one of deployment.
              </p>
              <a href="/pilot" className="signal-nav-cta" style={{ display: "inline-block", background: INK, color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", padding: "14px 32px", borderRadius: 2, textDecoration: "none", fontWeight: 700 }}>
                Apply for the Pilot
              </a>
            </div>
          </Reveal>

          {/* Author block */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 36, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: INK, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 16, flexShrink: 0 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 5 }}>Michael Esema</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: MID, marginBottom: 12, letterSpacing: "0.1em" }}>
                  Founder, Mykei Securities Ltd · Manchester · MBA, Nigerian Defence Academy
                </div>
                <p style={{ fontSize: 14, color: MID, lineHeight: 1.8, margin: 0, maxWidth: 520 }}>
                  Michael Esema is the founder of Mykei Securities Ltd (Co. 16984969) and inventor of ADN-1, a forensic defence system for retail environments. ADN-1 is covered by UK patent application GB2606630.8, 17 claims, filed 23 March 2026.
                </p>
              </div>
            </div>
          </Reveal>

        </article>
      </div>

      <style>{`
        /* Focus indicators — WCAG 2.2 SC 2.4.11 */
        .signal-nav-link:focus-visible {
          outline: 2px solid ${GOLD};
          outline-offset: 4px;
          border-radius: 2px;
        }
        .signal-nav-cta:focus-visible {
          outline: 2px solid #0F0C08;
          outline-offset: 3px;
          border-radius: 3px;
        }
        /* Drop cap — first paragraph */
        .article-drop-cap::first-letter {
          float: left;
          font-family: 'Georgia', serif;
          font-size: 5em;
          line-height: 0.82;
          padding-right: 8px;
          padding-top: 6px;
          font-weight: 700;
          color: ${INK};
        }
        /* Mobile */
        @media (max-width: 640px) {
          article { padding-left: 20px !important; padding-right: 20px !important; }
          header { padding-left: 20px !important; padding-right: 20px !important; }
          nav { padding-left: 16px !important; padding-right: 16px !important; }
          nav > div > span { display: none !important; }
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="padding: 40px 44px"] { padding: 24px 20px !important; }
          div[style*="padding: 64px 48px"] { padding: 40px 24px !important; }
          table { font-size: 13px !important; }
          td, th { padding: 12px 8px !important; white-space: normal !important; }
          blockquote p { font-size: 18px !important; }
        }
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
