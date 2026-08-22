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
      { threshold: 0.06 }
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
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const GOLD = "#c9a84c";
const INK = "#1a1108";
const MID = "#5c4a32";
const FAINT = "#F4F6F8";

export default function Blog796BillionPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "The $796 Billion Problem: Why Retailers Are Losing the War on Theft | Mykei Securities";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Retail theft costs the world $796 billion every year. Organised retail crime accounts for $9 billion in preventable losses. Why conventional security is failing and why Economic Sterilisation is the only doctrine that targets the root cause.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://mykei.io/blog/the-796-billion-problem");

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "The $796 Billion Problem: Why Retailers Are Losing the War on Theft",
        "description": "Retail theft costs the world $796 billion every year. Organised retail crime accounts for $9 billion in preventable losses. Economic Sterilisation is the doctrine that targets the root cause.",
        "author": { "@type": "Person", "name": "Michael Esema", "url": "https://michaelesema.com" },
        "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" },
        "datePublished": "2026-04-10",
        "url": "https://mykei.io/blog/the-796-billion-problem",
        "mainEntityOfPage": "https://mykei.io/blog/the-796-billion-problem",
        "keywords": ["Economic Sterilisation", "retail theft prevention", "organised retail crime", "ADN"],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://mykei.io/blog/the-796-billion-problem",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".b-headline", ".b-standfirst"]
        }
      }
    ]);
    document.head.appendChild(schema);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); document.head.removeChild(schema); };
  }, []);

  return (
    <>
      <PageSEO
        title="The $796 Billion Problem: Why Retailers Are Losing the War on Theft | Mykei Securities"
        description="Retail theft costs the world $796 billion every year. Organised retail crime accounts for $9 billion in preventable losses in the UK alone. Why conventional security fails and what Economic Sterilisation does differently."
        canonical="https://mykei.io/blog/the-796-billion-problem"
        ogType="article"
        keywords="retail theft $796 billion, organised retail crime prevention, economic sterilisation, retail theft for small businesses, retail crime for accountants, shoplifting for enterprise, theft economics for retailers"
        ogImageAlt="The $796 Billion Problem, retail theft economics analysis by Mykei Securities"
        articleMeta={{ publishedTime: "2026-04-10T00:00:00Z", author: "Michael Esema", section: "Retail Security", tags: ["Economic Sterilisation","Retail Theft","Organised Retail Crime","ADN"] }}
        breadcrumbs={[["Home","https://mykei.io"],["Blog","/blog"],["The $796 Billion Problem",""]]}
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Sora', sans-serif; background: #fff; color: ${INK}; }
        a { text-decoration: none; color: inherit; }

        .b-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 56px; padding: 0 48px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.25s, border-color 0.25s;
          border-bottom: 1px solid transparent;
        }
        .b-nav.up {
          background: rgba(255,255,255,0.97);
          border-bottom-color: rgba(26,17,8,0.08);
          backdrop-filter: blur(12px);
        }

        .b-article p {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          line-height: 1.9;
          color: #2e200e;
          margin-bottom: 26px;
          font-weight: 300;
        }
        .b-article h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(21px, 2.4vw, 29px);
          font-weight: 400;
          color: ${INK};
          margin: 56px 0 18px;
          line-height: 1.25;
        }
        .b-article blockquote {
          padding: 4px 0 4px 22px;
          border-left: 2px solid ${GOLD};
          margin: 40px 0;
          font-family: 'Playfair Display', serif;
          font-size: 19px;
          font-style: italic;
          color: ${INK};
          line-height: 1.65;
        }
        .b-article blockquote cite {
          display: block;
          margin-top: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${GOLD};
          font-style: normal;
        }
        .b-article .def {
          border-left: 2px solid ${GOLD};
          padding: 20px 24px;
          margin: 36px 0;
          background: ${FAINT};
        }
        .b-article .def p {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-style: italic;
          color: ${INK};
          margin: 0;
          line-height: 1.7;
        }

        @media (max-width: 680px) {
          .b-nav { padding: 0 20px; }
          .b-header { padding: 100px 24px 52px !important; }
          .b-article { padding: 0 24px !important; }
          .b-stats { grid-template-columns: 1fr !important; }
          .b-footer { padding: 20px 24px !important; flex-direction: column !important; gap: 8px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`b-nav${scrolled ? " up" : ""}`}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: scrolled ? INK : "#fff", textTransform: "uppercase", transition: "color 0.25s" }}>
            Mykei Securities
          </span>
        </a>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="/economic-sterilisation" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: GOLD }}>
            Economic Sterilisation
          </a>
          <a href="/pilot" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: scrolled ? INK : "#fff", border: `1px solid ${GOLD}`, padding: "7px 14px", transition: "color 0.25s" }}>
            Join Pilot
          </a>
        </div>
      </nav>

      {/* HEADER, editorial, no color block */}
      <header className="b-header" style={{ maxWidth: 800, margin: "0 auto", padding: "108px 48px 56px" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD }}>
              The Mykei Brief
            </span>
            <span style={{ width: 32, height: 1, background: GOLD, opacity: 0.4, display: "block" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: MID, opacity: 0.6 }}>
              April 2026
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="b-headline" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,58px)", fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 28, letterSpacing: -0.5 }}>
            The $796 Billion Problem: Why Retailers Are Losing the War on Theft
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="b-standfirst" style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 300, lineHeight: 1.75, color: MID, marginBottom: 36 }}>
            Retail theft is not a crime problem. It is an economics problem.
            And every solution the industry has tried is fighting the wrong battle.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 24, borderTop: `1px solid rgba(26,17,8,0.1)` }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: FAINT, border: `1px solid rgba(201,168,76,0.3)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, fontWeight: 500 }}>ME</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>Michael Esema</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: MID, opacity: 0.6, marginTop: 2 }}>Founder, Mykei Securities</div>
            </div>
          </div>
        </Reveal>
      </header>

      {/* RULE */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ height: 1, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
      </div>

      {/* STATS ROW */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
        <Reveal delay={0.15}>
          <div className="b-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, margin: "48px 0" }}>
            {[
              { n: "$796B", l: "Annual global retail theft" },
              { n: "$9B", l: "Organised retail crime (US)" },
              { n: "5.8M", l: "UK shoplifting incidents" },
            ].map(({ n, l }, i) => (
              <div key={i} style={{ padding: "20px 24px", borderRight: i < 2 ? `1px solid rgba(26,17,8,0.08)` : "none" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 400, color: INK, lineHeight: 1, marginBottom: 6 }}>{n}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: 1.8, textTransform: "uppercase", color: MID, opacity: 0.7 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ARTICLE */}
      <article className="b-article" style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px 96px" }}>

        <Reveal>
          <p>
            Global retail theft costs $796 billion a year. In the US alone, organised retail
            crime accounts for $9 billion in preventable losses. These aren't amateur
            opportunists lifting things for personal use. These are coordinated networks
            running supply chains with buyers, logistics, and platforms. Estimates put global
            ORC losses past $150 billion annually by 2026.
          </p>
          <p>
            In the UK, retailers recorded around 5.8 million incidents of shop theft over
            the past year. Shoplifting is up 27% in the country's largest cities. Police are
            overwhelmed. Courts are backlogged. And retailers are absorbing the loss and
            calling it the cost of doing business.
          </p>
          <p>
            They're wrong. Not because the losses are acceptable, they're not. But because
            the loss isn't inevitable. It is what happens when you fight a commercial problem
            with physical responses.
          </p>
        </Reveal>

        <Reveal>
          <h2>The architecture of the crime</h2>
          <p>
            A teenager stealing a chocolate bar is a crime of impulse. Organised retail crime,
            which accounts for the bulk of commercial loss, is a <em>business</em>.
          </p>
          <p>
            Thieves who sweep shelves of razors, premium skincare, or consumer electronics
            have buyers waiting. They post on eBay, Vinted, and Facebook Marketplace within
            hours of a theft. The goods move fast because the market is ready. Secondary
            markets have been an open, low-risk exit for stolen merchandise for decades, and
            nobody in the security industry has seriously tried to close them.
          </p>
          <p>
            Stolen goods can also feed into illicit supply chains that cross borders, repackaged
            and sold wholesale to unknowing intermediaries. The theft is the visible part.
            The commercial infrastructure behind it is what actually drives the numbers.
          </p>
        </Reveal>

        <Reveal>
          <blockquote>
            Theft works because stolen goods hold value. Remove that value and the crime stops
            making sense. That's not a security problem. It's a commercial one.
            <cite>Michael Esema · Founder, Mykei Securities</cite>
          </blockquote>
        </Reveal>

        <Reveal>
          <h2>Why conventional security keeps losing</h2>
          <p>
            The UK retail security market spends billions on CCTV, EAS tags, security guards,
            and loss prevention teams. Theft is still up 27%. That is not a resource problem.
            It is a strategy problem.
          </p>
          <p>
            Every conventional approach targets the act of theft. CCTV records it. Security
            tags beep when goods leave the store. Guards intervene, at personal risk, to stop
            it physically. These share one flaw: they assume that making theft harder or more
            visible will make it rarer. It doesn't.
          </p>
          <p>
            When the secondary market is open and the resale economics are favourable,
            professional criminal networks adapt. They wear uniforms. They distract staff.
            They operate in teams. The reward is high enough to absorb the risk.
          </p>
          <p>
            The only response that changes anything is one that removes the reward.
          </p>
        </Reveal>

        <Reveal>
          <h2>The answer is Economic Sterilisation</h2>
          <p>
            Economic Sterilisation is a retail security doctrine I coined at Mykei Securities
            in 2025. The definition is precise by design:
          </p>
          <div className="def">
            <p>
              Economic Sterilisation: the systematic disruption of the resale incentive behind
              retail theft through forensic marking and registry event records, removing the
              commercial rationale for theft at the point it occurs.
            </p>
          </div>
          <p>
            Conventional security deters or detects. Economic Sterilisation removes the
            commercial outcome that makes theft worthwhile. A stolen item that is harder to
            sell anonymously has reduced theft value. When criminal networks learn that goods
            from a particular retailer carry batch-linked event records, that retailer becomes
            a less attractive target.
          </p>
          <p>
            This builds on the Market Reduction Approach (MRA) used by law enforcement,
            which focuses on disrupting markets that receive stolen goods. Economic
            Sterilisation applies that same logic proactively, automatically, and embedded
            into the physical shelf.
          </p>
        </Reveal>

        <Reveal>
          <h2>What the technology makes possible</h2>
          <p>
            The ADN is a prototype-stage implementation of Economic Sterilisation.
            It mounts under a retail shelf, detects bulk-sweep theft events using kinetic
            signature analysis (no cameras, no facial recognition, no biometric data),
            and triggers controlled marker deployment onto goods and the individual carrying them.
          </p>
          <p>
            Each deployment generates a unique cartridge batch code, recorded in the Mykei
            Registry with a timestamped, batch-linked event record. Stolen goods linked to
            a deployment event are harder to sell anonymously from the moment of contact.
          </p>
          <p>
            Forensic marking is not new. Proprietary Forensic Marking Compound has demonstrated up to 83% reductions
            in burglaries and theft in police projects. A recent operation saw 5,000 tagged
            items lead to 15 arrests and the recovery of £150,000 in stolen goods. Homebase
            cut stock loss by 20% using SmartWater. What the ADN adds is deployment designed to
            operate autonomously, designed registry integration, and delivery at retail shelf scale.
          </p>
        </Reveal>

        <Reveal>
          <h2>The shift has to be systemic</h2>
          <p>
            Word travels in criminal networks. When thieves discover that goods from a
            specific store can't be sold, that store comes off the list. Economic Sterilisation
            works backwards: the deterrence effect grows from the resale market outward,
            not from the shelf.
          </p>
          <p>
            Retailers have bought reactive security for decades. The growth in theft figures
            is the review.
          </p>
          <p>
            This problem is <strong>$796 billion a year</strong>. It doesn't have a physical solution.
          </p>
        </Reveal>

        {/* CONCLUSION */}
        <Reveal>
          <div style={{ marginTop: 48, padding: "28px 32px", background: FAINT, borderLeft: `3px solid ${GOLD}` }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key takeaways</div>
            <ul style={{ margin: 0, padding: "0 0 0 20px", listStyleType: "disc" }}>
              {[
                "Global retail theft costs $796 billion annually. Organised retail crime alone accounts for $9 billion in the US.",
                "Conventional security (CCTV, alarms, tags) addresses the theft event but leaves the resale market intact.",
                "Professional theft networks operate at scale because stolen goods have a commercial aftermarket.",
                "Forensic marking changes the commercial calculus: batch-linked goods are harder to sell anonymously, reducing the theft value.",
                "Proprietary Forensic Marking Compound trials showed up to 83% reductions in repeat theft at marked locations.",
                "The ADN automates deployment at the point of theft, without cameras, biometrics, or human intervention.",
              ].map(item => (
                <li key={item} style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, color: INK, lineHeight: 1.7, marginBottom: 8 }}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* CONTINUE READING */}
        <Reveal>
          <div style={{ marginTop: 72, paddingTop: 48, borderTop: `1px solid rgba(26,17,8,0.1)` }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 28 }}>
              Continue reading
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <a href="/blog/beyond-the-buzzer" style={{ padding: "24px", border: `1px solid rgba(26,17,8,0.1)`, display: "block", transition: "border-color 0.2s" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Next</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: INK, lineHeight: 1.4 }}>Beyond the Buzzer: How Forensic Marking is Shrinking the Secondary Market for Stolen Goods</div>
              </a>
              <a href="/economic-sterilisation" style={{ padding: "24px", border: `1px solid rgba(26,17,8,0.1)`, display: "block" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Definition</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: INK, lineHeight: 1.4 }}>Economic Sterilisation: The Full Doctrine</div>
              </a>
            </div>
          </div>
        </Reveal>

        {/* PILOT CTA, inline, not a full-bleed block */}
        <Reveal>
          <div style={{ marginTop: 48, padding: "36px 32px", background: FAINT, borderLeft: `3px solid ${GOLD}` }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Independent Retail Pilot · 2026 · Greater Manchester</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: INK, lineHeight: 1.5, marginBottom: 20, fontWeight: 400 }}>
              Independent Retail Pilot. Retail validation route for Economic Sterilisation.
            </p>
            <a href="/pilot" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", background: INK, padding: "11px 24px", display: "inline-block" }}>
              Join the Pilot
            </a>
          </div>
        </Reveal>

      </article>

      {/* FOOTER */}
      <footer className="b-footer" style={{ borderTop: `1px solid rgba(26,17,8,0.08)`, padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: MID, opacity: 0.6 }}>
          Mykei Securities Ltd · Co. 16984969
        </a>
        <a href="/economic-sterilisation" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: GOLD }}>
          Read Economic Sterilisation
        </a>
      </footer>
    </>
  );
}
