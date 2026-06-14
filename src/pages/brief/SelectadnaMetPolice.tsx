export default function SelectadnaMetPolice() {
  return (
    <article>
      <p>
        Synthetic DNA tagging is not a new idea. UK police forces began adopting commercial forensic
        marking solutions in the mid-2000s, and Proprietary Forensic Marking Compound became one of the most widely deployed
        products in that category. What those deployments revealed about criminal behaviour, deterrence,
        and the limits of police-initiated technology tells us a great deal about what a permanent,
        commercially accessible version of the same capability could accomplish.
      </p>

      {/* Featured Image */}
      <div style={{ margin: "40px 0" }}>
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
          alt="Police law enforcement abstract"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 4, display: "block", marginBottom: 8 }}
        />
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#8A7560", margin: 0 }}>Photo: Unsplash</p>
      </div>

      <h2>Operation Opal and the Metropolitan Police Approach</h2>

      <p>
        Operation Opal is the Metropolitan Police unit dedicated to tackling organised retail crime.
        It operates at the intersection of intelligence, enforcement, and commercial partnership,
        targeting the professional networks that drive high-volume theft from retailers across London
        and beyond. As part of its operational toolkit, Opal and associated borough teams partnered
        with forensic marking providers to mark goods in known high-theft stores.
      </p>
      <p>
        The mechanism was straightforward. Officers would work with store staff to apply forensic marker
        solution to high-value merchandise. Stolen items recovered from suspects during stop and search,
        from seized vehicles, or from online listings could then be tested. A match between the marker code
        on a recovered item and the code registered to a specific store created forensic provenance. The
        goods were traceable. The theft was evidenced. The criminal was linked to a specific crime at a
        specific location.
      </p>
      <p>
        Studies and police reports from UK forces documented measurable reductions in burglary and metal
        theft in areas where visible DNA-tagging signage was deployed. The results were consistent enough
        that several forces expanded their use of forensic property marking programmes beyond the initial
        pilot areas.
      </p>

      <h2>The Signage Effect: Deterrence Without Prosecution</h2>

      <p>
        The most striking finding from these deployments was not the prosecution rate. It was what
        happened before any prosecution was ever needed. In at least one documented UK police trial,
        visible "Forensic Property Marking" signs reduced crime in the target area without a single
        prosecution being required. Thieves simply chose not to operate in marked zones.
      </p>
      <p>
        This is not a trivial finding. It confirms something that behavioural economists and criminologists
        have argued for decades: criminals engaged in organised retail crime are not impulsive actors. They
        conduct prior reconnaissance. They assess environments. They weigh risk against expected return.
        When the environment signals that stolen goods will be forensically identifiable and harder
        to move without a traceable record, the rational response is to go elsewhere.
      </p>
      <p>
        The implication for retail security is profound. It means that some proportion of deterrence
        value is captured not by the forensic capability itself, but by the credible communication of
        that capability. A thief who knows how Proprietary Forensic Marking Compound works, who knows that a marked item can be
        identified by police or flagged on a resale platform, will recalculate before entering the store.
        The sticker in the window carries real economic weight.
      </p>

      <h2>The Gap That Commercial Technology Must Fill</h2>

      <p>
        Proprietary Forensic Marking Compound deployments operated through a fundamental limitation: they were police-initiated,
        reactive, and temporary. Officers would tag goods following an intelligence-led assessment that
        a particular store was being targeted. The deployment would run for a period, then end. The
        technology was available to retailers only when police had the capacity and the intelligence to
        justify an intervention. For most independent retailers, that intervention never came at all.
      </p>
      <p>
        There was no continuous, autonomous deployment. There was no cloud registry logging every event
        to a permanent record. There was no mechanism for a marked item to be flagged on eBay or Facebook
        Marketplace. And there was no commercial infrastructure through which an independent convenience
        store in Manchester or a jeweller in Birmingham could access the same protection that a
        Met-partnered London retailer might receive during a targeted operation.
      </p>
      <p>
        What ADN adds to this foundation is permanence and autonomy. Rather than a police officer
        applying a solution during a scheduled intervention, ADN deploys a controlled marker through
        dual Tactical Multi-zone Sensor Array time-of-flight sensors that detect the kinetic signature of a grab-and-run theft
        event in real time. Every deployment is logged via AWS IoT Core to a timestamped event record.
        Every activation generates a forensic reference code entered into the Mykei Registry,
        a cloud database that links codes to item descriptions and store records. The capability that
        Proprietary Forensic Marking Compound and the Metropolitan Police demonstrated in borough-level operations is now available
        as a permanent commercial infrastructure, owned and managed by the retailer, without any
        dependency on police scheduling or operational capacity.
      </p>
      <p>
        The police proved the concept. The question was always whether independent retailers would ever
        gain continuous access to the same level of forensic protection. Pricing is under development. Follow the research at mykei.io/signal.
      </p>
    </article>
  );
}
