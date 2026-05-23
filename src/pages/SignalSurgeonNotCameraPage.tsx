// src/pages/SignalSurgeonNotCameraPage.tsx
// The Signal · Issue 03: A Surgeon, Not a Camera

import { useEffect, useRef, useState } from "react";
import PageSEO from "@/components/PageSEO";
import SignalShareBar from "@/components/SignalShareBar";

const GOLD = "#c9a84c";
const INK = "#0F0C08";
const MID = "#5c4a32";
const WARM = "#F5F1EB";
const RULE = "#DDD5C4";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, visible: v };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(18px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function SignalSurgeonNotCameraPage() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <PageSEO
        title="A Surgeon, Not a Camera: The 200 Millisecond Rule | The Signal"
        description="How do you tell a bulk-sweep theft from a shopper picking up a product? The ADN-1 does it in under 50ms using XSHUT address management on GPIO 4 and GPIO 5, kinetic signature classification on an Encrypted Logic Core, and a 113kHz Forensic Mist Deployment System. This is forensic infrastructure, not AI surveillance."
        canonical="https://mykei.io/signal/surgeon-not-camera-200ms"
        ogImage="https://mykei.io/og/signal-surgeon-not-camera-200ms.png"
        keywords="ADN-1 technical how it works, Tactical Multi-zone Sensor Array dual sensor theft detection, Encrypted Logic Core retail security, kinetic signature analysis theft, Forensic Mist Deployment System anti-theft, bulk sweep detection algorithm, forensic retail security hardware, 200 milliseconds theft response, ADN-1 firmware explained, Mykei technical blog"
        breadcrumbs={[
          { name: "Home", url: "https://mykei.io" },
          { name: "The Signal", url: "https://mykei.io/signal" },
          { name: "A Surgeon, Not a Camera", url: "https://mykei.io/signal/surgeon-not-camera-200ms" },
        ]}
        ogType="article"
        ldJson={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "A Surgeon, Not a Camera: The 200 Millisecond Rule",
          "description": "How the ADN-1 distinguishes a bulk-sweep theft from a shopper in under 50ms using dual Tactical Multi-zone Sensor Array sensors, Encrypted Logic Core kinetic classification, and a 113kHz Forensic Mist Deployment System.",
          "url": "https://mykei.io/signal/surgeon-not-camera-200ms",
          "datePublished": "2026-04-15T08:00:00Z",
          "author": { "@type": "Person", "name": "Michael Esema", "url": "https://mykei.io/founder" },
          "publisher": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io", "logo": { "@type": "ImageObject", "url": "https://mykei.io/mykei-logo.png" } },
          "image": "https://mykei.io/social-share.png",
          "articleSection": "Technical",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".article-standfirst", ".article-key-takeaways"] },
          "mentions": [
            { "@type": "Organization", "name": "Mykei Securities Ltd" },
            { "@type": "Thing", "name": "Encrypted Logic Core" },
            { "@type": "Thing", "name": "Tactical Multi-zone Sensor Array" }
          ]
        })}
        articleMeta={{
          publishedTime: "2026-04-15T08:00:00Z",
          author: "Michael Esema",
          section: "Technical",
          tags: ["Encrypted Logic Core", "Tactical Multi-zone Sensor Array", "kinetic analysis", "forensic hardware", "ADN-1 firmware"],
        }}
      />

      <div style={{ fontFamily: "'Georgia',serif", background: "#fff", color: INK, minHeight: "100vh" }}>

        {/* Nav */}
        <nav style={{ borderBottom: `1px solid ${RULE}`, padding: "0 40px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", zIndex: 100 }}>
          <a href="/signal" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "2px", color: GOLD, textDecoration: "none", textTransform: "uppercase" }}>The Signal</a>
          <a href="/pilot" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "1.5px", color: INK, textDecoration: "none", textTransform: "uppercase", border: `1px solid ${RULE}`, padding: "6px 16px", borderRadius: 4 }}>Join the Pilot</a>
        </nav>

        {/* Header */}
        <header style={{ maxWidth: 760, margin: "0 auto", padding: "72px 32px 48px" }}>
          <Reveal>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: GOLD, marginBottom: 20 }}>
              The Signal · Issue 03 · April 2026
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(28px,4.8vw,48px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1px", color: INK, margin: "0 0 24px" }}>
              A surgeon, not a camera.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: MID, margin: "0 0 32px", fontStyle: "italic" }}>
              The security industry sells surveillance. We build forensic infrastructure. The difference is a 200-millisecond decision cycle on a dual-core microprocessor in Prestwich, and it matters more than any camera angle ever could.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${RULE}`, paddingTop: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK }}>Michael Esema</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: MID }}>Founder, Mykei Securities · 15 April 2026 · 8 min read</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Article */}
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 80px" }}>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The security industry loves "AI-powered." Every camera system with a motion filter, every EAS tag reader with a beep threshold, every app that sends push notifications, all of them are "AI-powered" now. It's not a lie, exactly. It's just a word that has been diluted to the point of describing nothing specific.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The ADN-1 is a forensic instrument with one specific diagnostic task: distinguish a bulk-sweep theft event from normal retail activity, in real time, on device, without a network, without a camera, without capturing any personal data, with a false positive rate below 0.3%. If you've ever written a real-time classifier for constrained hardware, you know that's a tighter spec than it sounds.
            </p>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The I2C problem that almost killed the dual-sensor design.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The ADN-1 uses two Tactical Multi-zone Sensor Array Time-of-Flight sensors to monitor a shelf zone. This creates a problem that anyone who has worked with I2C peripherals on a shared bus will recognise immediately: both sensors come from the factory with the same I2C address (0x29). You cannot address them individually on a shared bus without resolving this conflict.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The standard solution is XSHUT pin management. The Tactical Multi-zone Sensor Array has a XSHUT line that holds the sensor in hardware standby when pulled low. We bring both sensors up in hardware standby, then wake Sensor A on GPIO4 first, immediately reassign its I2C address in firmware (0x30), then wake Sensor B on GPIO5 and leave it on the default address (0x29). From that point, both sensors are individually addressable and both can operate simultaneously on the same I2C bus without conflict.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: "#F8F8F6", border: `1px solid ${RULE}`, borderLeft: `3px solid ${GOLD}`, borderRadius: 10, padding: "24px 28px", marginBottom: 36, overflow: "auto" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>ADN-1 Firmware: Sensor Initialisation (Encrypted Logic Core / MicroPython)</div>
              <pre style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#1a1a18", margin: 0, lineHeight: 1.7, overflowX: "auto" }}>{`# GPIO assignments
XSHUT_A = Pin(4, Pin.OUT, value=0)  # Sensor A held in standby
XSHUT_B = Pin(5, Pin.OUT, value=0)  # Sensor B held in standby

i2c = SoftI2C(scl=Pin(22), sda=Pin(21))

# Wake Sensor A, reassign address
XSHUT_A.value(1)
time.sleep_ms(10)
sensor_a = Tactical Multi-zone Sensor Array(i2c, address=0x29)
sensor_a.set_address(0x30)          # Sensor A now at 0x30

# Wake Sensor B on default address
XSHUT_B.value(1)
time.sleep_ms(10)
sensor_b = Tactical Multi-zone Sensor Array(i2c, address=0x29)  # Sensor B stays at 0x29

# Both sensors live, individually addressable`}</pre>
            </div>
          </Reveal>

          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              This matters for one reason beyond the technical: it means the <a href="/adn-1" style={{ color: GOLD, textDecoration: "underline" }}>ADN-1</a> gets bilateral sweep data. A single sensor cannot distinguish between a normal single-item pick and a bulk sweep. Two sensors watching the same zone from different positions, firing simultaneously and comparing trajectory vectors, can. The kinetic signature of a bulk sweep is specific: bilateral displacement, high velocity, short dwell time, multiple simultaneous zone changes. A shopper picking up a product has a completely different signature.
            </p>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>The 50ms decision.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The Encrypted Logic Core runs dual cores at 240MHz. Core 0 handles the I2C polling loop, which cycles at 33ms (30 readings per second). Core 1 runs the kinetic classifier, which processes each reading against the sweep profile in parallel. The decision chain is:
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: "#F8F8F6", border: `1px solid ${RULE}`, borderLeft: `3px solid ${GOLD}`, borderRadius: 10, padding: "24px 28px", marginBottom: 36 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Decision Chain: Core 1 Classifier</div>
              {[
                { ms: "0ms", event: "Simultaneous reading received from both sensors" },
                { ms: "8ms", event: "Velocity vectors computed, zones A and B" },
                { ms: "18ms", event: "Bilateral threshold check, both zones, same direction?" },
                { ms: "30ms", event: "Dwell time check: was the object stationary before displacement?" },
                { ms: "45ms", event: "Profile match confirmed, bulk sweep signature classified" },
                { ms: "50ms", event: "Trigger signal sent to ultrasonic deployment module controller" },
              ].map(({ ms, event }) => (
                <div key={ms} style={{ display: "flex", gap: 20, padding: "9px 0", borderBottom: ms !== "50ms" ? `1px solid ${RULE}` : "none" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: GOLD, minWidth: 48, flexShrink: 0 }}>{ms}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: INK, lineHeight: 1.6 }}>{event}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>Why a 113kHz ultrasonic deployment module and not a servo?</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The actuation stage gets less attention than the detection stage, but it is where the forensic doctrine is physically enacted. The ADN-1 uses a 113kHz Forensic Mist Deployment System disc to atomise the forensic marker compound. At that frequency, the ultrasonic deployment module creates a micron-scale mist, not a spray. Micron-scale particles travel further, disperse into a wider cone, and bond to a broader surface area than a mechanical spray ever could. They also do not produce a visible cloud that would alert the thief to the activation.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The entire trigger-to-deployment sequence runs in under 200 milliseconds from the first threshold crossing. In a bulk sweep that takes 1.5 to 3 seconds from start to finish, this means the markers are deployed while the goods are still in motion. The thief is marked before they are at the exit. The goods are marked before they leave the store.
            </p>
          </Reveal>

          <Reveal>
            <blockquote style={{ borderLeft: `3px solid ${GOLD}`, margin: "0 0 36px", padding: "16px 24px", background: WARM, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", color: INK, margin: 0 }}>
                "AI surveillance watches you. Forensic infrastructure marks you. The difference is whether the evidence lasts ten minutes or ten years."
              </p>
            </blockquote>
          </Reveal>

          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: INK, margin: "40px 0 16px" }}>No cameras. No AI. No personal data. Ever.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              The security market has conditioned retailers to expect surveillance as the baseline. Cameras everywhere. Data everywhere. GDPR compliance handled by a policy document nobody reads. The ADN-1 has no camera. No biometric capability. The only data it generates is kinetic: distance measurements, velocity vectors, timestamps, and the forensic event package that follows. There is no face. No gait. Nothing that connects to a person. A Time-of-Flight sensor physically cannot capture identifying information.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 28 }}>
              No personal data by design. You can't accidentally collect personal data you have no mechanism to collect. That was a deliberate design decision from the start, and it runs through all seventeen patent claims. The firmware is at <a href="https://github.com/Thatmikee" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "none" }}>github.com/Thatmikee</a>.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: WARM, border: `1px solid ${RULE}`, borderRadius: 10, padding: "28px 32px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>Key Takeaways</div>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {[
                  "Dual Tactical Multi-zone Sensor Array sensors require XSHUT address management via GPIO 4 and GPIO 5. One I2C bus. Two independent sensors.",
                  "The kinetic classifier runs on Core 1 of the Encrypted Logic Core at 240MHz, reaching a decision in under 50ms.",
                  "A 113kHz Forensic Mist Deployment System disc atomises the marker compound at micron scale, achieving broader coverage and silent deployment than mechanical spray.",
                  "Total trigger-to-deployment time: under 200ms. The goods are marked before the thief reaches the exit.",
                  "No camera. No biometric data. No personal data captured by design.",
                ].map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < 4 ? `1px solid ${RULE}` : "none", fontSize: 14, lineHeight: 1.65, color: INK }}>
                    <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>0{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Pilot CTA */}
          <Reveal>
            <div style={{ textAlign: "center", border: `1px solid ${RULE}`, borderRadius: 10, padding: "40px 32px", marginBottom: 48 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Independent Retail Pilot · 2026</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 12px" }}>Deploy forensic infrastructure. Not another camera.</h3>
              <p style={{ fontSize: 15, color: MID, lineHeight: 1.7, maxWidth: 480, margin: "0 0 28px" }}>Five slots. Founders pricing. £149 setup + £40/month. Full production hardware, direct founding team support.</p>
              <a href="/pilot" style={{ display: "inline-block", background: GOLD, color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, padding: "14px 36px", borderRadius: 6, textDecoration: "none" }}>Apply for the Pilot</a>
            </div>
          </Reveal>

          <SignalShareBar
            url="https://mykei.io/signal/surgeon-not-camera-200ms"
            title="A Surgeon, Not a Camera: The 200 Millisecond Rule"
            description="CCTV timestamps the crime. ADN-1 acts before the shelf is empty. The difference is 200ms and a forensic event record."
          />

          {/* Author */}
          <Reveal>
            <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 18, flexShrink: 0 }}>ME</div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: INK, marginBottom: 8 }}>About the Author</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: MID, margin: "0 0 10px" }}>
                  <strong style={{ color: INK }}>Michael Esema, MBA, MSc.</strong> Founder of Mykei Securities. I debugged the dual Tactical Multi-zone Sensor Array I2C conflict in Prestwich, filed seventeen patent claims, and am running the Independent Retail Pilot review route. MBA from the Nigerian Defence Academy. MSc from Manchester Metropolitan University.
                </p>
                <a href="https://github.com/Thatmikee" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: GOLD, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none" }}>The firmware is at github.com/Thatmikee</a>
              </div>
            </div>
          </Reveal>

        </article>
      </div>
    </>
  );
}
