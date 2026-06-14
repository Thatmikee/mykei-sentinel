// src/pages/SignalPoliceThresholdPage.tsx
// The Signal · Issue 14: Police Won't Come for £30 of Stolen Stock

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";

const GOLD = "#c9a84c";
const INK = "#1E1E1E";
const MID = "#5c4a32";
const WARM = "#F5F1EB";
const RULE = "#DDD5C4";
const RED  = "#C4302B";

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

export default function SignalPoliceThresholdPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="Police Won't Come for £30 of Stolen Stock. That Is Not an Accident. | The Signal"
        description="Shoplifting cases have more than doubled in five years. Only 1 in 5 results in a charge. In London, 1 in 14. The de facto £200 floor means most retail theft is absorbed in silence. Michael Esema on why Economic Sterilisation removes the need to call anyone."
        canonical="https://mykei.io/signal/police-200-pound-threshold"
        ogImage="https://mykei.io/og/signal-police-200-pound-threshold.png"
        ogImageAlt="UK shoplifting data: +133% in 5 years, charges 1 in 5 nationally, 1 in 14 in London"
        keywords="police shoplifting threshold UK, £200 theft threshold, shoplifting charges UK 2026, Liberal Democrats shoplifting data, retail theft police response, 1 in 5 shoplifting charge, economic sterilisation, independent retailer theft, ADN Mykei Securities"
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "Police Won't Come for £30 of Stolen Stock. That Is Not an Accident.",
          "description": "Liberal Democrats data shows shoplifting cases more than doubled in five years. Only 1 in 5 results in a charge. The de facto £200 floor leaves most retail theft unaddressed.",
          "url": "https://mykei.io/signal/police-200-pound-threshold",
          "datePublished": "2026-05-28T08:00:00Z",
          "author": { "@type": "Person", "name": "Michael Esema", "url": "https://mykei.io/founder" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/signal-police-threshold-factsheet.png",
          "articleSection": "Retail Security",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] },
          "mentions": [
            { "@type": "Organization", "name": "Liberal Democrats" },
            { "@type": "Organization", "name": "ITV News" },
            { "@type": "Organization", "name": "Metropolitan Police Service" },
            { "@type": "Organization", "name": "Association of Convenience Stores", "alternateName": "ACS" },
            { "@type": "Organization", "name": "British Retail Consortium", "alternateName": "BRC" }
          ]
        })}
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "Police Won't Come for £30 of Stolen Stock", url: "https://mykei.io/signal/police-200-pound-threshold" },
        ]}
        articleMeta={{
          publishedTime: "2026-05-28T08:00:00Z",
          author: "Michael Esema",
          section: "Retail Security",
          tags: ["police", "shoplifting", "Liberal Democrats", "£200 threshold", "economic sterilisation"],
        }}
      />

      <div style={{ fontFamily: "'Georgia',serif", background: "#fff", color: INK, minHeight: "100vh" }}>

        {/* Nav */}
        <nav style={{ borderBottom: `1px solid ${RULE}`, padding: "0 40px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", zIndex: 100 }}>
          <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px", color: GOLD, textDecoration: "none", textTransform: "uppercase" }}>The Signal</a>
          <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px", color: INK, textDecoration: "none", textTransform: "uppercase", background: GOLD, padding: "8px 18px" }}>Follow the Research</a>
        </nav>

        <article style={{ maxWidth: 740, margin: "0 auto", padding: "64px 24px 100px" }}>

          {/* Label row */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD }}>The Signal</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: RULE, display: "inline-block" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999" }}>28 May 2026</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: RULE, display: "inline-block" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999" }}>6 min read</span>
              {/* ITV badge */}
              <span style={{ marginLeft: 8, background: "#0050A0", color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: "1px", padding: "3px 8px", textTransform: "uppercase" }}>ITV1 Data</span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.05}>
            <h1 className="article-standfirst" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 24, color: INK }}>
              Police Won't Come for £30 of Stolen Stock. That Is Not an Accident.
            </h1>
          </Reveal>

          {/* Standfirst */}
          <Reveal delay={0.1}>
            <p className="article-standfirst" style={{ fontSize: 19, lineHeight: 1.7, color: MID, marginBottom: 40, borderLeft: `3px solid ${GOLD}`, paddingLeft: 20 }}>
              Liberal Democrats data, broadcast on ITV1, puts shoplifting cases up 133% in five years. Only 1 in 5 results in a charge nationally. In London, 1 in 14. The de facto £200 floor means most retail theft is absorbed, logged, and forgotten. Michael Esema on why Economic Sterilisation removes the need to call anyone.
            </p>
          </Reveal>

          {/* Fact sheet image */}
          <Reveal delay={0.12}>
            <div style={{ marginBottom: 48 }}>
              <img
                src="/signal-police-threshold-factsheet.png"
                alt="UK shoplifting data: +133% in 5 years, charges 1 in 5 nationally, 1 in 14 in London. Source: Liberal Democrats, ITV1."
                style={{ width: "100%", borderRadius: 4, display: "block" }}
              />
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#999", marginTop: 8 }}>
                Source: Liberal Democrats data via ITV1 Good Morning Britain, 2026.
              </p>
            </div>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.15}>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              The police.uk crime prevention guidance for retail businesses is thorough. It covers lighting, stock placement, staff positioning, CCTV placement, and signage. It does not mention the number that every independent retailer already knows: below a certain value, reporting a theft is mostly a paperwork exercise.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              That number sits around £200. It is not a written rule. It is the operational reality of a system where shoplifting cases have more than doubled in five years, charges are issued in one out of five cases nationally, and in London the ratio drops to one in fourteen. Officers have finite time. Sub-£200 shoplifting, by volume, does not compete with what else is on their list.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              The ITV1 broadcast that carried these figures sourced them from the Liberal Democrats. The data was not contested. Nobody on the programme argued the numbers were wrong. The discussion moved on.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              For the independent retailer it does not move on. The off-licence owner absorbing four sweeps a month at £25 to £40 each is operating below the threshold at every single incident. The total annual loss might be £1,500 to £2,000. Individually, none of it qualifies. Collectively, it is the difference between a margin and no margin.
            </p>
          </Reveal>

          {/* Pull quote */}
          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 24, margin: "40px 0", fontFamily: "'Playfair Display',serif", fontSize: 22, fontStyle: "italic", lineHeight: 1.6, color: INK }}>
              "If the system cannot act on the theft, the only rational response is to make the theft not worth doing."
            </blockquote>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              This is the logic behind Economic Sterilisation. The question is not how we get police to respond faster, or how we film it better. The question is how we make stolen goods harder to move, so the commercial case for stealing them collapses before anyone calls 999.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 24, color: INK }}>
              In the proposed ADN workflow, a controlled marker would be deployed onto the item and logged to the Mykei Registry with a timestamp, store ID, and batch code. The design goal is to create a forensic identifier that travels with the goods. A buyer who acquires marked goods would be connected to a verifiable event record. The aim is to make goods harder to sell anonymously, not to guarantee recovery.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 40, color: INK }}>
              The police threshold does not change. What changes is whether the theft was worth doing in the first place. That is a different problem with a different solution. The <a href="/adn-1" style={{ color: GOLD, textDecoration: "underline" }}>ADN</a> is that solution.
            </p>
          </Reveal>

          {/* Stat callout strip */}
          <Reveal>
            <div style={{ background: "#fff", border: `1px solid ${RULE}`, padding: "32px 32px", marginBottom: 48, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
              {[
                { n: "+133%", label: "Shoplifting cases", sub: "in 5 years" },
                { n: "1 in 5", label: "Cases charged", sub: "nationally" },
                { n: "1 in 14", label: "Cases charged", sub: "in London" },
              ].map(s => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: GOLD, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: INK, marginTop: 8, letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#888", marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Key Takeaways */}
          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, padding: "32px 32px", marginBottom: 48 }} className="article-key-takeaways">
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Shoplifting cases more than doubled in five years, according to Liberal Democrats data broadcast on ITV1.",
                  "Only 1 in 5 shoplifting cases nationally results in a charge. In London, 1 in 14.",
                  "The de facto £200 floor means most individual retail theft incidents fall below the threshold for police response.",
                  "Economic Sterilisation addresses the commercial logic of theft, not the enforcement gap.",
                  "The ADN is designed to link theft-related shelf events to controlled marker deployment and a registry record, reducing resale confidence regardless of police capacity.",
                ].map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 14, fontSize: 15.5, lineHeight: 1.6, color: INK }}>
                    <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>›</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Pilot CTA */}
          <Reveal>
            <div style={{ border: `1px solid ${GOLD}`, padding: "36px 32px", marginBottom: 64, textAlign: "center" }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>Independent Retail Pilot, 2026</p>
              <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: INK }}>Five places remaining for independent retailers.</p>
              <p style={{ fontSize: 15, color: MID, marginBottom: 24 }}>No cameras. No confrontation. No reliance on police response times.</p>
              <a href="/signal" style={{ background: GOLD, color: INK, padding: "14px 32px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", fontWeight: 700, display: "inline-block" }}>Read the Archive</a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/police-200-pound-threshold"
            title="Police Won't Come for £30 of Stolen Stock. That Is Not an Accident."
            description="Forces routinely deprioritise incidents below £200. Below that line, the economics of the justice system do not work in the retailer's favour."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: WARM, border: `2px solid ${GOLD}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: GOLD }}>M</span>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 4 }}>Michael Esema</p>
                <p style={{ fontSize: 13, color: MID, lineHeight: 1.5 }}>Founder and CEO, Mykei Securities Ltd. Originator of Economic Sterilisation (2025). MSc International Business Management, Manchester Metropolitan University.</p>
                <a href="/founder" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: GOLD, textDecoration: "none", letterSpacing: "1px", display: "inline-block", marginTop: 8 }}>Full profile</a>
              </div>
            </div>
          </Reveal>

        </article>
      </div>

      <style>{`
        @media (max-width: 600px) {
          article { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </>
  );
}
