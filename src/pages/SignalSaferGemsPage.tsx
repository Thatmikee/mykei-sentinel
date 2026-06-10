// src/pages/SignalSaferGemsPage.tsx
// The Signal · Issue 13: SaferGems, AI policing, and why the institutional response misses the point

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

export default function SignalSaferGemsPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="SaferGems Jewellery Theft Surge: 10 Armed Robberies in Q1 2026. AI Policing Won't Be Ready Until 2030. | The Signal"
        description="SaferGems logged 10 armed jewellery robberies in Q1 2026, up from 1 in all of 2025. £3.2M stolen. Met Police, Surrey Police, and ITV News covered the surge. The government's £4M AI crime mapping response is due in 2030. Michael Esema on why prediction does not remove the commercial incentive for theft."
        canonical="https://mykei.io/signal/safergems-jewellery-theft-ai-police-response"
        ogImage="https://mykei.io/og/signal-safergems-jewellery-theft-ai-police-response.png"
        keywords="SaferGems jewellery theft 2026, armed robbery jewellery UK, Metropolitan Police jewellery crime, Surrey Police retail theft, ITV News jewellery robbery, UK government AI crime prediction, Concentrations of Crime Data Challenge DSIT, economic sterilisation jewellery, ADN-1 forensic marking, SaferGems Q1 2026 report, DCI Scott Mather Metropolitan Police, jewellery theft surge UK"
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "SaferGems Logged 10 Armed Robberies in Three Months. The Government's Answer Won't Be Ready Until 2030.",
          "description": "SaferGems recorded 10 armed jewellery robberies in Q1 2026, up from 1 in 2025. £3.2M stolen. The institutional response is AI crime mapping due in 2030 and fog machines that do not remove resale value. Michael Esema on Economic Sterilisation as the alternative doctrine.",
          "url": "https://mykei.io/signal/safergems-jewellery-theft-ai-police-response",
          "datePublished": "2026-04-15T14:00:00Z",
          "dateModified": "2026-04-15T14:00:00Z",
          "author": { "@type": "Person", "name": "Michael Esema", "url": "https://mykei.io/founder" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Retail Security",
          "keywords": "SaferGems, jewellery theft, Metropolitan Police, Surrey Police, AI crime mapping, economic sterilisation, ADN-1",
          "mentions": [
            { "@type": "Organization", "name": "SaferGems", "description": "BSIA-hosted jewellery crime intelligence network, Home Office approved" },
            { "@type": "Organization", "name": "Metropolitan Police", "sameAs": "https://www.met.police.uk" },
            { "@type": "Organization", "name": "Surrey Police", "sameAs": "https://www.surrey.police.uk" },
            { "@type": "Organization", "name": "ITV News", "sameAs": "https://www.itv.com/news" },
            { "@type": "Organization", "name": "Department for Science, Innovation and Technology", "alternateName": "DSIT" },
            { "@type": "Person", "name": "DCI Scott Mather", "affiliation": { "@type": "Organization", "name": "Metropolitan Police" } },
            { "@type": "Person", "name": "Peter Kyle", "jobTitle": "Secretary of State for Science and Technology" },
            { "@type": "Person", "name": "Dame Diana Johnson", "jobTitle": "Minister of State for Policing" }
          ],
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] }
        })}
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "SaferGems jewellery theft surge: AI policing and the doctrine that actually works", url: "https://mykei.io/signal/safergems-jewellery-theft-ai-police-response" },
        ]}
        articleMeta={{
          publishedTime: "2026-04-15T14:00:00Z",
          author: "Michael Esema",
          section: "Retail Security",
          tags: ["SaferGems", "jewellery theft", "AI policing", "Metropolitan Police", "Surrey Police", "ITV News", "economic sterilisation", "ADN-1"],
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
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD }}>
                The Signal · Issue 13 · April 2026
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", background: "#c0392b", color: "#fff", padding: "3px 10px", borderRadius: 3 }}>
                As reported on ITV News
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(26px,4.8vw,48px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1px", color: INK, margin: "0 0 24px" }}>
              SaferGems logged 10 armed robberies in three months. The government's answer won't be ready until 2030.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="article-standfirst" style={{ fontSize: 19, lineHeight: 1.75, color: MID, margin: "0 0 32px", fontStyle: "italic" }}>
              Jewellery theft in the UK has entered a new phase. The Metropolitan Police, Surrey Police, and ITV News have all covered it. The institutions are responding. The question is whether prediction, mapping, and fog machines get anywhere near the actual problem.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${RULE}`, paddingTop: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: INK, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK }}>Michael Esema</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID }}>Founder, Mykei Securities · 15 April 2026 · 8 min read</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Article */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>

          {/* Opening stat block */}
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 44 }}>
              {[
                { n: "10×", label: "increase in armed jewellery robberies, Q1 2025 to Q1 2026", src: "SaferGems Q1 2026" },
                { n: "£3.2M", label: "stolen in Q1 2026 alone, up from £60K in the whole of 2025", src: "SaferGems Q1 2026" },
                { n: "£4,000+", label: "per troy ounce of gold, making physical stock a highly liquid target", src: "London Bullion Market April 2026" },
              ].map(({ n, label, src }) => (
                <div key={n} style={{ border: `1px solid ${RULE}`, borderRadius: 8, padding: "20px 18px", background: WARM }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 28, fontWeight: 700, color: INK, lineHeight: 1, marginBottom: 8 }}>{n}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: INK, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: MID, letterSpacing: "1px", textTransform: "uppercase" }}>{src}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The numbers above were published by SaferGems, the BSIA-hosted jewellery crime intelligence network with over 4,000 member businesses. They are not projections. One incident in all of 2025. Ten in Q1 2026. £60,000 in losses last year. £3.2 million in the first three months of this one. SaferGems described the situation directly: the sector is facing "an unprecedented surge in armed robberies."
            </p>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The driver is not complicated. Gold passed £4,000 per troy ounce in early 2026. A standard jewellery display contains enough gold to clear several hundred thousand pounds if moved quickly. The arithmetic is visible to anyone in organised crime. When the reward-to-risk ratio shifts this dramatically, the volume of attempts follows.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 40px", padding: "18px 28px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 19, lineHeight: 1.65, fontStyle: "italic", color: INK, margin: 0 }}>
                "We are seeing an alarming increase in violent and organised attacks on jewellery retailers."
              </p>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID, margin: "12px 0 0", letterSpacing: "1px" }}>DCI Scott Mather, Metropolitan Police</p>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>What the attacks look like.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The Haringey incident in March 2026 is representative. Four suspects arrived on three mopeds. They entered the Bilezzik jewellery store, cleared the display cases under threat, and were gone in under two minutes. The store had CCTV. The footage showed faces obscured by helmets. No arrests were made at the scene.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The same pattern played out across nine other incidents in the same quarter. Not just in London. Surrey Police reported a sharp increase in moped-enabled smash-and-grab attacks on jewellers in the first three months of 2026, with organised crews moving between retail corridors and fencing stock through informal networks. ITV News covered the surge as part of its evening bulletins, placing the story alongside broader coverage of organised retail crime in England.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              These are not opportunistic shoplifters. They are coordinated operations with getaway vehicles, timing intelligence, and an established route to convert physical gold into cash. The planning horizon is weeks. The security at the targeted stores was not a meaningful obstacle.
            </p>
          </Reveal>

          {/* Timeline panel */}
          <Reveal>
            <div style={{ background: INK, color: "#F5F1EB", padding: "32px 36px", borderRadius: 10, marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>SaferGems · Q1 2026 at a Glance</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { q: "Full year 2025", v: "1 armed robbery · £60,000 stolen" },
                  { q: "January 2026", v: "Surge begins. SaferGems escalates alert level." },
                  { q: "March 2026", v: "Haringey Bilezzik attack. 4 suspects, 3 mopeds. Under 2 minutes." },
                  { q: "Q1 2026 total", v: "10 incidents · £3.2M stolen · 10× year-on-year" },
                  { q: "April 2026", v: "Met Police DCI Scott Mather speaks publicly. SaferGems issues sector-wide guidance." },
                ].map(({ q, v }) => (
                  <div key={q} style={{ display: "flex", gap: 20, alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, flexShrink: 0, minWidth: 120, lineHeight: 1.6 }}>{q}</span>
                    <p style={{ fontSize: 13, color: "rgba(245,241,235,0.8)", lineHeight: 1.65, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The government's response: map the crime, wait five years.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              In April 2026, DSIT and UKRI announced the Concentrations of Crime Data Challenge, a £4 million programme to build an AI system that maps crime hotspots across England and Wales. Peter Kyle, the Science and Technology Secretary, said the system would "help police get ahead of crime" rather than merely respond to it. Dame Diana Johnson, the Policing Minister, described it as a tool to direct resources toward knife crime, theft, and antisocial behaviour before incidents escalate.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The prototype is due in April 2026. Operational deployment is scheduled for 2030. The ten armed robberies that already happened in Q1 sit outside both timelines.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "Predicting where crime will concentrate is not the same as reducing the commercial incentive that drives it. A map does not create a traceable marker and registry record."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The AI mapping initiative is a genuine advance in how police allocate resource. Concentrating patrol coverage in high-probability zones, responding faster to emerging clusters, directing investigative attention to repeat-target areas: these all improve outcomes at the margin. This is not an argument that the programme has no value.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The problem is the doctrine it sits inside. Prediction-and-response assumes that making crime harder to commit in one window reduces its overall frequency. For theft of high-value, easily fenced goods, that assumption does not hold. The crew that cannot hit Haringey this week because police density has increased will hit Walthamstow next week. The gold is still worth £4,000 an ounce. The incentive is unchanged.
            </p>
          </Reveal>

          {/* Two-column comparison */}
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
              <div style={{ border: `1px solid ${RULE}`, borderRadius: 8, padding: "24px 22px" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: MID, marginBottom: 14 }}>Prediction-based response</div>
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                  {[
                    "Maps where crime is likely to occur",
                    "Increases police presence in hotspots",
                    "Displaces crime to adjacent areas",
                    "Requires perpetual resource deployment",
                    "Does not affect resale value of stolen goods",
                    "Operational: 2030",
                  ].map((t, i) => (
                    <li key={i} style={{ fontSize: 13, lineHeight: 1.7, color: INK, padding: "5px 0", borderBottom: i < 5 ? `1px solid ${RULE}` : "none", paddingLeft: 0 }}>{t}</li>
                  ))}
                </ul>
              </div>
              <div style={{ border: `1px solid ${GOLD}`, borderRadius: 8, padding: "24px 22px", background: WARM }}>
                <a href="/economic-sterilisation" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, textDecoration: "underline", marginBottom: 14, display: "block" }}>Economic Sterilisation</a>
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                  {[
                    "Marks goods forensically at the point of ownership",
                    "Batch code registered in the Mykei Registry",
                    "Stolen goods become commercially difficult to move",
                    "Registry event record supports resale verification workflows",
                    "UV-detectable marker visible at any inspection",
                    "Active from day one of installation",
                  ].map((t, i) => (
                    <li key={i} style={{ fontSize: 13, lineHeight: 1.7, color: INK, padding: "5px 0", borderBottom: i < 5 ? `1px solid ${RULE}` : "none" }}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>SaferGems is recommending fog machines. This is the same problem.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              In its April 2026 guidance, SaferGems recommended that jewellers consider security fog systems as part of their response protocol. A fog machine fires when intruders are detected, reduces visibility to near zero, and forces them to leave.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              We covered last week why fog systems share the same structural failure as CCTV. The test is this: after your security system fires, are the stolen goods still sellable? For fog, the answer is yes. If the crew got out with the stock before the fog deployed, or if they return with better timing, the goods are clean. There is no forensic marker. There is no registry entry. A buyer cannot distinguish fog-adjacent stolen gold from legitimately purchased gold.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              SaferGems is a legitimate and valuable network. They are doing exactly what their remit requires. The recommendation to use fog machines is consistent with current industry practice. The problem is that current industry practice has produced ten armed robberies and £3.2 million in losses in one quarter.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "The deterrence doctrine has had forty years to work. Q1 2026 is the result."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>What actually changes the economics.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The ADN-1 deployment module marks every item in a display case with a forensic marker compound within 200 milliseconds of activation. The batch code registers in the Mykei Registry in real time. From that point, every piece of stock in the affected area carries a UV-visible marker tied to that specific retailer's registry entry.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              A crew that takes marked gold cannot sell it anonymously. Listing on eBay or Vinted leaves a batch record. Presenting it to a legitimate trade buyer exposes the UV marker. The item is commercially difficult to move. The robbery has not produced the outcome the crew planned for.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              This does not require perfect AI crime prediction. It does not require police presence at the right place at the right time. It does not require the fog to deploy before the goods are taken. It requires the goods themselves to be useless to the person who takes them.
            </p>
          </Reveal>

          {/* Key Takeaways */}
          <Reveal>
            <div className="article-key-takeaways" style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "SaferGems recorded 10 armed jewellery robberies in Q1 2026, up from 1 in all of 2025. Losses rose from £60K to £3.2M.",
                  "Gold at £4,000+/oz means high-street jewellery stock has the economics of cash. The incentive will persist regardless of police visibility.",
                  "The UK Government's £4M AI crime mapping system targets operational deployment in 2030. The surge is happening now.",
                  "SaferGems recommends fog machines. Fog systems do not affect the resale value of stolen goods. The incentive is unchanged.",
                  "Economic Sterilisation removes the incentive by making stolen goods harder to resell. The ADN-1 marks stock forensically at the point of activation, in 200ms.",
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
              <h3 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 12px" }}>Five slots. Five independent retailers. One forensic blockade.</h3>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>Founders pricing. £149 setup + £40/month. No lock-in after the pilot. Direct founding team support.</p>
              <a href="/pilot" style={{ display: "inline-block", background: GOLD, color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, padding: "14px 36px", borderRadius: 6, textDecoration: "none" }}>Apply for the Pilot</a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/safergems-jewellery-theft-ai-police-response"
            title="10 Jewellery Robberies in 90 Days. The Government's Answer Arrives in 2030."
            description="SaferGems logged 10 armed robberies in Q1 2026. The AI policing response is four years away. Four years is a long time to bleed."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: INK, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 18, flexShrink: 0 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 8 }}>About the Author</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: MID, margin: "0 0 10px" }}>
                  <strong style={{ color: INK }}>Michael Esema</strong> is the founder of Mykei Securities and the inventor of Economic Sterilisation. He built the ADN-1 forensic deployment module to address the structural failure of deterrence-based retail security. The Signal is his research publication.
                </p>
              </div>
            </div>
          </Reveal>

        </article>
      </div>
    </>
  );
}
