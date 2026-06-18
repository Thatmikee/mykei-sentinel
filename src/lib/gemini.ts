/**
 * Calls /api/assess (Cloudflare Worker) — Gemini key stays server-side.
 * VITE_GEMINI_KEY is no longer needed and should be removed from .env files.
 */
export const runIntakeAssessment = async (rawQuery: string): Promise<string> => {
  const res = await fetch("/api/assess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: rawQuery }),
  });

  if (!res.ok) throw new Error("Assessment service unavailable");
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text ?? "";
};
