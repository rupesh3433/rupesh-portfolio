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

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER HOOK
═══════════════════════════════════════════════════════════════ */
const TITLES = [
  "Full Stack Developer",
  "AI Enthusiast",
  "Creative Technologist",
  "Problem Solver",
  "Computer Engineer",
];

function useTypewriter(
  words: string[],
  typeMs = 68,
  deleteMs = 36,
  pauseMs = 1800
) {
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

/* ═══════════════════════════════════════════════════════════════
   STAGGERED 3-D LETTER
═══════════════════════════════════════════════════════════════ */
interface DepthLetterProps {
  char: string;
  delay: number;
  gradient?: boolean;
}

const DepthLetter = ({ char, delay, gradient = false }: DepthLetterProps) => (
  <motion.span
    className={`inline-block ${
      gradient ? "gradient-text glow-text" : "text-foreground"
    }`}
    initial={{ opacity: 0, y: 56, rotateX: -70, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
    transition={{ delay, duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: "bottom center" }}
  >
    {char === " " ? "\u00A0" : char}
  </motion.span>
);

/* ═══════════════════════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════════════════════ */
const Cursor = () => (
  <motion.span
    className="inline-block rounded-sm bg-primary align-middle ml-0.5 flex-shrink-0"
    style={{ width: 2, height: "1em" }}
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.9, repeat: Infinity, ease: "steps(1)" }}
    aria-hidden
  />
);

/* ═══════════════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════════════ */
interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
}

const Stat = ({ value, label, icon, delay, color }: StatProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.88 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -3, scale: 1.05 }}
    className="
      group relative flex flex-col items-center justify-center
      gap-1 cursor-default overflow-hidden
      rounded-2xl border
      bg-white/80 dark:bg-card/50
      border-slate-200/80 dark:border-border/40
      shadow-sm dark:shadow-none
      backdrop-blur-sm
      transition-all duration-300
    "
    style={{
      /* fluid padding — enough room on any screen */
      padding: "clamp(8px, 2vw, 14px) clamp(10px, 2.5vw, 20px)",
      flex: "1 1 0",
      minWidth: 0,
    }}
  >
    {/* Hover color wash */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
      style={{ background: `${color}12` }}
    />

    {/* Icon */}
    <div
      className="relative z-10 rounded-xl flex items-center justify-center transition-colors duration-300 flex-shrink-0"
      style={{
        background: `${color}1a`,
        color,
        width: "clamp(22px, 4vw, 30px)",
        height: "clamp(22px, 4vw, 30px)",
      }}
    >
      <span
        style={{
          fontSize: "clamp(10px, 2vw, 14px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </span>
    </div>

    {/* Value */}
    <span
      className="relative z-10 font-display font-black gradient-text leading-none"
      style={{ fontSize: "clamp(14px, 3vw, 22px)" }}
    >
      {value}
    </span>

    {/* Label */}
    <span
      className="relative z-10 text-muted-foreground font-semibold tracking-widest uppercase text-center leading-tight"
      style={{ fontSize: "clamp(7px, 1.5vw, 10px)" }}
    >
      {label}
    </span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   FLOATING BACKGROUND ORBS (decorative, non-interactive)
═══════════════════════════════════════════════════════════════ */
const BackgroundOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "clamp(180px, 40vw, 420px)",
        height: "clamp(180px, 40vw, 420px)",
        top: "-10%",
        left: "-8%",
        background:
          "radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{
        width: "clamp(120px, 25vw, 280px)",
        height: "clamp(120px, 25vw, 280px)",
        bottom: "10%",
        left: "30%",
        background:
          "radial-gradient(circle, hsl(var(--accent)/0.10) 0%, transparent 70%)",
        filter: "blur(32px)",
      }}
      animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   SKILL CHIPS
═══════════════════════════════════════════════════════════════ */
const SKILLS = ["React", "Next.js", "TypeScript", "Node.js", "Python", "AI/ML"];

const SkillChips = () => (
  <motion.div
    className="flex flex-wrap gap-1.5 sm:gap-2"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    {SKILLS.map((skill, i) => (
      <motion.span
        key={skill}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 1.05 + i * 0.055,
          duration: 0.38,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.08, y: -1 }}
        className="
          inline-flex items-center
          px-2.5 py-1 sm:px-3 sm:py-1.5
          rounded-full text-xs font-semibold
          border border-border/50 dark:border-border/30
          bg-muted/60 dark:bg-muted/20
          text-muted-foreground dark:text-muted-foreground/80
          hover:border-primary/40 hover:text-primary
          dark:hover:border-primary/30 dark:hover:text-primary
          hover:bg-primary/6 dark:hover:bg-primary/10
          transition-all duration-200 cursor-default
          backdrop-blur-sm
        "
      >
        {skill}
      </motion.span>
    ))}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN HeroTexts COMPONENT
═══════════════════════════════════════════════════════════════ */
const HeroTexts = () => {
  const typed = useTypewriter(TITLES);
  const fullName = "Rupesh Poudel";
  const firstName = "Rupesh";

  return (
    <div
      className="relative flex flex-col w-full max-w-xl mx-auto lg:mx-0"
      style={{ perspective: "900px" }}
    >
      {/* Background decoration */}
      <BackgroundOrbs />

      {/* ════ INNER STACK ════ */}
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* ── BADGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="self-start inline-flex items-center gap-2 rounded-full font-semibold tracking-widest uppercase border
            border-primary/30 dark:border-primary/20
            bg-primary/8 dark:bg-primary/10
            text-primary
            shadow-sm"
          style={{
            fontSize: "clamp(9px, 1.8vw, 11px)",
            padding: "clamp(5px, 1.2vw, 8px) clamp(10px, 2vw, 16px)",
          }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="flex-shrink-0"
          >
            <Sparkles
              style={{
                width: "clamp(10px, 2vw, 13px)",
                height: "clamp(10px, 2vw, 13px)",
              }}
            />
          </motion.span>
          Welcome to my portfolio
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>

        {/* ── NAME + ROLE ── */}
        <div className="space-y-2 sm:space-y-3">
          {/* "Hi, I'm" */}
          <motion.p
            className="font-medium text-muted-foreground tracking-wide"
            style={{ fontSize: "clamp(12px, 2.5vw, 16px)" }}
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.52 }}
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name — per-letter 3-D entrance */}
          <div
            className="font-display font-black leading-none tracking-tight overflow-visible"
            style={{
              fontSize: "clamp(2rem, 7vw, 3.8rem)",
              perspective: "800px",
              perspectiveOrigin: "left center",
            }}
          >
            {fullName.split("").map((ch, i) => (
              <DepthLetter
                key={i}
                char={ch}
                delay={0.15 + i * 0.034}
                gradient={i < firstName.length}
              />
            ))}
          </div>

          {/* Typewriter role */}
          <motion.div
            className="flex items-center gap-1 font-display font-bold text-primary"
            style={{
              fontSize: "clamp(0.9rem, 2.8vw, 1.55rem)",
              perspective: "600px",
              minHeight: "clamp(1.4rem, 3.5vw, 2rem)",
            }}
            initial={{ opacity: 0, y: 28, rotateX: -38 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 0.65,
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="text-accent/55 dark:text-accent/45 font-light select-none flex-shrink-0">
              {"{ "}
            </span>
            <span className="min-w-0 truncate">{typed}</span>
            <Cursor />
            <span className="text-accent/55 dark:text-accent/45 font-light select-none flex-shrink-0">
              {" }"}
            </span>
          </motion.div>
        </div>

        {/* ── DESCRIPTION ── */}
        <div className="space-y-0.5" style={{ perspective: "600px" }}>
          {[
            "Crafting high-performance digital experiences",
            "with cutting-edge technology. Turning complex",
            "problems into elegant, scalable solutions.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="leading-relaxed text-muted-foreground"
              style={{
                fontSize: "clamp(12px, 2.2vw, 15px)",
                transformOrigin: "left center",
              }}
              initial={{ opacity: 0, x: -34, rotateY: 13 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                delay: 0.8 + i * 0.085,
                duration: 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* ── SKILL CHIPS ── */}
        <SkillChips />

        {/* ── CTA BUTTONS ── */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.12, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary — View Projects */}
          <motion.a
            href="#projects"
            className="relative inline-flex items-center gap-2 rounded-xl font-display font-bold text-white overflow-hidden shadow-lg flex-shrink-0"
            style={{
              fontSize: "clamp(12px, 2.2vw, 15px)",
              padding: "clamp(9px, 2vw, 14px) clamp(18px, 3.5vw, 28px)",
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              boxShadow:
                "0 4px 22px -4px hsl(var(--primary)/0.45), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow:
                "0 8px 38px -6px hsl(var(--primary)/0.58), 0 1px 0 rgba(255,255,255,0.15) inset",
            }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 -skew-x-12 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
              }}
              initial={{ x: "-120%" }}
              whileHover={{ x: "220%" }}
              transition={{ duration: 0.52 }}
            />
            <span className="relative z-10 whitespace-nowrap">
              View Projects
            </span>
            <ArrowRight
              className="relative z-10 flex-shrink-0"
              style={{
                width: "clamp(13px, 2vw, 16px)",
                height: "clamp(13px, 2vw, 16px)",
              }}
            />
          </motion.a>

          {/* Secondary — Download CV */}
          <motion.a
            href="/resume.pdf"
            download
            className="
              relative inline-flex items-center gap-2 rounded-xl font-display font-bold
              border-2 text-primary
              border-primary/35 dark:border-primary/28
              bg-transparent
              hover:bg-primary/8 dark:hover:bg-primary/12
              hover:border-primary/65 dark:hover:border-primary/50
              transition-colors duration-200 overflow-hidden flex-shrink-0
            "
            style={{
              fontSize: "clamp(12px, 2.2vw, 15px)",
              padding: "clamp(9px, 2vw, 14px) clamp(16px, 3vw, 26px)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download
              className="flex-shrink-0"
              style={{
                width: "clamp(13px, 2vw, 16px)",
                height: "clamp(13px, 2vw, 16px)",
              }}
            />
            <span className="whitespace-nowrap">Download CV</span>
          </motion.a>

          {/* Tertiary — Contact */}
          <motion.a
            href="#contact"
            className="
              hidden sm:inline-flex items-center gap-1.5 rounded-xl font-semibold
              text-muted-foreground
              hover:text-foreground
              border border-border/55 dark:border-border/35
              bg-white/60 dark:bg-card/30
              hover:bg-slate-50 dark:hover:bg-muted/20
              hover:border-border dark:hover:border-border/60
              transition-all duration-200 backdrop-blur-sm flex-shrink-0
            "
            style={{
              fontSize: "clamp(11px, 1.8vw, 13px)",
              padding: "clamp(9px, 2vw, 14px) clamp(12px, 2vw, 16px)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <ExternalLink
              style={{
                width: "clamp(12px, 1.8vw, 14px)",
                height: "clamp(12px, 1.8vw, 14px)",
              }}
            />
            Contact
          </motion.a>
        </motion.div>

        {/* ── STATS — single row, always, fluid sizes ── */}
        <motion.div
          className="flex gap-2 sm:gap-3 w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Stat
            value="20+"
            label="Projects"
            icon={
              <Layers
                style={{
                  width: "clamp(10px, 2vw, 14px)",
                  height: "clamp(10px, 2vw, 14px)",
                }}
              />
            }
            delay={1.4}
            color="hsl(var(--primary))"
          />
          <Stat
            value="3+"
            label="Years Exp."
            icon={
              <Code2
                style={{
                  width: "clamp(10px, 2vw, 14px)",
                  height: "clamp(10px, 2vw, 14px)",
                }}
              />
            }
            delay={1.5}
            color="hsl(var(--accent))"
          />
          <Stat
            value="15+"
            label="Technologies"
            icon={
              <Cpu
                style={{
                  width: "clamp(10px, 2vw, 14px)",
                  height: "clamp(10px, 2vw, 14px)",
                }}
              />
            }
            delay={1.6}
            color="#a78bfa"
          />
        </motion.div>

        {/* ── AVAILABILITY PILL ── */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.78, duration: 0.48 }}
          className="
            self-start flex items-center gap-2.5
            px-3 py-2 sm:px-4 sm:py-2.5
            rounded-full
            border border-emerald-200/70 dark:border-emerald-900/50
            bg-emerald-50/80 dark:bg-emerald-950/30
            backdrop-blur-sm
          "
        >
          {/* Pulsing dot */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-65" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p
            className="font-medium text-emerald-700 dark:text-emerald-400 whitespace-nowrap"
            style={{ fontSize: "clamp(10px, 1.8vw, 12px)" }}
          >
            Available for freelance &amp; full-time roles
          </p>
        </motion.div>
      </div>
      {/* end inner stack */}
    </div>
  );
};

export default HeroTexts;
