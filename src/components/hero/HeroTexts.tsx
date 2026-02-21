import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Sparkles,
  Code2,
  Layers,
  Cpu,
  ExternalLink,
} from "lucide-react";

/* ════════════════════════════════════════
   TYPEWRITER HOOK
════════════════════════════════════════ */
const TITLES = [
  "Full Stack Developer",
  "AI Enthusiast",
  "Creative Technologist",
  "Problem Solver",
  "Computer Engineer",
];

function useTypewriter(words: string[], typeMs = 68, deleteMs = 36, pauseMs = 1800) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (!del && text === word) {
      timer = setTimeout(() => setDel(true), pauseMs);
    } else if (del && text === "") {
      setDel(false);
      setIdx((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (del ? -1 : 1))),
        del ? deleteMs : typeMs
      );
    }
    return () => clearTimeout(timer);
  }, [text, idx, del, words, typeMs, deleteMs, pauseMs]);

  return text;
}

/* ════════════════════════════════════════
   3-D LETTER
════════════════════════════════════════ */
const DepthLetter = ({ char, delay, gradient = false }: { char: string; delay: number; gradient?: boolean }) => (
  <motion.span
    className={`inline-block ${gradient ? "gradient-text glow-text" : "text-foreground"}`}
    initial={{ opacity: 0, y: 36, rotateX: -55, filter: "blur(5px)" }}
    animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: "bottom center" }}
  >
    {char === " " ? "\u00A0" : char}
  </motion.span>
);

/* ════════════════════════════════════════
   CURSOR
════════════════════════════════════════ */
const Cursor = () => (
  <motion.span
    className="inline-block rounded-sm bg-primary align-middle ml-0.5 flex-shrink-0"
    style={{ width: 2, height: "1em" }}
    animate={{ opacity: [1, 1, 0, 0] }}
    transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.49, 0.5, 1] }}
    aria-hidden
  />
);

/* ════════════════════════════════════════
   STAT CARD — smaller on mobile
════════════════════════════════════════ */
const Stat = ({ value, label, icon, delay, color }: { value: string; label: string; icon: React.ReactNode; delay: number; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, scale: 0.88 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -2, scale: 1.04 }}
    className="
      group relative flex flex-col items-center justify-center
      cursor-default overflow-hidden
      rounded-xl border
      bg-white/80 dark:bg-card/50
      border-slate-200/70 dark:border-border/35
      shadow-sm dark:shadow-none
      backdrop-blur-sm
      transition-all duration-300
    "
    style={{
      /* Mobile: tight padding; desktop: comfortable */
      padding: "clamp(5px, 1.2vw, 12px) clamp(4px, 1vw, 14px)",
      gap: "clamp(2px, 0.6vw, 6px)",
      flex: "1 1 0",
      minWidth: 0,
    }}
  >
    {/* Hover tint */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: `${color}10`, borderRadius: "inherit" }}
    />

    {/* Icon */}
    <div
      className="relative z-10 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{
        background: `${color}1a`,
        color,
        width: "clamp(16px, 3vw, 26px)",
        height: "clamp(16px, 3vw, 26px)",
      }}
    >
      <span style={{ fontSize: "clamp(8px, 1.6vw, 12px)", display: "flex" }}>{icon}</span>
    </div>

    {/* Value */}
    <span
      className="relative z-10 font-display font-black gradient-text leading-none"
      style={{ fontSize: "clamp(11px, 2.4vw, 20px)" }}
    >
      {value}
    </span>

    {/* Label */}
    <span
      className="relative z-10 text-muted-foreground font-semibold tracking-widest uppercase text-center leading-tight"
      style={{ fontSize: "clamp(5px, 1vw, 9px)" }}
    >
      {label}
    </span>
  </motion.div>
);

/* ════════════════════════════════════════
   BACKGROUND ORBS — enhanced for both themes
════════════════════════════════════════ */
const BackgroundOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "clamp(180px, 40vw, 420px)",
        height: "clamp(180px, 40vw, 420px)",
        top: "-15%", left: "-10%",
        background: "radial-gradient(circle, hsl(var(--primary)/0.14) 0%, transparent 68%)",
        filter: "blur(50px)",
      }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "clamp(120px, 25vw, 280px)",
        height: "clamp(120px, 25vw, 280px)",
        bottom: "5%", left: "25%",
        background: "radial-gradient(circle, hsl(var(--accent)/0.11) 0%, transparent 68%)",
        filter: "blur(38px)",
      }}
      animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
    {/* Light-mode extra warmth orb */}
    <motion.div
      className="absolute rounded-full dark:opacity-0"
      style={{
        width: "clamp(100px, 20vw, 220px)",
        height: "clamp(100px, 20vw, 220px)",
        top: "40%", right: "-5%",
        background: "radial-gradient(circle, hsl(var(--primary)/0.07) 0%, transparent 70%)",
        filter: "blur(30px)",
      }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
  </div>
);

/* ════════════════════════════════════════
   SKILL CHIPS
════════════════════════════════════════ */
const SKILLS = ["React", "Next.js", "TypeScript", "Node.js", "Python", "AI/ML"];

const SkillChips = () => (
  <motion.div
    className="flex flex-wrap gap-1 sm:gap-1.5"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.95, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    {SKILLS.map((skill, i) => (
      <motion.span
        key={skill}
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 + i * 0.05, duration: 0.32 }}
        whileHover={{ scale: 1.06, y: -1 }}
        className="
          inline-flex items-center
          px-2 py-0.5 sm:px-2.5 sm:py-1
          rounded-full font-semibold
          border border-border/50 dark:border-border/25
          bg-white/70 dark:bg-muted/20
          text-muted-foreground
          hover:border-primary/45 hover:text-primary hover:bg-primary/5
          dark:hover:border-primary/30 dark:hover:text-primary dark:hover:bg-primary/10
          transition-all duration-200 cursor-default backdrop-blur-sm
        "
        style={{ fontSize: "clamp(9px, 1.5vw, 12px)" }}
      >
        {skill}
      </motion.span>
    ))}
  </motion.div>
);

/* ════════════════════════════════════════
   HERO TEXTS — MAIN
════════════════════════════════════════ */
const HeroTexts = () => {
  const typed = useTypewriter(TITLES);
  const fullName = "Rupesh Poudel";
  const firstName = "Rupesh";

  return (
    <div
      className="relative flex flex-col w-full max-w-xl mx-auto lg:mx-0"
      style={{ perspective: "900px" }}
    >
      <BackgroundOrbs />

      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">

        {/* ── BADGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="
            self-center lg:self-start inline-flex items-center gap-1.5 rounded-full font-semibold
            tracking-widest uppercase border shadow-sm
            border-primary/30 dark:border-primary/20
            bg-primary/6 dark:bg-primary/10
            text-primary
          "
          style={{
            fontSize: "clamp(8px, 1.4vw, 10px)",
            padding: "clamp(4px, 0.9vw, 7px) clamp(9px, 1.7vw, 14px)",
            /* light mode: subtle glass */
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="flex-shrink-0"
          >
            <Sparkles style={{ width: "clamp(9px, 1.5vw, 12px)", height: "clamp(9px, 1.5vw, 12px)" }} />
          </motion.span>
          Welcome to my portfolio
          <motion.span
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary flex-shrink-0"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>

        {/* ── NAME ── */}
        <div className="space-y-1 sm:space-y-2">
          <motion.p
            className="font-medium text-muted-foreground tracking-wide text-center lg:text-left"
            style={{ fontSize: "clamp(11px, 1.8vw, 14px)" }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.46 }}
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name letters — BIGGER on mobile */}
          <div
            className="font-display font-black leading-none tracking-tight overflow-visible text-center lg:text-left"
            style={{
              /* 2.4rem on phones → scales to 3.6rem on desktop */
              fontSize: "clamp(2.4rem, 7vw, 3.6rem)",
              perspective: "800px",
              perspectiveOrigin: "left center",
            }}
          >
            {fullName.split("").map((ch, i) => (
              <DepthLetter
                key={i}
                char={ch}
                delay={0.14 + i * 0.028}
                gradient={i < firstName.length}
              />
            ))}
          </div>

          {/* Typewriter */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-1 font-display font-bold text-primary"
            style={{
              fontSize: "clamp(0.82rem, 2.4vw, 1.4rem)",
              perspective: "600px",
              minHeight: "clamp(1.2rem, 3vw, 1.8rem)",
            }}
            initial={{ opacity: 0, y: 20, rotateX: -28 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.6, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent/50 dark:text-accent/40 font-light select-none flex-shrink-0">{"{ "}</span>
            <span className="min-w-0 truncate">{typed}</span>
            <Cursor />
            <span className="text-accent/50 dark:text-accent/40 font-light select-none flex-shrink-0">{" }"}</span>
          </motion.div>
        </div>

        {/* ── DESCRIPTION ── */}
        <div className="space-y-0" style={{ perspective: "600px" }}>
          {[
            "Crafting high-performance digital experiences",
            "with cutting-edge technology. Turning complex",
            "problems into elegant, scalable solutions.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="leading-relaxed text-muted-foreground text-center lg:text-left"
              style={{ fontSize: "clamp(10px, 1.75vw, 14px)", transformOrigin: "left center" }}
              initial={{ opacity: 0, x: -24, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.74 + i * 0.07, duration: 0.54, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* ── SKILL CHIPS ── */}
        <div className="flex justify-center lg:justify-start">
          <SkillChips />
        </div>

        {/* ── CTA BUTTONS — unchanged ── */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary */}
          <motion.a
            href="#projects"
            className="relative inline-flex items-center gap-1.5 rounded-xl font-display font-bold text-white overflow-hidden shadow-lg flex-shrink-0"
            style={{
              fontSize: "clamp(11px, 1.9vw, 14px)",
              padding: "clamp(8px, 1.6vw, 12px) clamp(14px, 2.8vw, 24px)",
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              boxShadow: "0 4px 20px -4px hsl(var(--primary)/0.42), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px -6px hsl(var(--primary)/0.55), 0 1px 0 rgba(255,255,255,0.15) inset" }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              className="absolute inset-0 -skew-x-12 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }}
              initial={{ x: "-120%" }}
              whileHover={{ x: "220%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 whitespace-nowrap">View Projects</span>
            <ArrowRight className="relative z-10 flex-shrink-0" style={{ width: "clamp(12px, 1.8vw, 15px)", height: "clamp(12px, 1.8vw, 15px)" }} />
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="/resume.pdf"
            download
            className="
              relative inline-flex items-center gap-1.5 rounded-xl font-display font-bold
              border-2 text-primary
              border-primary/35 dark:border-primary/28
              bg-transparent
              hover:bg-primary/8 dark:hover:bg-primary/12
              hover:border-primary/65 dark:hover:border-primary/50
              transition-colors duration-200 overflow-hidden flex-shrink-0
            "
            style={{
              fontSize: "clamp(11px, 1.9vw, 14px)",
              padding: "clamp(8px, 1.6vw, 12px) clamp(12px, 2.4vw, 22px)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download className="flex-shrink-0" style={{ width: "clamp(11px, 1.8vw, 14px)", height: "clamp(11px, 1.8vw, 14px)" }} />
            <span className="whitespace-nowrap">Download CV</span>
          </motion.a>

          {/* Tertiary */}
          <motion.a
            href="#contact"
            className="
              hidden sm:inline-flex items-center gap-1.5 rounded-xl font-semibold
              text-muted-foreground hover:text-foreground
              border border-border/55 dark:border-border/35
              bg-white/60 dark:bg-card/30
              hover:bg-slate-50 dark:hover:bg-muted/20
              hover:border-border dark:hover:border-border/60
              transition-all duration-200 backdrop-blur-sm flex-shrink-0
            "
            style={{
              fontSize: "clamp(10px, 1.6vw, 13px)",
              padding: "clamp(8px, 1.6vw, 12px) clamp(10px, 1.8vw, 14px)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <ExternalLink style={{ width: "clamp(11px, 1.6vw, 13px)", height: "clamp(11px, 1.6vw, 13px)" }} />
            Contact
          </motion.a>
        </motion.div>

        {/* ── STATS — compact on mobile ── */}
        <motion.div
          className="flex gap-1.5 sm:gap-2 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Stat value="20+" label="Projects"     icon={<Layers style={{ width: "clamp(8px, 1.5vw, 12px)", height: "clamp(8px, 1.5vw, 12px)" }} />} delay={1.32} color="hsl(var(--primary))" />
          <Stat value="3+"  label="Years Exp."   icon={<Code2  style={{ width: "clamp(8px, 1.5vw, 12px)", height: "clamp(8px, 1.5vw, 12px)" }} />} delay={1.42} color="hsl(var(--accent))"   />
          <Stat value="15+" label="Technologies" icon={<Cpu   style={{ width: "clamp(8px, 1.5vw, 12px)", height: "clamp(8px, 1.5vw, 12px)" }} />} delay={1.52} color="#a78bfa"               />
        </motion.div>

        {/* ── AVAILABILITY PILL ── */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.68, duration: 0.42 }}
          className="
            self-center lg:self-start flex items-center gap-2 rounded-full
            border border-emerald-200/70 dark:border-emerald-900/50
            bg-emerald-50/80 dark:bg-emerald-950/30
            backdrop-blur-sm
          "
          style={{ padding: "clamp(5px, 1vw, 8px) clamp(10px, 2vw, 14px)" }}
        >
          <span className="relative flex flex-shrink-0" style={{ width: 7, height: 7 }}>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-65" />
            <span className="relative inline-flex rounded-full bg-emerald-500" style={{ width: 7, height: 7 }} />
          </span>
          <p
            className="font-medium text-emerald-700 dark:text-emerald-400 whitespace-nowrap"
            style={{ fontSize: "clamp(9px, 1.5vw, 11px)" }}
          >
            Available for freelance &amp; full-time roles
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroTexts;