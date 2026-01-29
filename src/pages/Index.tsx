import HeroSection from "@/components/HeroSection";
import TechnologySection from "@/components/TechnologySection";
import LeadershipSection from "@/components/LeadershipSection";
import SpecsSection from "@/components/SpecsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-6">
          <div className="flex items-center justify-between h-16">
            <span className="font-mono text-xs tracking-[0.15em] text-muted-foreground">
              MYKEI SECURITIES
            </span>
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "TECHNOLOGY", href: "#technology" },
                { label: "LEADERSHIP", href: "#leadership" },
                { label: "SPECS", href: "#specs" },
                { label: "CONTACT", href: "#contact" },
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
      </header>

      {/* Main content */}
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
