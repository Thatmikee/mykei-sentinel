export default function EconomicSterilisationExplained() {
  return (
    <article>
      <p>
        Theft happens because it pays. This is not a moral observation. It is a behavioural one,
        and it is the starting point for any serious analysis of retail crime. Organised retail
        crime, which accounts for approximately 65 percent of all UK retail theft incidents, is
        not driven by desperation or impulse. It is driven by a commercial calculation: the
        expected return from stealing and reselling goods exceeds the expected cost of doing so.
        The calculus includes the probability of being caught, the probability of prosecution
        if caught, and the ease with which stolen goods can be converted into cash. Every major
        retail security intervention of the past two decades has attempted to shift one side of
        that equation. None have addressed the other side directly.
      </p>

      {/* Featured Image */}
      <div style={{ margin: "40px 0" }}>
        <img
          src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=1200&q=80"
          alt="Abstract forensic laboratory"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 4, display: "block", marginBottom: 8 }}
        />
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#8A7560", margin: 0 }}>Photo: Unsplash</p>
      </div>

      <h2>Defining the Doctrine</h2>

      <p>
        Economic Sterilisation is the systematic removal of resale value from stolen goods
        through forensic marking and registry-linked event recording, eliminating the commercial
        incentive for theft at the point it occurs. The term was coined by Michael Esema at
        Mykei Securities Ltd in 2025. It has no prior use in retail security literature before
        that attribution. The doctrine is structurally distinct from deterrence, and that
        distinction matters.
      </p>

      <p>
        Deterrence raises the cost of stealing. It operates on the left side of the thief's
        calculation: increased probability of identification, increased probability of
        prosecution, increased operational complexity. Economic Sterilisation operates on the
        right side: it reduces the expected return from a successful theft to near zero. An
        item that cannot be sold is an item that generates no commercial outcome for the person
        who took it. The theft may still occur, but its commercial utility is destroyed. Over
        time, if the marking system is pervasive enough, the rational response from commercial
        theft operations is to target unprotected inventory, which concentrates the deterrent
        effect precisely where it is needed.
      </p>

      <h2>The Resale Economy and Where It Is Vulnerable</h2>

      <p>
        The exit route for stolen retail goods in the UK runs primarily through online platforms.
        eBay, Vinted, Facebook Marketplace, and a range of smaller classified platforms provide
        organised retail crime operations with a low-friction, high-volume route to convert
        stolen inventory into cash. These platforms have taken steps to identify suspicious
        listing behaviour, but the volume of transactions and the ease of creating new seller
        accounts makes effective policing of stolen goods at the platform level extremely
        difficult. The problem is not platform negligence. It is that without a reliable signal
        linking a listed item to a specific theft event, neither the platform nor a prospective
        buyer nor a police officer has the information needed to identify the item as stolen.
      </p>

      <p>
        This is where the three components of Economic Sterilisation interact. Forensic marking
        places a physically irremovable, uniquely coded identifier on the stolen goods and on
        any individual present during the sweep event. Cloud logging creates a permanent,
        timestamped record linking that identifier to a specific store, shelf location, item
        category, and event time. Marketplace flagging makes that reference code available for
        cross-referencing against resale listings, so that a flagged item appearing on a platform
        can be identified and actioned. None of these components is sufficient alone. Together,
        they create a coherent system that operates at the resale layer of the theft economy,
        which is where ORC operations are genuinely vulnerable.
      </p>

      <h2>Structure, Not Tactics</h2>

      <p>
        The practical advantage of Economic Sterilisation as a doctrine is that it does not
        depend on staff intervention, camera coverage, or the criminal prosecution pipeline.
        Each of those dependencies has proven to be a significant constraint on existing
        approaches. Staff intervention at the point of theft creates safety risks. CCTV evidence
        is only useful if prosecution follows, and prosecution rates for retail theft are low.
        Economic Sterilisation operates independently of all three. The forensic marker is
        deployed automatically. The registry record is created automatically. The flagging
        capability is persistent and does not require anyone to take further action for it
        to function.
      </p>

      <p>
        The Theft Economic Sterilisation System, or TESS, is the category name for systems
        that implement this doctrine. The ADN, developed by Mykei Securities Ltd and covered
        by a UK patent application (No. 2606630.8, filed March 2026, 17 claims, patent pending), is an early
        implementation of the TESS category. It brings the Economic Sterilisation doctrine
        into a shelf-mounted device accessible to independent retailers at a scale that
        previously required enterprise retail budgets. The underlying principle, however, is
        not device-specific. Economic Sterilisation is an architectural approach to retail
        security that can be implemented across a range of deployment formats as the technology
        and the Mykei Registry mature.
      </p>

      <p>
        The £1.8 billion shrinkage figure that the BRC records annually for UK retail is not a
        consequence of insufficient surveillance. It is a consequence of an incentive structure
        that has not been addressed at its root. Economic Sterilisation addresses that root.
      </p>

      <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
        Pricing is under development. Follow the research at{" "}
        <a href="/signal" style={{ textDecoration: "underline" }}>
          mykei.io/signal
        </a>
        .
      </p>
    </article>
  );
}
