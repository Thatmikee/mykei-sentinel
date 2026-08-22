import { useState, useRef, useEffect, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string, opts: Record<string, unknown>) => string;
      execute: (widgetId: string) => void;
    };
  }
}
import { jsPDF } from "jspdf";
import mikeSigUrl from "@/assets/mike_signature.png";
import { commercialTerms } from "@/data/commercialTerms";

const TURNSTILE_SITE_KEY = "0x4AAAAAADLhkxAX0ez1A7Za";

const DARK   = "#1C120A";
const GOLD   = "#D8001F";
const CREAM   = "#FFFFFF";   // page ground
const ONDARK  = "#F7F8FA";   // light type on ink blocks
const PANEL   = "#F4F6F8";   // boxed fills that must read on white
const SAND   = "#EDE5D8";
const MUTED  = "#767D88";

// Input validation
const sanitise  = (v: string) => v.replace(/[<>"'`;]/g, "").trim();
const isEmail   = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone   = (v: string) => v === "" || /^[\d\s+\-()]{7,20}$/.test(v);
const isPostal  = (v: string) => /[a-z0-9]/i.test(v) && v.length >= 5;
const isAmount  = (v: string) => v === "" || /^[\d,£\s]+$/.test(v);

function validate(form: typeof EMPTY_FORM, step: number) {
  const e: Record<string, string> = {};
  if (step >= 1) {
    if (!sanitise(form.fullName))     e.fullName    = "Full name is required.";
    if (!sanitise(form.storeName))    e.storeName   = "Store name is required.";
    if (!isPostal(form.storeAddress)) e.storeAddress = "Enter a full address including postcode.";
  }
  if (step >= 2) {
    if (!isEmail(form.email))         e.email       = "Enter a valid email address.";
    if (!isPhone(form.phone))         e.phone       = "Enter a valid phone number.";
    if (!form.storeType)              e.storeType   = "Select your store type.";
    if (!form.theftLoss)              e.theftLoss   = "Annual theft loss estimate is required.";
    else if (!isAmount(form.theftLoss)) e.theftLoss = "Enter numbers only (e.g. 5000).";
  }
  return e;
}

const EMPTY_FORM = { fullName: "", storeName: "", storeAddress: "", email: "", phone: "", storeType: "", theftLoss: "", agreed: false };

export default function Pilot() {
  const [step, setStep]           = useState(1);
  const [signed, setSigned]       = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [form, setForm]           = useState(EMPTY_FORM);
  const [mikeSigData, setMikeSigData] = useState<string>("");
  const [tsToken, setTsToken]     = useState<string>("");
  const awaitingTs                = useRef<boolean>(false);
  const tsWidgetId                = useRef<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing   = useRef(false);
  const lastPos   = useRef<{ x: number; y: number } | null>(null);

  // Pre-load Michael's signature as a data URL for reliable jsPDF embedding
  useEffect(() => {
    fetch(mikeSigUrl)
      .then(r => r.blob())
      .then(blob => new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      }))
      .then(setMikeSigData)
      .catch(() => {/* silently fail, PDF will still generate without pre-sig */});
  }, []);

  // Turnstile invisible widget
  const onTsSuccess = useCallback((token: string) => {
    setTsToken(token);
    if (awaitingTs.current) {
      awaitingTs.current = false;
      setTimeout(handleSubmit, 0);
    }
  }, []);
  useEffect(() => {
    const existing = document.getElementById("cf-turnstile-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id  = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    const render = () => {
      if (window.turnstile && !tsWidgetId.current) {
        tsWidgetId.current = window.turnstile.render("#ts-container", {
          sitekey: TURNSTILE_SITE_KEY,
          size: "invisible",
          action: "pilot-loi",
          callback: onTsSuccess,
        });
      }
    };
    if (window.turnstile) { render(); }
    else { window.addEventListener("cf-turnstile-loaded", render); }
    return () => window.removeEventListener("cf-turnstile-loaded", render);
  }, [onTsSuccess]);

  // Signature pad
  const getPos = (e: MouseEvent & TouchEvent, canvas: HTMLCanvasElement) => {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - rect.left) * scaleX, y: (cy - rect.top) * scaleY };
  };
  const startDraw = (e: MouseEvent & TouchEvent) => { e.preventDefault(); drawing.current = true; lastPos.current = getPos(e, canvasRef.current!); };
  const draw      = (e: MouseEvent & TouchEvent) => {
    e.preventDefault();
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.strokeStyle = DARK; ctx.lineWidth = 2.2; ctx.lineCap = "round";
    const pos = getPos(e, canvasRef.current!);
    ctx.beginPath(); ctx.moveTo(lastPos.current!.x, lastPos.current!.y); ctx.lineTo(pos.x, pos.y); ctx.stroke();
    lastPos.current = pos;
    setSigned(true);
  };
  const endDraw  = () => { drawing.current = false; };
  const clearSig = () => { canvasRef.current!.getContext("2d")!.clearRect(0, 0, 460, 120); setSigned(false); };
  const update   = (k: string, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: typeof v === "string" ? sanitise(v) : v }));
    setErrors(prev => { const n = { ...prev }; delete n[k]; return n; });
  };

  const goStep = (next: number) => {
    const errs = validate(form, step);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(next);
  };

  // Submit to Formspree
  const handleSubmit = async () => {
    if (submitting || !signed || !form.agreed) return;
    const errs = validate(form, 3);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Ensure Turnstile token is present, then auto-resubmit once token arrives
    if (!tsToken) {
      if (!awaitingTs.current && tsWidgetId.current !== null && window.turnstile) {
        awaitingTs.current = true;
        window.turnstile.execute(tsWidgetId.current);
      }
      return;
    }
    awaitingTs.current = false;

    setSubmitting(true);

    // PDF generation (unchanged)
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, M = 20; let y = 18;
    doc.setFontSize(13); doc.setFont("helvetica", "bold");
    doc.text("MYKEI SECURITIES LTD", M, y); y += 5.5;
    doc.setFontSize(8.5); doc.setFont("helvetica", "normal");
    doc.text("Company No. 16984969", M, y); y += 4;
    doc.text("protocol@mykei.io  ·  07985151551", M, y); y += 4;
    doc.text("www.mykei.io  ·  Prestwich, Manchester", M, y); y += 10;
    doc.setFontSize(22); doc.setFont("helvetica", "bold");
    doc.text("LETTER OF INTENT", M, y);
    doc.setFontSize(10); doc.setFont("helvetica", "normal");
    doc.text("Independent Retail Pilot  ·  2026", W - M, y, { align: "right" });
    y += 7; doc.setLineWidth(0.4); doc.line(M, y, W - M, y); y += 8;
    doc.setFontSize(10); doc.setFont("helvetica", "bold");
    doc.text("RETAILER DETAILS", M, y); y += 7;
    const half = (W - M * 2) / 2; const c2 = M + half + 5;
    const field = (label: string, value: string, x: number, yy: number, w = half - 5) => {
      doc.setFontSize(7.5); doc.setFont("helvetica", "normal");
      doc.setTextColor(110); doc.text(label, x, yy); doc.setTextColor(0);
      doc.setFontSize(11); doc.setFont("helvetica", "bold");
      doc.text(value || "N/A", x, yy + 6);
      doc.setLineWidth(0.25); doc.line(x, yy + 8, x + w, yy + 8);
    };
    field("FULL NAME", form.fullName, M, y);
    field("STORE / BUSINESS NAME", form.storeName, c2, y); y += 16;
    doc.setFontSize(7.5); doc.setFont("helvetica", "normal"); doc.setTextColor(110);
    doc.text("STORE ADDRESS (INCLUDING POSTCODE)", M, y); doc.setTextColor(0);
    doc.setFontSize(11); doc.setFont("helvetica", "bold");
    doc.text(form.storeAddress, M, y + 6);
    doc.setLineWidth(0.25); doc.line(M, y + 8, W - M, y + 8); y += 16;
    field("EMAIL ADDRESS", form.email, M, y);
    field("PHONE NUMBER", form.phone || "N/A", c2, y); y += 16;
    field("STORE TYPE", form.storeType, M, y);
    field("ESTIMATED ANNUAL THEFT LOSS (APPROX. £)", form.theftLoss || "N/A", c2, y); y += 18;
    doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(0);
    doc.text("DECLARATION OF INTENT", M, y); y += 6;
    doc.setFontSize(9.5); doc.setFont("helvetica", "normal");
    const introLines = doc.splitTextToSize(`I, the undersigned, acting on behalf of the business named above, hereby confirm our intent to participate in the Mykei Securities Ltd ADN Independent Retail Pilot. This constitutes a formal expression of commercial interest.`, W - M * 2);
    doc.text(introLines, M, y); y += introLines.length * 5 + 6;

    // Commercial terms block
    doc.setFontSize(7.5); doc.setFont("helvetica", "normal"); doc.setTextColor(150);
    doc.text("COMMERCIAL TERMS", M, y); y += 5;
    doc.setTextColor(0); doc.setFontSize(9.5); doc.setFont("helvetica", "normal");
    doc.text(`${commercialTerms.pdfRows[0].value}  \u00b7  Minimum term ${commercialTerms.pdfRows[1].value}`, M, y); y += 5;
    doc.setFontSize(8.5); doc.setTextColor(110);
    doc.text("No fixed pricing published. Terms confirmed directly with Mykei before pilot start.", M, y); y += 4;
    doc.setTextColor(0); doc.setLineWidth(0.2); doc.line(M, y, W - M, y); y += 7;

    for (const [label, text] of [
      ["Pilot Commitment:", "Not a legally binding letter of intent."],
      ["The ADN System:", "Non-visual Time-of-Flight sensors detect defined shelf events. Controlled marker deployment is subject to supplier specification, SDS/COSHH review, and deployment environment review."],
      ["Economic Sterilisation:", "Marker deployment events are linked to device, location, timestamp, and cartridge reference in the Mykei Registry to support verification workflows."],
      ["No Obligation:", "No obligation to continue after the 3-month pilot period."],
    ] as [string, string][]) {
      doc.setFont("helvetica", "bold"); doc.setFontSize(9.5);
      const lw = doc.getTextWidth(label) + 2; doc.text(label, M, y);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, W - M * 2 - lw);
      doc.text(lines, M + lw, y); y += lines.length * 5 + 3;
    }
    y += 5;
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.text("AUTHORISATION", M, y); y += 7;

    const sigBlockY = y;
    const col1W = (W - M * 2) / 2 - 5;
    const col2X = M + col1W + 10;
    const col2W = W - M - col2X;

    doc.setFontSize(7.5); doc.setFont("helvetica", "normal"); doc.setTextColor(110);
    doc.text("RETAILER SIGNATURE", M, sigBlockY);
    doc.text("FOR: MYKEI SECURITIES LTD.", col2X, sigBlockY);
    doc.setTextColor(0);

    const sigData = canvasRef.current?.toDataURL("image/png");
    if (sigData && signed) doc.addImage(sigData, "PNG", M, sigBlockY + 3, col1W, 20);
    if (mikeSigData) doc.addImage(mikeSigData, "PNG", col2X, sigBlockY + 1, col2W, 22, undefined, "FAST");

    y = sigBlockY + 26;
    doc.setLineWidth(0.25);
    doc.line(M, y, M + col1W, y);
    doc.line(col2X, y, W - M, y);
    y += 5;
    doc.setFontSize(8.5); doc.setFont("helvetica", "normal"); doc.setTextColor(80);
    const today = new Date().toLocaleDateString("en-GB");
    const retailerName = form.fullName || "Retailer";
    doc.text(retailerName, M, y);
    doc.text("Michael Esema  ·  Director", col2X, y); y += 4;
    doc.text(`Date: ${today}`, M, y);
    doc.text("Mykei Securities Ltd  ·  Co. No. 16984969", col2X, y);
    doc.setLineWidth(0.25); doc.line(M, 276, W - M, 276);
    doc.setFontSize(7.5); doc.setTextColor(80);
    doc.text("Return to: protocol@mykei.io", M, 280);
    doc.text("Mykei Securities Ltd  ·  Co. No. 16984969  ·  Prestwich, Manchester", M, 284);
    const pdfBlob = doc.output("blob");
    const pdfFile = new File([pdfBlob], `LOI_${form.storeName.replace(/\s+/g, "_")}.pdf`, { type: "application/pdf" });

    try {
      const formData = new FormData();
      formData.append('fullName', form.fullName);
      formData.append('storeName', form.storeName);
      formData.append('storeAddress', form.storeAddress);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('storeType', form.storeType);
      formData.append('theftLoss', form.theftLoss);
      formData.append('attachment', pdfFile);
      formData.append('cf-turnstile-response', tsToken);

      const res = await fetch('https://send-loi.michaelesema.workers.dev', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        console.error('Worker returned error:', result);
        setErrors({ submit: 'Submission failed. Please email protocol@mykei.io directly or try again.' });
        setSubmitting(false);
        return;
      }
    } catch (err) {
      console.error('Submit network error:', err);
      setErrors({ submit: 'Network error. Please email protocol@mykei.io directly.' });
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  // Styles
  const inp = (hasError?: boolean): React.CSSProperties => ({
    width: "100%", padding: "12px 14px", borderRadius: "8px",
    border: `1.5px solid ${hasError ? "#C0392B" : SAND}`,
    fontSize: "15px", color: DARK, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit", background: "#FFFFFF",
    transition: "border-color 0.2s",
  });
  const lbl: React.CSSProperties = {
    display: "block", fontSize: "11px", fontWeight: 600, color: MUTED,
    marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase",
  };
  const err: React.CSSProperties = { fontSize: "12px", color: "#C0392B", marginTop: "4px" };
  const primaryBtn = (active: boolean): React.CSSProperties => ({
    width: "100%", padding: "14px", background: active ? GOLD : SAND,
    color: active ? DARK : MUTED, border: "none", borderRadius: "10px",
    fontSize: "15px", fontWeight: 700, cursor: active ? "pointer" : "default",
    fontFamily: "inherit", transition: "background 0.2s", letterSpacing: "0.02em",
  });
  const backBtn: React.CSSProperties = {
    padding: "14px 20px", background: SAND, color: MUTED, border: "none",
    borderRadius: "10px", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit",
  };

  if (submitted) return (
    <div style={{ minHeight: "100vh", background: CREAM, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "inherit" }}>
      <div style={{ background: "white", border: `1px solid ${SAND}`, borderRadius: "20px", padding: "48px 36px", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "0 4px 32px rgba(28,18,10,0.06)" }}>
        <div style={{ width: "68px", height: "68px", background: GOLD, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "28px", color: DARK, fontWeight: 700 }}>✓</div>
        <h2 style={{ color: DARK, fontSize: "24px", fontWeight: 700, margin: "0 0 12px" }}>We have your pilot request.</h2>
        <p style={{ color: MUTED, fontSize: "15px", lineHeight: 1.65, margin: "0 0 24px" }}>
          <strong style={{ color: DARK }}>{form.storeName}</strong> has submitted a signed Letter of Intent for the ADN Independent Retail Pilot. A confirmation email with your signed copy is on its way.
        </p>
        <div style={{ background: PANEL, border: `1px solid ${SAND}`, borderRadius: "10px", padding: "16px 18px", marginBottom: "18px", textAlign: "left" }}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.08em" }}>What happens next</p>
          <ol style={{ margin: 0, paddingLeft: "18px", color: MUTED, fontSize: "13px", lineHeight: 1.7 }}>
            <li>We review your store type, shelf layout, and theft-loss context.</li>
            <li>We contact you for a short pilot-fit call.</li>
            <li>If the store is suitable, we agree the deployment criteria before any installation.</li>
          </ol>
        </div>
        <div style={{ background: PANEL, border: `1px solid ${SAND}`, borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", textAlign: "left" }}>
          <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em" }}>Confirmation sent to</p>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: DARK }}>{form.email}</p>
        </div>
        <p style={{ color: MUTED, fontSize: "12px", margin: 0 }}>Mykei Securities Ltd · Co. No. 16984969 · mykei.io</p>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ minHeight: "100vh", background: CREAM, padding: "40px 16px", fontFamily: "inherit" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto 28px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: DARK, borderRadius: "6px", padding: "6px 14px", marginBottom: "16px" }}>
            <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
              <path d="M14 3L24 8.5V19.5L14 25L4 19.5V8.5L14 3Z" stroke={GOLD} strokeWidth="1.5" fill="none"/>
              <circle cx="14" cy="14" r="2.5" fill={GOLD}/>
            </svg>
            <span style={{ color: GOLD, fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>Independent Retail Pilot 2026</span>
          </div>
          <h1 style={{ color: DARK, fontSize: "22px", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>ADN Pilot Evaluation</h1>
          <p style={{ color: MUTED, fontSize: "14px", margin: 0 }}>Letter of Intent, sign to secure your place</p>
        </div>

        <div style={{ maxWidth: "520px", margin: "0 auto 24px", display: "flex", gap: "6px" }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ flex: 1, height: "3px", borderRadius: "4px", background: s <= step ? GOLD : SAND, transition: "background 0.3s" }} />
          ))}
        </div>

        <div style={{ maxWidth: "520px", margin: "0 auto", background: "white", border: `1px solid ${SAND}`, borderRadius: "20px", padding: "32px 28px", boxShadow: "0 2px 20px rgba(28,18,10,0.05)" }}>
          {step === 1 && (
            <>
              <h2 style={{ color: DARK, fontSize: "19px", fontWeight: 700, margin: "0 0 4px" }}>Your Details</h2>
              <p style={{ color: MUTED, fontSize: "14px", margin: "0 0 28px" }}>Tell us about you and your store.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={lbl}>Full Name *</label>
                  <input style={inp(!!errors.fullName)} placeholder="e.g. John Smith" value={form.fullName} onChange={e => update("fullName", e.target.value)} />
                  {errors.fullName && <p style={err}>{errors.fullName}</p>}
                </div>
                <div>
                  <label style={lbl}>Store / Business Name *</label>
                  <input style={inp(!!errors.storeName)} placeholder="e.g. Sarah's Jewellers" value={form.storeName} onChange={e => update("storeName", e.target.value)} />
                  {errors.storeName && <p style={err}>{errors.storeName}</p>}
                </div>
                <div>
                  <label style={lbl}>Store Address (inc. Postcode) *</label>
                  <input style={inp(!!errors.storeAddress)} placeholder="Street, City, Postcode" value={form.storeAddress} onChange={e => update("storeAddress", e.target.value)} />
                  {errors.storeAddress && <p style={err}>{errors.storeAddress}</p>}
                </div>
              </div>
              <button style={{ ...primaryBtn(true), marginTop: "28px" }} onClick={() => goStep(2)}>Continue →</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ color: DARK, fontSize: "19px", fontWeight: 700, margin: "0 0 4px" }}>Contact & Store Type</h2>
              <p style={{ color: MUTED, fontSize: "14px", margin: "0 0 28px" }}>How we'll reach you.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={lbl}>Email Address *</label>
                  <input style={inp(!!errors.email)} type="email" placeholder="you@yourstore.com" value={form.email} onChange={e => update("email", e.target.value)} />
                  {errors.email && <p style={err}>{errors.email}</p>}
                </div>
                <div>
                  <label style={lbl}>Phone Number</label>
                  <input style={inp(!!errors.phone)} type="tel" placeholder="07xxx xxxxxx" value={form.phone} onChange={e => update("phone", e.target.value)} />
                  {errors.phone && <p style={err}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={lbl}>Store Type *</label>
                  <select style={inp(!!errors.storeType)} value={form.storeType} onChange={e => update("storeType", e.target.value)}>
                    <option value="">Select store type</option>
                    <option>Jeweller</option>
                    <option>Off-licence</option>
                    <option>Convenience Store</option>
                    <option>Pharmacy</option>
                    <option>Electronics</option>
                    <option>Other</option>
                  </select>
                  {errors.storeType && <p style={err}>{errors.storeType}</p>}
                </div>
                <div>
                  <label style={lbl}>Estimated Annual Theft Loss (£) *</label>
                  <input style={inp(!!errors.theftLoss)} placeholder="e.g. 5000" value={form.theftLoss} onChange={e => update("theftLoss", e.target.value)} />
                  {errors.theftLoss && <p style={err}>{errors.theftLoss}</p>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "28px" }}>
                <button style={backBtn} onClick={() => setStep(1)}>← Back</button>
                <button style={{ ...primaryBtn(true), flex: 1 }} onClick={() => goStep(3)}>Continue →</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ color: DARK, fontSize: "19px", fontWeight: 700, margin: "0 0 4px" }}>Sign & Confirm</h2>
              <p style={{ color: MUTED, fontSize: "14px", margin: "0 0 20px" }}>Draw your signature to complete the LOI.</p>
              <div style={{ background: PANEL, border: `1px solid ${SAND}`, borderRadius: "10px", padding: "16px 18px", marginBottom: "20px", fontSize: "13px", color: MUTED, lineHeight: 1.75 }}>
                I, <strong style={{ color: DARK }}>{form.fullName}</strong>, confirm that <strong style={{ color: DARK }}>{form.storeName}</strong> intends to participate in the Mykei Securities ADN Independent Retail Pilot. {commercialTerms.displayLine}. No obligation after the pilot.
              </div>
              <div style={{ border: `2px dashed ${signed ? GOLD : SAND}`, borderRadius: "10px", overflow: "hidden", marginBottom: "8px", position: "relative", background: "#FFFFFF", transition: "border-color 0.2s" }}>
                <canvas ref={canvasRef} width={460} height={120}
                  style={{ display: "block", width: "100%", height: "120px", cursor: "crosshair", touchAction: "none" }}
                  onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                  onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
                />
                {!signed && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: MUTED, fontSize: "13px", pointerEvents: "none" }}>✍️ Sign here</div>}
              </div>
              {signed && <button onClick={clearSig} style={{ fontSize: "12px", color: MUTED, background: "none", border: "none", cursor: "pointer", marginBottom: "12px", padding: 0 }}>Clear signature</button>}
              {!signed && <p style={{ ...err, marginBottom: "12px" }}>Signature is required.</p>}
              <div style={{ background: PANEL, border: `1px solid ${SAND}`, borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: GOLD, margin: "0 0 10px", textTransform: "uppercase" }}>Commercial Terms</p>
                {commercialTerms.pdfRows.map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: DARK, padding: "4px 0", borderBottom: `1px solid ${SAND}` }}>
                    <span style={{ color: MUTED }}>{label}</span>
                    <span style={{ fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
                <p style={{ fontSize: "11px", color: MUTED, margin: "8px 0 0", fontStyle: "italic" }}>Commercial terms are agreed directly with Mykei before the pilot starts and are not published on this page.</p>
              </div>
              <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer", marginBottom: "24px", marginTop: "4px" }}>
                <input type="checkbox" checked={form.agreed} onChange={e => update("agreed", e.target.checked)} style={{ marginTop: "3px", accentColor: GOLD, width: "16px", height: "16px", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: MUTED, lineHeight: 1.65 }}>I agree to provide feedback during the pilot. Anonymised data may be used in Mykei's market validation. I can withdraw at any time.</span>
              </label>
              {errors.submit && (
                <p style={{ fontSize: "13px", color: "#C0392B", background: "#fdf2f2", border: "1px solid #f5c6cb", borderRadius: "8px", padding: "12px 14px", marginBottom: "12px", lineHeight: 1.6 }}>
                  {errors.submit}
                </p>
              )}
              <div id="ts-container" style={{ display: "none" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={backBtn} onClick={() => setStep(2)}>← Back</button>
                <button style={{ ...primaryBtn(signed && form.agreed && !submitting), flex: 1 }} onClick={handleSubmit}>
                  {submitting ? "Submitting…" : "Submit Letter of Intent"}
                </button>
              </div>
            </>
          )}
        </div>
        <p style={{ textAlign: "center", color: MUTED, fontSize: "12px", marginTop: "24px", opacity: 0.7 }}>Mykei Securities Ltd · Co. No. 16984969 · mykei.io</p>
      </div>
    </>
  );
}
