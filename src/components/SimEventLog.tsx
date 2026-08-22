const SIM_EVENTS = [
  { t: "T+0.0s",  type: "DETECTION", msg: "Sweep detected, ToF vector threshold exceeded (94cm/s lateral)" },
  { t: "T+0.3s",  type: "CONFIRM",   msg: "Second-zone confirmation positive, false trigger excluded" },
  { t: "T+0.6s",  type: "DEPLOY",    msg: "Marker deployed, batch SIM-0426 cartridge-linked event recorded" },
  { t: "T+0.9s",  type: "REGISTRY",  msg: "Mykei Registry updated, item status: MARKED / LOGGED" },
  { t: "T+1.2s",  type: "VERIFY",    msg: "Submitted for verification workflow, cartridge-linked event record created" },
  { t: "T+1.4s",  type: "COMPLETE",  msg: "Event MYK-SIM-001 closed, node returned to ARMED" },
];

const TYPE_COLOUR: Record<string, string> = {
  DETECTION: "#D8001F",
  CONFIRM:   "#2D7D46",
  DEPLOY:    "#D8001F",
  REGISTRY:  "#1E1E1E",
  VERIFY:    "#D8001F",
  COMPLETE:  "#2D7D46",
};

interface Props {
  caption?: boolean;
}

export default function SimEventLog({ caption = true }: Props) {
  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #E8E8E8",
      borderRadius: "8px",
      overflow: "hidden",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {/* Header bar */}
      <div style={{
        background: "#F8F8F8",
        borderBottom: "1px solid #E8E8E8",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: "#767D88" }}>
          EVENT LOG · NODE ADN1-SIM
        </span>
        <span style={{ fontSize: "10px", color: "#aaa" }}>MYK-SIM-001</span>
      </div>

      {/* Rows */}
      <div style={{ padding: "4px 0" }}>
        {SIM_EVENTS.map((e, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "64px 80px 1fr",
            gap: "0 12px",
            padding: "8px 20px",
            borderBottom: i < SIM_EVENTS.length - 1 ? "1px solid #F8F8F8" : "none",
            alignItems: "start",
          }}>
            <span style={{ fontSize: "11px", color: "#aaa" }}>{e.t}</span>
            <span style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: TYPE_COLOUR[e.type] ?? "#1E1E1E",
              paddingTop: "1px",
            }}>
              {e.type}
            </span>
            <span style={{ fontSize: "12px", color: "#333", lineHeight: "1.4" }}>{e.msg}</span>
          </div>
        ))}
      </div>

      {/* Caption */}
      {caption && (
        <div style={{
          background: "#FFFFFF",
          borderTop: "1px solid #E8E8E8",
          padding: "8px 20px",
          fontSize: "10px",
          color: "#aaa",
          fontFamily: "'Sora', sans-serif",
          fontStyle: "italic",
        }}>
          Simulated event log based on ADN system architecture, not derived from live deployment data
        </div>
      )}
    </div>
  );
}
