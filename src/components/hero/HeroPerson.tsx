import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════════ */
export type Expression =
  | "neutral"
  | "smile"
  | "happy"
  | "bigSmile"
  | "surprised"
  | "wink"
  | "thinking"
  | "attitude"
  | "sad"
  | "laughing"
  | "confident"
  | "playful"
  | "shy"
  | "proud"
  | "excited"
  | "calm"
  | "focus"
  | "charming"
  | "cool"
  | "softSmile";

interface HeroPersonProps {
  cursorPos: { x: number; y: number } | null;
}

/* ══════════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════════ */
const PUPIL_RADIUS = 5;

function toSVGCoords(cx: number, cy: number, svg: SVGSVGElement) {
  const r = svg.getBoundingClientRect();
  if (!r.width || !r.height) return { x: 100, y: 108 };
  return {
    x: ((cx - r.left) / r.width) * 200,
    y: ((cy - r.top) / r.height) * 340,
  };
}

function clampPupil(sc: { x: number; y: number }, ecx: number, ecy: number) {
  const dx = sc.x - ecx;
  const dy = sc.y - ecy;
  const d = Math.hypot(dx, dy);
  if (!d) return { x: 0, y: 0 };
  const s = Math.min(1, PUPIL_RADIUS / d);
  return { x: dx * s, y: dy * s };
}

/* ══════════════════════════════════════════════════════════════════
   RESPONSIVE HOOK
══════════════════════════════════════════════════════════════════ */
function useContainerSize(ref: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = useState({ width: 280, height: 420 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return size;
}

/* ══════════════════════════════════════════════════════════════════
   FACE FEATURE PATHS  — all mouths are closed / subtle
══════════════════════════════════════════════════════════════════ */
function eyebrowL(expr: Expression): string {
  switch (expr) {
    case "surprised":
    case "excited":
      return "M 52 83 Q 74 70 96 80";
    case "sad":
      return "M 52 82 Q 74 89 96 81";
    case "thinking":
    case "focus":
      return "M 52 85 Q 74 80 96 82";
    case "happy":
    case "bigSmile":
    case "laughing":
    case "charming":
      return "M 52 79 Q 74 68 96 77";
    case "attitude":
    case "cool":
      return "M 52 88 Q 74 92 96 86";
    case "wink":
      return "M 52 79 Q 74 71 96 77";
    case "confident":
    case "proud":
      return "M 52 81 Q 74 74 96 80";
    case "playful":
      return "M 52 80 Q 74 72 96 79";
    case "shy":
      return "M 52 83 Q 74 79 96 82";
    case "calm":
      return "M 52 84 Q 74 80 96 84";
    case "softSmile":
      return "M 52 82 Q 74 76 96 81";
    default:
      return "M 52 84 Q 74 79 96 84";
  }
}

function eyebrowR(expr: Expression): string {
  switch (expr) {
    case "surprised":
    case "excited":
      return "M 104 80 Q 126 70 150 83";
    case "sad":
      return "M 104 81 Q 126 89 150 82";
    case "thinking":
      return "M 104 80 Q 126 82 150 88";
    case "focus":
      return "M 104 82 Q 126 80 150 84";
    case "happy":
    case "bigSmile":
    case "laughing":
    case "charming":
      return "M 104 77 Q 126 68 150 79";
    case "attitude":
    case "cool":
      return "M 104 86 Q 126 92 150 88";
    case "wink":
      return "M 104 81 Q 126 76 150 82";
    case "confident":
    case "proud":
      return "M 104 80 Q 126 73 150 81";
    case "playful":
      return "M 104 79 Q 126 72 150 80";
    case "shy":
      return "M 104 82 Q 126 79 150 83";
    case "calm":
      return "M 104 84 Q 126 80 150 84";
    case "softSmile":
      return "M 104 81 Q 126 76 150 82";
    default:
      return "M 104 84 Q 126 79 150 84";
  }
}

/* All mouths are CLOSED — no open mouth, no teeth */
function getMouth(expr: Expression): string {
  switch (expr) {
    case "bigSmile":
    case "charming":
      return "M 70 184 Q 100 202 130 184";
    case "happy":
      return "M 72 184 Q 100 198 128 184";
    case "smile":
    case "softSmile":
      return "M 78 182 Q 100 194 122 182";
    case "laughing":
    case "excited":
      return "M 68 184 Q 100 200 132 184";
    case "surprised":
      return "M 84 184 Q 100 195 116 184";
    case "sad":
      return "M 74 193 Q 100 181 126 193";
    case "thinking":
      return "M 80 184 Q 92 188 104 183 Q 116 179 124 185";
    case "attitude":
      return "M 76 182 Q 92 184 106 180 Q 120 178 128 183";
    case "wink":
    case "playful":
      return "M 74 183 Q 100 196 126 183";
    case "confident":
    case "proud":
      return "M 76 183 Q 100 194 124 183";
    case "shy":
      return "M 82 183 Q 100 191 118 183";
    case "calm":
      return "M 80 184 Q 100 190 120 184";
    case "focus":
      return "M 82 184 Q 100 187 118 184";
    case "cool":
      return "M 78 182 Q 94 186 104 181 Q 118 178 126 184";
    default:
      return "M 78 183 Q 100 192 122 183";
  }
}

const showBlushFor = new Set<Expression>([
  "happy",
  "bigSmile",
  "smile",
  "laughing",
  "wink",
  "shy",
  "charming",
  "playful",
  "softSmile",
  "excited",
]);
const squintFor = new Set<Expression>(["laughing", "bigSmile", "excited"]);
const wideEyesFor = new Set<Expression>(["surprised", "excited"]);

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
const HeroPerson = ({ cursorPos }: HeroPersonProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width: containerWidth } = useContainerSize(
    containerRef as React.RefObject<HTMLDivElement>
  );

  /* Responsive: mobile 30% smaller, tablet ~15% smaller, desktop 10% smaller */
  const [screenClass, setScreenClass] = useState<
    "mobile" | "tablet" | "desktop"
  >("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setScreenClass("mobile");
      else if (w < 1024) setScreenClass("tablet");
      else setScreenClass("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sizeCap =
    screenClass === "mobile" ? 196 : screenClass === "tablet" ? 290 : 342;

  const svgSize = Math.min(
    containerWidth *
      (screenClass === "mobile" ? 0.72 : screenClass === "tablet" ? 0.8 : 0.88),
    sizeCap,
    window.innerHeight *
      (screenClass === "mobile" ? 0.44 : screenClass === "tablet" ? 0.6 : 0.72)
  );

  const isMobile = screenClass === "mobile";

  const [leftOff, setLeftOff] = useState({ x: 0, y: 0 });
  const [rightOff, setRightOff] = useState({ x: 0, y: 0 });
  /* Subtle head shift toward cursor */
  const [headShift, setHeadShift] = useState({ x: 0, y: 0 });

  const [expr, setExpr] = useState<Expression>("neutral");
  const [winkSide, setWinkSide] = useState<"left" | "right">("left");
  const [blink, setBlink] = useState(false);
  const [waving, setWaving] = useState(false);
  const [showHello, setShowHello] = useState(false);
  const [isDark, setIsDark] = useState(false);

  /* Dark mode observer */
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  /* Blink */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 140);
      }, 2500 + Math.random() * 2500);
    };
    scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  /* Intro wave */
  useEffect(() => {
    const t1 = setTimeout(() => {
      setWaving(true);
      setShowHello(true);
      setExpr("charming");
    }, 600);
    const t2 = setTimeout(() => setShowHello(false), 2400);
    const t3 = setTimeout(() => {
      setWaving(false);
      setExpr("softSmile");
    }, 2600);
    const t4 = setTimeout(() => setExpr("neutral"), 3200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  /* Cursor tracking — eyes + subtle head shift, disabled on mobile */
  useEffect(() => {
    if (!cursorPos || !svgRef.current || isMobile) return;
    const sc = toSVGCoords(cursorPos.x, cursorPos.y, svgRef.current);
    setLeftOff(clampPupil(sc, 74, 108));
    setRightOff(clampPupil(sc, 126, 108));

    /* Head leans slightly toward cursor — max ±5 SVG units */
    const dx = (sc.x - 100) / 100;
    const dy = (sc.y - 130) / 130;
    setHeadShift({
      x: Math.max(-5, Math.min(5, dx * 4)),
      y: Math.max(-2.5, Math.min(2.5, dy * 2)),
    });
  }, [cursorPos, isMobile]);

  const onZone = useCallback((e: Expression, ws?: "left" | "right") => {
    setExpr(e);
    if (ws) setWinkSide(ws);
  }, []);
  const offZone = useCallback(() => setExpr("neutral"), []);

  const showBlush = showBlushFor.has(expr);
  const squint = squintFor.has(expr);
  const wideEyes = wideEyesFor.has(expr);
  const lWinked = expr === "wink" && winkSide === "left";
  const rWinked = expr === "wink" && winkSide === "right";
  const headTilt =
    expr === "thinking" || expr === "focus" ? 4 : expr === "shy" ? -3 : 0;
  const lRx = wideEyes ? 20 : squint ? 15 : 18;
  const lRy = wideEyes ? 20 : squint ? 8 : 17;
  const rRx = lRx;
  const rRy = lRy;

  const shirtLight0 = isDark ? "hsl(220,90%,55%)" : "hsl(198,78%,58%)";
  const shirtLight1 = isDark ? "hsl(245,80%,38%)" : "hsl(218,70%,42%)";

  const hintText = isMobile
    ? "✦ tap face parts"
    : "✦ hover face parts · eyes follow cursor";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-end select-none"
      style={{ minHeight: isMobile ? 200 : 280 }}
    >
      {/* Ground shadow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "65%",
          height: 34,
          background:
            "radial-gradient(ellipse at center, hsl(var(--primary)/0.26) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* Hello bubble */}
      <AnimatePresence>
        {showHello && (
          <motion.div
            key="hello"
            initial={{ opacity: 0, scale: 0.4, x: 20, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="absolute z-50 pointer-events-none"
            style={{
              top: isMobile ? "4%" : "8%",
              right: isMobile ? "4%" : "2%",
            }}
          >
            <div
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl font-bold shadow-lg backdrop-blur-sm"
              style={{
                fontSize: isMobile ? 11 : 14,
                background: "hsl(var(--card)/0.92)",
                border: "1.5px solid hsl(var(--primary)/0.4)",
                color: "hsl(var(--primary))",
                boxShadow: "0 4px 24px hsl(var(--primary)/0.18)",
              }}
            >
              Hello! 👋
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: 20,
                  width: 0,
                  height: 0,
                  borderLeft: "7px solid transparent",
                  borderRight: "7px solid transparent",
                  borderTop: "9px solid hsl(var(--card)/0.92)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Character */}
      <svg
        ref={svgRef}
        viewBox="0 0 200 340"
        style={{
          width: svgSize,
          height: "auto",
          maxWidth: "100%",
          overflow: "visible",
          display: "block",
          isolation: "isolate",
          position: "relative",
          zIndex: 10,
          touchAction: "none",
        }}
      >
        <defs>
          {/* ── Skin ── */}
          <radialGradient
            id="skinFaceHB"
            gradientUnits="userSpaceOnUse"
            cx="90"
            cy="110"
            r="130"
          >
            <stop offset="0%" stopColor="#ffd6a5" />
            <stop offset="45%" stopColor="#f4b877" />
            <stop offset="100%" stopColor="#e0924a" />
          </radialGradient>
          <radialGradient
            id="skinDarkHB"
            gradientUnits="userSpaceOnUse"
            cx="85"
            cy="120"
            r="120"
          >
            <stop offset="0%" stopColor="#f4c48a" />
            <stop offset="100%" stopColor="#d48842" />
          </radialGradient>
          <radialGradient
            id="skinNeckHB"
            gradientUnits="userSpaceOnUse"
            cx="100"
            cy="230"
            r="40"
          >
            <stop offset="0%" stopColor="#efb870" />
            <stop offset="100%" stopColor="#d47f38" />
          </radialGradient>
          <radialGradient
            id="cheekHL"
            gradientUnits="userSpaceOnUse"
            cx="40"
            cy="148"
            r="28"
          >
            <stop offset="0%" stopColor="rgba(255,220,180,0.55)" />
            <stop offset="100%" stopColor="rgba(255,220,180,0)" />
          </radialGradient>

          {/* ── Hair ── */}
          <linearGradient
            id="hairTopHB"
            x1="30"
            y1="10"
            x2="170"
            y2="110"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1e0c02" />
            <stop offset="60%" stopColor="#2a1106" />
            <stop offset="100%" stopColor="#0e0501" />
          </linearGradient>

          {/* ── Eye ── */}
          <radialGradient
            id="eyeWhiteHB"
            gradientUnits="userSpaceOnUse"
            cx="74"
            cy="104"
            r="24"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dce6f5" />
          </radialGradient>
          <radialGradient
            id="irisHB"
            gradientUnits="userSpaceOnUse"
            cx="72"
            cy="105"
            r="14"
          >
            <stop offset="0%" stopColor="#6ec8fc" />
            <stop offset="38%" stopColor="#2878e0" />
            <stop offset="78%" stopColor="#0e3a8e" />
            <stop offset="100%" stopColor="#081e50" />
          </radialGradient>

          {/* ── Shirt ── */}
          <linearGradient
            id="shirtHB"
            x1="20"
            y1="244"
            x2="180"
            y2="340"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={shirtLight0} />
            <stop offset="100%" stopColor={shirtLight1} />
          </linearGradient>
          <linearGradient
            id="shirtShadeHB"
            x1="100"
            y1="244"
            x2="100"
            y2="340"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
          </linearGradient>
          <linearGradient
            id="shirtHighlightHB"
            x1="100"
            y1="244"
            x2="100"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient
            id="glassFrameHB"
            x1="40"
            y1="91"
            x2="160"
            y2="125"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="hsl(199,89%,65%)" />
            <stop offset="100%" stopColor="hsl(220,80%,50%)" />
          </linearGradient>
          <linearGradient
            id="armGradHB"
            x1="150"
            y1="255"
            x2="210"
            y2="340"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={shirtLight0} />
            <stop offset="100%" stopColor={shirtLight1} />
          </linearGradient>

          {/* Sleeve gradient — same as shirt */}
          <linearGradient
            id="sleeveGradHB"
            x1="0"
            y1="250"
            x2="0"
            y2="310"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={shirtLight0} />
            <stop offset="100%" stopColor={shirtLight1} />
          </linearGradient>
          <linearGradient
            id="sleeveShadeHB"
            x1="0"
            y1="250"
            x2="0"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
          </linearGradient>

          {/* ── Arm skin ── */}
          <radialGradient
            id="upperArmSkin"
            gradientUnits="userSpaceOnUse"
            cx="175"
            cy="262"
            r="32"
          >
            <stop offset="0%" stopColor="#ffd6a5" />
            <stop offset="40%" stopColor="#f4b877" />
            <stop offset="80%" stopColor="#e0924a" />
            <stop offset="100%" stopColor="#c87838" />
          </radialGradient>
          <radialGradient
            id="forearmSkin"
            gradientUnits="userSpaceOnUse"
            cx="188"
            cy="238"
            r="28"
          >
            <stop offset="0%" stopColor="#fcd3a0" />
            <stop offset="45%" stopColor="#f0b06a" />
            <stop offset="85%" stopColor="#dd9040" />
            <stop offset="100%" stopColor="#c87030" />
          </radialGradient>
          <radialGradient
            id="palmSkin"
            gradientUnits="userSpaceOnUse"
            cx="204"
            cy="196"
            r="24"
          >
            <stop offset="0%" stopColor="#ffe4bc" />
            <stop offset="35%" stopColor="#f8c88a" />
            <stop offset="75%" stopColor="#e8a855" />
            <stop offset="100%" stopColor="#d08840" />
          </radialGradient>
          <radialGradient
            id="thumbSkin"
            gradientUnits="userSpaceOnUse"
            cx="183"
            cy="190"
            r="14"
          >
            <stop offset="0%" stopColor="#ffd8a8" />
            <stop offset="60%" stopColor="#e8a855" />
            <stop offset="100%" stopColor="#d08840" />
          </radialGradient>
          <radialGradient
            id="fingerSkin"
            gradientUnits="userSpaceOnUse"
            cx="204"
            cy="162"
            r="18"
          >
            <stop offset="0%" stopColor="#ffe8c4" />
            <stop offset="55%" stopColor="#f0b870" />
            <stop offset="100%" stopColor="#d89048" />
          </radialGradient>
          <radialGradient
            id="restingForearmSkin"
            gradientUnits="userSpaceOnUse"
            cx="10"
            cy="310"
            r="28"
          >
            <stop offset="0%" stopColor="#fcd3a0" />
            <stop offset="50%" stopColor="#f0b06a" />
            <stop offset="100%" stopColor="#dd9040" />
          </radialGradient>
          <linearGradient
            id="armHighlight"
            x1="168"
            y1="258"
            x2="178"
            y2="290"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(255,240,210,0.55)" />
            <stop offset="100%" stopColor="rgba(255,240,210,0)" />
          </linearGradient>
          <linearGradient
            id="forearmHighlight"
            x1="182"
            y1="230"
            x2="190"
            y2="258"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(255,240,210,0.45)" />
            <stop offset="100%" stopColor="rgba(255,240,210,0)" />
          </linearGradient>

          {/* ── Filters ── */}
          <filter
            id="faceShadowHB"
            x="-20%"
            y="-10%"
            width="140%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="9"
              floodColor="rgba(0,0,0,0.18)"
            />
          </filter>
          <filter id="shirtShadHB" x="-10%" y="-5%" width="120%" height="120%">
            <feDropShadow
              dx="0"
              dy="7"
              stdDeviation="11"
              floodColor="rgba(0,0,0,0.22)"
            />
          </filter>
          <filter id="hairShadHB" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="5"
              floodColor="rgba(0,0,0,0.4)"
            />
          </filter>

          {/* ── Clip paths ── */}
          <clipPath id="clipLHB">
            <ellipse cx="74" cy="108" rx={lRx + 2} ry={lRy + 2} />
          </clipPath>
          <clipPath id="clipRHB">
            <ellipse cx="126" cy="108" rx={rRx + 2} ry={rRy + 2} />
          </clipPath>
        </defs>

        {/* ── Floating body animation ── */}
        <motion.g
          animate={{ y: [0, -3, 0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ isolation: "isolate" }}
        >
          <rect x="0" y="0" width="200" height="340" fill="transparent" />

          {/* ════════════════ BODY + SHIRT ════════════════ */}
          <g filter="url(#shirtSadHB)">
            {/* Main shirt body */}
            <path
              d="M 24 340 L 12 292 Q 14 268 38 256 L 72 244 L 100 252 L 128 244 L 162 256 Q 186 268 188 292 L 176 340 Z"
              fill="url(#shirtHB)"
              onMouseEnter={() => onZone("attitude")}
              onMouseLeave={offZone}
              style={{ cursor: "pointer" }}
            />
            <path
              d="M 24 340 L 12 292 Q 14 268 38 256 L 72 244 L 100 252 L 128 244 L 162 256 Q 186 268 188 292 L 176 340 Z"
              fill="url(#shirtShadeHB)"
              style={{ pointerEvents: "none" }}
            />
            <path
              d="M 24 340 L 12 292 Q 14 268 38 256 L 72 244 L 100 252 L 128 244 L 162 256 Q 186 268 188 292 L 176 340 Z"
              fill="url(#shirtHighlightHB)"
              style={{ pointerEvents: "none" }}
            />
            {/* V-collar highlight */}
            <path
              d="M 80 244 L 100 270 L 120 244 L 113 242 L 100 262 L 87 242 Z"
              fill="rgba(255,255,255,0.22)"
              style={{ pointerEvents: "none" }}
            />

            {/* ════ LEFT ARM — T-shirt sleeve + forearm skin ════ */}
            {/* Forearm skin (below sleeve hem) */}
            <path
              d="M 6 296 Q 2 304 4 320 Q 4 330 10 334 L 26 336 Q 22 330 20 318 Q 18 305 14 298 Z"
              fill="url(#restingForearmSkin)"
            />
            {/* T-shirt sleeve — left arm, covers upper half */}
            <path
              d="M 12 292 Q 10 272 20 262 Q 28 254 38 256 L 72 244 L 78 250 Q 60 258 46 264 Q 32 272 22 284 Q 16 290 14 298 Z"
              fill="url(#sleeveGradHB)"
            />
            <path
              d="M 12 292 Q 10 272 20 262 Q 28 254 38 256 L 72 244 L 78 250 Q 60 258 46 264 Q 32 272 22 284 Q 16 290 14 298 Z"
              fill="url(#sleeveShadeHB)"
              style={{ pointerEvents: "none" }}
            />
            {/* Sleeve hem crease */}
            <path
              d="M 14 295 Q 20 286 34 276 Q 44 268 58 262"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{ pointerEvents: "none" }}
            />

            {/* ════ RIGHT ARM RESTING — T-shirt sleeve + forearm skin ════ */}
            {!waving && (
              <g>
                {/* Forearm skin (below sleeve hem ~y=295) */}
                <path
                  d="M 186 296 Q 192 306 190 322 Q 188 330 184 334 L 168 332 Q 174 326 176 318 Q 178 308 182 300 Z"
                  fill="url(#restingForearmSkin)"
                />
                {/* T-shirt sleeve — right arm, covers upper half */}
                <path
                  d="M 188 292 Q 190 272 180 262 Q 172 254 162 256 L 128 244 L 122 250 Q 140 258 154 264 Q 168 272 178 284 Q 184 290 186 298 Z"
                  fill="url(#sleeveGradHB)"
                />
                <path
                  d="M 188 292 Q 190 272 180 262 Q 172 254 162 256 L 128 244 L 122 250 Q 140 258 154 264 Q 168 272 178 284 Q 184 290 186 298 Z"
                  fill="url(#sleeveShadeHB)"
                  style={{ pointerEvents: "none" }}
                />
                {/* Sleeve hem crease */}
                <path
                  d="M 186 295 Q 180 286 166 276 Q 156 268 142 262"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  style={{ pointerEvents: "none" }}
                />
              </g>
            )}

            {/* ════════════════ WAVING ARM ════════════════ */}
            <AnimatePresence>
              {waving && (
                <motion.g
                  key="waveArm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30, transition: { duration: 0.5 } }}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* ── T-shirt sleeve covering upper arm ── */}
                  {/* Sleeve fabric — visible even during wave */}
                  <motion.g
                    style={{ transformOrigin: "172px 263px" }}
                    animate={{ rotate: [0, -4, 3, -3, 4, -2, 0] }}
                    transition={{
                      duration: 1.8,
                      ease: [0.45, 0.05, 0.55, 0.95],
                      times: [0, 0.15, 0.3, 0.45, 0.65, 0.85, 1],
                    }}
                  >
                    {/* Shirt sleeve cap — covers shoulder */}
                    <path
                      d="M 156 262 Q 158 254 164 252 Q 172 249 180 252 Q 188 256 190 264 Q 192 274 188 282 Q 184 289 176 292 Q 168 293 162 288 Q 156 282 155 272 Z"
                      fill="url(#sleeveGradHB)"
                    />
                    <path
                      d="M 156 262 Q 158 254 164 252 Q 172 249 180 252 Q 188 256 190 264 Q 192 274 188 282 Q 184 289 176 292 Q 168 293 162 288 Q 156 282 155 272 Z"
                      fill="url(#sleeveShadeHB)"
                      style={{ pointerEvents: "none" }}
                    />
                    {/* Sleeve crease detail */}
                    <path
                      d="M 159 278 Q 168 282 178 278"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      style={{ pointerEvents: "none" }}
                    />
                    <path
                      d="M 160 272 Q 168 275 178 272"
                      stroke="rgba(0,0,0,0.08)"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                      style={{ pointerEvents: "none" }}
                    />
                    {/* Sleeve hem edge */}
                    <path
                      d="M 156 274 Q 160 290 174 293 Q 186 293 190 282"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      style={{ pointerEvents: "none" }}
                    />

                    {/* Forearm pivot — skin starts here */}
                    <motion.g
                      style={{ transformOrigin: "174px 288px" }}
                      animate={{ rotate: [0, 5, -3, 4, -2, 0] }}
                      transition={{
                        duration: 1.8,
                        ease: [0.45, 0.05, 0.55, 0.95],
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        delay: 0.08,
                      }}
                    >
                      {/* Forearm — tapered, skin-colored */}
                      <path
                        d="M 166 290 C 163 282 161 272 163 263 C 165 254 170 248 176 246 C 182 244 189 246 193 252 C 197 258 198 266 197 274 C 196 281 193 286 189 289 C 184 292 176 292 170 291 Z"
                        fill="url(#forearmSkin)"
                      />
                      {/* Forearm highlight */}
                      <path
                        d="M 165 285 C 162 275 162 263 165 255 C 167 249 171 246 175 246"
                        stroke="rgba(255,232,195,0.48)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                      {/* Forearm shadow */}
                      <path
                        d="M 188 290 C 192 283 194 272 193 264 C 192 256 189 250 185 248"
                        stroke="rgba(0,0,0,0.10)"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      {/* Elbow knob */}
                      <ellipse
                        cx="174"
                        cy="289"
                        rx="5"
                        ry="4"
                        fill="rgba(200,130,60,0.28)"
                      />
                      <ellipse
                        cx="174"
                        cy="289"
                        rx="3"
                        ry="2.5"
                        fill="rgba(160,90,35,0.18)"
                      />

                      {/* Wrist → Hand (main wave rotation) */}
                      <motion.g
                        style={{ transformOrigin: "185px 248px" }}
                        animate={{ rotate: [0, -20, 20, -16, 16, -10, 10, 0] }}
                        transition={{
                          duration: 1.8,
                          ease: [0.34, 1.3, 0.64, 1],
                          times: [0, 0.13, 0.26, 0.4, 0.54, 0.68, 0.84, 1],
                          delay: 0.14,
                        }}
                      >
                        {/* Palm body */}
                        <path
                          d="M 174 248 C 172 242 172 235 174 229 C 176 223 181 219 187 218 C 193 217 200 219 204 224 C 208 229 209 237 208 244 C 207 250 204 254 200 256 C 195 258 187 258 182 256 C 178 254 175 252 174 248 Z"
                          fill="url(#palmSkin)"
                        />
                        {/* Palm crease lines */}
                        <path
                          d="M 176 236 Q 191 233 206 237"
                          stroke="rgba(155,85,35,0.22)"
                          strokeWidth="1.2"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 176 243 Q 190 240 206 244"
                          stroke="rgba(155,85,35,0.16)"
                          strokeWidth="1"
                          fill="none"
                          strokeLinecap="round"
                        />
                        {/* Palm sheen */}
                        <ellipse
                          cx="191"
                          cy="237"
                          rx="11"
                          ry="7"
                          fill="rgba(255,240,210,0.14)"
                        />
                        {/* Wrist crease */}
                        <path
                          d="M 175 250 Q 184 255 200 253"
                          stroke="rgba(160,88,40,0.20)"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />

                        {/* Thumb */}
                        <motion.g
                          style={{ transformOrigin: "174px 238px" }}
                          animate={{ rotate: [0, 7, -4, 5, -3, 0] }}
                          transition={{
                            duration: 1.8,
                            times: [0, 0.25, 0.5, 0.7, 0.85, 1],
                            delay: 0.2,
                          }}
                        >
                          <path
                            d="M 173 243 C 169 237 167 229 168 222 C 169 216 173 212 178 211 C 183 210 187 213 188 218 C 189 224 188 231 185 237 C 183 242 178 245 173 243 Z"
                            fill="url(#thumbSkin)"
                          />
                          <ellipse
                            cx="174"
                            cy="213"
                            rx="7"
                            ry="5.5"
                            fill="url(#palmSkin)"
                          />
                          {/* Thumbnail */}
                          <ellipse
                            cx="174"
                            cy="211"
                            rx="4"
                            ry="3"
                            fill="rgba(255,240,225,0.78)"
                            stroke="rgba(180,120,70,0.25)"
                            strokeWidth="0.5"
                          />
                          {/* Thumb knuckle */}
                          <path
                            d="M 169 230 Q 176 228 182 230"
                            stroke="rgba(155,88,42,0.22)"
                            strokeWidth="1"
                            fill="none"
                            strokeLinecap="round"
                          />
                          {/* Thumb highlight */}
                          <path
                            d="M 168 235 C 167 228 168 221 171 216"
                            stroke="rgba(255,235,200,0.46)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />
                        </motion.g>

                        {/* 4 Fingers with gentle spread */}
                        <motion.g
                          style={{ transformOrigin: "194px 220px" }}
                          animate={{
                            scaleX: [1, 0.97, 1.03, 0.97, 1.03, 1],
                            x: [0, -0.6, 0.6, -0.4, 0.4, 0],
                          }}
                          transition={{
                            duration: 1.8,
                            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                            delay: 0.17,
                          }}
                        >
                          {/* Index finger */}
                          <path
                            d="M 180 226 C 178 218 177 209 178 201 C 179 194 182 190 186 190 C 190 190 193 194 193 201 C 194 209 193 218 192 226 Z"
                            fill="url(#fingerSkin)"
                          />
                          <ellipse
                            cx="186"
                            cy="227"
                            rx="4.5"
                            ry="3"
                            fill="rgba(160,95,45,0.18)"
                          />
                          <path
                            d="M 180 216 Q 186 214 192 216"
                            stroke="rgba(155,88,42,0.22)"
                            strokeWidth="1"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 180 207 Q 186 205 192 207"
                            stroke="rgba(155,88,42,0.16)"
                            strokeWidth="0.8"
                            fill="none"
                            strokeLinecap="round"
                          />
                          {/* Fingernail */}
                          <path
                            d="M 179 193 Q 186 190 193 193 Q 191 198 186 199 Q 181 198 179 193 Z"
                            fill="rgba(255,240,225,0.75)"
                            stroke="rgba(180,120,70,0.20)"
                            strokeWidth="0.5"
                          />
                          <ellipse
                            cx="186"
                            cy="191"
                            rx="5"
                            ry="4"
                            fill="url(#fingerSkin)"
                          />
                          {/* Finger highlight */}
                          <path
                            d="M 179 220 C 178 211 178 201 180 194"
                            stroke="rgba(255,238,208,0.40)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />

                          {/* Middle finger */}
                          <path
                            d="M 191 226 C 190 217 189 207 190 199 C 191 192 194 188 198 188 C 202 188 205 192 205 199 C 206 207 205 217 204 226 Z"
                            fill="url(#fingerSkin)"
                          />
                          <ellipse
                            cx="197"
                            cy="227"
                            rx="4.5"
                            ry="3"
                            fill="rgba(160,95,45,0.18)"
                          />
                          <path
                            d="M 191 215 Q 197 213 204 215"
                            stroke="rgba(155,88,42,0.22)"
                            strokeWidth="1"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 191 205 Q 197 203 204 205"
                            stroke="rgba(155,88,42,0.16)"
                            strokeWidth="0.8"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 191 190 Q 198 187 205 190 Q 203 195 198 196 Q 193 195 191 190 Z"
                            fill="rgba(255,240,225,0.75)"
                            stroke="rgba(180,120,70,0.20)"
                            strokeWidth="0.5"
                          />
                          <ellipse
                            cx="198"
                            cy="189"
                            rx="5.5"
                            ry="4.5"
                            fill="url(#fingerSkin)"
                          />
                          <path
                            d="M 191 218 C 190 209 190 198 192 192"
                            stroke="rgba(255,238,208,0.40)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />

                          {/* Ring finger */}
                          <path
                            d="M 203 226 C 202 218 201 209 202 201 C 203 195 206 191 210 191 C 214 191 217 195 217 201 C 218 209 217 218 216 226 Z"
                            fill="url(#fingerSkin)"
                          />
                          <ellipse
                            cx="209"
                            cy="227"
                            rx="4.5"
                            ry="3"
                            fill="rgba(160,95,45,0.18)"
                          />
                          <path
                            d="M 203 215 Q 209 213 216 215"
                            stroke="rgba(155,88,42,0.22)"
                            strokeWidth="1"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 203 206 Q 209 204 216 206"
                            stroke="rgba(155,88,42,0.16)"
                            strokeWidth="0.8"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 203 193 Q 209 190 216 193 Q 214 198 210 199 Q 206 198 203 193 Z"
                            fill="rgba(255,240,225,0.75)"
                            stroke="rgba(180,120,70,0.20)"
                            strokeWidth="0.5"
                          />
                          <ellipse
                            cx="210"
                            cy="192"
                            rx="5"
                            ry="4"
                            fill="url(#fingerSkin)"
                          />
                          <path
                            d="M 203 219 C 202 210 202 200 204 194"
                            stroke="rgba(255,238,208,0.40)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />

                          {/* Pinky finger */}
                          <path
                            d="M 214 226 C 213 219 213 212 214 206 C 215 200 218 197 222 197 C 226 197 228 200 228 206 C 229 212 228 219 227 226 Z"
                            fill="url(#fingerSkin)"
                          />
                          <ellipse
                            cx="221"
                            cy="227"
                            rx="4"
                            ry="3"
                            fill="rgba(160,95,45,0.18)"
                          />
                          <path
                            d="M 214 217 Q 221 215 228 217"
                            stroke="rgba(155,88,42,0.22)"
                            strokeWidth="1"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 215 209 Q 221 207 227 209"
                            stroke="rgba(155,88,42,0.16)"
                            strokeWidth="0.8"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 215 199 Q 221 196 228 199 Q 226 204 222 205 Q 218 204 215 199 Z"
                            fill="rgba(255,240,225,0.75)"
                            stroke="rgba(180,120,70,0.20)"
                            strokeWidth="0.5"
                          />
                          <ellipse
                            cx="221"
                            cy="198"
                            rx="4.5"
                            ry="3.8"
                            fill="url(#fingerSkin)"
                          />
                          <path
                            d="M 214 220 C 213 213 213 205 215 199"
                            stroke="rgba(255,238,208,0.40)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />

                          {/* Webbing gaps */}
                          <ellipse
                            cx="191"
                            cy="228"
                            rx="1.5"
                            ry="2"
                            fill="rgba(130,70,30,0.20)"
                          />
                          <ellipse
                            cx="203"
                            cy="228"
                            rx="1.5"
                            ry="2"
                            fill="rgba(130,70,30,0.20)"
                          />
                          <ellipse
                            cx="214"
                            cy="228"
                            rx="1.5"
                            ry="2"
                            fill="rgba(130,70,30,0.20)"
                          />
                        </motion.g>
                      </motion.g>
                    </motion.g>
                  </motion.g>
                </motion.g>
              )}
            </AnimatePresence>

            <line
              x1="88"
              y1="260"
              x2="88"
              y2="300"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* ════════════════ NECK + HEAD (shift toward cursor) ════════════════ */}
          <g
            style={{
              transform: `translate(${headShift.x}px, ${headShift.y}px)`,
              transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* ════════════════ NECK ════════════════ */}
            <rect
              x="81"
              y="224"
              width="38"
              height="32"
              rx="6"
              fill="url(#skinDarkHB)"
            />
            <rect
              x="84"
              y="222"
              width="32"
              height="30"
              rx="5"
              fill="url(#skinNeckHB)"
              onMouseEnter={() => onZone("softSmile")}
              onMouseLeave={offZone}
              style={{ cursor: "pointer" }}
            />
            <ellipse
              cx="100"
              cy="224"
              rx="18"
              ry="5"
              fill="rgba(0,0,0,0.10)"
              style={{ pointerEvents: "none" }}
            />
            <path
              d="M 84 242 Q 100 252 116 242 L 116 252 Q 100 262 84 252 Z"
              fill="url(#skinNeckHB)"
              style={{ pointerEvents: "none" }}
            />
            <path
              d="M 84 222 L 84 248 Q 88 252 90 248 L 90 222 Z"
              fill="rgba(0,0,0,0.06)"
              style={{ pointerEvents: "none" }}
            />
            <path
              d="M 116 222 L 116 248 Q 112 252 110 248 L 110 222 Z"
              fill="rgba(0,0,0,0.06)"
              style={{ pointerEvents: "none" }}
            />

            {/* ════════════════ HEAD GROUP ════════════════ */}
            <g
              transform={`rotate(${headTilt}, 100, 142)`}
              style={{
                transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Ears */}
              <g
                onMouseEnter={() => onZone("laughing")}
                onMouseLeave={offZone}
                style={{ cursor: "pointer" }}
              >
                <ellipse
                  cx="20"
                  cy="118"
                  rx="13"
                  ry="18"
                  fill="url(#skinDarkHB)"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="0.5"
                />
                <ellipse cx="20" cy="118" rx="6.5" ry="10" fill="#c8804a" />
                <ellipse
                  cx="180"
                  cy="118"
                  rx="13"
                  ry="18"
                  fill="url(#skinDarkHB)"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="0.5"
                />
                <ellipse cx="180" cy="118" rx="6.5" ry="10" fill="#c8804a" />
              </g>

              {/* Face */}
              <g filter="url(#faceShadowHB)">
                <path
                  d="M 22 100 Q 20 150 36 188 Q 52 218 100 226 Q 148 218 164 188 Q 180 150 178 100 Q 170 52 100 46 Q 30 52 22 100 Z"
                  fill="url(#skinFaceHB)"
                  onMouseEnter={() => onZone("charming")}
                  onMouseLeave={offZone}
                  style={{ cursor: "pointer" }}
                />
              </g>

              {/* Face shading */}
              <ellipse
                cx="36"
                cy="138"
                rx="28"
                ry="42"
                fill="rgba(0,0,0,0.03)"
                style={{ pointerEvents: "none" }}
              />
              <ellipse
                cx="164"
                cy="138"
                rx="28"
                ry="42"
                fill="rgba(0,0,0,0.03)"
                style={{ pointerEvents: "none" }}
              />
              <ellipse
                cx="38"
                cy="150"
                rx="20"
                ry="14"
                fill="url(#cheekHL)"
                style={{ pointerEvents: "none" }}
              />
              <ellipse
                cx="162"
                cy="150"
                rx="20"
                ry="14"
                fill="url(#cheekHL)"
                style={{ pointerEvents: "none" }}
              />

              {/* ── HAIR ── */}
              <motion.g
                filter="url(#hairShadHB)"
                animate={{ y: [0, -2, 0, -1.5, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                onMouseEnter={() => onZone("bigSmile")}
                onMouseLeave={offZone}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M 24 110 Q 18 58 48 28 Q 68 10 100 7 Q 128 8 148 22 Q 172 42 176 90 Q 174 70 162 52 Q 148 36 128 28 Q 114 22 100 21 Q 82 22 66 30 Q 44 42 36 62 Q 28 80 24 110 Z"
                  fill="url(#hairTopHB)"
                />
                <path
                  d="M 30 88 Q 26 50 42 24 Q 58 4 80 -2 Q 96 -6 110 -2 Q 130 4 145 18 Q 160 34 164 60 Q 160 36 148 22 Q 130 8 110 4 Q 94 2 78 6 Q 58 12 44 28 Q 30 46 30 88 Z"
                  fill="#1a0a02"
                />
                <path
                  d="M 130 14 Q 148 6 162 -8 Q 172 -18 178 -8 Q 176 4 168 16 Q 158 28 148 34 Q 162 12 154 4 Q 146 -2 136 8 Z"
                  fill="#1e0c02"
                />
                <path
                  d="M 136 10 Q 152 0 166 -12 Q 174 -4 170 8 Q 164 20 152 28 Q 162 8 154 2 Q 148 -2 138 8 Z"
                  fill="#2a1206"
                />
                <path
                  d="M 48 40 Q 58 18 78 8 Q 96 0 116 4 Q 136 8 150 20 Q 162 30 166 48 Q 158 28 144 18 Q 128 8 110 6 Q 90 4 72 14 Q 54 24 48 40 Z"
                  fill="#241002"
                />
                <path
                  d="M 46 50 Q 60 28 82 16 Q 100 8 118 10 Q 138 14 154 28 Q 148 16 134 10 Q 116 4 98 6 Q 76 10 60 22 Q 48 32 44 50 Z"
                  fill="#200e03"
                />
                <path
                  d="M 22 108 Q 18 128 22 154 Q 20 140 24 120 Z"
                  fill="#1a0902"
                  stroke="#1a0902"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 178 108 Q 182 128 178 154 Q 180 140 176 120 Z"
                  fill="#1a0902"
                  stroke="#1a0902"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 62 28 Q 80 12 100 8 Q 118 6 134 14"
                  stroke="#2e1408"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <path
                  d="M 58 38 Q 76 20 100 14 Q 122 10 140 22"
                  stroke="#2e1408"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M 56 50 Q 72 30 98 22 Q 122 16 142 28"
                  stroke="#361a08"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <path
                  d="M 100 14 Q 112 8 126 6 Q 144 6 158 16"
                  stroke="#2e1408"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <path
                  d="M 110 8 Q 128 2 146 8 Q 158 14 164 26"
                  stroke="#2e1408"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <path
                  d="M 138 12 Q 152 2 164 -6"
                  stroke="#3a1a08"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  d="M 142 6 Q 156 -2 166 -10"
                  stroke="#3a1a08"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M 68 32 Q 90 18 114 16 Q 132 16 148 26 Q 130 18 112 18 Q 90 18 70 32 Z"
                  fill="rgba(70,35,10,0.7)"
                />
                <path
                  d="M 72 28 Q 94 16 118 14 Q 138 14 152 24 Q 136 16 116 16 Q 94 16 74 28 Z"
                  fill="rgba(100,55,20,0.4)"
                />
              </motion.g>

              {/* ── EYEBROWS ── */}
              <path
                d={eyebrowL(expr)}
                stroke="#1e0c04"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{ transition: "d 0.35s cubic-bezier(0.22,1,0.36,1)" }}
              />
              <path
                d={eyebrowR(expr)}
                stroke="#1e0c04"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{ transition: "d 0.35s cubic-bezier(0.22,1,0.36,1)" }}
              />

              {/* ── LEFT EYE ── */}
              <g
                onMouseEnter={() => onZone("wink", "left")}
                onMouseLeave={offZone}
                style={{ cursor: "pointer" }}
              >
                {lWinked ? (
                  <path
                    d="M 56 108 Q 74 120 92 108"
                    stroke="#1e0c04"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                ) : blink ? (
                  <ellipse
                    cx="74"
                    cy="108"
                    rx={lRx}
                    ry={2}
                    fill="url(#skinFaceHB)"
                    stroke="#1e0c04"
                    strokeWidth="1.5"
                  />
                ) : (
                  <>
                    <ellipse
                      cx="74"
                      cy="108"
                      rx={lRx}
                      ry={lRy}
                      fill="url(#eyeWhiteHB)"
                      stroke="rgba(0,0,0,0.06)"
                      strokeWidth="0.5"
                    />
                    {!squint ? (
                      <g clipPath="url(#clipLHB)">
                        <circle
                          cx={74 + leftOff.x}
                          cy={108 + leftOff.y}
                          r="12"
                          fill="url(#irisHB)"
                        />
                        <circle
                          cx={74 + leftOff.x}
                          cy={108 + leftOff.y}
                          r="8"
                          fill="#061840"
                        />
                        <circle
                          cx={74 + leftOff.x - 4}
                          cy={108 + leftOff.y - 4}
                          r="3.5"
                          fill="white"
                          opacity="0.96"
                        />
                        <circle
                          cx={74 + leftOff.x + 3}
                          cy={108 + leftOff.y + 3}
                          r="1.8"
                          fill="white"
                          opacity="0.5"
                        />
                        <circle
                          cx={74 + leftOff.x}
                          cy={108 + leftOff.y}
                          r="12"
                          fill="none"
                          stroke="#081830"
                          strokeWidth="1.5"
                          opacity="0.45"
                        />
                      </g>
                    ) : (
                      <>
                        <path
                          d={`M 56 108 Q 74 ${108 + lRy + 7} 92 108`}
                          fill="#f4b877"
                        />
                        <path
                          d="M 58 106 Q 74 117 90 106"
                          stroke="#1e0c04"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </>
                    )}
                    <path
                      d="M 58 118 Q 74 125 90 118"
                      stroke="rgba(190,130,80,0.3)"
                      strokeWidth="1"
                      fill="none"
                    />
                    <path
                      d="M 56 101 Q 74 96 92 101"
                      stroke="rgba(0,0,0,0.12)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </>
                )}
              </g>

              {/* ── RIGHT EYE ── */}
              <g
                onMouseEnter={() => onZone("surprised")}
                onMouseLeave={offZone}
                style={{ cursor: "pointer" }}
              >
                {rWinked ? (
                  <path
                    d="M 108 108 Q 126 120 144 108"
                    stroke="#1e0c04"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                ) : blink ? (
                  <ellipse
                    cx="126"
                    cy="108"
                    rx={rRx}
                    ry={2}
                    fill="url(#skinFaceHB)"
                    stroke="#1e0c04"
                    strokeWidth="1.5"
                  />
                ) : (
                  <>
                    <ellipse
                      cx="126"
                      cy="108"
                      rx={rRx}
                      ry={rRy}
                      fill="url(#eyeWhiteHB)"
                      stroke="rgba(0,0,0,0.06)"
                      strokeWidth="0.5"
                    />
                    {!squint ? (
                      <g clipPath="url(#clipRHB)">
                        <circle
                          cx={126 + rightOff.x}
                          cy={108 + rightOff.y}
                          r="12"
                          fill="url(#irisHB)"
                        />
                        <circle
                          cx={126 + rightOff.x}
                          cy={108 + rightOff.y}
                          r="8"
                          fill="#061840"
                        />
                        <circle
                          cx={126 + rightOff.x - 4}
                          cy={108 + rightOff.y - 4}
                          r="3.5"
                          fill="white"
                          opacity="0.96"
                        />
                        <circle
                          cx={126 + rightOff.x + 3}
                          cy={108 + rightOff.y + 3}
                          r="1.8"
                          fill="white"
                          opacity="0.5"
                        />
                        <circle
                          cx={126 + rightOff.x}
                          cy={108 + rightOff.y}
                          r="12"
                          fill="none"
                          stroke="#081830"
                          strokeWidth="1.5"
                          opacity="0.45"
                        />
                      </g>
                    ) : (
                      <>
                        <path
                          d={`M 108 108 Q 126 ${108 + rRy + 7} 144 108`}
                          fill="#f4b877"
                        />
                        <path
                          d="M 110 106 Q 126 117 142 106"
                          stroke="#1e0c04"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </>
                    )}
                    <path
                      d="M 110 118 Q 126 125 142 118"
                      stroke="rgba(190,130,80,0.3)"
                      strokeWidth="1"
                      fill="none"
                    />
                    <path
                      d="M 108 101 Q 126 96 144 101"
                      stroke="rgba(0,0,0,0.12)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </>
                )}
              </g>

              {/* ── NOSE ── */}
              <g
                onMouseEnter={() => onZone("thinking")}
                onMouseLeave={offZone}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M 95 128 Q 89 148 91 162"
                  stroke="rgba(160,95,45,0.4)"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 105 128 Q 111 148 109 162"
                  stroke="rgba(160,95,45,0.4)"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 91 160 Q 88 168 93 172 Q 100 176 107 172 Q 112 168 109 160 Q 105 164 100 165 Q 95 164 91 160 Z"
                  fill="rgba(210,130,70,0.22)"
                  stroke="rgba(160,90,40,0.3)"
                  strokeWidth="1"
                />
                <path
                  d="M 92 168 Q 88 172 90 174 Q 93 177 97 174 Q 99 171 97 168 Q 95 166 92 168 Z"
                  fill="rgba(0,0,0,0.13)"
                />
                <path
                  d="M 108 168 Q 112 172 110 174 Q 107 177 103 174 Q 101 171 103 168 Q 105 166 108 168 Z"
                  fill="rgba(0,0,0,0.13)"
                />
                <ellipse
                  cx="100"
                  cy="164"
                  rx="5"
                  ry="4"
                  fill="rgba(255,220,170,0.28)"
                />
              </g>

              {/* ── BLUSH ── */}
              <AnimatePresence>
                {showBlush && (
                  <>
                    <motion.ellipse
                      key="bL"
                      cx="40"
                      cy="150"
                      rx="20"
                      ry="12"
                      fill="rgba(255,100,80,0.15)"
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                    />
                    <motion.ellipse
                      key="bR"
                      cx="160"
                      cy="150"
                      rx="20"
                      ry="12"
                      fill="rgba(255,100,80,0.15)"
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                    />
                    {(expr === "charming" ||
                      expr === "playful" ||
                      expr === "excited") && (
                      <>
                        <motion.circle
                          key="sp1"
                          cx="34"
                          cy="144"
                          r="2"
                          fill="rgba(255,180,120,0.55)"
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.55, 1, 0.55],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        <motion.circle
                          key="sp2"
                          cx="166"
                          cy="144"
                          r="2"
                          fill="rgba(255,180,120,0.55)"
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.55, 1, 0.55],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </AnimatePresence>

              {/* ── MOUTH — always closed ── */}
              <g
                onMouseEnter={() => onZone("charming")}
                onMouseLeave={offZone}
                style={{ cursor: "pointer" }}
              >
                <path
                  d={getMouth(expr)}
                  stroke="#a85030"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ transition: "d 0.38s cubic-bezier(0.22,1,0.36,1)" }}
                />
                {/* Subtle lip underline */}
                <path
                  d={getMouth(expr)}
                  stroke="rgba(160,80,50,0.18)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ transition: "d 0.38s cubic-bezier(0.22,1,0.36,1)" }}
                />
                {/* Upper lip line for smiles */}
                {(expr === "bigSmile" ||
                  expr === "happy" ||
                  expr === "charming" ||
                  expr === "laughing") && (
                  <path
                    d={
                      expr === "bigSmile" || expr === "charming"
                        ? "M 70 184 Q 85 181 100 188 Q 115 181 130 184"
                        : "M 72 184 Q 86 181 100 186 Q 114 181 128 184"
                    }
                    stroke="#a85030"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </g>

              <ellipse
                cx="100"
                cy="218"
                rx="9"
                ry="4"
                fill="rgba(0,0,0,0.04)"
                style={{ pointerEvents: "none" }}
              />

              {/* Dimples */}
              <AnimatePresence>
                {(expr === "charming" ||
                  expr === "bigSmile" ||
                  expr === "happy" ||
                  expr === "softSmile") && (
                  <>
                    <motion.ellipse
                      key="dL"
                      cx="62"
                      cy="194"
                      rx="5"
                      ry="3.5"
                      fill="rgba(0,0,0,0.08)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                    <motion.ellipse
                      key="dR"
                      cx="138"
                      cy="194"
                      rx="5"
                      ry="3.5"
                      fill="rgba(0,0,0,0.08)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Focus wrinkle */}
              <AnimatePresence>
                {(expr === "thinking" || expr === "focus") && (
                  <>
                    <motion.path
                      key="fc1"
                      d="M 90 90 Q 94 86 98 90"
                      stroke="rgba(160,90,40,0.45)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                    <motion.path
                      key="fc2"
                      d="M 102 90 Q 106 86 110 90"
                      stroke="rgba(160,90,40,0.45)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Tears */}
              <AnimatePresence>
                {expr === "sad" && (
                  <>
                    <motion.ellipse
                      key="tL"
                      cx="58"
                      cy="134"
                      rx="4"
                      ry="5"
                      fill="rgba(100,180,255,0.6)"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    />
                    <motion.ellipse
                      key="tR"
                      cx="142"
                      cy="134"
                      rx="4"
                      ry="5"
                      fill="rgba(100,180,255,0.6)"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Excitement sparks */}
              <AnimatePresence>
                {expr === "excited" && (
                  <motion.g
                    key="exc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {(
                      [
                        [-18, -18],
                        [18, -18],
                        [0, -26],
                        [-26, 0],
                        [26, 0],
                      ] as [number, number][]
                    ).map(([dx, dy], i) => (
                      <motion.circle
                        key={i}
                        cx={100 + dx}
                        cy={100 + dy}
                        r="3"
                        fill="hsl(var(--primary))"
                        opacity="0.6"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.12,
                        }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Thought bubble */}
              <AnimatePresence>
                {expr === "thinking" && (
                  <motion.g
                    key="thought"
                    initial={{ opacity: 0, scale: 0.4, x: 18 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    style={{ transformOrigin: "168px 58px" }}
                  >
                    <ellipse
                      cx="170"
                      cy="58"
                      rx="24"
                      ry="16"
                      fill="hsl(var(--card))"
                      stroke="hsl(var(--border))"
                      strokeWidth="1.5"
                    />
                    <text
                      x="170"
                      y="63"
                      textAnchor="middle"
                      fontSize="13"
                      fill="hsl(var(--primary))"
                    >
                      🤔
                    </text>
                    <circle
                      cx="152"
                      cy="76"
                      r="4"
                      fill="hsl(var(--card))"
                      stroke="hsl(var(--border))"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="144"
                      cy="84"
                      r="2.5"
                      fill="hsl(var(--card))"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Sunglasses */}
              <AnimatePresence>
                {(expr === "attitude" || expr === "cool") && (
                  <motion.g
                    key="shades"
                    initial={{ y: -120, rotate: -8, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{ y: -100, rotate: 8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <line
                      x1="26"
                      y1="107"
                      x2="40"
                      y2="107"
                      stroke="url(#glassFrameHB)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="160"
                      y1="107"
                      x2="174"
                      y2="107"
                      stroke="url(#glassFrameHB)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <rect
                      x="38"
                      y="91"
                      width="54"
                      height="34"
                      rx="10"
                      fill={
                        expr === "cool"
                          ? "rgba(0,0,0,0.55)"
                          : "rgba(0,0,0,0.90)"
                      }
                      stroke="url(#glassFrameHB)"
                      strokeWidth="2.5"
                    />
                    <rect
                      x="108"
                      y="91"
                      width="54"
                      height="34"
                      rx="10"
                      fill={
                        expr === "cool"
                          ? "rgba(0,0,0,0.55)"
                          : "rgba(0,0,0,0.90)"
                      }
                      stroke="url(#glassFrameHB)"
                      strokeWidth="2.5"
                    />
                    <line
                      x1="92"
                      y1="107"
                      x2="108"
                      y2="107"
                      stroke="url(#glassFrameHB)"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 44 97 L 58 97 L 53 108 L 43 108 Z"
                      fill="rgba(100,210,255,0.09)"
                    />
                    <path
                      d="M 114 97 L 128 97 L 123 108 L 113 108 Z"
                      fill="rgba(100,210,255,0.09)"
                    />
                    <line
                      x1="45"
                      y1="100"
                      x2="58"
                      y2="100"
                      stroke="rgba(120,230,255,0.5)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="115"
                      y1="100"
                      x2="128"
                      y2="100"
                      stroke="rgba(120,230,255,0.5)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Confident / Proud aura */}
              <AnimatePresence>
                {(expr === "proud" || expr === "confident") && (
                  <motion.ellipse
                    key="aura"
                    cx="100"
                    cy="120"
                    rx="95"
                    ry="100"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    opacity="0.18"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{
                      scale: [1, 1.04, 1],
                      opacity: [0.18, 0.28, 0.18],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "100px 120px" }}
                  />
                )}
              </AnimatePresence>
            </g>
            {/* end head group */}
          </g>
          {/* end neck+head cursor-shift group */}
        </motion.g>
      </svg>

      {/* Hint label */}
      <motion.p
        className="mt-1 text-center pointer-events-none"
        style={{
          fontSize: isMobile ? 8 : 10,
          letterSpacing: "0.05em",
          color: "hsl(var(--muted-foreground)/0.50)",
          whiteSpace: "nowrap",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        {hintText}
      </motion.p>
    </div>
  );
};

export default HeroPerson;
