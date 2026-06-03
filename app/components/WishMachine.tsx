"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const wishes = [
  "May this year surprise you.",
  "May your dreams find their way to you.",
  "May your heart stay soft.",
  "May your future be bigger than your fears.",
  "May you never lose your ability to see good in people.",
  "May this chapter be your favourite yet.",
  "May every door you've been waiting on finally open.",
  "May you find exactly what you've been looking for.",
  "May you be as kind to yourself as you are to others.",
  "May joy find you when you least expect it.",
];

const FLOWERS = [
  "🌸", "🌺", "🌻", "🌹", "🌷", "💐", "🌼", "🌿",
  "🌱", "🍀", "🌾", "🌈", "⭐", "🌟", "💫", "✨",
  "🎆", "🎇", "🎋", "🎍",
];

const DOODLES = ["✦", "★", "♥", "✿", "❀", "◆", "✪", "◈", "✺", "⬟", "♦", "✸", "❋", "⁕"];

const PIXEL_FACES = [
  { face: "^_^",   color: "#7fff00" },
  { face: ">w<",   color: "#ff69b4" },
  { face: "^o^",   color: "#ffd700" },
  { face: "uwu",   color: "#ff6b6b" },
  { face: "^‿^",   color: "#00ffff" },
  { face: ":D",    color: "#ff8c00" },
  { face: "xD",    color: "#2ecc71" },
  { face: "\\o/",  color: "#c084fc" },
  { face: "(^v^)", color: "#fb923c" },
  { face: "o(*^*)o", color: "#f472b6" },
];

let globalId = 0;

interface FlowerP {
  id: number;
  left: number;
  top: number;
  xEnd: number;
  yEnd: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
  rotateEnd: number;
}

interface DoodleP {
  id: number;
  left: number;
  top: number;
  char: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  xDrift: number;
  yTravel: number;
}

interface FaceP {
  id: number;
  left: number;
  top: number;
  face: string;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

export default function WishMachine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentWish, setCurrentWish] = useState<string | null>(null);
  const [wishCount, setWishCount] = useState(0);
  const [flowers, setFlowers] = useState<FlowerP[]>([]);
  const [doodles, setDoodles] = useState<DoodleP[]>([]);
  const [faces, setFaces] = useState<FaceP[]>([]);
  const [flashOn, setFlashOn] = useState(false);

  const makeWish = useCallback(() => {
    const wish = wishes[Math.floor(Math.random() * wishes.length)];
    setCurrentWish(wish);
    setWishCount((c) => c + 1);

    // Screen flash
    setFlashOn(true);
    setTimeout(() => setFlashOn(false), 500);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // --- Burst flowers from screen center ---
    const burst: FlowerP[] = Array.from({ length: 70 }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const dist = vw * (0.15 + Math.random() * 0.65);
      return {
        id: globalId++,
        left: vw * 0.5,
        top: vh * 0.5,
        xEnd: Math.cos(angle) * dist,
        yEnd: Math.sin(angle) * dist * 0.55,
        emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
        size: 22 + Math.floor(Math.random() * 44),
        duration: 1.0 + Math.random() * 2.0,
        delay: Math.random() * 0.7,
        rotateEnd: (Math.random() - 0.5) * 720,
      };
    });

    // --- Rain flowers from top ---
    const rain: FlowerP[] = Array.from({ length: 70 }, () => ({
      id: globalId++,
      left: Math.random() * vw,
      top: -80,
      xEnd: (Math.random() - 0.5) * 200,
      yEnd: vh + 160,
      emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      size: 16 + Math.floor(Math.random() * 36),
      duration: 2.5 + Math.random() * 3.5,
      delay: Math.random() * 3.5,
      rotateEnd: (Math.random() - 0.5) * 360,
    }));

    // --- Doodles floating up from bottom ---
    const newDoodles: DoodleP[] = Array.from({ length: 40 }, () => {
      const startTop = vh + 40;
      return {
        id: globalId++,
        left: Math.random() * vw,
        top: startTop,
        char: DOODLES[Math.floor(Math.random() * DOODLES.length)],
        size: 14 + Math.floor(Math.random() * 24),
        duration: 2.5 + Math.random() * 3,
        delay: Math.random() * 2.5,
        color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`,
        xDrift: (Math.random() - 0.5) * 140,
        yTravel: -(startTop + 120),
      };
    });

    // --- Pixel faces popping up all over screen ---
    const newFaces: FaceP[] = Array.from({ length: 22 }, () => {
      const f = PIXEL_FACES[Math.floor(Math.random() * PIXEL_FACES.length)];
      return {
        id: globalId++,
        left: vw * (0.02 + Math.random() * 0.90),
        top: vh * (0.03 + Math.random() * 0.86),
        face: f.face,
        color: f.color,
        size: 7 + Math.floor(Math.random() * 9),
        duration: 2.2 + Math.random() * 2.5,
        delay: 0.1 + Math.random() * 2.2,
      };
    });

    setFlowers([...burst, ...rain]);
    setDoodles(newDoodles);
    setFaces(newFaces);

    setTimeout(() => {
      setFlowers([]);
      setDoodles([]);
      setFaces([]);
    }, 8000);
  }, []);

  const active = flowers.length > 0;

  return (
    <>
      {/* ── Full-viewport particle layer ── */}
      {active && (
        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 9999 }}
        >
          {/* Flowers */}
          {flowers.map((f) => (
            <motion.div
              key={f.id}
              style={{
                position: "absolute",
                left: f.left,
                top: f.top,
                fontSize: f.size,
                lineHeight: 1,
              }}
              initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                x: f.xEnd,
                y: f.yEnd,
                scale: [0, 1.6, 1.1, 0.9],
                rotate: f.rotateEnd,
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: f.duration, delay: f.delay, ease: "easeOut" }}
            >
              {f.emoji}
            </motion.div>
          ))}

          {/* Doodles */}
          {doodles.map((d) => (
            <motion.div
              key={d.id}
              style={{
                position: "absolute",
                left: d.left,
                top: d.top,
                fontFamily: FONT,
                fontSize: d.size,
                color: d.color,
                textShadow: "2px 2px 0 #000",
              }}
              initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              animate={{
                y: d.yTravel,
                x: d.xDrift,
                scale: [0.2, 1.5, 1.1, 0.8],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: d.duration, delay: d.delay, ease: "easeInOut" }}
            >
              {d.char}
            </motion.div>
          ))}

          {/* Pixel faces */}
          {faces.map((fc) => (
            <motion.div
              key={fc.id}
              style={{
                position: "absolute",
                left: fc.left,
                top: fc.top,
                fontFamily: FONT,
                fontSize: fc.size,
                color: fc.color,
                textShadow: "3px 3px 0 #000, -1px -1px 0 #000",
                whiteSpace: "nowrap",
              }}
              initial={{ scale: 0, opacity: 0, y: 16 }}
              animate={{
                scale:   [0, 1.8, 1.2, 1.1, 1.0, 0],
                opacity: [0, 1,   1,   1,   1,   0],
                y:       [16, 0, -6, -10, -14, -22],
              }}
              transition={{ duration: fc.duration, delay: fc.delay, ease: "easeOut" }}
            >
              {fc.face}
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Screen flash ── */}
      <AnimatePresence>
        {flashOn && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9998, background: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        )}
      </AnimatePresence>

      {/* ── Section ── */}
      <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)",
          }}
        />

        <div
          className="relative z-10 max-w-2xl mx-auto w-full"
          style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            style={{ marginBottom: "48px" }}
          >
            <p
              className="mc-label"
              style={{ color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}
            >
              Birthday Wish Machine
            </p>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "16px",
                lineHeight: 1.6,
              }}
            >
              Make A Wish
            </h2>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "9px",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 2,
              }}
            >
              {wishCount > 0
                ? `${wishCount} wish${wishCount !== 1 ? "es" : ""} made`
                : "Go ahead. You deserve it."}
            </p>
          </motion.div>

          {/* Wish display */}
          <div
            style={{
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "48px",
            }}
          >
            <AnimatePresence mode="wait">
              {currentWish && (
                <motion.p
                  key={currentWish + wishCount}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.7 }}
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(0.55rem, 1.4vw, 0.8rem)",
                    color: "rgba(255,255,255,0.85)",
                    maxWidth: "480px",
                    lineHeight: 2.2,
                    textAlign: "center",
                  }}
                >
                  &ldquo;{currentWish}&rdquo;
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Button */}
          <motion.button
            className="mc-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={makeWish}
            style={{ padding: "18px 44px" }}
          >
            {wishCount === 0 ? "✦ Make A Wish" : "✦ Another Wish"}
          </motion.button>
        </div>
      </section>
    </>
  );
}
