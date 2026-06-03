"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingSequenceProps {
  onComplete: () => void;
}

const lines = [
  "Every person has a story.",
  "Some stories are louder than others.",
  "And some quietly change the people around them.",
  "Tanu.",
  "Welcome to Chapter 26.",
];

const FONT = "'Press Start 2P', monospace";

export default function LandingSequence({ onComplete }: LandingSequenceProps) {
  const [phase, setPhase] = useState<"entry" | "sunrise" | "text" | "done">("entry");
  const [lineIndex, setLineIndex] = useState(-1);
  const [showEntry, setShowEntry] = useState(true);

  const handleBegin = useCallback(() => {
    setShowEntry(false);
    setPhase("sunrise");
    setTimeout(() => {
      setPhase("text");
      setLineIndex(0);
    }, 2200);
  }, []);

  useEffect(() => {
    if (phase !== "text" || lineIndex < 0) return;

    if (lineIndex >= lines.length) {
      const t = setTimeout(() => {
        setPhase("done");
        setTimeout(onComplete, 1200);
      }, 600);
      return () => clearTimeout(t);
    }

    const delays = [1800, 2200, 2400, 1800, 1800];
    const t = setTimeout(() => setLineIndex((i) => i + 1), delays[lineIndex] ?? 2000);
    return () => clearTimeout(t);
  }, [phase, lineIndex, onComplete]);

  const isTanuLine = lineIndex === 3;
  const isWelcomeLine = lineIndex === 4;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="landing"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ background: "#080808" }}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />

          {/* Corner decorations */}
          {[
            "top-0 left-0",
            "top-0 right-0 scale-x-[-1]",
            "bottom-0 left-0 scale-y-[-1]",
            "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
          ].map((pos, i) => (
            <div key={i} className={`absolute ${pos} m-5 z-10 w-10 h-10 pointer-events-none`}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "1px", background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)" }} />
            </div>
          ))}

          {/* Sunrise phase — fade from black to slightly lighter black */}
          {phase === "sunrise" && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.2 }}
              style={{ background: "#0a0a0a" }}
            />
          )}

          {/* Entry screen */}
          <AnimatePresence>
            {showEntry && (
              <motion.div
                key="entry"
                className="relative z-10 flex flex-col items-center gap-8 text-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo mark */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-center justify-center"
                >
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: "120px",
                      height: "120px",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <span style={{
                    fontFamily: FONT,
                    fontSize: "72px",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}>
                    T
                  </span>
                </motion.div>

                {/* Chapter label */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <div style={{ height: "1px", width: "32px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3))" }} />
                  <span style={{
                    fontFamily: FONT,
                    fontSize: "11px",
                    letterSpacing: "0.45em",
                    color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}>
                    Chapter 26
                  </span>
                  <div style={{ height: "1px", width: "32px", background: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)" }} />
                </motion.div>

                {/* Begin button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBegin}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                >
                  <div style={{
                    position: "relative",
                    padding: "14px 44px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}>
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: "20%",
                      right: "20%",
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    }} />
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "12px",
                      letterSpacing: "0.35em",
                      color: "rgba(255,255,255,0.85)",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}>
                      Begin Chapter 26
                    </span>
                  </div>
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 2.2, duration: 1 }}
                  style={{
                    fontFamily: FONT,
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.15em",
                    fontWeight: 300,
                  }}
                >
                  best experienced with headphones
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text sequence */}
          {phase === "text" && (
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {lineIndex < lines.length && lineIndex >= 0 && (
                  <motion.p
                    key={lineIndex}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    style={{
                      fontFamily: FONT,
                      fontSize: isTanuLine
                        ? "clamp(4.5rem, 16vw, 9rem)"
                        : isWelcomeLine
                        ? "clamp(1.3rem, 4vw, 2rem)"
                        : "clamp(1rem, 3vw, 1.4rem)",
                      fontWeight: isTanuLine ? 800 : isWelcomeLine ? 500 : 400,
                      letterSpacing: isTanuLine ? "-0.02em" : "0.01em",
                      fontStyle: isWelcomeLine ? "italic" : "normal",
                      color: isTanuLine ? "#ffffff" : isWelcomeLine ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.7)",
                      lineHeight: isTanuLine ? 0.9 : 1.5,
                    }}
                  >
                    {lines[lineIndex]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
