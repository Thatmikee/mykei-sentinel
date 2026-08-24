// src/components/SignalRunningHead.tsx
//
// The running head that sits on every Signal article.
//
// It exists because the articles were dead ends: a reader who landed on one
// from a search result had no way back to the magazine, no way to the company,
// and no way to find anything else we had written. That is the single most
// expensive navigation fault a publication can have, because every piece is an
// entry point.
//
// Background is transparent on purpose. These pages are not all the same
// colour, and a hard white bar would sit as a visible rectangle on the cream
// ones.

import { Link } from "react-router-dom";
import SignalSearch from "@/components/SignalSearch";
import { RED_EDITION, RED_TYPE } from "@/styles/signalRed";

const { INK, INK_2, RULE, RED } = RED_EDITION;
const { SANS, MONO } = RED_TYPE;

export default function SignalRunningHead() {
  return (
    <header style={{ borderBottom: `1px solid ${RULE}` }}>
      <style>{`
        .srh-a { text-decoration: none; color: inherit; }
        .srh-a:hover { color: ${RED}; }
        .srh-a:focus-visible { outline: 2px solid ${RED}; outline-offset: 3px; }
        @media (max-width: 700px) {
          .srh-row { flex-direction: column; align-items: stretch !important; gap: 12px !important; }
          .srh-search { width: 100% !important; }
          .srh-cta { display: none !important; }
        }
      `}</style>

      <div
        className="srh-row"
        style={{
          maxWidth: 1180, margin: "0 auto",
          padding: "12px clamp(16px,4vw,44px)",
          display: "flex", alignItems: "center", gap: 24,
        }}
      >
        <Link to="/signal" className="srh-a" aria-label="The Signal, front page" style={{ flexShrink: 0 }}>
          <span style={{
            fontFamily: SANS, fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em",
            color: RED, textTransform: "uppercase",
          }}>
            The Signal
          </span>
        </Link>

        <nav aria-label="Signal" style={{ display: "flex", gap: 18, flexShrink: 0 }}>
          {[
            ["All entries", "/signal"],
            ["Method", "/signal/masthead"],
            ["mykei.io", "/"],
          ].map(([label, to]) => (
            <Link key={to} to={to} className="srh-a">
              <span style={{
                fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.09em",
                textTransform: "uppercase", color: INK_2,
              }}>{label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        <div className="srh-search" style={{ flexShrink: 0 }}>
          <SignalSearch compact />
        </div>

        {/* The pilot call to action was on the legacy per-article nav that this
            component replaces. Carried over rather than dropped: removing a
            public call to action is an editorial decision, not a refactor. */}
        <Link to="/contact" className="srh-a srh-cta" style={{ flexShrink: 0 }}>
          <span style={{
            fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.09em",
            textTransform: "uppercase", color: INK,
            border: `1px solid ${INK}`, padding: "7px 13px", display: "inline-block",
          }}>Join the pilot</span>
        </Link>
      </div>
    </header>
  );
}
