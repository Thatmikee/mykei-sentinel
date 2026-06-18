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

const GOLD = "#0D9488";
const INK = "#1E1E1E";
const MID = "#5c4a32";
const FAINT = "#f5f1eb";

const EVIDENCE = [
  {
    label: "Proprietary Forensic Marking Compound · Police Operation",
    stat: "83%",
    statSub: "reduction in burglaries and theft",
    detail: "5,000 items tagged. 15 arrests. £150,000 in stolen goods recovered. Forensic link to suspect. Evidence used in prosecution.",
  },
  {
    label: "SmartWater · Homebase",
    stat: "20%",
    statSub: "reduction in stock loss",
    detail: "Goods traced to retail location. Thieves shifted to unmarked competitors. Deterrence through traceability.",
  },
];

export default function BlogBeyondBuzzerPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "Beyond the Buzzer: How Forensic Marking is Shrinking the Secondary Market for Stolen Goods | Mykei Securities";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Proprietary Forensic Marking Compound reduced theft by 83% in police projects. SmartWater helped Homebase cut stock loss by 20%. The ADN is designed to go further: autonomous deployment, registry-linked event records, and Economic Sterilisation at scale. Patent-pending R&D; field validation not yet begun.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://mykei.io/blog/beyond-the-buzzer");

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Beyond the Buzzer: How Forensic Marking is Shrinking the Secondary Market for Stolen Goods",
        "description": "Proprietary Forensic Marking Compound reduced theft by 83% in police projects. SmartWater helped Homebase cut stock loss by 20%. The ADN is designed to go further: autonomous deployment, registry-linked event records, and Economic Sterilisation at scale. Patent-pending R&D; field validation not yet begun.",
        "author": { "@type": "Person", "name": "Michael Esema", "url": "https://michaelesema.com" },
        "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" },
        "datePublished": "2026-04-10",
        "url": "https://mykei.io/blog/beyond-the-buzzer",
        "mainEntityOfPage": "https://mykei.io/blog/beyond-the-buzzer",
        "keywords": ["forensic marking retail", "Proprietary Forensic Marking Compound", "SmartWater", "Economic Sterilisation", "ADN", "retail theft deterrence"],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://mykei.io/blog/beyond-the-buzzer",
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
        title="Beyond the Buzzer: How Forensic Marking is Shrinking the Stolen Goods Market | Mykei Securities"
        description="Proprietary Forensic Marking Compound reduced theft by 83% in police operations. SmartWater cut Homebase stock loss by 20%. The ADN is designed to go further: autonomous deployment, registry-linked event records, and Economic Sterilisation at scale. Patent-pending R&D; field validation not yet begun."
        canonical="https://mykei.io/blog/beyond-the-buzzer"
        ogType="article"
        keywords="forensic marking retail, Proprietary Forensic Marking Compound retail, SmartWater retail, economic sterilisation, batch-identifiable marker retail security, retail theft for independent retailers, forensic marking for small businesses, shoplifting deterrent for accountants, theft prevention for enterprise"
        ogImageAlt="Beyond the Buzzer — how forensic marking is shrinking the stolen goods market"
        articleMeta={{ publishedTime: "2026-04-10T00:00:00Z", author: "Michael Esema", section: "Retail Security", tags: ["Forensic Marking","Proprietary Forensic Marking Compound","Economic Sterilisation","ADN","Retail Theft"] }}
        breadcrumbs={[["Home","https://mykei.io"],["Blog","/blog"],["Beyond the Buzzer",""]]}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
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
          .b-evidence { grid-template-columns: 1fr !important; }
          .b-footer { padding: 20px 24px !important; flex-direction: column !important; gap: 8px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`b-nav${scrolled ? " up" : ""}`}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: 1.5, color: scrolled ? INK : INK, textTransform: "uppercase" }}>
            Mykei Securities
          </span>
        </a>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="/economic-sterilisation" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: GOLD }}>
            Economic Sterilisation
          </a>
          <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: INK, border: `1px solid ${GOLD}`, padding: "7px 14px" }}>
            Follow the Research
          </a>
        </div>
      </nav>

      {/* HEADER */}
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
          <h1 className="b-headline" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,4.8vw,54px)", fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 28, letterSpacing: -0.5 }}>
            Beyond the Buzzer: How Forensic Marking is Shrinking the Secondary Market for Stolen Goods
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="b-standfirst" style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 300, lineHeight: 1.75, color: MID, marginBottom: 36 }}>
            The EAS tag and the security buzzer have been the frontline of retail theft prevention
            for forty years. They have failed. Here is what works instead, and how the ADN is designed to take it further.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 24, borderTop: `1px solid rgba(26,17,8,0.1)` }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: FAINT, border: `1px solid rgba(13,148,136,0.3)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
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

      {/* ARTICLE */}
      <article className="b-article" style={{ maxWidth: 800, margin: "0 auto", padding: "56px 48px 96px" }}>

        <Reveal>
          <p>
            The electronic article surveillance tag was invented in the 1960s. Embed a
            transponder in the product, trigger an alarm at the exit. Most major UK and US
            retailers still use some variant of it as their primary theft deterrent. The
            technology has barely changed in sixty years.
          </p>
          <p>
            The result: $796 billion in annual retail theft losses globally. Shoplifting in
            the UK up 27% year-on-year. Professional criminal teams defeat EAS systems with
            foil-lined bags, magnetic detachers, or simply by moving faster than any staff
            member is willing, or safe, to intercept.
          </p>
          <p>
            The buzzer is not a deterrent. It is the industry's way of not asking a harder
            question.
          </p>
        </Reveal>

        <Reveal>
          <h2>The question is not "can we catch them?" but "can we break the resale confidence?"</h2>
          <p>
            Forensic marking technology has been answering that second question for over two
            decades. The evidence is solid and largely ignored by mainstream retail
            security strategy.
          </p>
          <p>
            Proprietary Forensic Marking Compound, used by UK police forces, has shown up to 83% reductions in
            burglaries and theft in specific operation areas. In one documented operation,
            5,000 items were tagged. That led to 15 arrests and the recovery of £150,000 in
            stolen goods. The markers gave police a forensic link between goods, location,
            and suspect. Admissible evidence, no camera required.
          </p>
          <p>
            Homebase cut stock loss by 20% after implementing SmartWater, another forensic
            chemical marking solution. Goods marked with SmartWater could be traced to a
            specific retail location. When thieves found out, they shifted to unmarked targets.
          </p>
        </Reveal>

        {/* Evidence cards, restrained, no color blocking */}
        <Reveal delay={0.05}>
          <div className="b-evidence" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "40px 0" }}>
            {EVIDENCE.map(({ label, stat, statSub, detail }) => (
              <div key={label} style={{ padding: "24px", border: `1px solid rgba(26,17,8,0.1)` }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: 1.8, textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>{label}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 400, color: INK, lineHeight: 1, marginBottom: 4 }}>{stat}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: MID, marginBottom: 14 }}>{statSub}</div>
                <p style={{ fontSize: 13, color: MID, lineHeight: 1.7, margin: 0 }}>{detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2>Why the evidence has not changed the industry</h2>
          <p>
            Proprietary Forensic Marking Compound and SmartWater both work. They remain on the periphery of retail
            security procurement. There are three reasons.
          </p>
          <p>
            Passive marking requires manual application. Applying a forensic solution to
            every item in a fast-moving retail environment is operationally impractical at
            scale. The labour cost defeats the purpose.
          </p>
          <p>
            The secondary market connection is not closed. Even when goods are marked, the
            link between "this item is marked" and "this item cannot be sold online" has
            historically required a human step: a crime report, a police investigation, a
            marketplace takedown. By the time that chain resolves, the goods are gone.
          </p>
          <p>
            The deterrence signal is not strong enough. Forensic marking only works as a
            deterrent when thieves know goods are marked and believe consequences will follow.
            Without visible consequences in the resale market, professional criminal networks
            adapt slowly if at all.
          </p>
          <p>
            The ADN was designed to close each of those gaps.
          </p>
        </Reveal>

        <Reveal>
          <h2>How the ADN is designed to take forensic marking further</h2>
          <p>
            The ADN is a shelf-mounted autonomous device. It triggers controlled marker deployment
            with no staff involvement, no manual labelling, no per-item application. When its
            dual Time-of-Flight sensors detect a bulk-sweep event, classified by kinetic
            signature analysis in under 50ms, the device releases a batch-identifiable marker
            onto goods, packaging, and the individual carrying them.
          </p>
          <p>
            Each deployment carries a unique cartridge batch code, generated at the moment of
            the event. Subject to marker supplier specification, SDS/COSHH review, and deployment
            environment review.
          </p>
          <p>
            That batch code registers immediately in the Mykei Registry, creating a
            cartridge-linked event record. Stolen goods linked to a deployment event are
            harder to sell anonymously. The resale incentive is disrupted.
          </p>
        </Reveal>

        <Reveal>
          <div className="def">
            <p>
              Proprietary Forensic Marking Compound and SmartWater proved the principle: forensic marking changes criminal
              behaviour. The ADN is designed to automate the deployment and close the secondary market loop,
              and turns individual store-level deterrence into a doctrine. That doctrine is
              Economic Sterilisation.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2>The Market Reduction Approach, and how TESS scales it</h2>
          <p>
            The Market Reduction Approach (MRA) is an evidence-based strategy from academic
            criminology, adopted by UK policing. The premise: the most effective way to reduce
            theft is to reduce the market that receives stolen goods. No market, no incentive.
          </p>
          <p>
            MRA has historically been applied after theft occurs, through sting operations,
            marketplace monitoring, and arrest of receivers. It works. But it is slow and
            operates in the aftermath of loss.
          </p>
          <p>
            The Theft Economic Sterilisation System (TESS), implemented through the ADN,
            applies MRA logic proactively. The ADN is designed not to wait for a theft to be reported.
            It is intended to act at the moment of the event. A cartridge-linked event record is designed to be created in
            the Mykei Registry before the thief has left the building.
          </p>
          <p>
            Conventional forensic marking gathers evidence. Economic Sterilisation removes
            the reward.
          </p>
        </Reveal>

        <Reveal>
          <h2>The secondary market is the target</h2>
          <p>
            Research on organised retail crime consistently finds that the overwhelming
            majority of stolen goods end up listed online. eBay, Vinted, and Facebook
            Marketplace function as the exit infrastructure for organised retail crime.
            Most security strategies do not touch that infrastructure at all.
          </p>
          <p>
            The ADN and the Mykei Registry are designed to make that market harder to operate,
            store by store, category by category. When the economics of retail theft stop
            working, the theft stops too.
          </p>
          <p>
            The buzzer had forty years. This is what comes next.
          </p>
        </Reveal>

        {/* KEY TAKEAWAYS */}
        <Reveal>
          <div style={{ marginTop: 48, padding: "28px 32px", background: FAINT, borderLeft: `3px solid ${GOLD}` }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key takeaways</div>
            <ul style={{ margin: 0, padding: "0 0 0 20px", listStyleType: "disc" }}>
              {[
                "EAS tags and security buzzers address the theft event but leave the resale market untouched.",
                "Proprietary Forensic Marking Compound reduced burglaries and theft by 83% in police-run programmes. SmartWater cut Homebase stock loss by 20%.",
                "Batch-identifiable markers are designed to support evidential workflows and link goods directly to retail origin.",
                "Conventional forensic marking requires manual deployment. The ADN is designed to deploy automatically, with a detection-to-response design target of under 50ms.",
                "The Mykei Registry creates a cartridge-linked event record that supports verification and investigation workflows.",
                "Economic Sterilisation removes the commercial reward for theft rather than hardening the target against it.",
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
              <a href="/blog/the-796-billion-problem" style={{ padding: "24px", border: `1px solid rgba(26,17,8,0.1)`, display: "block" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Previous</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: INK, lineHeight: 1.4 }}>The $796 Billion Problem: Why Retailers Are Losing the War on Theft</div>
              </a>
              <a href="/adn" style={{ padding: "24px", border: `1px solid rgba(26,17,8,0.1)`, display: "block" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Technical specs</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: INK, lineHeight: 1.4 }}>ADN Active Forensic Defence Node: Technical Overview</div>
              </a>
            </div>
          </div>
        </Reveal>

        {/* PILOT CTA */}
        <Reveal>
          <div style={{ marginTop: 48, padding: "36px 32px", background: FAINT, borderLeft: `3px solid ${GOLD}` }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Research Updates · Mykei Securities</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: INK, lineHeight: 1.5, marginBottom: 20, fontWeight: 400 }}>
              ADN is patent-pending R&D. Field validation has not yet begun. Follow the research to stay informed.
            </p>
            <a href="/signal" style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", background: INK, padding: "11px 24px", display: "inline-block" }}>
              Follow the Research
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
