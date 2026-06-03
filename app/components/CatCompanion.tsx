"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const catMessages = [
  "Reminder: Tanu is the main character.",
  "Tanu probably deserves another coffee.",
  "Someone should take her to Japan.",
  "Someone should definitely take her to Italy.",
  "She doesn't realize how many people care about her.",
  "Plot twist: she was the protagonist all along.",
  "Don't forget to tell her she's doing great.",
  "Chapter 26 is her villain arc. Kidding. She's too kind.",
  "Have you seen her smile? A menace. In a good way.",
];

export default function CatCompanion() {
  const [catY, setCatY] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [showCat, setShowCat] = useState(false);
  const [catSide, setCatSide] = useState<"left" | "right">("right");
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pawTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pawPrints, setPawPrints] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;
      const pct = scrollY / docH;

      if (scrollY > 400) setShowCat(true);
      setCatY(Math.min(Math.max(pct * 70, 5), 75));
      setCatSide(scrollY % 1200 < 600 ? "right" : "left");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!showCat) return;

    const showMessage = () => {
      setMessage(catMessages[Math.floor(Math.random() * catMessages.length)]);
      if (messageTimer.current) clearTimeout(messageTimer.current);
      messageTimer.current = setTimeout(() => setMessage(null), 4000);
      if (pawTimer.current) clearTimeout(pawTimer.current);
      pawTimer.current = setTimeout(showMessage, 8000 + Math.random() * 8000);
    };

    const initial = setTimeout(showMessage, 3000);
    return () => {
      clearTimeout(initial);
      if (messageTimer.current) clearTimeout(messageTimer.current);
      if (pawTimer.current) clearTimeout(pawTimer.current);
    };
  }, [showCat]);

  const handleCatClick = () => {
    const newPaw = {
      id: Date.now(),
      x: catSide === "right" ? 85 + Math.random() * 10 : 2 + Math.random() * 10,
      y: catY + Math.random() * 5,
    };
    setPawPrints((prev) => [...prev.slice(-10), newPaw]);
    setMessage(catMessages[Math.floor(Math.random() * catMessages.length)]);
    if (messageTimer.current) clearTimeout(messageTimer.current);
    messageTimer.current = setTimeout(() => setMessage(null), 4000);
    setTimeout(() => setPawPrints((prev) => prev.filter((p) => p.id !== newPaw.id)), 3000);
  };

  if (!showCat) return null;

  return (
    <>
      {pawPrints.map((paw) => (
        <div
          key={paw.id}
          className="fixed pointer-events-none z-40 paw-appear text-sm"
          style={{ left: `${paw.x}%`, top: `${paw.y}%` }}
        >
          🐾
        </div>
      ))}

      <motion.div
        className="fixed z-40 pointer-events-none"
        style={{ [catSide]: "20px", top: `${catY}%` }}
        animate={{ top: `${catY}%` }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 4 }}
              className="absolute pointer-events-none"
              style={{
                [catSide === "right" ? "right" : "left"]: "56px",
                bottom: "8px",
                width: "200px",
              }}
            >
              <div style={{
                padding: "12px 16px",
                background: "rgba(8,8,8,0.92)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                position: "relative",
              }}>
                <p style={{
                  fontFamily: FONT,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}>
                  {message}
                </p>
                <div style={{
                  position: "absolute",
                  bottom: "12px",
                  [catSide === "right" ? "right" : "left"]: "-6px",
                  width: 0,
                  height: 0,
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  [catSide === "right" ? "borderLeft" : "borderRight"]: "6px solid rgba(8,8,8,0.92)",
                }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleCatClick}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center text-2xl cursor-pointer select-none"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          title="pet me"
        >
          🐱
        </motion.button>
      </motion.div>
    </>
  );
}
