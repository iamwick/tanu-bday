"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const cards = [
  { text: "You make people comfortable.", icon: "✦" },
  { text: "You look for the best in people.", icon: "◈" },
  { text: "You make conversations feel effortless.", icon: "✦" },
  { text: "You make people feel understood.", icon: "◈" },
  { text: "You carry more strength than you realize.", icon: "✦" },
  { text: "You care deeply even when it hurts.", icon: "◈" },
  { text: "You bring warmth into ordinary moments.", icon: "✦" },
  { text: "You leave an impression long after conversations end.", icon: "◈" },
];

export default function ThingsYouDontSee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)"
      }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-6" style={{ textAlign: "center" }}
        >
          <p className="mc-label" style={{
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}>
            Things Worth Knowing
          </p>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 700,
            color: "#ffffff",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Things You Don&apos;t Always See
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
          style={{
            fontFamily: FONT,
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "64px",
          }}
        >
          &ldquo;Sometimes the people who make others feel special forget how special they are.&rdquo;
        </motion.p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7, type: "spring" }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative overflow-hidden cursor-default"
              style={{
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "border-color 0.3s",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)"
              }} />
              <div className="flex items-start gap-4">
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "16px", marginTop: "2px", flexShrink: 0 }}>
                  {card.icon}
                </span>
                <p style={{
                  fontFamily: FONT,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}>
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
