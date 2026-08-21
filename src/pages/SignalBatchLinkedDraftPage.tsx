// DRAFT — Not linked publicly. Do not add to App.tsx or sitemap until approved.
// Title: From Device to Infrastructure: Why Batch-Linked Evidence Matters
// Status: DRAFT

export default function SignalBatchLinkedDraftPage() {
  return (
    <article style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px", fontFamily: "'Sora', sans-serif", color: "#1E1E1E", lineHeight: 1.8 }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D8001F", marginBottom: 16 }}>
        Signal · Draft · Not published
      </div>
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 24 }}>
        From Device to Infrastructure: Why Batch-Linked Evidence Matters
      </h1>
      <p style={{ fontSize: 16, color: "#4A3520", marginBottom: 32, fontStyle: "italic" }}>
        Mykei is refining ADN around a batch-linked evidence model. The doctrine remains Economic Sterilisation. The deployment strategy now recognises two routes: independent retail validation and strategic retail pilots.
      </p>

      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, marginBottom: 16 }}>The device is not the product. The record is.</h2>
      <p>
        Every forensic marking system that has ever worked in a UK prosecution worked because the marker could be connected to something: a store, a date, a batch, an operator. The marker alone is chemistry. The connected record is evidence.
      </p>
      <p>
        ADN was designed from the start to create that connection automatically. Detection triggers marking. Marking triggers registration. Registration creates a timestamped, batch-linked event record that connects the physical marker on a stolen item to the specific device, store, time, and forensic batch reference that created it.
      </p>
      <p>
        That record is the infrastructure. The device is just the first node in it.
      </p>

      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, marginBottom: 16 }}>Why the batch number matters</h2>
      <p>
        Forensic chemistry has been used in UK retail prosecutions for decades. What has always limited its reach is the chain of custody problem: who deployed the marker, when, and on what. Manual deployment breaks the chain at every step.
      </p>
      <p>
        ADN closes that gap. Each activation records the device ID, the store reference, the event timestamp, the activation type, and the forensic batch reference. Every liquid batch is unique. Every deployment is tied to that batch. Every batch is tied to that retailer's registry account.
      </p>
      <p>
        The result is not just a marked item. It is a marked item with a fully traceable forensic origin.
      </p>

      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, marginBottom: 16 }}>Two deployment routes, one doctrine</h2>
      <p>
        The doctrine is Economic Sterilisation: remove the commercial incentive for theft by making stolen goods harder to liquidate, riskier to handle, and easier to connect to a verified theft event.
      </p>
      <p>
        That doctrine applies at two scales. The first is independent retail validation, where ADN is intended to be deployed in individual shops to prove detection accuracy, registry logging, and non-confrontational deterrence in real environments.
      </p>
      <p>
        The second is strategic retail pilots, where the same forensic event architecture is deployed at category level across larger operations: supermarkets, pharmacies, multi-site operators, insurer-backed programmes. At that scale, the batch-linked evidence model becomes the primary value proposition. Not just deterrence. Infrastructure.
      </p>

      <div style={{ marginTop: 40, padding: "24px 28px", background: "#FFFFFF", borderLeft: "3px solid #D8001F" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D8001F", marginBottom: 12 }}>Key takeaways</div>
        <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
          <li>Forensic marking only becomes infrastructure when the physical marker connects to a verifiable digital record.</li>
          <li>ADN's batch-linked event model connects device ID, timestamp, store reference, event type, and forensic batch reference automatically.</li>
          <li>The Economic Sterilisation doctrine applies at independent retail scale and at strategic retail pilot scale.</li>
          <li>Independent Retail Pilot Pricing applies to selected Manchester Alpha validation deployments only.</li>
          <li>Strategic and enterprise pilots are scoped separately based on deployment size, chemistry requirements, and batch-control architecture.</li>
        </ul>
      </div>
    </article>
  );
}
