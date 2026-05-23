// src/pages/SignalShopkeeperMathsPage.tsx
// The Signal · Issue 04: The Maths: Built for the Shopkeeper's Cash Position

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";

const GOLD = "#c9a84c";
const INK = "#0F0C08";
const MID = "#5c4a32";
const WARM = "#F5F1EB";
const RULE = "#DDD5C4";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, visible: v };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(18px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function SignalShopkeeperMathsPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="The Maths: Built for the Shopkeeper's Cash Position | The Signal"
        description="£149 setup. £40/month. One stopped bulk sweep pays for the ADN-1 for an entire year. Michael Esema breaks down the unit economics of forensic retail defence for independent retailers. BIRA members, corner shops, pharmacies, jewellers."
        canonical="https://mykei.io/signal/shopkeeper-maths-adn1-cost"
        ogImage="https://mykei.io/og/signal-shopkeeper-maths-adn1-cost.png"
        keywords="ADN-1 pricing independent retailer, retail security cost analysis UK, £40 month retail security device, BIRA member retail security, shopkeeper anti-theft ROI, forensic retail defence cost, independent retailer theft losses UK, ADN-1 break even one sweep, affordable retail security UK, corner shop theft prevention cost, Manchester retail security startup"
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "The Maths: Built for the Shopkeeper", url: "https://mykei.io/signal/shopkeeper-maths-adn1-cost" },
        ]}
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "The Maths: Built for the Shopkeeper's Cash Position",
          "description": "£149 setup. £40/month. One stopped bulk sweep pays for the ADN-1 for an entire year. Unit economics of forensic retail defence for independent retailers.",
          "url": "https://mykei.io/signal/shopkeeper-maths-adn1-cost",
          "datePublished": "2026-04-15T08:00:00Z",
          "author": { "@type": "Person", "name": "Michael Esema", "url": "https://mykei.io/founder" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Business Case",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] },
          "mentions": [
            { "@type": "Organization", "name": "British Independent Retailers Association", "alternateName": "BIRA" },
            { "@type": "Organization", "name": "Association of Convenience Stores", "alternateName": "ACS" }
          ]
        })}
        articleMeta={{
          publishedTime: "2026-04-15T08:00:00Z",
          author: "Michael Esema",
          section: "Business Case",
          tags: ["pricing", "independent retail", "ROI", "BIRA", "cash position"],
        }}
      />

      <div style={{ fontFamily: "'Georgia',serif", background: "#fff", color: INK, minHeight: "100vh" }}>

        {/* Nav */}
        <nav style={{ borderBottom: `1px solid ${RULE}`, padding: "0 40px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", zIndex: 100 }}>
          <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px", color: GOLD, textDecoration: "none", textTransform: "uppercase" }}>The Signal</a>
          <a href="/pilot" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "1.5px", color: INK, textDecoration: "none", textTransform: "uppercase", border: `1px solid ${RULE}`, padding: "6px 16px", borderRadius: 4 }}>Join the Pilot</a>
        </nav>

        {/* Header */}
        <header style={{ maxWidth: 760, margin: "0 auto", padding: "72px 32px 48px" }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>
              The Signal · Issue 04 · April 2026
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(28px,4.8vw,48px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1px", color: INK, margin: "0 0 24px" }}>
              The maths: built for the shopkeeper's cash position.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: MID, margin: "0 0 32px", fontStyle: "italic" }}>
              I started Mykei Securities on a £10,000 director's loan. Not venture capital. My own money. The pricing reflects that.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${RULE}`, paddingTop: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK }}>Michael Esema</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID }}>Founder, Mykei Securities · 15 April 2026 · 6 min read</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Article */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The security market is built for corporates. Enterprise contracts, multi-year agreements, upfront hardware costs in the thousands. The pharmacist on Bury Old Road doesn't have a security procurement team. She has a till and a spreadsheet and margins that were already thin before the 11p crime tax that the ACS report says she's absorbing on every transaction. A shop doing 500 transactions a day is writing off £55 a day, £1,650 a month, £19,800 a year, to theft alone. That's before the cost of whatever security she's already paying for that isn't working.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              I built the <a href="/adn-1" style={{ color: GOLD, textDecoration: "underline" }}>ADN-1</a> for her. For the jeweller on Deansgate. For the off-licence owner in Salford who told me he'd been hit three times in four months and had genuinely run out of options. BIRA members. Independent operators. The people the enterprise security industry consistently prices out and then ignores.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: INK, color: "#F5F1EB", padding: "36px 40px", borderRadius: 10, marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>ADN-1 Founders Pricing: The Full Calculation</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.07)", borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
                {[
                  ["Setup cost", "£149 one-time"],
                  ["Monthly subscription", "£40/month"],
                  ["Year 1 total", "£149 + (12 × £40) = £629"],
                  ["Year 2+ annual cost", "£480/year"],
                  ["Lock-in after pilot", "None"],
                  ["Cost per working day (Y1)", "£1.72"],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.03)", padding: "14px 18px" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(245,241,235,0.4)", marginBottom: 6 }}>{label}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: GOLD }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(245,241,235,0.35)", lineHeight: 1.7 }}>
                Prices correct for Independent Retail Pilot partners · Founders rate subject to written agreement
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>One stopped sweep. One year paid.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              A bulk-sweep theft event in a convenience or specialist retail environment typically clears between £150 and £800 of stock in a single pass, depending on product type. The BRC's data on organised retail crime suggests higher-value targets, pharmacy goods, alcohol, electronics accessories, premium beauty, regularly see single events in the £300 to £500 range.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              One stopped event at £480 of prevented loss pays for the ADN-1's entire second year of subscription. One event at £629 pays for Year 1 including setup. These are not optimistic projections. They are the floor case. If your shop has been targeted once in the last twelve months, the economic argument for the ADN-1 closed itself.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>Break-Even Analysis</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { scenario: "One prevented sweep at £150", cost: "£629 (Year 1)", status: "24% toward break-even" },
                  { scenario: "One prevented sweep at £300", cost: "£629 (Year 1)", status: "48% toward break-even" },
                  { scenario: "One prevented sweep at £480", cost: "£480 (Year 2+)", status: "Fully covers Year 2" },
                  { scenario: "One prevented sweep at £629", cost: "£629 (Year 1)", status: "Full Year 1 break-even" },
                  { scenario: "Two prevented sweeps at £400 each", cost: "Year 1 + 27% of Year 2", status: "27 months covered" },
                ].map(({ scenario, cost, status }, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, padding: "12px 0", borderBottom: i < 4 ? `1px solid ${RULE}` : "none", alignItems: "center" }}>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.5 }}>{scenario}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: MID }}>{cost}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, letterSpacing: "0.5px" }}>{status}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>This isn't a security budget. It's an insurance premium with teeth.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The "security budget" frame is wrong for the ADN-1. Security budgets are spent to maintain the current loss rate, not change it. You pay for a camera to keep filming the crimes. You pay for a guard to keep watching them happen. The ADN-1 is a one-time reconfiguration of whether your inventory is worth stealing. Once the Mykei Registry has your batch codes on record, your stock is commercially difficult to move for anyone who takes it. That's not a monthly cost. That's a change to the underlying economics of targeting your store.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Insurance pays out after the loss. The ADN-1 removes the reason the loss was worth attempting. The comparison isn't with a camera or a guard. It's with the theft itself. For a BIRA member running a high-value product range, the theft is not £40 a month. It's five or ten times that, per event.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "I started Mykei on £10,000 of my own money because I believe the independent retailer is worth building for. The pricing reflects that. £40 a month is not a corporate number. It's a shopkeeper's number."
              </p>
              <footer style={{ marginTop: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: MID }}>Michael Esema, Founder</footer>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The Independent Retail Pilot: what you actually get.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The five pilot partners in Greater Manchester receive the full production ADN-1 hardware, not a development prototype. They get cloud dashboard access showing every detected event, every inhibit window logged, every forensic event package transmitted. They get direct contact with me and the founding team for every question. They get founders pricing locked permanently, regardless of what the retail rate becomes post-pilot.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              There is no lock-in after the pilot period. If it doesn't perform, you return the hardware and we owe you nothing further. The confidence in that offer comes from the same place the product does: seventeen patent claims, a forensic doctrine with no prior competitor, and the knowledge that the 11p crime tax is real, the resale market is real, and the only thing that has been missing is a device that addresses the actual economic incentive.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "Independent retailers paying the 11p ACS crime tax are losing more to theft each month than the ADN-1 costs in a year.",
                  "Year 1 total cost: £629. One prevented sweep at £629 breaks even in a single event.",
                  "Year 2+ cost: £480/year (£40/month). Lower than a single mid-value bulk sweep loss.",
                  "No lock-in after pilot. Founders rate locked permanently for pilot partners.",
                  "This is not security spend. It is a one-time change to the resale economics of targeting your store.",
                ].map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < 4 ? `1px solid ${RULE}` : "none", fontSize: 14, lineHeight: 1.65, color: INK }}>
                    <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>0{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Pilot CTA */}
          <Reveal>
            <div style={{ textAlign: "center", border: `1px solid ${RULE}`, borderRadius: 10, padding: "40px 32px", marginBottom: 48 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Independent Retail Pilot · 2026</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 12px" }}>£1.72 per working day. One prevented sweep covers it.</h3>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.7, maxWidth: 480, margin: "0 0 28px" }}>Five slots. Founders pricing. No lock-in. Full production ADN-1 hardware from day one.</p>
              <a href="/pilot" style={{ display: "inline-block", background: GOLD, color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, padding: "14px 36px", borderRadius: 6, textDecoration: "none" }}>Apply for the Pilot</a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/shopkeeper-maths-adn1-cost"
            title="£40/Month or £30,000 a Year in Stolen Stock. The Calculation Is Simple."
            description="£189 setup, £40/month. The full breakdown, written for a retailer who cannot afford to get this wrong."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 18, flexShrink: 0 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 8 }}>About the Author</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: MID, margin: "0 0 10px" }}>
                  <strong style={{ color: INK }}>Michael Esema, MBA, MSc.</strong> I started Mykei Securities on £10,000 of my own money because I saw independent retailers being failed by an industry that priced them out and called it adequate. Founder, ADN-1 inventor, Patent-pending: UK application No. 2606630.8. NUASA Most Auspicious Male Award. Lean Six Sigma. Based in Manchester.
                </p>
                <a href="https://michaelesema.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none" }}>Founders pricing and pilot details at michaelesema.com</a>
              </div>
            </div>
          </Reveal>

        </article>
      </div>
    </>
  );
}
