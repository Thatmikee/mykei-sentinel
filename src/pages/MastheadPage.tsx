// src/pages/MastheadPage.tsx
// The Signal · Masthead, editorial standards and corrections policy.
//
// This page is what separates a magazine from a company blog. It states who
// publishes, how sourcing works, what the evidence grades mean, and how we
// correct ourselves. It is deliberately plain.

import PageSEO from "@/components/PageSEO";

const INK = "#0F0C08";
const TEAL = "#0D9488";
const PAPER = "#FAFAF6";
const MUTED = "#6B5E4A";
const RULE = "#DDD5C4";
const WHITE = "#FFFFFF";

const mono = "'JetBrains Mono',monospace";
const serif = "'Playfair Display',Georgia,serif";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: mono,
        fontSize: 9,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: TEAL,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: serif,
        fontSize: "clamp(22px,3vw,30px)",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        color: INK,
        margin: "0 0 18px",
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 16.5, lineHeight: 1.85, color: "#3F3A32", margin: "0 0 20px" }}>
      {children}
    </p>
  );
}

const GRADES: { grade: string; meaning: string }[] = [
  {
    grade: "Primary",
    meaning:
      "Official statistics, legislation, court records, regulator publications, or a named organisation reporting on itself. Cited with a link.",
  },
  {
    grade: "Independent",
    meaning:
      "Peer-reviewed research, randomised or quasi-experimental evaluation, or analysis by a body with no commercial stake in the finding.",
  },
  {
    grade: "Industry",
    meaning:
      "Trade association surveys and vendor-sponsored research. Useful, directional, and named as such. We say who paid for it.",
  },
  {
    grade: "Single-source",
    meaning:
      "Reported once and not corroborated. Marked in the text. We would rather flag it than drop it or pretend it is settled.",
  },
  {
    grade: "Sentiment",
    meaning:
      "Forum posts, social media, and anecdote. Evidence of what people believe and experience. Never presented as a statistic.",
  },
];

export default function MastheadPage() {
  return (
    <div style={{ background: PAPER, minHeight: "100vh", color: INK }}>
      <PageSEO
        title="Masthead and Editorial Standards | The Signal"
        description="Who publishes The Signal, how we source and grade evidence, and how we correct ourselves when we get something wrong."
        canonical="https://mykei.io/signal/masthead"
        breadcrumbs={[
          ["Home", "https://mykei.io"],
          ["The Signal", "/signal"],
          ["Masthead", "/signal/masthead"],
        ]}
      />

      {/* Masthead header */}
      <header style={{ background: WHITE, borderBottom: `2px solid ${INK}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px clamp(16px,4vw,48px) 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: RULE }} />
            <span
              style={{
                fontFamily: mono,
                fontSize: 8,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: MUTED,
                whiteSpace: "nowrap",
              }}
            >
              The Signal
            </span>
            <div style={{ flex: 1, height: 1, background: RULE }} />
          </div>

          <h1
            style={{
              fontFamily: serif,
              fontSize: "clamp(36px,6vw,60px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              textAlign: "center",
              margin: "0 0 20px",
            }}
          >
            Masthead &amp; Editorial Standards
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: MUTED,
              textAlign: "center",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            The Signal is a research publication about the economics of retail theft. It is
            published by a company that also builds security hardware. That is a conflict of
            interest, so this page explains how we handle it.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "56px clamp(16px,4vw,48px) 96px" }}>
        {/* Who */}
        <section style={{ marginBottom: 56 }}>
          <Label>Who publishes this</Label>
          <H2>The Signal is published by Mykei Securities Ltd.</H2>
          <P>
            Mykei Securities Ltd is a company registered in England and Wales, number 16984969.
            Michael Esema is the founder and writes most of what appears here. There is no separate
            editorial staff, and pretending otherwise would be the first dishonest thing on the page.
          </P>
          <P>
            Mykei develops the ADN, a forensic retail security device. We write about a market we
            intend to sell into. Every reader should apply the discount that deserves. What we can
            offer in return is that our sourcing is visible, our corrections are public, and we
            publish findings that cut against our own commercial interest when we find them.
          </P>
        </section>

        {/* Sourcing */}
        <section style={{ marginBottom: 56 }}>
          <Label>How we grade evidence</Label>
          <H2>Not all numbers are the same, so we label them.</H2>
          <P>
            Retail crime reporting has a specific failure mode: a vendor-sponsored survey becomes a
            trade-press headline, becomes a policy submission, becomes a fact. In 2023 a widely
            repeated claim held that organised retail crime accounted for half of all retail losses.
            It was later withdrawn. A great deal of policy had already been built on it.
          </P>
          <P>
            To avoid contributing to that, we grade sources in the text using these categories.
          </P>

          <div style={{ border: `1px solid ${RULE}`, background: WHITE }}>
            {GRADES.map((g, i) => (
              <div
                key={g.grade}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(110px,1fr) 3fr",
                  gap: 16,
                  padding: "16px 18px",
                  borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
                }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: TEAL,
                    paddingTop: 3,
                  }}
                >
                  {g.grade}
                </div>
                <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "#3F3A32" }}>{g.meaning}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Corrections */}
        <section style={{ marginBottom: 56 }}>
          <Label>Corrections policy</Label>
          <H2>We correct in public, on the page, with a date.</H2>
          <P>
            When a piece turns out to be wrong, or the world moves underneath it, we add a dated note
            to the article itself rather than editing the text quietly. Three kinds of note appear:
          </P>
          <ul style={{ margin: "0 0 20px", paddingLeft: 22 }}>
            <li style={{ fontSize: 16, lineHeight: 1.85, color: "#3F3A32", marginBottom: 10 }}>
              <strong>Correction.</strong> We stated something that was not true. The original text
              stays visible so the error is legible.
            </li>
            <li style={{ fontSize: 16, lineHeight: 1.85, color: "#3F3A32", marginBottom: 10 }}>
              <strong>Since publication.</strong> A figure has been overtaken by newer data.
            </li>
            <li style={{ fontSize: 16, lineHeight: 1.85, color: "#3F3A32" }}>
              <strong>Updated.</strong> The legal or factual ground shifted and the piece needs
              reframing, even though its argument stands.
            </li>
          </ul>
          <P>
            We do not delete published pieces. If an article becomes indefensible we mark it as
            withdrawn and say why, leaving it up.
          </P>
          <P>
            To report an error, write to{" "}
            <a href="mailto:hello@mykei.io" style={{ color: TEAL, textDecoration: "underline" }}>
              hello@mykei.io
            </a>{" "}
            with the article and the specific claim. Corrections are made without argument where the
            evidence is clear.
          </P>
        </section>

        {/* Claim discipline */}
        <section style={{ marginBottom: 56 }}>
          <Label>What we will not do</Label>
          <H2>Rules we hold ourselves to.</H2>
          <ul style={{ margin: 0, paddingLeft: 22 }}>
            {[
              "We do not describe products as deployed, piloted, or certified before they are.",
              "We do not quote a statistic without naming who produced it and who funded it.",
              "We do not present a rising second-hand market as proof of stolen-goods volume. No study establishes that link, and we are not going to imply one.",
              "We do not treat enforcement successes as failures because they are inconvenient to our argument.",
              "We do not use a customer's name, logo, or quote without written permission.",
            ].map((line) => (
              <li
                key={line}
                style={{ fontSize: 16, lineHeight: 1.85, color: "#3F3A32", marginBottom: 12 }}
              >
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/* Colophon */}
        <section
          style={{
            borderTop: `2px solid ${INK}`,
            paddingTop: 28,
          }}
        >
          <Label>Colophon</Label>
          <P>
            Set in Playfair Display and JetBrains Mono. Built with React and Vite, deployed on
            Cloudflare Pages. Published from Manchester, United Kingdom.
          </P>
          <p
            style={{
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: "0.1em",
              color: MUTED,
              margin: 0,
            }}
          >
            Mykei Securities Ltd · Company 16984969 · England and Wales
          </p>
        </section>
      </main>
    </div>
  );
}
