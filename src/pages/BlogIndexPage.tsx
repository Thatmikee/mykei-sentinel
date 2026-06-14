import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

const GOLD = "#C9A84C";
const INK = "#1E1E1E";
const PAPER = "#FAFAF8";
const MUTED = "#6B6B65";
const RULE = "#E8E8E4";

const POSTS = [
  {
    slug: "/blog/the-796-billion-problem",
    date: "April 2026",
    title: "The $796 Billion Problem: Why Retailers Are Losing the War on Theft",
    standfirst: "Retail theft is not a crime problem. It is an economics problem. And every solution the industry has tried is fighting the wrong battle.",
    keyword: "retail theft economics",
  },
  {
    slug: "/blog/beyond-the-buzzer",
    date: "April 2026",
    title: "Beyond the Buzzer: How Forensic Marking is Shrinking the Secondary Market for Stolen Goods",
    standfirst: "The EAS tag and the security buzzer have been the frontline of retail theft prevention for forty years. They have failed. Here is what works instead.",
    keyword: "forensic marking retail",
  },
];

export default function BlogIndexPage() {
  return (
    <>
      <PageSEO
        title="The Mykei Brief — Retail Theft Economics & Forensic Security | Mykei Securities"
        description="Analysis on retail theft economics, forensic security, and the case for Economic Sterilisation. Research-backed articles for independent retailers, accountants, lawyers, startups, enterprise teams, and policy-makers."
        canonical="https://mykei.io/blog"
        keywords="retail theft economics, forensic retail security, economic sterilisation research, organised retail crime analysis, Mykei Securities blog, retail theft for small businesses, shoplifting for accountants, retail crime for lawyers, economic sterilisation for startups, retail security for enterprise, theft prevention for retailers, UK retail crime 2026"
        ogImageAlt="The Mykei Brief — analysis on retail theft and forensic security"
        breadcrumbs={[["Home","https://mykei.io"],["Blog","/blog"]]}
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": "https://mykei.io/blog",
          "name": "The Mykei Brief",
          "description": "Analysis on retail theft economics, forensic security, and the Economic Sterilisation doctrine.",
          "url": "https://mykei.io/blog",
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" },
          "blogPost": POSTS.map(p => ({
            "@type": "BlogPosting",
            "headline": p.title,
            "description": p.standfirst,
            "url": `https://mykei.io${p.slug}`,
            "author": { "@type": "Person", "name": "Michael Esema" },
            "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd" },
            "keywords": p.keyword,
          }))
        })}
      />
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 56, padding: "0 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(250,250,248,1)",
        borderBottom: `1px solid ${RULE}`,
      }}>
        <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: INK, textDecoration: "none" }}>
          Mykei Securities
        </a>
        <a href="/adn-1" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}`, padding: "7px 14px", textDecoration: "none" }}>
          ADN
        </a>
      </nav>

      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 80 }}>
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 48px 64px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>
            The Mykei Brief
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 400, lineHeight: 1.1, color: INK }}>
            Analysis on retail theft economics and forensic security.
          </h1>
        </section>

        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px 96px" }}>
          {POSTS.map((post, i) => (
            <a
              key={post.slug}
              href={post.slug}
              style={{
                display: "block",
                padding: "48px 0",
                borderBottom: `1px solid ${RULE}`,
                textDecoration: "none",
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>
                {post.date}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 400, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
                {post.title}
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, maxWidth: 600, marginBottom: 20 }}>
                {post.standfirst}
              </p>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}>
                Read
              </span>
            </a>
          ))}
        </section>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&family=JetBrains+Mono:wght@400;500&display=swap');
        *:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        @media (max-width: 640px) {
          nav { padding: 0 20px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
