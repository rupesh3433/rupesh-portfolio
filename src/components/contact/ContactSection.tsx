import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContactBackground from "./ContactBackground";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

/* ── Section heading ── */
const SectionHeading = () => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    className="text-center space-y-3"
  >
    {/* Badge */}
    <motion.div
      className="inline-flex items-center gap-2 rounded-full border font-semibold"
      style={{
        fontSize: "clamp(9px,1.4vw,10.5px)",
        padding: "clamp(5px,1vw,7px) clamp(12px,2vw,18px)",
        borderColor: "hsl(var(--primary)/0.32)",
        background: "hsl(var(--primary)/0.07)",
        color: "hsl(var(--primary))",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.45 }}
    >
      <motion.span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "hsl(var(--primary))",
          display: "inline-block",
          flexShrink: 0,
        }}
        animate={{ scale: [1, 1.55, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      Ready to Connect
    </motion.div>

    {/* Main heading */}
    <h2
      style={{
        fontSize: "clamp(1.9rem,5.5vw,3.6rem)",
        fontWeight: 900,
        letterSpacing: "-0.025em",
        lineHeight: 1.08,
        color: "hsl(var(--foreground))",
      }}
    >
      Let&apos;s{" "}
      <span
        className="gradient-text"
        style={{ position: "relative", display: "inline-block" }}
      >
        Talk
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            bottom: -3,
            left: 0,
            height: 3,
            borderRadius: 3,
            background:
              "linear-gradient(90deg,hsl(var(--primary)),hsl(var(--accent)))",
          }}
          initial={{ scaleX: 0, originX: "left" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        />
      </span>
    </h2>

    {/* Subtext */}
    <p
      style={{
        fontSize: "clamp(12px,1.8vw,15px)",
        color: "hsl(var(--muted-foreground)/0.7)",
        maxWidth: 460,
        margin: "0 auto",
        lineHeight: 1.6,
      }}
    >
      Got a project, a question, or just want to say hi?
      <br className="hidden sm:block" />
      Reach out — I reply fast.
    </p>

    {/* Decorative divider */}
    <div className="flex items-center justify-center gap-2 pt-1">
      <div
        style={{ width: 52, height: 1, background: "hsl(var(--primary)/0.22)" }}
      />
      <span style={{ color: "hsl(var(--primary)/0.45)", fontSize: 11 }}>◆</span>
      <div
        style={{ width: 52, height: 1, background: "hsl(var(--primary)/0.22)" }}
      />
    </div>
  </motion.div>
);

/* ── Live status bar ── */
const StatusBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.35 }}
    className="flex items-center justify-center gap-5 sm:gap-8 flex-wrap"
  >
    {[
      { label: "Status", value: "Online", color: "#22c55e" },
      { label: "Response", value: "< 24 hrs", color: "hsl(var(--primary))" },
      { label: "Availability", value: "Open", color: "#a78bfa" },
    ].map(({ label, value, color }) => (
      <div key={label} className="flex items-center gap-2">
        <motion.span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            display: "inline-block",
            flexShrink: 0,
          }}
          animate={{ opacity: [1, 0.28, 1] }}
          transition={{ duration: 1.9, repeat: Infinity, delay: Math.random() }}
        />
        <span
          style={{
            fontSize: "clamp(10px,1.4vw,11.5px)",
            color: "hsl(var(--muted-foreground)/0.5)",
            fontWeight: 500,
          }}
        >
          {label}:
        </span>
        <span
          style={{
            fontSize: "clamp(10px,1.4vw,11.5px)",
            color,
            fontWeight: 700,
          }}
        >
          {value}
        </span>
      </div>
    ))}
  </motion.div>
);

/* ── Info panel wrapper — subtle HUD glass ── */
const InfoPanel = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: "relative",
      borderRadius: 18,
      overflow: "hidden",
      background: "hsl(var(--card)/0.52)",
      border: "1px solid hsl(var(--border)/0.42)",
      backdropFilter: "blur(20px)",
      boxShadow:
        "0 6px 36px hsl(var(--primary)/0.05), inset 0 1px 0 hsl(var(--primary)/0.07)",
    }}
  >
    {/* Top accent line */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: "12%",
        right: "12%",
        height: 1,
        background:
          "linear-gradient(90deg,transparent,hsl(var(--primary)/0.42),hsl(var(--accent)/0.32),transparent)",
      }}
    />
    {/* Corner brackets */}
    {(["tl", "tr", "bl", "br"] as const).map((c, i) => (
      <div
        key={c}
        aria-hidden
        style={{
          position: "absolute",
          top: i < 2 ? 8 : "auto",
          bottom: i >= 2 ? 8 : "auto",
          left: i % 2 === 0 ? 8 : "auto",
          right: i % 2 === 1 ? 8 : "auto",
          width: 18,
          height: 18,
          borderTop: i < 2 ? "1px solid hsl(var(--primary)/0.35)" : "none",
          borderBottom: i >= 2 ? "1px solid hsl(var(--primary)/0.35)" : "none",
          borderLeft:
            i % 2 === 0 ? "1px solid hsl(var(--primary)/0.35)" : "none",
          borderRight:
            i % 2 === 1 ? "1px solid hsl(var(--primary)/0.35)" : "none",
          pointerEvents: "none",
        }}
      />
    ))}
    <div
      style={{
        padding: "clamp(20px,3.5vw,28px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </div>
  </motion.div>
);

/* ════════════════════════════════════════
   MAIN ContactSection
════════════════════════════════════════ */
const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Animated background */}
      <ContactBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 relative z-10 space-y-10 sm:space-y-12">
        {/* Heading */}
        <SectionHeading />

        {/* Status bar */}
        <StatusBar />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Info panel — 2/5 on desktop, below form on mobile */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <InfoPanel>
              <ContactInfo />
            </InfoPanel>
          </div>

          {/* Form — 3/5 on desktop, first on mobile */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>

        {/* Bottom footer label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3"
        >
          <div
            style={{
              flex: 1,
              maxWidth: 100,
              height: 1,
              background: "hsl(var(--border)/0.28)",
            }}
          />
          <p
            style={{
              fontSize: "clamp(9px,1.2vw,10px)",
              color: "hsl(var(--muted-foreground)/0.3)",
              fontWeight: 500,
              letterSpacing: "0.06em",
            }}
          >
            All messages are handled personally
          </p>
          <div
            style={{
              flex: 1,
              maxWidth: 100,
              height: 1,
              background: "hsl(var(--border)/0.28)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
