// workers/signal-wire/src/index.js
//
// The Signal wire, always-on edition.
//
// Same job as scripts/signal-wire/wire.mjs, with one difference that is the
// whole reason it exists: this runs on Cloudflare's schedule rather than on
// Michael's laptop, so it does not silently skip a day when the Mac is asleep.
//
// It still does not publish. It writes a digest into KV and serves it to a
// human who asks for it with the token. The review gate is the point.
//
// KV keys
//   seen           JSON array of item id hashes, capped
//   digest:latest  the most recent digest, markdown
//   digest:<date>  one per day, markdown

import FEEDS from "../feeds.json";

const UA = "MykeiSignalBot/1.0 (+https://mykei.io/signal; editorial monitoring; contact protocol@mykei.io)";
const TIMEOUT_MS = 15000;
const MAX_EXCERPT = 220;
const SEEN_CAP = 4000;

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

/** SHA-1 via WebCrypto. Workers has no node:crypto createHash. */
async function idOf(item) {
  const data = new TextEncoder().encode(item.guid || item.link || item.title);
  const buf = await crypto.subtle.digest("SHA-1", data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

function score(text, feed) {
  const t = text.toLowerCase();
  const hits = FEEDS.must.filter(k => t.includes(k));
  if (!hits.length) return null;
  const hot = FEEDS.hot.filter(k => t.includes(k));
  const floor = feed.tier === "primary" ? 3 : 0;
  return { n: Math.max(hits.length + hot.length * 2, floor), hits, hot };
}

async function getFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": UA, accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*" },
    });
    if (!res.ok) return { feed, error: `HTTP ${res.status}` };
    const items = itemsOf(await res.text());
    if (!items.length) return { feed, error: "no items parsed" };
    return { feed, items };
  } catch (e) {
    return { feed, error: String((e && e.message) || e) };
  }
}

async function runWire(env) {
  const active = FEEDS.feeds.filter(f => !f.manual);
  const manual = FEEDS.feeds.filter(f => f.manual);

  const seenRaw = await env.WIRE.get("seen", "json");
  const seen = new Set(Array.isArray(seenRaw) ? seenRaw : []);

  const results = await Promise.all(active.map(getFeed));
  const kept = [];
  const failures = [];
  const thisRun = new Set();

  for (const r of results) {
    if (r.error) { failures.push(r); continue; }
    for (const raw of r.items) {
      const title = tag(raw, "title");
      if (!title) continue;
      const desc = tag(raw, "description") || tag(raw, "summary") || tag(raw, "content");
      const item = { title, link: linkOf(raw), guid: tag(raw, "guid") || tag(raw, "id"), desc, date: dateOf(raw), feed: r.feed };
      const s = score(`${title} ${desc}`, r.feed);
      if (!s) continue;
      const id = await idOf(item);
      if (seen.has(id) || thisRun.has(id)) continue;
      thisRun.add(id);
      kept.push({ ...item, id, score: s });
    }
  }

  kept.sort((a, b) => b.score.n - a.score.n || (b.date ? b.date.getTime() : 0) - (a.date ? a.date.getTime() : 0));

  const now = new Date();
  const stamp = now.toISOString().slice(0, 10);
  const trim = s => (s.length > MAX_EXCERPT ? s.slice(0, MAX_EXCERPT).trimEnd() + "…" : s);
  const L = [];

  L.push(`# Signal wire, ${stamp}`, "");
  L.push(`Generated ${now.toISOString()} by the signal-wire Worker.`, "");
  L.push("**Nothing here is published.** This is a triage list. Anything used in a");
  L.push("piece must be verified against its primary source first, and every figure");
  L.push("needs its period and publication date. Headlines are the publishers' words.", "");
  L.push(`Feeds read: ${active.length - failures.length} of ${active.length}. New relevant items: ${kept.length}.`, "");

  if (failures.length) {
    L.push("## Feeds that failed this run", "");
    L.push("Listed because a silent skip looks identical to a quiet news day.", "");
    for (const f of failures) L.push(`- **${f.feed.name}** \`${f.feed.url}\` : ${f.error}`);
    L.push("");
  }

  for (const [heading, group, blurb] of [
    ["Primary sources", kept.filter(k => k.feed.tier === "primary"),
      "Legislation, statutory instruments and departmental announcements. Read these first: a commencement regulation can invalidate a published piece overnight."],
    ["Trade press", kept.filter(k => k.feed.tier !== "primary"),
      "Sorted by how many beat terms each item matched. Treat as leads, not facts."],
  ]) {
    if (!group.length) continue;
    L.push(`## ${heading}`, "", `_${blurb}_`, "");
    for (const it of group) {
      L.push(`### ${it.title}`);
      L.push(`\`${it.date ? it.date.toISOString().slice(0, 10) : "undated"}\` · ${it.feed.name} · score ${it.score.n}${it.score.hot.length ? ` · hot: ${it.score.hot.join(", ")}` : ""}`, "");
      if (it.desc) L.push(`> ${trim(it.desc)}`, "");
      if (it.link) L.push(`<${it.link}>`, "");
    }
  }

  if (manual.length) {
    L.push("## Sources with no feed, check by hand", "");
    for (const f of manual) L.push(`- **${f.name}** : ${f.note}`);
    L.push("");
  }

  const digest = L.join("\n");
  const ids = [...seen, ...kept.map(k => k.id)].slice(-SEEN_CAP);

  await env.WIRE.put("seen", JSON.stringify(ids));
  await env.WIRE.put(`digest:${stamp}`, digest, { expirationTtl: 60 * 60 * 24 * 120 });
  await env.WIRE.put("digest:latest", digest);

  return { stamp, kept: kept.length, failures: failures.length, digest };
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runWire(env));
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    // Token gate. The digest is only headlines and links, but an open endpoint
    // that anyone can find is still an editorial queue anyone can read.
    const token = url.searchParams.get("k");
    if (!env.WIRE_TOKEN || token !== env.WIRE_TOKEN) {
      return new Response("Not found\n", { status: 404 });
    }

    if (url.pathname === "/run") {
      const r = await runWire(env);
      return new Response(`ran ${r.stamp}: ${r.kept} new, ${r.failures} failures\n`, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    const key = url.pathname === "/" || url.pathname === "/latest"
      ? "digest:latest"
      : `digest:${url.pathname.slice(1)}`;
    const digest = await env.WIRE.get(key);
    if (!digest) return new Response("No digest for that date\n", { status: 404 });

    return new Response(digest, {
      headers: { "content-type": "text/markdown; charset=utf-8", "x-robots-tag": "noindex" },
    });
  },
};
