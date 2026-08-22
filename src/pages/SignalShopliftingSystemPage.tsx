// src/pages/SignalShopliftingSystemPage.tsx
// The Signal · Issue 15: 133% up in five years. 1 in 14 charged in London.

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";
import EditorialNote from "@/components/EditorialNote";
import SignalRunningHead from "@/components/SignalRunningHead";

const GOLD = "#D8001F";
const INK  = "#1E1E1E";
const MID  = "#5c4a32";
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

export default function SignalShopliftingSystemPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="Shoplifting Up 133% in Five Years. London Charges 1 in 14. The System Has a Name for This: Acceptable Loss. | The Signal"
        description="530,000 shoplifting offences recorded in England and Wales in 2025. Charges issued in fewer than 1 in 5 cases nationally. In London, 1 in 14. Thematic coding shows organised gangs operating at scale while policing responds per-incident. Michael Esema on why the maths only works one way."
        canonical="https://mykei.io/signal/shoplifting-133-percent-london-1-in-14"
        ogImage="https://mykei.io/og/signal-shoplifting-133-percent-london-1-in-14.png"
        keywords="UK shoplifting statistics 2026, shoplifting charges London 1 in 14, organised retail crime UK, shoplifting up 133 percent, Liberal Democrats shoplifting data, thematic coding retail crime, ADN Mykei Securities, economic sterilisation, retail theft Manchester"
        ogType="article"
        ogImageAlt="Shoplifting up 133% in five years. London charges 1 in 14. The Signal by Mykei Securities."
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Shoplifting Up 133% in Five Years. London Charges 1 in 14. The System Has a Name for This: Acceptable Loss.",
          "description": "530,000 shoplifting offences. Charges in fewer than 1 in 5 cases nationally, 1 in 14 in London. Organised gangs operate systemically while policing responds per-incident. Michael Esema on Economic Sterilisation as the structural fix.",
          "url": "https://mykei.io/signal/shoplifting-133-percent-london-1-in-14",
          "datePublished": "2026-04-16T10:00:00Z",
          "author": { "@type": "Person", "name": "Michael Esema", "url": "https://mykei.io/founder" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Retail Security",
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": [".article-headline", ".article-standfirst"]
          },
          "mentions": [
            { "@type": "Organization", "name": "Liberal Democrats" },
            { "@type": "Organization", "name": "Metropolitan Police Service" },
            { "@type": "Organization", "name": "British Retail Consortium", "alternateName": "BRC" },
            { "@type": "Organization", "name": "Marks and Spencer", "alternateName": "M&S" },
            { "@type": "Organization", "name": "London Business Improvement Districts", "alternateName": "London BIDs" },
            { "@type": "Organization", "name": "Association of Convenience Stores", "alternateName": "ACS" }
          ]
        })}
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "Shoplifting Up 133% in Five Years", url: "https://mykei.io/signal/shoplifting-133-percent-london-1-in-14" },
        ]}
        articleMeta={{
          publishedTime: "2026-04-16T10:00:00Z",
          author: "Michael Esema",
          section: "Retail Security",
          tags: ["shoplifting", "organised retail crime", "London", "thematic coding", "Liberal Democrats", "economic sterilisation"],
        }}
      />

      <SignalRunningHead />

      <div style={{ fontFamily: "'Georgia',serif", background: "#fff", color: INK, minHeight: "100vh" }}>

        {/* Nav */}

        <article style={{ maxWidth: 740, margin: "0 auto", padding: "64px 24px 100px" }}>

          {/* Label row */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD }}>The Signal</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: RULE, display: "inline-block" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999" }}>Issue 15</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: RULE, display: "inline-block" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999" }}>16 April 2026</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: RULE, display: "inline-block" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999" }}>7 min read</span>
              <span style={{ marginLeft: 8, background: "#1a1a2e", color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: "1px", padding: "3px 8px", textTransform: "uppercase" }}>Home Office Data</span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.05}>
            <h1 className="article-headline" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 24, color: INK }}>
              Shoplifting Up 133% in Five Years. London Charges 1 in 14. The System Has a Name for This: Acceptable Loss.
            </h1>
          </Reveal>

          {/* Standfirst */}
          <Reveal delay={0.1}>
            <p className="article-standfirst" style={{ fontSize: 19, lineHeight: 1.7, color: MID, marginBottom: 40, borderLeft: `3px solid ${GOLD}`, paddingLeft: 20 }}>
              530,000 shoplifting offences were recorded in England and Wales in 2025. Fewer than 1 in 5 resulted in a charge. In London, the Metropolitan Police charged in fewer than 7% of cases, roughly 1 in 14. Thematic coding reveals the same gangs cycling the same routes. The policing response is still per-incident, per-store. Michael Esema on why that mismatch only resolves one way.
            </p>
          </Reveal>

          <EditorialNote kind="context" date="2026-08-18">
            <p style={{ margin: "0 0 10px" }}>
              Two figures in this piece have since been superseded, and we are leaving the original
              text intact rather than quietly editing it.
            </p>
            <p style={{ margin: "0 0 10px" }}>
              <strong>Volume.</strong> ONS figures published in July 2026 record 507,086 shoplifting
              offences in the year to March 2026, a fall of about 4% on the previous year. It is the
              first recorded annual decline after several years of increases.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Charge rate.</strong> The Metropolitan Police reported in August 2026 that
              positive outcomes rose 123% to 5,996, and that a direct evidence-submission scheme
              lifted the positive-outcome rate from 7.3% to 29.4% across six pilot boroughs before
              expanding to eight more. The London ratio quoted below is no longer current. The
              structural argument of this piece does not depend on it, but the number does.
            </p>
          </EditorialNote>

          {/* Stat block */}
          <Reveal delay={0.12}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginBottom: 48, background: "#F4F6F8", border: `1px solid ${RULE}`, borderRadius: 6, padding: 28 }}>
              {[
                { stat: "+133%", label: "shoplifting increase in 5 years", source: "LBC / Home Office" },
                { stat: "1 in 5", label: "cases charged nationally", source: "Liberal Democrats data" },
                { stat: "1 in 14", label: "cases charged in London", source: "Metropolitan Police" },
              ].map(({ stat, label, source }) => (
                <div key={stat} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,3vw,38px)", color: GOLD, fontWeight: 700, lineHeight: 1.1, marginBottom: 6 }}>{stat}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: INK, lineHeight: 1.4, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px" }}>{source}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.15}>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              Start with the number that does not move: 530,643 shoplifting offences recorded in England and Wales in the year to March 2025. The highest since modern recording began in 2003. That is not a spike after a quiet period. It is the latest point on a line that has been going one direction for five years straight, up 133% since 2020.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              The charge rate is 19.83% nationally. Below one in five. In London, the Metropolitan Police charged suspects in fewer than 7% of recorded cases, approximately 1 in 14. Durham Constabulary managed 32.7%. The gap between the worst and best performing force is not a gap in effort. It is a gap in the ratio of incidents to officers, and London has the worst ratio in the country.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              The Liberal Democrats published the underlying data and called it what it is: shoplifting has been "effectively decriminalised." 800 cases a day close with no suspect identified. 289,464 investigations were shut without a charge in 2024-25 alone. Those numbers are not contested.
            </p>
          </Reveal>

          {/* Section: thematic coding */}
          <Reveal>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 400, color: INK, margin: "48px 0 20px" }}>
              What thematic coding shows
            </h2>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              Policing agencies use thematic coding to group crimes by pattern rather than treating each incident in isolation. When thematic coding is applied to shoplifting data, a consistent picture emerges: the same organised gangs, the same target categories (alcohol, cosmetics, meat, baby formula, medicines), the same resale routes. M&S told the London mayor's office this year that retail crime is "more organised and aggressive" than at any point in recent memory.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              The problem thematic coding identifies is structural. The gangs operate at a network level. One group, multiple stores, multiple cities, one resale pipeline. The policing response is still store-level. A shopkeeper in Salford reports an incident. It goes into the system as one offence from one address. The gang that hit that store also hit three others in the same week. Those are logged separately. The pattern is visible in aggregate and invisible in the individual report.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 24, margin: "40px 0", fontFamily: "'Playfair Display',serif", fontSize: 22, fontStyle: "italic", lineHeight: 1.6, color: INK }}>
              "The data is not missing. The architecture to act on it is."
            </blockquote>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              This is where the narrative around retail crime breaks down. The standard framing treats the problem as one of police resource. If there were more officers, more charges would follow. That is probably true at the margins. But the 133% rise did not happen because officer numbers fell by 133%. It happened because the economic logic of organised theft improved: products got more expensive, resale platforms got more accessible, and the forensic cost of getting caught stayed close to zero.
            </p>
          </Reveal>

          {/* Section: the actual fix */}
          <Reveal>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 400, color: INK, margin: "48px 0 20px" }}>
              The maths only works one way
            </h2>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              If you run a corner shop and you have been hit four times this month, you are not waiting for a policing reform bill. You need the theft to stop being commercially rational. That is a different problem.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              Economic Sterilisation is the doctrine that addresses it directly. Not: improve detection rates. Not: make CCTV footage cleaner. The question is: what happens to the stolen goods after they leave the store? If they can be sold, they have value. If they cannot, the theft did not produce the outcome the thief needed.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              When the ADN fires, a controlled marker is deployed onto the item and registered to the Mykei Registry with a timestamp, store ID, and unique batch code. That batch code travels with the goods. The goods become harder to sell anonymously. A buyer who acquires marked goods becomes connected to a verifiable event record. The goods stop being liquid.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              There is also a thematic dimension to this. The same batch code linking three incidents in three Manchester stores is intelligence, not just evidence. It is the ADN's version of thematic coding, built into the infrastructure of the device itself. You do not need a crime analyst to run the query. The Registry runs it automatically.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 40, color: INK }}>
              The charge rate in London is 1 in 14. That is the system working at capacity. The question is not whether it can be pushed to 1 in 10. The question is whether the stolen goods were worth taking in the first place. ADN changes that answer before the police are ever called.
            </p>
          </Reveal>

          {/* Key takeaways */}
          <Reveal>
            <div style={{ background: "#F4F6F8", border: `1px solid ${RULE}`, borderRadius: 6, padding: "28px 32px", marginBottom: 48 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key takeaways</div>
              <ul style={{ margin: 0, padding: "0 0 0 18px", lineHeight: 2 }}>
                <li style={{ fontSize: 15, color: INK }}>Shoplifting offences are up 133% in five years in England and Wales (530,643 in year to March 2025)</li>
                <li style={{ fontSize: 15, color: INK }}>Nationally, fewer than 1 in 5 cases result in a charge; in London, the Metropolitan Police charge in fewer than 1 in 14 cases</li>
                <li style={{ fontSize: 15, color: INK }}>800 cases a day close with no suspect identified (Liberal Democrats, House of Commons Library data)</li>
                <li style={{ fontSize: 15, color: INK }}>Thematic coding reveals organised gang networks operating across multiple stores, while the policing architecture responds per-incident</li>
                <li style={{ fontSize: 15, color: INK }}>Economic Sterilisation removes the commercial logic of theft before any police response is needed</li>
                <li style={{ fontSize: 15, color: INK }}>The ADN Mykei Registry functions as distributed thematic intelligence, linking incidents across stores via shared batch codes</li>
              </ul>
            </div>
          </Reveal>

          {/* Pilot CTA */}
          <Reveal>
            <div style={{ background: "#fff", border: `2px solid ${GOLD}`, borderRadius: 6, padding: "36px 40px", marginBottom: 48, textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: INK, marginBottom: 10 }}>The Independent Retail Pilot is open for expressions of interest.</div>
              <p style={{ fontFamily: "'Georgia',serif", fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>
                Independent retailers in Manchester can apply for an upcoming pilot cohort. No obligation after pilot. Commercial terms agreed directly with Mykei.
              </p>
              <a href="/pilot" style={{ display: "inline-block", background: GOLD, color: INK, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "14px 32px", borderRadius: 4, textDecoration: "none" }}>
                Apply for the Pilot
              </a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/shoplifting-133-percent-london-1-in-14"
            title="Shoplifting Up 133% in Five Years. London Charges 1 in 14."
            description="The system has a name for this: acceptable loss. Here is why the charge rate collapse is structural, not accidental."
          />

          {/* Author block */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: "50%", background: "#E8E0D0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: 20, color: MID }}>M</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 4 }}>Michael Esema</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999", marginBottom: 8 }}>Founder, Mykei Securities Ltd</div>
                <p style={{ fontSize: 14, color: MID, lineHeight: 1.7, margin: 0 }}>
                  Michael founded Mykei Securities in Manchester in 2026. He holds an MBA from the Nigerian Defence Academy and an MSc in International Business Management from Manchester Metropolitan University. The ADN is the first physical implementation of the Economic Sterilisation doctrine he developed in 2025.
                </p>
              </div>
            </div>
          </Reveal>

        </article>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${RULE}`, padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px", color: GOLD, textDecoration: "none", textTransform: "uppercase" }}>Mykei Securities</a>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999", textDecoration: "none" }}>All articles</a>
            <a href="/economic-sterilisation" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999", textDecoration: "none" }}>Economic Sterilisation</a>
            <a href="/pilot" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999", textDecoration: "none" }}>Join the Pilot</a>
          </div>
        </footer>

      </div>
    </>
  );
}
