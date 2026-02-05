const LeadershipSection = () => {
  return (
    <section id="executive-profile" className="py-24 bg-secondary/20">
      <div className="container px-6">
        <h2 className="font-mono text-sm tracking-widest text-blue-500 mb-12 uppercase">Dossier: MD/001</h2>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-5xl font-bold mb-4">Michael Esema</h3>
            <div className="flex gap-2 mb-8 flex-wrap">
              {["MBA", "MSc", "Lean Six Sigma", "PMP Candidate"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-tighter">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A world-renowned leader in forensic infrastructure. Michael specializes in translating complex systemic vulnerabilities into evidence-based mitigation protocols. With academic roots in the <span className="text-foreground">Nigerian Defence Academy</span> and <span className="text-foreground">MMU (UK)</span>, his work bridges the gap between national crisis management and global retail security.
            </p>
          </div>
          <div className="grid gap-6">
            {[
              { title: "National Emergency Management (NEMA)", desc: "DFA Office: Managed forensic financial oversight and reconciled high-volume logistical transactions within a national-scale crisis framework." },
              { title: "B's Hive Hotel & Suites / Silent Party 9ja", desc: "Spearheaded a 75% efficiency gain in administrative workflow and identified 45% untapped revenue via innovative retail-experience modules." },
              { title: "Institutional Governance (NUASA)", desc: "As President (2018), directed corporate records and upheld strict regulatory compliance for professional accounting bodies." }
            ].map((item) => (
              <div key={item.title} className="p-6 border border-white/5 bg-black/40">
                <h4 className="font-bold text-blue-400 text-sm mb-2 uppercase tracking-wide">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
