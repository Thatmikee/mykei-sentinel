// src/pages/SignalSalfordVintedPage.tsx
// The Signal · Issue 02: The Black Market Grocery Store

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";
import SignalRunningHead from "@/components/SignalRunningHead";

const GOLD = "#D8001F";
const INK = "#1E1E1E";
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

export default function SignalSalfordVintedPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="The Black Market Grocery Store: How Mykei Breaks the Economic Bridge | The Signal"
        description="The Feb 2026 BRC report confirms organised crime groups are systematically targeting stores for online resale. The Mykei Registry is designed to disrupt that pipeline. Michael Esema explains how a stolen item in Salford becomes commercially difficult to move before it reaches Vinted."
        canonical="https://mykei.io/signal/salford-to-vinted-black-market"
        ogImage="https://mykei.io/og/signal-salford-to-vinted-black-market.png"
        keywords="organised retail crime UK 2026, BRC retail crime report 2026, Mykei Registry, online resale stolen goods, OCG retail targeting Manchester, economic sterilisation doctrine, registry-linked forensic marking, resale value removal retail theft, forensic retail security UK"
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "The Black Market Grocery Store", url: "https://mykei.io/signal/salford-to-vinted-black-market" },
        ]}
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "The Black Market Grocery Store: How Mykei Breaks the Economic Bridge",
          "description": "The Feb 2026 BRC report confirms organised crime groups are systematically targeting stores for online resale. The Mykei Registry is designed to disrupt that pipeline.",
          "url": "https://mykei.io/signal/salford-to-vinted-black-market",
          "datePublished": "2026-04-15T08:00:00Z",
          "author": { "@type": "Person", "name": "Michael Esema", "url": "https://mykei.io/founder" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Retail Security",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] },
          "mentions": [
            { "@type": "Organization", "name": "British Retail Consortium", "alternateName": "BRC" },
            { "@type": "Organization", "name": "Vinted" },
            { "@type": "Organization", "name": "eBay" },
            { "@type": "Organization", "name": "National Police Chiefs Council", "alternateName": "NPCC" }
          ]
        })}
        articleMeta={{
          publishedTime: "2026-04-15T08:00:00Z",
          author: "Michael Esema",
          section: "Retail Security",
          tags: ["organised crime", "Mykei Registry", "eBay", "Vinted", "economic sterilisation"],
        }}
      />

      <SignalRunningHead />

      <div style={{ fontFamily: "'Georgia',serif", background: "#fff", color: INK, minHeight: "100vh" }}>

        {/* Nav */}

        {/* Header */}
        <header style={{ maxWidth: 760, margin: "0 auto", padding: "72px 32px 48px" }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>
              The Signal · Issue 02 · April 2026
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(28px,4.8vw,48px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1px", color: INK, margin: "0 0 24px" }}>
              The black market grocery store: how Mykei breaks the economic bridge.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: MID, margin: "0 0 32px", fontStyle: "italic" }}>
              A stolen razor from a Salford Boots is listed on Vinted within four hours. This is not opportunism. It is logistics. The Feb 2026 BRC report confirms what investigators have known for years: organised crime groups run retail theft as a supply chain. Mykei poisons the supply.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${RULE}`, paddingTop: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK }}>Michael Esema</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID }}>Founder, Mykei Securities · 15 April 2026 · 7 min read</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Article */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The February 2026 BRC Crime Report used a phrase that should be on the front page, not buried in appendix three: <em>systematic targeting</em>. Organised crime groups select stores the same way a buyer selects a supplier. Product density. Staff-to-floor ratios. Camera blind spots. Distance to resale infrastructure. I've talked to retailers in Salford who describe being hit by the same group on the same day of the week, three weeks running, because the pattern worked and nothing changed.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The theft is not the business. The resale is. The theft is just the acquisition cost.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              This distinction matters more than the security industry has let on.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: INK, color: "#F7F8FA", padding: "32px 36px", borderRadius: 10, marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>The OCG Supply Chain: How It Actually Works</div>
              {[
                { step: "01", label: "Acquisition", detail: "Team of 2-4 enters store. Bulk sweep of pre-selected SKUs. 60 seconds." },
                { step: "02", label: "Routing", detail: "Items move to a holding point, usually a residential address or lock-up. Separated by platform." },
                { step: "03", label: "Listing", detail: "New accounts or established seller profiles. Items listed within hours, often below market price." },
                { step: "04", label: "Sale", detail: "Buyer pays. Clean cash enters the OCG. Shipping from a different postcode." },
                { step: "05", label: "Repeat", detail: "The market is absorbed. Target selection begins for the next run." },
              ].map(({ step, label, detail }) => (
                <div key={step} style={{ display: "flex", gap: 20, padding: "12px 0", borderBottom: step < "05" ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: GOLD, flexShrink: 0, paddingTop: 2 }}>{step}</div>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(245,241,235,0.5)", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: "#DDD5C4" }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The online marketplace gap is not an accident.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The BRC 2026 report flags the resale gap explicitly. eBay, Vinted, and Facebook Marketplace have volume, and volume creates noise. In that noise a stolen razor looks like a second-hand one, especially when the seller has five months of positive feedback and a plausible story about clearing out a bathroom cabinet. Platform compliance teams are reactive by design. By the time a report gets investigated, the item is sold, the buyer has it, and the account has been refreshed.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 14 }}>
              The Mykei Registry is designed not to wait for a report. When ADN fires and registers a batch code, that batch code is intended to be the bridge between the shelf and the resale channel. The intended pipeline: the registry cross-references listings, no human required. Mykei holds seventeen patent claims covering this architecture. What it means practically: the moment of marking is also the moment the goods become traceable across every channel they move through.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              That's the part the security industry hasn't built in forty years of trying.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "The theft is not the business. The resale is the business. If the goods cannot be sold, the business is not viable. That is the only deterrence that works on an OCG."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>What "commercially toxic" actually means.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Marked goods carry a record on two levels simultaneously. Physical: a forensic marker compound bonded to fabric, packaging, and skin. UV-readable. Compounds in this class, as used by established forensic marking programmes across thousands of UK prosecutions, work on the same principle. Any buyer who later gets searched has a forensic connection to the original theft event. Digital: the batch code is designed to be registered in the Mykei Registry, an in-development event-record architecture intended to be the first layer of a resale verification workflow. Not hard to sell. Traceable to own.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              When an OCG calculates a target, they're calculating liquidation probability. That's it. What can we take, and what can we get for it. Push the liquidation probability toward zero and the target loses its value. Every shelf a deployed ADN unit covers is designed to change that calculation. That's not a security feature. It's a change to the underlying economics of whether your store is worth hitting.
            </p>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The proposed pilot stores in Manchester are not just testing a gadget.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The independent retailers who signed non-binding letters of intent for the Independent Retail Pilot would, if the pilot proceeds, be testing a forensic doctrine. ADN is the hardware layer. The Mykei Registry is the audit layer. Together they are designed to make a store's inventory a liability to steal rather than an asset. If OCGs doing systematic targeting update their target selection criteria as intended, a Mykei-protected shop would drop off the list, not because it has better cameras, but because the goods inside are no longer worth the acquisition cost. None of this has been field-validated yet.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "The BRC 2026 report confirms OCGs operate retail theft as a structured supply chain, not random opportunism.",
                  "The resale market, not the shelf, is where the crime is profitable. Block the resale and you block the crime.",
                  "The Mykei Registry creates a traceable batch record. The designed pathway connects to resale platform verification workflows.",
                  "ADN controlled markers are designed to make stolen goods harder to sell without a traceable record and commercially difficult to move.",
                  "The Independent Retail Pilot is a forensic field deployment, not a product demo.",
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
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Independent Retail Pilot · Now open</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 12px" }}>Deploy the forensic blockade in your store.</h3>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.7, maxWidth: 480, margin: "0 0 28px" }}>Non-binding letters of intent only. Pricing scoped per pilot. Prototype-stage hardware from day one.</p>
              <a href="/signal" style={{ display: "inline-block", background: GOLD, color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, padding: "14px 36px", borderRadius: 6, textDecoration: "none" }}>Read The Signal</a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/salford-to-vinted-black-market"
            title="Stolen in Salford. Listed on Vinted by Evening. The Supply Chain Nobody Talks About."
            description="Organised retail crime runs like a distribution network. Here is how the resale pipeline works, and how to poison it."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 18, flexShrink: 0 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 8 }}>About the Author</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: MID, margin: "0 0 10px" }}>
                  <strong style={{ color: INK }}>Michael Esema, MBA, MSc.</strong> Founder of Mykei Securities. I spent years in government financial audit and emergency budget management, then came to the UK and watched retail theft up close at B's Hive. The two experiences together made the structural failure impossible to ignore. I filed seventeen patent claims and built ADN to close it.
                </p>
                <a href="https://michaelesema.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none" }}>17 patent claims at michaelesema.com</a>
              </div>
            </div>
          </Reveal>

        </article>
      </div>
    </>
  );
}
