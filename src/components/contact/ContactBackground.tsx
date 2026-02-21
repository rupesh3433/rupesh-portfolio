import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Particle {
  x: number; y: number; vy: number;
  phase: number; phaseSpeed: number; amplitude: number;
  opacity: number; opacityDir: number; r: number; hue: number;
}

const ContactBackground = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(wrapRef, { margin: "200px" });
  const liveRef = useRef(false);
  const psRef = useRef<Particle[]>([]);

  useEffect(() => { liveRef.current = isInView; }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const spawn = () => {
      const mobile = canvas.width < 640;
      const n = mobile ? 20 : 42;
      psRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: -(0.14 + Math.random() * 0.24),
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.007 + Math.random() * 0.011,
        amplitude: 0.3 + Math.random() * 0.5,
        opacity: 0.06 + Math.random() * 0.24,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        r: 0.7 + Math.random() * 1.5,
        hue: 186 + Math.random() * 60,
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      spawn();
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      if (!liveRef.current) { raf = requestAnimationFrame(loop); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = psRef.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.y += p.vy;
        p.phase += p.phaseSpeed;
        p.x += Math.sin(p.phase) * p.amplitude;
        p.opacity += p.opacityDir * 0.003;
        if (p.opacity > 0.34 || p.opacity < 0.04) p.opacityDir *= -1;
        if (p.y < -10) { p.y = canvas.height + 8; p.x = Math.random() * canvas.width; }
        if (p.x < -20) p.x = canvas.width + 18;
        if (p.x > canvas.width + 20) p.x = -18;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},72%,64%,${p.opacity})`;
        ctx.fill();
      }

      // Faint connection lines
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 88) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `hsla(196,72%,62%,${0.07 * (1 - d / 88)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal drifting grid */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: "-55px",
          backgroundImage: `linear-gradient(hsl(var(--primary)/0.05) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--primary)/0.05) 1px,transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
        animate={{ x: [0, 44], y: [0, 44] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top-left primary glow */}
      <motion.div className="absolute rounded-full" style={{
        width:"clamp(260px,50vw,580px)", height:"clamp(260px,50vw,580px)",
        top:"-18%", left:"-8%",
        background:"radial-gradient(circle,hsl(var(--primary)/0.12) 0%,transparent 65%)",
        filter:"blur(55px)",
      }}
        animate={{ scale:[1,1.1,1], opacity:[0.7,1,0.7] }}
        transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
      />

      {/* Bottom-right accent glow */}
      <motion.div className="absolute rounded-full" style={{
        width:"clamp(180px,36vw,440px)", height:"clamp(180px,36vw,440px)",
        bottom:"-12%", right:"-6%",
        background:"radial-gradient(circle,hsl(var(--accent)/0.09) 0%,transparent 65%)",
        filter:"blur(45px)",
      }}
        animate={{ scale:[1,1.16,1], opacity:[0.5,0.85,0.5] }}
        transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:3.5 }}
      />

      {/* HUD corner brackets */}
      {(["tl","tr","bl","br"] as const).map((corner,i) => (
        <div key={corner} className={`absolute ${i<2?"top-5":"bottom-5"} ${i%2===0?"left-5":"right-5"} w-9 h-9`} style={{opacity:0.15}}>
          <div style={{
            position:"absolute", width:28, height:28,
            top:i<2?0:"auto", bottom:i>=2?0:"auto",
            left:i%2===0?0:"auto", right:i%2===1?0:"auto",
            borderTop: i<2?"1.5px solid hsl(var(--primary))":"none",
            borderBottom: i>=2?"1.5px solid hsl(var(--primary))":"none",
            borderLeft: i%2===0?"1.5px solid hsl(var(--primary))":"none",
            borderRight: i%2===1?"1.5px solid hsl(var(--primary))":"none",
          }}/>
        </div>
      ))}

      {/* Horizontal scan sweep */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          height:1,
          background:"linear-gradient(90deg,transparent,hsl(var(--primary)/0.14) 35%,hsl(var(--primary)/0.22) 50%,hsl(var(--primary)/0.14) 65%,transparent)",
        }}
        animate={{ top:["-2%","104%"] }}
        transition={{ duration:16, repeat:Infinity, ease:"linear", repeatDelay:5 }}
      />
    </div>
  );
};

export default ContactBackground;