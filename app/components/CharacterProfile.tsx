"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const attributes = [
  { name: "Kindness", value: 100 },
  { name: "Empathy", value: 100 },
  { name: "Stubbornness", value: 95 },
  { name: "Humor", value: 85 },
  { name: "Emotional Damage", value: 90 },
  { name: "Ability to Connect", value: 100 },
];

const achievements = [
  "Survived difficult chapters",
  "Believed in people",
  "Made countless people smile",
  "Continued moving forward",
  "Reached Level 26",
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
          transition={{ duration: 1 }}
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
          transition={{ delay: 0.3, duration: 1, type: "spring" }}
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
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    style={{ display: "flex", alignItems: "center", gap: "16px" }}
                  >
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.5)",
                      width: "144px",
                      flexShrink: 0,
                      fontWeight: 400,
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
                        style={{ background: "rgba(255,255,255,0.7)", height: "100%" }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${attr.value}%` } : {}}
                        transition={{ delay: 0.7 + i * 0.1, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.7)",
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
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                    style={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>✓</span>
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 400,
                    }}>{a}</span>
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
