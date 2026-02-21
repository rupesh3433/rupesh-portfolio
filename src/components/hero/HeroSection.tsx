import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import HeroPerson from "./HeroPerson";
import HeroTexts from "./HeroTexts";

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  hue: number;
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number>(0);
  const idRef = useRef(0);

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  /* 3D Rotation Motion */
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 90, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 90, damping: 20 });

  /* Fixed: cast unknowns to number to resolve TypeScript error */
  const glowOpacity = useTransform([sRotX, sRotY], (values: number[]) =>
    Math.min(0.25, (Math.abs(values[0]) + Math.abs(values[1])) / 40)
  );

  /* Global Cursor */
  useEffect(() => {
    const handler = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  /* Spark Particle Engine */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width = p.clientWidth;
      canvas.height = p.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = sparksRef.current;

      for (let i = arr.length - 1; i >= 0; i--) {
        const s = arr[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.98;
        s.vy *= 0.98;
        s.vy += 0.05;
        s.life -= 0.015;

        if (s.life <= 0) {
          arr.splice(i, 1);
          continue;
        }

        const r = 3 * s.life;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 90%, 60%, ${s.life})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${s.hue}, 90%, 55%, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* Mouse Interaction */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      rotY.set(((mx - rect.width / 2) / rect.width) * 14);
      rotX.set(-((my - rect.height / 2) / rect.height) * 14);

      for (let i = 0; i < 2; i++) {
        sparksRef.current.push({
          id: idRef.current++,
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 1,
          life: 1,
          hue: 180 + Math.random() * 80,
        });
      }
    },
    [rotX, rotY]
  );

  const handleMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
  }, [rotX, rotY]);

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-12 lg:pb-16"
      style={{ perspective: "1400px" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--primary)/0.08), transparent 60%)",
          opacity: glowOpacity,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--primary)/0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.35,
        }}
      />

      {/* ── Responsive Grid ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center relative z-30">

        {/* CHARACTER — first on mobile, right column on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          style={{
            rotateX: sRotX,
            rotateY: sRotY,
            transformPerspective: 900,
          }}
        >
          {/*
            Mobile:  tight wrap — character fills most of viewport width at ~196px cap
            Tablet:  max-w-[220px] so it stays proportionally sized
            Desktop: max-w-[320px] — character scales up naturally
          */}
          <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px]">
            <motion.div
              className="absolute inset-0 rounded-[2rem] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 60%, hsl(var(--primary)/0.18), transparent 70%)",
                filter: "blur(10px)",
                opacity: glowOpacity,
              }}
            />
            <div className="relative z-10 w-full" style={{ minHeight: "auto" }}>
              <HeroPerson cursorPos={cursorPos} />
            </div>
          </div>
        </motion.div>

        {/* TEXT — second on mobile, left column on desktop */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <HeroTexts />
        </div>
      </div>

      {/* Scroll Indicator — desktop only */}
      <motion.div
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[9px] tracking-[0.22em] uppercase text-muted-foreground/50 font-semibold">
          Scroll
        </span>
        <motion.div
          className="w-4 h-7 rounded-full border-2 border-primary/30 flex items-start justify-center pt-1"
          animate={{
            borderColor: [
              "hsl(var(--primary)/0.3)",
              "hsl(var(--primary)/0.7)",
              "hsl(var(--primary)/0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-0.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;