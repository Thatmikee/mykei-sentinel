export default function SyntheticDnaForensics() {
  return (
    <article>
      <p>
        Synthetic DNA forensic markers are laboratory-synthesised nucleotide sequences, unique
        to a specific deployment batch, suspended in a carrier solution. They are not biological
        material. They present no hazard to skin, respiratory health, or the environment. Each
        batch is assigned a unique sequence that does not exist in nature and does not overlap
        with any other manufactured batch. This uniqueness is the property that gives the
        technology its forensic value: an item marked with a specific batch can be traced back
        to the source of that batch with a high degree of scientific certainty, in the same way
        that a conventional DNA profile can be linked to a specific individual.
      </p>

      {/* Featured Image */}
      <div style={{ margin: "40px 0" }}>
        <img
          src="https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=1200&q=80"
          alt="Forensic laboratory DNA analysis"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 4, display: "block", marginBottom: 8 }}
        />
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#767D88", margin: 0 }}>Photo: Unsplash</p>
      </div>

      <h2>Bonding, Detection, and Admissibility</h2>

      <p>
        The marker bonds irreversibly to a wide range of surfaces on contact. Fabric, skin,
        cardboard packaging, plastic, and most hard surfaces all retain the marker once exposed.
        No known solvent removes the marker without destroying the underlying material. Once
        applied, it is permanent for the practical lifetime of the item. Under ultraviolet
        light, the carrier solution fluoresces, making the presence of the marker visible
        without specialist equipment. A forensic reader can then identify the specific batch
        reference code from the marker, providing a machine-readable identifier that connects
        the physical object to its cloud-logged origin record.
      </p>

      <p>
        In UK enforcement and recovery workflows, forensic markers can support item provenance when
        chain-of-custody and supplier documentation are properly maintained. The chain of custody
        that ADN is designed to support links a cloud-logged event record to the physical marker
        on the item, forming an evidence-supporting structure. The cloud record establishes when
        and where the item was marked.
        The physical marker establishes that the specific item was present at that event.
        Together, they provide a traceable link between a specific item and a specific theft
        event that does not depend on eyewitness testimony or CCTV footage.
      </p>

      <h2>The Proprietary Forensic Marking Compound Precedent and UK Policing Experience</h2>

      <p>
        Synthetic DNA marking in UK retail and policing contexts is not new. Proprietary Forensic Marking Compound-class
        markers have been deployed by UK police forces since the early 2000s across property
        marking, vehicle marking, and retail applications. The Metropolitan Police's Operation
        Opal, which targeted organised retail crime specifically, incorporated forensic DNA
        marking as part of its intelligence and evidence-gathering toolkit. Force-level
        deployments across multiple constabularies have produced measurable reductions in theft
        within target areas where marking was combined with active enforcement.
      </p>

      <p>
        The evidence base from these deployments supports two conclusions. First, forensic DNA
        marking creates a persistent, reliable evidentiary trail that outlasts the incident and
        is not dependent on the quality of CCTV footage, the willingness of witnesses to give
        statements, or the speed of police response. Second, the deterrent effect of forensic
        marking, where it is communicated clearly to potential offenders, is measurable. The
        knowledge that an item carries an irremovable identifier changes the risk calculation
        for experienced retail crime operators.
      </p>

      <p>
        However, these deployments have historically occurred at scale: across retail estates
        large enough to justify the cost and operational complexity of legacy DNA tagging
        systems. The infrastructure required to procure, apply, register, and manage forensic
        markers at the level of a single independent convenience store has not previously
        existed in a commercially viable form. The cost and complexity of legacy systems
        required the kind of procurement relationships and operational resource that independent
        retailers simply do not have.
      </p>

      <h2>Bridging the Gap: The Mykei Registry</h2>

      <p>
        The limitation of forensic marking in isolation is that the marker is only useful when
        someone tests for it. A stolen item sitting in a warehouse or being sold through
        informal channels may carry a forensic marker for years without that marker being read.
        The technology's evidentiary value is activated only when the item enters a context
        where testing is triggered: a police stop, a suspicious buyer, a customs inspection.
        For the commercial theft economy operating through online platforms, that trigger point
        is the resale listing. An item appearing on eBay or Vinted that a buyer suspects is
        stolen, or that a platform's review process flags for investigation, is an item that
        can be tested. If the test returns a reference code that matches a record in the Mykei
        Registry, the origin of that item is established with forensic precision.
      </p>

      <p>
        The Mykei Registry bridges the gap between the physical forensic mark and the
        commercial trail. By linking the reference code generated at the point of theft to a
        permanent cloud record describing the store, shelf, item category, and event time, the
        registry creates the conditions under which the marker's evidentiary value can be
        realised at the resale layer. This is the architectural insight that the ADN and the
        Economic Sterilisation doctrine bring to the existing forensic marking technology: the
        marker alone was always sufficient for evidence; what was missing was the systematic
        connection between the mark and the marketplace.
      </p>

      <p>
        The ADN brings the full stack of forensic marking, cloud logging, and registry
        connectivity to single-unit independent retailers for the first time, at a price point
        that reflects the scale at which those retailers operate.
      </p>

      <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
        Commercial terms are agreed directly with Mykei. See{" "}
        <a href="/pilot" style={{ textDecoration: "underline" }}>
          mykei.io/pilot
        </a>
        .
      </p>
    </article>
  );
}
