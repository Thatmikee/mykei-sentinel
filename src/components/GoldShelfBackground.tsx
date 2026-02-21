// src/components/GoldShelfBackground.tsx — v6
// More visible (opacity 0.15), gondola zoomed out so full unit sits in viewport.
// 3D perspective retail gondola, gold sketch style, matching founder sketch.

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
      viewBox="0 0 1400 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", opacity: 0.15 }}
    >
      <defs>
        <linearGradient id="goldH" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#A07820" />
          <stop offset="40%"  stopColor="#E8B824" />
          <stop offset="70%"  stopColor="#FFD700" />
          <stop offset="100%" stopColor="#A07820" />
        </linearGradient>
        <linearGradient id="goldV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#FFD700" />
          <stop offset="100%" stopColor="#7A5C0A" />
        </linearGradient>
        <filter id="sk" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="5" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2"
            xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>

      {/*
        GONDOLA COORDINATES — zoomed out, centred in viewport
        Front face:
          Top-left:     (80,  180)
          Top-right:    (1320, 180)
          Bottom-left:  (80,  820)
          Bottom-right: (1320, 820)
        Top surface recedes up-left:
          Rear-left:    (20,  120)
          Rear-right:   (1260, 120)
        Left end panel: front-left to rear-left, full height
      */}

      {/* ── TOP SURFACE ── */}
      <polygon
        points="80,180 1320,180 1260,120 20,120"
        stroke="#D4A017" strokeWidth="2.5" fill="none"
        filter="url(#sk)"
      />
      {/* Top surface depth lines */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line key={i}
          x1={80  + t * (1320 - 80)}  y1={180}
          x2={20  + t * (1260 - 20)}  y2={120}
          stroke="#B8860B" strokeWidth="0.9" opacity="0.5"
          filter="url(#sk)"
        />
      ))}

      {/* ── LEFT END PANEL with hatching ── */}
      <polygon
        points="80,180 20,120 20,760 80,820"
        stroke="#D4A017" strokeWidth="2.5" fill="none"
        filter="url(#sk)"
      />
      {/* Diagonal hatch lines */}
      {Array.from({ length: 22 }, (_, i) => {
        const offset = i * 32 - 60;
        const x1 = 20, y1 = Math.min(Math.max(120 + offset, 120), 760);
        const x2 = 80, y2 = Math.min(Math.max(180 + offset, 180), 820);
        if (y1 >= 760 || y2 >= 820) return null;
        return (
          <line key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#92720A" strokeWidth="1.2" opacity="0.65"
            filter="url(#sk)"
          />
        );
      })}

      {/* ── OUTER FRAME — front face ── */}
      <line x1="80"   y1="180" x2="80"   y2="820" stroke="url(#goldV)" strokeWidth="3.5" filter="url(#sk)"/>
      <line x1="1320" y1="180" x2="1320" y2="820" stroke="url(#goldV)" strokeWidth="3.5" filter="url(#sk)"/>
      <line x1="80"   y1="180" x2="1320" y2="180" stroke="url(#goldH)" strokeWidth="3.5" filter="url(#sk)"/>
      <line x1="80"   y1="820" x2="1320" y2="820" stroke="url(#goldH)" strokeWidth="3.5" filter="url(#sk)"/>
      {/* Back verticals */}
      <line x1="20"  y1="120" x2="20"   y2="760" stroke="#92720A" strokeWidth="2" filter="url(#sk)"/>
      <line x1="1260" y1="120" x2="1320" y2="180" stroke="#92720A" strokeWidth="2" filter="url(#sk)"/>
      {/* Bottom rear */}
      <line x1="20"   y1="760" x2="80"   y2="820" stroke="#92720A" strokeWidth="2" filter="url(#sk)"/>
      <line x1="1260" y1="760" x2="1320" y2="820" stroke="#92720A" strokeWidth="2" filter="url(#sk)"/>
      <line x1="20"   y1="760" x2="1260" y2="760" stroke="#92720A" strokeWidth="1.8" filter="url(#sk)" strokeDasharray="6,4"/>

      {/* ── 3 SHELF LEVELS ── */}
      {[370, 530, 690].map((y, si) => (
        <g key={si} filter="url(#sk)">
          {/* Shelf front face (thick board edge) */}
          <line x1="80"   y1={y} x2="1320" y2={y}   stroke="url(#goldH)" strokeWidth="3"/>
          {/* Shelf board top */}
          <line x1="80"   y1={y-14} x2="1320" y2={y-14} stroke="#C9980A" strokeWidth="1.5" opacity="0.7"/>
          {/* Recede depth lines at ends */}
          <line x1="80"   y1={y} x2="20"   y2={y-14} stroke="#B8860B" strokeWidth="1.5" opacity="0.7"/>
          <line x1="1320" y1={y} x2="1260" y2={y-14} stroke="#B8860B" strokeWidth="1.5" opacity="0.7"/>
          {/* Shadow under shelf */}
          <line x1="80"   y1={y+6} x2="1320" y2={y+6} stroke="#6B5010" strokeWidth="2" opacity="0.45"/>
        </g>
      ))}

      {/* ── 2 VERTICAL BAY DIVIDERS → 3 bays ── */}
      {[540, 900].map((x, di) => (
        <g key={di} filter="url(#sk)">
          <line x1={x} y1="180" x2={x} y2="820" stroke="#C9980A" strokeWidth="2.2"/>
          {/* Receding top edge */}
          <line x1={x} y1="180" x2={x - 15} y2="120" stroke="#92720A" strokeWidth="1.4" opacity="0.7"/>
        </g>
      ))}

      {/*
        ── ADN-1 UNITS ──
        3 bays × 4 shelf positions (top rail + 3 shelves)
        Bay centres: ~310, ~720, ~1110
        Shelf y positions: 180 (top rail), 370, 530, 690
        Unit sits just above the shelf line it's mounted on
      */}
      {[
        [310, 180], [720, 180], [1110, 180],
        [310, 370], [720, 370], [1110, 370],
        [310, 530], [720, 530], [1110, 530],
        [310, 690], [720, 690], [1110, 690],
      ].map(([cx, sy], i) => {
        const w = 90, h = 28;
        const x = cx - w / 2;
        const y = sy - h - 3;
        return (
          <g key={i} filter="url(#sk)">
            {/* Unit body */}
            <rect x={x} y={y} width={w} height={h} rx="3"
              stroke="#FFD700" strokeWidth="2" fill="none"/>
            {/* Top label line */}
            <line x1={x+8} y1={y+9} x2={x+w-8} y2={y+9}
              stroke="#C9980A" strokeWidth="1.4"/>
            {/* Sensor circles */}
            <circle cx={x+14} cy={y+19} r="3.5"
              stroke="#FFD700" strokeWidth="1.5" fill="none"/>
            <circle cx={x+26} cy={y+19} r="3.5"
              stroke="#FFD700" strokeWidth="1.5" fill="none"/>
            {/* Text placeholder lines */}
            <line x1={x+36} y1={y+17} x2={x+w-8} y2={y+17}
              stroke="#B8860B" strokeWidth="1.2" opacity="0.9"/>
            <line x1={x+36} y1={y+22} x2={x+w-18} y2={y+22}
              stroke="#B8860B" strokeWidth="0.9" opacity="0.6"/>
            {/* Mount clip */}
            <line x1={cx-10} y1={y+h} x2={cx-10} y2={sy+4}
              stroke="#92720A" strokeWidth="1.4"/>
            <line x1={cx+10} y1={y+h} x2={cx+10} y2={sy+4}
              stroke="#92720A" strokeWidth="1.4"/>
            <line x1={cx-10} y1={sy+4} x2={cx+10} y2={sy+4}
              stroke="#92720A" strokeWidth="1.2"/>
          </g>
        );
      })}

      {/* ── BASE FEET ── */}
      {[80, 1320].map((x, i) => (
        <g key={i} filter="url(#sk)">
          <line x1={x} y1="820" x2={x} y2="840" stroke="#8B6914" strokeWidth="3"/>
          <ellipse cx={x} cy="843" rx="22" ry="7"
            stroke="#8B6914" strokeWidth="1.8" fill="none"/>
        </g>
      ))}
    </svg>
  </div>
);
