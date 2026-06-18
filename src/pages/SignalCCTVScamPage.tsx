// src/pages/SignalCCTVScamPage.tsx
// The Signal · Issue 01: CCTV is a £313 million movie ticket

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";

const GOLD = "#0D9488";
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

export default function SignalCCTVScamPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="CCTV is a £313 Million Movie Ticket for a Crime You Already Lost | The Signal"
        description="The 2026 ACS Crime Report shows UK retailers spent a record £313m on security last year and suffered 5.8 million thefts. That's not deterrence. That's an expensive documentary of your losses. Mykei's Michael Esema explains why cameras without forensic response are security theatre."
        canonical="https://mykei.io/signal/cctv-313-million-movie-ticket"
        ogImage="https://mykei.io/og/signal-cctv-313-million-movie-ticket.png"
        ogType="article"
        keywords="CCTV retail theft deterrence, ACS crime report 2026, UK retail theft statistics, retail security failure, CCTV not enough shoplifting, organised retail crime UK, economic sterilisation, retail security theatre, Michael Esema Mykei, independent retailer theft UK, 11p crime tax retailers, forensic retail security"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "CCTV is a £313 Million Movie Ticket for a Crime You Already Lost",
          "description": "UK retailers spent £313m on security in 2025 and suffered 5.8 million thefts. The camera records the crime. It does not stop it. Michael Esema on why deterrence without resale removal is security theatre.",
          "url": "https://mykei.io/signal/cctv-313-million-movie-ticket",
          "datePublished": "2026-04-04T08:00:00Z",
          "author": { "@type": "Person", "name": "Michael Esema", "url": "https://mykei.io/founder" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Retail Security",
          "keywords": "CCTV, retail theft, ACS 2026, economic sterilisation, security theatre",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] },
          "mentions": [
            { "@type": "Organization", "name": "Association of Convenience Stores", "alternateName": "ACS" },
            { "@type": "Organization", "name": "British Retail Consortium", "alternateName": "BRC" }
          ]
        })}
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "CCTV: £313 Million Movie Ticket", url: "https://mykei.io/signal/cctv-313-million-movie-ticket" },
        ]}
        articleMeta={{
          publishedTime: "2026-04-04T08:00:00Z",
          author: "Michael Esema",
          section: "Retail Security",
          tags: ["CCTV", "retail theft", "ACS 2026", "economic sterilisation", "forensic security"],
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
              The Signal · Issue 01 · April 2026
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1px", color: INK, margin: "0 0 24px" }}>
              CCTV is a £313 million movie ticket for a crime you already lost.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: MID, margin: "0 0 32px", fontStyle: "italic" }}>
              The 2026 ACS Crime Report: £313 million spent, 5.8 million incidents. Things got worse. This is not a funding problem.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${RULE}`, paddingTop: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK }}>Michael Esema</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID }}>Founder, Mykei Securities · 4 April 2026 · 6 min read</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Hero Image */}
        <div style={{ maxWidth: 900, margin: "0 auto 48px", padding: "0 32px" }}>
          <figure style={{ margin: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80&auto=format&fit=crop"
              alt="Security cameras mounted on a building wall"
              style={{ width: "100%", borderRadius: 6, display: "block", maxHeight: 480, objectFit: "cover" }}
              loading="lazy"
            />
            <figcaption style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#999", marginTop: 8, letterSpacing: "0.5px" }}>
              Photo: Unsplash / security surveillance
            </figcaption>
          </figure>
        </div>

        {/* Article */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>

          {/* Pull quote */}
          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 40px", padding: "18px 28px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 20, lineHeight: 1.65, fontStyle: "italic", color: INK, margin: 0 }}>
                "Every £1 spent on CCTV without a forensic response is a £1 spent proving you were robbed. Not stopping it."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The March 2026 ACS Crime Report landed with the usual press coverage. Graphs. Percentages. Concerned quotes from trade bodies. What it actually says, if you read past the executive summary, is devastating: UK convenience retailers suffered an estimated <strong>5.8 million incidents of theft</strong> last year. They spent a record <strong>£313 million</strong> on crime prevention to achieve this. That works out to a hidden <strong>11p crime tax on every single transaction</strong> a convenience store processes.
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Five-point-eight million incidents. The population of Scotland. Each one a judgment call that went the wrong way. Each one a moment where a thief looked at your shop and decided the probability of meaningful consequences was low enough to be worth it. And they were right. Because the primary deterrent most shops deployed was a camera.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: INK, color: "#F5F1EB", padding: "32px 36px", borderRadius: 10, marginBottom: 36, position: "relative" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 18 }}>2026 ACS Crime Report: Key Numbers</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                {[
                  { n: "5.8M", l: "theft incidents (UK convenience, 2025)" },
                  { n: "£313M", l: "spent on security, record high" },
                  { n: "11p", l: "crime tax per transaction" },
                ].map(({ n, l }) => (
                  <div key={n}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 32, fontWeight: 700, color: GOLD, letterSpacing: -1, marginBottom: 6 }}>{n}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(245,241,235,0.55)", lineHeight: 1.55 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The camera is a passive witness. That's its only job.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              A camera records. That's it. The security industry has spent forty years blurring this, but underneath the brochure language it's still just a lens connected to a hard drive. It doesn't intervene. It doesn't flag the stolen goods on Vinted. It produces a video file of a crime that was completed, profitable, and already funding the next one before you reviewed the footage.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The deterrence case assumes the thief notices the camera, calculates the personal risk, and leaves. For a narrow population of opportunistic shoplifters, this is probably true. The problem is that the 2026 BRC data on high-value losses points almost entirely at organised crime groups, not opportunists. These are people who case your shop on a Tuesday, identify your camera angles, and build their operation around the gaps. Your CCTV system isn't a deterrent to them. It's a planning constraint.
            </p>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>An exit interview for your inventory.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              In 5.8 million incidents last year, the sequence was roughly the same. Goods taken. Camera filmed it. Footage reviewed hours later, after the thief had left, sold the haul, and gone home. Police log it, close it without resources to pursue it further. Camera records the next one.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 14 }}>
              My background is in financial audit, not security. I spent years at the National Emergency Management Agency in Nigeria managing government crisis budgets, and then time on a shop floor at B's Hive watching retail theft hollow out margins line by line. The audit framing is probably why I look at the ACS report and see a category error rather than a funding problem.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The industry is measuring deterrence. Deterrence is the wrong metric for a tool that physically cannot deter anything. Prosecution rates from camera footage are somewhere between low and invisible. Being filmed does not reduce the value of what the thief walked out with. The maths of the crime doesn't change.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "The deterrence case for CCTV assumes the thief values their future freedom more than the immediate cash. The fencing economy has largely solved that problem for them."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The question nobody in the security industry is asking.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              If you remove the ability to profit from stolen goods, does the theft still happen? I coined the term <a href="/economic-sterilisation" style={{ color: GOLD, textDecoration: "underline" }}>Economic Sterilisation</a> in 2025 because I couldn't find an existing word for that specific act. Not deterrence. Not prevention. The removal of commercial value at the point of theft. Cameras don't do this. Guards don't do this. EAS tags leave the goods fully sellable once someone peels the tag off in a car park. None of the £313 million the industry spent last year does this.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 14 }}>
              The ADN is designed to address this. Two Time-of-Flight sensors fire 30 times a second. An Encrypted Logic Core classifies a bulk-sweep event in under 50ms. A 113kHz ultrasonic deployment module disc deploys a forensic marker compound designed to bond to whatever it touches. The batch code hits the Mykei Registry, creating a tamper-aware event record. The goods become commercially difficult to move.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              Not a movie ticket. The end of the film before it starts.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "The ACS 2026 report: 5.8 million theft incidents against £313m in spending. The math does not work.",
                  "CCTV records theft. It does not remove the financial incentive for it.",
                  "Organised crime groups treat cameras as a routing problem, not a deterrent.",
                  "Economic Sterilisation addresses the actual decision calculus: can I sell this? If the answer is no, the theft is irrational.",
                  "The Active Deterrent Node (ADN) is designed to address this directly: make the goods harder to sell anonymously, and the financial case for stealing them weakens before the act.",
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
            url="https://mykei.io/signal/cctv-313-million-movie-ticket"
            title="CCTV is a £313 Million Movie Ticket for a Crime You Already Lost"
            description="UK retailers spent £313m on security in 2025 and suffered 5.8 million thefts. The camera records the crime. It does not stop it."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 18, flexShrink: 0 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 8 }}>About the Author</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: MID, margin: "0 0 10px" }}>
                  <strong style={{ color: INK }}>Michael Esema, MBA, MSc.</strong> Nigerian-born entrepreneur. Audit background, defence academy MBA, MSc from MMU. I came to retail security sideways, through a shop floor and a spreadsheet, and built the ADN on a breadboard in Prestwich because the industry wasn't asking the right question. Founder of Mykei Securities. Patent-pending: UK application No. 2606630.8.
                </p>
                <a href="https://michaelesema.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none" }}>Full background at michaelesema.com</a>
              </div>
            </div>
          </Reveal>

        </article>
      </div>
    </>
  );
}
