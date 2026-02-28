import { useState } from "react";
import { motion } from "framer-motion";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M24 12.073C24 5.404 18.629 0 12 0 5.37 0 0 5.404 0 12.073c0 6.027 4.388 11.022 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.67 4.532-4.67 1.312 0 2.686.236 2.686.236v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.095 24 18.1 24 12.073z" />
  </svg>
);

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/rupesh3433", color: "#e2e8f0" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rupesh-poudel-755b7a345/",
    color: "#0a66c2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rupacepoudel",
    color: "#e1306c",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@aiyoutuber69",
    color: "#ff0000",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/rup.ace.5872",
    color: "#1877f2",
  },
] as const;

const ICONS: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon />,
  LinkedIn: <LinkedInIcon />,
  Instagram: <InstagramIcon />,
  YouTube: <YouTubeIcon />,
  Facebook: <FacebookIcon />,
};

const SocialLinks = () => (
  <div className="space-y-2.5">
    <p
      style={{
        fontSize: "clamp(9px,1.3vw,10.5px)",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "hsl(var(--primary)/0.65)",
      }}
    >
      Platforms
    </p>

    <div className="flex flex-wrap gap-2.5">
      {SOCIALS.map((s, i) => (
        <SocialButton
          key={s.label}
          {...s}
          icon={ICONS[s.label]}
          delay={0.05 + i * 0.07}
        />
      ))}
    </div>
  </div>
);

interface SBProps {
  label: string;
  href: string;
  color: string;
  icon: React.ReactNode;
  delay: number;
}

const SocialButton = ({ label, href, color, icon, delay }: SBProps) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      initial={{ opacity: 0, scale: 0.65, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: 12,
        overflow: "hidden",
        background: "hsl(var(--card)/0.65)",
        border: hov
          ? `1px solid ${color}55`
          : "1px solid hsl(var(--border)/0.42)",
        backdropFilter: "blur(8px)",
        boxShadow: hov ? `0 4px 18px ${color}30, 0 0 0 1px ${color}28` : "none",
        transform: hov
          ? "scale(1.16) translateY(-3px)"
          : "scale(1) translateY(0)",
        transition:
          "transform 0.2s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, box-shadow 0.2s",
        textDecoration: "none",
      }}
    >
      {/* Hover bg */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `${color}18`,
          borderRadius: 12,
          pointerEvents: "none",
        }}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Scan highlight */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          height: 1,
          background: `linear-gradient(90deg,transparent,${color}80,transparent)`,
          left: 0,
          right: 0,
          pointerEvents: "none",
        }}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Icon */}
      <span
        style={{
          width: 20,
          height: 20,
          position: "relative",
          zIndex: 1,
          color: hov ? color : "hsl(var(--muted-foreground))",
          filter: hov ? `drop-shadow(0 0 5px ${color}80)` : "none",
          transition: "color 0.2s, filter 0.2s",
        }}
      >
        {icon}
      </span>
    </motion.a>
  );
};

export default SocialLinks;
