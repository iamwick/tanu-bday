"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FONT = "'Press Start 2P', monospace";

interface Lantern {
  id: number;
  x: number;
  drift: number;
  duration: number;
  delay: number;
}

const lines = [
  { text: "When I first met you...", size: "1.4rem" },
  { text: "You were too shy to show your face.", size: "1.4rem" },
  { text: "Now I can't imagine never having known you.", size: "1.4rem" },
  { text: "Thank you for being you.", size: "1.2rem" },
  { text: "Happy Birthday.", size: "2.5rem" },
  { text: "Tanu.", size: "5rem" },
  { text: "Welcome to Chapter 26.", size: "1.5rem" },
];

let idCounter = 0;

export default function FinalSection({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showLanterns, setShowLanterns] = useState(false);
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  const [showReplay, setShowReplay] = useState(false);

  const spawnLanterns = useCallback(() => {
    const batch: Lantern[] = Array.from({ length: 15 }, () => ({
      id: idCounter++,
      x: 5 + Math.random() * 90,
      drift: (Math.random() - 0.5) * 100,
      duration: Math.random() * 4 + 5,
      delay: Math.random() * 3,
    }));
    setLanterns((prev) => [...prev, ...batch]);
  }, []);

  useEffect(() => {
    if (!inView) return;

    lines.forEach((_, i) => {
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), 800 + i * 1800);
    });

    const lanternTimer = setTimeout(() => {
      setShowLanterns(true);
      spawnLanterns();
    }, 800 + lines.length * 1800);

    const replayTimer = setTimeout(() => setShowReplay(true), 800 + lines.length * 1800 + 2000);

    return () => {
      clearTimeout(lanternTimer);
      clearTimeout(replayTimer);
    };
  }, [inView, spawnLanterns]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/tanu-3.jpg"
          alt="Tanu"
          fill
          className="object-cover object-center opacity-20"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0" style={{ background: "#080808" }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)"
        }} />
      </div>

      {/* Lanterns */}
      {showLanterns && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {lanterns.map((l) => (
            <div
              key={l.id}
              className="lantern absolute bottom-10"
              style={{
                left: `${l.x}%`,
                "--drift": `${l.drift}px`,
                "--dur": `${l.duration}s`,
                "--rot": `${(Math.random() - 0.5) * 20}deg`,
                animationDelay: `${l.delay}s`,
              } as React.CSSProperties}
            >
              <div style={{
                width: "20px",
                height: "24px",
                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                background: "rgba(255,255,255,0.15)",
                boxShadow: "0 0 10px rgba(255,255,255,0.3)",
              }}>
                🏮
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Text */}
      <div
        className="relative z-10 w-full"
        style={{ maxWidth: "640px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {lines.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines.includes(i) && (
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={i === 5 ? "text-gradient-birthday" : i === 4 ? "text-gradient-birthday-warm" : ""}
                  style={{
                    fontFamily: FONT,
                    fontSize: i === 5 ? "clamp(3rem, 14vw, 6rem)" : i === 4 ? "clamp(1.8rem, 5vw, 2.5rem)" : "clamp(1rem, 3vw, 1.4rem)",
                    fontWeight: i === 5 ? 800 : i === 4 ? 700 : i === 3 ? 300 : 400,
                    fontStyle: i === 6 ? "italic" : "normal",
                    color: (i === 5 || i === 4) ? undefined : i === 6 ? "#c084fc" : "rgba(255,255,255,0.6)",
                    lineHeight: i === 5 ? 0.9 : 1.5,
                    letterSpacing: i === 5 ? "-0.02em" : "0",
                  }}
                >
                  {line.text}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Replay */}
        <AnimatePresence>
          {showReplay && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ paddingTop: "48px" }}
            >
              <motion.button
                className="mc-btn"
                whileTap={{ scale: 0.97 }}
                onClick={onReplay}
                style={{ padding: "14px 40px" }}
              >
                Replay Story
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
