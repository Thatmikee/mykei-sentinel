import { motion } from "framer-motion";
import mykeiLogo from "@/assets/mykei-logo-navy.png";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center top, hsl(220 70% 18% / 0.05) 0%, transparent 60%)" }}
      />

      {/* Content */}
      <div className="container relative z-10 px-6 py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Logo with clip-path reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 relative"
          >
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
            >
              <img 
                src={mykeiLogo} 
                alt="Mykei Securities Ltd." 
                className="h-48 md:h-64 mx-auto object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              ACTIVE DEFENSE PROTOCOL
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
          >
            <span className="text-foreground">ECONOMIC STERILIZATION</span>
            <br />
            <span className="text-gradient-accent">OF RETAIL CRIME.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            CCTV watches. <span className="text-foreground font-medium">Mykei Acts.</span> We make stolen goods 
            worthless at the point of theft.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <button
              onClick={scrollToContact}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-primary/50 text-foreground font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:border-primary hover:bg-primary/10 animate-pulse-glow"
            >
              <span className="relative z-10">Request Technical Protocol</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </motion.div>

          {/* Tech indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8 }}
            className="mt-24 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { label: "RESPONSE TIME", value: "<200ms" },
              { label: "SENSOR RANGE", value: "940nm" },
              { label: "ENCRYPTION", value: "AES-256" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-mono text-2xl md:text-3xl text-primary font-medium mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
