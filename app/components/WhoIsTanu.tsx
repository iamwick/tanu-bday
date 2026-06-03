"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const traits = [
  { word: "Kind.", delay: 0.1 },
  { word: "Emotional.", delay: 0.2 },
  { word: "Stubborn.", delay: 0.3 },
  { word: "Thoughtful.", delay: 0.4 },
  { word: "Hopeful.", delay: 0.5 },
];

const descriptions = [
  "Someone who always tries to see the good in people.",
  "Someone who connects with people effortlessly.",
  "Someone who feels deeply.",
  "Someone who cares more than she admits.",
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
          transition={{ duration: 1 }}
          className="text-center mb-20" style={{ textAlign: "center" }}
        >
          <p className="mc-label" style={{
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}>
            The Story Begins With
          </p>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 700,
            color: "#ffffff",
          }}>
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
              transition={{ delay: trait.delay, duration: 0.8, type: "spring" }}
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
                color: "rgba(255,255,255,0.85)",
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
              transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
                maxWidth: "480px",
              }}
            >
              {desc}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
