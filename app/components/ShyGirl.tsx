"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const FONT = "'Press Start 2P', monospace";

const lines = [
  { text: "When I first met you...", delay: 0, color: "rgba(255,255,255,0.6)" },
  { text: "You were incredibly shy.", delay: 1800, color: "#c084fc" },
  { text: "You wouldn't even show me your face.", delay: 3800, color: "#60a5fa" },
  { text: "And somehow...", delay: 6000, color: "rgba(255,255,255,0.6)" },
  { text: "I'm really glad you eventually did.", delay: 7800, color: "#ff6b9d" },
];

export default function ShyGirl() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    if (!inView) return;
    lines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay + 400);
      return () => clearTimeout(t);
    });
    const photoTimer = setTimeout(() => setShowPhoto(true), 10000);
    return () => clearTimeout(photoTimer);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
      style={{ background: "#080808" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, #080808 100%)"
      }} />

      <div className="relative z-10 max-w-2xl mx-auto text-center w-full" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
        <motion.p
          className="mc-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            color: "rgba(255,255,255,0.3)",
            marginBottom: "64px",
          }}
        >
          A Memory
        </motion.p>

        {/* Lines */}
        <div style={{ marginBottom: "64px", minHeight: "220px" }}>
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={visibleLines.includes(i) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: FONT,
                fontSize: i === 4 ? "clamp(1.3rem, 4vw, 1.8rem)" : "clamp(1.1rem, 3vw, 1.5rem)",
                fontWeight: i === 4 ? 600 : 400,
                color: line.color,
                textShadow: i === 4 ? `0 0 20px ${line.color}80` : `0 0 14px ${line.color}40`,
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={showPhoto ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative mx-auto overflow-hidden"
          style={{
            width: "260px",
            height: "320px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{
            background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)"
          }}>
            <span style={{ fontFamily: FONT, fontSize: "80px", fontWeight: 800, color: "rgba(255,255,255,0.08)" }}>T</span>
          </div>
          <Image
            src="/images/tanu-2.jpg"
            alt="Tanu"
            fill
            className="object-cover object-top"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, transparent 60%, rgba(8,8,8,0.4) 100%)"
          }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={showPhoto ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          style={{
            fontFamily: FONT,
            fontSize: "13px",
            color: "rgba(255,255,255,0.25)",
            fontStyle: "italic",
            fontWeight: 300,
            marginTop: "24px",
          }}
        >
          there she is.
        </motion.p>
      </div>
    </section>
  );
}
