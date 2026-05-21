#!/usr/bin/env node
/**
 * Signal article generator
 * Usage: node scripts/new-signal-article.mjs
 */

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

function toComponentName(slug) {
  return "Signal" + slug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("") + "Page";
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

async function main() {
  console.log("\n📰  Signal Article Generator\n");

  const slug        = (await ask("Slug (e.g. shoplifting-surges-q1-2026): ")).trim();
  const issue       = (await ask("Issue number (e.g. 17): ")).trim();
  const title       = (await ask("Title: ")).trim();
  const standfirst  = (await ask("Standfirst (one sentence for index): ")).trim();
  const readTime    = (await ask("Read time (e.g. 4 min): ")).trim() || "4 min";
  const author      = (await ask("Author [Michael Esema]: ")).trim() || "Michael Esema";
  const date        = (await ask(`Date [${todayISO()}]: `)).trim() || todayISO();
  const tags        = (await ask("Tags (comma separated, e.g. Retail Theft,UK): ")).trim();
  rl.close();

  const componentName = toComponentName(slug);
  const tagArray = tags.split(",").map(t => `"${t.trim()}"`).join(", ");

  // ── 1. TSX page ──────────────────────────────────────────────────────────
  const tsx = `import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";

const SLUG = "${slug}";
const TITLE = "${title}";
const STANDFIRST = "${standfirst}";
const DATE = "${date}";
const AUTHOR = "${author}";

export default function ${componentName}() {
  return (
    <>
      <PageSEO
        title={\`\${TITLE} | Mykei Signal\`}
        description={STANDFIRST}
        canonical={\`https://mykei.io/signal/\${SLUG}\`}
        ogType="article"
        ogImage={\`https://mykei.io/og/signal-\${SLUG}.png\`}
        ldJson={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": TITLE,
          "datePublished": DATE,
          "author": { "@type": "Person", "name": AUTHOR },
          "publisher": {
            "@type": "Organization",
            "name": "Mykei Securities Ltd",
            "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" }
          },
          "description": STANDFIRST,
          "mentions": [
            // Add organisations / people referenced in the article
            // { "@type": "Organization", "name": "British Retail Consortium" }
          ]
        }}
      />

      <style>{\`
        .sig-page { background: #F9F8F6; min-height: 100vh; font-family: 'Inter', sans-serif; color: #1E1E1E; }
        .sig-nav { position: sticky; top: 0; z-index: 50; background: #FFFFFF; border-bottom: 1px solid #E0DED9; padding: 0 52px; height: 60px; display: flex; align-items: center; justify-content: space-between; }
        .sig-nav-brand { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: #1E1E1E; text-decoration: none; }
        .sig-nav-back { font-size: 12px; color: #8a7a5a; text-decoration: none; }
        .sig-hero { background: #FFFFFF; border-bottom: 1px solid #E0DED9; padding: 64px 52px 52px; max-width: 860px; margin: 0 auto; }
        .sig-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #8a7a5a; margin-bottom: 16px; display: block; }
        .sig-h1 { font-family: 'Playfair Display', serif; font-size: clamp(26px, 4vw, 42px); font-weight: 700; line-height: 1.2; color: #1E1E1E; margin: 0 0 18px; }
        .sig-standfirst { font-size: 18px; line-height: 1.7; color: #555; margin: 0 0 28px; max-width: 680px; }
        .sig-meta { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #aaa; letter-spacing: 0.08em; }
        .sig-body { max-width: 860px; margin: 0 auto; padding: 52px; }
        .sig-body p { font-size: 17px; line-height: 1.75; color: #333; margin: 0 0 24px; }
        .sig-body h2 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #1E1E1E; margin: 40px 0 16px; }
        .sig-body h3 { font-size: 16px; font-weight: 700; color: #1E1E1E; margin: 32px 0 12px; }
        .sig-body ul { margin: 0 0 24px 0; padding-left: 24px; }
        .sig-body li { font-size: 16px; line-height: 1.7; color: #333; margin-bottom: 8px; }
        .sig-body blockquote { border-left: 3px solid #D4AF37; margin: 32px 0; padding: 16px 24px; background: #F2EFE8; font-style: italic; color: #555; font-size: 17px; line-height: 1.7; }
        .sig-stat { background: #FFFFFF; border: 1px solid #E0DED9; border-left: 3px solid #D4AF37; border-radius: 8px; padding: 24px 28px; margin: 32px 0; }
        .sig-stat-num { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: #D4AF37; line-height: 1; margin-bottom: 6px; }
        .sig-stat-label { font-size: 14px; color: #666; }
        .sig-takeaways { background: #FFFFFF; border: 1px solid #E0DED9; border-radius: 8px; padding: 28px 32px; margin: 40px 0; }
        .sig-takeaways h3 { font-size: 11px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #8a7a5a; margin: 0 0 16px; }
        .sig-takeaways ul { margin: 0; padding-left: 20px; }
        .sig-takeaways li { font-size: 15px; line-height: 1.6; color: #333; margin-bottom: 10px; }
        .sig-pilot-cta { background: #F2EFE8; border-top: 2px solid #D4AF37; padding: 40px 52px; text-align: center; }
        .sig-pilot-cta h3 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #1E1E1E; margin: 0 0 10px; }
        .sig-pilot-cta p { font-size: 15px; color: #666; margin: 0 0 24px; }
        .sig-btn { display: inline-block; background: #D4AF37; color: #1E1E1E; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 13px 28px; border-radius: 8px; text-decoration: none; }
        .sig-btn:hover { background: #c9a030; }
        .sig-author { max-width: 860px; margin: 0 auto; padding: 0 52px 52px; }
        .sig-author-inner { display: flex; gap: 20px; align-items: flex-start; padding: 24px; background: #FFFFFF; border: 1px solid #E0DED9; border-radius: 8px; }
        .sig-author-name { font-size: 14px; font-weight: 700; color: #1E1E1E; margin: 0 0 4px; }
        .sig-author-role { font-size: 12px; color: #888; }
        @media (max-width: 640px) {
          .sig-nav { padding: 0 20px; }
          .sig-hero { padding: 48px 20px 40px; }
          .sig-body { padding: 40px 20px; }
          .sig-pilot-cta { padding: 32px 20px; }
          .sig-author { padding: 0 20px 40px; }
        }
      \`}</style>

      <div className="sig-page">
        {/* NAV */}
        <nav className="sig-nav">
          <a href="/" className="sig-nav-brand">Mykei Securities Ltd</a>
          <a href="/signal" className="sig-nav-back">Signal index</a>
        </nav>

        {/* HERO */}
        <div style={{ background: "#F9F8F6" }}>
          <div className="sig-hero">
            <span className="sig-eyebrow">Signal · Issue {/* ISSUE NUMBER */} ${issue} · {date}</span>
            <h1 className="sig-h1">{TITLE}</h1>
            <p className="sig-standfirst">{STANDFIRST}</p>
            <div className="sig-meta">{AUTHOR} · ${readTime} read · {DATE}</div>
          </div>
        </div>

        {/* BODY */}
        <div className="sig-body">

          {/* ── WRITE YOUR ARTICLE BELOW ─────────────────────────────── */}

          <p>
            Opening paragraph. Set the scene with a specific data point or incident.
          </p>

          <h2>Section heading</h2>

          <p>
            Body paragraph. Use short sentences. Data-backed. No filler.
          </p>

          {/* Stat callout example */}
          <div className="sig-stat">
            <div className="sig-stat-num">£X.Xbn</div>
            <div className="sig-stat-label">Description of what this number means</div>
          </div>

          <h2>Another section</h2>

          <p>Continue the argument.</p>

          <blockquote>
            Pull quote or key statement that anchors the piece.
          </blockquote>

          <p>Closing paragraph. Land the insight.</p>

          {/* ── KEY TAKEAWAYS (required — place before pilot CTA) ──── */}
          <div className="sig-takeaways">
            <h3>Key Takeaways</h3>
            <ul>
              <li>Takeaway one — specific and data-backed.</li>
              <li>Takeaway two — implication for retailers.</li>
              <li>Takeaway three — what changes if Mykei is deployed.</li>
            </ul>
          </div>

        </div>

        {/* PILOT CTA */}
        <div className="sig-pilot-cta">
          <h3>The Manchester Alpha Pilot is open.</h3>
          <p>5 retail partners. Q2 2026. Subscription-based. No staff training required.</p>
          <a href="/pilot" className="sig-btn">Apply for Alpha Pilot</a>
        </div>

        {/* SHARE BAR */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 52px 0" }}>
          <SignalShareBar
            url={\`https://mykei.io/signal/\${SLUG}\`}
            title={TITLE}
            description={STANDFIRST}
            hashtags={["RetailTheft", "MykeiSecurities", "ForensicSecurity"]}
          />
        </div>

        {/* AUTHOR */}
        <div className="sig-author">
          <div className="sig-author-inner">
            <div>
              <p className="sig-author-name">{AUTHOR}</p>
              <p className="sig-author-role">
                {AUTHOR === "Michael Esema"
                  ? "Founder, Mykei Securities Ltd · Originator of Economic Sterilisation"
                  : "Contributor, Mykei Signal"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
`;

  // ── 2. blogPosts.ts — prepend entry ──────────────────────────────────────
  const bpPath = path.join(ROOT, "src/data/blogPosts.ts");
  const bpContent = fs.readFileSync(bpPath, "utf8");
  const newEntry = `  {
    slug: "${slug}",
    title: "${title}",
    standfirst: "${standfirst}",
    date: "${date}",
    readTime: "${readTime}",
    issue: "${issue}",
    author: "${author}",
    tags: [${tagArray}],
  },\n`;
  const insertAt = bpContent.indexOf("[\n") + 2;
  const updatedBP = bpContent.slice(0, insertAt) + newEntry + bpContent.slice(insertAt);

  // ── 3. App.tsx — insert import + route ───────────────────────────────────
  const appPath = path.join(ROOT, "src/App.tsx");
  let appContent = fs.readFileSync(appPath, "utf8");

  const importLine = `const ${componentName}             = lazy(() => import("./pages/${componentName}"));\n`;
  const importMarker = "const NewsletterArchive";
  appContent = appContent.replace(importMarker, importLine + importMarker);

  const routeLine = `            <Route path="/signal/${slug}" element={<${componentName} />} />\n`;
  const routeMarker = `            <Route path="/signal/:slug"`;
  appContent = appContent.replace(routeMarker, routeLine + routeMarker);

  // ── 4. sitemap.xml — append before </urlset> ─────────────────────────────
  const sitemapPath = path.join(ROOT, "public/sitemap.xml");
  let sitemapContent = fs.readFileSync(sitemapPath, "utf8");
  const sitemapEntry = `  <url>
    <loc>https://mykei.io/signal/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  sitemapContent = sitemapContent.replace("</urlset>", sitemapEntry + "</urlset>");

  // ── Write all files ───────────────────────────────────────────────────────
  const tsxPath = path.join(ROOT, "src/pages", `${componentName}.tsx`);
  fs.writeFileSync(tsxPath, tsx);
  fs.writeFileSync(bpPath, updatedBP);
  fs.writeFileSync(appPath, appContent);
  fs.writeFileSync(sitemapPath, sitemapContent);

  console.log(`\n Done. Files written:\n`);
  console.log(`  src/pages/${componentName}.tsx   ← write your article here`);
  console.log(`  src/data/blogPosts.ts            ← entry added at top`);
  console.log(`  src/App.tsx                      ← route wired`);
  console.log(`  public/sitemap.xml               ← URL added`);
  console.log(`\n Next steps:`);
  console.log(`  1. Open src/pages/${componentName}.tsx and write the article body`);
  console.log(`  2. npm run build   (verify it compiles)`);
  console.log(`  3. git add -A && git commit -m "feat: signal issue ${issue} — ${slug}" && git push`);
  console.log(`\n  Article will be live at: https://mykei.io/signal/${slug}\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
