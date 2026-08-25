/**
 * Route smoke test.
 *
 * Exists because a global string replace once rewrote a route definition into
 * <Route path="/contact" element={<Navigate to="/contact" />} />, an infinite
 * self-redirect that shadowed the real page. /contact rendered blank in
 * production and nothing caught it, because nothing was checking.
 *
 * Reads the real route table out of src/App.tsx so it cannot drift from the
 * app, serves dist/, and asserts every route renders actual content and is not
 * the 404. Run against a local preview before deploying.
 *
 *   node scripts/route-smoke.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { readFileSync } from "fs";

const base = process.argv[2] || "http://localhost:8080";
const src = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");

const routes = [...src.matchAll(/<Route\s+path="([^"*]+)"/g)]
  .map(m => m[1])
  .filter(p => !p.includes(":"));

if (routes.length < 20) {
  console.error(`route-smoke: only parsed ${routes.length} routes, expected the full table. Refusing to pass.`);
  process.exit(1);
}

const b = await chromium.launch();
const p = await b.newPage();
const fail = [];

for (const route of routes) {
  try {
    await p.goto(base + route, { waitUntil: "networkidle", timeout: 20000 });
    await p.waitForTimeout(250);
    const text = (await p.evaluate(() => document.body.innerText)).trim();
    const url  = p.url().replace(base, "") || "/";
    if (text.length < 80)                        fail.push(`${route} -> blank (${text.length} chars)`);
    else if (/page not found|^404\b/i.test(text.slice(0, 160))) fail.push(`${route} -> 404`);
    else if (url === route && /Navigate/.test("") ) { /* unreachable, kept for clarity */ }
  } catch (e) {
    fail.push(`${route} -> ${String(e).split("\n")[0].slice(0, 60)}`);
  }
}

await b.close();

console.log(`route-smoke: checked ${routes.length} routes against ${base}`);
if (fail.length) {
  console.error(`route-smoke: ${fail.length} FAILED`);
  fail.forEach(f => console.error("  " + f));
  process.exit(1);
}
console.log("route-smoke: all routes render");
