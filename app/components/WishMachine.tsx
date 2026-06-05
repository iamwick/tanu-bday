"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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

// CSS keyframes injected once — browser runs these on the compositor thread
const KEYFRAMES = `
@keyframes wm-burst {
  0%   { transform: translate(0,0) scale(0) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0.8) rotate(var(--r)); opacity: 0; }
}
@keyframes wm-rain {
  0%   { transform: translate(0,0) scale(0) rotate(0deg); opacity: 0; }
  8%   { opacity: 1; transform: translate(0,0) scale(1.1) rotate(0deg); }
  85%  { opacity: 0.9; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0.8) rotate(var(--r)); opacity: 0; }
}
@keyframes wm-float {
  0%   { transform: translate(0,0) scale(0.2); opacity: 0; }
  8%   { opacity: 1; transform: translate(0,0) scale(1.2); }
  85%  { opacity: 0.85; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0.7); opacity: 0; }
}
@keyframes wm-face {
  0%   { transform: translateY(16px) scale(0); opacity: 0; }
  12%  { transform: translateY(0) scale(1.5); opacity: 1; }
  80%  { transform: translateY(-12px) scale(1); opacity: 1; }
  100% { transform: translateY(-22px) scale(0.8); opacity: 0; }
}
`;

let globalId = 0;
const LINGER_MS = 10000;
const MAX_FLOWERS = 200;
const MAX_DOODLES = 100;
const MAX_FACES = 50;

interface FlowerP {
  id: number;
  left: number;
  top: number;
  tx: number;
  ty: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  kind: "burst" | "rain";
  expireAt: number;
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
  tx: number;
  ty: number;
  expireAt: number;
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
  expireAt: number;
}

export default function WishMachine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentWish, setCurrentWish] = useState<string | null>(null);
  const [wishCount, setWishCount] = useState(0);
  const wishCountRef = useRef(0);
  const [flowers, setFlowers] = useState<FlowerP[]>([]);
  const [doodles, setDoodles] = useState<DoodleP[]>([]);
  const [faces, setFaces] = useState<FaceP[]>([]);
  const [flashOn, setFlashOn] = useState(false);

  // Clean up expired particles every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFlowers((prev) => prev.filter((f) => f.expireAt > now));
      setDoodles((prev) => prev.filter((d) => d.expireAt > now));
      setFaces((prev) => prev.filter((f) => f.expireAt > now));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const makeWish = useCallback(() => {
    const wish = wishes[Math.floor(Math.random() * wishes.length)];
    setCurrentWish(wish);
    wishCountRef.current += 1;
    const pressNum = wishCountRef.current;
    setWishCount(pressNum);

    setFlashOn(true);
    setTimeout(() => setFlashOn(false), 500);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 640;
    const expireAt = Date.now() + LINGER_MS;

    // Scale gently — max 3x at press 10
    const scale = 1 + (Math.min(pressNum, 10) - 1) * 0.22;
    const burstCount  = Math.round((mobile ? 12 : 22) * scale);
    const rainCount   = Math.round((mobile ? 12 : 22) * scale);
    const doodleCount = Math.round((mobile ? 8  : 14) * scale);
    const faceCount   = Math.round((mobile ? 4  : 8)  * scale);

    const burst: FlowerP[] = Array.from({ length: burstCount }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const dist = vw * (0.15 + Math.random() * 0.6);
      return {
        id: globalId++,
        left: vw * 0.5,
        top: vh * 0.5,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist * 0.55,
        emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
        size: 40 + Math.floor(Math.random() * 55),
        duration: 1.0 + Math.random() * 1.0,
        delay: Math.random() * 0.3,
        rotate: (Math.random() - 0.5) * 720,
        kind: "burst",
        expireAt,
      };
    });

    const rain: FlowerP[] = Array.from({ length: rainCount }, () => ({
      id: globalId++,
      left: Math.random() * vw,
      top: -80,
      tx: (Math.random() - 0.5) * 160,
      ty: vh + 160,
      emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      size: 30 + Math.floor(Math.random() * 48),
      duration: mobile ? 1.5 + Math.random() * 1.5 : 2.5 + Math.random() * 3.0,
      delay: mobile ? Math.random() * 0.8 : Math.random() * 3.0,
      rotate: (Math.random() - 0.5) * 360,
      kind: "rain" as const,
      expireAt,
    }));

    const newDoodles: DoodleP[] = Array.from({ length: doodleCount }, () => {
      const startTop = vh + 40;
      return {
        id: globalId++,
        left: Math.random() * vw,
        top: startTop,
        char: DOODLES[Math.floor(Math.random() * DOODLES.length)],
        size: 26 + Math.floor(Math.random() * 32),
        duration: mobile ? 1.2 + Math.random() * 1.0 : 2.5 + Math.random() * 2.5,
        delay: mobile ? Math.random() * 0.6 : Math.random() * 2.0,
        color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`,
        tx: (Math.random() - 0.5) * 120,
        ty: -(startTop + 100),
        expireAt,
      };
    });

    const newFaces: FaceP[] = Array.from({ length: faceCount }, () => {
      const f = PIXEL_FACES[Math.floor(Math.random() * PIXEL_FACES.length)];
      return {
        id: globalId++,
        left: vw * (0.02 + Math.random() * 0.90),
        top: vh * (0.05 + Math.random() * 0.82),
        face: f.face,
        color: f.color,
        size: 13 + Math.floor(Math.random() * 14),
        duration: mobile ? 1.2 + Math.random() * 1.0 : 2.0 + Math.random() * 2.0,
        delay: mobile ? Math.random() * 0.6 : Math.random() * 2.0,
        expireAt,
      };
    });

    setFlowers((prev) => {
      const next = [...prev, ...burst, ...rain];
      return next.length > MAX_FLOWERS ? next.slice(next.length - MAX_FLOWERS) : next;
    });
    setDoodles((prev) => {
      const next = [...prev, ...newDoodles];
      return next.length > MAX_DOODLES ? next.slice(next.length - MAX_DOODLES) : next;
    });
    setFaces((prev) => {
      const next = [...prev, ...newFaces];
      return next.length > MAX_FACES ? next.slice(next.length - MAX_FACES) : next;
    });
  }, []);

  const active = flowers.length > 0 || doodles.length > 0 || faces.length > 0;

  return (
    <>
      {/* Inject keyframes once */}
      <style>{KEYFRAMES}</style>

      {/* ── Full-viewport particle layer ── */}
      {active && (
        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 9999 }}
        >
          {flowers.map((f) => (
            <div
              key={f.id}
              style={{
                position: "absolute",
                left: f.left,
                top: f.top,
                fontSize: f.size,
                lineHeight: 1,
                willChange: "transform, opacity",
                ["--tx" as string]: `${f.tx}px`,
                ["--ty" as string]: `${f.ty}px`,
                ["--r"  as string]: `${f.rotate}deg`,
                animation: `${f.kind === "burst" ? "wm-burst" : "wm-rain"} ${f.duration}s ${f.delay}s ease-out both`,
              }}
            >
              {f.emoji}
            </div>
          ))}

          {doodles.map((d) => (
            <div
              key={d.id}
              style={{
                position: "absolute",
                left: d.left,
                top: d.top,
                fontFamily: FONT,
                fontSize: d.size,
                color: d.color,
                textShadow: "2px 2px 0 #000",
                willChange: "transform, opacity",
                ["--tx" as string]: `${d.tx}px`,
                ["--ty" as string]: `${d.ty}px`,
                animation: `wm-float ${d.duration}s ${d.delay}s ease-in-out both`,
              }}
            >
              {d.char}
            </div>
          ))}

          {faces.map((fc) => (
            <div
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
                willChange: "transform, opacity",
                animation: `wm-face ${fc.duration}s ${fc.delay}s ease-out both`,
              }}
            >
              {fc.face}
            </div>
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
