export default function IndependentRetailerEconomics() {
  return (
    <article>
      <p>
        Independent retailers operate on margins that leave very little room for unrecovered loss.
        Gross margins in convenience and grocery retail typically sit between 20 and 35 percent.
        Jewellers and specialist independents can sit higher, but their inventory value makes each
        individual theft more damaging. Against that context, the ACS Crime Report 2024 finding
        that convenience stores lose an average of GBP 4,600 per year to theft is not an abstract
        statistic. It is roughly GBP 88 leaving through the door every week without any commercial
        return. On a 25 percent gross margin, recovering that loss requires generating an additional
        GBP 18,400 in revenue just to break even on what theft has already taken.
      </p>

      {/* Landmark Read Badge + Featured Image */}
      <div style={{ margin: "40px 0" }}>
        <div style={{
          display: "inline-block",
          fontFamily: "monospace",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#D8001F",
          border: "1px solid #D8001F",
          padding: "4px 10px",
          marginBottom: 12,
        }}>
          Landmark Read
        </div>
        <img
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80"
          alt="Financial economics"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 4, display: "block", marginBottom: 8 }}
        />
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#767D88", margin: 0 }}>Photo: Unsplash</p>
      </div>

      <h2>The Problem With Security ROI Calculations</h2>

      <p>
        Most security systems present a structural problem when retailers try to calculate return on
        investment. The benefit is framed as incidents prevented, which is inherently difficult to
        measure. You cannot easily count the thefts that did not happen. You can count the thefts
        that did, and compare them to a prior period, but separating the effect of your security
        investment from seasonal variation, staffing changes, or shifts in local criminal activity
        requires a level of data sophistication that most independent retailers do not have and
        should not need.
      </p>
      <p>
        ADN changes this calculus in one specific way. Because every activation is logged with a
        timestamp via AWS IoT Core, the unit produces a record of incidents that happened and were
        responded to forensically. Sweep counts and deployment counts are concrete outputs. A retailer
        can see that their unit activated on a Tuesday afternoon, that a forensic reference code was
        generated and registered in the Mykei Registry, and that the event is now a
        tamper-aware part of their store's crime intelligence record. The intervention is observable.
        The cost of the subscription is set against a documented activation history, not against
        a theoretical prevention model.
      </p>

      <h2>How Commercial Terms Would Work</h2>

      <p>
        ADN is intended to be structured as Hardware-as-a-Service, on the model of a one-time
        setup covering the unit, installation, and Mykei Registry onboarding, followed by a
        monthly subscription for continued service, event logging, registry access, and support.
        No fixed pricing is published. Terms would be agreed directly with Mykei for any store
        considering participation; visit mykei.io/pilot to start that conversation.
      </p>
      <p>
        The HaaS model matters for independent retailers because it eliminates capital expenditure.
        There is no large upfront outlay to justify to a bank or a co-owner. There is no owned
        asset to depreciate or maintain. The cost is predictable, appearing on the same monthly
        operating expense line as utilities or software subscriptions. For retailers already managing
        tight cash flow, the absence of a capital barrier is not a minor convenience. It is the
        difference between being able to adopt the technology and not.
      </p>

      <h2>Comparing the Alternatives</h2>

      <p>
        The relevant comparison is not to doing nothing. Most retailers already spend something on
        security. The question is whether that spend is producing records that support investigation
        and verification workflows at a cost that makes commercial sense.
      </p>
      <p>
        A staffed security guard costs between GBP 25,000 and GBP 35,000 per year when employment
        costs are included. Guards provide presence and deterrence during their shift, but they
        cannot be everywhere simultaneously, they cannot mark stolen goods with forensic identifiers,
        and their effectiveness varies with experience and attention. Electronic article surveillance
        systems for a small independent store typically cost between GBP 3,000 and GBP 8,000 to
        install, plus ongoing expenditure on tags for every item of stock. EAS generates an alarm
        when a tagged item passes through a gate, but it produces no forensic evidence, no cloud
        log, and no mechanism for a stolen item to be identified in a secondary market. CCTV systems
        with remote monitoring run from GBP 1,500 to GBP 5,000 installed, plus monthly monitoring
        fees. CCTV is valuable for prosecution support after an incident, but it does not mark
        the goods, and footage quality and retention periods frequently limit its evidential utility.
      </p>
      <p>
        ADN is designed to operate autonomously, requiring no staff time beyond the initial onboarding.
        It produces records designed to support investigation and verification workflows: a unique
        DNA code on the goods, timestamped to a specific activation event, registered in a cloud
        database linked to the store. It is lower cost than most alternatives and produces a category
        of evidence that cameras and tags cannot.
      </p>
      <p>
        For a retailer losing GBP 4,600 per year to theft, the break-even calculation is
        straightforward once the monthly subscription figure is known. For pricing details and
        to apply for the pilot, visit mykei.io/pilot.
      </p>
    </article>
  );
}
