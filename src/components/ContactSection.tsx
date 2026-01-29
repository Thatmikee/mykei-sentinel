import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  organization: z.string().trim().min(1, "Organization is required").max(200, "Organization must be less than 200 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Form is valid
    setIsSubmitted(true);
    setErrors({});
  };

  const inputClasses =
    "w-full px-4 py-3 bg-secondary border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

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

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative glow-border rounded-lg overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-primary/30" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/30" />

            <div className="p-8 md:p-12">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Request Received</h3>
                  <p className="text-muted-foreground font-mono text-sm">
                    Your inquiry has been logged. Expect a response within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-xs text-muted-foreground tracking-wider mb-2">
                      NAME
                    </label>
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

                  {/* Organization */}
                  <div>
                    <label className="block font-mono text-xs text-muted-foreground tracking-wider mb-2">
                      ORGANIZATION
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Company or organization name"
                    />
                    {errors.organization && (
                      <p className="mt-1 font-mono text-xs text-destructive">{errors.organization}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-xs text-muted-foreground tracking-wider mb-2">
                      EMAIL
                    </label>
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

                  {/* Message */}
                  <div>
                    <label className="block font-mono text-xs text-muted-foreground tracking-wider mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      placeholder="Describe your security requirements..."
                    />
                    {errors.message && (
                      <p className="mt-1 font-mono text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    Submit Request
                  </button>

                  <p className="text-center font-mono text-xs text-muted-foreground">
                    All communications are encrypted and confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
