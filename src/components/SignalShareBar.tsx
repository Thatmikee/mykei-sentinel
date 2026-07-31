import { useState } from "react";

const GOLD = "#D4AF37";
const INK = "#1E1E1E";
const PAPER = "#FAF8F3";
const RULE = "#E2D9C8";

interface SignalShareBarProps {
  url: string;
  title: string;
  description: string;
  hashtags?: string;
}

export default function SignalShareBar({ url, title, description, hashtags = "RetailCrime,Mykei,EconomicSterilisation" }: SignalShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);
  const xText = encodeURIComponent(`${title}\n\n${description}\n\n`);

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${xText}&url=${encoded}&hashtags=${hashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}&quote=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n${description}\n${url}`)}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${description}\n\nRead the full article: ${url}`)}`,
    sms: `sms:?body=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch (_e) { /* share cancelled or unsupported */ }
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer,width=600,height=500");

  const btnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    border: `1px solid ${RULE}`,
    borderRadius: 3,
    background: PAPER,
    color: INK,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
    transition: "border-color 0.15s, color 0.15s",
  };

  return (
    <div style={{
      borderTop: `1px solid ${RULE}`,
      borderBottom: `1px solid ${RULE}`,
      padding: "20px 0",
      margin: "48px 0",
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 8,
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: GOLD,
        marginBottom: 14,
      }}>
        Share this article
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>

        {/* X / Twitter */}
        <button onClick={() => open(shareLinks.x)} style={btnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = RULE; (e.currentTarget as HTMLButtonElement).style.color = INK; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.245 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Post on X
        </button>

        {/* Facebook */}
        <button onClick={() => open(shareLinks.facebook)} style={btnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = RULE; (e.currentTarget as HTMLButtonElement).style.color = INK; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Share
        </button>

        {/* LinkedIn */}
        <button onClick={() => open(shareLinks.linkedin)} style={btnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = RULE; (e.currentTarget as HTMLButtonElement).style.color = INK; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>

        {/* WhatsApp */}
        <button onClick={() => open(shareLinks.whatsapp)} style={btnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = RULE; (e.currentTarget as HTMLButtonElement).style.color = INK; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>

        {/* Email */}
        <a href={shareLinks.email} style={btnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD; (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = RULE; (e.currentTarget as HTMLAnchorElement).style.color = INK; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Email
        </a>

        {/* SMS */}
        <a href={shareLinks.sms} style={btnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD; (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = RULE; (e.currentTarget as HTMLAnchorElement).style.color = INK; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Text
        </a>

        {/* Copy link */}
        <button onClick={handleCopy} style={{ ...btnStyle, borderColor: copied ? GOLD : RULE, color: copied ? GOLD : INK }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {copied
              ? <polyline points="20 6 9 17 4 12"/>
              : <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>
            }
          </svg>
          {copied ? "Copied!" : "Copy link"}
        </button>

        {/* Native share (mobile — handles IG stories/messages automatically) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button onClick={handleNativeShare} style={btnStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = RULE; (e.currentTarget as HTMLButtonElement).style.color = INK; }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            More (IG, iMessage...)
          </button>
        )}
      </div>

      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 8,
        color: "#bbb",
        marginTop: 12,
        letterSpacing: "0.08em",
      }}>
        On mobile, "More" opens Instagram Stories, Messages, and all native share options.
      </p>
    </div>
  );
}
