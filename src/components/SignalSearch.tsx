// src/components/SignalSearch.tsx
//
// Search for The Signal. Two things in one box, because a reader who cannot
// find a piece here will go to Google anyway, and pretending otherwise just
// makes them leave without the answer:
//
//   1. Type ahead across everything published here, matched on title, summary
//      and tags, so a half remembered phrase still finds the piece.
//   2. A Google escape hatch as the last option, always present, which runs
//      the same query on the open web.
//
// No dependency. The corpus is 28 entries; anything heavier than a substring
// scan would be engineering for a problem we do not have.

import { useState, useMemo, useRef, useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";
import { blogPosts, type BlogPostMeta } from "@/data/blogPosts";
import { RED_EDITION, RED_TYPE } from "@/styles/signalRed";

const { INK, INK_2, INK_3, RULE, RULE_2, RED, GROUND } = RED_EDITION;
const { SANS, MONO } = RED_TYPE;

const MAX_RESULTS = 6;

/**
 * Score a post against the query. Title matches beat summary matches, and an
 * exact phrase beats scattered words, so "chocolate case" finds the March file
 * rather than everything containing the word "case".
 */
function rank(post: BlogPostMeta, q: string): number {
  const query = q.toLowerCase().trim();
  if (!query) return 0;
  const title = post.title.toLowerCase();
  const summary = post.summary.toLowerCase();
  const tags = post.tags.join(" ").toLowerCase();

  let score = 0;
  if (title.includes(query)) score += 100;
  if (title.startsWith(query)) score += 40;
  if (summary.includes(query)) score += 25;
  if (tags.includes(query)) score += 20;

  // Fall back to individual words so word order does not have to be right.
  const words = query.split(/\s+/).filter(w => w.length > 2);
  for (const w of words) {
    if (title.includes(w)) score += 12;
    if (summary.includes(w)) score += 5;
    if (tags.includes(w)) score += 4;
  }
  return score;
}

export default function SignalSearch({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return blogPosts
      .map(p => ({ post: p, score: rank(p, q) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map(r => r.post);
  }, [q]);

  // The Google option is always last, and is always available even when
  // nothing here matches. Total options = results + 1.
  const optionCount = results.length + (q.trim() ? 1 : 0);

  useEffect(() => setActive(0), [q]);

  // Close on outside click. Without this the panel hangs over the page after
  // the reader has moved on, which reads as broken.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`;

  function choose(i: number) {
    if (i < results.length) {
      navigate(`/signal/${results[i].slug}`);
      setQ(""); setOpen(false);
    } else {
      window.open(googleUrl, "_blank", "noopener,noreferrer");
      setOpen(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!optionCount) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive(a => (a + 1) % optionCount); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setOpen(true); setActive(a => (a - 1 + optionCount) % optionCount); }
    else if (e.key === "Enter") { e.preventDefault(); choose(active); }
    else if (e.key === "Escape") { setOpen(false); }
  }

  return (
    <div ref={boxRef} style={{ position: "relative", width: "100%", maxWidth: compact ? 320 : 460 }}>
      <label htmlFor={`${listId}-input`} style={{
        position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)",
      }}>
        Search The Signal
      </label>

      <input
        id={`${listId}-input`}
        type="search"
        value={q}
        placeholder="Search The Signal"
        autoComplete="off"
        role="combobox"
        aria-expanded={open && optionCount > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && optionCount ? `${listId}-opt-${active}` : undefined}
        onChange={e => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        style={{
          width: "100%", boxSizing: "border-box",
          fontFamily: MONO, fontSize: compact ? 12 : 13, color: INK,
          background: GROUND, border: `1px solid ${RULE}`, borderRadius: 0,
          padding: compact ? "8px 10px" : "10px 12px",
          outlineOffset: 2,
        }}
      />

      {open && optionCount > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search results"
          style={{
            position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 60,
            listStyle: "none", margin: 0, padding: 0,
            background: GROUND, border: `1px solid ${INK}`,
            maxHeight: 400, overflowY: "auto",
          }}
        >
          {results.map((post, i) => (
            <li
              key={post.slug}
              id={`${listId}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={e => { e.preventDefault(); choose(i); }}
              style={{
                padding: "10px 12px", cursor: "pointer",
                borderBottom: `1px solid ${RULE_2}`,
                background: i === active ? RULE_2 : "transparent",
              }}
            >
              <div style={{
                fontFamily: SANS, fontSize: 14, fontWeight: 500, lineHeight: 1.35,
                color: INK, letterSpacing: "-0.012em",
              }}>{post.title}</div>
              <div style={{
                fontFamily: MONO, fontSize: 10.5, color: INK_3, marginTop: 4,
                fontVariantNumeric: "tabular-nums",
              }}>{post.date} · {post.readingTime}</div>
            </li>
          ))}

          {q.trim() && (
            <li
              id={`${listId}-opt-${results.length}`}
              role="option"
              aria-selected={active === results.length}
              onMouseEnter={() => setActive(results.length)}
              onMouseDown={e => { e.preventDefault(); choose(results.length); }}
              style={{
                padding: "10px 12px", cursor: "pointer",
                background: active === results.length ? RULE_2 : "transparent",
                borderTop: results.length ? `1px solid ${RULE}` : "none",
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 12, color: RED }}>
                Search Google for “{q.trim()}” →
              </div>
              <div style={{ fontFamily: MONO, fontSize: 10.5, color: INK_3, marginTop: 4 }}>
                {results.length ? "Opens in a new tab" : "Nothing here matches. Try the open web."}
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
