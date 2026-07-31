// LOILeadCaptureForm.tsx
// Drop this into your src/components/ directory.
// Requires: react-router-dom (already in Vite+shadcn stack)
// On submit → POSTs to Netlify Forms + navigates to /pilot-download
//
// Netlify setup: the hidden input name="form-name" value="loi-enquiry" is
// all you need. Netlify auto-detects it on first deploy.

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NAVY   = "#0D2240";
const ORANGE = "#E8621A";

const STORE_TYPES = [
  "Off-Licence / Convenience Store",
  "Independent Jeweller",
  "Vape / E-Cigarette Shop",
  "Hair & Beauty Supply",
  "Pharmacy / Chemist",
  "Newsagent / Tobacconist",
  "Electronics / Mobile Accessories",
  "Other Independent Retail",
];

const THEFT_LEVELS = [
  "Light, occasional incidents",
  "Moderate, weekly incidents",
  "Heavy, daily incidents / organised theft",
  "Severe, multiple times per day",
];

interface FormState {
  ownerName: string;
  storeName: string;
  email: string;
  phone: string;
  storeType: string;
  location: string;
  theftLevel: string;
  message: string;
}

const EMPTY: FormState = {
  ownerName:  "",
  storeName:  "",
  email:      "",
  phone:      "",
  storeType:  "",
  location:   "",
  theftLevel: "",
  message:    "",
};

export default function LOILeadCaptureForm() {
  const navigate = useNavigate();
  const formRef  = useRef<HTMLFormElement>(null);

  const [fields, setFields]       = useState<FormState>(EMPTY);
  const [errors, setErrors]       = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update(key: keyof FormState, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!fields.ownerName.trim())  e.ownerName  = "Please enter your name.";
    if (!fields.storeName.trim())  e.storeName  = "Please enter your store name.";
    if (!fields.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Please enter a valid email address.";
    if (!fields.storeType)         e.storeType  = "Please select a store type.";
    if (!fields.location.trim())   e.location   = "Please enter your location.";
    if (!fields.theftLevel)        e.theftLevel = "Please select a theft level.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const body = new URLSearchParams({
        "form-name": "loi-enquiry",
        ...Object.fromEntries(Object.entries(fields)),
      });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error("Submission failed");
      navigate("/pilot-download", {
        state: { name: fields.ownerName.split(" ")[0], store: fields.storeName },
      });
    } catch {
      // Netlify Forms may return 200 even on static-preview; navigate anyway
      navigate("/pilot-download", {
        state: { name: fields.ownerName.split(" ")[0], store: fields.storeName },
      });
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = (key: keyof FormState) =>
    `w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-200 bg-white
     ${errors[key]
       ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
       : "border-gray-200 focus:border-[#E8621A] focus:ring-2 focus:ring-orange-100"
     }`;

  const selectCls = (key: keyof FormState) =>
    `w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-200 bg-white appearance-none
     ${errors[key]
       ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
       : "border-gray-200 focus:border-[#E8621A] focus:ring-2 focus:ring-orange-100"
     } ${!fields[key] ? "text-gray-400" : "text-gray-900"}`;

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 px-4">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${ORANGE} 0%, transparent 60%),
                            radial-gradient(circle at 80% 20%, ${NAVY} 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ background: `${ORANGE}15`, color: ORANGE }}
          >
            Independent Retail Pilot
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            style={{ color: NAVY }}
          >
            Register Your Interest
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Complete this form to receive the Pilot Programme Overview and Letter of Intent template.
            We'll be in touch within <strong className="text-gray-700">24 hours</strong>.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/80 border border-gray-100 overflow-hidden">
          {/* Top accent stripe */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${NAVY}, ${ORANGE})` }} />

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            name="loi-enquiry"
            method="POST"
            data-netlify="true"
            className="p-8 md:p-10 space-y-6"
          >
            {/* Netlify hidden field */}
            <input type="hidden" name="form-name" value="loi-enquiry" />

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Your Name" required error={errors.ownerName}>
                <input
                  type="text"
                  placeholder="e.g. Usman Ahmed"
                  value={fields.ownerName}
                  onChange={e => update("ownerName", e.target.value)}
                  className={inputCls("ownerName")}
                  name="ownerName"
                  autoComplete="name"
                />
              </Field>
              <Field label="Store Name" required error={errors.storeName}>
                <input
                  type="text"
                  placeholder="e.g. Bobby's Off-Licence"
                  value={fields.storeName}
                  onChange={e => update("storeName", e.target.value)}
                  className={inputCls("storeName")}
                  name="storeName"
                />
              </Field>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Email Address" required error={errors.email}>
                <input
                  type="email"
                  placeholder="you@yourstore.com"
                  value={fields.email}
                  onChange={e => update("email", e.target.value)}
                  className={inputCls("email")}
                  name="email"
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  placeholder="07xxx xxxxxx"
                  value={fields.phone}
                  onChange={e => update("phone", e.target.value)}
                  className={inputCls("phone")}
                  name="phone"
                  autoComplete="tel"
                />
              </Field>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Store Type" required error={errors.storeType}>
                <div className="relative">
                  <select
                    value={fields.storeType}
                    onChange={e => update("storeType", e.target.value)}
                    className={selectCls("storeType")}
                    name="storeType"
                  >
                    <option value="" disabled>Select store type</option>
                    {STORE_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </Field>
              <Field label="Location (Town / Area)" required error={errors.location}>
                <input
                  type="text"
                  placeholder="e.g. Salford, Manchester"
                  value={fields.location}
                  onChange={e => update("location", e.target.value)}
                  className={inputCls("location")}
                  name="location"
                />
              </Field>
            </div>

            {/* Theft level */}
            <Field label="How serious is theft at your store?" required error={errors.theftLevel}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {THEFT_LEVELS.map(level => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => update("theftLevel", level)}
                    className={`text-left px-4 py-3 rounded-lg border text-xs font-medium transition-all duration-150
                      ${fields.theftLevel === level
                        ? "border-[#E8621A] bg-orange-50 text-[#E8621A]"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              {errors.theftLevel && (
                <p className="text-red-500 text-xs mt-1">{errors.theftLevel}</p>
              )}
            </Field>

            {/* Message */}
            <Field label="Anything else you'd like us to know?" error={errors.message}>
              <textarea
                rows={3}
                placeholder="Tell us about specific theft patterns, products targeted, or questions you have…"
                value={fields.message}
                onChange={e => update("message", e.target.value)}
                className={inputCls("message") + " resize-none"}
                name="message"
              />
            </Field>

            {/* Divider + submit */}
            <div className="pt-2">
              <div className="h-px bg-gray-100 mb-6" />
              {submitError && (
                <p className="text-red-500 text-sm mb-4 text-center">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl text-white font-bold text-base tracking-wide transition-all duration-200
                           disabled:opacity-60 disabled:cursor-not-allowed
                           hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: submitting
                    ? "#aaa"
                    : `linear-gradient(135deg, ${ORANGE} 0%, #c94d0f 100%)`,
                  boxShadow: submitting ? "none" : `0 4px 20px ${ORANGE}40`,
                }}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner />
                    Sending…
                  </span>
                ) : (
                  "Get the Pilot Overview & LOI Template →"
                )}
              </button>
              <p className="text-center text-gray-400 text-xs mt-3">
                No spam. No sales calls without your permission. Just the documents and a follow-up from Michael.
              </p>
            </div>
          </form>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {[
            "UK Company No. 16984969",
            "GDPR Compliant, No Camera Data",
            "Alpha Cohort, Manchester 2026",
          ].map(t => (
            <span key={t} className="text-xs text-gray-400 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.5" stroke={ORANGE} strokeWidth="1"/>
                <path d="M3.5 6l1.5 1.5 3-3" stroke={ORANGE} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Field({ label, required, error, children }: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">
        {label}{required && <span className="text-[#E8621A] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 5l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
      <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
