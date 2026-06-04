"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const traits = [
  { word: "Kind.", delay: 0.05, color: "#ff6b9d" },
  { word: "Emotional.", delay: 0.1, color: "#c084fc" },
  { word: "Stubborn.", delay: 0.15, color: "#fbbf24" },
  { word: "Thoughtful.", delay: 0.2, color: "#34d399" },
  { word: "Hopeful.", delay: 0.25, color: "#60a5fa" },
];

const descriptions = [
  { text: "Someone who always tries to see the good in people.", color: "#ff6b9d" },
  { text: "Someone who connects with people effortlessly.", color: "#c084fc" },
  { text: "Someone who feels deeply.", color: "#fbbf24" },
  { text: "Someone who cares more than she admits.", color: "#34d399" },
];

export default function WhoIsTanu() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 overflow-hidden w-full max-w-full" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, #080808 0%, #101010 50%, #080808 100%)"
      }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-20" style={{ textAlign: "center" }}
        >
          <p className="mc-label" style={{
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}>
            The Story Begins With
          </p>
          <h2
            className="text-gradient-birthday"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 700,
            }}
          >
            Who Is Tanu?
          </h2>
        </motion.div>

        {/* Trait cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {traits.map((trait, i) => (
            <motion.div
              key={trait.word}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: trait.delay, duration: 0.4, type: "spring" }}
              whileHover={{ y: -8, scale: 1.04 }}
              style={{
                padding: "20px 32px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                cursor: "default",
                animation: `floatAnim ${5 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <span style={{
                fontFamily: FONT,
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                fontWeight: 600,
                color: trait.color,
                textShadow: `0 0 20px ${trait.color}60`,
              }}>
                {trait.word}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Description lines */}
        <div className="flex flex-col items-center gap-6 overflow-hidden w-full">
          {descriptions.map((desc, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: desc.color,
                textShadow: `0 0 24px ${desc.color}50`,
                textAlign: "center",
                maxWidth: "480px",
              }}
            >
              {desc.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
