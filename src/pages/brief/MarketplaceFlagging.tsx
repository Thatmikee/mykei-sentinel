export default function MarketplaceFlagging() {
  return (
    <article>
      <p>
        The supply chain for stolen retail goods has modernised more rapidly than the systems used
        to disrupt it. Stolen merchandise rarely ends up in pubs or at car boot sales anymore. Within
        hours of a theft, the item is listed on eBay, Vinted, Facebook Marketplace, or Depop,
        priced just below market value to attract buyers who do not ask questions, and shipped to
        an address that creates a layer of separation between the seller and the original crime.
        The speed and anonymity of this pipeline is the primary reason organised retail crime has
        grown in sophistication and scale.
      </p>

      {/* Featured Image */}
      <div style={{ margin: "40px 0" }}>
        <img
          src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1200&q=80"
          alt="Online marketplace phone"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 4, display: "block", marginBottom: 8 }}
        />
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#767D88", margin: 0 }}>Photo: Unsplash</p>
      </div>

      <h2>The Platform Scale Problem</h2>

      <p>
        eBay UK processes millions of listings per day. Vinted's UK user base exceeded 10 million
        by 2024. Facebook Marketplace operates without a listing fee and with minimal friction at
        the point of posting. These platforms are not complicit in retail theft, but their scale
        makes proactive screening for stolen goods operationally near-impossible without external
        intelligence. The volume of legitimate second-hand transactions dwarfs the criminal fraction,
        and there is no reliable visual or algorithmic signal that distinguishes a legitimately
        sold item from a stolen one.
      </p>
      <p>
        eBay has a Verified Rights Owner programme for intellectual property issues, and cooperates
        with law enforcement on specific warrant requests. Platform trust-and-safety teams respond
        to reports. But these are reactive mechanisms. They require someone to raise a flag. They
        require a specific item description, a reference number, or enough information for a
        take-down request to succeed. Without that, the listing stays live. The goods sell.
        The proceeds fund the next run.
      </p>

      <h2>The Intelligence Gap, and Why It Is an Industry Problem</h2>

      <p>
        The core problem is the intelligence gap between the physical crime and the digital
        secondary market. There is no national stolen goods registry with real-time API access.
        There is no mechanism through which a retailer's theft event automatically generates a
        queryable record that a platform's trust team or a police officer can cross-reference
        against a suspicious listing. The physical and digital worlds remain disconnected at
        precisely the point where connecting them would matter most. Closing that gap would
        require cooperation across retailers, platforms, and law enforcement, not a single
        vendor's product.
      </p>
      <p>
        Mykei's contribution is narrower and earlier-stage than a marketplace-monitoring system.
        The Mykei Registry is a designed event-record architecture, not yet live, intended to
        generate a unique forensic reference code for each marker deployment event, linked to a
        store record and item category. The design intent is that if a thief takes marked goods
        and lists them online, a retailer or investigator could use that reference code as evidence
        connecting a specific listing to a specific theft event. Mykei does not scan, flag, or
        monitor marketplace listings, and has no integration with eBay, Vinted, Facebook Marketplace,
        or Depop.
      </p>
      <p>
        Any integration with marketplace trust-and-safety teams is a long-term aspiration, not a
        roadmap commitment with a date. The Registry itself is still in development and is not yet
        logging events from any pilot store.
      </p>

      <h2>Deterrence Before the Theft</h2>

      <p>
        The Registry's most significant intended value may not be retrospective. The same logic that applied
        to Proprietary Forensic Marking Compound signage in documented UK police trials applies here. If a thief knows that
        the goods they are targeting are forensically marked and registered in a database that
        feeds into marketplace intelligence, the calculus changes before the theft occurs. A
        stolen item that cannot be sold on eBay without risk of identification has a dramatically
        lower expected value. An item with near-zero resale value provides a near-zero incentive
        to steal it.
      </p>
      <p>
        This is the intent behind economic sterilisation as a doctrine: not only a reactive
        database for post-incident investigation, but a prospective deterrent, operating through
        the same mechanism as other credible forensic marking programmes: communicating to
        criminals that the risk-to-reward ratio has shifted before any decision to steal is made.
        Realising that intent for Mykei still depends on the Registry, the marker, and any
        marketplace cooperation reaching a working, evidenced stage.
      </p>
      <p>
        The "Protected by Mykei Securities" decal communicates the doctrine at the point of entry.
        The Registry is the infrastructure intended to make that communication credible, once it
        is built and tested. See mykei.io/pilot for pilot details.
      </p>
    </article>
  );
}
