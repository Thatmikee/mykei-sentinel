import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const TIMELINE = [
  { year: "2018", title: "BSc (Hons) Accounting", sub: "Benson Idahosa University · Benin City, Nigeria", type: "edu" },
  { year: "2018–19", title: "National Youth Service Corps (NYSC)", sub: "Federal Government of Nigeria · 1-year compulsory national service", type: "work" },
  { year: "2019–23", title: "Hospitality Finance, Head Accountant → Assistant Manager", sub: "B's Hive Hotel & Suites · Nigeria · Four years watching institutions absorb loss", type: "work" },
  { year: "2022", title: "Master of Business Administration (MBA)", sub: "Nigerian Defence Academy · Kaduna, Nigeria", type: "edu" },
  { year: "2023", title: "Relocates to Manchester, United Kingdom", sub: "Finds UK retail running the same playbook: record theft, absorb cost, call it normal", type: "pivot" },
  { year: "2024", title: "MSc International Business Management, Merit", sub: "Manchester Metropolitan University · Manchester, UK", type: "edu" },
  { year: "2025", title: "Coins the term Economic Sterilisation", sub: "The doctrine that removes the commercial incentive for theft before it repeats", type: "invention" },
  { year: "2026", title: "Incorporates Mykei Securities Ltd · Files 17-claim patent", sub: "Co. 16984969 · Patent application No. GB2606630.8 · Manchester", type: "founding" },
  { year: "2026", title: "Pilot fit conversations open", sub: "Greater Manchester · 2026 · Pre-pilot, registry-first validation planned", type: "founding" },
];

const TYPE_COLORS: Record<string, string> = {
  edu: "#6366f1",
  work: "#c9a84c",
  pivot: "#2dd4bf",
  invention: "#f59e0b",
  founding: "#22c55e",
};

export default function FounderPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Inject page-level schema
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "dateModified": "2026-04-23T00:00:00+00:00",
      "mainEntity": {
        "@type": "Person",
        "@id": "https://michaelesema.com/#person",
        "name": "Michael Esema",
        "additionalName": "Essien",
        "alternateName": [
          "Michael Essien Esema", "Mike Esema", "M. Esema",
          "M Esema", "Mickey Esema", "Michael E", "Mike E."
        ],
        "description": "Michael Esema (Michael Essien Esema) is a Nigerian-born entrepreneur and security innovator based in Manchester, UK. Founder & CEO of Mykei Securities Ltd and originator of Economic Sterilisation, the doctrine that disrupts the resale incentive behind retail theft.",
        "jobTitle": "Founder & CEO",
        "nationality": { "@type": "Country", "name": "Nigeria" },
        "homeLocation": { "@type": "Place", "name": "Manchester, Greater Manchester, United Kingdom" },
        "url": "https://michaelesema.com",
        "award": [
          "Most Influential Male, Nigerian Universities Accounting Students Association, 2018",
          "Student Leader of the Year, Nigerian Universities Accounting Students Association, 2018",
          "Most Assiduous Student Leader of the Year, Benson Idahosa University, 2018",
          "Most Innovative Student Leader of the Year, Connex Award, 2018",
          "Dedication to Service of Humanity, Eagles Wings Motivation Award, 2018",
          "Most Innovative Leader of the Year, Clover Conglomerate Awards, 2017",
          "Most Influential Male, Accounting Students Association Uniben Chapter, 2017"
        ],
        "sameAs": [
          "https://michaelesema.com",
          "https://mykei.io",
          "https://www.linkedin.com/in/michaelesema",
          "https://github.com/Thatmikee"
        ]
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["#founder-name", "#founder-bio", "#coinage-section"]
      }
    });
    document.head.appendChild(schema);

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Michael Esema (Michael Essien Esema), Nigerian-born entrepreneur in Manchester. Founder of Mykei Securities Ltd, inventor of ADN, and originator of Economic Sterilisation. MBA, MSc, BSc. Patent pending.");

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.head.removeChild(schema);
    };
  }, []);

  return (
    <>
      <PageSEO
        title="Michael Esema, Founder & CEO, Mykei Securities Ltd | Manchester"
        description="Michael Esema (Michael Essien Esema) is a Nigerian-born entrepreneur based in Manchester, UK. Founder of Mykei Securities Ltd, inventor of ADN, and originator of Economic Sterilisation. MBA, MSc. Patent application No. 2606630.8."
        canonical="https://mykei.io/founder"
        keywords="Michael Esema, Michael Essien Esema, Mykei Securities founder, economic sterilisation inventor, ADN inventor, Manchester entrepreneur, retail security founder"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #FFFFFF; color: #1E1E1E; }
        a { text-decoration: none; }

        .fn-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 52px; height: 64px; transition: background 0.25s, border-color 0.25s;
          background: #FFFFFF; border-bottom: 1px solid #E8E8E8;
        }
        .fn-nav.scrolled {
          background: #FFFFFF;
          border-bottom: 1px solid #E8E8E8;
        }
        @media(max-width:768px){
          .fn-nav { padding: 0 20px; }
          .fn-hero { padding: 120px 24px 80px !important; }
          .fn-grid { grid-template-columns: 1fr !important; }
          .fn-tl { padding-left: 28px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`fn-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="/" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: "#1E1E1E", letterSpacing: 0.5 }}>MYKEI SECURITIES LTD</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: 2.5, textTransform: "uppercase", color: "#8a7a5a" }}>Back to site</span>
        </a>
        <a href="/pilot" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: "#1E1E1E", background: "#D4AF37", padding: "8px 20px", borderRadius: 8 }}>Join the Pilot</a>
      </nav>

      {/* HERO */}
      <section className="fn-hero" style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E8E8", padding: "120px 52px 80px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2D7D46" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: "#8a7a5a" }}>
                Founder Profile · Mykei Securities Ltd
              </span>
            </div>

            <h1 id="founder-name" style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(48px,7vw,96px)", fontWeight: 400, lineHeight: 1.05, color: "#1E1E1E", letterSpacing: -2, marginBottom: 8 }}>
              Michael<br />
              <span style={{ color: "#765C14" }}>Esema</span>
            </h1>



            <p id="founder-bio" style={{ fontSize: "clamp(16px,2vw,20px)", lineHeight: 1.8, color: "#555", maxWidth: 640, marginBottom: 48, fontWeight: 300 }}>
              Nigerian-born. Manchester-based. He spent years in hospitality finance in Nigeria,
              watching institutions record failure rather than prevent it. Then he came to the UK
              and found retail doing exactly the same thing. Theft happens, the cost gets absorbed,
              it gets called normal. He decided to remove the reason instead.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="/economic-sterilisation" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, background: "#D4AF37", padding: "12px 24px", borderRadius: 8, color: "#1E1E1E" }}>
                Read: Economic Sterilisation
              </a>
              <a href="https://michaelesema.com" target="_blank" rel="noreferrer" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 500, color: "#555", border: "1px solid #E8E8E8", padding: "12px 24px", borderRadius: 8 }}>
                Personal Site
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section style={{ background: "#FFFFFF", padding: "96px 52px", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="fn-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <Reveal>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#765C14", display: "block", marginBottom: 20 }}>
                The origin
              </span>
              <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(28px,3vw,42px)", fontWeight: 400, color: "#1E1E1E", lineHeight: 1.2, marginBottom: 32 }}>
                Most institutions are better at recording failure than preventing it.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "#555", marginBottom: 20 }}>
                Michael Esema grew up in Nigeria. After graduating with a BSc in Accounting
                from Benson Idahosa University, he completed his National Youth Service Corps year
                before building a career in hospitality finance, moving from Head Accountant
                to Assistant Manager at B's Hive Hotel and Suites. He watched institutions from
                the inside: recording outcomes, writing reports, absorbing losses. The prevention
                side of the equation was always someone else's problem.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "#555" }}>
                He arrived in Manchester in 2023. What he found in UK retail was the same pattern:
                CCTV recording theft, tags beeping as thieves walked out, retailers absorbing
                losses and calling it the cost of doing business. Every system built to respond.
                None built to remove the reason.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Origin", val: "Nigeria" },
                  { label: "Based", val: "Manchester, United Kingdom" },
                  { label: "Former employer", val: "B's Hive Hotel & Suites · Nigeria" },
                  { label: "Patent", val: "No. 2606630.8 (UK) · 17 claims · patent pending" },
                  { label: "Patent ownership", val: "Filed in Michael Esema's personal name; assignment to Mykei Securities Ltd outstanding" },
                  { label: "Company", val: "Mykei Securities Ltd · Co. 16984969" },
                  { label: "Pilot", val: "Manchester Alpha · in planning" },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px 20px", background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: 8 }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "#8a7a5a", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 14, color: "#1E1E1E", fontWeight: 500 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ background: "#FFFFFF", padding: "96px 52px", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#765C14", display: "block", marginBottom: 12 }}>Career & education</span>
            <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(26px,3vw,38px)", fontWeight: 400, color: "#1E1E1E", lineHeight: 1.2, marginBottom: 60 }}>
              The path that led to ADN.
            </h2>
          </Reveal>

          <div className="fn-tl" style={{ position: "relative", paddingLeft: 48 }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 12, top: 8, bottom: 8, width: 1, background: "#E8E8E8" }} />

            {TIMELINE.map(({ year, title, sub, type }, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div style={{ position: "relative", marginBottom: 36, display: "flex", gap: 20 }}>
                  <div style={{
                    position: "absolute", left: -40, top: 4,
                    width: 10, height: 10, borderRadius: "50%",
                    background: type === "founding" ? "#D4AF37" : type === "invention" ? "#D4AF37" : "#E8E8E8",
                    border: `2px solid ${type === "founding" || type === "invention" ? "#D4AF37" : "#C8C5C0"}`,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, color: "#765C14", marginBottom: 4 }}>{year}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "#1E1E1E", marginBottom: 4, lineHeight: 1.4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ECONOMIC STERILISATION COINAGE */}
      <section id="coinage-section" style={{ background: "#FFFFFF", padding: "96px 52px", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#765C14", display: "block", marginBottom: 20 }}>Coined 2025</span>
            <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 400, color: "#1E1E1E", lineHeight: 1.15, marginBottom: 32, maxWidth: 700 }}>
              He named the thing no one had named yet.
            </h2>
          </Reveal>

          <div className="fn-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <Reveal delay={0.1}>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#555", marginBottom: 24 }}>
                Every retail security system before 2025 operated on the same assumption: make theft
                harder, riskier, or more visible. None asked the more fundamental question:
                what happens to the goods after they leave?
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#555", marginBottom: 32 }}>
                Michael Esema identified an often-cited estimate that around 94% of stolen goods are sold online (a widely repeated figure in resale-crime commentary, not independently verified by Mykei). That means
                theft is a supply-chain problem, not just a security problem. Remove the market
                for stolen goods and you remove the economic rationale for taking them.
                He called this <em style={{ color: "#8a6a1a", fontStyle: "normal", fontWeight: 600 }}>Economic Sterilisation</em>.
              </p>
              <a href="/economic-sterilisation" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", color: "#765C14", borderBottom: "1px solid #D4AF37", paddingBottom: 3 }}>
                Read the full doctrine
              </a>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E8", borderLeft: "3px solid #D4AF37", borderRadius: 8, padding: 32 }}>
                <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 11, fontStyle: "italic", color: "#8a7a5a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 20 }}>Definition · coined 2025</p>
                <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 20, fontStyle: "italic", color: "#1E1E1E", lineHeight: 1.65, marginBottom: 20 }}>
                  "The systematic disruption of the resale incentive behind retail theft through
                  forensic marking and registry event records, removing the commercial
                  rationale for theft at the point it occurs."
                </p>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#555", letterSpacing: 0.8 }}>
                  Michael Esema, Mykei Securities Ltd, Manchester, 2025
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section style={{ background: "#FAFAF8", padding: "80px 52px", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#765C14", display: "block", marginBottom: 20 }}>Why We Exist</span>
            <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700, lineHeight: 1.15, color: "#1E1E1E", marginBottom: 40, maxWidth: 720 }}>
              A world where stealing is no longer worth the risk.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="fn-grid">
            <Reveal delay={0.05}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#765C14", marginBottom: 16 }}>Vision</div>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "#374151" }}>
                  A high street where independent shops do not have to choose between confronting thieves and watching their stock walk out. Reducing resale confidence for organised retail crime, and making stolen goods harder to move, is not optimism, it is a calculation retailers can shift: reduce the resale reward, and theft becomes less worthwhile.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#765C14", marginBottom: 16 }}>Mission</div>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "#374151" }}>
                  Give independent retailers the one thing security has rarely offered: a way to make stolen goods harder to cash out. Mykei is building for the shops that keep the high street alive, not the chains with entire loss-prevention departments, but the butcher, the pharmacy, the corner shop.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section style={{ background: "#FFFFFF", padding: "80px 52px", borderTop: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#8a7a5a", display: "block", marginBottom: 36 }}>Education</span>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {[
              { label: "MSc International Business Management", sub: "Manchester Metropolitan University · 2024 · Merit", tag: "MMU" },
              { label: "Master of Business Administration (MBA)", sub: "Nigerian Defence Academy · Kaduna · 2022", tag: "NDA" },
              { label: "BSc (Hons) Accounting", sub: "Benson Idahosa University · Benin City · 2018", tag: "BIU" },
            ].map(({ label, sub, tag }) => (
              <Reveal key={label}>
                <div style={{ padding: "22px 20px", border: "1px solid #E8E8E8", borderRadius: 8, background: "#FFFFFF" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: 1.5, color: "#765C14", marginBottom: 10 }}>{tag}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1E1E1E", lineHeight: 1.35, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#FFFFFF", padding: "72px 52px", borderTop: "2px solid #D4AF37", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 400, color: "#1E1E1E", marginBottom: 16 }}>
            The Independent Retail Pilot is open for expressions of interest.
          </h2>
          <p style={{ fontSize: 15, color: "#666", marginBottom: 36 }}>Greater Manchester, 2026, commercial terms agreed directly with Mykei</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/pilot" style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#1E1E1E", background: "#D4AF37", padding: "14px 32px", borderRadius: 8 }}>Join the Pilot</a>
            <a href="https://michaelesema.com" target="_blank" rel="noreferrer" style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 500, color: "#555", border: "1px solid #E8E8E8", padding: "14px 32px", borderRadius: 8 }}>Visit michaelesema.com</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#FFFFFF", padding: "24px 52px", borderTop: "1px solid #E8E8E8", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1E1E1E", letterSpacing: 0.5 }}>MYKEI SECURITIES LTD</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#555", marginTop: 2 }}>Company No. 16984969 · Manchester · England & Wales</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#555" }}>
          © 2026 Mykei Securities Ltd · <a href="/" style={{ color: "#8a7a5a" }}>mykei.io</a>
        </div>
      </footer>
    </>
  );
}
