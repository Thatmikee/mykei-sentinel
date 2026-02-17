export const Hero = () => {
  return (
    <section className="bg-royal-blue text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Sterilizing the Shadow Market.
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-xl">
              The black market thrives in retail blind spots. We don't just watch—we neutralize. 
              Introducing the ADN-1: Forensic-grade infrastructure backed by AWS predictive telemetry.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-royal-blue font-bold py-3 px-8 rounded shadow-lg hover:bg-blue-50">
                Defense Architecture
              </button>
              <button className="border border-white text-white font-bold py-3 px-8 rounded hover:bg-white/10">
                The Technology
              </button>
            </div>
          </div>
          <div className="hidden md:block">
             {/*  */}
          </div>
        </div>
      </div>
    </section>
  );
};
