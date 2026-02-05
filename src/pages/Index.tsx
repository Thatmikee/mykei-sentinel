{/* Navigation header: Clinical & Minimalist */}
<header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
  <div className="container px-6">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-3">
        {/* LOGO INTEGRATION: Replace with your actual logo file path */}
        <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-white text-xs">M</div>
        <div className="flex flex-col">
          <span className="font-mono text-[11px] tracking-[0.2em] text-foreground font-bold leading-none">
            MYKEI SECURITIES LTD
          </span>
          <span className="font-mono text-[8px] tracking-[0.1em] text-blue-500 font-bold">
            FORENSIC INFRASTRUCTURE
          </span>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        {["ADN-1 SYSTEM", "EXECUTIVE PROFILE", "AWS SPECS", "PROTOCOL"].map((label) => (
          <a key={label} href={`#${label.toLowerCase().replace(" ", "-")}`} className="font-mono text-[10px] tracking-widest text-muted-foreground hover:text-blue-500 transition-colors">
            {label}
          </a>
        ))}
      </nav>
    </div>
  </div>
</header>
