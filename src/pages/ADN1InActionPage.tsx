// src/pages/ADN1InActionPage.tsx
// Route: /adn-in-action
// Gold background, Sora, scroll driven theft narrative

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   PARTICLE CANVAS, DNA spray burst
───────────────────────────────────────────────────────────── */
export function ParticleCanvas({ trigger }: { trigger: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pts = useRef<{
    x: number; y: number; vx: number; vy: number;
    life: number; r: number; dark: boolean;
  }[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    if (trigger === 0) return;
    pts.current = Array.from({ length: 120 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 11;
      return {
        x: 300, y: 290,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        life: 0.85 + Math.random() * 0.15,
        r: 1.5 + Math.random() * 4.5,
        dark: Math.random() > 0.5,
      };
    });
  }, [trigger]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let live = true;
    const tick = () => {
      if (!live) return;
      ctx.clearRect(0, 0, 600, 600);
      pts.current = pts.current
        .map(p => ({
          ...p,
          x: p.x + p.vx, y: p.y + p.vy,
          vy: p.vy + 0.24, vx: p.vx * 0.95,
          life: p.life - 0.017,
        }))
        .filter(p => p.life > 0);
      for (const p of pts.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.dark
          ? `rgba(5,5,5,${p.life * 0.85})`
          : `rgba(255,255,255,${p.life * 0.7})`;
        ctx.fill();
      }
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    return () => { live = false; cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <canvas
      ref={ref} width={600} height={600}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30 }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   SENSOR POD
───────────────────────────────────────────────────────────── */
export function SensorPod({ lit, ping }: { lit: boolean; ping: boolean }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
      background: lit ? "rgba(212,168,67,0.15)" : "#0E0E0E",
      border: `2px solid ${lit ? "#D8001F" : "#252525"}`,
      boxShadow: lit
        ? (ping ? "0 0 22px rgba(212,168,67,0.6), 0 0 44px rgba(212,168,67,0.2)" : "0 0 10px rgba(212,168,67,0.3)")
        : "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.5s ease", position: "relative",
    }}>
      <div style={{
        width: 13, height: 13, borderRadius: "50%",
        background: lit ? "#D8001F" : "#1A1A1A",
        boxShadow: lit ? "0 0 10px rgba(212,168,67,0.9)" : "none",
        transition: "all 0.5s",
      }} />
      {ping && (
        <div style={{
          position: "absolute", inset: -8, borderRadius: "50%",
          border: "1.5px solid rgba(212,168,67,0.4)",
          animation: "actionPing 1.3s ease-out infinite",
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ADN SCENE, dark panel on gold page
───────────────────────────────────────────────────────────── */
export function ADN1Scene({ phase }: { phase: number }) {
  const [sprayTrig, setSprayTrig] = useState(0);
  const prevPhase = useRef(-1);

  useEffect(() => {
    if (phase === 2 && prevPhase.current !== 2) setSprayTrig(t => t + 1);
    prevPhase.current = phase;
  }, [phase]);

  const rotY   = [-40, -32, -24, -16, -8][phase] ?? -40;
  const lit    = phase >= 1;
  const ping   = phase === 1;
  const marked = phase >= 2;
  const xmit   = phase >= 3;
  const done   = phase >= 4;

  const ledColor   = ["#00C896","#FF6B35","#FF8C42","#00C896","#EF4444"][phase] ?? "#00C896";
  const statusText = ["STANDBY","DETECTING","DEPLOYING","TRANSMITTING","STERILISED"][phase];

  // Thief movement: enters → reaches → sweeps → marked → backs off
  const thiefX    = [700, 448, 412, 412, 510][phase] ?? 700;
  const armRot    = [10, -62, 42, 42, 15][phase] ?? 10;   // big sweep arc
  const bodyTilt  = [0, -6, 12, 8, 0][phase] ?? 0;        // leans into sweep
  const legSplay  = [0, 10, 22, 18, 8][phase] ?? 0;       // lunging stance

  return (
    <div style={{ position: "relative", width: 600, height: 600 }}>

      {/* Phase-coloured ambient illumination */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: [
          "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(212,168,67,0.07) 0%, transparent 70%)",
          "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(255,107,53,0.18) 0%, transparent 65%), radial-gradient(ellipse 30% 20% at 75% 50%, rgba(255,60,0,0.12) 0%, transparent 60%)",
          "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(255,120,30,0.28) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 50% 48%, rgba(212,168,67,0.22) 0%, transparent 50%)",
          "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(0,200,150,0.18) 0%, transparent 65%), radial-gradient(ellipse 35% 25% at 50% 18%, rgba(0,200,150,0.12) 0%, transparent 55%)",
          "radial-gradient(ellipse 65% 55% at 50% 80%, rgba(239,68,68,0.16) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 38%, rgba(212,168,67,0.06) 0%, transparent 55%)",
        ][phase] ?? "",
        transition: "background 1.1s ease",
      }} />
      {/* Floor glow, light cast down from ADN */}
      <div style={{
        position: "absolute", bottom: 120, left: "50%", transform: "translateX(-50%)",
        width: 300, height: 80, pointerEvents: "none",
        background: `radial-gradient(ellipse 100% 100% at 50% 50%, rgba(${
          phase >= 3 ? "0,200,150" : phase >= 1 ? "255,120,30" : "212,168,67"
        },${phase >= 1 ? 0.1 : 0.04}) 0%, transparent 70%)`,
        transition: "all 1s ease",
        borderRadius: "50%",
      }} />

      {/* ── CSS 3D ADN UNIT ── */}
      <div style={{ position: "absolute", top: 115, left: "50%", transform: "translateX(-50%)", perspective: 1400 }}>
        <div style={{
          width: 300, height: 96,
          position: "relative", transformStyle: "preserve-3d",
          transform: `rotateX(-17deg) rotateY(${rotY}deg)`,
          transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {/* FRONT */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(145deg,#111 0%,#0C0C0C 100%)",
            border: `1px solid ${lit ? "rgba(212,168,67,0.3)" : "#1E1E1E"}`,
            transform: "translateZ(48px)",
            display: "flex", alignItems: "center", padding: "0 24px", gap: 18,
            boxShadow: lit ? "0 0 50px rgba(212,168,67,0.08)" : "none",
            transition: "all 0.6s",
          }}>
            <SensorPod lit={lit} ping={ping} />
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 4, color: "#303030", marginBottom: 7 }}>ADN · 1</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: 2, color: ledColor, transition: "color 0.4s" }}>{statusText}</div>
            </div>
            <SensorPod lit={lit} ping={ping} />
            <div style={{
              width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
              background: ledColor,
              boxShadow: `0 0 10px ${ledColor}, 0 0 22px ${ledColor}44`,
              animation: "actionPulse 1.9s ease-in-out infinite",
              transition: "all 0.4s",
            }} />
          </div>
          {/* TOP */}
          <div style={{
            position: "absolute", width: 300, height: 96,
            background: "#090909",
            backgroundImage: "repeating-linear-gradient(90deg,#111 0,#111 1px,transparent 1px,transparent 28px),repeating-linear-gradient(0deg,#111 0,#111 1px,transparent 1px,transparent 28px)",
            transform: "rotateX(90deg) translateZ(-48px)",
            border: "1px solid #161616",
          }} />
          {/* RIGHT SIDE */}
          <div style={{
            position: "absolute", top: 0, height: 96, width: 96, right: 0,
            background: "#080808", border: "1px solid #141414",
            transform: "rotateY(-90deg) translateZ(300px)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9,
          }}>
            <div style={{ width: 15, height: 9, borderRadius: 3, background: "#141414", border: "1px solid #222" }} />
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: xmit ? "#00C896" : "#141414",
              boxShadow: xmit ? "0 0 10px #00C896" : "none",
              transition: "all 0.6s",
            }} />
          </div>
          {/* BOTTOM, nozzle row */}
          <div style={{
            position: "absolute", width: 300, height: 96, bottom: 0,
            background: marked ? "rgba(212,168,67,0.05)" : "#050505",
            transform: "rotateX(-90deg) translateZ(48px)",
            border: `1px solid ${marked ? "rgba(212,168,67,0.15)" : "#111"}`,
            display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 28px",
            transition: "all 0.7s",
          }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 10, height: 10, borderRadius: "50%",
                background: marked ? "#D8001F" : "#1A1A1A",
                boxShadow: marked ? "0 0 10px rgba(212,168,67,0.8)" : "none",
                transition: `all 0.4s ease ${i*80}ms`,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── SVG SCENE ── */}
      <svg viewBox="0 0 600 600" style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
        <defs>
          <radialGradient id="laserCone" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#D8001F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D8001F" stopOpacity="0" />
          </radialGradient>
          {/* 3D sphere for thief head */}
          <radialGradient id="head3d" cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#3A3A3A" />
            <stop offset="55%" stopColor="#1C1C1C" />
            <stop offset="100%" stopColor="#080808" />
          </radialGradient>
          {/* Tagged head, golden glow */}
          <radialGradient id="headTagged" cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="rgba(255,200,80,0.9)" />
            <stop offset="55%" stopColor="rgba(212,168,67,0.6)" />
            <stop offset="100%" stopColor="rgba(180,120,20,0.3)" />
          </radialGradient>
          {/* 3D body gradient, lit from upper-left */}
          <linearGradient id="body3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E2E2E" />
            <stop offset="45%" stopColor="#181818" />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>
          <linearGradient id="bodyTagged" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,200,80,0.7)" />
            <stop offset="55%" stopColor="rgba(212,168,67,0.4)" />
            <stop offset="100%" stopColor="rgba(160,110,10,0.2)" />
          </linearGradient>
          {/* Drop shadow for depth */}
          <filter id="thiefDepth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="5" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.7" />
          </filter>
          {/* Motion blur on sweep arm */}
          <filter id="armBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5 0.8" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="sceneGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Spotlight from ADN downward */}
          <radialGradient id="spotlight" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor={phase >= 2 ? "rgba(255,120,30,0.18)" : "rgba(212,168,67,0.1)"} stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Spotlight from ADN unit downward, active when lit */}
        {lit && (
          <polygon
            points="220,210 380,210 480,295 120,295"
            fill="url(#spotlight)" opacity={phase === 2 ? 0.9 : 0.5}
            style={{ transition: "opacity 0.8s" }}
          />
        )}
        {/* Wall panel behind unit */}
        <rect x="60" y="90" width="480" height="220" rx="4" fill="#0A0A0A" opacity="0.4" />

        {/* Shelf rail */}
        <rect x="48" y="290" width="504" height="5" rx="2.5" fill="#1A1A1A" />
        <rect x="48" y="290" width="504" height="1.5" fill="#D8001F" opacity="0.25" />
        <rect x="90" y="264" width="8" height="30" rx="2" fill="#141414" />
        <rect x="502" y="264" width="8" height="30" rx="2" fill="#141414" />

        {/* 6 products, items 0-2 in sweep zone, 3-5 remain */}
        {[0,1,2,3,4,5].map(i => {
          const x      = 68 + i * 80;
          const swept  = phase >= 1 && i >= 3;
          const tagged = phase >= 2 && i < 3;
          const blk    = done && i < 3;
          return (
            <g key={i}>
              <rect
                x={x} y={swept ? 255 : 298} width={62} height={swept ? 0 : 50} rx={5}
                fill={tagged ? "rgba(212,168,67,0.07)" : "#0D0D0D"}
                stroke={blk ? "#EF4444" : tagged ? "#D8001F" : "#1C1C1C"}
                strokeWidth={tagged ? 1.5 : 0.8}
                opacity={swept ? 0 : 1}
                style={{ transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}
              />
              {tagged && !swept && (
                <text x={x+31} y={323} textAnchor="middle" fontSize={7}
                  fill="#D8001F" fontFamily="JetBrains Mono,monospace" opacity={0.65}>DNA</text>
              )}
              {blk && !swept && (
                <text x={x+31} y={316} textAnchor="middle" fontSize={16}
                  fill="#EF4444" opacity={0.9}>✕</text>
              )}
            </g>
          );
        })}

        {/* THIEF, 3D silhouette with bulk-sweep movement */}
        {/* Ground shadow, grounding in 3D space */}
        <ellipse
          cx={thiefX} cy={298} rx={thiefX < 700 ? 28 : 0} ry={7}
          fill="rgba(0,0,0,0.55)"
          style={{ transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)" }}
        />
        {/* Flying items swept off shelf, phase 1 */}
        {phase >= 1 && phase <= 2 && [
          { x: thiefX - 30, y: 268, w: 22, h: 16, delay: "0s", r: phase === 2 ? -18 : -5 },
          { x: thiefX - 12, y: 260, w: 18, h: 14, delay: "0.1s", r: phase === 2 ? 8 : 2 },
          { x: thiefX + 6,  y: 264, w: 20, h: 15, delay: "0.2s", r: phase === 2 ? -12 : -3 },
        ].map((item, i) => (
          <rect key={i} x={item.x} y={item.y} width={item.w} height={item.h} rx={3}
            fill="rgba(212,168,67,0.12)" stroke="rgba(212,168,67,0.35)" strokeWidth={1}
            transform={`rotate(${item.r},${item.x + item.w/2},${item.y + item.h/2})`}
            style={{ transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${item.delay}` }}
            opacity={0.85}
          />
        ))}
        {/* Main thief group, body tilts with the sweep */}
        <g
          transform={`translate(${thiefX},250) rotate(${bodyTilt},0,0)`}
          style={{ transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1)" }}
          filter="url(#thiefDepth)"
        >
          {/* Hood arc, depth and character */}
          <path
            d={`M -18,-68 Q 0,-90 18,-68`}
            fill={phase >= 2 ? "rgba(180,120,10,0.6)" : "#1A1A1A"}
            style={{ transition: "fill 0.5s" }}
          />
          {/* Head, 3D sphere gradient */}
          <circle
            cx={0} cy={-58} r={16}
            fill={phase >= 2 ? "url(#headTagged)" : "url(#head3d)"}
            style={{ transition: "fill 0.5s" }}
          />
          {/* Highlight on head, simulates light source */}
          <circle cx={-5} cy={-64} r={4} fill={phase >= 2 ? "rgba(255,230,100,0.35)" : "rgba(255,255,255,0.06)"} />
          {/* Neck */}
          <rect x={-5} y={-42} width={10} height={9} rx={2}
            fill={phase >= 2 ? "rgba(212,168,67,0.45)" : "#161616"}
            style={{ transition: "fill 0.5s" }}
          />
          {/* Torso, trapezoidal, wider at shoulders (3D body gradient) */}
          <path
            d={`M -22,-33 L -24,-2 L 24,-2 L 22,-33 Z`}
            fill={phase >= 2 ? "url(#bodyTagged)" : "url(#body3d)"}
            style={{ transition: "fill 0.5s" }}
          />
          {/* Hoodie front pocket detail */}
          <path d="M -9,-2 Q 0,6 9,-2" fill="none" stroke={phase >= 2 ? "rgba(200,140,20,0.25)" : "rgba(255,255,255,0.04)"} strokeWidth={1.5} />
          {/* Shoulder highlight */}
          <ellipse cx={-18} cy={-30} rx={5} ry={3} fill={phase >= 2 ? "rgba(255,200,80,0.2)" : "rgba(255,255,255,0.04)"} />
          {/* Left leg, back leg, slightly raised in lunge */}
          <path
            d={`M -9,-2 Q ${-14 - legSplay * 0.3},14 ${-14 - legSplay * 0.5},38`}
            stroke={phase >= 2 ? "rgba(212,168,67,0.65)" : "#1C1C1C"}
            strokeWidth={8} strokeLinecap="round" fill="none"
            style={{ transition: "all 0.8s ease" }}
          />
          {/* Right leg, front leg, planted forward in lunge */}
          <path
            d={`M 9,-2 Q ${14 + legSplay * 0.4},14 ${10 + legSplay},38`}
            stroke={phase >= 2 ? "rgba(212,168,67,0.65)" : "#1C1C1C"}
            strokeWidth={8} strokeLinecap="round" fill="none"
            style={{ transition: "all 0.8s ease" }}
          />
          {/* Foot highlights */}
          <ellipse cx={-14 - legSplay * 0.5} cy={40} rx={7} ry={3}
            fill={phase >= 2 ? "rgba(212,168,67,0.3)" : "#141414"}
            style={{ transition: "all 0.8s ease" }}
          />
          <ellipse cx={10 + legSplay} cy={40} rx={7} ry={3}
            fill={phase >= 2 ? "rgba(212,168,67,0.3)" : "#141414"}
            style={{ transition: "all 0.8s ease" }}
          />
          {/* SWEEPING ARM, the bulk-theft action arm (left, reaching toward shelf) */}
          <g
            transform={`rotate(${armRot}, -16, -26)`}
            style={{ transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)" }}
          >
            {/* Motion trail on arm during sweep (phase 1→2) */}
            {phase === 2 && (
              <>
                <line x1={-16} y1={-26} x2={-62} y2={10}
                  stroke="rgba(212,168,67,0.08)" strokeWidth={10} strokeLinecap="round" />
                <line x1={-16} y1={-26} x2={-58} y2={8}
                  stroke="rgba(212,168,67,0.12)" strokeWidth={8} strokeLinecap="round" />
              </>
            )}
            <path
              d={`M -16,-26 Q -40,-8 -62,10`}
              stroke={phase >= 2 ? "rgba(255,180,50,0.8)" : "#202020"}
              strokeWidth={7} strokeLinecap="round" fill="none"
              style={{ transition: "stroke 0.5s" }}
            />
            {/* Hand */}
            <circle cx={-62} cy={10} r={5.5}
              fill={phase >= 2 ? "rgba(212,168,67,0.7)" : "#181818"}
              style={{ transition: "fill 0.5s" }}
            />
          </g>
          {/* CARRY ARM, right arm, holds stolen items in phase 2+ */}
          <path
            d={`M 16,-26 Q ${phase >= 2 ? 32 : 28},-8 ${phase >= 2 ? 38 : 30},12`}
            stroke={phase >= 2 ? "rgba(255,180,50,0.7)" : "#202020"}
            strokeWidth={7} strokeLinecap="round" fill="none"
            style={{ transition: "all 0.7s ease" }}
          />
          {/* Stolen items in right hand, phase 2+ */}
          {phase >= 2 && (
            <g>
              <rect x={32} y={4} width={24} height={18} rx={3}
                fill="rgba(212,168,67,0.15)" stroke="rgba(212,168,67,0.45)" strokeWidth={1.2}
                transform="rotate(-10,44,13)"
              />
              <rect x={48} y={0} width={18} height={15} rx={3}
                fill="rgba(212,168,67,0.1)" stroke="rgba(212,168,67,0.35)" strokeWidth={1}
                transform="rotate(8,57,7)"
              />
            </g>
          )}
          {/* DNA tagged halo, phase 2+ */}
          {phase >= 2 && (
            <>
              <circle cx={0} cy={-20} r={0} fill="none" stroke="#D8001F" strokeWidth={2} strokeOpacity={0.7}>
                <animate attributeName="r" from="8" to="75" dur="1.1s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" from="0.8" to="0" dur="1.1s" repeatCount="indefinite" />
              </circle>
              <circle cx={0} cy={-20} r={0} fill="none" stroke="#D8001F" strokeWidth={1} strokeOpacity={0.5}>
                <animate attributeName="r" from="8" to="75" dur="1.1s" begin="0.35s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" from="0.6" to="0" dur="1.1s" begin="0.35s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </g>

        {/* LASER BEAMS, phase 1+ */}
        {phase >= 1 && (
          <>
            {/* Left cone + beam */}
            <polygon points="192,248 80,295 240,295"
              fill="url(#laserCone)" opacity={phase === 1 ? 0.9 : 0.5} />
            <line x1="192" y1="248" x2="105" y2="293"
              stroke={phase === 2 ? "#FF8C42" : "#D8001F"} strokeWidth="2" strokeOpacity="0.9" strokeDasharray="5 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.35s" repeatCount="indefinite" />
            </line>
            {/* Right cone + beam */}
            <polygon points="408,248 360,295 520,295"
              fill="url(#laserCone)" opacity={phase === 1 ? 0.9 : 0.5} />
            <line x1="408" y1="248" x2="495" y2="293"
              stroke={phase === 2 ? "#FF8C42" : "#D8001F"} strokeWidth="2" strokeOpacity="0.9" strokeDasharray="5 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.35s" repeatCount="indefinite" />
            </line>
            {/* Scan sweep line */}
            <line x1="48" y1="268" x2="552" y2="268"
              stroke={phase === 1 ? "#FF6B35" : "#D8001F"} strokeWidth="0.8" strokeOpacity={phase === 1 ? 0.25 : 0.1} strokeDasharray="3 14">
              <animateTransform attributeName="transform" type="translate"
                from="0 -14" to="0 14" dur="1s" repeatCount="indefinite" additive="sum" />
            </line>
            {/* Warning pulse rings from ADN, phase 1 alert */}
            {phase === 1 && [0,1].map(i => (
              <circle key={i} cx={300} cy={210} r={0}
                fill="none" stroke="#FF6B35" strokeWidth={1.5} strokeOpacity={0.6}>
                <animate attributeName="r" from="10" to="90"
                  dur="1.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" from="0.6" to="0"
                  dur="1.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </>
        )}

        {/* SPRAY RINGS, phase 2: vibrant multi-colour burst */}
        {phase === 2 && (
          <>
            {/* Golden DNA spray rings */}
            {[0,1,2,3].map(i => (
              <circle key={i} cx={300} cy={260} r={0}
                fill="none"
                stroke={["#D8001F","#D8001F","#FF8C42","#FF6B35"][i]}
                strokeWidth={2.5 - i * 0.4} strokeOpacity={0.75}>
                <animate attributeName="r" from="6" to={90 + i * 26}
                  dur={`${0.8 + i * 0.25}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" from="0.8" to="0"
                  dur={`${0.8 + i * 0.25}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Centre flash, bright burst glow */}
            <circle cx={300} cy={260} r={18}
              fill="rgba(255,200,60,0.12)" stroke="rgba(255,200,60,0.5)" strokeWidth={1}>
              <animate attributeName="r" from="8" to="28" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.9" to="0" dur="0.6s" repeatCount="indefinite" />
            </circle>
          </>
        )}
        {phase > 2 && (
          <circle cx={300} cy={260} r={118}
            fill="none" stroke="rgba(212,168,67,0.12)" strokeWidth={0.8} strokeDasharray="3 12" />
        )}

        {/* DATA STREAMS, phase 3: teal encrypted uplinks */}
        {phase >= 3 && (
          <>
            {/* Glowing stream columns */}
            {[115,185,300,415,485].map((x,i) => (
              <g key={i}>
                <line x1={x} y1={230} x2={x} y2={95}
                  stroke="#00C896" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="6 8">
                  <animate attributeName="stroke-dashoffset" from="0" to="-28"
                    dur={`${0.55 + i * 0.1}s`} repeatCount="indefinite" />
                </line>
                {/* Packet dots moving up */}
                <circle cx={x} cy={160} r={3} fill="#00C896" opacity={0.7}>
                  <animate attributeName="cy" from="230" to="95"
                    dur={`${0.9 + i * 0.15}s`} begin={`${i * 0.12}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.9" to="0"
                    dur={`${0.9 + i * 0.15}s`} begin={`${i * 0.12}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
            {/* Mykei cloud registry shape */}
            <ellipse cx={300} cy={66} rx={66} ry={24}
              fill="#030C0A" stroke="#00C896" strokeWidth="1.8" strokeOpacity="0.7" />
            <ellipse cx={258} cy={53} rx={30} ry={20}
              fill="#030C0A" stroke="#00C896" strokeWidth="1.2" strokeOpacity="0.5" />
            <ellipse cx={342} cy={53} rx={30} ry={20}
              fill="#030C0A" stroke="#00C896" strokeWidth="1.2" strokeOpacity="0.5" />
            {/* Cloud glow */}
            <ellipse cx={300} cy={60} rx={80} ry={32} fill="rgba(0,200,150,0.06)" />
            <text x={300} y={72} textAnchor="middle" fontSize={8}
              fill="#00C896" fontFamily="JetBrains Mono,monospace" letterSpacing={1.5} opacity={0.9}>
              Mykei Registry
            </text>
            {/* Lock badge */}
            <text x={300} y={58} textAnchor="middle" fontSize={7}
              fill="rgba(0,200,150,0.6)" fontFamily="JetBrains Mono,monospace" letterSpacing={1}>
              🔒 TLS 1.3 · AES-256
            </text>
          </>
        )}

        {/* PLATFORM BLOCKS, phase 4 */}
        {done && (
          <>
            {[{x:38,n:"Registry"},{x:168,n:"Retailer"},{x:298,n:"Insurer"},{x:428,n:"Investigation"}].map(({x,n}) => (
              <g key={n}>
                <rect x={x} y={385} width={112} height={52} rx={7}
                  fill="#080808" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.55" />
                <text x={x+56} y={406} textAnchor="middle" fontSize={8.5}
                  fill="#555" fontFamily="JetBrains Mono,monospace">{n}</text>
                <text x={x+56} y={427} textAnchor="middle" fontSize={10}
                  fill="#2dd4bf" fontFamily="JetBrains Mono,monospace">✓ LINKED</text>
              </g>
            ))}
            <rect x={108} y={452} width={384} height={28} rx={5}
              fill="rgba(239,68,68,0.07)" stroke="#EF4444" strokeWidth={1} strokeOpacity={0.3} />
            <text x={300} y={471} textAnchor="middle" fontSize={8}
              fill="#EF4444" fontFamily="JetBrains Mono,monospace" letterSpacing={1.5}>
              TOXIC INVENTORY REGISTRY · ACTIVE
            </text>
          </>
        )}

        {/* Phase progress dots, left edge */}
        <line x1={28} y1={200} x2={28} y2={400} stroke="#1A1A1A" strokeWidth={1} />
        {[0,1,2,3,4].map(i => (
          <g key={i}>
            <circle cx={28} cy={200+i*50} r={5}
              fill={i <= phase ? "#D8001F" : "#141414"}
              stroke={i === phase ? "#D8001F" : "#1E1E1E"}
              strokeWidth={i === phase ? 1.5 : 1}
            />
            {i < 4 && <line x1={28} y1={205+i*50} x2={28} y2={245+i*50}
              stroke={i < phase ? "#5A3E10" : "#141414"} strokeWidth={1} />}
          </g>
        ))}
      </svg>

      <ParticleCanvas trigger={sprayTrig} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PHASE CONTENT
───────────────────────────────────────────────────────────── */
export const SCENES = [
  {
    phase: "01",
    label: "Standby",
    title: "The ADN sits on your shelf.\nSilent. Always watching.",
    body: "Dual Tactical Multi-zone Sensor Array units fire 940nm laser pulses at 30Hz. They read depth velocity across the entire shelf face, around the clock. Not watching people. Watching physics.",
    tech: [
      ["SENSOR",    "Tactical Multi-zone Sensor Array"],
      ["FREQUENCY", "940nm VCSEL · 30Hz"],
      ["COVERAGE",  "Full shelf face · 1,200mm range"],
      ["GDPR",      "No camera. No biometric data."],
    ],
  },
  {
    phase: "02",
    label: "Theft Detected",
    title: "A bulk sweep event.\nClassified in under 50ms.",
    body: "The Encrypted Logic Core kinetic signature classifier detects an arm clearing multiple items in a single lateral motion. That physics pattern does not occur in normal shopping. The algorithm fires. No cloud round-trip. On-device. Immediate.",
    tech: [
      ["PROCESSOR",  "Encrypted Logic Core"],
      ["ALGORITHM",  "Kinetic signature classifier"],
      ["DECISION",   "< 50ms · fully on-device"],
      ["PATENT",     "No. 2606630.8 (UK)"],
    ],
  },
  {
    phase: "03",
    label: "DNA Deployed",
    title: "An invisible cloud.\nMolecularly bonded to the evidence.",
    body: "The Ultrasonic Deployment Module fires a cloud of Proprietary Forensic Marking Compound, unique to this retailer's batch. The formula bonds to skin, clothing, and merchandise at a molecular level. It does not wash off. It fluoresces under UV. It is the evidence.",
    tech: [
      ["MARKER",    "Proprietary Forensic Marking Compound"],
      ["ACTUATOR",  "Ultrasonic Deployment Module"],
      ["DEPLOY",    "< 200ms from trigger"],
      ["BOND",      "Permanent · UV verifiable · evidential workflow ready"],
    ],
  },
  {
    phase: "04",
    label: "Forensic Record Created",
    title: "Encrypted. Timestamped.\nTamper-aware. Before they leave the door.",
    body: "AES-256-GCM cartridge-linked event record assembled in milliseconds: sensor telemetry, batch code, timestamp. Signed and transmitted over TLS 1.3 to the Mykei secure cloud registry via MQTT. Tamper-aware audit trail. Designed to support evidential workflows.",
    tech: [
      ["ENCRYPTION", "AES-256-GCM"],
      ["TRANSPORT",  "TLS 1.3 · MQTT"],
      ["CLOUD",      "Secure cloud registry"],
      ["EVIDENTIAL", "Designed to support evidential workflows"],
    ],
  },
  {
    phase: "05",
    label: "Evidence Created",
    title: "Batch-linked. Timestamped.\nForensically traceable.",
    body: "The cartridge-linked event record is created in the Mykei Registry, connecting device ID, batch reference, store, and timestamp. This registry-linked event record supports resale disruption confidence, insurer review, law-enforcement verification, and investigation workflows.",
    tech: [
      ["REGISTRY",   "Mykei Registry"],
      ["BATCH",      "Device · Store · Timestamp · Reference"],
      ["RESALE",     "Reduced resale confidence"],
      ["OUTCOME",    "Economic sterilisation"],
    ],
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function ADN1InActionPage() {
  const navigate = useNavigate();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = "ADN in Action, Scroll-Through Simulation | Mykei Securities";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "A scroll-driven simulation of the ADN detection, marking, and registry sequence, illustrative only, not a live deployment or real event data.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://mykei.io/adn-in-action";
  }, []);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight / 2;
      let best = 0, bestDist = Infinity;
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs((r.top + r.height / 2) - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setPhase(best);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes actionPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes actionPing  { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.5);opacity:0} }
        @keyframes actionFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes actionFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes actionCharIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes actionScanLine { 0%,100%{opacity:0.08} 50%{opacity:0.18} }

        .adn-action { background: #fff; color: #1A1A18; }

        /* NAV */
        .adn-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 52px;
          background: rgba(255,255,255,0.96); backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .adn-nav-home {
          display: flex; align-items: center; gap: 8px; text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing: 2px; color: rgba(0,0,0,0.5);
          transition: color 0.2s;
        }
        .adn-nav-home:hover { color: #050505; }
        .adn-nav-logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 3px; color: rgba(0,0,0,0.35);
        }
        .adn-nav-back {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 2px; color: rgba(0,0,0,0.4);
          background: none; border: none; cursor: pointer; transition: color 0.3s;
        }
        .adn-nav-back:hover { color: #050505; }

        /* HERO */
        .adn-hero {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 130px 80px 90px; text-align: center;
          background: #fff;
          position: relative; overflow: hidden;
        }
        .adn-hero::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .adn-hero-overline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 3.5px; color: rgba(0,0,0,0.45);
          text-transform: uppercase; margin-bottom: 28px;
          animation: actionFadeUp 0.7s ease both;
        }
        .adn-hero-h1 {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: clamp(54px, 8vw, 108px);
          font-style: italic; font-weight: 700;
          line-height: 1.02; letter-spacing: -2px;
          color: #050505; margin-bottom: 32px;
          animation: actionFadeUp 0.8s 0.1s ease both;
        }
        .adn-hero-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px; letter-spacing: 1.5px; color: rgba(0,0,0,0.5);
          max-width: 560px; line-height: 1.9; margin-bottom: 56px;
          animation: actionFadeUp 0.9s 0.25s ease both;
        }
        .adn-scroll-hint {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          animation: actionFadeUp 1s 0.5s ease both;
        }
        .adn-scroll-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8.5px; letter-spacing: 3px; color: rgba(0,0,0,0.35);
          text-transform: uppercase;
        }
        .adn-scroll-arrow {
          width: 28px; height: 28px;
          border: 1.5px solid rgba(0,0,0,0.25);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          animation: actionFloat 2s ease-in-out infinite;
        }

        /* STATS BAR */
        .adn-stats {
          background: #FFFFFF; color: #1E1E1E;
          display: grid; grid-template-columns: repeat(4,1fr);
          border-top: 2px solid rgba(0,0,0,0.2);
        }
        .adn-stat {
          padding: 32px 24px; text-align: center;
          border-right: 1px solid #1A1A1A;
        }
        .adn-stat:last-child { border-right: none; }
        .adn-stat-n {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 40px; font-style: italic; font-weight: 700;
          color: #D8001F; letter-spacing: -1px;
        }
        .adn-stat-l {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7.5px; letter-spacing: 2px; color: #444;
          text-transform: uppercase; margin-top: 8px;
        }

        /* SPLIT SCROLL */
        .adn-split { display: flex; align-items: flex-start; background: #F4F6F8; }
        .adn-split-left { flex: 0 0 48%; padding: 8vh 48px 20vh 80px; }
        .adn-split-right {
          flex: 0 0 52%;
          position: sticky; top: 0; height: 100vh;
          background: #FFFFFF;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }

        /* Scene panel label */
        .adn-split-right::before {
          content: 'ADN LIVE SIM';
          position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px; letter-spacing: 3px; color: #2A2A2A;
          z-index: 10;
        }

        /* PHASE SECTIONS */
        .adn-phase {
          min-height: 110vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 20vh 0;
          opacity: 0.18; transition: opacity 0.6s ease;
        }
        .adn-phase.active { opacity: 1; }

        .adn-phase-num {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 110px; font-style: italic; font-weight: 700;
          color: rgba(0,0,0,0.08); line-height: 1; letter-spacing: -5px;
          margin-bottom: -18px;
        }
        .adn-phase-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing: 3px; color: rgba(0,0,0,0.45);
          text-transform: uppercase; margin-bottom: 18px;
        }
        .adn-phase-title {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: clamp(30px, 3.5vw, 46px);
          font-style: italic; font-weight: 700;
          line-height: 1.12; color: #050505;
          margin-bottom: 22px; white-space: pre-line;
        }
        .adn-phase-body {
          font-size: 15.5px; line-height: 1.82;
          color: rgba(0,0,0,0.6);
          margin-bottom: 34px; max-width: 440px;
        }

        /* Tech table */
        .adn-tech {
          border: 1px solid rgba(0,0,0,0.15); border-radius: 8px;
          overflow: hidden; background: rgba(0,0,0,0.06);
        }
        .adn-tech-row {
          display: flex; border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .adn-tech-row:last-child { border-bottom: none; }
        .adn-tech-key {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7.5px; letter-spacing: 1.5px;
          color: rgba(0,0,0,0.35); padding: 11px 16px;
          background: rgba(0,0,0,0.07); min-width: 144px;
          text-transform: uppercase; border-right: 1px solid rgba(0,0,0,0.08);
        }
        .adn-tech-val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; color: rgba(0,0,0,0.55);
          padding: 11px 16px; flex: 1;
        }

        /* CTA SECTION */
        .adn-cta {
          background: #FFFFFF; color: #1E1E1E;
          padding: 120px 80px; text-align: center;
        }
        .adn-cta-overline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing: 3px; color: #D8001F;
          text-transform: uppercase; margin-bottom: 28px;
        }
        .adn-cta-h2 {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: clamp(38px, 5vw, 66px);
          font-style: italic; font-weight: 700;
          line-height: 1.08; letter-spacing: -2px;
          color: #1E1E1E; margin-bottom: 24px;
        }
        .adn-cta-h2 em { color: #D8001F; font-style: italic; }
        .adn-cta-sub {
          font-size: 17px; line-height: 1.8; color: #555;
          max-width: 540px; margin: 0 auto 52px;
        }
        .adn-cta-btn {
          display: inline-block;
          background: #D8001F; color: #050505;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700; font-size: 12px; letter-spacing: 2px;
          text-transform: uppercase;
          padding: 22px 60px; border-radius: 8px; text-decoration: none;
          transition: all 0.35s ease;
        }
        .adn-cta-btn:hover {
          background: #D8001F; transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(212,168,67,0.3);
        }

        /* FOOTER */
        .adn-footer {
          background: #FFFFFF; border-top: 1px solid #0D0D0D;
          padding: 40px 80px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .adn-footer-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing: 3px; color: #2A2A2A;
        }
        .adn-footer-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8.5px; color: #1E1E1E;
        }

        /* MOBILE */
        @media (max-width: 860px) {
          /* Scene panel above text */
          .adn-split { flex-direction: column; }
          .adn-split-right {
            order: -1;
            position: sticky; top: 0; z-index: 10;
            flex: none; width: 100%;
            height: 56vw; min-height: 280px; max-height: 420px;
            overflow: hidden;
          }
          .adn-split-left { order: 1; }
          /* Scale the 600×600 scene to fit screen width */
          .adn-split-right > div {
            position: absolute !important;
            top: 50% !important; left: 50% !important;
            transform: translate(-50%,-50%) scale(var(--scene-scale, 0.55)) !important;
            transform-origin: center center !important;
          }
          .adn-split-left { flex: none; width: 100%; padding: 0 24px 60px; }
          .adn-hero { padding: 60px 24px 70px; }
          .adn-stats { grid-template-columns: repeat(2,1fr); }
          .adn-cta { padding: 70px 24px; }
          .adn-footer { flex-direction: column; gap: 12px; padding: 32px 24px; text-align: center; }
          .adn-phase-num { font-size: 72px; }
          .adn-phase { min-height: 80vh; padding: 12vh 0; }
          .adn-nav { padding: 16px 24px; position: relative; }
        }
        @media (max-width: 480px) {
          .adn-split-right > div { transform: translate(-50%,-50%) scale(0.42) !important; }
        }
      `}</style>

      <div className="adn-action">

        {/* NAV */}
        <nav className="adn-nav">
          <a href="/" className="adn-nav-home">
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" as const }}>MYKEI</span>
            Home
          </a>
          <div className="adn-nav-logo">ADN IN ACTION</div>
          <button className="adn-nav-back" onClick={() => navigate("/howitworks")}>← How It Works</button>
        </nav>

        {/* HERO */}
        <section className="adn-hero">
          <div className="adn-hero-overline">Mykei Securities · ADN · Live Simulation</div>
          <h1 className="adn-hero-h1">
            ADN<br />in Action.
          </h1>
          <p className="adn-hero-sub">
            From the moment a thief sweeps your shelf, to the moment<br />
            those goods carry a batch-linked forensic event record. Scroll to watch it happen.
          </p>
          <div className="adn-scroll-hint">
            <div className="adn-scroll-label">Scroll to begin</div>
            <div className="adn-scroll-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M3 7l3 3 3-3" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div className="adn-stats">
          {[
            { n: "200ms", l: "Detection to deployment" },
            { n: "50ms",  l: "On-device decision time"  },
            { n: "0",     l: "Biometric or suspect data" },
          ].map(({ n, l }) => (
            <div className="adn-stat" key={l}>
              <div className="adn-stat-n">{n}</div>
              <div className="adn-stat-l">{l}</div>
            </div>
          ))}
        </div>

        {/* SCROLL EXPERIENCE */}
        <div className="adn-split">

          {/* LEFT, scrolling narrative */}
          <div className="adn-split-left">
            {SCENES.map((s, i) => (
              <div
                key={i}
                className={`adn-phase${i === phase ? " active" : ""}`}
                ref={el => { sectionRefs.current[i] = el; }}
              >
                <div className="adn-phase-num">{s.phase}</div>
                <div className="adn-phase-label">{s.label}</div>
                <h2 className="adn-phase-title">{s.title}</h2>
                <p className="adn-phase-body">{s.body}</p>
                <div className="adn-tech">
                  {s.tech.map(([k, v]) => (
                    <div className="adn-tech-row" key={k}>
                      <div className="adn-tech-key">{k}</div>
                      <div className="adn-tech-val">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT, sticky dark scene */}
          <div className="adn-split-right">
            <ADN1Scene phase={phase} />
          </div>

        </div>

        {/* CTA */}
        <section className="adn-cta">
          <div className="adn-cta-overline">Independent Retail Pilot · 2026</div>
          <h2 className="adn-cta-h2">
            You have seen what it does.<br />
            <em>Your shop deserves this.</em>
          </h2>
          <p className="adn-cta-sub">
            Apply for the Independent Retail Pilot. Prototype-stage registry-linked marker workflow, direct access to the founder. Sign a Letter of Intent to secure your place.
          </p>
          <a href="/contact" className="adn-cta-btn">Join the Pilot</a>
        </section>

        {/* FOOTER */}
        <footer className="adn-footer">
          <div className="adn-footer-name">MYKEI SECURITIES LTD · CO. NO. 16984969</div>
          <div className="adn-footer-copy">© 2026 MYKEI SECURITIES LTD. ALL RIGHTS RESERVED.</div>
        </footer>

      </div>
    </>
  );
}
