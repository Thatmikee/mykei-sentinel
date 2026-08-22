import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

const GOLD = "#C9A84C";
const INK = "#1A1A18";
const PAPER = "#FFFFFF";
const MUTED = "#6B6B65";
const RULE = "#E8E8E4";

function SimpleNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 56, padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(250,250,248,0.97)" : "rgba(250,250,248,1)",
      borderBottom: `1px solid ${RULE}`,
      backdropFilter: "blur(12px)",
    }}>
      <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: INK, textDecoration: "none" }}>
        Mykei Securities
      </a>
      <a href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>
        Back to site
      </a>
    </nav>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SimpleNav />
      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 100 }}>
        <article style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px 96px" }}>

          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 24 }}>
            Mykei Securities Ltd
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: INK, marginBottom: 12, lineHeight: 1.15 }}>
            Privacy & Cookies
          </h1>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: MUTED, marginBottom: 48 }}>
            Last updated: 10 April 2026
          </p>

          <div style={{ height: 1, background: RULE, marginBottom: 48 }} />

          {[
            {
              heading: "Who we are",
              body: `Mykei Securities Ltd is a company registered in England & Wales (Company Number: 16984969), with a registered address in Manchester, United Kingdom. We develop the ADN retail security device and operate the mykei.io website. For any data-related enquiries, contact us at protocol@mykei.io.`,
            },
            {
              heading: "What data we collect",
              body: `We collect information you submit through our forms on this website, including your name, business name, email address, and telephone number. We also receive standard server logs (IP address, browser type, referring URL) through our hosting provider, Cloudflare. If you have consented to analytics, we collect anonymised usage data through Google Analytics.`,
            },
            {
              heading: "Lawful basis",
              body: `We process form submission data on the basis of legitimate interest (UK GDPR Art. 6(1)(f)) to respond to your enquiry and evaluate your suitability for the ADN pilot programme. We process analytics data on the basis of consent (UK GDPR Art. 6(1)(a)). You may withdraw consent for analytics at any time by adjusting your browser settings or using the opt-out mechanism provided by Google Analytics.`,
            },
            {
              heading: "How long we keep it",
              body: `ADN forensic event records (device ID, timestamp, sensor data) are retained for 7 years from the date of the event to support potential criminal or civil proceedings. Retailer account data is retained for 6 years from the date of account closure, in line with the UK Limitation Act 1980. Enquiry and pilot application data is retained for up to 24 months from the date of submission, or until you request erasure. Server logs are retained by Cloudflare for up to 30 days. Analytics data is retained for 14 months in line with Google Analytics default settings.`,
            },
            {
              heading: "Your rights",
              body: `Under UK GDPR, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request erasure of your data; object to processing based on legitimate interest; request restriction of processing; receive your data in a portable format. To exercise any of these rights, email protocol@mykei.io. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`,
            },
            {
              heading: "Cookies",
              body: `This site uses strictly necessary cookies set by Cloudflare to handle form submissions and deliver the service. If you have opted in to analytics, Google Analytics places additional cookies (_ga, _gid) to measure anonymised usage. You can manage or delete cookies through your browser settings. We do not use advertising cookies or track you across other websites.`,
            },
            {
              heading: "ADN forensic event data",
              body: `The ADN device does not collect personal data. It records: device ID, timestamp, and sensor distance readings. This event data is transmitted encrypted (TLS 1.3) to our cloud infrastructure hosted on Amazon Web Services (eu-north-1 region, Stockholm) and stored encrypted at rest (AES-256). No images, audio, biometric data, or names are recorded. ADN is designed with data minimisation and privacy-by-design principles. Mykei acts as sole data controller for ADN event records.`,
            },
            {
              heading: "Third-party services",
              body: `We use Cloudflare for website hosting and DNS (cloudflare.com/privacypolicy). ADN event data is hosted on AWS eu-north-1, which is ISO 27001 certified. If analytics is enabled, usage data is processed by Google Analytics under Google's standard data processing terms. Transactional emails are delivered via Resend (SOC 2 Type II).`,
            },
            {
              heading: "Changes to this policy",
              body: `We may update this policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the site after a change constitutes acceptance of the updated policy.`,
            },
          ].map(({ heading, body }) => (
            <section key={heading} style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: INK, marginBottom: 14, borderLeft: `2px solid ${GOLD}`, paddingLeft: 16 }}>
                {heading}
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, paddingLeft: 18 }}>
                {body}
              </p>
            </section>
          ))}

        </article>
      </main>
      <Footer />
    </>
  );
}
