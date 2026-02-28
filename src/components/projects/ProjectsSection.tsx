import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  ExternalLink, Github, FileText, ArrowUpRight,
  Layers, Cpu, Bot, BookOpen, ChevronLeft, ChevronRight,
} from "lucide-react";

import splitBroImg     from "@/assets/project-billsplitter.png";
import logAnalyzerImg  from "@/assets/project-apacheloganalyzer.png";
import sharmaChiragImg from "@/assets/project-sharmachirag.png";

/* ── Same ease pattern as Navbar (no TS error) ── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ══════════════════════════════════
   TYPES
══════════════════════════════════ */
interface PLink { label: string; href: string; icon: React.ReactNode; style: string }
interface Project {
  id: number; title: string; year: string;
  category: string; icon: React.ReactNode;
  description: string; bullets: string[];
  image: string; tags: string[];
  links: PLink[]; accent: string;
  imagePos: "left" | "right";
}

/* ══════════════════════════════════
   DATA
══════════════════════════════════ */
const PROJECTS: Project[] = [
  {
    id: 1, title: "SplitBro", year: "2025",
    category: "Full Stack Web App", icon: <Layers size={13} />,
    description: "Group expense manager with real-time debt resolution, Google OAuth, dynamic charts, and AWS DynamoDB.",
    bullets: [
      "Google OAuth secure auth + group creation & expense tracking.",
      "Notification system & dynamic charts for live financial insights.",
      "AWS DynamoDB for scalable storage; Tailwind + shadcn/ui.",
      "Flask + Express hybrid backend deployed on Render + Vercel.",
    ],
    image: splitBroImg,
    tags: ["React", "Flask", "Python", "AWS DynamoDB", "Tailwind"],
    accent: "#6366f1", imagePos: "right",
    links: [{
      label: "Live Demo", href: "https://splitbro.vercel.app",
      icon: <ExternalLink size={10} />,
      style: "bg-[#6366f1] text-white hover:bg-[#4f46e5]",
    }],
  },
  {
    id: 2, title: "Log Analyzer", year: "2024",
    category: "AI · Data Engineering", icon: <Cpu size={13} />,
    description: "Parse, visualize, and detect anomalies in 1 crore+ server logs. Backed by a peer-reviewed published paper.",
    bullets: [
      ".log → .csv conversion, malicious request detection, pattern recognition.",
      "Regex + pandas + clustering to analyze massive log datasets.",
      "Flask API + React frontend for real-time visualization.",
      "Research formally published — see paper link.",
    ],
    image: logAnalyzerImg,
    tags: ["Python", "Flask", "React", "Pandas", "Tailwind"],
    accent: "#10b981", imagePos: "left",
    links: [
      { label: "Live Demo", href: "https://apache-log-parser.vercel.app/",   icon: <ExternalLink size={10} />, style: "bg-[#10b981] text-white hover:bg-[#059669]" },
      { label: "GitHub",    href: "https://github.com/rupesh3433/ApacheLogParser_backend_blueprint", icon: <Github size={10} />, style: "border border-[#10b981]/50 text-[#10b981] hover:bg-[#10b981]/10" },
      { label: "Paper",     href: "https://thegrenze.com/index.php?display=page&view=journalabstract&absid=6813&id=8", icon: <FileText size={10} />, style: "border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" },
    ],
  },
  {
    id: 3, title: "SharmaChirag Agent", year: "2025",
    category: "⭐ Sponsor · Agentic AI", icon: <Bot size={13} />,
    description: "Production AI agent for a real makeup artist. Groq LLM + KB, conversational booking, payment gateway & OTP.",
    bullets: [
      "Dual-mode: Groq + KB for knowledge, action pipeline for bookings.",
      "Collects services, packages, date conversationally before confirming.",
      "Payment gateway + OTP verification for secure end-to-end booking.",
      "Live client deployment with active real-world customer base.",
    ],
    image: sharmaChiragImg,
    tags: ["AI Agent", "Groq", "React", "Payment Gateway", "OTP"],
    accent: "#a855f7", imagePos: "right",
    links: [{ label: "Live Site", href: "https://sharmachirag.vercel.app/", icon: <ExternalLink size={10} />, style: "bg-[#a855f7] text-white hover:bg-[#9333ea]" }],
  },
  {
    id: 4, title: "Chat With PDF", year: "2025",
    category: "AI · RAG System", icon: <BookOpen size={13} />,
    description: "Upload any PDF and ask questions. Full RAG pipeline — FAISS vector DB, HuggingFace embeddings, OpenRouter LLM.",
    bullets: [
      "PDF → text extraction → chunk splitting → HuggingFace embeddings.",
      "FAISS vector DB stores and retrieves most relevant chunks per query.",
      "OpenRouter LLM generates context-aware answers from those chunks.",
      "Sessions + multi-user logic — Flask on Render, React on Vercel.",
    ],
    image: "https://placehold.co/900x560/0f172a/f59e0b?text=Chat+With+PDF",
    tags: ["Python", "Flask", "FAISS", "HuggingFace", "OpenRouter", "React"],
    accent: "#f59e0b", imagePos: "left",
    links: [{ label: "GitHub", href: "https://github.com/rupesh3433/chat_with_pdf_backend", icon: <Github size={10} />, style: "bg-[#f59e0b] text-white hover:bg-[#d97706]" }],
  },
];

/* ══════════════════════════════════
   DESKTOP / TABLET SLIDE
   Uses CSS-variable classes just like Footer:
   bg-background, text-foreground, text-muted-foreground,
   border-border, bg-card
══════════════════════════════════ */
const DesktopSlide = ({ project, index }: { project: Project; index: number }) => {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: false, margin: "-12% 0px -12% 0px" });
  const isRight = project.imagePos === "right";

  const textVariants: Variants = {
    hidden:  { opacity: 0, scale: 0.12, filter: "blur(8px)" },
    visible: { opacity: 1, scale: 1,    filter: "blur(0px)",
      transition: { duration: 0.55, ease: EASE } },
  };

  const imgVariants: Variants = {
    hidden:  { opacity: 0, x: isRight ? 40 : -40 },
    visible: { opacity: 1, x: 0,
      transition: { duration: 0.5, ease: EASE, delay: 0.07 } },
  };

  /* ── Text block — all CSS-variable colours ── */
  const textBlock = (
    <motion.div
      variants={textVariants}
      animate={inView ? "visible" : "hidden"}
      initial="hidden"
      className="flex flex-col justify-center gap-2.5"
    >
      {/* Category badge */}
      <span
        className="self-start inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase"
        style={{ background: `${project.accent}22`, color: project.accent }}
      >
        {project.icon}{project.category}
        <span className="opacity-50 font-normal ml-0.5">{project.year}</span>
      </span>

      {/* Title — uses text-foreground (auto swaps dark/light) */}
      <h3
        className="font-display font-black leading-none tracking-tight text-foreground"
        style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)" }}
      >
        {project.title}
      </h3>

      {/* Description — muted-foreground same as Footer nav links */}
      <p className="text-xs leading-relaxed text-muted-foreground max-w-xs">
        {project.description}
      </p>

      {/* Bullets */}
      <ul className="flex flex-col gap-1 max-w-xs">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accent }} />
            {b}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {project.tags.map((t) => (
          <span key={t}
            className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border"
            style={{ background: `${project.accent}12`, color: project.accent, borderColor: `${project.accent}28` }}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {project.links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${l.style}`}>
            {l.icon}{l.label}
          </a>
        ))}
      </div>
    </motion.div>
  );

  /* ── Image block ── */
  const imageBlock = (
    <motion.div
      variants={imgVariants}
      animate={inView ? "visible" : "hidden"}
      initial="hidden"
      className="relative flex items-center"
    >
      <div className="absolute inset-4 rounded-xl blur-2xl opacity-10 pointer-events-none"
        style={{ background: project.accent }} />
      {/* border-border/50 — same token Footer social icons use */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-border/50">
        <img src={project.image} alt={project.title}
          className="w-full h-auto object-cover" style={{ maxHeight: "38vh" }} loading="lazy" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${project.accent}10 0%, transparent 55%)` }} />
        {project.links.some((l) => l.label.includes("Live") || l.label.includes("Site")) && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-black/55 text-white backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
          </span>
        )}
      </div>
    </motion.div>
  );

  return (
    <div ref={ref} className="relative w-full">
      {/* Ghost number */}
      <span
        className="absolute font-display font-black select-none pointer-events-none leading-none"
        style={{
          fontSize: "clamp(5rem, 12vw, 11rem)",
          color: `${project.accent}07`,
          right: isRight ? "auto" : "1%",
          left:  isRight ? "1%"  : "auto",
          top: "50%", transform: "translateY(-50%)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Accent blob */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 50% 80% at ${isRight ? "72%" : "28%"} 50%, ${project.accent}07 0%, transparent 70%)` }} />

      {/* 80% wide centered grid */}
      <div className="relative z-10 w-[80%] mx-auto grid grid-cols-2 gap-8 lg:gap-12 py-10 lg:py-11">
        {isRight ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
      </div>

      {/* Divider — same gradient style as Footer's divider */}
      {index < PROJECTS.length - 1 && (
        <div className="w-[80%] mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}
    </div>
  );
};

/* ══════════════════════════════════
   MOBILE CAROUSEL — no images, swipeable
══════════════════════════════════ */
const MobileCarousel = () => {
  const [active, setActive]         = useState(0);
  const [direction, setDirection]   = useState(0);
  const touchStart    = useRef(0);
  const transitioning = useRef(false);

  const go = useCallback((next: number) => {
    if (transitioning.current || next < 0 || next >= PROJECTS.length) return;
    transitioning.current = true;
    setDirection(next > active ? 1 : -1);
    setActive(next);
    setTimeout(() => { transitioning.current = false; }, 420);
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) < 40) return;
    dx > 0 ? go(active + 1) : go(active - 1);
  };

  const project = PROJECTS[active];
  const enterX  = direction > 0 ? "55%" : "-55%";
  const exitX   = direction > 0 ? "-55%" : "55%";

  return (
    <div className="w-full px-4 py-6">
      <div
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ minHeight: 440 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: enterX, scale: 0.93 }}
            animate={{ opacity: 1, x: 0,      scale: 1,
              transition: { duration: 0.38, ease: EASE } }}
            exit={{    opacity: 0, x: exitX,   scale: 0.93,
              transition: { duration: 0.26 } }}
            className="absolute inset-0 flex flex-col justify-center"
          >
            {/*
              bg-card/60  → same token Footer social icons use
              border-border/40 → same as Footer border-t
            */}
            <div
              className="w-full rounded-2xl border p-5 flex flex-col gap-3 bg-card/60 border-border/40 shadow-sm backdrop-blur-sm"
              style={{ borderTop: `3px solid ${project.accent}` }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase"
                  style={{ background: `${project.accent}1e`, color: project.accent }}
                >
                  {project.icon}{project.category}
                </span>
                {/* muted-foreground/60 — same opacity Footer copyright uses */}
                <span className="text-xs font-semibold text-muted-foreground/60">{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="font-display font-black leading-none tracking-tight text-foreground"
                style={{ fontSize: "1.55rem" }}>
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Bullets */}
              <ul className="flex flex-col gap-1.5">
                {project.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {project.tags.map((t) => (
                  <span key={t} className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border"
                    style={{ background: `${project.accent}10`, color: project.accent, borderColor: `${project.accent}25` }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${l.style}`}>
                    {l.icon}{l.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav row */}
      <div className="flex items-center justify-between mt-4 px-1">
        <button
          onClick={() => go(active - 1)} disabled={active === 0}
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed bg-card border-border/50 text-muted-foreground"
          style={active > 0 ? { borderColor: `${project.accent}55`, color: project.accent } : undefined}
        >
          <ChevronLeft size={15} />
        </button>

        {/* Pill dots */}
        <div className="flex items-center gap-1.5">
          {PROJECTS.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className="rounded-full transition-all duration-300 focus:outline-none"
              style={{ height: 6, width: i === active ? 22 : 6,
                background: i === active ? project.accent : "hsl(var(--border))" }} />
          ))}
        </div>

        <button
          onClick={() => go(active + 1)} disabled={active === PROJECTS.length - 1}
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed bg-card border-border/50 text-muted-foreground"
          style={active < PROJECTS.length - 1 ? { borderColor: `${project.accent}55`, color: project.accent } : undefined}
        >
          <ChevronRight size={15} />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground/50 mt-2 select-none">← Swipe to explore →</p>
    </div>
  );
};

/* ══════════════════════════════════
   SECTION HEADER
══════════════════════════════════ */
const SectionHeader = () => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: EASE }}
      className="flex flex-col items-center text-center gap-2.5 pt-16 pb-2 px-4"
    >
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-primary/30 bg-primary/10 text-primary">
        My Work
      </span>

      {/* text-foreground — auto dark/light, same as rest of site */}
      <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight text-foreground">
        Featured <span className="gradient-text">Projects</span>
      </h2>

      <p className="text-sm text-muted-foreground">
        Scroll down to explore each project
      </p>

      {/* Divider — same style as Footer's my-8 divider */}
      <div className="flex items-center gap-3 w-full max-w-xs mt-1">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-primary text-xs">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════
   EXPORT
   bg-background — exact same token Footer uses
══════════════════════════════════ */
const ProjectsSection = () => (
  <section id="projects" className="relative w-full overflow-hidden bg-background">
    <SectionHeader />

    {/* Desktop + Tablet (md+) */}
    <div className="hidden md:block">
      {PROJECTS.map((p, i) => (
        <DesktopSlide key={p.id} project={p} index={i} />
      ))}
    </div>

    {/* Mobile only */}
    <div className="block md:hidden">
      <MobileCarousel />
    </div>

    {/* Top of footer divider */}
    <div className="w-[80%] mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    {/* GitHub CTA */}
    <div className="flex justify-center py-10">
      <motion.a
        href="https://github.com/rupesh3433"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04, boxShadow: "0 0 20px -4px hsl(var(--primary)/0.4)" }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 border-primary/30 text-primary bg-card hover:bg-primary hover:text-white hover:border-primary"
      >
        <Github size={15} />
        View All on GitHub
        <ArrowUpRight size={14} />
      </motion.a>
    </div>
  </section>
);

export default ProjectsSection;