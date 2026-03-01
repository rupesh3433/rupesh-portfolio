// src/components/shared/Logo.tsx

import { useId } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const CSS = `
@keyframes omGlow {
  0%,100% {
    filter:
      drop-shadow(0 0 6px hsl(var(--primary) / 0.6))
      drop-shadow(0 0 18px hsl(var(--accent) / 0.45))
      drop-shadow(0 0 36px hsl(var(--primary) / 0.35));
  }
  50% {
    filter:
      drop-shadow(0 0 10px hsl(var(--primary) / 0.85))
      drop-shadow(0 0 28px hsl(var(--accent) / 0.65))
      drop-shadow(0 0 52px hsl(var(--primary) / 0.45));
  }
}

@keyframes omBreathe {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.82; }
}
`;

interface LogoEmblemProps {
  size?: number;
  forceTheme?: "dark" | "light";
}

export const LogoEmblem = ({
  size = 54,
  forceTheme,
}: LogoEmblemProps) => {
  const gradientId = useId();
  const { theme } = useTheme();

  const resolvedTheme = forceTheme ?? theme;
  const isDark = resolvedTheme === "dark";

  // Maintain tight aspect ratio
  const height = Math.round(size * (56 / 100));

  return (
    <>
      <style>{CSS}</style>

      <svg
        width={size}
        height={height}
        viewBox="0 0 100 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Om Rupesh logo"
        style={{
          display: "block",
          flexShrink: 0,
          overflow: "visible",
          margin: 0,
          padding: 0,
          lineHeight: 0,
          animation: isDark
            ? "omGlow 3s ease-in-out infinite"
            : "omBreathe 4s ease-in-out infinite",
        }}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>

        {/* ॐ Symbol */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="auto"
          fill={`url(#${gradientId})`}
          fontSize="50"
          fontFamily="'Noto Serif', 'Times New Roman', Georgia, serif"
          fontWeight="700"
          style={{
            userSelect: "none",
            letterSpacing: "0.5px",
          }}
        >
          ॐ
        </text>
      </svg>
    </>
  );
};

interface LogoProps {
  size?: number;
  href?: string;
  forceTheme?: "dark" | "light";
}

const Logo = ({
  size = 54,
  href = "/",
  forceTheme,
}: LogoProps) => {
  return (
    <a
      href={href}
      aria-label="Go to homepage"
      style={{
        display: "inline-flex",
        textDecoration: "none",
        lineHeight: 0,
        padding: 0,
        margin: 0,
      }}
    >
      <LogoEmblem size={size} forceTheme={forceTheme} />
    </a>
  );
};

export default Logo;