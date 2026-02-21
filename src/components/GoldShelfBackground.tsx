// src/components/GoldShelfBackground.tsx
// Fixed background — 3D perspective retail gondola in gold sketch style.
// Matches founder's hand sketch: wide shelf unit viewed from above-left,
// 3 shelf levels, 3 bays, ADN-1 units on front edge of each shelf per bay,
// left end panel with diagonal hatching showing depth.
// Opacity 0.07 — texture only, never competes with content.

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
      viewBox="0 0 1200 800"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", opacity: 0.08 }}
    >
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#8B6914" />
          <stop offset="40%"  stopColor="#D4A017" />
          <stop offset="70%"  stopColor="#FFD700" />
          <stop offset="100%" stopColor="#92720A" />
        </linearGradient>
        <linearGradient id="goldH" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#C9980A" />
          <stop offset="50%"  stopColor="#FFD700" />
          <stop offset="100%" stopColor="#C9980A" />
        </linearGradient>
        <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#6B5010" />
          <stop offset="100%" stopColor="#9A7A1A" />
        </linearGradient>
        {/* Sketch wobble filter */}
        <filter id="sk" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>

      {/*
        PERSPECTIVE MAPPING (matching sketch):
        The gondola sits centre-screen, wide.
        Vanishing point implied top-right.
        
        Front face coordinates (the shelf face you see):
          Top-left front:     (130, 220)
          Top-right front:    (1070, 220)
          Bottom-left front:  (130, 680)
          Bottom-right front: (1070, 680)
        
        Top surface recedes to upper-left (perspective top):
          Top-left back:      (60, 170)
          Top-right back:     (1000, 170)
        
        Left end panel (depth face):
          Goes from front-left corner back to back-left corner
      */}

      {/* ── TOP SURFACE (perspective top, receding) ── */}
      <polygon
        points="130,220 1070,220 1000,170 60,170"
        stroke="#D4A017" strokeWidth="2" fill="none"
        filter="url(#sk)"
      />
      {/* Top surface fill lines (subtle) */}
      {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
        <line key={i}
          x1={130 + t*(1070-130)} y1={220}
          x2={60 + t*(1000-60)}   y2={170}
          stroke="#C9980A" strokeWidth="0.8" opacity="0.5"
          filter="url(#sk)"
        />
      ))}

      {/* ── LEFT END PANEL (depth face with hatching) ── */}
      <polygon
        points="130,220 60,170 60,630 130,680"
        stroke="#D4A017" strokeWidth="2" fill="none"
        filter="url(#sk)"
      />
      {/* Diagonal hatching on end panel — matches sketch */}
      {[-60,-40,-20,0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300].map((offset, i) => {
        // Lines going top-right to bottom-left within the end panel trapezoid
        const x1 = 60, y1 = 170 + offset;
        const x2 = 130, y2 = 220 + offset;
        // Clip to panel bounds roughly
        if (y1 > 630 || y2 > 680) return null;
        return (
          <line key={i}
            x1={Math.max(x1, 60)} y1={Math.min(Math.max(y1, 170), 630)}
            x2={Math.min(x2, 130)} y2={Math.min(Math.max(y2, 220), 680)}
            stroke="#92720A" strokeWidth="1" opacity="0.6"
            filter="url(#sk)"
          />
        );
      })}

      {/* ── OUTER FRAME — front face ── */}
      {/* Left vertical */}
      <line x1="130" y1="220" x2="130" y2="680" stroke="url(#goldH)" strokeWidth="3" filter="url(#sk)"/>
      {/* Right vertical */}
      <line x1="1070" y1="220" x2="1070" y2="680" stroke="url(#goldH)" strokeWidth="3" filter="url(#sk)"/>
      {/* Top horizontal */}
      <line x1="130" y1="220" x2="1070" y2="220" stroke="url(#goldH)" strokeWidth="3" filter="url(#sk)"/>
      {/* Bottom horizontal */}
      <line x1="130" y1="680" x2="1070" y2="680" stroke="url(#goldH)" strokeWidth="3" filter="url(#sk)"/>
      {/* Back verticals (top surface rear edge) */}
      <line x1="60" y1="170" x2="60" y2="630" stroke="#92720A" strokeWidth="2" filter="url(#sk)"/>
      <line x1="1000" y1="170" x2="1070" y2="220" stroke="#92720A" strokeWidth="2" filter="url(#sk)"/>
      {/* Bottom rear edge */}
      <line x1="60" y1="630" x2="130" y2="680" stroke="#92720A" strokeWidth="2" filter="url(#sk)"/>
      <line x1="1000" y1="630" x2="1070" y2="680" stroke="#92720A" strokeWidth="2" filter="url(#sk)"/>
      <line x1="60" y1="630" x2="1000" y2="630" stroke="#92720A" strokeWidth="1.5" filter="url(#sk)"/>

      {/* ── SHELF LEVELS — 3 horizontal shelves across front face ── */}
      {/* Shelf 1 at y=340, Shelf 2 at y=460, Shelf 3 at y=580 */}
      {[340, 460, 580].map((y, si) => {
        // Each shelf has a front edge and a receding top surface line
        const recessY = y - 12; // top surface of shelf board
        const recessXOffset = -14; // perspective recede left
        return (
          <g key={si} filter="url(#sk)">
            {/* Shelf front edge — full width */}
            <line x1="130" y1={y} x2="1070" y2={y} stroke="url(#goldH)" strokeWidth="2.5"/>
            {/* Shelf top surface line (receding) */}
            <line x1="130" y1={recessY} x2="1070" y2={recessY} stroke="#B8860B" strokeWidth="1.2" opacity="0.7"/>
            {/* Shelf depth — left side */}
            <line x1="130" y1={y} x2={130+recessXOffset} y2={recessY} stroke="#B8860B" strokeWidth="1.2" opacity="0.7"/>
            {/* Shelf depth — right side */}
            <line x1="1070" y1={y} x2={1070+recessXOffset} y2={recessY} stroke="#B8860B" strokeWidth="1.2" opacity="0.7"/>
            {/* Shelf underside shadow line */}
            <line x1="130" y1={y+5} x2="1070" y2={y+5} stroke="#6B5010" strokeWidth="1.5" opacity="0.5"/>
          </g>
        );
      })}

      {/* ── VERTICAL BAY DIVIDERS — 2 dividers creating 3 bays ── */}
      {/* Bay dividers at x≈430 and x≈730 */}
      {[430, 730].map((x, di) => {
        // Divider recedes to perspective
        const rearX = x - 14;
        return (
          <g key={di} filter="url(#sk)">
            {/* Front vertical divider */}
            <line x1={x} y1="220" x2={x} y2="680" stroke="#C9980A" strokeWidth="2"/>
            {/* Top receding line */}
            <line x1={x} y1="220" x2={rearX} y2="170" stroke="#92720A" strokeWidth="1.2" opacity="0.7"/>
          </g>
        );
      })}

      {/* ── ADN-1 UNITS — front edge of every shelf, every bay ── */}
      {/*
        3 bays: x ranges [130–430], [430–730], [730–1070]
        Bay centres: ~280, ~580, ~900
        3 shelf levels: y = 220 (top), 340, 460  (unit sits on shelf below it)
        Plus bottom shelf: 580
        Matching sketch: unit on top of each shelf board front edge
      */}
      {[
        // [bayCenter, shelfY] — unit sits just above each shelf line
        // Top shelf (220 = top of gondola) — 3 units
        [280, 220], [580, 220], [900, 220],
        // Shelf 1 at 340
        [280, 340], [580, 340], [900, 340],
        // Shelf 2 at 460
        [280, 460], [580, 460], [900, 460],
        // Shelf 3 at 580
        [280, 580], [580, 580], [900, 580],
      ].map(([cx, sy], i) => {
        const w = 72, h = 22;
        const x = cx - w/2;
        const y = sy - h - 2; // sit just above shelf line
        return (
          <g key={i} filter="url(#sk)">
            {/* Unit body */}
            <rect x={x} y={y} width={w} height={h} rx="2"
              stroke="#FFD700" strokeWidth="1.8" fill="none"/>
            {/* "ADN-1" label line */}
            <line x1={x+6} y1={y+8} x2={x+w-6} y2={y+8}
              stroke="#C9980A" strokeWidth="1.2"/>
            {/* Two sensor dots */}
            <circle cx={x+10} cy={y+15} r="2.5"
              stroke="#FFD700" strokeWidth="1.2" fill="none"/>
            <circle cx={x+20} cy={y+15} r="2.5"
              stroke="#FFD700" strokeWidth="1.2" fill="none"/>
            {/* Label text placeholder lines */}
            <line x1={x+28} y1={y+14} x2={x+w-6} y2={y+14}
              stroke="#B8860B" strokeWidth="1" opacity="0.8"/>
            {/* Mount clip at bottom */}
            <line x1={cx-8} y1={y+h} x2={cx-8} y2={sy+3}
              stroke="#92720A" strokeWidth="1.2"/>
            <line x1={cx+8} y1={y+h} x2={cx+8} y2={sy+3}
              stroke="#92720A" strokeWidth="1.2"/>
          </g>
        );
      })}

      {/* ── FLOOR BASE / FEET ── */}
      <ellipse cx="130" cy="685" rx="18" ry="6"
        stroke="#8B6914" strokeWidth="1.5" fill="none" filter="url(#sk)"/>
      <ellipse cx="1070" cy="685" rx="18" ry="6"
        stroke="#8B6914" strokeWidth="1.5" fill="none" filter="url(#sk)"/>
      <line x1="130" y1="680" x2="130" y2="692"
        stroke="#8B6914" strokeWidth="2" filter="url(#sk)"/>
      <line x1="1070" y1="680" x2="1070" y2="692"
        stroke="#8B6914" strokeWidth="2" filter="url(#sk)"/>
    </svg>
  </div>
);
