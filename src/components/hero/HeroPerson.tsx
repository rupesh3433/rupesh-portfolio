import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════════ */
export type Expression =
  | "neutral" | "smile" | "happy" | "bigSmile" | "surprised"
  | "wink" | "thinking" | "attitude" | "sad" | "laughing"
  | "confident" | "playful" | "shy" | "proud" | "excited"
  | "calm" | "focus" | "charming" | "cool" | "softSmile";

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
   FACE FEATURE PATHS
══════════════════════════════════════════════════════════════════ */
function eyebrowL(expr: Expression): string {
  switch (expr) {
    case "surprised": case "excited": return "M 52 83 Q 74 70 96 80";
    case "sad": return "M 52 82 Q 74 89 96 81";
    case "thinking": case "focus": return "M 52 85 Q 74 80 96 82";
    case "happy": case "bigSmile": case "laughing": case "charming": return "M 52 79 Q 74 68 96 77";
    case "attitude": case "cool": return "M 52 88 Q 74 92 96 86";
    case "wink": return "M 52 79 Q 74 71 96 77";
    case "confident": case "proud": return "M 52 81 Q 74 74 96 80";
    case "playful": return "M 52 80 Q 74 72 96 79";
    case "shy": return "M 52 83 Q 74 79 96 82";
    case "calm": return "M 52 84 Q 74 80 96 84";
    case "softSmile": return "M 52 82 Q 74 76 96 81";
    default: return "M 52 84 Q 74 79 96 84";
  }
}

function eyebrowR(expr: Expression): string {
  switch (expr) {
    case "surprised": case "excited": return "M 104 80 Q 126 70 150 83";
    case "sad": return "M 104 81 Q 126 89 150 82";
    case "thinking": return "M 104 80 Q 126 82 150 88";
    case "focus": return "M 104 82 Q 126 80 150 84";
    case "happy": case "bigSmile": case "laughing": case "charming": return "M 104 77 Q 126 68 150 79";
    case "attitude": case "cool": return "M 104 86 Q 126 92 150 88";
    case "wink": return "M 104 81 Q 126 76 150 82";
    case "confident": case "proud": return "M 104 80 Q 126 73 150 81";
    case "playful": return "M 104 79 Q 126 72 150 80";
    case "shy": return "M 104 82 Q 126 79 150 83";
    case "calm": return "M 104 84 Q 126 80 150 84";
    case "softSmile": return "M 104 81 Q 126 76 150 82";
    default: return "M 104 84 Q 126 79 150 84";
  }
}

function getMouth(expr: Expression): string {
  switch (expr) {
    case "bigSmile": case "charming": return "M 66 185 Q 100 218 134 185";
    case "happy": return "M 70 184 Q 100 210 130 184";
    case "smile": case "softSmile": return "M 76 182 Q 100 198 124 182";
    case "laughing": case "excited": return "M 64 185 Q 100 216 136 185";
    case "surprised": return "M 87 186 Q 100 204 113 186 Q 108 196 100 198 Q 92 196 87 186 Z";
    case "sad": return "M 72 195 Q 100 180 128 195";
    case "thinking": return "M 78 185 Q 90 190 104 183 Q 116 178 126 186";
    case "attitude": return "M 74 183 Q 90 185 106 181 Q 120 178 130 184";
    case "wink": case "playful": return "M 72 183 Q 100 200 128 183";
    case "confident": case "proud": return "M 74 183 Q 100 196 126 183";
    case "shy": return "M 80 183 Q 100 193 120 183";
    case "calm": return "M 78 184 Q 100 191 122 184";
    case "focus": return "M 80 184 Q 100 188 120 184";
    case "cool": return "M 76 183 Q 92 187 104 182 Q 118 178 128 185";
    default: return "M 76 183 Q 100 194 124 183";
  }
}

const showTeethFor = new Set<Expression>(["bigSmile","happy","laughing","surprised","excited","charming","proud"]);
const showBlushFor = new Set<Expression>(["happy","bigSmile","smile","laughing","wink","shy","charming","playful","softSmile","excited"]);
const squintFor    = new Set<Expression>(["laughing","bigSmile","excited"]);
const wideEyesFor  = new Set<Expression>(["surprised","excited"]);

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
const HeroPerson = ({ cursorPos }: HeroPersonProps) => {
  const svgRef      = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width: containerWidth } = useContainerSize(containerRef as React.RefObject<HTMLDivElement>);

  /* Compute SVG display size — always proportional, capped sensibly */
  const svgSize = Math.min(containerWidth, 380, window.innerHeight * 0.75);

  const [leftOff,  setLeftOff]  = useState({ x: 0, y: 0 });
  const [rightOff, setRightOff] = useState({ x: 0, y: 0 });
  const [expr,     setExpr]     = useState<Expression>("neutral");
  const [winkSide, setWinkSide] = useState<"left"|"right">("left");
  const [blink,    setBlink]    = useState(false);
  const [waving,   setWaving]   = useState(false);
  const [showHello,setShowHello]= useState(false);
  const [isDark,   setIsDark]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Dark mode observer */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* Mobile detection */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Blink */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => { setBlink(false); scheduleBlink(); }, 140);
      }, 2500 + Math.random() * 2500);
    };
    scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  /* Intro wave */
  useEffect(() => {
    const t1 = setTimeout(() => { setWaving(true); setShowHello(true); setExpr("charming"); }, 600);
    const t2 = setTimeout(() => setShowHello(false), 2400);
    const t3 = setTimeout(() => { setWaving(false); setExpr("softSmile"); }, 2600);
    const t4 = setTimeout(() => setExpr("neutral"), 3200);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  /* Cursor tracking — disabled on touch devices */
  useEffect(() => {
    if (!cursorPos || !svgRef.current || isMobile) return;
    const sc = toSVGCoords(cursorPos.x, cursorPos.y, svgRef.current);
    setLeftOff(clampPupil(sc, 74, 108));
    setRightOff(clampPupil(sc, 126, 108));
  }, [cursorPos, isMobile]);

  const onZone = useCallback((e: Expression, ws?: "left"|"right") => {
    setExpr(e);
    if (ws) setWinkSide(ws);
  }, []);
  const offZone = useCallback(() => setExpr("neutral"), []);

  const showTeeth = showTeethFor.has(expr);
  const showBlush = showBlushFor.has(expr);
  const squint    = squintFor.has(expr);
  const wideEyes  = wideEyesFor.has(expr);
  const lWinked   = expr === "wink" && winkSide === "left";
  const rWinked   = expr === "wink" && winkSide === "right";
  const headTilt  = expr === "thinking" || expr === "focus" ? 4 : expr === "shy" ? -3 : 0;
  const lRx = wideEyes ? 20 : squint ? 15 : 18;
  const lRy = wideEyes ? 20 : squint ? 8  : 17;
  const rRx = lRx; const rRy = lRy;

  const shirtLight0 = isDark ? "hsl(220,90%,55%)" : "hsl(198,78%,58%)";
  const shirtLight1 = isDark ? "hsl(245,80%,38%)" : "hsl(218,70%,42%)";

  /* Hint label — shorter on mobile */
  const hintText = isMobile ? "✦ tap face parts" : "✦ hover face parts · eyes follow cursor";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-end select-none"
      style={{ minHeight: 260 }}
    >
      {/* Ground shadow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "65%", height: 40,
          background: "radial-gradient(ellipse at center, hsl(var(--primary)/0.26) 0%, transparent 70%)",
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
                fontSize: isMobile ? 12 : 14,
                background: "hsl(var(--card)/0.92)",
                border: "1.5px solid hsl(var(--primary)/0.4)",
                color: "hsl(var(--primary))",
                boxShadow: "0 4px 24px hsl(var(--primary)/0.18)",
              }}
            >
              Hello! 👋
              <div style={{
                position: "absolute", bottom: -8, left: 20,
                width: 0, height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "9px solid hsl(var(--card)/0.92)",
              }} />
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
          <radialGradient id="skinFaceHB" gradientUnits="userSpaceOnUse" cx="90" cy="110" r="130">
            <stop offset="0%"   stopColor="#ffd6a5" />
            <stop offset="45%"  stopColor="#f4b877" />
            <stop offset="100%" stopColor="#e0924a" />
          </radialGradient>
          <radialGradient id="skinDarkHB" gradientUnits="userSpaceOnUse" cx="85" cy="120" r="120">
            <stop offset="0%"   stopColor="#f4c48a" />
            <stop offset="100%" stopColor="#d48842" />
          </radialGradient>
          <radialGradient id="skinNeckHB" gradientUnits="userSpaceOnUse" cx="100" cy="230" r="40">
            <stop offset="0%"   stopColor="#efb870" />
            <stop offset="100%" stopColor="#d47f38" />
          </radialGradient>
          <radialGradient id="cheekHL" gradientUnits="userSpaceOnUse" cx="40" cy="148" r="28">
            <stop offset="0%"   stopColor="rgba(255,220,180,0.55)" />
            <stop offset="100%" stopColor="rgba(255,220,180,0)" />
          </radialGradient>

          {/* ── Hair ── */}
          <linearGradient id="hairTopHB" x1="30" y1="10" x2="170" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#1e0c02" />
            <stop offset="60%"  stopColor="#2a1106" />
            <stop offset="100%" stopColor="#0e0501" />
          </linearGradient>

          {/* ── Eye ── */}
          <radialGradient id="eyeWhiteHB" gradientUnits="userSpaceOnUse" cx="74" cy="104" r="24">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dce6f5" />
          </radialGradient>
          <radialGradient id="irisHB" gradientUnits="userSpaceOnUse" cx="72" cy="105" r="14">
            <stop offset="0%"   stopColor="#6ec8fc" />
            <stop offset="38%"  stopColor="#2878e0" />
            <stop offset="78%"  stopColor="#0e3a8e" />
            <stop offset="100%" stopColor="#081e50" />
          </radialGradient>

          {/* ── Shirt ── */}
          <linearGradient id="shirtHB" x1="20" y1="244" x2="180" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={shirtLight0} />
            <stop offset="100%" stopColor={shirtLight1} />
          </linearGradient>
          <linearGradient id="shirtShadeHB" x1="100" y1="244" x2="100" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
          </linearGradient>
          <linearGradient id="shirtHighlightHB" x1="100" y1="244" x2="100" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="glassFrameHB" x1="40" y1="91" x2="160" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="hsl(199,89%,65%)" />
            <stop offset="100%" stopColor="hsl(220,80%,50%)" />
          </linearGradient>
          <linearGradient id="armGradHB" x1="150" y1="255" x2="210" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={shirtLight0} />
            <stop offset="100%" stopColor={shirtLight1} />
          </linearGradient>

          {/* ── Arm skin ── */}
          <radialGradient id="upperArmSkin" gradientUnits="userSpaceOnUse" cx="175" cy="262" r="32">
            <stop offset="0%"   stopColor="#ffd6a5" />
            <stop offset="40%"  stopColor="#f4b877" />
            <stop offset="80%"  stopColor="#e0924a" />
            <stop offset="100%" stopColor="#c87838" />
          </radialGradient>
          <radialGradient id="forearmSkin" gradientUnits="userSpaceOnUse" cx="188" cy="238" r="28">
            <stop offset="0%"   stopColor="#fcd3a0" />
            <stop offset="45%"  stopColor="#f0b06a" />
            <stop offset="85%"  stopColor="#dd9040" />
            <stop offset="100%" stopColor="#c87030" />
          </radialGradient>
          <radialGradient id="palmSkin" gradientUnits="userSpaceOnUse" cx="204" cy="196" r="24">
            <stop offset="0%"   stopColor="#ffe4bc" />
            <stop offset="35%"  stopColor="#f8c88a" />
            <stop offset="75%"  stopColor="#e8a855" />
            <stop offset="100%" stopColor="#d08840" />
          </radialGradient>
          <radialGradient id="thumbSkin" gradientUnits="userSpaceOnUse" cx="183" cy="190" r="14">
            <stop offset="0%"   stopColor="#ffd8a8" />
            <stop offset="60%"  stopColor="#e8a855" />
            <stop offset="100%" stopColor="#d08840" />
          </radialGradient>
          <radialGradient id="fingerSkin" gradientUnits="userSpaceOnUse" cx="204" cy="162" r="18">
            <stop offset="0%"   stopColor="#ffe8c4" />
            <stop offset="55%"  stopColor="#f0b870" />
            <stop offset="100%" stopColor="#d89048" />
          </radialGradient>
          <linearGradient id="armHighlight" x1="168" y1="258" x2="178" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(255,240,210,0.55)" />
            <stop offset="100%" stopColor="rgba(255,240,210,0)" />
          </linearGradient>
          <linearGradient id="forearmHighlight" x1="182" y1="230" x2="190" y2="258" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(255,240,210,0.45)" />
            <stop offset="100%" stopColor="rgba(255,240,210,0)" />
          </linearGradient>

          {/* ── Filters ── */}
          <filter id="faceShadowHB" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="rgba(0,0,0,0.18)" />
          </filter>
          <filter id="shirtSadHB" x="-10%" y="-5%" width="120%" height="120%">
            <feDropShadow dx="0" dy="7" stdDeviation="11" floodColor="rgba(0,0,0,0.22)" />
          </filter>
          <filter id="shirtSadHB2" x="-10%" y="-5%" width="120%" height="120%">
            <feDropShadow dx="0" dy="7" stdDeviation="11" floodColor="rgba(0,0,0,0.22)" />
          </filter>
          <filter id="shirtShadHB" x="-10%" y="-5%" width="120%" height="120%">
            <feDropShadow dx="0" dy="7" stdDeviation="11" floodColor="rgba(0,0,0,0.22)" />
          </filter>
          <filter id="hairShadHB" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="rgba(0,0,0,0.4)" />
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
          <g filter="url(#shirtShadHB)">
            <path
              d="M 24 340 L 12 292 Q 14 268 38 256 L 72 244 L 100 252 L 128 244 L 162 256 Q 186 268 188 292 L 176 340 Z"
              fill="url(#shirtHB)"
              onMouseEnter={() => onZone("attitude")}
              onMouseLeave={offZone}
              style={{ cursor: "pointer" }}
            />
            <path d="M 24 340 L 12 292 Q 14 268 38 256 L 72 244 L 100 252 L 128 244 L 162 256 Q 186 268 188 292 L 176 340 Z"
              fill="url(#shirtShadeHB)" style={{ pointerEvents: "none" }} />
            <path d="M 24 340 L 12 292 Q 14 268 38 256 L 72 244 L 100 252 L 128 244 L 162 256 Q 186 268 188 292 L 176 340 Z"
              fill="url(#shirtHighlightHB)" style={{ pointerEvents: "none" }} />
            {/* V-collar highlight */}
            <path d="M 80 244 L 100 270 L 120 244 L 113 242 L 100 262 L 87 242 Z"
              fill="rgba(255,255,255,0.22)" style={{ pointerEvents: "none" }} />
            {/* Left arm resting */}
            <path d="M 12 292 Q 2 297 4 332 L 26 336" fill="url(#shirtHB)" />

            {/* Right arm — resting */}
            {!waving && (
              <path
                d="M 174 265 Q 190 274 194 305 Q 196 320 190 334 L 174 332 Q 180 318 178 305 Q 174 276 160 268 Z"
                fill="url(#armGradHB)"
              />
            )}

            {/* ════════════════ WAVING ARM ════════════════ */}
            <AnimatePresence>
              {waving && (
                <motion.g
                  key="waveArm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Sleeve shadow */}
                  <path
                    d="M 158 252 Q 170 248 180 254 Q 188 260 186 272 Q 180 266 172 264 Q 164 262 158 266 Z"
                    fill="rgba(0,0,0,0.13)" style={{ pointerEvents: "none" }}
                  />
                  {/* Shoulder cap */}
                  <ellipse cx="172" cy="261" rx="16" ry="13" fill="url(#upperArmSkin)" />
                  {/* Sleeve overlap */}
                  <path
                    d="M 158 258 Q 164 252 176 252 Q 184 254 186 262 Q 180 256 172 256 Q 164 258 160 264 Z"
                    fill="url(#armGradHB)" style={{ pointerEvents: "none" }}
                  />

                  {/* Shoulder → Upper arm */}
                  <motion.g
                    style={{ transformOrigin: "172px 263px" }}
                    animate={{ rotate: [0, -4, 3, -3, 4, -2, 0] }}
                    transition={{ duration: 1.6, ease: [0.45, 0.05, 0.55, 0.95], times: [0, 0.15, 0.3, 0.45, 0.65, 0.85, 1] }}
                  >
                    {/* Upper arm — bicep bulge */}
                    <path
                      d="M 162 263 C 158 260 155 254 157 248 C 158 242 162 238 168 236 C 173 234 179 235 183 238 C 188 242 189 248 188 254 C 187 258 184 261 181 263 Z"
                      fill="url(#upperArmSkin)"
                    />
                    <path d="M 162 258 C 160 252 160 244 164 239"
                      stroke="rgba(255,230,190,0.50)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    <path d="M 181 263 C 184 258 186 250 184 244 C 182 238 178 236 175 237"
                      stroke="rgba(0,0,0,0.10)" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M 162 263 C 158 258 155 250 158 243 C 160 238 164 236 168 236"
                      fill="none" stroke="url(#armHighlight)" strokeWidth="5" strokeLinecap="round" />
                    {/* Elbow knob */}
                    <ellipse cx="185" cy="251" rx="5" ry="4" fill="rgba(200,130,60,0.30)" />
                    <ellipse cx="185" cy="251" rx="3" ry="2.5" fill="rgba(160,90,35,0.20)" />

                    {/* Forearm pivot */}
                    <motion.g
                      style={{ transformOrigin: "183px 251px" }}
                      animate={{ rotate: [0, 6, -4, 5, -3, 0] }}
                      transition={{ duration: 1.6, ease: [0.45, 0.05, 0.55, 0.95], times: [0, 0.2, 0.4, 0.6, 0.8, 1], delay: 0.07 }}
                    >
                      {/* Forearm — tapered S-curve */}
                      <path
                        d="M 176 255 C 173 248 172 240 174 233 C 176 226 180 221 185 218 C 189 215 194 214 198 215 C 202 216 205 219 206 223 C 207 228 206 234 204 240 C 202 246 199 250 196 252 C 192 254 186 256 181 255 Z"
                        fill="url(#forearmSkin)"
                      />
                      <path d="M 174 252 C 171 244 171 234 174 227 C 176 222 180 219 184 218"
                        stroke="rgba(255,230,185,0.45)" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <path d="M 195 253 C 198 248 202 241 203 234 C 204 228 203 222 200 218"
                        stroke="rgba(0,0,0,0.09)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                      <path d="M 175 249 C 173 242 173 233 176 227"
                        fill="none" stroke="url(#forearmHighlight)" strokeWidth="4" strokeLinecap="round" />
                      <path d="M 183 218 Q 193 215 200 218" stroke="rgba(160,88,40,0.22)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <path d="M 184 221 Q 194 218 201 221" stroke="rgba(160,88,40,0.14)" strokeWidth="1" fill="none" strokeLinecap="round" />

                      {/* Wrist → Hand (main wave rotation) */}
                      <motion.g
                        style={{ transformOrigin: "193px 214px" }}
                        animate={{ rotate: [0, -18, 18, -15, 15, -10, 10, 0] }}
                        transition={{ duration: 1.6, ease: [0.34, 1.3, 0.64, 1], times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.85, 1], delay: 0.13 }}
                      >
                        {/* Palm body */}
                        <path
                          d="M 182 216 C 180 210 180 204 182 199 C 184 194 188 191 193 190 C 198 189 204 190 208 194 C 212 198 213 204 212 210 C 211 215 208 219 204 221 C 199 223 193 223 188 221 C 185 220 183 218 182 216 Z"
                          fill="url(#palmSkin)"
                        />
                        <ellipse cx="186" cy="208" rx="6" ry="9"  fill="rgba(255,210,160,0.28)" />
                        <ellipse cx="208" cy="210" rx="5" ry="7"  fill="rgba(180,110,50,0.15)" />
                        <ellipse cx="197" cy="208" rx="7" ry="5"  fill="rgba(180,110,50,0.10)" />
                        <path d="M 184 204 Q 198 201 210 205" stroke="rgba(155,85,35,0.22)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                        <path d="M 184 210 Q 196 207 209 211" stroke="rgba(155,85,35,0.16)" strokeWidth="1"   fill="none" strokeLinecap="round" />
                        <path d="M 186 195 Q 193 192 200 194" stroke="rgba(255,240,210,0.55)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                        {/* Thumb */}
                        <motion.g
                          style={{ transformOrigin: "182px 206px" }}
                          animate={{ rotate: [0, 8, -5, 6, -3, 0] }}
                          transition={{ duration: 1.6, times: [0, 0.25, 0.5, 0.7, 0.85, 1], delay: 0.18 }}
                        >
                          <path
                            d="M 181 212 C 177 208 174 202 175 196 C 176 191 179 188 183 187 C 187 186 190 188 191 192 C 192 196 191 201 189 205 C 187 209 184 212 181 212 Z"
                            fill="url(#thumbSkin)"
                          />
                          <ellipse cx="180" cy="189" rx="7" ry="6" fill="url(#palmSkin)" />
                          <ellipse cx="180" cy="187" rx="4" ry="3" fill="rgba(255,240,225,0.75)" stroke="rgba(180,120,70,0.25)" strokeWidth="0.6" />
                          <path d="M 177 199 Q 183 197 189 199" stroke="rgba(155,88,42,0.25)" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d="M 176 202 C 175 197 176 192 178 189" stroke="rgba(255,235,200,0.48)" strokeWidth="2" fill="none" strokeLinecap="round" />
                        </motion.g>

                        {/* 4 Fingers */}
                        <motion.g
                          style={{ transformOrigin: "200px 190px" }}
                          animate={{ scaleX: [1, 0.96, 1.04, 0.97, 1.03, 1], x: [0, -0.8, 0.8, -0.5, 0.5, 0] }}
                          transition={{ duration: 1.6, times: [0, 0.2, 0.4, 0.6, 0.8, 1], delay: 0.16 }}
                        >
                          {/* Index */}
                          <path d="M 188 196 C 186 189 185 181 186 174 C 187 168 190 164 193 164 C 196 164 198 168 198 174 C 199 181 198 189 197 196 Z" fill="url(#fingerSkin)" />
                          <ellipse cx="193" cy="196" rx="4.5" ry="3" fill="rgba(160,95,45,0.18)" />
                          <path d="M 188 187 Q 193 185 198 187" stroke="rgba(155,88,42,0.22)" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d="M 188 178 Q 193 176 198 178" stroke="rgba(155,88,42,0.16)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                          <path d="M 187 167 Q 193 164 198 167 Q 196 172 193 173 Q 190 172 187 167 Z" fill="rgba(255,240,225,0.78)" stroke="rgba(180,120,70,0.22)" strokeWidth="0.5" />
                          <ellipse cx="193" cy="165" rx="5" ry="4" fill="url(#fingerSkin)" />
                          <path d="M 187 190 C 186 183 186 174 187 168" stroke="rgba(255,238,208,0.42)" strokeWidth="2" fill="none" strokeLinecap="round" />

                          {/* Middle */}
                          <path d="M 197 196 C 196 188 195 179 196 171 C 197 165 200 161 203 161 C 206 161 209 165 209 171 C 210 179 209 188 208 196 Z" fill="url(#fingerSkin)" />
                          <ellipse cx="203" cy="196" rx="4.5" ry="3" fill="rgba(160,95,45,0.18)" />
                          <path d="M 197 186 Q 203 184 209 186" stroke="rgba(155,88,42,0.22)" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d="M 197 176 Q 203 174 209 176" stroke="rgba(155,88,42,0.16)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                          <path d="M 197 163 Q 203 160 209 163 Q 207 168 203 169 Q 199 168 197 163 Z" fill="rgba(255,240,225,0.78)" stroke="rgba(180,120,70,0.22)" strokeWidth="0.5" />
                          <ellipse cx="203" cy="162" rx="5.5" ry="4.5" fill="url(#fingerSkin)" />
                          <path d="M 197 190 C 196 182 196 172 197 165" stroke="rgba(255,238,208,0.42)" strokeWidth="2" fill="none" strokeLinecap="round" />

                          {/* Ring */}
                          <path d="M 207 196 C 206 189 206 181 207 174 C 208 168 211 164 214 164 C 217 164 219 168 219 174 C 220 181 219 189 218 196 Z" fill="url(#fingerSkin)" />
                          <ellipse cx="213" cy="196" rx="4.5" ry="3" fill="rgba(160,95,45,0.18)" />
                          <path d="M 207 187 Q 213 185 219 187" stroke="rgba(155,88,42,0.22)" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d="M 208 178 Q 213 176 219 178" stroke="rgba(155,88,42,0.16)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                          <path d="M 208 166 Q 213 163 219 166 Q 217 171 213 172 Q 209 171 208 166 Z" fill="rgba(255,240,225,0.78)" stroke="rgba(180,120,70,0.22)" strokeWidth="0.5" />
                          <ellipse cx="213" cy="165" rx="5" ry="4" fill="url(#fingerSkin)" />
                          <path d="M 207 190 C 206 183 206 174 208 167" stroke="rgba(255,238,208,0.42)" strokeWidth="2" fill="none" strokeLinecap="round" />

                          {/* Pinky */}
                          <path d="M 217 197 C 216 191 216 184 217 178 C 218 173 221 170 224 170 C 227 170 229 173 229 178 C 230 184 229 191 228 197 Z" fill="url(#fingerSkin)" />
                          <ellipse cx="223" cy="197" rx="4" ry="3" fill="rgba(160,95,45,0.18)" />
                          <path d="M 217 189 Q 223 187 229 189" stroke="rgba(155,88,42,0.22)" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d="M 218 181 Q 223 179 228 181" stroke="rgba(155,88,42,0.16)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                          <path d="M 218 172 Q 223 169 228 172 Q 226 177 223 178 Q 220 177 218 172 Z" fill="rgba(255,240,225,0.78)" stroke="rgba(180,120,70,0.22)" strokeWidth="0.5" />
                          <ellipse cx="223" cy="171" rx="4.5" ry="3.8" fill="url(#fingerSkin)" />
                          <path d="M 217 192 C 216 186 216 178 218 172" stroke="rgba(255,238,208,0.42)" strokeWidth="2" fill="none" strokeLinecap="round" />

                          {/* Webbing gaps */}
                          <ellipse cx="198" cy="197" rx="1.5" ry="2" fill="rgba(130,70,30,0.22)" />
                          <ellipse cx="208" cy="197" rx="1.5" ry="2" fill="rgba(130,70,30,0.22)" />
                          <ellipse cx="218" cy="197" rx="1.5" ry="2" fill="rgba(130,70,30,0.22)" />
                        </motion.g>

                        {/* Palm sheen */}
                        <ellipse cx="197" cy="202" rx="12" ry="8" fill="rgba(255,240,210,0.14)" />
                      </motion.g>
                    </motion.g>
                  </motion.g>
                </motion.g>
              )}
            </AnimatePresence>

            <line x1="88" y1="260" x2="88" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* ════════════════ NECK ════════════════ */}
          <rect x="81" y="224" width="38" height="32" rx="6" fill="url(#skinDarkHB)" />
          <rect x="84" y="222" width="32" height="30" rx="5"
            fill="url(#skinNeckHB)"
            onMouseEnter={() => onZone("softSmile")} onMouseLeave={offZone}
            style={{ cursor: "pointer" }}
          />
          <ellipse cx="100" cy="224" rx="18" ry="5" fill="rgba(0,0,0,0.10)" style={{ pointerEvents: "none" }} />
          <path d="M 84 242 Q 100 252 116 242 L 116 252 Q 100 262 84 252 Z" fill="url(#skinNeckHB)" style={{ pointerEvents: "none" }} />
          <path d="M 84 222 L 84 248 Q 88 252 90 248 L 90 222 Z" fill="rgba(0,0,0,0.06)" style={{ pointerEvents: "none" }} />
          <path d="M 116 222 L 116 248 Q 112 252 110 248 L 110 222 Z" fill="rgba(0,0,0,0.06)" style={{ pointerEvents: "none" }} />

          {/* ════════════════ HEAD GROUP ════════════════ */}
          <g
            transform={`rotate(${headTilt}, 100, 142)`}
            style={{ transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)" }}
          >
            {/* Ears */}
            <g onMouseEnter={() => onZone("laughing")} onMouseLeave={offZone} style={{ cursor: "pointer" }}>
              <ellipse cx="20" cy="118" rx="13" ry="18" fill="url(#skinDarkHB)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
              <ellipse cx="20" cy="118" rx="6.5" ry="10" fill="#c8804a" />
              <ellipse cx="180" cy="118" rx="13" ry="18" fill="url(#skinDarkHB)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
              <ellipse cx="180" cy="118" rx="6.5" ry="10" fill="#c8804a" />
            </g>

            {/* Face */}
            <g filter="url(#faceShadowHB)">
              <path
                d="M 22 100 Q 20 150 36 188 Q 52 218 100 226 Q 148 218 164 188 Q 180 150 178 100 Q 170 52 100 46 Q 30 52 22 100 Z"
                fill="url(#skinFaceHB)"
                onMouseEnter={() => onZone("charming")} onMouseLeave={offZone}
                style={{ cursor: "pointer" }}
              />
            </g>

            {/* Face shading */}
            <ellipse cx="36"  cy="138" rx="28" ry="42" fill="rgba(0,0,0,0.03)" style={{ pointerEvents: "none" }} />
            <ellipse cx="164" cy="138" rx="28" ry="42" fill="rgba(0,0,0,0.03)" style={{ pointerEvents: "none" }} />
            <ellipse cx="38"  cy="150" rx="20" ry="14" fill="url(#cheekHL)"     style={{ pointerEvents: "none" }} />
            <ellipse cx="162" cy="150" rx="20" ry="14" fill="url(#cheekHL)"     style={{ pointerEvents: "none" }} />

            {/* ── HAIR ── */}
            <motion.g
              filter="url(#hairShadHB)"
              animate={{ y: [0, -2, 0, -1.5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={() => onZone("bigSmile")} onMouseLeave={offZone}
              style={{ cursor: "pointer" }}
            >
              <path d="M 24 110 Q 18 58 48 28 Q 68 10 100 7 Q 128 8 148 22 Q 172 42 176 90 Q 174 70 162 52 Q 148 36 128 28 Q 114 22 100 21 Q 82 22 66 30 Q 44 42 36 62 Q 28 80 24 110 Z" fill="url(#hairTopHB)" />
              <path d="M 30 88 Q 26 50 42 24 Q 58 4 80 -2 Q 96 -6 110 -2 Q 130 4 145 18 Q 160 34 164 60 Q 160 36 148 22 Q 130 8 110 4 Q 94 2 78 6 Q 58 12 44 28 Q 30 46 30 88 Z" fill="#1a0a02" />
              <path d="M 130 14 Q 148 6 162 -8 Q 172 -18 178 -8 Q 176 4 168 16 Q 158 28 148 34 Q 162 12 154 4 Q 146 -2 136 8 Z" fill="#1e0c02" />
              <path d="M 136 10 Q 152 0 166 -12 Q 174 -4 170 8 Q 164 20 152 28 Q 162 8 154 2 Q 148 -2 138 8 Z" fill="#2a1206" />
              <path d="M 48 40 Q 58 18 78 8 Q 96 0 116 4 Q 136 8 150 20 Q 162 30 166 48 Q 158 28 144 18 Q 128 8 110 6 Q 90 4 72 14 Q 54 24 48 40 Z" fill="#241002" />
              <path d="M 46 50 Q 60 28 82 16 Q 100 8 118 10 Q 138 14 154 28 Q 148 16 134 10 Q 116 4 98 6 Q 76 10 60 22 Q 48 32 44 50 Z" fill="#200e03" />
              <path d="M 22 108 Q 18 128 22 154 Q 20 140 24 120 Z" fill="#1a0902" stroke="#1a0902" strokeWidth="8" strokeLinecap="round" />
              <path d="M 178 108 Q 182 128 178 154 Q 180 140 176 120 Z" fill="#1a0902" stroke="#1a0902" strokeWidth="8" strokeLinecap="round" />
              <path d="M 62 28 Q 80 12 100 8 Q 118 6 134 14"  stroke="#2e1408" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
              <path d="M 58 38 Q 76 20 100 14 Q 122 10 140 22" stroke="#2e1408" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
              <path d="M 56 50 Q 72 30 98 22 Q 122 16 142 28" stroke="#361a08" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M 100 14 Q 112 8 126 6 Q 144 6 158 16"  stroke="#2e1408" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
              <path d="M 110 8 Q 128 2 146 8 Q 158 14 164 26"  stroke="#2e1408" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
              <path d="M 138 12 Q 152 2 164 -6"  stroke="#3a1a08" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
              <path d="M 142 6 Q 156 -2 166 -10" stroke="#3a1a08" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
              <path d="M 68 32 Q 90 18 114 16 Q 132 16 148 26 Q 130 18 112 18 Q 90 18 70 32 Z" fill="rgba(70,35,10,0.7)" />
              <path d="M 72 28 Q 94 16 118 14 Q 138 14 152 24 Q 136 16 116 16 Q 94 16 74 28 Z" fill="rgba(100,55,20,0.4)" />
            </motion.g>

            {/* ── EYEBROWS ── */}
            <path d={eyebrowL(expr)} stroke="#1e0c04" strokeWidth="4" strokeLinecap="round" fill="none" style={{ transition: "d 0.35s cubic-bezier(0.22,1,0.36,1)" }} />
            <path d={eyebrowR(expr)} stroke="#1e0c04" strokeWidth="4" strokeLinecap="round" fill="none" style={{ transition: "d 0.35s cubic-bezier(0.22,1,0.36,1)" }} />

            {/* ── LEFT EYE ── */}
            <g onMouseEnter={() => onZone("wink", "left")} onMouseLeave={offZone} style={{ cursor: "pointer" }}>
              {lWinked ? (
                <path d="M 56 108 Q 74 120 92 108" stroke="#1e0c04" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              ) : blink ? (
                <ellipse cx="74" cy="108" rx={lRx} ry={2} fill="url(#skinFaceHB)" stroke="#1e0c04" strokeWidth="1.5" />
              ) : (
                <>
                  <ellipse cx="74" cy="108" rx={lRx} ry={lRy} fill="url(#eyeWhiteHB)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
                  {!squint ? (
                    <g clipPath="url(#clipLHB)">
                      <circle cx={74 + leftOff.x} cy={108 + leftOff.y} r="12" fill="url(#irisHB)" />
                      <circle cx={74 + leftOff.x} cy={108 + leftOff.y} r="8"  fill="#061840" />
                      <circle cx={74 + leftOff.x - 4} cy={108 + leftOff.y - 4} r="3.5" fill="white" opacity="0.96" />
                      <circle cx={74 + leftOff.x + 3} cy={108 + leftOff.y + 3} r="1.8" fill="white" opacity="0.5" />
                      <circle cx={74 + leftOff.x} cy={108 + leftOff.y} r="12" fill="none" stroke="#081830" strokeWidth="1.5" opacity="0.45" />
                    </g>
                  ) : (
                    <>
                      <path d={`M 56 108 Q 74 ${108 + lRy + 7} 92 108`} fill="#f4b877" />
                      <path d="M 58 106 Q 74 117 90 106" stroke="#1e0c04" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    </>
                  )}
                  <path d="M 58 118 Q 74 125 90 118" stroke="rgba(190,130,80,0.3)" strokeWidth="1" fill="none" />
                  <path d="M 56 101 Q 74 96 92 101" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              )}
            </g>

            {/* ── RIGHT EYE ── */}
            <g onMouseEnter={() => onZone("surprised")} onMouseLeave={offZone} style={{ cursor: "pointer" }}>
              {rWinked ? (
                <path d="M 108 108 Q 126 120 144 108" stroke="#1e0c04" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              ) : blink ? (
                <ellipse cx="126" cy="108" rx={rRx} ry={2} fill="url(#skinFaceHB)" stroke="#1e0c04" strokeWidth="1.5" />
              ) : (
                <>
                  <ellipse cx="126" cy="108" rx={rRx} ry={rRy} fill="url(#eyeWhiteHB)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
                  {!squint ? (
                    <g clipPath="url(#clipRHB)">
                      <circle cx={126 + rightOff.x} cy={108 + rightOff.y} r="12" fill="url(#irisHB)" />
                      <circle cx={126 + rightOff.x} cy={108 + rightOff.y} r="8"  fill="#061840" />
                      <circle cx={126 + rightOff.x - 4} cy={108 + rightOff.y - 4} r="3.5" fill="white" opacity="0.96" />
                      <circle cx={126 + rightOff.x + 3} cy={108 + rightOff.y + 3} r="1.8" fill="white" opacity="0.5" />
                      <circle cx={126 + rightOff.x} cy={108 + rightOff.y} r="12" fill="none" stroke="#081830" strokeWidth="1.5" opacity="0.45" />
                    </g>
                  ) : (
                    <>
                      <path d={`M 108 108 Q 126 ${108 + rRy + 7} 144 108`} fill="#f4b877" />
                      <path d="M 110 106 Q 126 117 142 106" stroke="#1e0c04" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    </>
                  )}
                  <path d="M 110 118 Q 126 125 142 118" stroke="rgba(190,130,80,0.3)" strokeWidth="1" fill="none" />
                  <path d="M 108 101 Q 126 96 144 101" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              )}
            </g>

            {/* ── NOSE ── */}
            <g onMouseEnter={() => onZone("thinking")} onMouseLeave={offZone} style={{ cursor: "pointer" }}>
              <path d="M 95 128 Q 89 148 91 162" stroke="rgba(160,95,45,0.4)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M 105 128 Q 111 148 109 162" stroke="rgba(160,95,45,0.4)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M 91 160 Q 88 168 93 172 Q 100 176 107 172 Q 112 168 109 160 Q 105 164 100 165 Q 95 164 91 160 Z" fill="rgba(210,130,70,0.22)" stroke="rgba(160,90,40,0.3)" strokeWidth="1" />
              <path d="M 92 168 Q 88 172 90 174 Q 93 177 97 174 Q 99 171 97 168 Q 95 166 92 168 Z" fill="rgba(0,0,0,0.13)" />
              <path d="M 108 168 Q 112 172 110 174 Q 107 177 103 174 Q 101 171 103 168 Q 105 166 108 168 Z" fill="rgba(0,0,0,0.13)" />
              <ellipse cx="100" cy="164" rx="5" ry="4" fill="rgba(255,220,170,0.28)" />
            </g>

            {/* ── BLUSH ── */}
            <AnimatePresence>
              {showBlush && (
                <>
                  <motion.ellipse key="bL" cx="40" cy="150" rx="20" ry="12" fill="rgba(255,100,80,0.15)"
                    initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }} />
                  <motion.ellipse key="bR" cx="160" cy="150" rx="20" ry="12" fill="rgba(255,100,80,0.15)"
                    initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }} />
                  {(expr === "charming" || expr === "playful" || expr === "excited") && (
                    <>
                      <motion.circle key="sp1" cx="34" cy="144" r="2" fill="rgba(255,180,120,0.55)"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.55, 1, 0.55] }} transition={{ duration: 1.2, repeat: Infinity }} />
                      <motion.circle key="sp2" cx="166" cy="144" r="2" fill="rgba(255,180,120,0.55)"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.55, 1, 0.55] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
                    </>
                  )}
                </>
              )}
            </AnimatePresence>

            {/* ── MOUTH ── */}
            <g onMouseEnter={() => onZone("charming")} onMouseLeave={offZone} style={{ cursor: "pointer" }}>
              <path d={getMouth(expr)} stroke="#a85030" strokeWidth="3.5" strokeLinecap="round"
                fill={showTeeth ? "rgba(175,55,35,0.18)" : "none"}
                style={{ transition: "d 0.38s cubic-bezier(0.22,1,0.36,1)" }} />
              <path d={getMouth(expr).replace(/Q.*Z?$/, "")} stroke="rgba(160,80,50,0.2)" strokeWidth="1.5" strokeLinecap="round" fill="none"
                style={{ transition: "d 0.38s cubic-bezier(0.22,1,0.36,1)" }} />
              <AnimatePresence>
                {showTeeth && (
                  <motion.path key="teeth"
                    initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0 }}
                    style={{ transformOrigin: "100px 158px" }}
                    d={
                      expr === "surprised"
                        ? "M 89 190 Q 100 204 111 190 Q 107 200 100 202 Q 93 200 89 190 Z"
                        : expr === "bigSmile" || expr === "laughing" || expr === "charming" || expr === "excited"
                        ? "M 68 190 Q 100 214 132 190 L 128 200 Q 100 220 72 200 Z"
                        : "M 78 188 Q 100 206 122 188 L 119 196 Q 100 210 81 196 Z"
                    }
                    fill="white" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5"
                  />
                )}
              </AnimatePresence>
              {(expr === "bigSmile" || expr === "happy" || expr === "charming" || expr === "laughing") && (
                <path
                  d={expr === "bigSmile" || expr === "charming"
                    ? "M 66 185 Q 83 183 100 190 Q 117 183 134 185"
                    : "M 70 184 Q 85 182 100 188 Q 115 182 130 184"}
                  stroke="#a85030" strokeWidth="2" strokeLinecap="round" fill="none"
                />
              )}
            </g>

            <ellipse cx="100" cy="218" rx="9" ry="4" fill="rgba(0,0,0,0.04)" style={{ pointerEvents: "none" }} />

            {/* Dimples */}
            <AnimatePresence>
              {(expr === "charming" || expr === "bigSmile" || expr === "happy" || expr === "softSmile") && (
                <>
                  <motion.ellipse key="dL" cx="62"  cy="196" rx="5" ry="3.5" fill="rgba(0,0,0,0.08)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                  <motion.ellipse key="dR" cx="138" cy="196" rx="5" ry="3.5" fill="rgba(0,0,0,0.08)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                </>
              )}
            </AnimatePresence>

            {/* Focus wrinkle */}
            <AnimatePresence>
              {(expr === "thinking" || expr === "focus") && (
                <>
                  <motion.path key="fc1" d="M 90 90 Q 94 86 98 90" stroke="rgba(160,90,40,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                  <motion.path key="fc2" d="M 102 90 Q 106 86 110 90" stroke="rgba(160,90,40,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                </>
              )}
            </AnimatePresence>

            {/* Tears */}
            <AnimatePresence>
              {expr === "sad" && (
                <>
                  <motion.ellipse key="tL" cx="58"  cy="134" rx="4" ry="5" fill="rgba(100,180,255,0.6)" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} />
                  <motion.ellipse key="tR" cx="142" cy="134" rx="4" ry="5" fill="rgba(100,180,255,0.6)" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} />
                </>
              )}
            </AnimatePresence>

            {/* Excitement sparks */}
            <AnimatePresence>
              {expr === "excited" && (
                <motion.g key="exc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {[[-18,-18],[18,-18],[0,-26],[-26,0],[26,0]].map(([dx, dy], i) => (
                    <motion.circle key={i} cx={100+(dx??0)} cy={100+(dy??0)} r="3"
                      fill="hsl(var(--primary))" opacity="0.6"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }} />
                  ))}
                </motion.g>
              )}
            </AnimatePresence>

            {/* Thought bubble */}
            <AnimatePresence>
              {expr === "thinking" && (
                <motion.g key="thought"
                  initial={{ opacity: 0, scale: 0.4, x: 18 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.3 }}
                  style={{ transformOrigin: "168px 58px" }}
                >
                  <ellipse cx="170" cy="58" rx="24" ry="16" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
                  <text x="170" y="63" textAnchor="middle" fontSize="13" fill="hsl(var(--primary))">🤔</text>
                  <circle cx="152" cy="76" r="4"   fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.2" />
                  <circle cx="144" cy="84" r="2.5" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Sunglasses */}
            <AnimatePresence>
              {(expr === "attitude" || expr === "cool") && (
                <motion.g key="shades"
                  initial={{ y: -120, rotate: -8, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -100, rotate: 8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <line x1="26" y1="107" x2="40" y2="107" stroke="url(#glassFrameHB)" strokeWidth="3" strokeLinecap="round" />
                  <line x1="160" y1="107" x2="174" y2="107" stroke="url(#glassFrameHB)" strokeWidth="3" strokeLinecap="round" />
                  <rect x="38" y="91" width="54" height="34" rx="10" fill={expr === "cool" ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.90)"} stroke="url(#glassFrameHB)" strokeWidth="2.5" />
                  <rect x="108" y="91" width="54" height="34" rx="10" fill={expr === "cool" ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.90)"} stroke="url(#glassFrameHB)" strokeWidth="2.5" />
                  <line x1="92" y1="107" x2="108" y2="107" stroke="url(#glassFrameHB)" strokeWidth="2.5" />
                  <path d="M 44 97 L 58 97 L 53 108 L 43 108 Z" fill="rgba(100,210,255,0.09)" />
                  <path d="M 114 97 L 128 97 L 123 108 L 113 108 Z" fill="rgba(100,210,255,0.09)" />
                  <line x1="45" y1="100" x2="58" y2="100" stroke="rgba(120,230,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="115" y1="100" x2="128" y2="100" stroke="rgba(120,230,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Confident / Proud aura */}
            <AnimatePresence>
              {(expr === "proud" || expr === "confident") && (
                <motion.ellipse key="aura"
                  cx="100" cy="120" rx="95" ry="100"
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.18"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: [1, 1.04, 1], opacity: [0.18, 0.28, 0.18] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "100px 120px" }}
                />
              )}
            </AnimatePresence>
          </g>
          {/* end head group */}

        </motion.g>
      </svg>

      {/* Hint label — responsive text */}
      <motion.p
        className="mt-1 text-center pointer-events-none"
        style={{
          fontSize: isMobile ? 9 : 10,
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