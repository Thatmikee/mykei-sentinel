// src/pages/SignalShopkeeperMathsPage.tsx
// The Signal · Issue 04: The Maths: Built for the Shopkeeper's Cash Position

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";
import SignalRunningHead from "@/components/SignalRunningHead";

const GOLD = "#D8001F";
const INK = "#0F0C08";
const MID = "#5c4a32";
const WARM = "#F4F6F8";
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
        description="Pricing to be scoped per pilot. Michael Esema breaks down why unit economics for forensic retail defence must fit independent retailers. BIRA members, corner shops, pharmacies, jewellers."
        canonical="https://mykei.io/signal/shopkeeper-maths-adn-cost"
        ogImage="https://mykei.io/og/signal-shopkeeper-maths-adn1-cost.png"
        keywords="ADN pricing independent retailer, retail security cost analysis UK, BIRA member retail security, shopkeeper anti-theft ROI, forensic retail defence cost, independent retailer theft losses UK, affordable retail security UK, corner shop theft prevention cost, Manchester retail security startup"
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "The Maths: Built for the Shopkeeper", url: "https://mykei.io/signal/shopkeeper-maths-adn-cost" },
        ]}
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "The Maths: Built for the Shopkeeper's Cash Position",
          "description": "Pricing to be scoped per pilot. Unit economics thinking behind forensic retail defence for independent retailers.",
          "url": "https://mykei.io/signal/shopkeeper-maths-adn-cost",
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

      <SignalRunningHead />

      <div style={{ fontFamily: "'Georgia',serif", background: "#fff", color: INK, minHeight: "100vh" }}>

        {/* Nav */}

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
              Mykei Securities is founder-funded, with no external investment. I saw the independent retailer being failed by an industry that priced them out and called it adequate.
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
              I built the ADN for her. For the jeweller on Deansgate. For the off-licence owner in Salford who told me he'd been hit three times in four months and had genuinely run out of options. BIRA members. Independent operators. The people the enterprise security industry consistently prices out and then ignores.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: INK, color: "#F7F8FA", padding: "36px 40px", borderRadius: 10, marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>ADN Pricing: Scoped Per Pilot</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.07)", borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
                {[
                  ["Setup cost", "To be scoped per pilot"],
                  ["Ongoing cost", "To be scoped per pilot"],
                  ["Pricing model", "Not yet fixed"],
                  ["Lock-in after pilot", "None"],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.03)", padding: "14px 18px" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(245,241,235,0.4)", marginBottom: 6 }}>{label}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: GOLD }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(245,241,235,0.35)", lineHeight: 1.7 }}>
                No live pricing is published. Pilot terms are agreed in writing on a per-retailer basis.
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>Why the cost has to fit the shopkeeper, not the enterprise.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              A bulk-sweep theft event in a convenience or specialist retail environment typically clears between £150 and £800 of stock in a single pass, depending on product type. The BRC's data on organised retail crime suggests higher-value targets, pharmacy goods, alcohol, electronics accessories, premium beauty, regularly see single events in the £300 to £500 range.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Any pricing Mykei sets for ADN has to sit meaningfully below what a single prevented sweep is worth to the retailer, or the economics don't work for an independent operator. That is the constraint the pilot pricing is being scoped against. It is not a fixed number yet; it is a design principle.
            </p>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>This isn't a security budget. It's meant to change the underlying economics.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The "security budget" frame is wrong for ADN. Security budgets are spent to maintain the current loss rate, not change it. You pay for a camera to keep filming the crimes. You pay for a guard to keep watching them happen. ADN is designed to be a one-time reconfiguration of whether your inventory is worth stealing. Once the Mykei Registry design has your batch codes on record, the intent is that your stock becomes commercially difficult to move for anyone who takes it. That's not meant to be a monthly cost. That's meant to be a change to the underlying economics of targeting your store.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Insurance pays out after the loss. ADN is designed to remove the reason the loss was worth attempting in the first place. The comparison isn't with a camera or a guard. It's with the theft itself.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "I believe the independent retailer is worth building for. Mykei is founder-funded, with no external investment. Pricing will be scoped per pilot, not set as a corporate number."
              </p>
              <footer style={{ marginTop: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: MID }}>Michael Esema, Founder</footer>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The Independent Retail Pilot: what's on offer.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Pilot partners in Greater Manchester get direct contact with me and the founding team for every question, and pricing agreed in writing before anything is installed. No live retail pricing is published, because pilot terms are set case by case at this stage.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              There is no lock-in after the pilot period. If it doesn't perform, you return the hardware and we owe you nothing further. The confidence in that offer comes from the same place the product does: a patent-pending filing, a forensic doctrine with no prior competitor, and the knowledge that the 11p crime tax is real, the resale market is real, and the only thing that has been missing is a device that addresses the actual economic incentive.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "Independent retailers paying the 11p ACS crime tax are losing significant sums to theft each month.",
                  "ADN pricing is not yet fixed. It is being scoped per pilot, against the constraint of sitting meaningfully below a single prevented sweep's value.",
                  "No lock-in after pilot. Pilot terms are agreed in writing before installation.",
                  "This is not meant to be ordinary security spend. It is designed as a one-time change to the resale economics of targeting your store.",
                ].map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < 3 ? `1px solid ${RULE}` : "none", fontSize: 14, lineHeight: 1.65, color: INK }}>
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
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>The Signal</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 12px" }}>Pricing scoped per pilot. No lock-in.</h3>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.7, maxWidth: 480, margin: "0 0 28px" }}>Non-binding letters of intent only. Pricing agreed in writing before installation. Prototype-stage ADN hardware.</p>
              <a href="/signal" style={{ display: "inline-block", background: GOLD, color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, padding: "14px 36px", borderRadius: 6, textDecoration: "none" }}>Read The Signal</a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/shopkeeper-maths-adn-cost"
            title="Why ADN Pricing Has to Fit the Shopkeeper's Cash Position, Not the Enterprise's."
            description="Pricing to be scoped per pilot. The thinking behind unit economics for a retailer who cannot afford to get this wrong."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 18, flexShrink: 0 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 8 }}>About the Author</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: MID, margin: "0 0 10px" }}>
                  <strong style={{ color: INK }}>Michael Esema, MBA, MSc.</strong> Mykei Securities is founder-funded, with no external investment. I saw independent retailers being failed by an industry that priced them out and called it adequate. Founder, ADN inventor, patent pending: UK application No. 2606630.8. NUASA Most Auspicious Male Award. Lean Six Sigma. Based in Manchester.
                </p>
                <a href="https://michaelesema.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none" }}>Pilot details at michaelesema.com</a>
              </div>
            </div>
          </Reveal>

        </article>
      </div>
    </>
  );
}
