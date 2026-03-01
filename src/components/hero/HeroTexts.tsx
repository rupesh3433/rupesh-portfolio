import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Sparkles,
} from "lucide-react";
import resumeFile from "@/assets/resumeRupesh2026.pdf";

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

/* ════════════════════════════════════════
   LETTER
════════════════════════════════════════ */
const DepthLetter = ({
  char,
  delay,
  gradient = false,
}: {
  char: string;
  delay: number;
  gradient?: boolean;
}) => (
  <motion.span
    className={`inline-block ${gradient ? "gradient-text glow-text" : "text-foreground"}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
    transition={{
      duration: 0.9,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.49, 0.5, 1],
    }}
    aria-hidden
  />
);

/* ════════════════════════════════════════
   BACKGROUND ORBS
════════════════════════════════════════ */
const BackgroundOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
    <div
      className="absolute rounded-full orb-pulse-1"
      style={{
        width: "clamp(180px, 38vw, 400px)",
        height: "clamp(180px, 38vw, 400px)",
        top: "-15%",
        left: "-10%",
        background: "radial-gradient(circle, hsl(var(--primary)/0.13) 0%, transparent 70%)",
        filter: "blur(48px)",
      }}
    />
    <div
      className="absolute rounded-full orb-pulse-2"
      style={{
        width: "clamp(100px, 22vw, 260px)",
        height: "clamp(100px, 22vw, 260px)",
        bottom: "5%",
        left: "25%",
        background: "radial-gradient(circle, hsl(var(--accent)/0.10) 0%, transparent 70%)",
        filter: "blur(36px)",
      }}
    />
    <style>{`
      @keyframes orbPulse1 {
        0%, 100% { opacity: 0.75; transform: scale(1); }
        50%       { opacity: 1;    transform: scale(1.07); }
      }
      @keyframes orbPulse2 {
        0%, 100% { opacity: 0.5;  transform: scale(1); }
        50%       { opacity: 0.85; transform: scale(1.11); }
      }
      .orb-pulse-1 { animation: orbPulse1 6s ease-in-out infinite; }
      .orb-pulse-2 { animation: orbPulse2 8s ease-in-out infinite 2s; }
    `}</style>
  </div>
);

import SocialLinks from "@/components/shared/SocialLinks";

/* ════════════════════════════════════════
   HERO TEXTS — MAIN
════════════════════════════════════════ */
const HeroTexts = () => {
  const typed = useTypewriter(TITLES);
  const fullName = "Rupesh Poudel";
  const firstName = "Rupesh";

  return (
    <div className="relative flex flex-col w-full max-w-xl mx-auto lg:mx-0">
      <BackgroundOrbs />

      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-3.5">

        {/* ── BADGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="
            self-center lg:self-start inline-flex items-center gap-1.5 rounded-full
            font-semibold tracking-widest uppercase border shadow-sm
            border-primary/40 bg-primary/8 text-primary
            dark:border-primary/25 dark:bg-primary/12
            backdrop-blur-sm
          "
          style={{
            fontSize: "clamp(8px, 1.4vw, 10px)",
            padding: "clamp(4px, 0.9vw, 7px) clamp(9px, 1.7vw, 14px)",
          }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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
        <div className="space-y-0.5 sm:space-y-1">
          <motion.p
            className="font-medium tracking-wide text-center lg:text-left text-slate-500 dark:text-muted-foreground"
            style={{ fontSize: "clamp(11px, 1.8vw, 14px)" }}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Hi, I&apos;m
          </motion.p>

          <div
            className="font-display font-black leading-none tracking-tight overflow-visible text-center lg:text-left"
            style={{ fontSize: "clamp(2.4rem, 7vw, 3.6rem)" }}
          >
            {fullName.split("").map((ch, i) => (
              <DepthLetter
                key={i}
                char={ch}
                delay={0.14 + i * 0.026}
                gradient={i < firstName.length}
              />
            ))}
          </div>

          {/* Typewriter */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-1 font-display font-bold text-primary"
            style={{
              fontSize: "clamp(0.82rem, 2.4vw, 1.4rem)",
              minHeight: "clamp(1.2rem, 3vw, 1.8rem)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-slate-400 dark:text-slate-500 font-light select-none flex-shrink-0">{"{ "}</span>
            <span className="min-w-0 truncate">{typed}</span>
            <Cursor />
            <span className="text-slate-400 dark:text-slate-500 font-light select-none flex-shrink-0">{" }"}</span>
          </motion.div>
        </div>

        {/* ── DESCRIPTION ── */}
        <div className="space-y-0">
          {[
            "Crafting high-performance digital experiences",
            "with cutting-edge technology. Turning complex",
            "problems into elegant, scalable solutions.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="leading-relaxed text-center lg:text-left text-slate-600 dark:text-muted-foreground"
              style={{ fontSize: "clamp(10px, 1.75vw, 14px)" }}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.68 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* ── STATS — compact single row ── */}
        <motion.div
          className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.82, duration: 0.45 }}
        >
          {[
            { value: "20+", label: "Projects" },
            { value: "3+",  label: "Years Exp." },
            { value: "15+", label: "Technologies" },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.86 + i * 0.08, duration: 0.4 }}
            >
              <span className="font-display font-black gradient-text leading-none text-sm sm:text-base">
                {value}
              </span>
              <span className="font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 text-[9px] sm:text-[10px]">
                {label}
              </span>
              {i < 2 && (
                <span className="ml-2 sm:ml-3 h-3 w-px bg-slate-300 dark:bg-slate-700" aria-hidden />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ── SOCIAL LINKS ── */}
        <motion.div
          className="flex justify-center lg:justify-start"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.45 }}
        >
          <SocialLinks />
        </motion.div>

        {/* ── CTA BUTTONS ── */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary — View Projects */}
          <motion.a
            href="#projects"
            className="relative inline-flex items-center gap-1.5 rounded-xl font-display font-bold text-white overflow-hidden shadow-md flex-shrink-0"
            style={{
              fontSize: "clamp(11px, 1.9vw, 14px)",
              padding: "clamp(8px, 1.6vw, 12px) clamp(14px, 2.8vw, 24px)",
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              boxShadow: "0 4px 18px -4px hsl(var(--primary)/0.4)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              className="absolute inset-0 pointer-events-none shimmer-effect"
              style={{ borderRadius: "inherit" }}
            />
            <style>{`
              .shimmer-effect {
                background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
                background-size: 200% 100%;
                background-position: -100% 0;
              }
              a:hover .shimmer-effect {
                background-position: 200% 0;
                transition: background-position 0.45s ease;
              }
            `}</style>
            <span className="relative z-10 whitespace-nowrap">View Projects</span>
            <ArrowRight
              className="relative z-10 flex-shrink-0"
              style={{ width: "clamp(12px, 1.8vw, 15px)", height: "clamp(12px, 1.8vw, 15px)" }}
            />
          </motion.a>

          {/* Secondary — Resume */}
          <motion.a
            href={resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative inline-flex items-center gap-1.5 rounded-xl font-display font-bold
              border-2 text-primary
              border-primary/50 bg-white/90
              hover:bg-primary/6 hover:border-primary/70
              dark:border-primary/30 dark:bg-transparent
              dark:hover:bg-primary/12 dark:hover:border-primary/50
              transition-colors duration-200 flex-shrink-0
            "
            style={{
              fontSize: "clamp(11px, 1.9vw, 14px)",
              padding: "clamp(8px, 1.6vw, 12px) clamp(12px, 2.4vw, 22px)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download
              className="flex-shrink-0"
              style={{ width: "clamp(11px, 1.8vw, 14px)", height: "clamp(11px, 1.8vw, 14px)" }}
            />
            <span className="whitespace-nowrap">View Resume</span>
          </motion.a>

          {/* Research Paper */}
          <motion.a
            href="https://thegrenze.com/index.php?display=page&view=journalabstract&absid=6813&id=8"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden sm:inline-flex items-center gap-1.5 rounded-xl font-semibold
              text-indigo-700 border border-indigo-300 bg-indigo-50
              hover:bg-indigo-100 hover:border-indigo-400
              dark:text-indigo-400 dark:border-indigo-500/30 dark:bg-indigo-900/20
              dark:hover:bg-indigo-900/40 dark:hover:border-indigo-400
              transition-all duration-200 backdrop-blur-sm flex-shrink-0
            "
            style={{
              fontSize: "clamp(10px, 1.6vw, 13px)",
              padding: "clamp(8px, 1.6vw, 12px) clamp(10px, 1.8vw, 14px)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            📄 Research Paper
          </motion.a>
        </motion.div>

        {/* ── AVAILABILITY PILL ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.38 }}
          className="
            self-center lg:self-start flex items-center gap-2 rounded-full
            border border-emerald-300 bg-emerald-50
            dark:border-emerald-800/60 dark:bg-emerald-950/30
            backdrop-blur-sm
          "
          style={{ padding: "clamp(5px, 1vw, 8px) clamp(10px, 2vw, 14px)" }}
        >
          <span className="relative flex flex-shrink-0" style={{ width: 7, height: 7 }}>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-65" />
            <span className="relative inline-flex rounded-full bg-emerald-500" style={{ width: 7, height: 7 }} />
          </span>
          <p
            className="font-medium whitespace-nowrap text-emerald-800 dark:text-emerald-400"
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