// src/pages/SignalShopkeeperMathsPage.tsx
// The Signal · Issue 04: The Maths: Built for the Shopkeeper's Cash Position

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";

const GOLD = "#0D9488";
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
        description="The unit economics of forensic retail defence for independent retailers. Michael Esema breaks down how the proposed ADN pricing model was built around a shopkeeper's cash position. For BIRA members, corner shops, pharmacies, jewellers."
        canonical="https://mykei.io/signal/shopkeeper-maths-adn1-cost"
        ogImage="https://mykei.io/og/signal-shopkeeper-maths-adn1-cost.png"
        keywords="ADN retail security economics, retail security cost analysis UK, BIRA member retail security, shopkeeper anti-theft ROI, forensic retail defence cost, independent retailer theft losses UK, affordable retail security UK, corner shop theft prevention cost, Manchester retail security startup, organised retail crime economics UK"
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
          "description": "The unit economics of forensic retail defence for independent retailers. How the proposed ADN pricing model was designed around a shopkeeper's cash position.",
          "url": "https://mykei.io/signal/shopkeeper-maths-adn1-cost",
          "datePublished": "2026-03-06T08:00:00Z",
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
          publishedTime: "2026-03-06T08:00:00Z",
          author: "Michael Esema",
          section: "Business Case",
          tags: ["pricing", "independent retail", "ROI", "BIRA", "cash position"],
        }}
      />

      <div style={{ fontFamily: "'Georgia',serif", background: "#fff", color: INK, minHeight: "100vh" }}>

        {/* Nav */}
        <nav style={{ borderBottom: `1px solid ${RULE}`, padding: "0 40px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", zIndex: 100 }}>
          <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px", color: GOLD, textDecoration: "none", textTransform: "uppercase" }}>The Signal</a>
          <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "1.5px", color: INK, textDecoration: "none", textTransform: "uppercase", border: `1px solid ${RULE}`, padding: "6px 16px", borderRadius: 4 }}>Follow the Research</a>
        </nav>

        {/* Header */}
        <header style={{ maxWidth: 760, margin: "0 auto", padding: "72px 32px 48px" }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>
              The Signal · Issue 04 · March 2026
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
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID }}>Founder, Mykei Securities · 6 March 2026 · 6 min read</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Hero Image */}
        <div style={{ maxWidth: 900, margin: "0 auto 48px", padding: "0 32px" }}>
          <figure style={{ margin: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop"
              alt="Small shop checkout counter with a till and receipt printer"
              style={{ width: "100%", borderRadius: 6, display: "block", maxHeight: 480, objectFit: "cover" }}
              loading="lazy"
            />
            <figcaption style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999", marginTop: 8, letterSpacing: "0.5px" }}>
              Photo: Unsplash / independent retail
            </figcaption>
          </figure>
        </div>

        {/* Article */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The security market is built for corporates. Enterprise contracts, multi-year agreements, upfront hardware costs in the thousands. The pharmacist on Bury Old Road doesn't have a security procurement team. She has a till and a spreadsheet and margins that were already thin before the 11p crime tax that the ACS report says she's absorbing on every transaction. A shop doing 500 transactions a day is writing off £55 a day, £1,650 a month, £19,800 a year, to theft alone. That's before the cost of whatever security she's already paying for that isn't working.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              I built the <a href="/adn" style={{ color: GOLD, textDecoration: "underline" }}>Active Deterrent Node (ADN)</a> for her. For the jeweller on Deansgate. For the off-licence owner in Salford who told me he'd been hit three times in four months and had genuinely run out of options. BIRA members. Independent operators. The people the enterprise security industry consistently prices out and then ignores.
            </p>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The principle behind the pricing model.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              A bulk-sweep theft event in a convenience or specialist retail environment typically clears between £150 and £800 of stock in a single pass, depending on product type. The BRC's data on organised retail crime suggests higher-value targets — pharmacy goods, alcohol, electronics accessories, premium beauty — regularly see single events in the £300 to £500 range.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The design intention is that the ADN's annual cost should be recoverable from a single prevented event. That is the model the pricing is being built around. Exact figures are under development as the hardware and deployment costs are confirmed.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>The Economic Argument</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { scenario: "Annual theft loss: single mid-value bulk sweep", cost: "£300–£800", status: "Cost of doing nothing" },
                  { scenario: "Annual theft loss: organised repeat targeting", cost: "£1,000+", status: "Common for known targets" },
                  { scenario: "ADN annual cost (pricing in development)", cost: "TBD", status: "Designed to undercut the loss" },
                  { scenario: "Break-even design target", cost: "One prevented event", status: "The model we are building to" },
                ].map(({ scenario, cost, status }, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, padding: "12px 0", borderBottom: i < 3 ? `1px solid ${RULE}` : "none", alignItems: "center" }}>
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
              The "security budget" frame is wrong for the ADN. Security budgets are spent to maintain the current loss rate, not change it. You pay for a camera to keep filming the crimes. You pay for a guard to keep watching them happen. The ADN is designed as a reconfiguration of whether your inventory is worth stealing. Once the Mykei Registry has your batch codes on record, your stock is designed to be commercially difficult to move for anyone who takes it. That's not a monthly cost. That's a change to the underlying economics of targeting your store.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Insurance pays out after the loss. The ADN is designed to remove the reason the loss was worth attempting. The comparison isn't with a camera or a guard. It's with the theft itself. For a BIRA member running a high-value product range, a single sweep loss is several multiples of what a properly priced deterrence device should cost.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "I started Mykei on £10,000 of my own money because I believe the independent retailer is worth building for. The pricing model will reflect that. A shopkeeper's number, not a corporate one."
              </p>
              <footer style={{ marginTop: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: MID }}>Michael Esema, Founder</footer>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>Why the pricing model matters as much as the hardware.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The independent retailer cannot absorb a corporate security contract. The design objective for the ADN pricing model is that it should be cheaper than the theft it is designed to deter. That means hardware costs, deployment, and the subscription model all have to be scoped against a shopkeeper's loss profile, not an enterprise security budget.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Exact pricing is being developed in parallel with the hardware programme. The argument this article is making does not depend on the final figure. It depends on the relationship: deterrence should cost less than the loss it prevents. That constraint is built into the design.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "Independent retailers paying the 11p ACS crime tax are losing more to theft each month than a properly priced deterrence device should cost in a year.",
                  "A single prevented bulk-sweep event can represent £300 to £800 of recovered stock value. The pricing model is being designed around that figure.",
                  "The break-even design target: one prevented event covers the annual cost. That is the constraint the ADN pricing is being built to.",
                  "Pricing is under development. The economic argument does not depend on the final number — it depends on the principle.",
                  "This is not security spend. It is a change to the resale economics of targeting your store.",
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
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.7, maxWidth: 480, margin: "0 0 28px" }}>Mykei publishes findings through The Signal as the ADN development programme continues.</p>
              <a href="/signal" style={{ display: "inline-block", background: GOLD, color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, padding: "14px 36px", borderRadius: 6, textDecoration: "none" }}>Read the Archive</a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/shopkeeper-maths-adn1-cost"
            title="£40/Month or £30,000 a Year in Stolen Stock. The Calculation Is Simple."
            description="The full unit economics breakdown, written for a retailer who cannot afford to get this wrong."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 18, flexShrink: 0 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 8 }}>About the Author</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: MID, margin: "0 0 10px" }}>
                  <strong style={{ color: INK }}>Michael Esema, MBA, MSc.</strong> I started Mykei Securities on £10,000 of my own money because I saw independent retailers being failed by an industry that priced them out and called it adequate. Founder, ADN inventor, Patent-pending: UK application No. 2606630.8. NUASA Most Auspicious Male Award. Lean Six Sigma. Based in Manchester.
                </p>
                <a href="https://michaelesema.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none" }}>Founder's background and research at michaelesema.com</a>
              </div>
            </div>
          </Reveal>

        </article>
      </div>
    </>
  );
}
