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
              className="h-12 mb-6 invert brightness-0 invert opacity-60"
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
          </div>

          {/* Copyright */}
          <div className="mt-12 text-center">
            <p className="font-mono text-[10px] text-muted-foreground/60 tracking-wider">
              © {new Date().getFullYear()} MYKEI SECURITIES LTD. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
