"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const attributes = [
  { name: "Kindness", value: 100, color: "#ff6b9d" },
  { name: "Empathy", value: 100, color: "#c084fc" },
  { name: "Stubbornness", value: 95, color: "#fbbf24" },
  { name: "Humor", value: 85, color: "#34d399" },
  { name: "Emotional Damage", value: 90, color: "#60a5fa" },
  { name: "Ability to Connect", value: 100, color: "#f9a8d4" },
];

const achievements = [
  { text: "Survived difficult chapters", color: "#f87171" },
  { text: "Believed in people", color: "#c084fc" },
  { text: "Made countless people smile", color: "#fbbf24" },
  { text: "Continued moving forward", color: "#34d399" },
  { text: "Reached Level 26", color: "#ff6b9d" },
];

export default function CharacterProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showCharu, setShowCharu] = useState(false);
  const [nicknameClicks, setNicknameClicks] = useState(0);

  const handleNicknameClick = () => {
    const next = nicknameClicks + 1;
    setNicknameClicks(next);
    if (next >= 3) setShowCharu(true);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)"
      }} />

      <div className="relative z-10 max-w-2xl mx-auto w-full" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-12" style={{ textAlign: "center" }}
        >
          <p className="mc-label" style={{
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}>
            Main Character
          </p>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 700,
            color: "#ffffff",
          }}>
            Character Profile
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0d0d0d",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />

          <div style={{ padding: "32px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
              <div>
                <h3 style={{
                  fontFamily: FONT,
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "4px",
                }}>
                  Tanu
                </h3>
                <button
                  onClick={handleNicknameClick}
                  style={{
                    fontFamily: FONT,
                    fontSize: "13px",
                    color: showCharu ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                >
                  {showCharu ? (
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                      a.k.a. Charu ✦
                    </motion.span>
                  ) : (
                    <span>
                      {nicknameClicks > 0 ? `[${3 - nicknameClicks} more...]` : "nickname hidden..."}
                    </span>
                  )}
                </button>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontFamily: FONT,
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                  fontWeight: 500,
                }}>Level</div>
                <div style={{
                  fontFamily: FONT,
                  fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                }}>26</div>
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <span style={{
                fontFamily: FONT,
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}>Class</span>
              <p style={{
                fontFamily: FONT,
                fontSize: "16px",
                color: "rgba(255,255,255,0.75)",
                marginTop: "4px",
                fontWeight: 400,
              }}>Romance Novel Protagonist</p>
            </div>

            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", margin: "24px 0" }} />

            {/* Attributes */}
            <div style={{ marginBottom: "32px" }}>
              <p style={{
                fontFamily: FONT,
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                marginBottom: "20px",
                fontWeight: 500,
              }}>Attributes</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {attributes.map((attr, i) => (
                  <motion.div
                    key={attr.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
                    style={{ display: "flex", alignItems: "center", gap: "16px" }}
                  >
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "13px",
                      color: attr.color,
                      width: "144px",
                      flexShrink: 0,
                      fontWeight: 400,
                      textShadow: `0 0 12px ${attr.color}50`,
                    }}>
                      {attr.name}
                    </span>
                    <div style={{
                      flex: 1,
                      height: "4px",
                      background: "rgba(255,255,255,0.06)",
                      overflow: "hidden",
                    }}>
                      <motion.div
                        style={{ background: attr.color, height: "100%", boxShadow: `0 0 8px ${attr.color}80` }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${attr.value}%` } : {}}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "13px",
                      fontWeight: 600,
                      color: attr.color,
                      flexShrink: 0,
                    }}>
                      {attr.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", marginBottom: "24px" }} />

            {/* Achievements */}
            <div>
              <p style={{
                fontFamily: FONT,
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                marginBottom: "16px",
                fontWeight: 500,
              }}>Achievements Unlocked</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                    style={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <span style={{ color: a.color, fontSize: "12px", textShadow: `0 0 8px ${a.color}80` }}>✓</span>
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "13px",
                      color: a.color,
                      fontWeight: 400,
                      textShadow: `0 0 10px ${a.color}40`,
                    }}>{a.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}
