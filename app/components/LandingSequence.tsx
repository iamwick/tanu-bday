"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingSequenceProps {
  onComplete: () => void;
  onBegin?: () => void;
}

const lines = [
  "Every person has a story.",
  "Some stories are louder than others.",
  "And some quietly change the people around them.",
  "Tanu.",
  "Welcome to Chapter 26.",
];

const FONT = "'Press Start 2P', monospace";

function CakeSVG({ flip, size = 220 }: { flip: boolean; size?: number }) {
  const h = Math.round(260 * (size / 220));
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : "none", filter: "drop-shadow(0 0 24px rgba(255,180,100,0.35))" }}
    >
      {/* Candles */}
      <rect x="52" y="30" width="10" height="30" rx="3" fill="#FF6B9D" />
      <rect x="78" y="20" width="10" height="38" rx="3" fill="#FFD93D" />
      <rect x="104" y="28" width="10" height="32" rx="3" fill="#6BCB77" />
      <rect x="130" y="18" width="10" height="40" rx="3" fill="#C77DFF" />
      <rect x="156" y="26" width="10" height="34" rx="3" fill="#4D96FF" />
      {/* Flames */}
      <ellipse cx="57" cy="26" rx="5" ry="8" fill="#FFD93D" opacity="0.9" />
      <ellipse cx="57" cy="24" rx="3" ry="5" fill="#FF9500" />
      <ellipse cx="83" cy="16" rx="5" ry="8" fill="#FFD93D" opacity="0.9" />
      <ellipse cx="83" cy="14" rx="3" ry="5" fill="#FF9500" />
      <ellipse cx="109" cy="24" rx="5" ry="8" fill="#FFD93D" opacity="0.9" />
      <ellipse cx="109" cy="22" rx="3" ry="5" fill="#FF9500" />
      <ellipse cx="135" cy="14" rx="5" ry="8" fill="#FFD93D" opacity="0.9" />
      <ellipse cx="135" cy="12" rx="3" ry="5" fill="#FF9500" />
      <ellipse cx="161" cy="22" rx="5" ry="8" fill="#FFD93D" opacity="0.9" />
      <ellipse cx="161" cy="20" rx="3" ry="5" fill="#FF9500" />

      {/* Top tier */}
      <rect x="40" y="58" width="140" height="54" rx="6" fill="#FF6B9D" />
      <rect x="40" y="58" width="140" height="14" rx="6" fill="#FF8FB1" />
      {/* Top tier frosting drips */}
      {[50,68,86,104,122,140,158].map((x, i) => (
        <ellipse key={i} cx={x} cy="72" rx="7" ry="9" fill="white" opacity="0.85" />
      ))}
      {/* Top tier dots */}
      {[60,90,120,150].map((x, i) => (
        <circle key={i} cx={x} cy="92" r="5" fill={["#FFD93D","#6BCB77","#C77DFF","#4D96FF"][i]} />
      ))}

      {/* Middle tier */}
      <rect x="20" y="112" width="180" height="64" rx="6" fill="#C77DFF" />
      <rect x="20" y="112" width="180" height="16" rx="6" fill="#D9A0FF" />
      {/* Middle tier frosting drips */}
      {[30,52,74,96,118,140,162,184].map((x, i) => (
        <ellipse key={i} cx={x} cy="128" rx="8" ry="10" fill="white" opacity="0.8" />
      ))}
      {/* Middle tier decorations */}
      {[45,85,125,165].map((x, i) => (
        <rect key={i} x={x-6} y="143" width="12" height="12" rx="2"
          fill={["#FF6B9D","#FFD93D","#6BCB77","#4D96FF"][i]} />
      ))}

      {/* Bottom tier */}
      <rect x="0" y="176" width="220" height="72" rx="6" fill="#FFD93D" />
      <rect x="0" y="176" width="220" height="18" rx="6" fill="#FFE76B" />
      {/* Bottom tier frosting drips */}
      {[10,36,62,88,114,140,166,192,210].map((x, i) => (
        <ellipse key={i} cx={x} cy="194" rx="9" ry="11" fill="white" opacity="0.75" />
      ))}
      {/* Bottom tier stars */}
      {[30,70,110,150,190].map((x, i) => (
        <text key={i} x={x} y="228" fontSize="16" textAnchor="middle"
          fill={["#FF6B9D","#C77DFF","#6BCB77","#4D96FF","#FF6B9D"][i]}>★</text>
      ))}

      {/* Plate */}
      <ellipse cx="110" cy="248" rx="115" ry="10" fill="rgba(255,255,255,0.15)" />
    </svg>
  );
}

export default function LandingSequence({ onComplete, onBegin }: LandingSequenceProps) {
  const [phase, setPhase] = useState<"entry" | "sunrise" | "text" | "done">("entry");
  const [lineIndex, setLineIndex] = useState(-1);
  const [showEntry, setShowEntry] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cakeSize = windowWidth > 0 && windowWidth < 480 ? 110 : windowWidth < 768 ? 154 : 220;
  const cakeOffset =
    windowWidth > 0 && windowWidth < 480
      ? "calc(50% - 185px)"
      : windowWidth < 768
      ? "calc(50% - 290px)"
      : "calc(50% - 360px)";
  const isMobileCake = windowWidth > 0 && windowWidth < 768;
  const cakePositionStyle = isMobileCake
    ? { bottom: "0px", top: "auto", transform: "none" }
    : { top: "50%", bottom: "auto", transform: "translateY(-50%)" };

  const handleBegin = useCallback(() => {
    onBegin?.();
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

          {/* Cakes — slide in from sides, shown during entry */}
          <AnimatePresence>
            {showEntry && (
              <>
                <motion.div
                  key="cake-left"
                  initial={{ x: "-60vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", left: cakeOffset, ...cakePositionStyle, zIndex: 20 }}
                >
                  <CakeSVG flip={false} size={cakeSize} />
                </motion.div>
                <motion.div
                  key="cake-right"
                  initial={{ x: "60vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", right: cakeOffset, ...cakePositionStyle, zIndex: 20 }}
                >
                  <CakeSVG flip={true} size={cakeSize} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Entry screen */}
          <AnimatePresence>
            {showEntry && (
              <motion.div
                key="entry"
                className="relative z-30 flex flex-col items-center gap-8 text-center px-6"
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
                      width: "200px",
                      height: "200px",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <span style={{
                    fontFamily: FONT,
                    fontSize: "52px",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}>
                    Tanu
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
