const specifications = [
  { label: "Processor", value: "Dual-core ESP32" },
  { label: "Sensor", value: "VL53LOX ToF" },
  { label: "Laser", value: "940nm VCSEL" },
  { label: "Response Time", value: "<200ms" },
  { label: "Encryption", value: "AES-256-GCM" },
  { label: "Cloud Protocol", value: "TLS 1.3" }
];

export const Specs = () => {
  return (
    <div className="bg-institutional-gray py-16 px-6">
      <div className="max-w-4xl mx-auto shadow-shelf p-8">
        <h3 className="text-royal-blue font-bold text-sm uppercase tracking-widest mb-6">Technical Specs :: ADN-1_SPEC_SHEET.cfg</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
          {specifications.map((spec) => (
            <div key={spec.label} className="flex justify-between border-b border-slate-200 py-2">
              <span className="text-slate-500 uppercase">{spec.label}</span>
              <span className="text-royal-blue font-bold">{spec.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-400 text-center">
          COMPLIANT WITH UK RETAIL SECURITY STANDARDS | ISO 27001 CERTIFIED INFRASTRUCTURE
        </p>
      </div>
    </div>
  );
};
