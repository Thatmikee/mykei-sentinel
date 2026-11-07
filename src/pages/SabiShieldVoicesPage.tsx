import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { RED_EDITION as C, RED_TYPE as T } from "@/styles/signalRed";
import { useTurnstile, ENQUIRY_ENDPOINT } from "@/hooks/useTurnstile";

/**
 * SabiShield field questionnaire (/sabishield).
 *
 * Listens before building: what people on the ground in Nigeria need from an
 * evidence app, and whether they would set up a Guardian before they need one.
 *
 * Submissions go through the existing send-loi Worker's "enquiry" branch, so
 * they inherit its Turnstile check, rate limit and size cap, and arrive by
 * email to the Mykei inbox. The Worker only accepts the "pilot-loi" Turnstile
 * action, so that is what this page sends.
 *
 * Nothing here needs a name or email. A failed send is kept on the phone and
 * retried, never dropped: mobile networks in Nigeria fail often, and many users
 * share one carrier IP, which can trip the per-IP rate limit.
 */

const PAGE_URL = "https://mykei.io/sabishield";
const DRAFT_KEY = "sabishield-voices-draft-v1";
const PENDING_KEY = "sabishield-voices-pending-v1";

const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT (Abuja)", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara", "Outside Nigeria",
];

type Question = {
  id: string;
  short: string;
  title: string;
  help?: string;
  options: string[];
  max?: number;
  required?: boolean;
};

const QUESTIONS: Question[] = [
  {
    id: "move", short: "Gets around by",
    title: "How do you usually get around?",
    options: ["Okada or keke", "Danfo or bus", "My own car", "Ride-hailing (Bolt, Uber)", "On foot", "Other"],
  },
  {
    id: "stopped", short: "Asked for money by uniform (12 months)", required: true,
    title: "In the last 12 months, has someone in uniform, or someone claiming to be police, stopped you and asked for money?",
    options: ["Yes, me", "Yes, someone I was with", "No", "I'd rather not say"],
  },
  {
    id: "seen", short: "Seen on the street (12 months)", max: 6,
    title: "In the last 12 months, have you seen any of these happen on the street?",
    help: "Pick all that apply.",
    options: ["Police asking for money", "Fake police or fake officials", "Theft or \"one chance\"", "Touts forcing payment", "Someone beaten", "None of these"],
  },
  {
    id: "recorded", short: "Recorded last time",
    title: "The last time something like that happened, did you record it?",
    options: ["Yes", "I wanted to, but I was afraid", "I didn't think of it", "It hasn't happened to me"],
  },
  {
    id: "barriers", short: "Would stop me recording", max: 3,
    title: "What would stop you from recording?",
    help: "Pick up to 3.",
    options: ["Fear of being beaten or arrested", "They would take or search my phone", "Data or battery", "I don't know my rights", "Nothing would happen anyway", "Nothing, I would record"],
  },
  {
    id: "useful", short: "How useful", required: true,
    title: "How useful would SabiShield be to you?",
    options: ["Not useful", "A little", "Useful", "Very useful", "I'd use it today"],
  },
  {
    id: "guardian", short: "Would set up a Guardian", required: true,
    title: "A Guardian is one person you trust who gets a link to your recordings. Would you set one up before you ever need it?",
    options: ["Yes, straight away", "Maybe later", "No"],
  },
  {
    id: "guardianWho", short: "Guardian would be",
    title: "Who would be your Guardian?",
    options: ["Family in Nigeria", "Family abroad", "A friend", "A lawyer or NGO", "No one"],
  },
  {
    id: "match", short: "Join other recordings as one case",
    title: "If other people recorded the same incident, would you let your recording join theirs as one case, handled by a lawyer?",
    options: ["Yes", "Only if my name stays hidden", "No"],
  },
  {
    id: "location", short: "Location comfort",
    title: "Your recording could note where it was made. What are you comfortable with?",
    options: ["Exact place, locked inside my recording", "Only the general area", "No location at all"],
  },
  {
    id: "first", short: "Evidence should go first to", max: 2,
    title: "Who should get your evidence first?",
    help: "Pick up to 2.",
    options: ["My family", "A lawyer", "A human rights NGO", "A police complaints body", "A blog or social media", "No one"],
  },
  {
    id: "language", short: "Language for the law read aloud",
    title: "If the app could read the law aloud, which language would you want?",
    options: ["English", "Pidgin", "Yoruba", "Hausa", "Igbo", "Other"],
  },
  {
    id: "phoneType", short: "Phone",
    title: "What phone do you use?",
    options: ["Android", "iPhone", "Basic phone (no apps)"],
  },
];

type Answers = Record<string, string | string[]>;
type Draft = { state: string; answers: Answers; story: string; follow: boolean; contact: string; adult: boolean };
type Pending = { ref: string; phone: string; message: string };

const EMPTY: Draft = { state: "", answers: {}, story: "", follow: false, contact: "", adult: false };

function load<V>(key: string): V | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as V) : null;
  } catch {
    return null;
  }
}
function save(key: string, value: unknown) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode or full */ }
}
function drop(key: string) {
  try { window.localStorage.removeItem(key); } catch { /* ignore */ }
}

function makeRef(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return "SV-" + Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function asList(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function buildMessage(ref: string, d: Draft): string {
  const lines = [
    `Reference: ${ref}`,
    `State: ${d.state}`,
    ...QUESTIONS.map(q => `${q.short}: ${asList(d.answers[q.id]).join("; ") || "-"}`),
    `Story: ${d.story.trim() || "-"}`,
    `Follow-up consent: ${d.follow ? "yes" : "no"}`,
    `Adult confirmed: ${d.adult ? "yes" : "no"}`,
  ];
  const json = { v: 1, ref, at: new Date().toISOString(), state: d.state, answers: d.answers, story: d.story.trim(), follow: d.follow };
  return lines.join("\n") + "\nJSON: " + JSON.stringify(json);
}

const shareText = `Help shape SabiShield, a free app idea to keep evidence of police abuse and street crime safe. 3 minutes, no name needed: ${PAGE_URL}`;

export default function SabiShieldVoicesPage() {
  const { token, reset } = useTurnstile("ts-voices-container", "pilot-loi");

  const [d, setD] = useState<Draft>(EMPTY);
  const [missing, setMissing] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [doneRef, setDoneRef] = useState("");
  const [pending, setPending] = useState<Pending | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "SabiShield field questionnaire | Mykei Securities";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Three minutes, no name needed. Tell us what you need from SabiShield, an app idea to keep evidence of police abuse and street crime in Nigeria safe.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = PAGE_URL;

    const draft = load<Draft>(DRAFT_KEY);
    if (draft) setD({ ...EMPTY, ...draft });
    const p = load<Pending>(PENDING_KEY);
    if (p) setPending(p);
  }, []);

  function update(next: Draft) {
    setD(next);
    save(DRAFT_KEY, next);
  }

  function pick(q: Question, option: string) {
    const cur = asList(d.answers[q.id]);
    let value: string | string[];
    if (q.max && q.max > 1) {
      if (cur.includes(option)) value = cur.filter(o => o !== option);
      else if (cur.length >= q.max) return;
      else value = [...cur, option];
    } else {
      value = option;
    }
    update({ ...d, answers: { ...d.answers, [q.id]: value } });
    if (missing.includes(q.id)) setMissing(missing.filter(m => m !== q.id));
  }

  function validate(): string[] {
    const m: string[] = [];
    if (!d.state) m.push("state");
    for (const q of QUESTIONS) if (q.required && asList(d.answers[q.id]).length === 0) m.push(q.id);
    if (d.follow && !/^[+\d][\d\s-]{6,19}$/.test(d.contact.trim())) m.push("contact");
    if (!d.adult) m.push("adult");
    return m;
  }

  async function send(p: Pending) {
    if (!token) {
      setError("Still checking the connection. Wait a few seconds, then tap Send again.");
      return;
    }
    setSending(true);
    setError("");
    const body = new FormData();
    body.append("formType", "enquiry");
    body.append("source", "sabishield-voices");
    body.append("fullName", "SabiShield Voices respondent");
    body.append("company", "SabiShield Voices");
    body.append("email", "");
    body.append("phone", p.phone);
    body.append("message", p.message);
    body.append("cf-turnstile-response", token);
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, { method: "POST", body });
      const result = await res.json().catch(() => ({ success: false }));
      if (!res.ok || !result.success) throw new Error(String(res.status));
      drop(PENDING_KEY);
      drop(DRAFT_KEY);
      setPending(null);
      setDoneRef(p.ref);
      window.scrollTo({ top: 0 });
    } catch {
      save(PENDING_KEY, p);
      setPending(p);
      reset();
      setError("Your answers did not send. They are saved on this phone. Wait a moment, then tap Send again.");
    } finally {
      setSending(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const m = validate();
    setMissing(m);
    if (m.length) {
      setError("Please answer the questions marked in red.");
      document.getElementById(`q-${m[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const ref = pending?.ref ?? makeRef();
    const p: Pending = { ref, phone: d.follow ? d.contact.trim() : "", message: buildMessage(ref, d) };
    void send(p);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(PAGE_URL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const label: React.CSSProperties = { fontFamily: T.MONO, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.RED };
  const qTitle: React.CSSProperties = { fontFamily: T.SANS, fontSize: 18, fontWeight: 500, lineHeight: 1.45, color: C.INK, marginBottom: 6 };
  const helpText: React.CSSProperties = { fontFamily: T.SANS, fontSize: 14, color: C.INK_2, marginBottom: 14 };
  const errText: React.CSSProperties = { fontFamily: T.SANS, fontSize: 14, color: C.RED, marginTop: 8 };

  const chip = (selected: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 10, minHeight: 48, padding: "10px 14px",
    border: `${selected ? 2 : 1}px solid ${selected ? C.INK : C.RULE}`,
    background: selected ? C.TINT : C.GROUND, borderRadius: 10, cursor: "pointer",
    fontFamily: T.SANS, fontSize: 16, color: C.INK, lineHeight: 1.35,
  });

  if (doneRef) {
    return (
      <>
        <SimpleNav />
        <main style={{ background: C.GROUND, minHeight: "100vh", paddingTop: 80 }}>
          <section className="sv-wrap" style={{ maxWidth: 720, margin: "0 auto", padding: "64px 40px" }}>
            <h1 style={{ fontFamily: T.SANS, fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 500, lineHeight: 1.15, color: C.INK, marginBottom: 20 }}>
              Thank you. Your answers are in.
            </h1>
            <p style={{ fontFamily: T.SANS, fontSize: 17, color: C.INK_2, lineHeight: 1.7, marginBottom: 12 }}>
              Your reference is <strong style={{ fontFamily: T.MONO, color: C.INK }}>{doneRef}</strong>. Keep it if you ever want your answers deleted.
            </p>
            <p style={{ fontFamily: T.SANS, fontSize: 17, color: C.INK_2, lineHeight: 1.7, marginBottom: 32 }}>
              The more people answer, the better SabiShield gets. Send this to three people who move around a lot.
            </p>
            <div className="sv-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", background: C.INK, color: C.GROUND, borderRadius: 10, fontFamily: T.SANS, fontSize: 16, fontWeight: 500, textDecoration: "none" }}
              >
                Share on WhatsApp
              </a>
              <button
                type="button" onClick={copyLink}
                style={{ minHeight: 48, padding: "0 22px", background: C.GROUND, color: C.INK, border: `1px solid ${C.INK}`, borderRadius: 10, fontFamily: T.SANS, fontSize: 16, cursor: "pointer" }}
              >
                {copied ? "Link copied" : "Copy link"}
              </button>
            </div>
          </section>
        </main>
        <Footer />
        <PageStyle />
      </>
    );
  }

  return (
    <>
      <SimpleNav />
      <main style={{ background: C.GROUND, minHeight: "100vh", paddingTop: 80 }}>

        <section className="sv-wrap" style={{ maxWidth: 720, margin: "0 auto", padding: "56px 40px 40px" }}>
          <div style={{ ...label, marginBottom: 18 }}>SabiShield field questionnaire</div>
          <h1 style={{ fontFamily: T.SANS, fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 500, lineHeight: 1.12, color: C.INK, marginBottom: 18 }}>
            Help us build the app that keeps your evidence safe.
          </h1>
          <p style={{ fontFamily: T.SANS, fontSize: 18, color: C.INK_2, lineHeight: 1.6 }}>
            Three minutes, no name needed. Your answers decide what SabiShield becomes.
          </p>
        </section>

        <section className="sv-wrap" style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px 8px" }}>
          <div style={{ background: C.TINT, borderRadius: 12, padding: "24px 24px 20px" }}>
            <h2 style={{ fontFamily: T.SANS, fontSize: 18, fontWeight: 600, color: C.INK, marginBottom: 14 }}>What SabiShield would do</h2>
            <ol style={{ fontFamily: T.SANS, fontSize: 16, color: C.INK, lineHeight: 1.6, paddingLeft: 20, display: "grid", gap: 10 }}>
              <li>One button. You press record and do nothing else.</li>
              <li>Every 3 seconds the recording leaves your phone, locked so only you and the people you choose can open it. If your phone is taken, the evidence is already safe.</li>
              <li>It goes to a lawyer or to the body that must answer. It is never posted publicly, and no one is named.</li>
            </ol>
            <p style={{ fontFamily: T.SANS, fontSize: 14, color: C.INK_2, lineHeight: 1.6, marginTop: 14 }}>
              SabiShield is not built yet. It is a project of Mykei Securities Ltd, a UK company. This questionnaire is how we listen first.
            </p>
          </div>
        </section>

        {pending && (
          <section className="sv-wrap" style={{ maxWidth: 720, margin: "0 auto", padding: "24px 40px 0" }}>
            <div role="status" style={{ border: `1px solid ${C.INK}`, borderRadius: 12, padding: 18, fontFamily: T.SANS, fontSize: 15, color: C.INK, lineHeight: 1.6 }}>
              You have answers saved on this phone that did not send yet.{" "}
              <button type="button" onClick={() => void send(pending)} disabled={sending} style={{ background: "none", border: "none", padding: 0, color: C.INK, textDecoration: "underline", fontFamily: T.SANS, fontSize: 15, cursor: "pointer" }}>
                {sending ? "Sending..." : "Send them now"}
              </button>
            </div>
          </section>
        )}

        <form onSubmit={onSubmit} noValidate className="sv-wrap" style={{ maxWidth: 720, margin: "0 auto", padding: "32px 40px 72px" }}>

          <div id="q-state" style={{ padding: "28px 0", borderBottom: `1px solid ${C.RULE_2}` }}>
            <label htmlFor="sv-state" style={{ ...qTitle, display: "block" }}>Which state do you live in?</label>
            <select
              id="sv-state" value={d.state}
              onChange={e => { update({ ...d, state: e.target.value }); setMissing(missing.filter(x => x !== "state")); }}
              aria-invalid={missing.includes("state")}
              style={{ width: "100%", minHeight: 48, padding: "0 12px", marginTop: 8, border: `1px solid ${missing.includes("state") ? C.RED : C.INK_3}`, borderRadius: 10, background: C.GROUND, fontFamily: T.SANS, fontSize: 16, color: C.INK }}
            >
              <option value="">Choose your state</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {missing.includes("state") && <div style={errText}>Please choose a state.</div>}
          </div>

          {QUESTIONS.map(q => {
            const chosen = asList(d.answers[q.id]);
            const multi = !!q.max && q.max > 1;
            const isMissing = missing.includes(q.id);
            return (
              <fieldset key={q.id} id={`q-${q.id}`} style={{ border: "none", margin: 0, padding: "28px 0", borderBottom: `1px solid ${C.RULE_2}` }} aria-invalid={isMissing}>
                <legend style={{ ...qTitle, padding: 0 }}>{q.title}</legend>
                {q.help && <div style={helpText}>{q.help}</div>}
                <div className="sv-options" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: q.help ? 0 : 14 }}>
                  {q.options.map(o => {
                    const selected = chosen.includes(o);
                    return (
                      <label key={o} style={chip(selected)}>
                        <input
                          type={multi ? "checkbox" : "radio"} name={q.id} value={o}
                          checked={selected} onChange={() => pick(q, o)}
                          style={{ width: 20, height: 20, accentColor: C.INK, flex: "0 0 auto" }}
                        />
                        <span>{o}</span>
                      </label>
                    );
                  })}
                </div>
                {isMissing && <div style={errText}>Please choose an answer.</div>}
              </fieldset>
            );
          })}

          <div style={{ padding: "28px 0", borderBottom: `1px solid ${C.RULE_2}` }}>
            <label htmlFor="sv-story" style={{ ...qTitle, display: "block" }}>Anything else? (optional)</label>
            <div style={helpText}>Tell us what happened to you or someone you know, or what would make you trust an app like this. Please do not write anyone's name, including officers.</div>
            <textarea
              id="sv-story" value={d.story} maxLength={600} rows={5}
              onChange={e => update({ ...d, story: e.target.value })}
              style={{ width: "100%", padding: 12, border: `1px solid ${C.INK_3}`, borderRadius: 10, fontFamily: T.SANS, fontSize: 16, color: C.INK, lineHeight: 1.5, resize: "vertical" }}
            />
            <div style={{ fontFamily: T.MONO, fontSize: 12, color: C.INK_3, marginTop: 6 }}>{d.story.length} / 600</div>
          </div>

          <div id="q-contact" style={{ padding: "28px 0", borderBottom: `1px solid ${C.RULE_2}` }}>
            <label style={{ ...chip(d.follow), maxWidth: "100%" }}>
              <input
                type="checkbox" checked={d.follow}
                onChange={e => update({ ...d, follow: e.target.checked })}
                style={{ width: 20, height: 20, accentColor: C.INK, flex: "0 0 auto" }}
              />
              <span>You can contact me for a 15-minute chat about this. (optional)</span>
            </label>
            {d.follow && (
              <div style={{ marginTop: 14 }}>
                <label htmlFor="sv-contact" style={{ fontFamily: T.SANS, fontSize: 15, color: C.INK, display: "block", marginBottom: 6 }}>WhatsApp or phone number, with country code</label>
                <input
                  id="sv-contact" type="tel" inputMode="tel" autoComplete="tel" value={d.contact}
                  onChange={e => update({ ...d, contact: e.target.value })}
                  aria-invalid={missing.includes("contact")}
                  placeholder="+234 801 234 5678"
                  style={{ width: "100%", minHeight: 48, padding: "0 12px", border: `1px solid ${missing.includes("contact") ? C.RED : C.INK_3}`, borderRadius: 10, fontFamily: T.SANS, fontSize: 16, color: C.INK }}
                />
                <div style={helpText}>We use it only for this chat and delete it afterwards.</div>
                {missing.includes("contact") && <div style={errText}>Please enter a number we can reach, or untick the box.</div>}
              </div>
            )}
          </div>

          <div id="q-adult" style={{ padding: "28px 0" }}>
            <label style={{ ...chip(d.adult), maxWidth: "100%", borderColor: missing.includes("adult") ? C.RED : (d.adult ? C.INK : C.RULE) }}>
              <input
                type="checkbox" checked={d.adult}
                onChange={e => { update({ ...d, adult: e.target.checked }); setMissing(missing.filter(x => x !== "adult")); }}
                style={{ width: 20, height: 20, accentColor: C.INK, flex: "0 0 auto" }}
              />
              <span>I am 18 or older.</span>
            </label>
            {missing.includes("adult") && <div style={errText}>This questionnaire is for adults only.</div>}
          </div>

          <div style={{ background: C.TINT, borderRadius: 12, padding: 20, fontFamily: T.SANS, fontSize: 14, color: C.INK_2, lineHeight: 1.65, marginBottom: 24 }}>
            <strong style={{ color: C.INK }}>How we handle your answers.</strong> No name or email is needed. Your answers are emailed to the Mykei Securities team and used only to design SabiShield. We report results only as totals, never one person's answers. To have yours deleted, email protocol@mykei.io with the reference you get after sending.
          </div>

          <div id="ts-voices-container" />

          {error && <div role="alert" style={{ ...errText, fontSize: 15, marginBottom: 14 }}>{error}</div>}

          <button
            type="submit" disabled={sending}
            style={{ width: "100%", minHeight: 56, background: C.INK, color: C.GROUND, border: "none", borderRadius: 12, fontFamily: T.SANS, fontSize: 18, fontWeight: 500, cursor: sending ? "wait" : "pointer", opacity: sending ? 0.7 : 1 }}
          >
            {sending ? "Sending..." : "Send my answers"}
          </button>
        </form>
      </main>

      <Footer />
      <PageStyle />
    </>
  );
}

function SimpleNav() {
  return (
    <nav aria-label="Site navigation" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 56, padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: C.GROUND, borderBottom: `1px solid ${C.RULE}`,
    }}>
      <a href="/" style={{ fontFamily: T.MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.INK, textDecoration: "none" }}>
        Mykei Securities
      </a>
      <span style={{ fontFamily: T.MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.INK_2 }}>
        SabiShield
      </span>
    </nav>
  );
}

function PageStyle() {
  return (
    <style>{`
      .sv-wrap *:focus-visible { outline: 2px solid ${C.RED}; outline-offset: 3px; border-radius: 4px; }
      @media (max-width: 640px) {
        .sv-wrap { padding-left: 16px !important; padding-right: 16px !important; }
        .sv-options { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}
