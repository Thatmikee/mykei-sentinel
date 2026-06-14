import mykeiLogo from "@/assets/mykei-logo.png";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Logo and company info */}
          <div className="flex flex-col items-center text-center mb-12">
            <img
              src={mykeiLogo}
              alt="Mykei Securities Ltd."
              className="h-12 mb-6 opacity-80"
              width="48"
              height="48"
            />
            <p className="font-mono text-sm text-muted-foreground max-w-md">
              Institutional-grade retail security infrastructure. 
              Active defense for high-value merchandise.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Legal info */}
          <div className="text-center space-y-4">
            <p className="font-mono text-xs text-muted-foreground tracking-wider">
              MYKEI SECURITIES LTD
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              Company Number: 16984969 | Registered in England & Wales
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              Manchester, United Kingdom
            </p>
            <p className="font-mono text-xs text-muted-foreground tracking-wider">
              Patent-pending: UK application No. 2606630.8
            </p>
          </div>

          {/* Movement nav */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { href: "/adn-1", label: "ADN" },
              { href: "/signal", label: "Signal" },
              { href: "/certification", label: "Certification" },
              { href: "/state-of-theft", label: "State of Theft" },
              { href: "/glossary/economic-sterilisation", label: "Doctrine" },
              { href: "/contact", label: "Contact" },
              { href: "/founder", label: "Michael Esema" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase"
              >
                {label}
              </a>
            ))}
          </div>

          {/* LinkedIn */}
          <div className="mt-6 text-center">
            <a
              href="https://www.linkedin.com/in/michaelesema"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider"
            >
              linkedin.com/in/michaelesema
            </a>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center">
            <p className="font-mono text-[10px] text-muted-foreground/60 tracking-wider">
              © {new Date().getFullYear()} MYKEI SECURITIES LTD. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Disambiguation */}
          <div className="mt-4 text-center">
            <p className="font-mono text-[9px] text-muted-foreground/35 tracking-wide">
              Mykei Securities Ltd is unrelated to MYKI, the password manager.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
