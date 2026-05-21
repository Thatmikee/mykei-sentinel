// scripts/generate-og-images.js
// Generates 1200x630 newspaper-style OG images for each Signal article
// Run: node scripts/generate-og-images.js

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ARTICLES = [
  {
    slug: 'cctv-313-million-movie-ticket',
    issue: '01',
    headline: 'CCTV is a £313 Million Movie Ticket for a Crime You Already Lost',
    standfirst: 'UK retailers spent £313m on security in 2025 and suffered 5.8 million thefts. The camera records the crime. It does not stop it.',
    tag: 'Retail Security',
  },
  {
    slug: 'salford-to-vinted-black-market',
    issue: '02',
    headline: 'The Black Market Grocery Store',
    standfirst: 'Organised crime groups systematically target stores for online resale. The Toxic Inventory Registry poisons that pipeline before it starts.',
    tag: 'Organised Crime',
  },
  {
    slug: 'surgeon-not-camera-200ms',
    issue: '03',
    headline: 'A Surgeon, Not a Camera: The 200 Millisecond Rule',
    standfirst: 'The ADN-1 responds in under 200ms. CCTV records a crime after it happens. There is no comparison worth making.',
    tag: 'Technology',
  },
  {
    slug: 'shopkeeper-maths-adn1-cost',
    issue: '04',
    headline: 'The Maths: Built for the Shopkeeper\'s Cash Position',
    standfirst: '£40 a month. £149 setup. Here is the full calculation, built for a retailer with no budget for security theatre.',
    tag: 'Economics',
  },
  {
    slug: 'david-robinson-gmb-cctv-theatre',
    issue: '11',
    headline: 'David Robinson Was Right on GMB. Here Is What Comes Next.',
    standfirst: 'The GMB segment showed 20 million thefts on camera, none of them stopped. Mykei built the answer.',
    tag: 'Media',
  },
  {
    slug: 'fog-security-systems-debunked',
    issue: '12',
    headline: 'Fog Security Systems Are CCTV Theatre With Smoke',
    standfirst: 'Fog machines obscure the thief for 20 seconds. The stock is still gone. Obscuring a crime is not the same as stopping it.',
    tag: 'Security Systems',
  },
  {
    slug: 'safergems-jewellery-theft-ai-police-response',
    issue: '13',
    headline: '10 Armed Robberies in Q1 2026. AI Policing Won\'t Be Ready Until 2030.',
    standfirst: 'Jewellery theft is accelerating. The institutional response is four years away. Forensic marking works now.',
    tag: 'Jewellery Theft',
  },
  {
    slug: 'police-200-pound-threshold',
    issue: '14',
    headline: 'Police Won\'t Come for £30 of Stolen Stock. That Is Not an Accident.',
    standfirst: 'Forces routinely deprioritise incidents below £200. Below that line, the economics of the justice system do not work for retailers.',
    tag: 'Policy',
  },
  {
    slug: 'shoplifting-133-percent-london-1-in-14',
    issue: '15',
    headline: 'Shoplifting Up 133% in Five Years. London Charges 1 in 14.',
    standfirst: 'The system has a name for this: acceptable loss. Here is why the charge rate collapse is structural, not accidental.',
    tag: 'Statistics',
  },
];

function buildHTML(article) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap');
  body {
    width: 1200px;
    height: 630px;
    background: #FAF8F3;
    font-family: Georgia, 'Times New Roman', serif;
    overflow: hidden;
  }
  .wrap {
    width: 1200px;
    height: 630px;
    padding: 48px 64px 40px;
    display: flex;
    flex-direction: column;
    border: 8px solid #D4AF37;
    position: relative;
    background: #FAF8F3;
  }
  .masthead {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 3px solid #D4AF37;
    margin-bottom: 32px;
  }
  .signal-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 52px;
    font-weight: 700;
    color: #1A1A18;
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .masthead-right {
    text-align: right;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #D4AF37;
    font-weight: 600;
    line-height: 1.7;
  }
  .tag-line {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #D4AF37;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .headline {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 46px;
    font-weight: 700;
    color: #1A1A18;
    line-height: 1.1;
    margin-bottom: 24px;
    max-width: 920px;
    flex: 1;
  }
  .standfirst {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 400;
    color: #5C4A32;
    line-height: 1.55;
    max-width: 840px;
    border-left: 4px solid #D4AF37;
    padding-left: 20px;
    margin-bottom: 32px;
  }
  .footer-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #E2D9C8;
    padding-top: 16px;
  }
  .footer-left {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #D4AF37;
    font-weight: 600;
  }
  .footer-right {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #999;
  }
  .corner-rule {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 40px;
    height: 40px;
    border-top: 2px solid #D4AF37;
    border-right: 2px solid #D4AF37;
  }
  .corner-rule-bl {
    position: absolute;
    bottom: 24px;
    left: 24px;
    width: 40px;
    height: 40px;
    border-bottom: 2px solid #D4AF37;
    border-left: 2px solid #D4AF37;
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="corner-rule"></div>
  <div class="corner-rule-bl"></div>

  <div class="masthead">
    <div class="signal-title">The Signal</div>
    <div class="masthead-right">
      Issue ${article.issue} &nbsp;·&nbsp; Mykei Securities<br>
      mykei.io/signal
    </div>
  </div>

  <div class="tag-line">${article.tag}</div>
  <div class="headline">${article.headline}</div>
  <div class="standfirst">${article.standfirst}</div>

  <div class="footer-bar">
    <div class="footer-left">Retail Crime Intelligence · mykei.io</div>
    <div class="footer-right">Economic Sterilisation · UK Patent Pending</div>
  </div>
</div>
</body>
</html>`;
}

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  for (const article of ARTICLES) {
    const html = buildHTML(article);
    const htmlPath = join(__dirname, `../public/og/${article.slug}.html`);
    writeFileSync(htmlPath, html);

    await page.setContent(html, { waitUntil: 'networkidle' });
    const outPath = join(__dirname, `../public/og/signal-${article.slug}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`✓ signal-${article.slug}.png`);
  }

  await browser.close();
  console.log('\nAll OG images generated in public/og/');
}

run().catch(console.error);
