import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import emailjs from "@emailjs/browser";

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
type Status = "idle" | "sending" | "success" | "error";

/* ═══════════════════════════════════════════
   ENERGY RAY BORDER — RAF + conic-gradient + mask
   Orbits the form container border only.
═══════════════════════════════════════════ */
interface EnergyRayProps {
  status: Status;
  isHovered: boolean;
  borderRadius?: number;
}

const EnergyRayBorder = ({ status, isHovered, borderRadius = 18 }: EnergyRayProps) => {
  const rayRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const speedRef = useRef(0.55);
  const targetSpeedRef = useRef(0.55);

  useEffect(() => {
    if (status === "sending") targetSpeedRef.current = 1.4;
    else if (status === "success") targetSpeedRef.current = 0.22;
    else if (status === "error") targetSpeedRef.current = 2.0;
    else targetSpeedRef.current = isHovered ? 0.64 : 0.55;
  }, [status, isHovered]);

  useEffect(() => {
    let raf: number;
    let errorDistort = 0;

    const loop = () => {
      // Smooth speed interpolation
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.04;

      // Error distortion — brief wobble
      if (status === "error" && errorDistort < 60) {
        errorDistort++;
        angleRef.current += Math.sin(errorDistort * 0.4) * 1.8;
      }

      angleRef.current = (angleRef.current + speedRef.current) % 360;
      const a = angleRef.current;

      if (rayRef.current) {
        // Main bright ray + fading trail
        const isErr = status === "error";
        const isSuc = status === "success";
        const rayColor = isErr
          ? "hsl(0,85%,62%)"
          : isSuc
          ? "hsl(142,68%,52%)"
          : "hsl(var(--primary))";
        const rayHigh = isErr ? "hsl(0,100%,78%)" : isSuc ? "hsl(142,90%,72%)" : "white";
        const trailOpacity = isErr ? "0.25" : isSuc ? "0.18" : "0.12";

        rayRef.current.style.background = [
          `conic-gradient(`,
          `  from ${a}deg,`,
          `  transparent 0%,`,
          `  transparent 68%,`,
          `  hsla(196,72%,62%,${trailOpacity}) 74%,`,
          `  ${rayColor} 87%,`,
          `  ${rayHigh} 91%,`,
          `  ${rayColor} 93%,`,
          `  transparent 96%,`,
          `  transparent 100%`,
          `)`,
        ].join("");
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  return (
    <div
      ref={rayRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: -1,
        borderRadius,
        padding: 1,
        // Mask to show ONLY the 1px border strip
        WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
        zIndex: 4,
      }}
    />
  );
};

/* ═══════════════════════════════════════════
   BORDER LAYERS — 4 independent layers
═══════════════════════════════════════════ */
const BorderLayers = ({ status, isHovered }: { status: Status; isHovered: boolean }) => {
  const borderRadius = 18;
  const isErr = status === "error";
  const isSuc = status === "success";

  const glowColor = isErr
    ? "hsl(0,85%,55%)"
    : isSuc
    ? "hsl(142,68%,48%)"
    : "hsl(var(--primary))";

  return (
    <>
      {/* Layer 1: Static base border */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, borderRadius,
          border: `1px solid ${isErr ? "hsl(0,60%,45%/0.5)" : isSuc ? "hsl(142,50%,40%/0.4)" : "hsl(var(--border)/0.45)"}`,
          pointerEvents: "none", zIndex: 1,
          transition: "border-color 0.4s ease",
        }}
      />

      {/* Layer 2: Breathing glow pulse */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute", inset: 0, borderRadius,
          border: `1px solid transparent`,
          pointerEvents: "none", zIndex: 2,
        }}
        animate={{
          boxShadow: isErr
            ? [
                `0 0 6px 1px hsl(0,80%,55%/0.25), inset 0 0 6px hsl(0,80%,55%/0.06)`,
                `0 0 16px 3px hsl(0,80%,55%/0.5), inset 0 0 12px hsl(0,80%,55%/0.12)`,
                `0 0 6px 1px hsl(0,80%,55%/0.25), inset 0 0 6px hsl(0,80%,55%/0.06)`,
              ]
            : isSuc
            ? [`0 0 14px 3px hsl(142,65%,48%/0.35), inset 0 0 10px hsl(142,65%,48%/0.08)`]
            : [
                `0 0 8px 1px hsl(var(--primary)/0.15), inset 0 0 8px hsl(var(--primary)/0.04)`,
                `0 0 18px 3px hsl(var(--primary)/0.28), inset 0 0 14px hsl(var(--primary)/0.08)`,
                `0 0 8px 1px hsl(var(--primary)/0.15), inset 0 0 8px hsl(var(--primary)/0.04)`,
              ],
        }}
        transition={{
          duration: isErr ? 0.25 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layer 3: Light scan across surface */}
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, borderRadius, overflow: "hidden", pointerEvents: "none", zIndex: 3 }}
      >
        <motion.div
          style={{
            position: "absolute", top: "-100%", left: "-70%",
            width: "55%", height: "300%",
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)",
            transform: "skewX(-14deg)",
          }}
          animate={{ left: ["-70%", "140%"] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 4.5, ease: "linear" }}
        />
      </div>

      {/* Layer 4: Hover reactive glow — sharpens on hover */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", inset: 0, borderRadius, pointerEvents: "none", zIndex: 2 }}
        animate={{
          boxShadow: isHovered
            ? `0 0 28px 4px ${glowColor}35, 0 0 56px 8px ${glowColor}14`
            : `0 0 0 0 transparent`,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </>
  );
};

/* ═══════════════════════════════════════════
   CURSOR GLOW — smooth interpolated radial
═══════════════════════════════════════════ */
const CursorGlow = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 50, y: 50, op: 0 });
  const curRef = useRef({ x: 50, y: 50, op: 0 });
  const inside = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      // Opacity: highest near center
      const dx = x - 50, dy = y - 50;
      const dist = Math.hypot(dx, dy);
      const op = Math.max(0, 0.38 - dist / 140);
      targetRef.current = { x, y, op };
    };
    const onEnter = () => { inside.current = true; };
    const onLeave = () => { inside.current = false; targetRef.current.op = 0; };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    let raf: number;
    const loop = () => {
      const t = targetRef.current, c = curRef.current;
      const ease = 0.07;
      c.x += (t.x - c.x) * ease;
      c.y += (t.y - c.y) * ease;
      c.op += (t.op - c.op) * ease;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(ellipse 55% 40% at ${c.x}% ${c.y}%, hsl(var(--primary)/${c.op.toFixed(3)}) 0%, transparent 70%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={glowRef}
      aria-hidden
      style={{
        position: "absolute", inset: 0, borderRadius: 18,
        pointerEvents: "none", zIndex: 0,
        willChange: "background",
      }}
    />
  );
};

/* ═══════════════════════════════════════════
   FORM FIELD
═══════════════════════════════════════════ */
interface FieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  error?: string;
}

const FormField = ({
  id, label, type = "text", placeholder, value,
  onChange, required, multiline, rows = 5, error,
}: FieldProps) => {
  const [focused, setFocused] = useState(false);
  const [swept, setSwept] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    setSwept(false);
    setTimeout(() => setSwept(true), 30);
    setTimeout(() => setSwept(false), 650);
  };

  const borderColor = error
    ? "hsl(0,70%,55%/0.75)"
    : focused
    ? "hsl(var(--primary)/0.75)"
    : "hsl(var(--border)/0.5)";

  const boxShadow = error
    ? "0 0 0 3px hsl(0,70%,55%/0.14)"
    : focused
    ? "0 0 0 3px hsl(var(--primary)/0.13), 0 0 18px hsl(var(--primary)/0.10)"
    : "none";

  const sharedStyle: React.CSSProperties = {
    width: "100%", outline: "none",
    padding: "10px 14px 10px 16px",
    background: "hsl(var(--background)/0.65)",
    border: `1.5px solid ${borderColor}`,
    borderRadius: 10,
    color: "hsl(var(--foreground))",
    fontSize: "clamp(12px,1.7vw,13.5px)",
    boxShadow,
    backdropFilter: "blur(8px)",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    fontFamily: "inherit",
    resize: "none" as const,
  };

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block font-semibold tracking-wide"
        style={{
          fontSize: "clamp(10px,1.5vw,11.5px)",
          color: error ? "hsl(0,70%,55%)" : "hsl(var(--foreground)/0.65)",
          transition: "color 0.2s",
        }}
      >
        {label}{required && <span style={{ color: "hsl(var(--primary))", marginLeft: 3 }}>*</span>}
      </label>

      <div className="relative overflow-hidden rounded-[10px]">
        {/* Focus sweep highlight */}
        <AnimatePresence>
          {swept && (
            <motion.div
              key="sweep"
              aria-hidden
              initial={{ left: "-80%", opacity: 0.7 }}
              animate={{ left: "130%", opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                position: "absolute", top: 0, bottom: 0, width: "60%",
                background: "linear-gradient(90deg,transparent,hsl(var(--primary)/0.15),transparent)",
                transform: "skewX(-12deg)", pointerEvents: "none", zIndex: 5,
              }}
            />
          )}
        </AnimatePresence>

        {multiline ? (
          <textarea id={id} rows={rows} placeholder={placeholder} value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={handleFocus} onBlur={() => setFocused(false)}
            required={required} style={sharedStyle}
          />
        ) : (
          <input id={id} type={type} placeholder={placeholder} value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={handleFocus} onBlur={() => setFocused(false)}
            required={required} style={sharedStyle}
          />
        )}

        {/* Focus ripple ring */}
        <AnimatePresence>
          {focused && (
            <motion.div
              key="ripple"
              aria-hidden
              initial={{ opacity: 0.7, scale: 0.96 }}
              animate={{ opacity: 0, scale: 1.03 }}
              exit={{}}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                position: "absolute", inset: 0, borderRadius: 10,
                border: "2px solid hsl(var(--primary)/0.55)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            style={{ fontSize: "clamp(10px,1.4vw,11px)", color: "hsl(0,70%,58%)", paddingTop: 2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SUBMIT BUTTON — full interaction choreography
═══════════════════════════════════════════ */
const SubmitButton = ({ status }: { status: Status }) => {
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top, key: Date.now() });
  };

  const labels: Record<Status, string> = {
    idle: "Send Message", sending: "Sending…", success: "Message Sent!", error: "Try Again",
  };
  const bg: Record<Status, string> = {
    idle: "linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))",
    sending: "linear-gradient(135deg,#818cf8,#6366f1)",
    success: "linear-gradient(135deg,#22c55e,#16a34a)",
    error: "linear-gradient(135deg,#f87171,#ef4444)",
  };
  const shadow: Record<Status, string> = {
    idle: "0 6px 26px -4px hsl(var(--primary)/0.45)",
    sending: "0 6px 26px -4px #6366f155",
    success: "0 6px 26px -4px #22c55e55",
    error: "0 6px 26px -4px #ef444455",
  };

  const disabled = status === "sending" || status === "success";

  return (
    <motion.button
      type="submit"
      disabled={disabled}
      onClick={handleClick}
      className="relative w-full font-bold tracking-wide text-white overflow-hidden"
      style={{
        padding: "clamp(11px,2vw,14px) 0",
        borderRadius: 12,
        background: bg[status],
        boxShadow: shadow[status],
        fontSize: "clamp(12px,1.8vw,14px)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.88 : 1,
        border: "none",
        transition: "box-shadow 0.3s ease, background 0.4s ease",
      }}
      whileHover={!disabled ? {
        scale: 1.025,
        y: -2,
        boxShadow: `0 10px 36px -6px hsl(var(--primary)/0.55)`,
      } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      {/* Shimmer sweep on hover */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)",
          skewX: -12,
        }}
        initial={{ x: "-120%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.55 }}
      />

      {/* Inner expanding glow on hover */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", inset: 0, borderRadius: 12, pointerEvents: "none" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        animate={{ opacity: 0 }}
      >
        <motion.div
          style={{
            position: "absolute", inset: 0, borderRadius: 12,
            background: "radial-gradient(ellipse at center,rgba(255,255,255,0.12) 0%,transparent 70%)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Click ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={ripple.key}
            aria-hidden
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x, top: ripple.y,
              width: 24, height: 24,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.35)",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {status === "sending" && (
          <motion.span
            style={{
              width: 14, height: 14, borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.4)",
              borderTopColor: "white",
              display: "inline-block",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
          />
        )}
        {status === "success" && (
          <motion.svg viewBox="0 0 24 24" width={16} height={16} fill="none"
            stroke="white" strokeWidth={2.5} strokeLinecap="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.42, ease: [0.22,1,0.36,1] }}
            />
          </motion.svg>
        )}
        {labels[status]}
      </span>

      {/* Success pulse ring */}
      {status === "success" && (
        <motion.span
          aria-hidden
          style={{ position: "absolute", inset: 0, borderRadius: 12, pointerEvents: "none" }}
          animate={{ boxShadow: ["0 0 0 0px #22c55e55","0 0 0 14px transparent"] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

/* ═══════════════════════════════════════════
   STATUS FEEDBACK
═══════════════════════════════════════════ */
const StatusFeedback = ({ status }: { status: Status }) => (
  <AnimatePresence>
    {(status === "success" || status === "error") && (
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
        style={{
          padding: "12px 16px",
          borderRadius: 12,
          fontSize: "clamp(11px,1.6vw,12.5px)",
          background: status === "success" ? "hsl(142,65%,44%/0.10)" : "hsl(0,70%,55%/0.10)",
          border: `1px solid ${status === "success" ? "hsl(142,65%,44%/0.28)" : "hsl(0,70%,55%/0.28)"}`,
          color: status === "success" ? "hsl(142,68%,44%)" : "hsl(0,70%,60%)",
          display: "flex", alignItems: "flex-start", gap: 10,
        }}
      >
        {/* Outward glow wave on success */}
        {status === "success" && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "absolute", inset: 0, borderRadius: 12,
              boxShadow: "0 0 0 2px hsl(142,65%,48%/0.6)",
              pointerEvents: "none",
            }}
          />
        )}
        <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>
          {status === "success" ? "✓" : "✕"}
        </span>
        <span style={{ lineHeight: 1.5 }}>
          {status === "success"
            ? "Message received! I'll hit you back within 24 hours. Stay ready."
            : "Transmission failed. Check your connection and try again."}
        </span>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ═══════════════════════════════════════════
   MAIN ContactForm
═══════════════════════════════════════════ */
const ContactForm = () => {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<Status>("idle");
  const [errors, setErrors]   = useState<Record<string,string>>({});
  const [hovered, setHovered] = useState(false);
  const [shaking, setShaking] = useState(false);

  // 3D tilt
  const containerRef = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 110, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 110, damping: 20 });
  const sDepth = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });

  // Trigger shake on error
  useEffect(() => {
    if (status === "error") {
      setShaking(true);
      setTimeout(() => setShaking(false), 520);
    }
  }, [status]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    rotY.set(dx * 4);
    rotX.set(-dy * 2.5);
  }, [rotX, rotY]);

  const handleMouseLeave = useCallback(() => {
    rotX.set(0); rotY.set(0);
  }, [rotX, rotY]);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!name.trim()) e.name = "Your name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!subject.trim()) e.subject = "Add a subject";
    if (!message.trim() || message.length < 10) e.message = "At least 10 characters";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: name, from_email: email, subject, message, reply_to: email },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setName(""); setEmail(""); setSubject(""); setMessage("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const clrErr = (field: string) => setErrors(e => ({ ...e, [field]: "" }));

  const BORDER_R = 18;

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        position: "relative",
        rotateX: sRotX,
        rotateY: sRotY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      // Error shake
      animate={shaking ? {
        x: [0, -3, 3, -3, 2, -2, 1, -1, 0],
        transition: { duration: 0.48, ease: "easeInOut" },
      } : { x: 0 }}
    >
      {/* ─── All border layers ─── */}
      <BorderLayers status={status} isHovered={hovered} />

      {/* ─── Energy ray orbiting the border ─── */}
      <EnergyRayBorder status={status} isHovered={hovered} borderRadius={BORDER_R} />

      {/* ─── Cursor ambient glow ─── */}
      <CursorGlow containerRef={containerRef} />

      {/* ─── Glass inner surface ─── */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          borderRadius: BORDER_R,
          padding: "clamp(20px,4vw,32px)",
          background: "hsl(var(--card)/0.60)",
          backdropFilter: "blur(22px)",
          // Parallax inner shift on tilt
          translateZ: 12,
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 24px 60px hsl(var(--primary)/0.08), 0 8px 24px rgba(0,0,0,0.14)"
            : "0 8px 32px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.35s ease",
        }}
      >
        {/* Top accent line */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
          background: "linear-gradient(90deg,transparent,hsl(var(--primary)/0.45),hsl(var(--accent)/0.35),transparent)",
          borderRadius: "0 0 8px 8px",
        }} />

        {/* Heading */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 mb-3">
            {/* Traffic lights */}
            {["#ef4444","#f59e0b","#22c55e"].map((c,i) => (
              <motion.span key={i} style={{ width:9, height:9, borderRadius:"50%", background:c, display:"inline-block" }}
                animate={{ opacity:[0.65,1,0.65] }}
                transition={{ duration:2.2, repeat:Infinity, delay:i*0.6 }}
              />
            ))}
            <span style={{
              marginLeft: 6, fontSize:"clamp(9px,1.4vw,10.5px)",
              fontWeight:700, letterSpacing:"0.18em",
              color:"hsl(var(--primary)/0.65)", textTransform:"uppercase",
            }}>
              Message Terminal
            </span>
          </div>

          <h3 style={{
            fontSize:"clamp(1.2rem,2.8vw,1.65rem)",
            fontWeight:900, letterSpacing:"-0.02em",
            color:"hsl(var(--foreground))",
            lineHeight:1.15,
          }}>
            Drop a Message
          </h3>
          <p style={{ fontSize:"clamp(11px,1.6vw,13px)", color:"hsl(var(--muted-foreground)/0.65)", lineHeight:1.5 }}>
            Got a mission? Fill this out and I'll respond ASAP.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="cf-name" label="Player Name" placeholder="e.g. Rupesh Poudel"
              value={name} onChange={v => { setName(v); clrErr("name"); }}
              required error={errors.name}
            />
            <FormField id="cf-email" label="Email Address" type="email" placeholder="you@example.com"
              value={email} onChange={v => { setEmail(v); clrErr("email"); }}
              required error={errors.email}
            />
          </div>

          <FormField id="cf-subject" label="Mission Subject" placeholder="e.g. Project idea, collab, freelance…"
            value={subject} onChange={v => { setSubject(v); clrErr("subject"); }}
            required error={errors.subject}
          />

          <FormField id="cf-message" label="Your Message" placeholder="Type your message here…"
            value={message} onChange={v => { setMessage(v); clrErr("message"); }}
            required multiline rows={5} error={errors.message}
          />

          <StatusFeedback status={status} />

          <SubmitButton status={status} />

          <p style={{
            textAlign:"center", fontSize:"clamp(9px,1.3vw,10px)",
            color:"hsl(var(--muted-foreground)/0.35)", marginTop:4,
          }}>
            Sent via EmailJS · Response within 24 hours
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;