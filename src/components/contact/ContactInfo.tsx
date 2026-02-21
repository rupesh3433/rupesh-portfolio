import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocialLinks from "./SocialLinks";

/* ── Icons ── */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const WAIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

/* ── Info Card with hover micro-pulse ── */
interface CardProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  delay?: number;
  children: React.ReactNode;
}

const InfoCard = ({ icon, label, color, delay = 0, children }: CardProps) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22,1,0.36,1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:"relative", display:"flex", gap:14, alignItems:"flex-start",
        padding:"14px 16px", borderRadius:14, overflow:"hidden", cursor:"default",
        background:"hsl(var(--card)/0.5)",
        border:`1px solid ${hov ? `${color}40` : "hsl(var(--border)/0.38)"}`,
        backdropFilter:"blur(12px)",
        boxShadow: hov ? `0 4px 22px ${color}20, 0 0 0 1px ${color}22` : "none",
        transition:"border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Left accent bar */}
      <motion.div
        style={{ position:"absolute", left:0, top:10, bottom:10, width:2, borderRadius:2, background:color }}
        initial={{ scaleY:0 }}
        whileInView={{ scaleY:1 }}
        viewport={{ once:true }}
        transition={{ delay: delay + 0.18, duration:0.45 }}
      />

      {/* Hover bg wash */}
      <motion.div
        style={{
          position:"absolute", inset:0, borderRadius:14,
          background:`${color}09`, pointerEvents:"none",
        }}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration:0.25 }}
      />

      {/* Icon */}
      <motion.div
        style={{
          width:36, height:36, flexShrink:0, borderRadius:10, marginTop:1,
          display:"flex", alignItems:"center", justifyContent:"center",
          background:`${color}18`, border:`1px solid ${color}30`, color,
        }}
        animate={{ scale: hov ? 1.07 : 1, filter: hov ? `drop-shadow(0 0 6px ${color}70)` : "none" }}
        transition={{ duration:0.2 }}
      >
        <span style={{ width:17, height:17 }}>{icon}</span>
      </motion.div>

      {/* Content */}
      <div style={{ position:"relative", zIndex:1, minWidth:0, flex:1 }}>
        <p style={{
          fontSize:"clamp(9px,1.3vw,10.5px)", fontWeight:700,
          letterSpacing:"0.16em", textTransform:"uppercase",
          color:`${color}bb`, marginBottom:4,
        }}>
          {label}
        </p>
        {children}
      </div>
    </motion.div>
  );
};

/* ── Clickable link row ── */
const LinkRow = ({
  href, text, badge, isExternal,
}: { href:string; text:string; badge?:string; isExternal?:boolean }) => (
  <a
    href={href}
    target={isExternal ? "_blank" : undefined}
    rel={isExternal ? "noopener noreferrer" : undefined}
    className="group flex items-center gap-2 hover:underline underline-offset-2 w-fit max-w-full"
    style={{
      fontSize:"clamp(11.5px,1.7vw,13px)",
      color:"hsl(var(--foreground)/0.88)",
      fontWeight:600,
      transition:"color 0.2s",
      lineHeight:1.4,
    }}
  >
    <span className="truncate">{text}</span>
    {badge && (
      <span style={{
        fontSize:9, fontWeight:700, padding:"1px 7px", borderRadius:20,
        background:"hsl(var(--primary)/0.14)", color:"hsl(var(--primary))",
        border:"1px solid hsl(var(--primary)/0.28)", flexShrink:0,
      }}>
        {badge}
      </span>
    )}
  </a>
);

/* ── WhatsApp CTA ── */
const WhatsAppButton = () => {
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      href="https://wa.me/918149992239"
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity:0, y:12 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ delay:0.5, duration:0.48, ease:[0.22,1,0.36,1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex items-center justify-center gap-2.5 w-full overflow-hidden"
      style={{
        padding:"clamp(10px,1.8vw,13px)",
        borderRadius:12,
        background: hov
          ? "linear-gradient(135deg,#25d366,#20b556)"
          : "linear-gradient(135deg,#25d36690,#128c7e90)",
        boxShadow: hov ? "0 6px 26px #25d36650" : "0 2px 12px #25d36630",
        color:"#fff",
        fontWeight:700,
        fontSize:"clamp(12px,1.8vw,13.5px)",
        textDecoration:"none",
        transition:"background 0.3s, box-shadow 0.3s",
      }}
      whileHover={{ scale:1.02, y:-2 }}
      whileTap={{ scale:0.97 }}
    >
      {/* Shimmer */}
      <motion.div
        aria-hidden
        style={{
          position:"absolute", inset:0, pointerEvents:"none",
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)",
          skewX:-12,
        }}
        initial={{ x:"-120%" }}
        whileHover={{ x:"200%" }}
        transition={{ duration:0.5 }}
      />
      <span style={{ width:20, height:20, flexShrink:0 }}><WAIcon /></span>
      <span className="relative z-10">Chat on WhatsApp</span>
      {/* Pulse ring */}
      <motion.span
        aria-hidden
        style={{ position:"absolute", inset:0, borderRadius:12, pointerEvents:"none" }}
        animate={{ boxShadow:["0 0 0 0px #25d36650","0 0 0 10px transparent"] }}
        transition={{ duration:2, repeat:Infinity }}
      />
    </motion.a>
  );
};

/* ── Main ContactInfo ── */
const ContactInfo = () => (
  <div className="space-y-4">
    {/* Section label */}
    <motion.div
      initial={{ opacity:0, y:-8 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      className="flex items-center gap-2 mb-1"
    >
      <span style={{
        fontSize:"clamp(9px,1.3vw,10.5px)", fontWeight:700,
        letterSpacing:"0.2em", textTransform:"uppercase",
        color:"hsl(var(--primary)/0.7)",
      }}>
        Find Me Online
      </span>
      <div style={{ flex:1, height:1, background:"hsl(var(--primary)/0.16)" }}/>
    </motion.div>

    {/* Email */}
    <InfoCard icon={<MailIcon/>} label="Email" color="hsl(var(--primary))" delay={0.05}>
      <LinkRow href="mailto:poudelrupace@gmail.com" text="poudelrupace@gmail.com"/>
    </InfoCard>

    {/* Phone */}
    <InfoCard icon={<PhoneIcon/>} label="Phone" color="#22d3ee" delay={0.14}>
      <div className="space-y-1">
        <LinkRow href="tel:+918149992239" text="+91 81499 92239" badge="India"/>
        <LinkRow href="tel:+9779828725558" text="+977 98287 25558" badge="Nepal"/>
      </div>
    </InfoCard>

    {/* Location */}
    <InfoCard icon={<LocationIcon/>} label="Based In" color="#a78bfa" delay={0.23}>
      <p style={{ fontSize:"clamp(12px,1.7vw,13px)", fontWeight:600, color:"hsl(var(--foreground)/0.85)" }}>
        India &amp; Nepal
      </p>
    </InfoCard>

    {/* WhatsApp CTA */}
    <WhatsAppButton/>

    {/* Divider */}
    <div className="flex items-center gap-3">
      <div style={{ flex:1, height:1, background:"hsl(var(--border)/0.35)" }}/>
      <span style={{ fontSize:"clamp(9px,1.2vw,10px)", letterSpacing:"0.18em",
        textTransform:"uppercase", color:"hsl(var(--muted-foreground)/0.42)" }}>
        Social
      </span>
      <div style={{ flex:1, height:1, background:"hsl(var(--border)/0.35)" }}/>
    </div>

    {/* Social links */}
    <SocialLinks/>
  </div>
);

export default ContactInfo;