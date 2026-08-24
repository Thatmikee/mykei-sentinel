import { chromium } from "playwright";
import { mkdirSync } from "fs";
const out = process.argv[3] || "social/out";
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await p.goto("file://" + process.argv[2]);
await p.waitForTimeout(400);
const ids = await p.$$eval(".slide", els => els.map(e => e.id));
for (const id of ids) {
  await p.locator("#" + id).screenshot({ path: `${out}/${id}.png` });
  console.log("rendered", id);
}
await b.close();
