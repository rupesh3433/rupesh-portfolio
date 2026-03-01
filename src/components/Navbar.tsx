import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";
import Logo from "./shared/Logo";

const navLinks = [
  { label: "Home",     href: "#home"    },
  { label: "Projects", href: "#projects" },
  { label: "Tech",     href: "#tech"    },
  { label: "Contact",  href: "#contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("Home");
  const [scrolled, setScrolled]     = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,    opacity: 1  }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      {/* Pill container */}
      <motion.div
        animate={{
          boxShadow: scrolled
            ? "0 8px 40px -8px rgba(0,0,0,0.28), 0 0 0 1px hsl(var(--border)/0.5), inset 0 1px 0 hsl(var(--primary)/0.08)"
            : "0 2px 20px -4px rgba(0,0,0,0.10), 0 0 0 1px hsl(var(--border)/0.3)",
        }}
        className="w-full max-w-4xl rounded-2xl bg-background/72 dark:bg-background/65 px-4 py-2.5 flex items-center justify-between transition-all duration-500"
        style={{ backdropFilter: "blur(18px)" }}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-0 group" onClick={() => setActive("Home")}>
          <Logo />
          <span className="font-display font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
            Rupesh<span className="text-primary font-black">.</span>dev
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className="relative px-4 py-1.5 text-sm font-small rounded-xl transition-colors duration-200"
            >
              <span className={`relative z-10 transition-colors duration-200 ${active === link.label ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {link.label}
              </span>
              {active === link.label && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 rounded-xl bg-primary/10 dark:bg-primary/15"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.88 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{ rotate: 90,    opacity: 0, scale: 0.5  }}
                transition={{ duration: 0.22 }}
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Hire Me */}
          <motion.a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-bold text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px -4px hsl(var(--primary)/0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/22 to-transparent -skew-x-12 pointer-events-none"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 font-display">Hire Me</span>
            <motion.span className="relative z-10 text-xs opacity-80"
              animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              →
            </motion.span>
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center bg-secondary/60 text-foreground"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div key={mobileOpen ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{ opacity: 0,    y: -10,  scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+6px)] left-4 right-4 max-w-4xl mx-auto rounded-2xl border border-border/40 bg-background/92 backdrop-blur-2xl shadow-xl p-3"
            style={{ width: "calc(100% - 2rem)" }}
          >
            {navLinks.map((link, i) => (
              <motion.a key={link.label} href={link.href}
                onClick={() => { setMobileOpen(false); setActive(link.label); }}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0    }}
                transition={{ delay: i * 0.05  }}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-150"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="mt-2 pt-2 border-t border-border/30">
              <a href="#contact" onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
              >
                Hire Me →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;