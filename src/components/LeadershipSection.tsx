import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leadership" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container relative z-10 px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              COMMAND STRUCTURE
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center">
            Executive Leadership
          </h2>
        </motion.div>

        {/* Leadership card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative glow-border rounded-lg overflow-hidden">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Profile image placeholder */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border border-primary/20" />
                    <div className="absolute inset-2 rounded-full border border-primary/10" />
                    
                    {/* Avatar placeholder with initials */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold text-primary">ME</span>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-background rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Bio content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Title */}
                  <div className="font-mono text-xs text-primary tracking-wider mb-2">
                    FOUNDER & CEO
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Michael Esema
                  </h3>
                  
                  <div className="font-mono text-sm text-muted-foreground mb-6">
                    MBA, MSc.
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    A strategic leader with an MBA (Nigerian Defense Academy) and an MSc in 
                    International Business Management (Manchester Metropolitan University). 
                    Michael combines a background in financial forensics (B.Sc. Accounting) 
                    with high-tempo hardware innovation to bridge the gap between retail loss 
                    and active defense.
                  </p>

                  {/* Credentials */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {["Financial Forensics", "Defense Strategy", "Hardware Innovation"].map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary border border-border rounded font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;
