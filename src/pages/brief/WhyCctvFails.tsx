export default function WhyCctvFails() {
  return (
    <article>
      <p>
        The United Kingdom has one of the highest concentrations of CCTV cameras per capita in
        the world. Conservative estimates place the total number of cameras in UK public and
        commercial spaces at several million. Retail has been among the heaviest investors,
        with major chains operating extensive camera networks across every square metre of
        trading floor. And yet, BRC data records a 27 percent rise in retail theft incidents
        between 2022 and 2024. The cameras were running throughout that period. The footage
        exists. The theft happened anyway.
      </p>

      {/* Featured Image */}
      <div style={{ margin: "40px 0" }}>
        <img
          src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=80"
          alt="CCTV surveillance camera"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 4, display: "block", marginBottom: 8 }}
        />
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#767D88", margin: 0 }}>Photo: Unsplash</p>
      </div>

      <p>
        This is not an argument against CCTV as a technology. It is an argument for precision
        about what CCTV actually does and what it cannot do, because conflating the two has led
        the retail sector to over-invest in a tool that is well-suited to one problem and
        ill-suited to another.
      </p>

      <h2>Two Functions, One Technology</h2>

      <p>
        CCTV serves two legitimate functions in a retail security context. The first is
        deterrence: the visible presence of cameras is intended to alter the behaviour of a
        potential thief by raising their perceived risk of identification. The second is evidence
        collection: footage captured during a theft incident can support prosecution or civil
        recovery proceedings. Both functions have genuine value. The problem is that the
        deterrence function is substantially weaker than the industry assumes, and the evidence
        function is dependent on a prosecution pipeline that, for retail theft, rarely operates
        effectively.
      </p>

      <p>
        On deterrence: organised retail crime actors, who account for approximately 65 percent of
        all retail theft by incident, are not meaningfully deterred by cameras. The operational
        playbook for ORC groups is well-documented. Entry in groups, hoods and face coverings,
        rapid bulk sweeps of target categories, exit before staff can respond. These actors are
        aware of camera placement and have adapted to it. The deterrence effect that cameras may
        have on opportunistic, individual theft has little bearing on the commercial operations
        that drive the majority of losses.
      </p>

      <p>
        On evidence: CCTV footage is most valuable when it supports a prosecution. But
        prosecution rates for retail theft in the UK are low and falling. The Crown Prosecution
        Service applies charging thresholds that functionally deprioritise lower-value retail
        theft incidents. Store staff, who are typically the only witnesses capable of providing
        corroborating statements, frequently decline to do so, partly because of the time
        commitment and partly because of concerns about personal safety if they are identified as
        witnesses. Footage of a theft, absent a viable prosecution pathway, does not generate
        a deterrent effect for future incidents.
      </p>

      <h2>The Limits of AI Enhancement</h2>

      <p>
        The retail security technology market has responded to CCTV's limitations not by
        rethinking the approach but by layering artificial intelligence onto existing camera
        infrastructure. Behaviour analysis systems, facial recognition integration, and
        anomaly-detection algorithms are marketed as upgrades that restore the deterrent
        function of camera networks. The evidence for their effectiveness at scale, in live
        retail environments, is unproven. More significantly, the application of facial
        recognition in retail settings raises serious questions under the UK GDPR and the
        Data Protection Act 2018 that no major retailer has resolved cleanly. The Information
        Commissioner's Office has been explicit about the conditions under which biometric
        data processing is lawful, and blanket surveillance of retail customers does not
        straightforwardly meet those conditions.
      </p>

      <p>
        The category of AI-enhanced CCTV also inherits the fundamental limitation of the
        underlying technology: it operates after the decision to steal has been made. A system
        that detects anomalous behaviour at a shelf can alert a staff member, but that staff
        member still faces the same options they had before: confront, observe, or report.
        The intervention happens at the point of theft, not before it. The commercial incentive
        that drove the actor to that shelf in the first place remains unchanged.
      </p>

      <h2>Operating at the Incentive Level</h2>

      <p>
        The alternative framing is not better detection of theft in progress. It is the removal
        of the commercial return that makes theft worth attempting. Economic Sterilisation
        operates before the theft decision, not after it. If a stolen item cannot be resold
        because it carries a forensic marker linked to a cloud registry that flags it on
        marketplace platforms, the incentive calculation changes. The actor is not weighing
        the probability of being identified on camera. They are weighing the probability of
        successfully converting the stolen item into cash. A forensic marking and registry
        system operates at that layer, which is where organised retail crime is actually
        sensitive to intervention.
      </p>

      <p>
        CCTV will remain part of the retail security mix, and there are contexts where it
        performs its intended functions well. But the data from four consecutive years of rising
        theft incidents is clear: camera coverage alone is not sufficient, and more camera
        coverage is not the answer. If the goal is to stop theft, the question is not how to
        watch better. It is how to make theft not worth doing.
      </p>
    </article>
  );
}
