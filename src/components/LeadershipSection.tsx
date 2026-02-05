const LeadershipSection = () => {
  return (
    <section id="leadership" className="py-24 bg-secondary/30">
      <div className="container px-6">
        <h2 className="font-mono text-sm tracking-widest text-blue-500 mb-12 uppercase">Executive Profile</h2>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-4xl font-bold mb-6">Michael Eseme, <span className="text-muted-foreground text-2xl font-normal italic">MBA, MSc</span></h3>
            <p className="text-lg text-muted-foreground mb-8">
              Founder & Architect of the ADN-1. A specialist in forensic infrastructure with a decade-long track record of closing systemic leaks in high-stakes environments.
            </p>
          </div>
          <div className="space-y-8 border-l border-white/10 pl-8">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-400">Institutional Governance</h4>
              <p className="text-sm text-muted-foreground">President of NUASA (2018). Spearheaded financial accountability and forensic audit protocols for student-led institutional bodies.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-400">National Infrastructure</h4>
              <p className="text-sm text-muted-foreground">DFA Office, NEMA. Developed a deep understanding of infrastructure vulnerability and asset leakage within national crisis management frameworks.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-400">Retail & Hospitality Intelligence</h4>
              <p className="text-sm text-muted-foreground">Successfully scaled high-volume retail environments in Abuja (Silent Party 9ja/Luxury Lounges) by implementing real-time asset protection and logistical integrity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LeadershipSection;
