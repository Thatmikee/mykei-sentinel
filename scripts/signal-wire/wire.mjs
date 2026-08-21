#!/usr/bin/env node
// scripts/signal-wire/wire.mjs
//
// The Signal wire. Reads the RSS and Atom feeds listed in feeds.json, keeps
// items relevant to the retail security beat, drops anything seen on a previous
// run, and writes a dated digest for a human to read.
//
// WHAT THIS IS NOT
// It does not publish. It writes a markdown digest and stops. Nothing reaches
// the site without someone reading the digest and deciding. That review gate is
// the point, not an inconvenience.
//
// It also only runs when this machine is awake. A local schedule is not
// always-on coverage, and pretending otherwise recreates the exact gap this
// was built to close. If you need always-on, that is a Cloudflare Worker plus
// KV for the seen store, and a separate decision.
//
// POLITENESS AND COPYRIGHT
// Feeds only, never crawling article pages. One request per feed per run, a
// declared user agent, and a hard timeout. The digest stores headline, link,
// date and a short excerpt for triage. It does not reproduce articles.
//
// USAGE
//   node scripts/signal-wire/wire.mjs                # write digest, update seen
//   node scripts/signal-wire/wire.mjs --dry-run      # print, touch nothing
//   node scripts/signal-wire/wire.mjs --all          # ignore the seen store
//   node scripts/signal-wire/wire.mjs --out <path>   # digest destination

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const HERE = dirname(fileURLToPath(import.meta.url));
// One source of truth, shared with the Worker. Two copies of a feed list is
// two lists that disagree inside a month.
const CONFIG = JSON.parse(readFileSync(join(HERE, "../../workers/signal-wire/feeds.json"), "utf8"));
const SEEN_PATH = join(HERE, "seen.json");

// The digest is deliberately written OUTSIDE the repo build path. The
// claim-safety gate scans repo content and would match banned marketing
// phrases quoted inside third-party headlines, exactly as it did on llms.txt.
const DEFAULT_OUT = "/Users/mykeesema/Documents/Mykei Securities Ltd/_Inbox/signal-wire";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const ALL = args.includes("--all");
const OUT_DIR = args.includes("--out") ? resolve(args[args.indexOf("--out") + 1]) : DEFAULT_OUT;

const UA = "MykeiSignalBot/1.0 (+https://mykei.io/signal; editorial monitoring; contact protocol@mykei.io)";
const TIMEOUT_MS = 20000;
const MAX_EXCERPT = 220;

/* ── tiny XML helpers ─────────────────────────────────────────────────────
   Deliberately dependency free. Feed XML is regular enough for this, and
   adding a parser to the site's dependency tree for a script the site never
   ships would be a poor trade. */

const decode = (s = "") =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
   .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
   .replace(/&#8217;|&rsquo;/g, "’").replace(/&#8216;|&lsquo;/g, "‘")
   .replace(/&#8220;|&ldquo;/g, "“").replace(/&#8221;|&rdquo;/g, "”")
   .replace(/&#8211;|&ndash;/g, "–").replace(/&#8212;|&mdash;/g, "—")
   .replace(/&#163;/g, "£").replace(/&nbsp;/g, " ")
   .replace(/&amp;/g, "&")
   .replace(/<[^>]+>/g, " ")
   .replace(/\s+/g, " ").trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
};

/** Atom puts the URL in an attribute; RSS puts it in the element body. */
function linkOf(xml) {
  const rss = xml.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
  if (rss && rss[1].trim() && !rss[1].includes("<")) return decode(rss[1]);
  const atom = xml.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i);
  return atom ? decode(atom[1]) : "";
}

function itemsOf(xml) {
  const out = [];
  const re = /<(item|entry)[\s>][\s\S]*?<\/\1>/gi;
  let m;
  while ((m = re.exec(xml))) out.push(m[0]);
  return out;
}

function dateOf(xml) {
  const raw = tag(xml, "pubDate") || tag(xml, "published") || tag(xml, "updated") || tag(xml, "dc:date");
  const d = raw ? new Date(raw) : null;
  return d && !isNaN(d) ? d : null;
}

/* ── fetch ────────────────────────────────────────────────────────────── */

async function getFeed(feed) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(feed.url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "user-agent": UA, accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*" },
    });
    if (!res.ok) return { feed, error: `HTTP ${res.status}` };
    const xml = await res.text();
    const items = itemsOf(xml);
    if (!items.length) return { feed, error: "no items parsed" };
    return { feed, items };
  } catch (e) {
    return { feed, error: e.name === "AbortError" ? `timeout after ${TIMEOUT_MS}ms` : String(e.message || e) };
  } finally {
    clearTimeout(timer);
  }
}

/* ── scoring ──────────────────────────────────────────────────────────── */

function score(text, feed) {
  const t = text.toLowerCase();
  const hits = CONFIG.must.filter(k => t.includes(k));
  if (!hits.length) return null;
  const hot = CONFIG.hot.filter(k => t.includes(k));
  // Primary sources get a floor. A commencement regulation is worth more than
  // a dozen trade stories, and must never be buried under trade volume.
  const floor = feed.tier === "primary" ? 3 : 0;
  return { n: Math.max(hits.length + hot.length * 2, floor), hits, hot };
}

const idOf = it => createHash("sha1").update(it.guid || it.link || it.title).digest("hex").slice(0, 16);

/* ── run ──────────────────────────────────────────────────────────────── */

// Two separate things: what we filter against, and what we persist.
// --all re-reports everything, but must NOT erase the history. An earlier
// version wrote only the current run's ids and silently truncated the store.
const storedIds = existsSync(SEEN_PATH)
  ? (JSON.parse(readFileSync(SEEN_PATH, "utf8")).ids || [])
  : [];
const seen = ALL ? new Set() : new Set(storedIds);

const active = CONFIG.feeds.filter(f => !f.manual);
const manual = CONFIG.feeds.filter(f => f.manual);

console.log(`Signal wire: ${active.length} feeds, ${manual.length} manual, ${seen.size} items already seen\n`);

const results = await Promise.all(active.map(getFeed));

const kept = [];
const failures = [];
// Within a single run too: the /uksi and /new legislation feeds both carry the
// same statutory instrument, so without this the same SI is filed twice.
const thisRun = new Set();

for (const r of results) {
  if (r.error) { failures.push(r); console.log(`  FAIL  ${r.feed.name}: ${r.error}`); continue; }
  let k = 0;
  for (const raw of r.items) {
    const title = tag(raw, "title");
    if (!title) continue;
    const link = linkOf(raw);
    const desc = tag(raw, "description") || tag(raw, "summary") || tag(raw, "content");
    const guid = tag(raw, "guid") || tag(raw, "id");
    const item = { title, link, guid, desc, date: dateOf(raw), feed: r.feed };
    const s = score(`${title} ${desc}`, r.feed);
    if (!s) continue;
    const id = idOf(item);
    if (seen.has(id) || thisRun.has(id)) continue;
    thisRun.add(id);
    kept.push({ ...item, id, score: s });
    k++;
  }
  console.log(`  ok    ${r.feed.name}: ${r.items.length} items, ${k} new and relevant`);
}

kept.sort((a, b) => b.score.n - a.score.n || (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

/* ── digest ───────────────────────────────────────────────────────────── */

const now = new Date();
const stamp = now.toISOString().slice(0, 10);
const trim = s => (s.length > MAX_EXCERPT ? s.slice(0, MAX_EXCERPT).trimEnd() + "…" : s);

const lines = [];
lines.push(`# Signal wire, ${stamp}`);
lines.push("");
lines.push(`Generated ${now.toISOString()} by scripts/signal-wire/wire.mjs.`);
lines.push("");
lines.push("**Nothing here is published.** This is a triage list. Anything used in a");
lines.push("piece must be verified against its primary source first, the way the");
lines.push("threshold article was, and every figure needs its period and publication");
lines.push("date. Headlines below are the publishers' words, not ours.");
lines.push("");
lines.push(`Feeds read: ${active.length - failures.length} of ${active.length}. New relevant items: ${kept.length}.`);
lines.push("");

if (failures.length) {
  lines.push("## Feeds that failed this run");
  lines.push("");
  lines.push("Listed because a silent skip looks identical to a quiet news day.");
  lines.push("");
  for (const f of failures) lines.push(`- **${f.feed.name}** \`${f.feed.url}\` : ${f.error}`);
  lines.push("");
}

const primary = kept.filter(k => k.feed.tier === "primary");
const trade = kept.filter(k => k.feed.tier !== "primary");

for (const [heading, group, blurb] of [
  ["Primary sources", primary, "Legislation, statutory instruments and departmental announcements. Read these first: a commencement regulation can invalidate a published piece overnight."],
  ["Trade press", trade, "Sorted by how many beat terms each item matched. Treat as leads, not facts."],
]) {
  if (!group.length) continue;
  lines.push(`## ${heading}`);
  lines.push("");
  lines.push(`_${blurb}_`);
  lines.push("");
  for (const it of group) {
    const d = it.date ? it.date.toISOString().slice(0, 10) : "undated";
    lines.push(`### ${it.title}`);
    lines.push(`\`${d}\` · ${it.feed.name} · score ${it.score.n}${it.score.hot.length ? ` · hot: ${it.score.hot.join(", ")}` : ""}`);
    lines.push("");
    if (it.desc) lines.push(`> ${trim(it.desc)}`);
    lines.push("");
    if (it.link) lines.push(`<${it.link}>`);
    lines.push("");
  }
}

if (manual.length) {
  lines.push("## Sources with no feed, check by hand");
  lines.push("");
  for (const f of manual) lines.push(`- **${f.name}** : ${f.note}`);
  lines.push("");
}

const digest = lines.join("\n");

if (DRY) {
  console.log("\n--- dry run, nothing written ---\n");
  console.log(digest.slice(0, 2500));
} else {
  mkdirSync(OUT_DIR, { recursive: true });
  const out = join(OUT_DIR, `wire-${stamp}.md`);
  writeFileSync(out, digest, "utf8");
  const ids = [...new Set([...storedIds, ...kept.map(k => k.id)])].slice(-4000);
  writeFileSync(SEEN_PATH, JSON.stringify({ updated: now.toISOString(), ids }, null, 0), "utf8");
  console.log(`\nDigest: ${out}`);
  console.log(`Seen store: ${ids.length} ids`);
}

console.log(`\n${kept.length} new relevant items, ${failures.length} feed failures.`);

// Local delivery. The digest existing in a folder is not the same as being
// told it exists; without this the file is written faithfully and never read.
// Quiet runs stay silent on purpose, so the notification keeps its meaning.
if (!DRY && (kept.length || failures.length)) {
  const primary = kept.filter(k => k.feed.tier === "primary").length;
  const bits = [];
  if (kept.length) bits.push(`${kept.length} new`);
  if (primary) bits.push(`${primary} primary`);
  if (failures.length) bits.push(`${failures.length} feed failures`);
  const msg = bits.join(", ");
  try {
    const { execFileSync } = await import("node:child_process");
    execFileSync("/usr/bin/osascript", ["-e",
      `display notification ${JSON.stringify(msg)} with title "Signal wire" subtitle ${JSON.stringify(stamp)}`]);
  } catch {
    // A notification failing must never fail the run. The digest is written.
  }
}
if (failures.length) process.exitCode = 0; // failures are reported, not fatal
