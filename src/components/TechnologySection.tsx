import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const TechnologySection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    {
      id: "ADN",
      title: "Active Deterrence Node",
      description:
        "A shelf-integrated unit utilizing 940nm VCSEL laser-ranging sensors (Time-of-Flight) with sub-200ms detection-to-trigger response time. The ADN monitors high-value merchandise in real-time and activates deterrence protocols upon unauthorized removal.",
      specs: [
        { label: "SENSOR TYPE", value: "Tactical Multi-zone Sensor Array" },
        { label: "WAVELENGTH", value: "940nm VCSEL" },
        { label: "RESPONSE", value: "<200ms" },
      ],
      href: "/adn",
    },
    {
      id: "ATS",
      title: "Alarm Transmission System",
      description:
        "A secure, encrypted cloud layer that transmits real-time theft alerts from shelf sensors to the management dashboard. The ATS ensures instant notification and evidence capture across your entire retail infrastructure.",
      specs: [
        { label: "PROTOCOL", value: "TLS 1.3" },
        { label: "LATENCY", value: "<50ms" },
        { label: "UPTIME", value: "99.99%" },
      ],
      href: "/technology/ats",
    },
  ];

  return (
    <section id="technology" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              DEFENSE ARCHITECTURE
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            The Technology
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Integrated hardware and cloud infrastructure designed for one purpose:
            <span className="text-primary font-medium"> Economic Sterilization</span>, marking
            high-value stock with controlled marker deployment to disrupt resale confidence and create batch-linked event records.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative glow-border rounded-lg p-8 md:p-10 cursor-pointer transition-all duration-300 hover:border-primary/40"
              onClick={() => navigate(tech.href)}
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-primary/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-primary/30" />

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                <span className="font-mono text-xs text-primary tracking-wider">{tech.id}</span>
              </div>

              <h3 className="text-2xl font-bold mb-4">{tech.title}</h3>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {tech.description}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border mb-6">
                {tech.specs.map((spec, specIndex) => (
                  <div key={specIndex}>
                    <div className="font-mono text-[10px] text-muted-foreground tracking-wider mb-1">
                      {spec.label}
                    </div>
                    <div className="font-mono text-sm text-primary">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* View detail CTA */}
              <div className="flex items-center gap-2 font-mono text-xs text-primary/70 group-hover:text-primary transition-colors duration-200">
                <span className="tracking-wider uppercase">View full specification</span>
                <svg
                  className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none" viewBox="0 0 12 12"
                >
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-card border border-border rounded">
            <div className="w-3 h-3 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
            <span className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground font-medium">KEY OUTCOME:</span>{" "}
              Controlled marker deployment creates a batch-linked event record and disrupts resale confidence at point of detection
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;
