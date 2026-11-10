import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { RED_EDITION as C, RED_TYPE as T } from "@/styles/signalRed";
import { newSignupId, seal } from "@/lib/sealedBox";

/**
 * SabiShield public hub (/sabishield).
 *
 * What the app does today, what is being built, what we need, and two sign-up
 * forms (beta tester, partner). Contact details are encrypted in the browser
 * to an admin key whose private half never touches a server, then posted to
 * the SabiShield Worker. Non-identifying answers travel in the clear so they
 * can be counted. The field questionnaire lives at /sabishield/survey.
 *
 * Every claim on this page is checked against the feature ledger of
 * 9 November 2026. Nothing is promised that does not run.
 */

const PAGE_URL = "https://mykei.io/sabishield";
const SIGNUP_ENDPOINT = "https://sabishield.mykei.io/api/v1/signups";

const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT (Abuja)", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara", "Outside Nigeria",
];

const WORKING: Array<[string, string]> = [
  ["One button, no sign-up", "The app opens to a record button. No account, no name, no number."],
  ["Evidence leaves the phone every 3 seconds", "Encrypted pieces upload while you record, as fast as the network allows. Pieces that have not yet uploaded when a phone is lost are lost with it; that is why they leave every few seconds."],
  ["Built so we cannot watch your recordings", "They are encrypted on your phone before they leave it, and the keys never reach our server. That is the design, and our tests check it; an independent audit has not happened yet."],
  ["A seal that shows tampering", "Every piece gets a signed receipt in a hash chain, and the sealed record is anchored with OpenTimestamps. Anyone can check the seal without seeing the video."],
  ["A seized phone cannot delete what it already sent", "Deleting an uploaded recording is locked for 30 days, even for the person holding the phone."],
  ["Guardian", "One person you trust gets the only key to your recordings, once, through a link. After that, your own phone cannot open what it recorded."],
  ["Share one recording with a lawyer", "One link opens one recording, nothing else."],
  ["Audio-only mode", "For moments when raising a phone is dangerous."],
];

const BUILDING: Array<[string, string]> = [
  ["Bad-network behaviour", "The app opens offline and failed pieces retry, but pieces not yet sent are lost if the page closes. A real fix needs testing on real Nigerian networks."],
  ["Your rights, in the law's own words", "Constitution s.34 to s.37 and ACJA s.6 to s.8 are in the app, quoted word for word from unofficial copies. They still must be checked against the Government Printer gazettes."],
  ["Evidence pack for a lawyer", "Video, signed record and facts sheet exist. The certificate wording waits for a Nigerian lawyer's sign-off."],
  ["Witness Match", "Recordings of the same incident are tagged privately so a lawyer could one day join them into one case. The joining tool is not built, and we show no live counts because counts could reveal where people are filming."],
  ["Pidgin, Yoruba, Hausa, Igbo", "Pidgin drafts are written but not yet reviewed by native speakers. The app is English only today."],
];

const PLANNED: Array<[string, string]> = [
  ["Complaint filing and case tracking", "Filing with the PSC, PPCC or NHRC and checking back at 7, 30 and 60 days. This is the heart of the idea and it is not built yet. We will run it by hand with a partner first."],
  ["Automatic alerts", "Telling your Guardian or a lawyer the moment a recording starts. Today you share links yourself."],
  ["A native Android app", "Needed for recording with the screen locked. The web app ships first so nobody waits on an app store."],
  ["Rights read aloud in 5 languages", "Needs native-speaker recordings. No machine voice we trust exists for Nigerian languages."],
  ["State laws for all 36 states and the FCT", "Federal texts are collected. State coverage starts now, priority states first."],
];

const NEEDS: Array<[string, string]> = [
  ["People who answer the questionnaire", "Three minutes, no name. It decides what gets built next."],
  ["5 to 10 beta testers", "On everyday Android phones, on real networks, in real cities. You try the app and tell us where it fails."],
  ["One human rights NGO and one lawyer", "A recording means little if it has nowhere to go. We want to take the first real cases from recording to answer, by hand, with a partner who stands behind the person filming."],
  ["Native speakers", "To review the Pidgin, Yoruba, Hausa and Igbo wording before anyone relies on it."],
];

const ROADMAP: Array<[string, string]> = [
  ["1. Listen", "Survey answers and interviews with people who have filmed police."],
  ["2. Secure the ground", "Lawyer's opinion, data protection registration, final address behind a firewall."],
  ["3. Run cases by hand", "10 to 20 real incidents from recording to complaint to answer, with one NGO and one lawyer, tracked at 7, 30 and 60 days."],
  ["4. Field-test the recorder", "Testers on low-cost Android phones in 3 cities. Evidence must survive a phone taken mid-recording."],
  ["5. Build what step 3 proved", "Lawyer intake, complaint filing helper, case tracking, the Witness Match joining tool."],
  ["6. Voice and languages", "Native-speaker recordings first, then a law guide built only on verified texts."],
  ["7. Go public carefully", "Nothing about any officer or suspect is ever published. Area-level reporting comes only after legal review."],
];

type FormState = "idle" | "sending" | "done" | "error";

const label: React.CSSProperties = { fontFamily: T.MONO, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.RED };
const h2: React.CSSProperties = { fontFamily: T.SANS, fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 500, lineHeight: 1.2, color: C.INK, margin: "0 0 10px" };
const body: React.CSSProperties = { fontFamily: T.SANS, fontSize: 16, color: C.INK_2, lineHeight: 1.65 };
const cardTitle: React.CSSProperties = { fontFamily: T.SANS, fontSize: 16, fontWeight: 600, color: C.INK, marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", minHeight: 48, padding: "0 12px", border: `1px solid ${C.INK_3}`, borderRadius: 10, background: C.GROUND, fontFamily: T.SANS, fontSize: 16, color: C.INK };
const fieldLabel: React.CSSProperties = { fontFamily: T.SANS, fontSize: 15, fontWeight: 500, color: C.INK, display: "block", marginBottom: 6 };
const fieldWrap: React.CSSProperties = { marginBottom: 18 };

function StatusList({ items }: { items: Array<[string, string]> }) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {items.map(([title, text]) => (
        <div key={title} style={{ borderLeft: `2px solid ${C.RULE}`, paddingLeft: 16 }}>
          <div style={cardTitle}>{title}</div>
          <p style={{ ...body, fontSize: 15, margin: 0 }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function chip(selected: boolean): React.CSSProperties {
  return {
    display: "flex", alignItems: "center", gap: 10, minHeight: 48, padding: "10px 14px",
    border: `${selected ? 2 : 1}px solid ${selected ? C.INK : C.RULE}`,
    background: selected ? C.TINT : C.GROUND, borderRadius: 10, cursor: "pointer",
    fontFamily: T.SANS, fontSize: 16, color: C.INK, lineHeight: 1.35,
  };
}

function Chips({ name, options, value, onPick }: { name: string; options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="sh-options" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {options.map(o => (
        <label key={o} style={chip(value === o)}>
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onPick(o)}
            style={{ width: 20, height: 20, accentColor: C.INK, flex: "0 0 auto" }} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}

/** Seals contact details in the browser, then posts the sign-up. */
async function submitSignup(
  kind: "tester" | "partner",
  fields: Record<string, string>,
  contact: Record<string, string>,
  honeypot = "",
): Promise<{ ok: boolean; ref: string; message: string }> {
  const id = newSignupId();
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) if (v.trim()) clean[k] = v.trim();
  let sealed = "";
  try {
    sealed = await seal(id, contact);
  } catch {
    return { ok: false, ref: "", message: "This browser could not encrypt your details, so nothing was sent. Please try a newer browser such as Chrome or Firefox." };
  }
  try {
    const res = await fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, kind, fields: clean, sealed, ...(honeypot ? { website: honeypot } : {}) }),
    });
    if (res.status === 201 || res.status === 409) return { ok: true, ref: id, message: "" };
    if (res.status === 429) return { ok: false, ref: "", message: "Too many sign-ups from your network right now. Please try again in an hour." };
    return { ok: false, ref: "", message: "That did not work on our side. Nothing you typed was lost; please try again in a moment." };
  } catch {
    return { ok: false, ref: "", message: "We could not reach the sign-up service. That is likely a problem on our side, not your connection. Nothing you typed was lost; please try again later." };
  }
}

/** Off-screen field real people never see; the server quietly ignores bots that fill it. */
function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Leave this field empty
        <input type="text" name="sh_extra" value={value} onChange={e => onChange(e.target.value)} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function PrivacyNote() {
  return (
    <div style={{ background: C.TINT, borderRadius: 12, padding: 18, fontFamily: T.SANS, fontSize: 14, color: C.INK_2, lineHeight: 1.65, margin: "18px 0" }}>
      <strong style={{ color: C.INK }}>How your details are handled.</strong>{" "}
      Your name and contact details are encrypted on this page, in your browser, before they are sent.
      The key that opens them is held offline by one person at Mykei Securities Ltd and is not on any
      server, so a stolen copy of the list would reveal no name and no contact detail. The other answers
      (state, phone type, role and so on) are stored readably so they can be counted; please keep names
      and numbers out of those. You will get a reference code. To be removed from the list, email
      protocol@mykei.io with that code; note that emailing us links your email address to that code.
      No analytics load when you open this page directly. If you arrive from another mykei.io page,
      the site's analytics follow the cookie choice you made there.
    </div>
  );
}

function Done({ refCode, what }: { refCode: string; what: string }) {
  return (
    <div role="status" style={{ background: C.TINT, borderRadius: 12, padding: 24 }}>
      <div style={{ ...cardTitle, fontSize: 18 }}>Thank you. You are on the {what} list.</div>
      <p style={{ ...body, fontSize: 15, margin: "8px 0 0" }}>
        Your reference is <strong style={{ fontFamily: T.MONO, color: C.INK }}>{refCode}</strong>.
        Keep it if you ever want your details removed. We will only contact you about SabiShield.
      </p>
    </div>
  );
}

function TesterForm() {
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("");
  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [reach, setReach] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [refCode, setRefCode] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!state || !phone || !reach.trim()) {
      setError("Please give your state, your phone type, and a way to reach you.");
      return;
    }
    setStatus("sending");
    setError("");
    const r = await submitSignup("tester", { state, phone, network, language, heard: "mykei.io hub" },
      { name: name.trim().slice(0, 80), reach: reach.trim().slice(0, 120) }, hp);
    if (r.ok) { setRefCode(r.ref); setStatus("done"); }
    else { setStatus("error"); setError(r.message); }
  }

  if (status === "done") return <Done refCode={refCode} what="beta tester" />;
  return (
    <form onSubmit={onSubmit} noValidate style={{ position: "relative" }}>
      <Honeypot value={hp} onChange={setHp} />
      <div style={fieldWrap}>
        <label htmlFor="t-state" style={fieldLabel}>Which state are you in?</label>
        <select id="t-state" value={state} onChange={e => setState(e.target.value)} style={inputStyle}>
          <option value="">Choose your state</option>
          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div style={fieldWrap}>
        <span style={fieldLabel}>What phone do you use?</span>
        <Chips name="t-phone" options={["Android", "iPhone", "Basic phone (no apps)"]} value={phone} onPick={setPhone} />
      </div>
      <div style={fieldWrap}>
        <span style={fieldLabel}>Which network, mostly? (optional)</span>
        <Chips name="t-network" options={["MTN", "Airtel", "Glo", "9mobile", "Other"]} value={network} onPick={setNetwork} />
      </div>
      <div style={fieldWrap}>
        <span style={fieldLabel}>Best language for you (optional)</span>
        <Chips name="t-language" options={["English", "Pidgin", "Yoruba", "Hausa", "Igbo"]} value={language} onPick={setLanguage} />
      </div>
      <div style={fieldWrap}>
        <label htmlFor="t-name" style={fieldLabel}>Your first name (optional)</label>
        <input id="t-name" value={name} onChange={e => setName(e.target.value)} maxLength={80} autoComplete="given-name" style={inputStyle} />
      </div>
      <div style={fieldWrap}>
        <label htmlFor="t-reach" style={fieldLabel}>How do we reach you? WhatsApp number or email</label>
        <input id="t-reach" value={reach} onChange={e => setReach(e.target.value)} maxLength={120} inputMode="email" style={inputStyle} />
      </div>
      {reach.trim() && (
        <p style={{ fontFamily: T.SANS, fontSize: 14, color: C.INK_2, marginBottom: 12 }}>
          We will contact you at: <strong style={{ color: C.INK }}>{reach.trim()}</strong>. Please check it, we cannot see it later to correct a mistake.
        </p>
      )}
      {error && <div role="alert" style={{ fontFamily: T.SANS, fontSize: 14, color: C.RED, marginBottom: 12 }}>{error}</div>}
      <button type="submit" disabled={status === "sending"}
        style={{ width: "100%", minHeight: 52, background: C.INK, color: C.GROUND, border: "none", borderRadius: 12, fontFamily: T.SANS, fontSize: 17, fontWeight: 500, cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.7 : 1 }}>
        {status === "sending" ? "Sending..." : "Join the beta"}
      </button>
    </form>
  );
}

function PartnerForm() {
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [help, setHelp] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [reach, setReach] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [refCode, setRefCode] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role || !reach.trim()) {
      setError("Please tell us your role and a way to reach you.");
      return;
    }
    setStatus("sending");
    setError("");
    const r = await submitSignup("partner", { role, state, help: help.slice(0, 120), heard: "mykei.io hub" },
      { name: name.trim().slice(0, 80), org: org.trim().slice(0, 80), reach: reach.trim().slice(0, 120) }, hp);
    if (r.ok) { setRefCode(r.ref); setStatus("done"); }
    else { setStatus("error"); setError(r.message); }
  }

  if (status === "done") return <Done refCode={refCode} what="partner" />;
  return (
    <form onSubmit={onSubmit} noValidate style={{ position: "relative" }}>
      <Honeypot value={hp} onChange={setHp} />
      <div style={fieldWrap}>
        <span style={fieldLabel}>Which of these are you?</span>
        <Chips name="p-role" options={["Lawyer", "Human rights NGO", "Journalist", "Community organisation", "Other"]} value={role} onPick={setRole} />
      </div>
      <div style={fieldWrap}>
        <label htmlFor="p-state" style={fieldLabel}>Which state are you in? (optional)</label>
        <select id="p-state" value={state} onChange={e => setState(e.target.value)} style={inputStyle}>
          <option value="">Choose your state</option>
          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div style={fieldWrap}>
        <label htmlFor="p-help" style={fieldLabel}>How would you like to help? (optional, one line, stored readably: no names or numbers here please)</label>
        <input id="p-help" value={help} onChange={e => setHelp(e.target.value)} maxLength={120} style={inputStyle} />
      </div>
      <div style={fieldWrap}>
        <label htmlFor="p-name" style={fieldLabel}>Your name</label>
        <input id="p-name" value={name} onChange={e => setName(e.target.value)} maxLength={80} autoComplete="name" style={inputStyle} />
      </div>
      <div style={fieldWrap}>
        <label htmlFor="p-org" style={fieldLabel}>Organisation (optional)</label>
        <input id="p-org" value={org} onChange={e => setOrg(e.target.value)} maxLength={80} autoComplete="organization" style={inputStyle} />
      </div>
      <div style={fieldWrap}>
        <label htmlFor="p-reach" style={fieldLabel}>Email or phone</label>
        <input id="p-reach" value={reach} onChange={e => setReach(e.target.value)} maxLength={120} inputMode="email" style={inputStyle} />
      </div>
      {reach.trim() && (
        <p style={{ fontFamily: T.SANS, fontSize: 14, color: C.INK_2, marginBottom: 12 }}>
          We will contact you at: <strong style={{ color: C.INK }}>{reach.trim()}</strong>. Please check it, we cannot see it later to correct a mistake.
        </p>
      )}
      {error && <div role="alert" style={{ fontFamily: T.SANS, fontSize: 14, color: C.RED, marginBottom: 12 }}>{error}</div>}
      <button type="submit" disabled={status === "sending"}
        style={{ width: "100%", minHeight: 52, background: C.INK, color: C.GROUND, border: "none", borderRadius: 12, fontFamily: T.SANS, fontSize: 17, fontWeight: 500, cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.7 : 1 }}>
        {status === "sending" ? "Sending..." : "Partner with us"}
      </button>
    </form>
  );
}

export default function SabiShieldHubPage() {
  const [tab, setTab] = useState<"tester" | "partner">("tester");

  useEffect(() => {
    document.title = "SabiShield | Mykei Securities";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "SabiShield is a free web app being built for Nigeria. One button records a police stop or street crime, and the evidence leaves the phone, sealed, within seconds. See what works today and join the beta.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = PAGE_URL;
  }, []);

  const section: React.CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "40px 40px" };

  return (
    <>
      <nav aria-label="Site navigation" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 56, padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: C.GROUND, borderBottom: `1px solid ${C.RULE}`,
      }}>
        <a href="/" style={{ fontFamily: T.MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.INK, textDecoration: "none" }}>
          Mykei Securities
        </a>
        <a href="#join" style={{ fontFamily: T.MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.RED, textDecoration: "none" }}>
          Join the beta
        </a>
      </nav>

      <main className="sh-wrap" style={{ background: C.GROUND, minHeight: "100vh", paddingTop: 80 }}>

        <section style={{ ...section, paddingTop: 48 }}>
          <div style={{ ...label, marginBottom: 18 }}>SabiShield, in testing</div>
          <h1 style={{ fontFamily: T.SANS, fontSize: "clamp(32px, 5.5vw, 52px)", fontWeight: 500, lineHeight: 1.1, color: C.INK, margin: "0 0 20px" }}>
            They can take your phone. They can't take what it already sent.
          </h1>
          <p style={{ ...body, fontSize: 18, marginBottom: 14 }}>
            SabiShield is a free web app being built for Nigeria. One button records a police stop
            or a street crime. Every 3 seconds, as the network allows, the recording leaves your
            phone, encrypted so that only the person you chose in advance can ever open it. Each
            piece gets a signed, time-stamped receipt, so anyone can later check that nothing was
            altered.
          </p>
          <p style={{ ...body, fontSize: 18, marginBottom: 14 }}>
            SabiShield is a witness, never an accuser. It never posts anything publicly and never
            names anyone. Evidence of a street crime goes to the police or a lawyer. Evidence about
            police conduct goes to the bodies that answer for it: the PSC, the PPCC or the NHRC.
          </p>
          <p style={{ ...body, fontSize: 16 }}>
            Honestly: the recorder works and is live in testing, but SabiShield has not launched.
            No lawyer has signed off on it yet, and it has not been tested on real phones in Nigeria.
            That is exactly the help we are asking for below.
          </p>
        </section>

        <section style={section}>
          <div style={{ ...label, marginBottom: 14 }}>Working today</div>
          <h2 style={h2}>Built, tested and running</h2>
          <p style={{ ...body, marginBottom: 20 }}>Everything here runs now and passes an automated test suite on every change.</p>
          <StatusList items={WORKING} />
        </section>

        <section style={section}>
          <div style={{ ...label, marginBottom: 14 }}>Being built</div>
          <h2 style={h2}>Partly done, not finished</h2>
          <StatusList items={BUILDING} />
        </section>

        <section style={section}>
          <div style={{ ...label, marginBottom: 14 }}>Planned</div>
          <h2 style={h2}>Not built yet</h2>
          <StatusList items={PLANNED} />
        </section>

        <section style={section}>
          <div style={{ ...label, marginBottom: 14 }}>What we need</div>
          <h2 style={h2}>The missing pieces are people, not code</h2>
          <StatusList items={NEEDS} />
          <div style={{ background: C.TINT, borderRadius: 12, padding: 20, marginTop: 24, fontFamily: T.SANS, fontSize: 15, color: C.INK, lineHeight: 1.6 }}>
            Not ready to sign up? The 3-minute field questionnaire needs no name at all:{" "}
            <Link to="/sabishield/survey" style={{ color: C.RED, fontWeight: 500 }}>answer it here</Link>.
          </div>
        </section>

        <section style={section}>
          <div style={{ ...label, marginBottom: 14 }}>Roadmap</div>
          <h2 style={h2}>One loop at a time</h2>
          <p style={{ ...body, marginBottom: 20 }}>
            Each step must pass a real-world test before the next one starts. Citizens never pay,
            and SabiShield never takes a share of any lawyer's fee.
          </p>
          <StatusList items={ROADMAP} />
        </section>

        <section id="join" style={{ ...section, paddingBottom: 72 }}>
          <div style={{ ...label, marginBottom: 14 }}>Sign up</div>
          <h2 style={h2}>Join the beta, or partner with us</h2>
          <PrivacyNote />
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {(["tester", "partner"] as const).map(k => (
              <button key={k} type="button" onClick={() => setTab(k)}
                aria-pressed={tab === k}
                style={{
                  flex: 1, minHeight: 48, borderRadius: 10, fontFamily: T.SANS, fontSize: 16, fontWeight: 500, cursor: "pointer",
                  border: `${tab === k ? 2 : 1}px solid ${tab === k ? C.INK : C.RULE}`,
                  background: tab === k ? C.TINT : C.GROUND, color: C.INK,
                }}>
                {k === "tester" ? "Beta tester" : "Partner"}
              </button>
            ))}
          </div>
          {/* Both forms stay mounted so switching tabs never wipes typed answers. */}
          <div style={{ display: tab === "tester" ? "block" : "none" }}><TesterForm /></div>
          <div style={{ display: tab === "partner" ? "block" : "none" }}><PartnerForm /></div>
        </section>
      </main>

      <Footer />
      <style>{`
        .sh-wrap *:focus-visible { outline: 2px solid ${C.RED}; outline-offset: 3px; border-radius: 4px; }
        @media (max-width: 640px) {
          .sh-wrap section { padding-left: 16px !important; padding-right: 16px !important; }
          .sh-options { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
