export default function Adn1HowItWorks() {
  return (
    <article>
      <p>
        The ADN completes its full response sequence in under three seconds. From the moment
        both sensors register a qualifying event to the moment a forensic reference code is
        logged to AWS IoT Core and recorded in the Mykei Registry, the system operates
        without human intervention, without cameras, and without collecting any personal data.
        Understanding what happens inside that three-second window requires stepping through
        each stage of the sequence in order.
      </p>

      {/* Featured Image */}
      <div style={{ margin: "40px 0" }}>
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
          alt="Circuit board electronics"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 4, display: "block", marginBottom: 8 }}
        />
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#8A7560", margin: 0 }}>Photo: Unsplash</p>
      </div>

      <h2>Detection, Deployment, and Logging</h2>

      <p>
        <strong>Detection.</strong> The ADN uses dual Tactical Multi-zone Sensor Array time-of-flight sensors,
        positioned to monitor the shelf plane continuously. These sensors emit infrared pulses
        and measure the time taken for the reflection to return, producing precise distance
        readings across the monitored zone. When both sensors register simultaneous clearance,
        meaning the shelf face empties across the monitored width within a two-second window,
        the system evaluates that event against a kinetic signature profile calibrated to bulk
        sweep behaviour. A single item being removed does not trigger the sequence. The profile
        is specifically tuned to the rapid, broad clearance motion characteristic of organised
        retail crime sweeps.
      </p>

      <p>
        <strong>Deployment.</strong> On a confirmed match against the kinetic signature, the
        IRLZ44N MOSFET closes the circuit to the Forensic Mist Deployment System. The deployment module disperses
        forensic marker compound as a fine mist across the shelf area. The mist covers any
        goods remaining on the shelf, any goods that have been removed and are still in the
        immediate vicinity, and any individuals present in the zone. The marker is designed
        to bond to fabric, skin, packaging, and most hard surfaces on contact. The
        deployment takes approximately one second. The marker is invisible to the naked eye
        under normal lighting conditions and is not hazardous to skin or respiratory health.
      </p>

      <p>
        <strong>Logging.</strong> Simultaneously with deployment, the Encrypted Logic Core Feather V2
        microcontroller publishes a signed event payload to AWS IoT Core, hosted in the
        eu-north-1 region, over a TLS 1.3 MQTT connection. The payload contains a UTC
        timestamp, the device ID unique to that ADN unit, and a forensic reference code
        generated for that specific event. This creates a tamper-evident, timestamped record
        in cloud infrastructure that is independent of the physical device and cannot be
        altered or deleted by anyone with access to the retail premises.
      </p>

      <h2>The Registry and Marketplace Layer</h2>

      <p>
        The Mykei Registry receives the event payload from AWS IoT Core and creates a
        tamper-aware record linking the forensic reference code to the store identifier, shelf
        location, item category, and event timestamp. This registry record is the connective
        tissue between the physical forensic mark and the commercial layer where stolen goods
        are monetised. If an item bearing the forensic marker subsequently appears on a resale
        platform, the reference code can be read under UV light or via forensic reader and
        cross-referenced against the registry to confirm its origin, location, and the time at
        which it was marked.
      </p>

      <p>
        The registry is designed to support verification workflows, enabling the
        reference code to be used as a signal in review processes. A theft-linked
        item carrying a reference code present in the Mykei Registry can be connected
        to a specific event record, with a cloud-logged evidence-supporting record to
        support that identification. This is the layer at
        which Economic Sterilisation operates: not at the point of theft, but at the point
        of attempted conversion to cash.
      </p>

      <h2>What the ADN Does Not Do</h2>

      <p>
        The ADN does not capture images or video. It does not use facial recognition or any
        form of biometric processing. It does not collect or store personal data about
        individuals in the retail environment. The event payload logged to AWS IoT Core contains
        no information that identifies or could be used to identify any person. No personal data
        is collected at any stage of the sequence. There is nothing to protect because nothing
        identifying is captured by design.
      </p>

      <p>
        The enclosure is shelf-mounted, measuring 140 by 32 by 28 millimetres. It is designed
        to sit unobtrusively within a standard shelf configuration and does not require
        structural modification to the retail fixture. Installation is completed without
        specialist contractors.
      </p>

      <p>
        Patent-pending: UK application No. 2606630.8, covering 17 claims across the detection, deployment, and logging
        architecture, was filed on 23 March 2026 by Mykei Securities Ltd.
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
