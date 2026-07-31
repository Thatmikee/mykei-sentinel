/**
 * Mykei Securities — Economic Sterilisation White Paper Generator
 * Run: node scripts/generate-white-paper.mjs
 * Output: public/Mykei_Economic_Sterilisation_White_Paper.pdf
 */

import { jsPDF } from "jspdf";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/Mykei_Economic_Sterilisation_White_Paper.pdf");

// Palette
const INK     = [10, 10, 8];     // #0A0A08
const GOLD    = [212, 175, 55];  // #D4AF37
const MID     = [90, 70, 40];    // rich brown
const LIGHT   = [245, 245, 240]; // parchment
const RULE    = [210, 200, 185]; // rule line

const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
const W = 210;
const H = 297;
const ML = 22;  // margin left
const MR = 22;  // margin right
const TW = W - ML - MR; // text width

let y = 0;

// ─── Helpers ────────────────────────────────────────────────────────────────

function newPage() {
  doc.addPage();
  y = 22;
}

function rule(yy, r = RULE, lw = 0.3) {
  doc.setDrawColor(...r);
  doc.setLineWidth(lw);
  doc.line(ML, yy, W - MR, yy);
}

function goldRule(yy) {
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(ML, yy, W - MR, yy);
}

function setFont(style, size, color = INK) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

function text(str, x, yy, opts = {}) {
  doc.text(str, x, yy, opts);
}

function wrap(str, x, yy, maxWidth, lineHeight, style = "normal", size = 9.5, color = INK) {
  setFont(style, size, color);
  const lines = doc.splitTextToSize(str, maxWidth);
  doc.text(lines, x, yy);
  return yy + lines.length * lineHeight;
}

function sectionLabel(label, yy) {
  setFont("normal", 7, GOLD);
  doc.setCharSpace(2);
  text(label.toUpperCase(), ML, yy);
  doc.setCharSpace(0);
  return yy + 5;
}

function h2(str, yy) {
  setFont("bold", 15, INK);
  const lines = doc.splitTextToSize(str, TW);
  doc.text(lines, ML, yy);
  return yy + lines.length * 7 + 3;
}

function h3(str, yy) {
  setFont("bold", 10, INK);
  text(str, ML, yy);
  return yy + 6;
}

function body(str, yy, color = MID) {
  return wrap(str, ML, yy, TW, 5.4, "normal", 9.5, color);
}

function smallBody(str, yy, color = MID) {
  return wrap(str, ML, yy, TW, 4.8, "normal", 8.5, color);
}

function gap(n = 5) { y += n; }

function ensureSpace(need) {
  if (y + need > H - 22) newPage();
}

// ─── COVER PAGE ─────────────────────────────────────────────────────────────

// Parchment background strip at top
doc.setFillColor(...LIGHT);
doc.rect(0, 0, W, 90, "F");

// Gold accent bar
doc.setFillColor(...GOLD);
doc.rect(ML, 28, 3, 44, "F");

// Title block
y = 36;
setFont("normal", 7, GOLD);
doc.setCharSpace(2.5);
text("MYKEI SECURITIES LTD", ML + 10, y);
doc.setCharSpace(0);

y = 44;
setFont("bold", 26, INK);
const titleLines = doc.splitTextToSize("Economic Sterilisation", TW - 10);
doc.text(titleLines, ML + 10, y);
y += titleLines.length * 12;

setFont("normal", 13, [130, 100, 50]);
const subtitleLines = doc.splitTextToSize("The forensic doctrine that poisons the retail theft supply chain.", TW - 10);
doc.text(subtitleLines, ML + 10, y);
y += subtitleLines.length * 7;

// Rule
y += 6;
goldRule(y);
y += 10;

// Author / date block
setFont("normal", 8.5, INK);
text("Michael Esema, MBA, MSc.", ML + 10, y);
y += 5.5;
setFont("normal", 8, MID);
text("Founder, Mykei Securities Ltd", ML + 10, y);
y += 5;
text("Version 2.1, May 2026", ML + 10, y);
y += 5;
text("Patent pending: GB2606630.8 (17 claims)", ML + 10, y);

// Bottom cover metadata
y = H - 40;
rule(y);
y += 7;
setFont("normal", 7.5, MID);
text("mykei.io", ML, y);
text("Confidential. For authorised distribution only.", W / 2, y, { align: "center" });
text("May 2026", W - MR, y, { align: "right" });

// ─── TABLE OF CONTENTS ──────────────────────────────────────────────────────
newPage();
y = 28;

setFont("bold", 14, INK);
text("Contents", ML, y);
y += 3;
goldRule(y);
y += 10;

const toc = [
  ["01", "The Problem",                         "03"],
  ["02", "The Doctrine",                        "04"],
  ["03", "How the ADN Works",                 "05"],
  ["04", "The Toxic Inventory Registry",         "06"],
  ["05", "The Evidence Base",                   "07"],
  ["06", "The Manchester Alpha Pilot",          "08"],
  ["07", "Economics for Independent Retailers", "09"],
  ["08", "Conclusion",                          "10"],
];

for (const [num, title, page] of toc) {
  setFont("normal", 7, GOLD);
  text(num, ML, y);
  setFont("normal", 10, INK);
  text(title, ML + 10, y);
  setFont("normal", 8.5, MID);
  text(page, W - MR, y, { align: "right" });
  y += 2;
  rule(y, RULE, 0.15);
  y += 6;
}

y += 8;
setFont("normal", 8.5, MID);
const tocNote = doc.splitTextToSize(
  "This white paper sets out the theoretical basis for economic sterilisation as a retail security doctrine, the technical architecture of the ADN system, and the business case for independent retailers. It is intended for retailers, insurers, law enforcement partners, and investors.",
  TW
);
doc.text(tocNote, ML, y);

// ─── SECTION 01 — THE PROBLEM ───────────────────────────────────────────────
newPage();
y = 28;

y = sectionLabel("Section 01", y);
y = h2("The problem.", y);
y += 2;

const s01paras = [
  "The ACS 2026 Crime Report records 5.8 million retail crime incidents in the United Kingdom. The industry spent £313 million on security. The average store now pays an 11p crime tax on every transaction just to fund that spend. And things got worse.",
  "The BRC February 2026 Crime Survey confirms what investigators have known for years: a significant share of retail theft is not impulsive. It is organised. Groups select stores the way a buyer selects a supplier, using product density, staff-to-floor ratios, camera blind spots, and proximity to resale infrastructure as selection criteria.",
  "The conventional response to this problem has not changed in forty years. Cameras, guards, EAS tags, ink dye packs. All of these are deterrents aimed at the act of theft. None of them address the underlying economics that make retail theft a viable business model.",
  "The theft is not the business. The resale is. A stolen razor from a Salford Boots that cannot be sold on Vinted is worthless to the OCG that took it. The security industry has spent forty years trying to stop the acquisition phase. It has not spent nearly enough time poisoning the liquidation phase.",
];

for (const p of s01paras) {
  ensureSpace(20);
  y = body(p, y);
  y += 4;
}

// Data callout box
ensureSpace(36);
y += 2;
doc.setFillColor(...LIGHT);
doc.roundedRect(ML, y, TW, 32, 2, 2, "F");
doc.setDrawColor(...RULE);
doc.setLineWidth(0.3);
doc.roundedRect(ML, y, TW, 32, 2, 2, "S");

const boxY = y + 7;
const col = TW / 3;

const stats = [
  ["5.8M", "retail crime incidents\nACS 2026"],
  ["£313M", "spent on security\nACS 2026"],
  ["11p", "crime tax per transaction\nACS 2026"],
];

for (let i = 0; i < stats.length; i++) {
  const cx = ML + col * i + col / 2;
  setFont("bold", 16, INK);
  text(stats[i][0], cx, boxY + 6, { align: "center" });
  setFont("normal", 7, MID);
  const ls = stats[i][1].split("\n");
  for (let j = 0; j < ls.length; j++) {
    text(ls[j], cx, boxY + 12 + j * 4, { align: "center" });
  }
}
y += 36;

// ─── SECTION 02 — THE DOCTRINE ──────────────────────────────────────────────
newPage();
y = 28;

y = sectionLabel("Section 02", y);
y = h2("The doctrine.", y);
y += 2;

y = body(
  "Economic sterilisation is the doctrine of removing the resale value from stolen goods before they leave the store. It does not attempt to prevent the theft. It makes the theft commercially pointless.",
  y
);
y += 5;

y = body(
  "The logic is straightforward. An OCG calculates target value as a function of liquidation probability. If the goods on a shelf can be acquired and converted to cash with predictable reliability, that shelf is a business asset. If the goods are marked in a way that makes them forensically dangerous to own and commercially unsellable, the shelf stops being an asset. The store drops off the target list, not because it has better cameras, but because the economics no longer work.",
  y
);
y += 5;

y = body(
  "This is the only deterrence framework that operates on the incentive rather than the act. Physical deterrents escalate the risk of the acquisition phase. Economic sterilisation removes the reason to acquire. The distinction matters most for organised crime groups, which conduct systematic risk assessments before committing to a target. Random opportunists may not run the same calculation, but they are not the category generating £313 million in annual loss.",
  y
);
y += 5;

// Doctrine pillars
ensureSpace(50);
y += 2;
const pillars = [
  ["Physical layer",  "Proprietary Forensic Marking Compound — batch-coded synthetic markers, permanently bonded to product, packaging, and skin. UV-readable in under ten seconds with standard police kits. The compound class is the same as used in over 3,000 UK prosecutions across the forensic marking industry."],
  ["Digital layer",   "A live registry that ties batch codes to individual theft events, designed to support marketplace flagging workflows across eBay, Vinted, and Facebook Marketplace. The goal is to suppress listings before a single buyer sees them."],
  ["Legal layer",     "Any buyer in possession of flagged goods carries a forensic connection to the original theft event. The goods are not difficult to sell. They are hazardous to own. That distinction is what changes the OCG's liquidation probability calculation."],
];

for (const [title, detail] of pillars) {
  ensureSpace(22);
  doc.setFillColor(...GOLD);
  doc.rect(ML, y, 2, 14, "F");
  y = h3(title, y + 4);
  y -= 2;
  y = smallBody(detail, y + 2);
  y += 5;
}

// ─── SECTION 03 — HOW THE ADN WORKS ──────────────────────────────────────
newPage();
y = 28;

y = sectionLabel("Section 03", y);
y = h2("How the ADN works.", y);
y += 2;

y = body(
  "The ADN is the hardware layer of the economic sterilisation system. It mounts on the front price rail of a standard retail gondola shelf and detects theft events, responding with a selective forensic deployment in under three seconds. There are no cameras. No biometric data. No facial recognition. GDPR compliance is structural, not a policy choice.",
  y
);
y += 5;

const steps = [
  ["Detection",    "Dual VL53L1X time-of-flight sensors multiplexed via a PCA9548A I2C hub on the ESP32 Feather V2. Each sensor covers one end of the shelf face, creating overlapping detection zones spanning the full shelf width."],
  ["Confirmation", "A 200ms confirmation window eliminates false positives from shelf restocking and normal browsing. The trigger threshold is calibrated per deployment based on product height profiles."],
  ["Deployment",   "A 113kHz piezoelectric atomiser disperses a batch-coded Proprietary Forensic Marking Compound in a directional plume. Coverage radius is approximately 1.2 metres. Contact time is under 0.4 seconds for full forensic marking."],
  ["Registration", "The ESP32 Feather V2 posts an AES-256-GCM encrypted forensic event package to AWS IoT Core via MQTT over TLS 1.3, containing timestamp, node ID, zone, ToF vector data, and batch code. The registry cross-references live resale platform listings within 90 seconds of deployment."],
  ["Audit trail",  "Every trigger event is logged immutably with sensor data, deployment timestamp, and batch confirmation. The log is accessible to law enforcement via the secure portal without requiring a court order."],
];

for (const [title, detail] of steps) {
  ensureSpace(20);
  y = h3(title, y);
  y = smallBody(detail, y);
  y += 4;
}

y += 3;
setFont("normal", 8, MID);
const techNote = doc.splitTextToSize(
  "The ADN runs Arduino firmware (v2.7) on the ESP32 Feather V2 platform. OTA firmware updates are delivered over encrypted MQTT. The unit operates on 5V USB-C and draws under 2W in standby. No local data storage. All event data is transmitted to the registry immediately and held in volatile memory only.",
  TW
);
doc.setFillColor(...LIGHT);
doc.roundedRect(ML, y - 4, TW, 4 + techNote.length * 4.5 + 6, 2, 2, "F");
doc.text(techNote, ML + 4, y + 2);
y += techNote.length * 4.5 + 10;

// ─── SECTION 04 — TOXIC INVENTORY REGISTRY ──────────────────────────────────
newPage();
y = 28;

y = sectionLabel("Section 04", y);
y = h2("The Toxic Inventory Registry.", y);
y += 2;

y = body(
  "The Toxic Inventory Registry is the enforcement layer. When a deployment event fires, the batch code is registered in real time and cross-referenced against live listings on eBay, Vinted, and Facebook Marketplace via their respective APIs. The flag applies at the point of listing. The system is designed to cross-reference listings within minutes of a deployment event, flagging matches before buyers interact with them.",
  y
);
y += 5;

y = body(
  "Platform compliance teams do not need to review anything. The flag is applied programmatically. The seller receives a standard listing suspension notice. The buyer never sees the item. The design goal is to make the OCG's liquidation event commercially unviable.",
  y
);
y += 5;

y = body(
  "The registry operates under 17 patent claims covering the combination of physical marking, digital registration, and cross-platform enforcement. The claims cover both the system architecture and the specific method of API-based listing suppression triggered by a deployment event.",
  y
);
y += 5;

// Registry flow diagram (text-based)
ensureSpace(48);
y += 2;
doc.setFillColor(10, 10, 8);
doc.roundedRect(ML, y, TW, 42, 3, 3, "F");

const flowY = y + 8;
const flowItems = [
  ["01  DETECTION", "ADN fires. Batch code generated."],
  ["02  REGISTRY",  "Code posted to Toxic Inventory Registry over TLS."],
  ["03  API SCAN",  "Registry queries eBay, Vinted, Facebook Marketplace."],
  ["04  FLAG",      "Matching listings suppressed programmatically."],
  ["05  PORTAL",    "Law enforcement notified via secure dashboard."],
];

for (let i = 0; i < flowItems.length; i++) {
  const fy = flowY + i * 6.5;
  setFont("bold", 7, GOLD);
  text(flowItems[i][0], ML + 6, fy);
  setFont("normal", 7.5, [200, 195, 185]);
  text(flowItems[i][1], ML + 42, fy);
}

y += 46;

// ─── SECTION 05 — EVIDENCE BASE ─────────────────────────────────────────────
newPage();
y = 28;

y = sectionLabel("Section 05", y);
y = h2("The evidence base.", y);
y += 2;

const evidenceItems = [
  ["ACS Crime Report 2026",        "5.8 million incidents. £313 million spent. 11p per transaction crime tax. Abuse of staff rising. The report notes that spending has not reduced incident rates."],
  ["BRC Crime Survey Feb 2026",    "Organised crime groups identified as conducting systematic targeting of retail locations. The survey explicitly flags the online resale pipeline as the enabling mechanism."],
  ["Forensic marking compound evidence","Forensic marking compounds of this class have contributed to over 3,000 UK prosecutions across the industry. UV readability allows rapid forensic confirmation without laboratory analysis. UV readability allows rapid forensic confirmation without laboratory analysis."],
  ["Online marketplace volume",    "eBay UK lists approximately 200 million active items at any point. Vinted UK onboarded over 2 million new sellers in 2025. Facebook Marketplace processes millions of transactions daily. Volume is the cover that makes stolen goods indistinguishable from second-hand goods."],
  ["Economic deterrence literature","The academic consensus on deterrence theory (Becker, 1968; Ehrlich, 1973) establishes that rational actors reduce criminal behaviour when expected returns fall below expected costs. Economic sterilisation operates on the return side of that calculation rather than the cost side."],
];

for (const [title, detail] of evidenceItems) {
  ensureSpace(22);
  y = h3(title, y);
  y = smallBody(detail, y);
  y += 5;
}

// ─── SECTION 06 — MANCHESTER ALPHA PILOT ────────────────────────────────────
newPage();
y = 28;

y = sectionLabel("Section 06", y);
y = h2("The Manchester Alpha Pilot.", y);
y += 2;

y = body(
  "The Manchester Alpha Pilot deploys five ADN units across five independent retail locations in Greater Manchester in Q2 2026. Each site runs a seven-day Net 7 evaluation under full production conditions, not a controlled environment. Founders pricing applies: £149 setup plus £40 per month.",
  y
);
y += 5;

y = body(
  "The pilot tests two things simultaneously. The technical reliability of the ADN detection and deployment chain under real store conditions. And the commercial response: whether OCGs conducting systematic targeting update their risk models in response to Mykei Protected signage.",
  y
);
y += 5;

y = body(
  "Sites that complete the pilot receive Mykei Protected certification, shelf signage, and digital verification credentials. Certified locations are enrolled in the Toxic Inventory Registry as priority partners and will be flagged first when batch codes are cross-referenced against resale platform listings.",
  y
);
y += 5;

y = body(
  "Pilot data will be published in Q3 2026. The publication will include incident rate data, deployment event logs (anonymised), and any observable changes in targeting frequency. The goal is a peer-reviewed data set, not a press release.",
  y
);

// ─── SECTION 07 — ECONOMICS ─────────────────────────────────────────────────
newPage();
y = 28;

y = sectionLabel("Section 07", y);
y = h2("Economics for independent retailers.", y);
y += 2;

y = body(
  "The average BIRA member operates on margins of 3 to 5 percent. A single high-value theft event can eliminate a week of net profit. The standard security industry response, a guard at £12 to £18 per hour plus EAS infrastructure, is priced for the enterprise sector.",
  y
);
y += 5;

y = body(
  "ADN is priced for the store with one till and a spreadsheet. At £40 per month, the break-even point is a single theft prevention event worth approximately £480 per year, or one serious incident avoided per month with a basket value of around £40. For a pharmacy, off-licence, or convenience store stocking razor blades, nappies, or alcohol, that threshold is cleared in the first week.",
  y
);
y += 5;

// Break-even table
ensureSpace(52);
y += 3;
const tableHeader = ["Monthly theft value protected", "Monthly cost", "Annual break-even events", "Annual saving"];
const tableRows = [
  ["£40 basket", "£40/month", "1 event/month", "£480 – £480 = £0 (floor)"],
  ["£100 basket", "£40/month", "5 events/year", "£500 – £480 = +£20"],
  ["£250 basket", "£40/month", "2 events/year", "£500 – £480 = +£20"],
  ["£500 basket", "£40/month", "1 event/year",  "£500 – £480 = +£20"],
  ["Organised run (£2,000+)", "£40/month", "1 run prevented/year", "£2,000+ – £480 = +£1,520+"],
];

const colW = [54, 32, 46, TW - 54 - 32 - 46];
let tx = ML;
const rowH = 7;

// Header
doc.setFillColor(...INK);
doc.rect(ML, y, TW, rowH, "F");
let hx = ML + 2;
for (let i = 0; i < tableHeader.length; i++) {
  setFont("bold", 6.5, [220, 215, 200]);
  text(tableHeader[i], hx, y + 4.5);
  hx += colW[i];
}
y += rowH;

for (let r = 0; r < tableRows.length; r++) {
  doc.setFillColor(r % 2 === 0 ? 250 : 244, r % 2 === 0 ? 250 : 244, r % 2 === 0 ? 247 : 241);
  doc.rect(ML, y, TW, rowH, "F");
  let cx = ML + 2;
  for (let c = 0; c < tableRows[r].length; c++) {
    setFont("normal", 7, c === 0 ? INK : MID);
    text(tableRows[r][c], cx, y + 4.5);
    cx += colW[c];
  }
  y += rowH;
}
y += 8;

y = smallBody(
  "The table above uses conservative assumptions. It does not account for insurance premium reductions, reduced staff stress-related absence, or the deterrence effect on non-Mykei goods adjacent to protected shelves. BIRA member feedback from the pilot will update these figures.",
  y, MID
);

// ─── SECTION 08 — CONCLUSION ────────────────────────────────────────────────
newPage();
y = 28;

y = sectionLabel("Section 08", y);
y = h2("Conclusion.", y);
y += 2;

y = body(
  "The retail security industry has spent four decades trying to stop theft at the moment it happens. The ADN and the Toxic Inventory Registry operate on a different principle: make the theft commercially worthless before the thief reaches the door.",
  y
);
y += 5;

y = body(
  "Economic sterilisation is not a security feature. It is a change to the underlying economics of whether a store is worth hitting. When an OCG calculates a target, the calculation ends at liquidation probability. Push that probability toward zero and the store drops off the list.",
  y
);
y += 5;

y = body(
  "The Manchester Alpha Pilot is testing whether that theory holds in a real store, in a real street, against real organised crime. The data will be published. If the deterrence effect is measurable, the doctrine scales. If it is not, the data will say so and the doctrine will adapt.",
  y
);
y += 5;

y = body(
  "What the industry cannot do is continue spending £313 million per year for worse outcomes and call that a security programme.",
  y, INK
);

// Final rule and contact
y += 12;
goldRule(y);
y += 8;

setFont("bold", 9, INK);
text("Mykei Securities Ltd", ML, y);
y += 5.5;
setFont("normal", 8.5, MID);
text("Manchester, United Kingdom", ML, y);
y += 5;
text("protocol@mykei.io", ML, y);
y += 5;
text("mykei.io", ML, y);
y += 5;
text("Patent pending: GB2606630.8", ML, y);

// ─── PAGE NUMBERS ────────────────────────────────────────────────────────────
const totalPages = doc.getNumberOfPages();
for (let i = 2; i <= totalPages; i++) {
  doc.setPage(i);
  setFont("normal", 7, MID);
  doc.setCharSpace(1);
  text(`MYKEI SECURITIES   —   ECONOMIC STERILISATION   —   MAY 2026`, W / 2, H - 12, { align: "center" });
  doc.setCharSpace(0);
  text(`${i - 1}`, W - MR, H - 12, { align: "right" });
  rule(H - 16, RULE, 0.2);
}

// ─── OUTPUT ──────────────────────────────────────────────────────────────────
const buf = Buffer.from(doc.output("arraybuffer"));
writeFileSync(OUT, buf);
console.log(`White paper written to ${OUT} (${Math.round(buf.length / 1024)}KB)`);
