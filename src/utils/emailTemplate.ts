import { commercialTerms } from "@/data/commercialTerms";

export interface LOIData {
  fullName: string;
  storeName: string;
  storeAddress: string;
  email: string;
  phone: string;
  storeType: string;
  annualTheftLoss: string;
  retailerSignatureDataUrl: string;
  signedDate: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function generateRetailerEmail(data: LOIData): string {
  const safe = {
    fullName: escapeHtml(data.fullName),
    storeName: escapeHtml(data.storeName),
    storeAddress: escapeHtml(data.storeAddress),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    storeType: escapeHtml(data.storeType),
    annualTheftLoss: escapeHtml(data.annualTheftLoss),
    signedDate: escapeHtml(data.signedDate),
    retailerSignatureDataUrl: /^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(data.retailerSignatureDataUrl)
      ? data.retailerSignatureDataUrl
      : "",
  };
  // First name only for friendly copy
  const firstName = escapeHtml(data.fullName.split(" ")[0]);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mykei Securities | Pilot Request Received</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #f0ebe4;
      font-family: 'Space Grotesk', Arial, sans-serif;
      color: #1a1a1a;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Animations ─────────────────────────────────────── */

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -400% center; }
      100% { background-position: 400% center; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(200,169,110,0); }
      50%       { box-shadow: 0 0 0 8px rgba(200,169,110,0.18); }
    }
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-16px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes growWidth {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes popIn {
      0%   { opacity: 0; transform: scale(0.7); }
      70%  { transform: scale(1.08); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes floatUp {
      0%   { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* ── Layout ──────────────────────────────────────────── */

    .email-wrapper {
      max-width: 640px;
      margin: 0 auto;
      background: #ffffff;
    }

    /* ── Header ──────────────────────────────────────────── */

    .header {
      background: linear-gradient(160deg, #0a1836 0%, #0d1f4a 60%, #102258 100%);
      padding: 48px 48px 36px;
      text-align: center;
      position: relative;
      overflow: hidden;
      animation: fadeInDown 0.8s cubic-bezier(0.22,1,0.36,1) both;
    }
    .header-grid-overlay {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 32px 32px;
      pointer-events: none;
    }
    .header-logo-ring {
      width: 64px;
      height: 64px;
      margin: 0 auto 22px;
      border-radius: 50%;
      border: 1px solid rgba(200,169,110,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      animation: pulseGlow 3s ease-in-out infinite;
    }
    .header-logo-ring::before {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px solid rgba(200,169,110,0.15);
    }
    .header-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #c8a96e;
      margin-bottom: 10px;
      animation: fadeIn 0.6s ease 0.4s both;
    }
    .header-title {
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.03em;
      line-height: 1.2;
      animation: fadeIn 0.6s ease 0.5s both;
    }
    .header-sub {
      font-size: 12px;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-top: 8px;
      animation: fadeIn 0.6s ease 0.6s both;
    }
    .shimmer-bar {
      height: 2px;
      background: linear-gradient(90deg,
        transparent 0%,
        #c8a96e 25%,
        #f0d898 50%,
        #c8a96e 75%,
        transparent 100%);
      background-size: 400% auto;
      animation: shimmer 3s linear infinite;
      margin-top: 32px;
    }

    /* ── Hero Band ───────────────────────────────────────── */

    .hero {
      background: #f4f6f8;
      border-bottom: 1px solid #e0d9d0;
      padding: 36px 48px 32px;
      animation: fadeInUp 0.7s ease 0.3s both;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #0d1f4a;
      color: #c8a96e;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 2px;
      margin-bottom: 18px;
    }
    .hero-headline {
      font-size: 32px;
      font-weight: 700;
      color: #0d1f4a;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }
    .hero-headline span {
      color: #c8a96e;
    }
    .hero-body {
      margin-top: 14px;
      font-size: 15px;
      color: #555;
      line-height: 1.75;
      max-width: 480px;
    }

    /* ── Stat Strip ──────────────────────────────────────── */

    .stat-strip {
      background: #0d1f4a;
      padding: 0;
      display: table;
      width: 100%;
      border-collapse: collapse;
      animation: fadeIn 0.8s ease 0.5s both;
    }
    .stat-cell {
      display: table-cell;
      width: 25%;
      padding: 22px 16px;
      text-align: center;
      border-right: 1px solid rgba(255,255,255,0.07);
      vertical-align: middle;
    }
    .stat-cell:last-child { border-right: none; }
    .stat-num {
      font-size: 22px;
      font-weight: 700;
      color: #c8a96e;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .stat-label {
      font-size: 9px;
      font-weight: 500;
      color: rgba(255,255,255,0.45);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-top: 5px;
      line-height: 1.4;
    }

    /* ── Content ─────────────────────────────────────────── */

    .content {
      padding: 44px 48px;
    }

    .section-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #c8a96e;
      margin-bottom: 6px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #0d1f4a;
      margin-bottom: 20px;
      line-height: 1.3;
    }
    .gold-rule {
      height: 2px;
      background: linear-gradient(90deg, #c8a96e 0%, rgba(200,169,110,0.1) 100%);
      width: 48px;
      margin-bottom: 20px;
      animation: growWidth 0.8s ease both;
    }

    /* ── ELI10 Story Section ──────────────────────────────── */

    .story-section {
      background: #0d1f4a;
      border-radius: 4px;
      padding: 36px 36px 32px;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
      animation: fadeInUp 0.7s ease 0.4s both;
    }
    .story-section::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 200px; height: 200px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%);
      pointer-events: none;
    }
    .story-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #c8a96e;
      margin-bottom: 12px;
    }
    .story-headline {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
      margin-bottom: 20px;
    }
    .story-body {
      font-size: 14px;
      color: rgba(255,255,255,0.7);
      line-height: 1.85;
    }
    .story-body strong {
      color: #ffffff;
      font-weight: 600;
    }
    .story-body em {
      color: #c8a96e;
      font-style: normal;
      font-weight: 600;
    }
    .story-divider {
      height: 1px;
      background: rgba(255,255,255,0.08);
      margin: 24px 0;
    }
    .story-punchline {
      font-size: 15px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.6;
      padding: 16px 20px;
      background: rgba(200,169,110,0.12);
      border-left: 3px solid #c8a96e;
      border-radius: 0 2px 2px 0;
    }

    /* ── How It Works Cards ──────────────────────────────── */

    .steps-section {
      margin-bottom: 40px;
      animation: fadeInUp 0.7s ease 0.5s both;
    }
    .step-card {
      display: table;
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
      background: #f4f6f8;
      border: 1px solid #e8e0d6;
      border-radius: 4px;
      overflow: hidden;
    }
    .step-num-col {
      display: table-cell;
      width: 56px;
      background: #0d1f4a;
      text-align: center;
      vertical-align: middle;
      padding: 18px 0;
    }
    .step-num {
      font-size: 13px;
      font-weight: 700;
      color: #c8a96e;
      letter-spacing: 0.08em;
    }
    .step-icon-col {
      display: table-cell;
      width: 52px;
      text-align: center;
      vertical-align: middle;
      padding: 0 4px;
    }
    .step-body-col {
      display: table-cell;
      padding: 16px 20px 16px 4px;
      vertical-align: middle;
    }
    .step-title {
      font-size: 13px;
      font-weight: 700;
      color: #0d1f4a;
      margin-bottom: 3px;
    }
    .step-desc {
      font-size: 12px;
      color: #666;
      line-height: 1.6;
    }

    /* ── What Happens Next ───────────────────────────────── */

    .next-section {
      margin-bottom: 40px;
      animation: fadeInUp 0.7s ease 0.6s both;
    }
    .next-item {
      display: table;
      width: 100%;
      margin-bottom: 16px;
      position: relative;
    }
    .next-left {
      display: table-cell;
      width: 56px;
      vertical-align: top;
      padding-top: 2px;
    }
    .next-dot {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #0d1f4a;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .next-dot-num {
      font-size: 11px;
      font-weight: 700;
      color: #c8a96e;
    }
    .next-right {
      display: table-cell;
      vertical-align: top;
      padding-top: 4px;
    }
    .next-timing {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #c8a96e;
      margin-bottom: 3px;
    }
    .next-title {
      font-size: 14px;
      font-weight: 700;
      color: #0d1f4a;
      margin-bottom: 3px;
    }
    .next-desc {
      font-size: 13px;
      color: #666;
      line-height: 1.65;
    }

    /* ── LOI Document ────────────────────────────────────── */

    .loi-section {
      border: 1px solid #d4cdc5;
      background: #fdfcfb;
      margin-bottom: 40px;
      border-radius: 4px;
      overflow: hidden;
      animation: fadeInUp 0.7s ease 0.7s both;
    }
    .loi-header {
      background: linear-gradient(135deg, #0d1f4a 0%, #102258 100%);
      padding: 22px 28px;
      display: table;
      width: 100%;
    }
    .loi-header-left {
      display: table-cell;
      vertical-align: middle;
    }
    .loi-header-right {
      display: table-cell;
      vertical-align: middle;
      text-align: right;
      width: 80px;
    }
    .loi-header-title {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .loi-header-sub {
      font-size: 10px;
      color: rgba(255,255,255,0.45);
      margin-top: 3px;
      letter-spacing: 0.05em;
    }
    .loi-body { padding: 28px; }

    .field-row {
      display: table;
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    .field-cell {
      display: table-cell;
      width: 50%;
      padding-right: 16px;
      vertical-align: top;
    }
    .field-cell:last-child { padding-right: 0; }
    .field-label {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #aaa;
      margin-bottom: 4px;
    }
    .field-value {
      font-size: 13px;
      color: #1a1a1a;
      font-weight: 500;
      padding-bottom: 8px;
      border-bottom: 1px solid #e8e0d6;
    }

    .loi-rule { height: 1px; background: #e8e0d6; margin: 20px 0; }

    .loi-declaration {
      font-size: 12px;
      color: #555;
      line-height: 1.8;
      margin-bottom: 18px;
      font-style: italic;
    }
    .loi-term { margin-bottom: 10px; }
    .loi-term-title {
      font-size: 11px;
      font-weight: 700;
      color: #0d1f4a;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .loi-term-body {
      font-size: 11px;
      color: #777;
      margin-top: 2px;
      line-height: 1.65;
    }

    /* Signatures */
    .sig-row {
      display: table;
      width: 100%;
      border-collapse: collapse;
      margin-top: 24px;
      border-top: 1px solid #e8e0d6;
      padding-top: 20px;
    }
    .sig-cell {
      display: table-cell;
      width: 50%;
      padding-right: 20px;
      vertical-align: bottom;
    }
    .sig-cell:last-child { padding-right: 0; }
    .sig-label {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #aaa;
      margin-bottom: 8px;
    }
    .sig-img { max-height: 56px; max-width: 200px; display: block; }
    .sig-line { height: 1px; background: #d4cdc5; margin-top: 8px; }
    .sig-name { font-size: 12px; font-weight: 600; color: #1a1a1a; margin-top: 5px; }
    .sig-role { font-size: 10px; color: #aaa; margin-top: 2px; }

    /* ── CTA ─────────────────────────────────────────────── */

    .cta-section {
      background: linear-gradient(160deg, #0a1836 0%, #0d1f4a 100%);
      border-radius: 4px;
      padding: 40px 36px;
      text-align: center;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
      animation: fadeInUp 0.7s ease 0.8s both;
    }
    .cta-section::before {
      content: '';
      position: absolute;
      bottom: -60px; left: 50%;
      transform: translateX(-50%);
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%);
    }
    .cta-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      margin-bottom: 10px;
    }
    .cta-headline {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 10px;
      line-height: 1.3;
    }
    .cta-body {
      font-size: 14px;
      color: rgba(255,255,255,0.6);
      line-height: 1.7;
      margin-bottom: 28px;
      max-width: 380px;
      margin-left: auto;
      margin-right: auto;
    }
    .cta-btn {
      display: inline-block;
      background: #c8a96e;
      color: #0d1f4a !important;
      text-decoration: none;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 15px 36px;
      border-radius: 2px;
    }
    .cta-secondary {
      display: block;
      font-size: 11px;
      color: rgba(255,255,255,0.35);
      margin-top: 16px;
      letter-spacing: 0.05em;
    }

    /* ── Footer ──────────────────────────────────────────── */

    .footer {
      background: #f0ebe4;
      border-top: 1px solid #e0d9d0;
      padding: 32px 48px;
      text-align: center;
    }
    .footer-logo {
      font-size: 12px;
      font-weight: 700;
      color: #0d1f4a;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
    .footer-detail {
      font-size: 11px;
      color: #aaa;
      margin-top: 8px;
      line-height: 2;
    }
    .footer-detail a { color: #0d1f4a; text-decoration: none; }
    .footer-legal {
      font-size: 10px;
      color: #ccc;
      margin-top: 16px;
      line-height: 1.7;
      border-top: 1px solid #e8e0d6;
      padding-top: 16px;
    }

  </style>
</head>
<body>
<div class="email-wrapper">

  <!-- ═══ HEADER ═══ -->
  <div class="header">
    <div class="header-grid-overlay"></div>
    <div class="header-logo-ring">
      <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L24 8.5V19.5L14 25L4 19.5V8.5L14 3Z" stroke="rgba(200,169,110,0.7)" stroke-width="1.5" fill="none"/>
        <path d="M14 7L21 11V17L14 21L7 17V11L14 7Z" fill="rgba(200,169,110,0.1)" stroke="rgba(200,169,110,0.4)" stroke-width="1"/>
        <circle cx="14" cy="14" r="2.5" fill="#c8a96e"/>
      </svg>
    </div>
    <div class="header-eyebrow">Mykei Securities Ltd. · Confirmed</div>
    <div class="header-title">Independent Retail Pilot 2026</div>
    <div class="header-sub">Letter of Intent · Signed &amp; Received</div>
    <div class="shimmer-bar"></div>
  </div>

  <!-- ═══ HERO ═══ -->
  <div class="hero">
    <div class="hero-badge">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <circle cx="4" cy="4" r="3.5" fill="#c8a96e"/>
      </svg>
      Founding Retailer
    </div>
    <div class="hero-headline">We have it, <span>${firstName}.</span><br/>Your pilot request is in.</div>
    <div class="hero-body">
      Your signed Letter of Intent is confirmed. ${safe.storeName} is now in review for the
      Mykei ADN Independent Retail Pilot. Here is what happens next.
    </div>
  </div>

  <!-- ═══ STAT STRIP ═══ -->
  <div class="stat-strip">
    <div class="stat-cell">
      <div class="stat-num">&lt;200ms</div>
      <div class="stat-label">Trigger response time</div>
    </div>
    <div class="stat-cell">
      <div class="stat-num">0</div>
      <div class="stat-label">Cameras or facial recognition</div>
    </div>
    <div class="stat-cell">
      <div class="stat-num">UK</div>
      <div class="stat-label">Patent application filed</div>
    </div>
  </div>

  <!-- ═══ CONTENT ═══ -->
  <div class="content">

    <!-- ─── ELI10: What is the ADN? ─── -->
    <div class="story-section">
      <div class="story-eyebrow">What is the ADN?</div>
      <div class="story-headline">The simplest way we can explain it.</div>
      <div class="story-body">
        <strong>Picture this.</strong> Someone walks into your shop, sweeps stock off the shelf, and gets out before anyone can react. It happens. Right now, once they are gone, the stock is usually gone too.
        <br/><br/>
        The ADN changes what happens in that half-second window.
        <br/><br/>
        Sitting on your shelving unit, the ADN uses non-visual Time-of-Flight sensors to read shelf movement in real time. <strong>No cameras. No recording. No faces.</strong> Just physics.
        <br/><br/>
        When a defined shelf clearance event is detected, ADN is designed to trigger controlled marker deployment onto the affected items. The marker is batch-identifiable and linked to a timestamped record in the Mykei Registry: your device, your store, and the cartridge session.
        <br/><br/>
        Theft pays when stolen goods can still be sold. ADN is designed to make theft-linked stock harder to move by connecting the shelf event to a marker deployment record and verification workflow.
      </div>
      <div class="story-divider"></div>
      <div class="story-punchline">
        That's economic sterilisation. Your shop becomes the worst possible target, and eventually, not a target at all.
      </div>
    </div>

    <!-- ─── How It Works: 4 Steps ─── -->
    <div class="steps-section">
      <div class="section-label">The Process</div>
      <div class="section-title">How the ADN works in your store</div>
      <div class="gold-rule"></div>

      <!-- Step 1 -->
      <div class="step-card">
        <div class="step-num-col"><div class="step-num">01</div></div>
        <div class="step-icon-col">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10" stroke="#c8a96e" stroke-width="1.2" fill="none" opacity="0.4"/>
            <circle cx="14" cy="14" r="5" stroke="#c8a96e" stroke-width="1.4" fill="none"/>
            <circle cx="14" cy="14" r="1.5" fill="#c8a96e"/>
          </svg>
        </div>
        <div class="step-body-col">
          <div class="step-title">Detect, invisible laser sensing</div>
          <div class="step-desc">940nm Time-of-Flight sensors monitor your shelving in real time. No video, no audio, just precise movement and mass detection. A normal browsing customer? No trigger. A bulk grab? Detected instantly.</div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="step-card">
        <div class="step-num-col"><div class="step-num">02</div></div>
        <div class="step-icon-col">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 6C14 6 8 10 8 16C8 19.3 10.7 22 14 22C17.3 22 20 19.3 20 16C20 10 14 6 14 6Z" stroke="#c8a96e" stroke-width="1.3" fill="rgba(200,169,110,0.1)"/>
            <circle cx="14" cy="16" r="2" fill="#c8a96e" opacity="0.6"/>
            <path d="M10 9L8 5M18 9L20 5M14 6V3" stroke="#c8a96e" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
          </svg>
        </div>
        <div class="step-body-col">
          <div class="step-title">Mark, controlled batch-identifiable marker</div>
          <div class="step-desc">In under 200 milliseconds, a controlled marker mist is deployed onto the items. It is invisible to the naked eye and batch-identifiable under verification. Subject to marker supplier specification and COSHH review.</div>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="step-card">
        <div class="step-num-col"><div class="step-num">03</div></div>
        <div class="step-icon-col">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="7" y="6" width="14" height="16" rx="2" stroke="#c8a96e" stroke-width="1.3" fill="rgba(200,169,110,0.08)"/>
            <path d="M10 11H18M10 14H18M10 17H14" stroke="#c8a96e" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
          </svg>
        </div>
        <div class="step-body-col">
          <div class="step-title">Register, cartridge-linked event recorded to the Mykei Registry</div>
          <div class="step-desc">The marker deployment event is instantly recorded in the Mykei Registry, linked to your device, your store, and your cartridge batch. Every activation creates a timestamped, batch-linked event record.</div>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="step-card">
        <div class="step-num-col"><div class="step-num">04</div></div>
        <div class="step-icon-col">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="9" stroke="#c8a96e" stroke-width="1.3" fill="none" opacity="0.3"/>
            <path d="M10 14L13 17L18 11" stroke="#c8a96e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="step-body-col">
          <div class="step-title">Disrupt, the resale incentive is undermined</div>
          <div class="step-desc">Stolen items linked to a deployment event record are harder to move with confidence. The batch marker shows what was deployed. The registry shows where, when, and under which cartridge session. Theft becomes harder to profit from.</div>
        </div>
      </div>
    </div>

    <!-- ─── What Happens Next ─── -->
    <div class="next-section">
      <div class="section-label">Your Onboarding Timeline</div>
      <div class="section-title">What happens next</div>
      <div class="gold-rule"></div>

      <!-- Step 1 -->
      <div class="next-item">
        <div class="next-left">
          <div class="next-dot"><div class="next-dot-num">01</div></div>
        </div>
        <div class="next-right">
          <div class="next-timing">Now</div>
          <div class="next-title">LOI logged &amp; confirmed</div>
          <div class="next-desc">Your signed Letter of Intent is received. ${safe.storeName} is now in the Mykei Independent Retail Pilot review queue. This email is your record of that.</div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="next-item">
        <div class="next-left">
          <div class="next-dot"><div class="next-dot-num">02</div></div>
        </div>
        <div class="next-right">
          <div class="next-timing">Within 48 hours</div>
          <div class="next-title">We call you for a brief walk-through</div>
          <div class="next-desc">A member of the Mykei team will call you on <strong>${safe.phone}</strong> to walk through how the ADN will be installed in your specific store layout, shelf positions, sensor placement, and the marker cartridge setup. Takes about 20 minutes.</div>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="next-item">
        <div class="next-left">
          <div class="next-dot"><div class="next-dot-num">03</div></div>
        </div>
        <div class="next-right">
          <div class="next-timing">Week 1–2</div>
          <div class="next-title">Installation arranged at your convenience</div>
          <div class="next-desc">We schedule installation at a time that suits you, typically takes under an hour. No drilling, no permanent fixtures, no disruption to trading. We handle everything and make sure you're comfortable with the system before we leave.</div>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="next-item">
        <div class="next-left">
          <div class="next-dot"><div class="next-dot-num">04</div></div>
        </div>
        <div class="next-right">
          <div class="next-timing">Day 1 of pilot</div>
          <div class="next-title">Pilot starts after the deployment check</div>
          <div class="next-desc">If the site is suitable, your cartridge session is intended to be registered in the Mykei Registry design before deployment. The Registry is in development, not yet live, and you receive a monthly pilot report showing any activations and activity.</div>
        </div>
      </div>

      <!-- Step 5 -->
      <div class="next-item">
        <div class="next-left">
          <div class="next-dot"><div class="next-dot-num">05</div></div>
        </div>
        <div class="next-right">
          <div class="next-timing">After ${commercialTerms.minimumMonths} months</div>
          <div class="next-title">Your call, no obligation to continue</div>
          <div class="next-desc">At the end of the pilot, we ask for your honest feedback. There is absolutely no obligation to renew. If you've seen the value, we'd love to keep you on. If not, we part on good terms. Simple as that.</div>
        </div>
      </div>

    </div>

    <!-- ─── LOI Document ─── -->
    <div class="loi-section">
      <div class="loi-header">
        <div class="loi-header-left">
          <div class="loi-header-title">Letter of Intent, Your Signed Copy</div>
          <div class="loi-header-sub">Independent Retail Pilot · 2026 · Mykei Securities Ltd. · Co. No. 16984969</div>
        </div>
        <div class="loi-header-right">
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
            <path d="M14 3L24 8.5V19.5L14 25L4 19.5V8.5L14 3Z" stroke="rgba(200,169,110,0.5)" stroke-width="1.2" fill="none"/>
            <circle cx="14" cy="14" r="2" fill="rgba(200,169,110,0.7)"/>
          </svg>
        </div>
      </div>
      <div class="loi-body">

        <div class="field-row">
          <div class="field-cell">
            <div class="field-label">Full Name</div>
            <div class="field-value">${safe.fullName}</div>
          </div>
          <div class="field-cell">
            <div class="field-label">Store / Business Name</div>
            <div class="field-value">${safe.storeName}</div>
          </div>
        </div>
        <div class="field-row">
          <div class="field-cell" colspan="2" style="width:100%">
            <div class="field-label">Store Address</div>
            <div class="field-value">${safe.storeAddress}</div>
          </div>
        </div>

        <div class="loi-rule"></div>

        <div class="field-row">
          <div class="field-cell">
            <div class="field-label">Email Address</div>
            <div class="field-value">${safe.email}</div>
          </div>
          <div class="field-cell">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${safe.phone}</div>
          </div>
        </div>
        <div class="field-row">
          <div class="field-cell">
            <div class="field-label">Store Type</div>
            <div class="field-value">${safe.storeType}</div>
          </div>
          <div class="field-cell">
            <div class="field-label">Est. Annual Theft Loss</div>
            <div class="field-value">£${safe.annualTheftLoss}</div>
          </div>
        </div>

        <div class="loi-rule"></div>

        <div class="loi-declaration">
          I, the undersigned, acting on behalf of the business named above, hereby confirm our intent to participate in the Mykei Securities Ltd ADN Independent Retail Pilot. This constitutes a formal expression of commercial interest. This LOI is not a legally binding contract.
        </div>

        <div class="loi-term">
          <div class="loi-term-title">Pilot Commitment</div>
          <div class="loi-term-body">Minimum ${commercialTerms.minimumMonths}-month pilot at ${commercialTerms.displayLine}.</div>
        </div>
        <div class="loi-term">
          <div class="loi-term-title">Economic Sterilisation</div>
          <div class="loi-term-body">Marker deployment events recorded in the Mykei Registry, linked to the store device, cartridge batch, and timestamp, supporting verification and investigation workflows.</div>
        </div>
        <div class="loi-term">
          <div class="loi-term-title">No Obligation</div>
          <div class="loi-term-body">At the end of the ${commercialTerms.minimumMonths}-month pilot, renewal is entirely at the retailer's discretion.</div>
        </div>

        <!-- Signatures -->
        <div class="sig-row">
          <div class="sig-cell">
            <div class="sig-label">Retailer Signature</div>
            <img src="${safe.retailerSignatureDataUrl}" alt="Retailer signature" class="sig-img" />
            <div class="sig-line"></div>
            <div class="sig-name">${safe.fullName}</div>
            <div class="sig-role">${safe.storeName} · ${safe.signedDate}</div>
          </div>
          <div class="sig-cell">
            <div class="sig-label">For: Mykei Securities Ltd.</div>
            <svg viewBox="0 0 220 65" width="200" height="60" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">
              <path d="M10,50 C13,28 16,14 20,17 C24,20 22,38 26,36 C30,34 28,21 33,19 C37,17 36,33 40,38 C43,41 46,27 51,23 C55,20 54,34 60,42 C63,46 70,31 76,27 C80,24 82,38 86,42 C89,45 93,33 98,31 C102,29 104,41 109,46 C112,49 118,37 124,35 C128,33 130,44 135,49 C138,52 146,45 151,43 C155,41 157,49 162,52 C164,53 168,51 171,49 C174,47 173,53 176,54 C178,55 181,53 183,54 C185,55 186,56 188,54 C190,53 190,55 192,54"
                stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="196" cy="53" r="2.4" fill="#1a1a1a"/>
            </svg>
            <div class="sig-line"></div>
            <div class="sig-name">Michael Esema</div>
            <div class="sig-role">Founder &amp; Director, Mykei Securities Ltd. · ${safe.signedDate}</div>
          </div>
        </div>

      </div>
    </div>

    <!-- ─── CTA ─── -->
    <div class="cta-section">
      <div class="cta-eyebrow">Before your installation</div>
      <div class="cta-headline">See exactly how the ADN works.</div>
      <div class="cta-body">
        Visit the Mykei technology page for a full breakdown of the hardware, the controlled marker deployment process, and how the registry event workflow operates end-to-end.
      </div>
      <a href="https://mykei.io/#how-it-works" class="cta-btn">How the ADN Works →</a>
      <div class="cta-secondary">Questions? protocol@mykei.io · 07985151551</div>
    </div>

  </div>

  <!-- ═══ FOOTER ═══ -->
  <div class="footer">
    <div class="footer-logo">Mykei Securities Ltd.</div>
    <div class="footer-detail">
      Company No. 16984969 · Prestwich, Manchester<br/>
      <a href="mailto:protocol@mykei.io">protocol@mykei.io</a> &nbsp;·&nbsp;
      <a href="https://mykei.io">www.mykei.io</a> &nbsp;·&nbsp; 07985151551
    </div>
    <div class="footer-legal">
      This email was sent to ${safe.email} because you signed a Letter of Intent with Mykei Securities Ltd.
      This LOI is a declaration of commercial intent and is not a legally binding contract.
      Your data is held securely and used only in connection with the ADN Independent Retail Pilot.
    </div>
  </div>

</div>
</body>
</html>`;
}
