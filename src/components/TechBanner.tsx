import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";

const icons = [
  {
    name: "React",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "Node.js",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#68A063",
  },
  {
    name: "Python",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#FFD43B",
  },
  {
    name: "Docker",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
  {
    name: "Kubernetes",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    color: "#326CE5",
  },
  {
    name: "GraphQL",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    color: "#E10098",
  },
  {
    name: "PostgreSQL",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#4169E1",
  },
  {
    name: "AWS",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    color: "#FF9900",
  },
  {
    name: "Figma",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E",
  },
  {
    name: "TailwindCSS",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#38BDF8",
  },
  {
    name: "MongoDB",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#4DB33D",
  },
  {
    name: "Redis",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    color: "#DC382D",
  },
  {
    name: "Git",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },
  {
    name: "Next.js",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#E2E8F0",
  },
  {
    name: "Go",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    color: "#00ACD7",
  },
  {
    name: "Rust",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    color: "#CE422B",
  },
  {
    name: "Java",
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "#ED8B00",
  },
];

const row1 = icons.slice(0, 9);
const row2 = icons.slice(9, 18);

const ICON_BASE = 44;
const GAP = 48;
const SCROLL_SPEED = "14s";

/* ─────────────────────────────────────────────────────────────────
   FloatingIcon portal — bare icon, no card, floats upward
──────────────────────────────────────────────────────────────────*/
interface FloatingIconProps {
  icon: { name: string; svg: string; color: string };
  anchorRef: React.RefObject<HTMLDivElement>;
  show: boolean;
}

const FloatingIcon = ({ icon, anchorRef, show }: FloatingIconProps) => {
  if (typeof document === "undefined") return null;

  const getStyle = (): React.CSSProperties => {
    if (!anchorRef.current) return { top: 0, left: 0 };
    const r = anchorRef.current.getBoundingClientRect();
    const floatSize = 72;
    return {
      position: "fixed",
      /* Sit just above the anchor — gap of ~14px */
      top: r.top - floatSize - 14,
      left: r.left + r.width / 2 - floatSize / 2,
      width: floatSize,
      height: floatSize,
      zIndex: 9999,
      pointerEvents: "none",
    };
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          style={getStyle()}
          /* Start: same position as the base icon (translateY 0), small, slightly transparent */
          initial={{ opacity: 0.55, scale: 0.72, y: 0 }}
          /* End: risen ~18px above start position, full size, full opacity */
          animate={{ opacity: 1, scale: 1, y: -18 }}
          exit={{ opacity: 0, scale: 0.68, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 480,
            damping: 28,
            mass: 0.7,
          }}
        >
          {/* Soft glow halo — no card border, just radial light */}
          <div
            style={{
              position: "absolute",
              inset: -16,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${icon.color}38 0%, ${icon.color}10 55%, transparent 78%)`,
              pointerEvents: "none",
            }}
          />

          {/* The icon itself */}
          <img
            src={icon.svg}
            alt={icon.name}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: `drop-shadow(0 0 10px ${icon.color}bb) drop-shadow(0 2px 6px rgba(0,0,0,0.28))`,
              position: "relative",
              zIndex: 1,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

/* ─────────────────────────────────────────────────────────────────
   Single icon item
──────────────────────────────────────────────────────────────────*/
interface IconItemProps {
  icon: { name: string; svg: string; color: string };
}

const IconItem = ({ icon }: IconItemProps) => {
  const [active, setActive] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null!);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Mobile tap: toggle on, auto-off after 1.4s */
  const handleTap = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(true);
    timeoutRef.current = setTimeout(() => setActive(false), 1400);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <div
      ref={anchorRef}
      className="flex-shrink-0 relative flex flex-col items-center select-none"
      style={{ minWidth: ICON_BASE + 20 }}
      /* Desktop */
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      /* Mobile */
      onTouchStart={(e) => {
        e.preventDefault();
        handleTap();
      }}
    >
      <FloatingIcon icon={icon} anchorRef={anchorRef} show={active} />

      {/* Base icon — dims slightly and shrinks when active to feel "launched" */}
      <motion.div
        className="flex flex-col items-center gap-1.5"
        animate={
          active ? { scale: 0.84, opacity: 0.45 } : { scale: 1, opacity: 1 }
        }
        transition={{ type: "spring", stiffness: 460, damping: 26, mass: 0.6 }}
      >
        <img
          src={icon.svg}
          alt={icon.name}
          draggable={false}
          style={{
            width: ICON_BASE,
            height: ICON_BASE,
            transition: "filter 0.18s ease",
            filter: active ? `drop-shadow(0 0 6px ${icon.color}66)` : "none",
          }}
        />
        <span
          className="font-display font-semibold whitespace-nowrap"
          style={{
            fontSize: 10,
            color: active ? icon.color : "hsl(var(--muted-foreground))",
            transition: "color 0.18s ease",
          }}
        >
          {icon.name}
        </span>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Scroll row
──────────────────────────────────────────────────────────────────*/
interface ScrollRowProps {
  items: typeof icons;
  direction: "left" | "right";
  rowId: string;
}

const ScrollRow = ({ items, direction, rowId }: ScrollRowProps) => {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items, ...items, ...items];
  const animName = `scroll_${rowId}`;
  const kf =
    direction === "left"
      ? `@keyframes ${animName} { from { transform: translateX(0); } to { transform: translateX(-50%); } }`
      : `@keyframes ${animName} { from { transform: translateX(-50%); } to { transform: translateX(0); } }`;

  return (
    <>
      <style>{`
        ${kf}
        .strip-${rowId} {
          display: flex;
          gap: ${GAP}px;
          align-items: center;
          animation: ${animName} ${SCROLL_SPEED} linear infinite;
          animation-play-state: ${paused ? "paused" : "running"};
          will-change: transform;
        }
      `}</style>

      <div
        className="flex overflow-hidden"
        style={{ paddingBlock: 10 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={`strip-${rowId}`}>
          {doubled.map((icon, i) => (
            <IconItem key={`${icon.name}-${i}`} icon={icon} />
          ))}
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────
   TechBanner
──────────────────────────────────────────────────────────────────*/
const TechBanner = () => (
  <section className="relative z-20 overflow-hidden" id="tech">
    {/* Top shimmer line */}
    <div
      className="absolute top-0 left-0 right-0 h-px z-10"
      style={{
        background:
          "linear-gradient(to right, transparent, hsl(var(--primary)/0.5), hsl(var(--accent)/0.4), transparent)",
      }}
    />

    {/* Glass panel */}
    <div
      className="relative py-7 sm:py-9"
      style={{
        background: `linear-gradient(180deg,
          hsl(var(--card)/0.94) 0%,
          hsl(var(--card)/0.82) 40%,
          hsl(var(--background)/0.97) 100%)`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      {/* Left fade mask */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: "clamp(48px, 10vw, 120px)",
          background:
            "linear-gradient(to right, hsl(var(--background)), transparent)",
        }}
      />
      {/* Right fade mask */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{
          width: "clamp(48px, 10vw, 120px)",
          background:
            "linear-gradient(to left, hsl(var(--background)), transparent)",
        }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "120px",
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 320,
          height: 160,
          top: "20%",
          left: "15%",
          background:
            "radial-gradient(ellipse, hsl(var(--primary)/0.07) 0%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 260,
          height: 130,
          top: "30%",
          right: "12%",
          background:
            "radial-gradient(ellipse, hsl(var(--accent)/0.06) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Section label */}
      <div className="flex items-center justify-center mb-5 gap-3 sm:gap-4">
        <motion.div
          className="h-px flex-1 max-w-[72px] sm:max-w-[96px]"
          style={{
            background:
              "linear-gradient(to right, transparent, hsl(var(--border)))",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        />
        <span
          className="tracking-[0.26em] uppercase font-bold text-muted-foreground/55 font-display"
          style={{ fontSize: "clamp(9px, 1.8vw, 11px)" }}
        >
          Tech Stack
        </span>
        <motion.div
          className="h-px flex-1 max-w-[72px] sm:max-w-[96px]"
          style={{
            background:
              "linear-gradient(to left, transparent, hsl(var(--border)))",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        />
      </div>

      {/* Row 1 — scrolls left */}
      <ScrollRow items={row1} direction="left" rowId="r1" />

      {/* Divider dots */}
      <div className="flex items-center gap-3 sm:gap-4 px-6 my-2.5">
        <div
          className="h-px flex-1"
          style={{ background: "hsl(var(--border)/0.22)" }}
        />
        <motion.div
          className="flex gap-1"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: "hsl(var(--primary)/0.45)" }}
            />
          ))}
        </motion.div>
        <div
          className="h-px flex-1"
          style={{ background: "hsl(var(--border)/0.22)" }}
        />
      </div>

      {/* Row 2 — scrolls right */}
      <ScrollRow items={row2} direction="right" rowId="r2" />

      {/* Hint */}
      <div className="text-center mt-4">
        <motion.span
          className="font-medium text-muted-foreground/30"
          style={{
            fontSize: "clamp(9px, 1.6vw, 11px)",
            letterSpacing: "0.16em",
          }}
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        >
          ✦ hover to explore · tap on mobile
        </motion.span>
      </div>
    </div>

    {/* Bottom shimmer line */}
    <div
      className="absolute bottom-0 left-0 right-0 h-px z-10"
      style={{
        background:
          "linear-gradient(to right, transparent, hsl(var(--accent)/0.35), transparent)",
      }}
    />
  </section>
);

export default TechBanner;
