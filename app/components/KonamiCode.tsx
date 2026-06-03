"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const extraPhotos = [
  { src: "/images/tanu-extra-1.jpg", caption: "Director's Cut: A rare smile" },
  { src: "/images/tanu-extra-2.jpg", caption: "Director's Cut: Behind the story" },
  { src: "/images/tanu-extra-3.jpg", caption: "Director's Cut: The real chapter" },
];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  const handleKey = useCallback((e: KeyboardEvent) => {
    setSequence((prev) => {
      const next = [...prev, e.key].slice(-KONAMI.length);
      if (next.join(",") === KONAMI.join(",")) {
        setActivated(true);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(13,10,15,0.95)", backdropFilter: "blur(20px)" }}
          onClick={() => setActivated(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="max-w-2xl w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-gold-300/60 mb-4" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              ✦ Secret Unlocked ✦
            </p>
            <h2 className="text-4xl font-serif text-gradient-gold mb-8" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              Director&apos;s Cut
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {extraPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="relative rounded-2xl overflow-hidden aspect-[3/4]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                    }}
                  />
                  {/* Placeholder */}
                  <div
                    className="absolute inset-0 flex items-end p-3"
                    style={{ background: `linear-gradient(135deg,hsl(${280 + i*30},60%,30%),hsl(${20 + i*20},80%,60%))` }}
                  >
                    <p className="text-xs text-white/70" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-cream/40 text-sm mb-6 italic" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              You found the secret. Of course you did.
            </p>

            <button
              onClick={() => setActivated(false)}
              className="px-8 py-3 rounded-full glass-warm text-cream/70 text-sm transition-all hover:text-cream"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
