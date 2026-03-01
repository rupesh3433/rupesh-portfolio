// src/components/shared/Logo.tsx
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ✦ NEON R CROWN LOGO
//
//  Self-contained — reads from ThemeContext.
//  Drop anywhere: <Logo />
//  Or just the mark: <LogoEmblem size={80} />
//
//  Dark  → cyan neon + volumetric smoke (matches reference)
//  Light → fire orange + flame clouds
//
//  ViewBox : 0 0 300 320
//  Ring    : cx=150 cy=170 r=112
//  Crown   : y=44–118   (peaks above ring top)
//  R       : y=118–272
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useTheme } from "@/contexts/ThemeContext";


// ─────────────────────────────────────────────────────────────────
//  Palette
// ─────────────────────────────────────────────────────────────────
type Pal = {
  core: string; bright: string; mid: string; deep: string; abyss: string;
  smokeA: string; smokeB: string; smokeC: string;
  sparkHot: string; sparkWarm: string;
  ringCore: string; ringMid: string; ringHalo: string;
};

const DARK: Pal = {
  core: "#ffffff",   bright: "#b2f5ff", mid: "#00e5ff",
  deep: "#0097a7",   abyss: "#00363d",
  smokeA: "rgba(0,229,255,0.55)",
  smokeB: "rgba(0,188,212,0.38)",
  smokeC: "rgba(0,96,125,0.50)",
  sparkHot: "#ff8f00", sparkWarm: "#ffd54f",
  ringCore: "#00e5ff", ringMid: "#0097a7",
  ringHalo: "rgba(0,229,255,0.18)",
};

const FIRE: Pal = {
  core: "#ffffff",   bright: "#fff59d", mid: "#ffab40",
  deep: "#e64a19",   abyss: "#4e1500",
  smokeA: "rgba(255,171,64,0.58)",
  smokeB: "rgba(230,74,25,0.42)",
  smokeC: "rgba(100,20,0,0.55)",
  sparkHot: "#40c4ff", sparkWarm: "#80d8ff",
  ringCore: "#ff6d00", ringMid: "#e64a19",
  ringHalo: "rgba(255,109,0,0.20)",
};

// ─────────────────────────────────────────────────────────────────
//  CSS keyframes
// ─────────────────────────────────────────────────────────────────
const CSS = `
@keyframes rRing {
  0%,100%{opacity:1;}46%{opacity:0.72;}52%{opacity:0.88;}
}
@keyframes rBreath {
  0%,100%{filter:brightness(1) saturate(1);}
  50%{filter:brightness(1.30) saturate(1.18);}
}
@keyframes rCrown {
  0%,100%{filter:brightness(1);}50%{filter:brightness(1.38);}
}
@keyframes rS1 {
  0%  {transform:translate(0px,0px)   scale(1)    rotate(0deg);   opacity:0.95;}
  35% {transform:translate(-5px,-10px)scale(1.07) rotate(-3deg);  opacity:1;}
  70% {transform:translate(-9px,-18px)scale(1.14) rotate(-5deg);  opacity:0.82;}
  100%{transform:translate(-13px,-28px)scale(1.24)rotate(-7deg);  opacity:0.45;}
}
@keyframes rS2 {
  0%  {transform:translate(0px,0px)  scale(1)   rotate(0deg); opacity:0.90;}
  38% {transform:translate(6px,-11px)scale(1.09)rotate(4deg); opacity:1;}
  72% {transform:translate(11px,-20px)scale(1.16)rotate(6deg);opacity:0.78;}
  100%{transform:translate(15px,-30px)scale(1.26)rotate(9deg);opacity:0.40;}
}
@keyframes rS3 {
  0%  {transform:translate(0px,0px)   scale(1);   opacity:0.88;}
  42% {transform:translate(-3px,-7px) scale(1.06);opacity:1;}
  80% {transform:translate(-5px,-14px)scale(1.12);opacity:0.80;}
  100%{transform:translate(-7px,-22px)scale(1.20);opacity:0.38;}
}
@keyframes rS4 {
  0%  {transform:translate(0px,0px)  scale(1);   opacity:0.82;}
  50% {transform:translate(4px,-8px) scale(1.08);opacity:1;}
  100%{transform:translate(9px,-18px)scale(1.18);opacity:0.33;}
}
@keyframes rS5 {
  0%  {transform:translate(0px,0px)   scale(1);   opacity:0.78;}
  45% {transform:translate(-2px,-5px) scale(1.05);opacity:0.96;}
  100%{transform:translate(-4px,-13px)scale(1.14);opacity:0.28;}
}
@keyframes rSpark {
  0%,10%,100%{opacity:0;transform:scale(.3);}
  35%{opacity:1;transform:scale(1.1);}
  58%{opacity:0.65;transform:scale(.75);}
  78%{opacity:0.18;transform:scale(.5);}
}
`;

// ─────────────────────────────────────────────────────────────────
//  Paths
// ─────────────────────────────────────────────────────────────────
const R_PATH =
  // outer
  "M 96,118 L 118,118 C 118,118 192,120 192,158 C 192,192 162,196 148,196 " +
  "L 190,272 L 168,272 L 128,200 L 118,200 L 118,272 L 96,272 Z " +
  // inner bowl hole (evenodd)
  "M 118,136 L 140,136 C 166,136 168,180 144,181 L 118,181 Z";

const CROWN_PATH =
  "M 94,118 L 94,108 " +
  "L 102,65  L 112,90 " +
  "L 122,74  L 132,92 " +
  "L 150,44  " +
  "L 168,92  L 178,74 " +
  "L 188,90  L 198,65 " +
  "L 206,108 L 206,118 Z";

const ORBS: [number, number, number][] = [
  [102,63,4.5],[122,72,4.0],[150,42,6.0],[178,72,4.0],[198,63,4.5],
];

const SPARKS: [number,number,number,boolean,string][] = [
  [28, 152,3.0,true, "rSpark 2.2s ease-in-out infinite 0.0s"],
  [40, 198,2.2,false,"rSpark 3.1s ease-in-out infinite 0.7s"],
  [268,138,2.8,true, "rSpark 2.6s ease-in-out infinite 0.3s"],
  [278,183,2.0,false,"rSpark 2.0s ease-in-out infinite 1.1s"],
  [260,218,2.4,true, "rSpark 3.4s ease-in-out infinite 0.5s"],
  [35, 118,1.8,false,"rSpark 2.8s ease-in-out infinite 1.4s"],
  [274,112,2.2,true, "rSpark 2.4s ease-in-out infinite 0.2s"],
  [55, 248,1.6,false,"rSpark 3.0s ease-in-out infinite 0.9s"],
  [248,253,2.0,true, "rSpark 2.7s ease-in-out infinite 1.3s"],
];

// ─────────────────────────────────────────────────────────────────
//  LogoEmblem — pure SVG mark, no wordmark
// ─────────────────────────────────────────────────────────────────
interface LogoEmblemProps {
  /** Width in px. Height auto-scales (300:320 ratio). */
  size?: number;
  /** Force a theme (else reads from ThemeContext) */
  forceTheme?: "dark" | "light";
}

export const LogoEmblem = ({ size = 64, forceTheme }: LogoEmblemProps) => {
  const ctx  = useTheme();
  const dark = (forceTheme ?? ctx.theme) === "dark";
  const p    = dark ? DARK : FIRE;
  const q    = dark ? "d" : "l";           // SVG ID prefix
  const h    = Math.round(size * (320/300));

  return (
    <>
      <style>{CSS}</style>
      <svg
        width={size}
        height={h}
        viewBox="0 0 300 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="R crown emblem"
        style={{ overflow:"visible", display:"block", flexShrink:0 }}
      >
        <defs>

          {/* Triple-layer glow — R, Crown, Orbs, Sparks */}
          <filter id={`${q}-glow`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1"  result="g0"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4"  result="g1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="g2"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="g3"/>
            <feMerge>
              <feMergeNode in="g3"/><feMergeNode in="g2"/>
              <feMergeNode in="g1"/><feMergeNode in="g0"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Ring glow */}
          <filter id={`${q}-ring`} x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3"  result="r0"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="r1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="r2"/>
            <feMerge>
              <feMergeNode in="r2"/><feMergeNode in="r1"/>
              <feMergeNode in="r0"/><feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Organic turbulence distortion for smoke edges */}
          <filter id={`${q}-T1`} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.018 0.022"
              numOctaves="4" seed="12" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise"
              scale="24" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id={`${q}-T2`} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016"
              numOctaves="3" seed="7" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise"
              scale="32" xChannelSelector="G" yChannelSelector="B"/>
          </filter>

          {/* Gradients */}
          <linearGradient id={`${q}-rg`} x1="96" y1="118" x2="192" y2="272" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={p.bright}/>
            <stop offset="28%"  stopColor={p.mid}/>
            <stop offset="100%" stopColor={p.deep}/>
          </linearGradient>
          <linearGradient id={`${q}-cg`} x1="150" y1="44" x2="150" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={p.bright}/>
            <stop offset="40%"  stopColor={p.mid}/>
            <stop offset="100%" stopColor={p.deep}/>
          </linearGradient>
          <linearGradient id={`${q}-rl`} x1="38" y1="58" x2="262" y2="282" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={p.bright}/>
            <stop offset="45%"  stopColor={p.ringCore}/>
            <stop offset="100%" stopColor={p.ringMid}/>
          </linearGradient>
          <radialGradient id={`${q}-bg`} cx="150" cy="170" r="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={p.abyss} stopOpacity="0.85"/>
            <stop offset="100%" stopColor={p.abyss} stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── LAYER 0: Backdrop radial depth ──────────────────── */}
        <circle cx="150" cy="170" r="155" fill={`url(#${q}-bg)`}/>

        {/* ── LAYER 1: Ring halo base ──────────────────────────── */}
        <circle cx="150" cy="170" r="112"
          stroke={p.abyss} strokeWidth="20" fill="none"
          style={{filter:"blur(22px)", opacity:0.75}}/>

        {/* ══════════════════════════════════════════════════════
            LAYER 2 — VOLUMETRIC SMOKE / FLARE
            5 independent cloud masses, each = 3 blobs:
            dark volume + mid body (turbulence) + bright streaks
            ══════════════════════════════════════════════════════ */}

        {/* Cloud A — CROWN REGION (dominant mass, fills interior top) */}
        <ellipse cx="150" cy="98"  rx="90" ry="66" fill={p.smokeC}
          style={{filter:"blur(30px)"}}/>
        <ellipse cx="150" cy="90"  rx="70" ry="54" fill={p.smokeB}
          filter={`url(#${q}-T1)`}
          style={{animation:"rS3 4.0s ease-in-out infinite", transformOrigin:"150px 90px"}}/>
        <ellipse cx="150" cy="82"  rx="46" ry="38" fill={p.smokeA}
          filter={`url(#${q}-T2)`}
          style={{animation:"rS5 3.6s ease-in-out infinite 0.5s", transformOrigin:"150px 82px"}}/>

        {/* Cloud B — LEFT column (rises along R stem) */}
        <ellipse cx="108" cy="164" rx="44" ry="74" fill={p.smokeC}
          style={{filter:"blur(24px)"}}/>
        <ellipse cx="106" cy="156" rx="32" ry="62" fill={p.smokeB}
          filter={`url(#${q}-T1)`}
          style={{animation:"rS1 3.8s ease-in-out infinite 0.2s", transformOrigin:"106px 156px"}}/>
        <ellipse cx="104" cy="144" rx="17" ry="42" fill={p.smokeA}
          filter={`url(#${q}-T2)`}
          style={{animation:"rS3 4.4s ease-in-out infinite 0.9s", transformOrigin:"104px 144px"}}/>

        {/* Cloud C — RIGHT (wraps crown-right + ring arc) */}
        <ellipse cx="196" cy="148" rx="42" ry="70" fill={p.smokeC}
          style={{filter:"blur(22px)"}}/>
        <ellipse cx="198" cy="140" rx="30" ry="57" fill={p.smokeB}
          filter={`url(#${q}-T1)`}
          style={{animation:"rS2 4.4s ease-in-out infinite 0.4s", transformOrigin:"198px 140px"}}/>
        <ellipse cx="200" cy="128" rx="15" ry="38" fill={p.smokeA}
          filter={`url(#${q}-T2)`}
          style={{animation:"rS4 3.5s ease-in-out infinite 1.0s", transformOrigin:"200px 128px"}}/>

        {/* Cloud D — billows ABOVE ring (escapes circle, billboard effect) */}
        <ellipse cx="150" cy="58"  rx="58" ry="40" fill={p.smokeC}
          style={{filter:"blur(20px)"}}/>
        <ellipse cx="148" cy="50"  rx="40" ry="30" fill={p.smokeB}
          filter={`url(#${q}-T2)`}
          style={{animation:"rS5 5.0s ease-in-out infinite 0.3s", transformOrigin:"148px 50px"}}/>
        <ellipse cx="146" cy="44"  rx="24" ry="18" fill={p.smokeA}
          style={{filter:"blur(7px)", animation:"rS3 3.2s ease-in-out infinite 0.7s", transformOrigin:"146px 44px"}}/>

        {/* Cloud E — lower body of R (thinner, ground smoke) */}
        <ellipse cx="150" cy="218" rx="46" ry="38" fill={p.smokeC}
          style={{filter:"blur(18px)"}}/>
        <ellipse cx="150" cy="214" rx="30" ry="28" fill={p.smokeB}
          filter={`url(#${q}-T1)`}
          style={{animation:"rS4 4.8s ease-in-out infinite 1.2s", transformOrigin:"150px 214px"}}/>

        {/* ── LAYER 3: Ring (drawn OVER the smoke interior) ────── */}
        {/* Soft outer halo */}
        <circle cx="150" cy="170" r="112"
          stroke={p.ringHalo} strokeWidth="26" fill="none"
          style={{filter:"blur(14px)"}}/>
        {/* Main ring + bloom filter */}
        <circle cx="150" cy="170" r="112"
          stroke={`url(#${q}-rl)`}
          strokeWidth="2.6"
          fill="none"
          filter={`url(#${q}-ring)`}
          style={{animation:"rRing 3.5s ease-in-out infinite"}}/>
        {/* White core hairline */}
        <circle cx="150" cy="170" r="112"
          stroke={p.core} strokeWidth="0.7" strokeOpacity="0.55" fill="none"/>

        {/* ── LAYER 4: R letterform ────────────────────────────── */}
        {/* Deep bloom */}
        <path fillRule="evenodd" d={R_PATH} fill={p.deep}
          style={{filter:"blur(24px)", opacity:0.72}}/>
        {/* Mid glow */}
        <path fillRule="evenodd" d={R_PATH} fill={p.mid}
          style={{filter:"blur(9px)", opacity:0.62}}/>
        {/* Main — gradient + triple glow */}
        <path fillRule="evenodd" d={R_PATH}
          fill={`url(#${q}-rg)`}
          filter={`url(#${q}-glow)`}
          style={{animation:"rBreath 3.0s ease-in-out infinite"}}/>
        {/* White rim */}
        <path fillRule="evenodd" d={R_PATH}
          fill="none" stroke={p.core} strokeWidth="1.0" strokeOpacity="0.42"/>

        {/* ── LAYER 5: Crown ───────────────────────────────────── */}
        <path d={CROWN_PATH} fill={p.deep}
          style={{filter:"blur(20px)", opacity:0.78}}/>
        <path d={CROWN_PATH} fill={p.mid}
          style={{filter:"blur(7px)", opacity:0.62}}/>
        <path d={CROWN_PATH}
          fill={`url(#${q}-cg)`}
          filter={`url(#${q}-glow)`}
          style={{animation:"rCrown 2.6s ease-in-out infinite"}}/>
        <path d={CROWN_PATH}
          fill="none" stroke={p.core} strokeWidth="0.9" strokeOpacity="0.40"/>

        {/* Crown peak orbs */}
        {ORBS.map(([cx,cy,r],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r+5.5} fill={p.mid}
              style={{filter:"blur(7px)", opacity:0.62}}/>
            <circle cx={cx} cy={cy} r={r}
              fill={p.bright} filter={`url(#${q}-glow)`}/>
          </g>
        ))}

        {/* ── LAYER 6: Spark particles ─────────────────────────── */}
        {SPARKS.map(([cx,cy,r,hot,anim],i) => (
          <circle key={i}
            cx={cx} cy={cy} r={r}
            fill={hot ? p.sparkHot : p.sparkWarm}
            filter={`url(#${q}-glow)`}
            style={{animation:anim, transformOrigin:`${cx}px ${cy}px`}}/>
        ))}

      </svg>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
//  Logo (default export) — emblem + optional wordmark
// ─────────────────────────────────────────────────────────────────
interface LogoProps {
  /** Show text wordmark beside emblem */
  showWordmark?: boolean;
  /** Wordmark text */
  wordmark?: string;
  /** Emblem size in px */
  size?: number;
  /** Link target */
  href?: string;
}

const Logo = ({
  size = 48,
  href = "/",
}: LogoProps) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <a href={href} aria-label="Go to homepage"
      className="flex items-center select-none group">
      <LogoEmblem size={size}/>
        <span className={[
          "text-[15px] font-bold tracking-[0.20em] uppercase leading-none",
          "transition-colors duration-300",
          dark
            ? "text-cyan-300 group-hover:text-white"
            : "text-orange-500 group-hover:text-orange-700",
        ].join(" ")}>
        </span>
    </a>
  );
};

export default Logo;