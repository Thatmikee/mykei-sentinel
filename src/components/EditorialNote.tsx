/**
 * EditorialNote — dated editorial apparatus for Signal articles.
 *
 * Three kinds:
 *   "update"     — the world changed after publication; the piece still stands
 *   "correction" — we got something wrong and have fixed it
 *   "context"    — a figure has been superseded; we are showing the current one
 *
 * Every note carries a date. A magazine that never visibly corrects itself
 * is not trusted; one that corrects itself in public is.
 */

type NoteKind = "update" | "correction" | "context";

const KIND_LABEL: Record<NoteKind, string> = {
  update: "Updated",
  correction: "Correction",
  context: "Since publication",
};

const KIND_ACCENT: Record<NoteKind, string> = {
  update: "#0D9488",
  correction: "#B3261E",
  context: "#6B5E4A",
};

interface EditorialNoteProps {
  kind?: NoteKind;
  /** ISO date the note was added, e.g. "2026-08-18" */
  date: string;
  children: React.ReactNode;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EditorialNote({
  kind = "context",
  date,
  children,
}: EditorialNoteProps) {
  const accent = KIND_ACCENT[kind];

  return (
    <aside
      role="note"
      aria-label={`${KIND_LABEL[kind]} ${formatDate(date)}`}
      style={{
        borderLeft: `3px solid ${accent}`,
        background: "#FAFAF6",
        padding: "16px 20px",
        margin: "32px 0",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 9,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: accent,
          marginBottom: 8,
        }}
      >
        {KIND_LABEL[kind]} · {formatDate(date)}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.75, color: "#3F3A32" }}>
        {children}
      </div>
    </aside>
  );
}
