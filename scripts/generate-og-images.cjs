// scripts/generate-og-images.cjs
const { chromium } = require('playwright');
const { writeFileSync } = require('fs');
const { join } = require('path');

const ARTICLES = [
  { slug: 'cctv-313-million-movie-ticket', issue: '01', tag: 'Retail Security', headline: 'CCTV is a £313 Million Movie Ticket for a Crime You Already Lost', standfirst: 'UK retailers spent £313m on security in 2025 and suffered 5.8 million thefts. The camera records the crime. It does not stop it.' },
  { slug: 'salford-to-vinted-black-market', issue: '02', tag: 'Organised Crime', headline: 'The Black Market Grocery Store', standfirst: 'Organised crime groups systematically target stores for online resale. The Toxic Inventory Registry poisons that pipeline before it starts.' },
  { slug: 'surgeon-not-camera-200ms', issue: '03', tag: 'Technology', headline: 'A Surgeon, Not a Camera: The 200 Millisecond Rule', standfirst: 'The ADN-1 responds in under 200ms. CCTV records a crime after it happens. There is no comparison worth making.' },
  { slug: 'shopkeeper-maths-adn1-cost', issue: '04', tag: 'Economics', headline: "The Maths: Built for the Shopkeeper's Cash Position", standfirst: '£40 a month. £149 setup. Here is the full calculation, built for a retailer with no budget for security theatre.' },
  { slug: 'david-robinson-gmb-cctv-theatre', issue: '11', tag: 'Media', headline: 'David Robinson Was Right on GMB. Here Is What Comes Next.', standfirst: 'The GMB segment showed 20 million thefts on camera, none of them stopped. Mykei built the answer.' },
  { slug: 'fog-security-systems-debunked', issue: '12', tag: 'Security Systems', headline: 'Fog Security Systems Are CCTV Theatre With Smoke', standfirst: 'Fog machines obscure the thief for 20 seconds. The stock is still gone. Obscuring a crime is not the same as stopping it.' },
  { slug: 'safergems-jewellery-theft-ai-police-response', issue: '13', tag: 'Jewellery Theft', headline: '10 Armed Robberies in Q1 2026. AI Policing Won\'t Be Ready Until 2030.', standfirst: 'Jewellery theft is accelerating. The institutional response is four years away. Forensic marking works now.' },
  { slug: 'police-200-pound-threshold', issue: '14', tag: 'Policy', headline: "Police Won't Come for £30 of Stolen Stock. That Is Not an Accident.", standfirst: 'Forces routinely deprioritise incidents below £200. Below that line, the economics of the justice system do not work for retailers.' },
  { slug: 'shoplifting-133-percent-london-1-in-14', issue: '15', tag: 'Statistics', headline: 'Shoplifting Up 133% in Five Years. London Charges 1 in 14.', standfirst: 'The system has a name for this: acceptable loss. Here is why the charge rate collapse is structural, not accidental.' },
];

function buildHTML(a) {
  const headlineSize = a.headline.length > 60 ? '36px' : a.headline.length > 45 ? '40px' : '44px';
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:1200px;height:630px;background:#FAF8F3;overflow:hidden;}
.wrap{width:1200px;height:630px;padding:44px 64px 36px;display:flex;flex-direction:column;border:7px solid #D4AF37;background:#FAF8F3;position:relative;}
.masthead{display:flex;align-items:baseline;justify-content:space-between;padding-bottom:14px;border-bottom:2.5px solid #D4AF37;margin-bottom:26px;}
.signal-title{font-family:Georgia,'Times New Roman',serif;font-size:54px;font-weight:700;color:#1A1A18;letter-spacing:-0.01em;line-height:1;}
.masthead-right{text-align:right;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#D4AF37;font-weight:700;line-height:1.8;}
.tag-line{font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#D4AF37;font-weight:700;margin-bottom:14px;}
.headline{font-family:Georgia,'Times New Roman',serif;font-size:${headlineSize};font-weight:700;color:#1A1A18;line-height:1.12;margin-bottom:20px;max-width:900px;flex:1;}
.standfirst{font-family:Georgia,serif;font-size:16px;color:#5C4A32;line-height:1.6;max-width:820px;border-left:4px solid #D4AF37;padding-left:18px;margin-bottom:24px;}
.footer-bar{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #E2D9C8;padding-top:13px;}
.footer-left{font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AF37;font-weight:700;}
.footer-right{font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#aaa;}
.corner-tr{position:absolute;top:20px;right:20px;width:36px;height:36px;border-top:2px solid #D4AF37;border-right:2px solid #D4AF37;}
.corner-bl{position:absolute;bottom:20px;left:20px;width:36px;height:36px;border-bottom:2px solid #D4AF37;border-left:2px solid #D4AF37;}
</style></head><body>
<div class="wrap">
  <div class="corner-tr"></div><div class="corner-bl"></div>
  <div class="masthead">
    <div class="signal-title">The Signal</div>
    <div class="masthead-right">Issue ${a.issue} &nbsp;&middot;&nbsp; Mykei Securities<br>mykei.io/signal</div>
  </div>
  <div class="tag-line">${a.tag}</div>
  <div class="headline">${a.headline}</div>
  <div class="standfirst">${a.standfirst}</div>
  <div class="footer-bar">
    <div class="footer-left">Retail Crime Intelligence &nbsp;&middot;&nbsp; mykei.io</div>
    <div class="footer-right">Economic Sterilisation &middot; UK Patent Pending</div>
  </div>
</div>
</body></html>`;
}

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  for (const article of ARTICLES) {
    const html = buildHTML(article);
    await page.setContent(html, { waitUntil: 'load' });
    const outPath = join(__dirname, `../public/og/signal-${article.slug}.png`);
    await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log(`✓ signal-${article.slug}.png`);
  }

  await browser.close();
  console.log('\nDone. All 9 OG images in public/og/');
}

run().catch(err => { console.error(err); process.exit(1); });
