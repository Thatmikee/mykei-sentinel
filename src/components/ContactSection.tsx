import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  organization: z.string().trim().min(1, "Organization / store name is required").max(200, "Must be less than 200 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  storeType: z.string().min(1, "Please select a store type"),
  shrinkage: z.string().min(1, "Please select an option"),
  message: z.string().trim().max(2000, "Message must be less than 2000 characters").optional(),
  foundingPartner: z.boolean(),
});

type ContactForm = z.infer<typeof contactSchema>;

const STORE_TYPES = [
  "Off-licence / Convenience Store",
  "Independent Jeweller",
  "Vape / Accessories Store",
  "Hair & Beauty Supply",
  "Pharmacy / Health Store",
  "Cosmetics / Perfume Retailer",
  "Electronics & Accessories",
  "Other Independent Retail",
];

const SHRINKAGE_OPTIONS = [
  "Under £5,000 per year",
  "£5,000 – £20,000 per year",
  "£20,000 – £50,000 per year",
  "Over £50,000 per year",
  "I don't currently track shrinkage",
];

const ContactSection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    organization: "",
    email: "",
    storeType: "",
    shrinkage: "",
    message: "",
    foundingPartner: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);

    const body = new URLSearchParams({
      "form-name":        "pilot-enquiry",
      "name":             formData.name,
      "organization":     formData.organization,
      "email":            formData.email,
      "store-type":       formData.storeType,
      "shrinkage":        formData.shrinkage,
      "message":          formData.message ?? "",
      "founding-partner": formData.foundingPartner ? "Yes" : "No",
    });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.ok) {
        navigate("/pilot-download", {
          state: {
            name: formData.name.split(" ")[0],
            store: formData.organization,
          },
        });
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-secondary border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";

  const labelClasses = "block font-mono text-xs text-muted-foreground tracking-wider mb-2";

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              SECURE CHANNEL
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Request Protocol Access
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto">
            Submit your inquiry for access to technical documentation and deployment consultation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative glow-border rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-primary/30" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/30" />

            <div className="p-8 md:p-12">
              <>
                <form name="pilot-enquiry" hidden>
                  <input type="text"  name="name" />
                  <input type="text"  name="organization" />
                  <input type="email" name="email" />
                  <input type="text"  name="store-type" />
                  <input type="text"  name="shrinkage" />
                  <textarea          name="message" />
                  <input type="text"  name="founding-partner" />
                </form>

                <form
                  name="pilot-enquiry"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <input type="hidden" name="form-name" value="pilot-enquiry" />

                  <div>
                    <label className={labelClasses}>NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="mt-1 font-mono text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>ORGANIZATION / STORE NAME</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Company or store name"
                    />
                    {errors.organization && (
                      <p className="mt-1 font-mono text-xs text-destructive">{errors.organization}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>STORE TYPE</label>
                    <select
                      name="storeType"
                      value={formData.storeType}
                      onChange={handleChange}
                      className={`${inputClasses} ${!formData.storeType ? "text-muted-foreground" : ""}`}
                    >
                      <option value="" disabled>Select your store type…</option>
                      {STORE_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.storeType && (
                      <p className="mt-1 font-mono text-xs text-destructive">{errors.storeType}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>
                      ESTIMATED ANNUAL STOCK SHRINKAGE / THEFT LOSS
                    </label>
                    <select
                      name="shrinkage"
                      value={formData.shrinkage}
                      onChange={handleChange}
                      className={`${inputClasses} ${!formData.shrinkage ? "text-muted-foreground" : ""}`}
                    >
                      <option value="" disabled>Select a range…</option>
                      {SHRINKAGE_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.shrinkage && (
                      <p className="mt-1 font-mono text-xs text-destructive">{errors.shrinkage}</p>
                    )}
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      Used for pilot evidence documentation only.
                    </p>
                  </div>

                  <div>
                    <label className={labelClasses}>MESSAGE (OPTIONAL)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputClasses} resize-none`}
                      placeholder="Describe your security requirements or theft challenges…"
                    />
                    {errors.message && (
                      <p className="mt-1 font-mono text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <div
                    className={`relative rounded border px-5 py-4 cursor-pointer transition-all duration-200 ${
                      formData.foundingPartner
                        ? "border-primary/60 bg-primary/5"
                        : "border-border bg-secondary hover:border-primary/30"
                    }`}
                    onClick={() =>
                      setFormData((f) => ({ ...f, foundingPartner: !f.foundingPartner }))
                    }
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all ${
                          formData.foundingPartner
                            ? "bg-primary border-primary"
                            : "bg-transparent border-muted-foreground"
                        }`}
                      >
                        {formData.foundingPartner && (
                          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-foreground font-bold">
                          Pilot Founding Partner
                        </p>
                        <p className="mt-1 font-mono text-xs text-muted-foreground leading-relaxed">
                          Tick to receive your{" "}
                          <span className="text-foreground">Pilot Programme Overview</span> and{" "}
                          <span className="text-foreground">Letter of Intent template</span>{" "}
                          immediately after submitting. Founding Partner places are limited to
                          Greater Manchester retailers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <input type="hidden" name="founding-partner" value={formData.foundingPartner ? "Yes" : "No"} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Processing…
                      </>
                    ) : formData.foundingPartner ? (
                      "Apply as Founding Partner →"
                    ) : (
                      "Submit Request"
                    )}
                  </button>

                  {submitError && (
                    <p className="text-center font-mono text-xs text-destructive">
                      Submission failed. Email us directly at{" "}
                      <a href="mailto:protocol@mykei.io" className="underline">
                        protocol@mykei.io
                      </a>
                    </p>
                  )}

                  <p className="text-center font-mono text-xs text-muted-foreground">
                    All communications are encrypted and confidential.
                  </p>
                </form>
              </>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
