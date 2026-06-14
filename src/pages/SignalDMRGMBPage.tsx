// src/pages/SignalDMRGMBPage.tsx
// The Signal · Issue 11: David Robinson, GMB, and the end of CCTV theatre

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";

const GOLD = "#c9a84c";
const INK = "#1E1E1E";
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

export default function SignalDMRGMBPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="David Robinson Was Right on GMB. Here Is What Comes Next. | The Signal"
        description="David Robinson told GMB that CCTV is security theatre. He was right. But the question he didn't answer is: what replaces it? Michael Esema on the forensic digital twin, Economic Sterilisation, and why the ADN was built in a Prestwich workshop, not a venture capital portfolio."
        canonical="https://mykei.io/signal/david-robinson-gmb-cctv-theatre"
        ogImage="https://mykei.io/og/signal-david-robinson-gmb-cctv-theatre.png"
        keywords="David Robinson GMB CCTV, retail security theatre, CCTV ineffective shoplifting, ADN forensic retail defence, economic sterilisation, independent retailer security UK, controlled marker deployment, Mykei Securities, Independent Retail Pilot, forensic digital twin retail"
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "David Robinson, GMB, and the end of CCTV theatre", url: "https://mykei.io/signal/david-robinson-gmb-cctv-theatre" },
        ]}
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "David Robinson Was Right on GMB. Here Is What Comes Next.",
          "description": "David Robinson told GMB that CCTV is security theatre. He was right. What replaces it: Economic Sterilisation and the forensic digital twin.",
          "url": "https://mykei.io/signal/david-robinson-gmb-cctv-theatre",
          "datePublished": "2026-04-17T09:00:00Z",
          "author": { "@type": "Person", "name": "Sarah Aboladale" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Retail Security",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] },
          "mentions": [
            { "@type": "TVSeries", "name": "Good Morning Britain", "alternateName": "GMB" },
            { "@type": "Person", "name": "David Robinson" },
            { "@type": "Organization", "name": "British Retail Consortium", "alternateName": "BRC" },
            { "@type": "Organization", "name": "Association of Convenience Stores", "alternateName": "ACS" }
          ]
        })}
        articleMeta={{
          publishedTime: "2026-04-17T09:00:00Z",
          author: "Sarah Aboladale",
          section: "Retail Security",
          tags: ["CCTV", "GMB", "David Robinson", "retail theft", "forensic DNA", "economic sterilisation"],
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
              The Signal · Issue 11 · April 2026
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(28px,5vw,50px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1px", color: INK, margin: "0 0 24px" }}>
              David Robinson was right on GMB. Here is what comes next.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: MID, margin: "0 0 32px", fontStyle: "italic" }}>
              He called it security theatre. The industry bristled. But nobody answered the actual question: if not cameras, then what? The <a href="/adn-1" style={{ color: GOLD, textDecoration: "underline" }}>Active Defence Node (ADN)</a> is the answer.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${RULE}`, paddingTop: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>SA</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK }}>Sarah Aboladale</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID }}>Creative Strategist, Mykei Securities · 17 April 2026 · 7 min read</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Hero Image */}
        <div style={{ maxWidth: 900, margin: "0 auto 48px", padding: "0 32px" }}>
          <figure style={{ margin: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop"
              alt="Live television broadcast set with studio lighting"
              style={{ width: "100%", borderRadius: 6, display: "block", maxHeight: 480, objectFit: "cover" }}
              loading="lazy"
            />
            <figcaption style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999", marginTop: 8, letterSpacing: "0.5px" }}>
              Photo: Unsplash / broadcast television
            </figcaption>
          </figure>
        </div>

        {/* Article */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>

          {/* Pull quote */}
          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 40px", padding: "18px 28px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 20, lineHeight: 1.65, fontStyle: "italic", color: INK, margin: 0 }}>
                "A camera without forensic consequence is a very expensive way of documenting a crime that already happened."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              David Robinson appeared on ITV's Good Morning Britain and said what retailers have known for years but the security industry has spent forty years not saying: CCTV is largely theatre. The cameras are there to reassure. They record theft. They do not stop it. The footage is reviewed after the fact, the goods are gone, and the thief is already on to the next shop.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              He was correct. The reaction from parts of the industry was predictable, roughly amounting to: how dare you say this in public. But Robinson was not telling retailers anything they didn't already know. He was saying it on morning television, with the ACS and BRC data sitting behind him as evidence that the status quo is not working. 5.8 million incidents in UK convenience retail in 2025. Record spending. No reduction in losses. The numbers make the case so he didn't have to.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: INK, color: "#F5F1EB", padding: "32px 36px", borderRadius: 10, marginBottom: 36, position: "relative" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 18 }}>The Theatre Diagnosis</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                {[
                  { n: "40yrs", l: "of CCTV investment in UK retail" },
                  { n: "5.8M", l: "theft incidents in 2025, record high" },
                  { n: "£313M", l: "security spend, same year" },
                ].map(({ n, l }) => (
                  <div key={n}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 28, fontWeight: 700, color: GOLD, letterSpacing: -1, marginBottom: 6 }}>{n}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(245,241,235,0.55)", lineHeight: 1.55 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>What Robinson didn't answer.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The segment moved on, as television does. Robinson named the problem and the conversation ended. Nobody in the studio answered the question that actually matters: if cameras are not the solution, what is? The security industry will spend the next three months defending its product category rather than addressing the diagnosis. Independent retailers will spend those same three months absorbing losses they cannot afford on margins that don't have room for them.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              That is the gap I built into. Not because I had a venture capital thesis or a product roadmap inherited from a larger company. Because I visited shops in Manchester and watched owners who had installed every recommended system still writing off stock every week. The systems were not failing because of budget. They were failing because they were asking a camera to do something a camera cannot do.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "Theft is a commercial transaction. The thief is not irrational. They are doing arithmetic. Remove the commercial outcome and the arithmetic changes."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>Built in Prestwich. Not in a portfolio.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The ADN started on a breadboard in a workshop in Prestwich, Greater Manchester. An Encrypted Logic Core microcontroller. Two Tactical Multi-zone Sensor Array Time-of-Flight sensors on GPIO 4 and GPIO 5, addressed separately via XSHUT pins to avoid I2C conflicts. A 113kHz Forensic Mist Deployment System mounted on the shelf edge. I wrote the detection algorithm, the kinetic signature classifier, and the cloud registry integration. UK Patent application No. GB2606630.8 covers 17 claims. None of this came from a whiteboard in a Soho office.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The doctrine behind it is <a href="/economic-sterilisation" style={{ color: GOLD, textDecoration: "underline" }}>Economic Sterilisation</a>. I coined the term in 2025 because I could not find an existing word for the specific act of removing commercial value from stolen goods at the point of theft. Not deterrence, which relies on the thief making a rational risk calculation and deciding against it. Not detection, which happens after the loss. The systematic removal of commercial value from stolen goods, so that whether the thief succeeds in taking the goods or not, the goods are a forensic liability rather than a resaleable asset.
            </p>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The forensic digital twin.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              When the ADN activates, two things happen simultaneously. The 113kHz deployment module deploys a forensic marker compound designed to bond to whatever it contacts. The marker is invisible to the naked eye, visible under UV light, and designed to support evidential workflows. Each deployment carries a unique batch code tied to the store, the shelf position, and a millisecond timestamp.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              That batch code is designed to reach the Mykei Registry in real time. The registry would hold a batch-linked event record: store, shelf position, timestamp, and forensic marker ID. This is what I mean by a forensic digital twin: the intended design creates a traceable record designed to follow the goods, not just the shop floor. That record is built to support investigation, insurer review, and resale disruption workflows.
            </p>

            {/* Patent figure placeholder */}
            <div style={{ border: `1px solid ${RULE}`, borderRadius: 8, padding: "24px", marginBottom: 32, background: WARM }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>Patent Figure: GB2606630.8</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: MID, lineHeight: 1.65 }}>
                ADN activation sequence: sweep detection (ToF sensor array) &rarr; kinetic signature classification (Encrypted Logic Core, &lt;50ms) &rarr; deployment module trigger (113kHz ultrasonic deployment module) &rarr; cloud registry update (TIR batch write) &rarr; batch-linked event record created. Total latency: under 200ms from sweep onset to registry record.
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>What CCTV cannot do. What the ADN does.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 14 }}>
              A CCTV camera records a face. In most shoplifting cases, that face is unknown to police and cannot be matched to anything. The footage sits on a DVR until the hard drive is overwritten. No arrest. No recovery. No consequence.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              In the intended workflow, the ADN deploys a forensic marker designed to travel with the goods. When they surface on Vinted or at a buyer handover, the goods would carry a UV-detectable, batch-linked marker. The marker is designed to resist normal handling. The design goal is a persistent forensic identifier on the goods themselves, not just a record on a shelf.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Robinson called cameras theatre. The reason cameras are theatre is that they produce evidence with no reliable chain of consequence attached to it. The ADN is designed to produce evidence that travels with the crime. That is a different category of system entirely.
            </p>
          </Reveal>

          {/* Key Takeaways */}
          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "David Robinson's GMB diagnosis was accurate. Cameras record theft. They do not remove the reason it happens.",
                  "The question he left unanswered is the one Mykei exists to answer: if not cameras, what?",
                  "Economic Sterilisation targets the commercial outcome of theft. Lower resale confidence means weaker incentive.",
                  "The ADN is designed to link theft-related shelf events to marker and registry records via a forensic digital twin.",
                  "The Independent Retail Pilot is the first validation route for this doctrine in Greater Manchester retail.",
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

          {/* LinkedIn tags */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 24, marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: MID, marginBottom: 12 }}>Tagged</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["#RetailSecurity", "#CCTV", "#EconomicSterilisation", "#IndependentRetail", "#ShoplifitingUK", "#ADN1", "#ForensicDNA", "#ManchesterPilot", "#MykeiSecurities"].map(tag => (
                  <span key={tag} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, border: `1px solid ${RULE}`, padding: "4px 10px", borderRadius: 4 }}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/david-robinson-gmb-cctv-theatre"
            title="20 Million Thefts on Camera. None of Them Stopped. David Robinson Asked Why."
            description="GMB called out the CCTV industry live on air. The answer they didn't get is here."
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
