// src/components/Footer.tsx

import { useMemo } from "react";
import { motion } from "framer-motion";
import SocialLinks from "@/components/shared/SocialLinks";

const NAV_LINKS: ReadonlyArray<{
  label: "Home" | "Tech" | "Projects" | "Contact";
  href: string;
}> = [
  { label: "Home", href: "#home" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer(): JSX.Element {
  const year = useMemo<number>(() => new Date().getFullYear(), []);

  return (
    <footer className="relative border-t border-border/40 bg-background overflow-hidden">
      {/* Top subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 py-12 sm:py-14">
        {/* ───────── Main Section ───────── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand Section */}
          <div className="max-w-sm">
            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-black tracking-tight"
              style={{
                fontFamily: "'Orbitron', monospace",
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Rupesh Poudel
            </motion.h2>

            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Full-Stack Developer · AI Engineer · Problem Solver
            </p>

            {/* Availability Badge */}
            <div className="flex items-center gap-2 mt-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-emerald-500 text-xs font-medium tracking-wide">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-8 gap-y-3"
          >
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                whileHover={{ y: -2 }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* ───────── Bottom Section ───────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground/60 order-2 sm:order-1 text-center sm:text-left">
            © {year} Rupesh Poudel. All rights reserved.
          </p>

          {/* Shared SocialLinks Component */}
          <div className="order-1 sm:order-2">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Orbitron Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');`}
      </style>
    </footer>
  );
}