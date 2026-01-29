import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SpecsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const specs = [
    { label: "PROCESSOR", value: "Dual-core ESP32" },
    { label: "SENSOR", value: "VL53L0X ToF" },
    { label: "LASER", value: "940nm VCSEL" },
    { label: "RESPONSE TIME", value: "<200ms" },
    { label: "CONNECTIVITY", value: "Encrypted Wi-Fi/LTE" },
    { label: "ENCRYPTION", value: "AES-256-GCM" },
    { label: "CLOUD PROTOCOL", value: "TLS 1.3" },
    { label: "POWER", value: "PoE / 12V DC" },
  ];

  return (
    <section id="specs" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-pattern opacity-30" />

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
              SYSTEM SPECIFICATIONS
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center">
            Technical Specs
          </h2>
        </motion.div>

        {/* Specs table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative glow-border rounded-lg overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-4 font-mono text-xs text-muted-foreground">
                ADN-1_SPEC_SHEET.cfg
              </span>
            </div>

            {/* Specs list */}
            <div className="p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-4">
                <span className="text-primary">$</span> cat /sys/device/specs
              </div>
              
              <div className="space-y-0">
                {specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="flex items-center py-3 border-b border-border/50 last:border-0"
                  >
                    <span className="text-muted-foreground w-44 flex-shrink-0">
                      {spec.label}
                    </span>
                    <span className="text-primary mx-4">::</span>
                    <span className="text-foreground">{spec.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-muted-foreground">
                <span className="text-primary">$</span> <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compliance note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-xs text-muted-foreground tracking-wider">
            COMPLIANT WITH UK RETAIL SECURITY STANDARDS • ISO 27001 CERTIFIED INFRASTRUCTURE
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecsSection;
