export default function ADN1FlowDiagram({ width = "100%" }: { width?: string | number }) {
  const nodes = [
    { id: "detect",   label: "DETECTION",  sub: "ToF array threshold exceeded",          x: 80,  y: 80  },
    { id: "mark",     label: "MARKING",    sub: "Forensic DNA compound deployed",         x: 280, y: 80  },
    { id: "registry", label: "REGISTRY",   sub: "Batch code logged, Toxic Inventory",    x: 480, y: 80  },
    { id: "resale",   label: "RESALE RISK", sub: "Item commercially & legally traceable", x: 680, y: 80  },
  ];

  const arrows = [
    { x1: 175, y1: 100, x2: 275, y2: 100 },
    { x1: 375, y1: 100, x2: 475, y2: 100 },
    { x1: 575, y1: 100, x2: 675, y2: 100 },
  ];

  return (
    <svg
      viewBox="0 0 860 200"
      width={width}
      style={{ display: "block", fontFamily: "'Sora', sans-serif", maxWidth: "100%" }}
      role="img"
      aria-label="ADN system flow: Detection → Marking → Registry → Resale Risk"
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#0D9488" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="860" height="200" fill="#FFFFFF" rx="0" />

      {/* Arrows */}
      {arrows.map((a, i) => (
        <line
          key={i}
          x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
          stroke="#0D9488"
          strokeWidth="1.5"
          markerEnd="url(#arrow)"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y - 36}
            width="172"
            height="72"
            fill="#FFFFFF"
            stroke={i === 3 ? "#0D9488" : "#E8E8E8"}
            strokeWidth={i === 3 ? "1.5" : "1"}
            rx="4"
          />
          <text
            x={n.x + 86}
            y={n.y - 10}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            letterSpacing="0.12em"
            fill={i === 3 ? "#0D9488" : "#8a7a5a"}
          >
            {n.label}
          </text>
          <text
            x={n.x + 86}
            y={n.y + 10}
            textAnchor="middle"
            fontSize="10"
            fill="#444"
          >
            {n.sub.length > 28 ? n.sub.slice(0, 28) + "…" : n.sub}
          </text>
          <text
            x={n.x + 86}
            y={n.y + 24}
            textAnchor="middle"
            fontSize="10"
            fill="#444"
          >
            {n.sub.length > 28 ? n.sub.slice(28) : ""}
          </text>
        </g>
      ))}

      {/* Step numbers */}
      {nodes.map((n, i) => (
        <text
          key={`num-${i}`}
          x={n.x + 10}
          y={n.y - 18}
          fontSize="9"
          fill="#0D9488"
          fontWeight="700"
          fontFamily="'JetBrains Mono', monospace"
        >
          0{i + 1}
        </text>
      ))}

      {/* Caption */}
      <text x="430" y="178" textAnchor="middle" fontSize="9" fill="#aaa" fontStyle="italic">
        ADN system flow. Engineering documentation (April 2026)
      </text>
    </svg>
  );
}
