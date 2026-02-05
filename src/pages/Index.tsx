import HeroSection from "@/components/HeroSection";
import TechnologySection from "@/components/TechnologySection";
import LeadershipSection from "@/components/LeadershipSection";
import SpecsSection from "@/components/SpecsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation header: Clinical & Minimalist */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.2em] text-blue-500 font-bold">
                MYKEI SECURITIES LTD
              </span>
              <span className="font-mono text-[8px] tracking-[0.1em] text-muted-foreground">
                FORENSIC INFRASTRUCTURE
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "ADN-1 SYSTEM", href: "#technology" },
                { label: "EXECUTIVE PROFILE", href: "#leadership" },
                { label: "AWS SPECS", href: "#specs" },
                { label: "PROTOCOL", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content: The ADN Coupling */}
      <main>
        <HeroSection />
        <TechnologySection />
        <LeadershipSection />
        <SpecsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
