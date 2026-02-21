import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Download } from "lucide-react";
import heroImage from "@/assets/hero-developer.png";

/* ─── Typewriter ─── */
const titles = [
  "Computer Engineer",
  "Full Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Creative Technologist",
];

const useTypewriter = (words: string[], typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) => {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + (isDeleting ? -1 : 1))),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, wordIdx, isDeleting, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
};

/* ─── Particle (spark) ─── */
interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const HeroSection = () => {
  const typed = useTypewriter(titles, 70, 40, 1600);

  /* Tilt (rotateX/Y instead of translate) */
  const containerRef = useRef<HTMLElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 120, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 120, damping: 20 });

  /* Particles */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number>(0);
  const idCounter = useRef(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Map cursor offset to tilt degrees (max ~15deg)
      rotY.set(((e.clientX - cx) / (rect.width / 2)) * 12);
      rotX.set(-((e.clientY - cy) / (rect.height / 2)) * 12);

      // Spawn sparks
      for (let i = 0; i < 2; i++) {
        sparksRef.current.push({
          id: idCounter.current++,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 1,
          life: 1,
        });
      }
    },
    [rotX, rotY]
  );

  /* Canvas loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.025;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2 * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(199, 89%, 56%, ${s.life * 0.8})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Spark canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 dark:bg-primary/5 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 dark:bg-accent/5 blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-20 h-20 rounded-full border border-primary/20 pointer-events-none"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-12 h-12 rounded-lg border border-accent/15 pointer-events-none"
        animate={{ y: [0, 15, 0], rotate: [0, -90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT — Text */}
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary font-display font-semibold text-sm tracking-widest uppercase"
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.08] tracking-tight"
          >
            I am{" "}
            <span className="gradient-text glow-text text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Rupesh Poudel,</span>
            <br />
            <span className="text-primary">{typed}</span>
            <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse align-middle" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            Crafting high-performance digital experiences with cutting-edge
            technology. Turning complex problems into elegant solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-display font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent glow-sm transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px -5px hsl(199 89% 56% / 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-display font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" /> Download CV
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT — Image with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
          style={{
            rotateX: springRotX,
            rotateY: springRotY,
            transformPerspective: 800,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[80%] rounded-full bg-primary/10 dark:bg-primary/8 blur-[80px] animate-pulse-glow" />
          </div>
          <motion.img
            src={heroImage}
            alt="Rupesh Poudel — Developer"
            className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-primary/30 shadow-2xl drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
