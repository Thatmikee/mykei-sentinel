// src/components/GoldShelfBackground.tsx
// Fixed-position vertical shelf sketch — gold pen style, non-intrusive
// Shelf runs top-to-bottom of page. At page top: ADN-1 unit crown.
// At page bottom: floor/base rail. Shelf boards appear at scroll intervals.
// Opacity kept at 0.07 — visible as texture, not decoration.

export const GoldShelfBackground = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    }}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1200 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", opacity: 0.07 }}
    >
      <defs>
        {/* Gold pen gradient — richer at centre, darker at edges */}
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#92720A" />
          <stop offset="40%"  stopColor="#D4A017" />
          <stop offset="60%"  stopColor="#FFD700" />
          <stop offset="100%" stopColor="#92720A" />
        </linearGradient>
        <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#FFD700" />
          <stop offset="50%"  stopColor="#C9980A" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        {/* Sketch filter — slight wobble for hand-drawn feel */}
        <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4"
            result="noise" seed="3"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2"
            xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>

      {/* ── VERTICAL UPRIGHTS (the two side rails of the shelf unit) ── */}
      {/* Left upright */}
      <rect x="88" y="0" width="3.5" height="900"
        fill="url(#g2)" filter="url(#sketch)" />
      {/* Right upright */}
      <rect x="1108" y="0" width="3.5" height="900"
        fill="url(#g2)" filter="url(#sketch)" />

      {/* ── ADN-1 CROWN (top of shelf unit) ── */}
      {/* Top rail */}
      <rect x="82" y="38" width="1036" height="4"
        fill="url(#g1)" filter="url(#sketch)" />
      {/* Crown bracket left */}
      <path d="M88 38 L88 18 L108 18" stroke="#D4A017" strokeWidth="2.5"
        fill="none" filter="url(#sketch)" />
      {/* Crown bracket right */}
      <path d="M1112 38 L1112 18 L1092 18" stroke="#D4A017" strokeWidth="2.5"
        fill="none" filter="url(#sketch)" />
      {/* ADN-1 Unit sketch — top centre, sitting on the crown */}
      <g filter="url(#sketch)" opacity="0.9">
        {/* Unit body */}
        <rect x="560" y="4" width="80" height="36" rx="3"
          stroke="#FFD700" strokeWidth="2" fill="none" />
        {/* Unit label line */}
        <line x1="570" y1="16" x2="630" y2="16"
          stroke="#C9980A" strokeWidth="1.5" />
        <line x1="570" y1="24" x2="610" y2="24"
          stroke="#C9980A" strokeWidth="1" />
        {/* Sensor dots */}
        <circle cx="576" cy="30" r="3" stroke="#FFD700" strokeWidth="1.5" fill="none"/>
        <circle cx="586" cy="30" r="3" stroke="#FFD700" strokeWidth="1.5" fill="none"/>
        {/* Emit lines */}
        <line x1="576" y1="40" x2="576" y2="52" stroke="#D4A017" strokeWidth="1" strokeDasharray="2,3"/>
        <line x1="586" y1="40" x2="586" y2="52" stroke="#D4A017" strokeWidth="1" strokeDasharray="2,3"/>
        {/* Mount bracket */}
        <line x1="555" y1="22" x2="560" y2="22" stroke="#C9980A" strokeWidth="1.5"/>
        <line x1="640" y1="22" x2="645" y2="22" stroke="#C9980A" strokeWidth="1.5"/>
      </g>

      {/* ── SHELF BOARDS (horizontal, spaced down the page) ── */}
      {/* Each board: face + underside shadow line + bracket supports */}

      {/* Shelf 1 — ~180px from top */}
      <rect x="82" y="198" width="1036" height="5"
        fill="url(#g1)" filter="url(#sketch)" />
      <rect x="84" y="203" width="1034" height="2"
        fill="#8B6914" filter="url(#sketch)" opacity="0.6"/>
      {/* Brackets */}
      <path d="M140 198 L140 218 L160 218" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M400 198 L400 218 L420 218" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M780 198 L780 218 L760 218" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M1060 198 L1060 218 L1040 218" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>

      {/* Shelf 1 items — abstract product silhouettes */}
      <g stroke="#C9980A" strokeWidth="1.2" fill="none" filter="url(#sketch)" opacity="0.75">
        <rect x="110" y="162" width="22" height="36" rx="1"/>  {/* tall bottle */}
        <rect x="140" y="172" width="30" height="26" rx="1"/>  {/* box */}
        <rect x="180" y="168" width="18" height="30" rx="1"/>
        <rect x="210" y="175" width="25" height="23" rx="1"/>
        <rect x="320" y="160" width="20" height="38" rx="1"/>
        <rect x="348" y="170" width="28" height="28" rx="1"/>
        <rect x="500" y="165" width="22" height="33" rx="1"/>
        <rect x="532" y="174" width="20" height="24" rx="1"/>
        <rect x="650" y="162" width="16" height="36" rx="1"/>
        <rect x="674" y="170" width="26" height="28" rx="1"/>
        <rect x="820" y="168" width="20" height="30" rx="1"/>
        <rect x="850" y="172" width="24" height="26" rx="1"/>
        <rect x="960" y="164" width="18" height="34" rx="1"/>
        <rect x="988" y="170" width="22" height="28" rx="1"/>
      </g>

      {/* Shelf 2 — ~390px */}
      <rect x="82" y="408" width="1036" height="5"
        fill="url(#g1)" filter="url(#sketch)" />
      <rect x="84" y="413" width="1034" height="2"
        fill="#8B6914" filter="url(#sketch)" opacity="0.6"/>
      <path d="M140 408 L140 428 L160 428" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M400 408 L400 428 L420 428" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M780 408 L780 428 L760 428" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M1060 408 L1060 428 L1040 428" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      {/* Shelf 2 items */}
      <g stroke="#C9980A" strokeWidth="1.2" fill="none" filter="url(#sketch)" opacity="0.75">
        <rect x="120" y="374" width="18" height="34" rx="1"/>
        <rect x="148" y="382" width="28" height="26" rx="1"/>
        <rect x="190" y="376" width="20" height="32" rx="1"/>
        <rect x="340" y="372" width="22" height="36" rx="1"/>
        <rect x="372" y="380" width="16" height="28" rx="1"/>
        <rect x="510" y="378" width="24" height="30" rx="1"/>
        <rect x="545" y="374" width="18" height="34" rx="1"/>
        <rect x="700" y="376" width="20" height="32" rx="1"/>
        <rect x="730" y="382" width="26" height="26" rx="1"/>
        <rect x="870" y="374" width="22" height="34" rx="1"/>
        <rect x="902" y="378" width="18" height="30" rx="1"/>
        <rect x="990" y="372" width="24" height="36" rx="1"/>
      </g>

      {/* Shelf 3 — ~600px */}
      <rect x="82" y="618" width="1036" height="5"
        fill="url(#g1)" filter="url(#sketch)" />
      <rect x="84" y="623" width="1034" height="2"
        fill="#8B6914" filter="url(#sketch)" opacity="0.6"/>
      <path d="M140 618 L140 638 L160 638" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M400 618 L400 638 L420 638" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M780 618 L780 638 L760 638" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      <path d="M1060 618 L1060 638 L1040 638" stroke="#B8860B" strokeWidth="1.5"
        fill="none" filter="url(#sketch)"/>
      {/* Shelf 3 items */}
      <g stroke="#C9980A" strokeWidth="1.2" fill="none" filter="url(#sketch)" opacity="0.75">
        <rect x="130" y="584" width="20" height="34" rx="1"/>
        <rect x="160" y="590" width="26" height="28" rx="1"/>
        <rect x="200" y="586" width="18" height="32" rx="1"/>
        <rect x="350" y="582" width="22" height="36" rx="1"/>
        <rect x="382" y="590" width="20" height="28" rx="1"/>
        <rect x="530" y="586" width="24" height="32" rx="1"/>
        <rect x="710" y="584" width="18" height="34" rx="1"/>
        <rect x="740" y="590" width="28" height="28" rx="1"/>
        <rect x="880" y="582" width="22" height="36" rx="1"/>
        <rect x="1000" y="586" width="20" height="32" rx="1"/>
      </g>

      {/* ── BASE RAIL (floor level) ── */}
      <rect x="82" y="870" width="1036" height="5"
        fill="url(#g1)" filter="url(#sketch)" />
      {/* Floor feet */}
      <path d="M88 875 L88 890 L70 890" stroke="#B8860B" strokeWidth="2"
        fill="none" filter="url(#sketch)"/>
      <path d="M1112 875 L1112 890 L1130 890" stroke="#B8860B" strokeWidth="2"
        fill="none" filter="url(#sketch)"/>
      <line x1="70" y1="890" x2="1130" y2="890"
        stroke="#8B6914" strokeWidth="1.5" filter="url(#sketch)" opacity="0.5"/>

      {/* ── VERTICAL DIVIDERS (shelf sections) ── */}
      <line x1="390" y1="42" x2="390" y2="870"
        stroke="#92720A" strokeWidth="1" filter="url(#sketch)" opacity="0.4"
        strokeDasharray="4,8"/>
      <line x1="700" y1="42" x2="700" y2="870"
        stroke="#92720A" strokeWidth="1" filter="url(#sketch)" opacity="0.4"
        strokeDasharray="4,8"/>
      <line x1="1010" y1="42" x2="1010" y2="870"  
        stroke="#92720A" strokeWidth="1" filter="url(#sketch)" opacity="0.4"
        strokeDasharray="4,8"/>
    </svg>
  </div>
);
