import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

const GOLD = "#D8001F";
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
    <nav aria-label="Site navigation" style={{
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
      <a href="/contact" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}`, padding: "7px 14px", textDecoration: "none" }}>
        Apply for ADN
      </a>
    </nav>
  );
}

/* Mykei wordmark, inlined from mykei_logo_black.svg, tinted to gold */
function MykeiLogo({ height = 96, fill = GOLD }: { height?: number; fill?: string }) {
  const aspect = 1073 / 1342;
  const width = Math.round(height * aspect);
  return (
    <svg width={width} height={height} viewBox="0 0 1073 1342" fill="none" aria-label="Mykei Securities logo">
      <g transform="translate(0,1342) scale(0.1,-0.1)" fill={fill} stroke="none">
        <path d="M6151 11305 c-178 -39 -194 -47 -984 -517 -26 -15 -50 -28 -53 -28 -12 0 -263 -156 -304 -188 -154 -123 -247 -258 -329 -477 -41 -111 -53 -320 -26 -464 55 -289 242 -529 512 -658 137 -65 261 -95 408 -96 205 -3 366 51 597 199 37 24 70 44 72 44 3 0 32 16 66 36 33 20 62 35 63 33 2 -2 36 -60 77 -129 168 -280 181 -309 187 -433 9 -151 -6 -194 -142 -395 -121 -181 -212 -316 -239 -353 -9 -13 -42 -62 -73 -109 -31 -47 -101 -152 -157 -234 -56 -82 -108 -159 -116 -172 -8 -12 -60 -89 -116 -171 -55 -81 -262 -389 -459 -683 -197 -294 -367 -546 -377 -560 -11 -14 -88 -129 -173 -257 -195 -296 -235 -395 -252 -624 -15 -210 80 -488 222 -655 107 -125 312 -255 469 -296 217 -57 435 -42 625 44 164 73 339 227 435 381 92 147 143 353 132 528 -7 112 -36 234 -72 302 l-25 49 73 111 c40 62 126 189 189 282 103 151 223 328 555 820 52 77 112 165 133 196 l40 56 -97 166 c-53 92 -99 167 -102 167 -3 0 -47 -62 -98 -138 -51 -75 -167 -245 -257 -377 -91 -132 -230 -337 -309 -455 -80 -118 -173 -255 -207 -305 -303 -444 -299 -436 -299 -510 0 -31 11 -64 39 -117 49 -92 69 -160 77 -257 20 -236 -106 -456 -323 -561 -94 -46 -154 -60 -262 -60 -151 0 -297 60 -399 163 -81 82 -98 105 -131 179 -70 156 -68 355 5 501 15 28 100 160 189 292 89 132 240 357 336 500 96 143 299 445 450 670 152 226 363 541 471 700 107 160 210 313 229 340 147 210 301 451 322 505 50 126 68 303 47 440 -21 128 -52 199 -206 466 -52 90 -94 168 -94 172 0 10 123 87 235 147 110 60 153 93 250 190 116 115 126 129 185 250 134 274 133 572 -3 855 -66 138 -147 237 -266 328 -121 93 -241 146 -385 171 -82 15 -278 12 -355 -4z m279 -345 c159 -23 337 -157 412 -311 90 -184 88 -353 -7 -546 -59 -119 -136 -192 -318 -300 -73 -43 -139 -82 -149 -88 -9 -5 -52 -30 -95 -55 -43 -25 -86 -49 -95 -55 -10 -5 -84 -49 -165 -96 -81 -47 -202 -117 -268 -156 -172 -100 -224 -117 -360 -117 -122 1 -185 17 -296 76 -70 37 -162 121 -203 186 -55 88 -97 246 -89 338 13 163 33 217 128 347 57 78 129 135 260 206 22 12 56 31 75 43 49 30 319 189 480 283 74 43 172 100 217 127 193 115 305 143 473 118z"/>
        <path d="M2745 9515 c-143 -27 -300 -91 -408 -168 -113 -81 -239 -219 -303 -333 -89 -160 -116 -271 -144 -599 -21 -258 -114 -1267 -154 -1685 -14 -140 -36 -390 -51 -555 -22 -261 -62 -690 -95 -1035 -25 -262 -60 -711 -60 -767 0 -99 28 -149 105 -184 37 -17 77 -19 618 -19 513 0 582 2 610 16 69 35 100 79 111 154 3 25 28 297 56 605 28 308 52 571 55 585 2 14 9 90 15 170 10 136 34 399 81 910 11 118 28 306 38 417 10 112 20 206 24 209 25 25 62 -22 325 -419 150 -227 335 -505 410 -618 75 -113 159 -239 186 -280 52 -78 85 -119 96 -119 4 0 33 39 65 88 32 48 78 113 101 145 48 62 51 73 30 96 -8 9 -92 133 -186 276 -542 817 -668 1005 -702 1053 -104 142 -317 187 -480 100 -64 -34 -138 -108 -169 -171 -20 -39 -42 -158 -54 -297 -3 -41 -12 -142 -20 -225 -8 -82 -31 -341 -50 -575 -20 -234 -49 -569 -65 -745 -33 -351 -90 -993 -90 -1012 0 -10 -81 -13 -369 -13 -204 0 -372 4 -375 8 -3 4 1 66 9 138 17 159 75 796 110 1194 14 162 32 363 40 445 8 83 26 278 40 435 14 157 37 409 51 560 14 151 32 352 40 445 8 94 24 260 35 370 10 110 26 270 34 355 9 85 20 178 26 206 25 129 134 285 262 374 38 28 75 50 80 50 6 0 18 6 26 14 49 42 225 70 351 56 146 -17 270 -71 381 -168 45 -40 217 -285 414 -590 27 -42 245 -372 485 -732 239 -360 439 -662 445 -672 57 -93 168 -248 177 -248 7 0 31 28 53 63 22 34 66 99 97 143 32 45 58 86 58 92 0 5 -35 63 -79 129 -43 65 -170 258 -283 428 -457 692 -687 1040 -817 1233 -75 112 -144 218 -155 235 -86 149 -245 276 -476 381 -120 54 -399 80 -555 51z"/>
        <path d="M7064 8188 c-37 -89 -93 -184 -140 -241 l-24 -29 29 -51 c48 -85 70 -125 159 -287 47 -85 92 -166 102 -180 9 -14 50 -83 90 -155 41 -71 117 -204 169 -295 52 -91 146 -257 209 -370 63 -113 151 -270 197 -350 176 -309 206 -363 203 -365 -2 -2 -39 -21 -83 -44 -44 -22 -98 -52 -120 -66 -44 -27 -69 -41 -190 -105 -149 -80 -249 -147 -270 -182 -25 -42 -26 -130 -2 -175 27 -52 81 -86 140 -90 50 -4 59 0 232 95 226 125 427 240 439 252 6 6 13 10 17 10 6 0 111 -173 176 -290 11 -19 36 -65 57 -101 l37 -67 -63 -35 c-113 -62 -152 -84 -218 -122 -36 -21 -119 -69 -185 -106 -66 -38 -137 -84 -157 -103 -67 -62 -71 -155 -10 -227 67 -79 148 -90 240 -35 32 18 154 89 272 157 118 67 229 131 245 141 17 10 35 18 40 18 6 0 35 -42 65 -92 29 -51 74 -129 100 -173 26 -44 73 -125 105 -180 67 -116 97 -152 142 -171 72 -31 163 -1 214 69 23 32 29 50 29 94 0 50 -7 66 -108 241 -60 103 -122 212 -139 242 -104 188 -269 479 -283 500 -10 14 -41 70 -70 125 -29 55 -68 122 -85 150 -18 27 -67 113 -110 190 -42 77 -90 160 -105 185 -15 25 -41 70 -57 100 -44 82 -71 129 -109 191 -19 31 -34 59 -34 63 0 3 -15 29 -33 58 -18 29 -38 64 -45 78 -6 14 -16 32 -21 40 -6 8 -42 74 -82 145 -39 72 -118 211 -174 310 -56 99 -119 209 -139 245 -20 36 -49 88 -66 115 -16 28 -51 88 -76 135 -26 47 -55 96 -64 110 -10 14 -35 57 -55 95 -21 39 -51 94 -66 123 -16 28 -41 71 -56 95 -15 23 -43 74 -63 112 -20 39 -49 93 -65 120 -15 28 -43 78 -62 113 -19 34 -35 62 -37 62 -2 0 -21 -41 -42 -92z"/>
      </g>
    </svg>
  );
}

export default function CertificationPage() {
  useEffect(() => {
    document.title = "Mykei Protected Certification | Mykei Securities";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "The Mykei Protected badge signals to customers, insurers, and resale platforms that a retail location runs ADN forensic marking. Become a certified Mykei Protected partner.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://mykei.io/certification";
    const schema = document.createElement("script");
    schema.id = "cert-schema";
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Mykei Protected Certification",
      "description": "Certification programme for retail locations deploying ADN forensic security. The Mykei Protected badge is recognised by insurers and resale platforms.",
      "provider": { "@type": "Organization", "name": "Mykei Securities Ltd", "url": "https://mykei.io" },
      "url": "https://mykei.io/certification",
      "serviceType": "Retail Security Certification",
    });
    if (!document.getElementById("cert-schema")) document.head.appendChild(schema);
    return () => { document.getElementById("cert-schema")?.remove(); };
  }, []);

  return (
    <>
      <PageSEO
        title="Mykei Protected Certification | Forensic Retail Security Badge | Mykei Securities"
        description="The Mykei Protected badge signals that a retail location uses ADN forensic retail defence, controlled marker workflows, and registry-linked verification."
        canonical="https://mykei.io/certification"
        keywords="Mykei Protected, retail security certification, forensic retail badge, ADN certified retailer, retail theft protection Manchester"
      />
      <SimpleNav />
      <main style={{ background: PAPER, minHeight: "100vh", paddingTop: 80 }}>

        {/* HERO */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "80px 40px 64px", borderBottom: `1px solid ${RULE}`, display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
              Mykei Securities Ltd, Certification
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.1, color: INK, marginBottom: 24 }}>
              Mykei Protected.
            </h1>
            <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.75, maxWidth: 500 }}>
              The Mykei Protected badge tells customers, insurers, and supply-chain partners that this location runs forensic retail security. It is not a sticker. It signals an active ADN deployment with verified forensic coverage and batch-linked event registration. No locations are certified yet; the programme opens alongside the Q3 2026 pilot.
            </p>
          </div>
          {/* Certificate badge, oblong pill */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "16px 0" }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              padding: "36px 52px",
              border: `1px solid ${GOLD}`,
              borderRadius: 120,
              background: "#fff",
              boxShadow: `0 0 0 5px ${PAPER}, 0 0 0 6px ${GOLD}22, 0 8px 32px rgba(216,0,31,0.12)`,
            }}>
              <MykeiLogo height={88} fill={GOLD} />
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: GOLD,
                textAlign: "center",
                lineHeight: 1.8,
              }}>
                Mykei Securities Ltd<br />
                <span style={{ color: MUTED, fontSize: 7.5 }}>Co. 16984969 · GB2606630.8</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IT MEANS */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 40 }}>
            What certification means
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
            {[
              {
                title: "Active forensic defence",
                body: "Certified locations will need at least one active ADN unit with verified sensor calibration and registry-linked marker deployment capability. The badge is intended to reflect a real deployment, not a purchased membership.",
              },
              {
                title: "Insurer recognition",
                body: "We are in active discussions with UK insurance underwriters to have Mykei Protected status recognised as a risk-reduction factor for retail crime premiums. Details will be published as agreements are finalised.",
              },
              {
                title: "Registry event records",
                body: "Certified locations receive priority batch registration in the Mykei Registry, ensuring that theft-related activations from their premises are logged with full cartridge-linked event records for verification and investigation workflows.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 400, color: INK, marginBottom: 12, lineHeight: 1.3 }}>
                  {title}
                </h2>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* VERIFICATION PORTAL */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            Verification portal
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: INK, marginBottom: 16, lineHeight: 1.3 }}>
                Verify a certified location.
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
                Anyone can confirm whether a Mykei Protected badge is backed by an active deployment. Enter the store's name or postcode below. The portal is public and does not require an account.
              </p>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, fontStyle: "italic" }}>
                The public verification portal opens when the first certified locations go live in Q3 2026.
              </p>
            </div>
            <div style={{ border: `1px solid ${RULE}`, borderRadius: 8, padding: "32px 28px", background: "#fff" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>
                Coming Q3 2026
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="text"
                  placeholder="Store name or postcode"
                  disabled
                  aria-label="Store name or postcode (verification portal not yet live)"
                  style={{ padding: "12px 16px", border: `1px solid ${RULE}`, borderRadius: 4, fontSize: 14, color: MUTED, background: "#F5F5F3", cursor: "not-allowed", fontFamily: "inherit" }}
                />
                <button
                  disabled
                  aria-disabled="true"
                  style={{ padding: "12px", background: RULE, color: MUTED, border: "none", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "not-allowed" }}
                >
                  Verify, launching Q3 2026
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO BECOME CERTIFIED */}
        <section style={{ maxWidth: 880, margin: "0 auto", padding: "72px 40px", borderBottom: `1px solid ${RULE}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: 32 }}>
            How to become certified
          </div>
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, color: INK, marginBottom: 20, lineHeight: 1.3 }}>
              Certification follows deployment.
            </h2>
            {[
              { step: "01", text: "Write to protocol@mykei.io. Pilot applications are closed while ADN is in prototype." },
              { step: "02", text: "Complete the seven-day Net 7 evaluation. Active ADN units are automatically enrolled in the Mykei Registry for cartridge-linked event registration." },
              { step: "03", text: "Receive your Mykei Protected badge, shelf signage, and digital verification credentials at the end of the pilot window." },
            ].map(({ step, text }) => (
              <div key={step} style={{ display: "flex", gap: 24, marginBottom: 28 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: GOLD, minWidth: 28, paddingTop: 2 }}>{step}</div>
                <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75 }}>{text}</p>
              </div>
            ))}
            <a
              href="/contact"
              style={{ display: "inline-block", marginTop: 12, background: GOLD, color: INK, padding: "13px 28px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Apply for the Pilot
            </a>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        *:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        @media (max-width: 640px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          section[style*="grid-template-columns: 1fr auto"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
