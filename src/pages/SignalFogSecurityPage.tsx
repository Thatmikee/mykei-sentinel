// src/pages/SignalFogSecurityPage.tsx
// The Signal · Issue 12: Fog machines are CCTV theatre with smoke

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

export default function SignalFogSecurityPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="Fog Security Systems Are CCTV Theatre With Smoke | The Signal"
        description="Security fog machines obscure visibility during a break-in. Retailers are being sold this as a deterrent. It isn't. The goods are gone before the fog clears, and the stolen items are just as sellable as they were before. Michael Esema on why fog is the new camera."
        canonical="https://mykei.io/signal/fog-security-systems-debunked"
        ogImage="https://mykei.io/og/signal-fog-security-systems-debunked.png"
        keywords="fog security systems retail, security fog machine shoplifting, smoke deterrent security, retail security theatre, economic sterilisation, ADN forensic, fog machine vs DNA marking, independent retailer security UK"
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "Fog security systems are CCTV theatre with smoke", url: "https://mykei.io/signal/fog-security-systems-debunked" },
        ]}
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Fog Security Systems Are CCTV Theatre With Smoke",
          "description": "Security fog machines obscure visibility during a break-in but do nothing to remove resale value from stolen goods. The economics of theft are unchanged.",
          "url": "https://mykei.io/signal/fog-security-systems-debunked",
          "datePublished": "2026-05-14T10:00:00Z",
          "author": { "@type": "Person", "name": "Sarah Aboladale" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Retail Security",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] },
          "mentions": [
            { "@type": "Organization", "name": "British Retail Consortium", "alternateName": "BRC" },
            { "@type": "Organization", "name": "Association of Convenience Stores", "alternateName": "ACS" }
          ]
        })}
        articleMeta={{
          publishedTime: "2026-05-14T10:00:00Z",
          author: "Sarah Aboladale",
          section: "Retail Security",
          tags: ["fog security", "security theatre", "retail theft", "forensic DNA", "economic sterilisation"],
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
              The Signal · Issue 12 · May 2026
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(28px,5vw,50px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1px", color: INK, margin: "0 0 24px" }}>
              Fog security systems are CCTV theatre with smoke.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: MID, margin: "0 0 32px", fontStyle: "italic" }}>
              The goods are gone before the room clears. The stolen items are just as sellable as they were before the fog fired. This is a new product category built on the same failed logic.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${RULE}`, paddingTop: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>SA</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK }}>Sarah Aboladale</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID }}>Creative Strategist, Mykei Securities · 14 May 2026 · 6 min read</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Hero Image */}
        <div style={{ maxWidth: 900, margin: "0 auto 48px", padding: "0 32px" }}>
          <figure style={{ margin: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80&auto=format&fit=crop"
              alt="Dense fog filling a dark corridor. The visual equivalent of a security fog machine."
              style={{ width: "100%", borderRadius: 6, display: "block", maxHeight: 480, objectFit: "cover" }}
              loading="lazy"
            />
            <figcaption style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999", marginTop: 8, letterSpacing: "0.5px" }}>
              Photo: Unsplash / fog obscuration
            </figcaption>
          </figure>
        </div>

        {/* Article */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 40px", padding: "18px 28px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 20, lineHeight: 1.65, fontStyle: "italic", color: INK, margin: 0 }}>
                "If the stolen goods are still sellable after your security system fires, your security system has not solved anything. It has just created an inconvenience."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Security fog systems have been appearing in more retail conversations over the past eighteen months. The pitch is straightforward: when an intruder or organised theft crew enters after hours, a dense fog fills the room within seconds, reducing visibility to near zero and forcing them to leave empty-handed. Some versions deploy during opening hours. The product has a good brochure. The logic, under examination, has a serious flaw.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The flaw is not the fog. The fog does what it says. The flaw is the assumption that stopping one theft event has changed anything about the economics of retail crime. It hasn't. The thief leaves without the goods this time. They come back tomorrow, or they go to the next shop. The fog machine has added friction to one attempt. It has not removed the incentive that produced it or the ones that will follow.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: INK, color: "#F5F1EB", padding: "32px 36px", borderRadius: 10, marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 18 }}>The Fog Logic Chain</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { step: "01", text: "Fog fires. Thief cannot see. Thief leaves." },
                  { step: "02", text: "Goods are still on the shelf. Fully sellable. No forensic marker on anything." },
                  { step: "03", text: "Same crew, same goods, different night. Or different crew, same goods." },
                  { step: "04", text: "The economic incentive that drove the first attempt is completely unchanged." },
                ].map(({ step, text }) => (
                  <div key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 700, color: GOLD, flexShrink: 0, lineHeight: 1 }}>{step}</span>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(245,241,235,0.75)", lineHeight: 1.65, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>This is the same error as CCTV. Different product, same logic.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The CCTV industry spent forty years arguing that the camera deters because the camera creates risk. The thief sees the lens, calculates the probability of arrest, decides it's not worth it. For forty years, theft went up. The argument was structurally wrong because organised crime groups are not operating on that risk model. They have fencing networks, they have lookouts, and they have already worked out that UK arrest rates for retail theft sit near the floor.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Fog systems use a variation of the same argument: the fog creates friction, so the thief decides it's not worth it. This may be true for some opportunistic shoplifters at some times. For a coordinated crew targeting your stock because it has resale value, fog is a one-night inconvenience. They plan around it. They time the system. They find a window. The goods still have resale value. The incentive is still there. The theft will happen.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "Deterrence assumes the criminal weighs risk against reward and chooses differently. <a href="/economic-sterilisation" style={{ color: GOLD, textDecoration: "underline" }}>Economic Sterilisation</a> removes the reward. There is nothing to weigh."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The only question that matters.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              After your security system fires, are the stolen goods still sellable? This is the only question that determines whether your system has changed the economics of the crime or just added a delay to it.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              CCTV answer: yes, fully sellable. The footage records a face that is usually unidentifiable and leads to no arrest. The goods are in a fencing chain within hours.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Fog system answer: yes, fully sellable. If the goods were taken, they are clean. If they weren't taken this time, they will be taken when the crew adjusts their approach.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Active Defence Node (ADN) answer: designed not to be. The intended marker compound is designed to bond to items within the deployment range. In the proposed workflow, the batch code would be written to the Mykei Registry in real time. The design goal is to make the goods harder to sell anonymously. A registry-linked batch record cannot be erased by listing on eBay or Vinted. The marker is designed to be UV-detectable at inspection.
            </p>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>Why the industry keeps selling theatre.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Fog machines are not a scam. They are a product that does what it says. The problem is the framing: sold as a solution to theft rather than a solution to one specific type of forced entry in one specific window. The security industry has a structural incentive to frame every product as a complete answer. Complete answers generate renewals, service contracts, and upsells. Partial answers require the retailer to keep looking.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              I am not arguing against fog systems specifically. I am arguing against the doctrine that places deterrence and friction at the centre of retail security. Theft is a commercial transaction. The thief is solving a supply problem for a buyer who wants goods at below-retail prices. Until the goods themselves carry a traceable marker and registry record, the supply problem remains solvable. Camera, guard, alarm, fog: none of these reduce resale confidence on their own. They make the acquisition harder. Criminals are very good at solving hard acquisition problems when the margin is worth it.
            </p>
          </Reveal>

          {/* Key Takeaways */}
          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "Fog security systems reduce visibility during a theft event. They do not reduce the resale value of stolen goods.",
                  "If the goods are still sellable after your system fires, the economics of the crime are unchanged.",
                  "Deterrence-based security (cameras, guards, fog) adds friction. Economic Sterilisation removes the incentive.",
                  "The ADN is designed to link theft-related shelf events to controlled marker deployment and a registry record.",
                  "Fog is the latest product in a long line of security theatre. The question to ask every vendor: after this fires, are the goods still sellable?",
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
              <h3 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 12px" }}>The research continues.</h3>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>Mykei publishes findings through The Signal as the ADN development programme continues.</p>
              <a href="/signal" style={{ display: "inline-block", background: GOLD, color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, padding: "14px 36px", borderRadius: 6, textDecoration: "none" }}>Read the Archive</a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/fog-security-systems-debunked"
            title="The Stock Is Gone Before the Fog Clears. Why Fog Security Is a £3,000 Distraction."
            description="A fog machine buys 20 seconds of confusion. The thief has the stock. The retailer has a smoke bill."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 18, flexShrink: 0 }}>SA</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 8 }}>About the Author</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: MID, margin: "0 0 10px" }}>
                  <strong style={{ color: INK }}>Sarah Aboladale</strong> is Creative Strategist at Mykei Securities, responsible for translating the Economic Sterilisation doctrine into public-facing narratives. She works directly with the founding team on editorial direction for The Signal.
                </p>
              </div>
            </div>
          </Reveal>

        </article>
      </div>
    </>
  );
}
