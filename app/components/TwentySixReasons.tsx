"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const reasons = [
  "You're kind.",
  "You're genuine.",
  "You're emotionally brave.",
  "You care deeply.",
  "You're funny when comfortable.",
  "You're memorable.",
  "You're stubborn in a cute way.",
  "You make people feel seen.",
  "You listen — really listen.",
  "You're honest.",
  "You find beauty in small things.",
  "You're loyal.",
  "You try, even when it's hard.",
  "You're soft and strong at once.",
  "You never stop caring.",
  "You give people the benefit of the doubt.",
  "You make ordinary moments better.",
  "You're someone people remember.",
  "You're a safe person to be around.",
  "You carry warmth wherever you go.",
  "You dream big even when you don't say it out loud.",
  "You're growing into someone remarkable.",
  "You've survived every hard day so far.",
  "You make the world a warmer place.",
  "You're exactly who you need to be right now.",
  "You exist — and that alone is enough reason to celebrate.",
];

export default function TwentySixReasons() {
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
          className="text-center mb-16" style={{ textAlign: "center" }}
        >
          <p className="mc-label" style={{
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}>
            A List
          </p>
          <h2
            className="text-gradient-birthday"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
              fontWeight: 400,
              marginBottom: "16px",
              lineHeight: 1.4,
            }}
          >
            26 Reasons
          </h2>
          <p className="mc-label" style={{
            color: "rgba(255,255,255,0.35)",
          }}>
            why Chapter 26 should be celebrated
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.5, type: "spring" }}
              whileHover={{ y: -6, scale: 1.03 }}
              style={{
                cursor: "default",
                animation: `floatAnim ${4 + (i % 4) * 0.5}s ease-in-out infinite`,
                animationDelay: `${(i * 0.3) % 3}s`,
              }}
            >
              <div className="mc-card" style={{
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.5)",
                  minWidth: "22px",
                  textShadow: "1px 1px 0 #000",
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{
                  fontFamily: FONT,
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 400,
                  textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
                }}>
                  {reason}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
