import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import HeroTexts from "./HeroTexts";
import stickerImage from "@/assets/sticker_image.png";

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  hue: number;
}

/* ─────────────────────────────────────────
   🎛️  CONTROL PANEL — tweak these values
───────────────────────────────────────── */
const IMAGE_WIDTH = {
  mobile: 160,  // px  — change to make image bigger/smaller on mobile
  sm:     190,  // px  — small screens (640px+)
  md:     220,  // px  — tablets (768px+)
  lg:     310,  // px  — desktop (1024px+)
  xl:     360,  // px  — wide screens (1280px+)
};

// Nudge image downward on mobile & tablet (0 = no shift, higher = more down)
const IMAGE_MOBILE_TOP_OFFSET = 18; // px
/* ───────────────────────────────────────── */

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const sparksRef  = useRef<Spark[]>([]);
  const rafRef     = useRef<number>(0);
  const idRef      = useRef(0);

  const rotX        = useMotionValue(0);
  const rotY        = useMotionValue(0);
  const sRotX       = useSpring(rotX, { stiffness: 90, damping: 20 });
  const sRotY       = useSpring(rotY, { stiffness: 90, damping: 20 });
  const glowOpacity = useTransform([sRotX, sRotY], (values: number[]) =>
    Math.min(0.25, (Math.abs(values[0]) + Math.abs(values[1])) / 40)
  );

  /* Spark Particle Engine */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width  = p.clientWidth;
      canvas.height = p.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = sparksRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const s = arr[i];
        s.x  += s.vx;
        s.y  += s.vy;
        s.vx *= 0.98;
        s.vy *= 0.98;
        s.vy += 0.05;
        s.life -= 0.015;
        if (s.life <= 0) { arr.splice(i, 1); continue; }
        const r = 3 * s.life;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle   = `hsla(${s.hue}, 90%, 60%, ${s.life})`;
        ctx.shadowBlur  = 15;
        ctx.shadowColor = `hsla(${s.hue}, 90%, 55%, 0.6)`;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      rotY.set(((mx - rect.width  / 2) / rect.width)  * 14);
      rotX.set(-((my - rect.height / 2) / rect.height) * 14);
      for (let i = 0; i < 2; i++) {
        sparksRef.current.push({
          id: idRef.current++,
          x: mx, y: my,
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
      /* min-h-screen + flex items-center = full vertical centering */
      className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-20 pb-8 md:pb-12 lg:pb-16"
      style={{ perspective: "1400px" }}
    >
      {/*
        🎛️ Responsive image styles — driven entirely by the constants above.
        Change IMAGE_WIDTH values or IMAGE_MOBILE_TOP_OFFSET at the top of this file.
      */}
      <style>{`
        .hero-sticker {
          width: ${IMAGE_WIDTH.mobile}px;
          margin-top: ${IMAGE_MOBILE_TOP_OFFSET}px;
          max-height: 62vh;
          mix-blend-mode: multiply;
          filter: drop-shadow(0 8px 32px hsl(var(--primary) / 0.28));
          object-fit: contain;
          position: relative;
          z-index: 10;
          user-select: none;
          display: block;
        }
        @media (min-width: 640px)  { .hero-sticker { width: ${IMAGE_WIDTH.sm}px; } }
        @media (min-width: 768px)  { .hero-sticker { width: ${IMAGE_WIDTH.md}px; } }
        @media (min-width: 1024px) { .hero-sticker { width: ${IMAGE_WIDTH.lg}px; margin-top: 0; } }
        @media (min-width: 1280px) { .hero-sticker { width: ${IMAGE_WIDTH.xl}px; } }
      `}</style>

      {/* Spark canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* Mouse-driven radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--primary)/0.08), transparent 60%)",
          opacity: glowOpacity,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--primary)/0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.35,
        }}
      />

      {/* ── Two-column grid ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-14 xl:px-16 relative z-30 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-center">

          {/* LEFT — text, vertically + horizontally centered on mobile, left-aligned on desktop */}
          <motion.div
            className="order-2 lg:order-1 flex items-center justify-center lg:justify-start mt-8 sm:mt-10 lg:mt-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroTexts />
          </motion.div>

          {/* RIGHT — sticker, centered in column */}
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center -mb-8 sm:-mb-10 lg:mb-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          >
            <div className="relative flex items-center justify-center">
              {/* Glow blob */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-10%",
                  background: "radial-gradient(ellipse at 50% 60%, hsl(var(--primary)/0.22), transparent 65%)",
                  filter: "blur(32px)",
                }}
              />
              <img
                src={stickerImage}
                alt="Rupesh Poudel"
                draggable={false}
                className="hero-sticker"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
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