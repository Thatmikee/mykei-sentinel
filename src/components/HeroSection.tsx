const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6 min-h-[80vh] flex items-center">
      <div className="container max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Sterilizing the <span className="text-blue-500">Shadow Market.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
          The black market thrives in retail blind spots. We don't just watch—we neutralize. 
          Introducing the <strong>ADN-1 (Active Deterrent Node)</strong>: Forensic-grade 
          infrastructure backed by AWS predictive telemetry. 
          <span className="block mt-4 text-foreground font-semibold">
            Because you can't sell what the system never let go of.
          </span>
        </p>
      </div>
    </section>
  );
};
export default HeroSection;
