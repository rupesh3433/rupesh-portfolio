import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 50% 5%) 100%)",
      }}
    >
      {/* Ambient center glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Let's Build Something{" "}
            <span className="gradient-text">Real</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Serious projects only. I'm most useful when the problem is hard and
            the stakes are high.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-4xl mx-auto"
        >
          {/* Left — Links */}
          <div className="space-y-8 flex flex-col justify-center">
            <p className="text-muted-foreground leading-relaxed">
              Whether it's a complex distributed system, a product that needs
              rescuing, or a greenfield build with ambitious timelines — I'm
              interested.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "hello@example.dev", href: "mailto:hello@example.dev" },
                { icon: Github, label: "github.com/developer", href: "#" },
                { icon: Linkedin, label: "linkedin.com/in/developer", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <Icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_hsl(199_89%_56%_/_0.6)] transition-all duration-300" />
                  <span className="font-body">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto glow-sm">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-display font-semibold text-lg">
                    Message received.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: "name" as const, label: "Name", type: "text" },
                  { name: "email" as const, label: "Email", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm text-muted-foreground mb-2 font-display">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      value={form[field.name]}
                      onChange={(e) =>
                        setForm({ ...form, [field.name]: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                      placeholder={`Your ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 font-display">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
                    placeholder="Tell me about your project"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="px-8 py-4 rounded-lg font-display font-semibold text-primary-foreground bg-primary glow-sm transition-all duration-300 w-full"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 40px -5px hsl(199 89% 56% / 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
