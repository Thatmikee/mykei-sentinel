import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BlogPostMeta } from "@/data/blogPosts";

const DARK = "#1E1E1E";
const GOLD = "#0D9488";
const CREAM = "#F8F3ED";
const MUTED = "#8A7560";

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

interface BlogPostLayoutProps {
  meta: BlogPostMeta;
  children: React.ReactNode;
}

export default function BlogPostLayout({ meta, children }: BlogPostLayoutProps) {
  const canonicalUrl = `https://mykei.io/signal/${meta.slug}`;
  const pageTitle = `${meta.title} | The Signal | Mykei Securities`;
  const ogImage = `https://mykei.io/social-share.png`;

  useEffect(() => {
    document.querySelectorAll('meta[name="description"]').forEach((node) => {
      node.setAttribute("content", meta.summary);
    });
    document.querySelectorAll('link[rel="canonical"]').forEach((node) => {
      node.setAttribute("href", canonicalUrl);
    });
    document.querySelectorAll('meta[property="og:url"]').forEach((node) => {
      node.setAttribute("content", canonicalUrl);
    });
    document.querySelectorAll('meta[property="og:title"]').forEach((node) => {
      node.setAttribute("content", pageTitle);
    });
    document.querySelectorAll('meta[property="og:description"]').forEach((node) => {
      node.setAttribute("content", meta.summary);
    });
  }, [canonicalUrl, meta.summary, pageTitle]);

  const ldJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": meta.title,
    "datePublished": meta.date,
    "dateModified": meta.date,
    "author": {
      "@type": "Person",
      "@id": "https://michaelesema.com/#person",
      "name": "Michael Esema",
      "url": "https://michaelesema.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mykei Securities Ltd",
      "url": "https://mykei.io",
    },
    "description": meta.summary,
    "url": canonicalUrl,
    "keywords": meta.tags.join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  });

  return (
    <div style={{ backgroundColor: CREAM, minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: DARK }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={meta.summary} />
        <meta name="keywords" content={meta.tags.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={meta.summary} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={meta.date} />
        <meta property="article:author" content="Michael Esema" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={meta.summary} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{ldJson}</script>
      </Helmet>

      {/* Fixed top nav */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#FFFFFF",
        borderBottom: `1px solid rgba(200,169,110,0.2)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "56px",
      }}>
        <a
          href="/"
          style={{
            color: GOLD,
            textDecoration: "none",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "17px",
            fontWeight: 600,
            letterSpacing: "0.01em",
          }}
        >
          Mykei Securities
        </a>
        <span style={{
          color: MUTED,
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          The Signal
        </span>
      </nav>

      {/* Article header */}
      <header style={{
        paddingTop: "112px",
        paddingBottom: "48px",
        paddingLeft: "24px",
        paddingRight: "24px",
        maxWidth: "720px",
        margin: "0 auto",
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "16px",
        }}>
          The Signal
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: 700,
          lineHeight: 1.2,
          color: DARK,
          marginBottom: "24px",
          letterSpacing: "-0.01em",
        }}>
          {meta.title}
        </h1>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "16px",
          marginBottom: "20px",
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: "12px",
          color: MUTED,
        }}>
          <span>By Michael Esema</span>
          <span style={{ color: "rgba(28,18,10,0.2)" }}>|</span>
          <span>{formatDate(meta.date)}</span>
          <span style={{ color: "rgba(28,18,10,0.2)" }}>|</span>
          <span>{meta.readingTime}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {meta.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: GOLD,
              backgroundColor: "rgba(200,169,110,0.1)",
              border: `1px solid rgba(200,169,110,0.3)`,
              borderRadius: "3px",
              padding: "3px 8px",
            }}>
              {tag}
            </span>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: `1px solid rgba(28,18,10,0.12)` }} />
      </header>

      {/* Article content */}
      <main style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "0 24px 64px",
        fontSize: "17px",
        lineHeight: 1.85,
        color: DARK,
      }}>
        {children}
      </main>

      {/* CTA banner */}
      <section style={{
        backgroundColor: "#FFFFFF",
        padding: "56px 24px",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "16px",
        }}>
          Research Updates
        </p>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "24px",
          fontWeight: 600,
          color: "#1E1E1E",
          marginBottom: "28px",
          lineHeight: 1.35,
        }}>
          Mykei publishes its findings through The Signal as the ADN development programme continues.
        </p>
        <a
          href="/signal"
          style={{
            display: "inline-block",
            backgroundColor: GOLD,
            color: DARK,
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "14px 32px",
            borderRadius: "3px",
          }}
        >
          Follow the Research
        </a>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#FFFFFF",
        padding: "24px",
        textAlign: "center",
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: "11px",
        color: MUTED,
        letterSpacing: "0.06em",
      }}>
        &copy; {new Date().getFullYear()} Mykei Securities Ltd. All rights reserved.
      </footer>
    </div>
  );
}
