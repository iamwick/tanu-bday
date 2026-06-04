"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FONT = "'Poppins', sans-serif";

const chapters = [
  {
    number: 23,
    title: "Learning",
    text: "A chapter about discovering who you are and what you're made of. About stumbling, getting back up, and learning to love the process.",
  },
  {
    number: 24,
    title: "Growing",
    text: "A chapter about becoming more. Stretching into someone new, even when it's uncomfortable. Growth rarely looks graceful from the inside.",
  },
  {
    number: 25,
    title: "Healing",
    text: "A chapter about softness and strength. About letting yourself feel things, and finding that you were always stronger than you thought.",
  },
  {
    number: 26,
    title: "Beginning",
    text: "Not an ending. A beginning. The chapter where everything you've learned starts to become who you are. The best is very much still ahead.",
  },
];

export default function RomanceNovel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (currentPage < chapters.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const chapter = chapters[currentPage];

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
          <p style={{
            fontFamily: FONT,
            fontSize: "10px",
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            marginBottom: "16px",
            fontWeight: 500,
          }}>
            The Story So Far
          </p>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 700,
            color: "#ffffff",
          }}>
            The Romance Novel
          </h2>
        </motion.div>

        {/* Book */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ position: "relative" }}
        >
          {/* Shadow pages */}
          <div style={{
            position: "absolute",
            inset: 0,
            transform: "translate(4px, 4px)",
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.04)",
          }} />
          <div style={{
            position: "absolute",
            inset: 0,
            transform: "translate(2px, 2px)",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }} />

          {/* Main page - light background, dark text */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #f8f6f0 0%, #ede8d8 100%)",
            border: "1px solid rgba(0,0,0,0.08)",
            minHeight: "380px",
          }}>
            {/* Spine */}
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "28px",
              background: "linear-gradient(90deg, rgba(0,0,0,0.08), transparent)",
            }} />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5 }}
                style={{
                  padding: "40px 40px 40px 56px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "380px",
                }}
              >
                <div>
                  <p style={{
                    fontFamily: FONT,
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.35)",
                    marginBottom: "16px",
                    fontWeight: 500,
                  }}>
                    Chapter {chapter.number}
                  </p>
                  <h3 style={{
                    fontFamily: FONT,
                    fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    marginBottom: "24px",
                    lineHeight: 1.1,
                  }}>
                    {chapter.title}
                  </h3>
                  <p style={{
                    fontFamily: FONT,
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#4a3a3a",
                    maxWidth: "380px",
                    fontWeight: 400,
                  }}>
                    {chapter.text}
                  </p>
                </div>
                <p style={{
                  fontFamily: FONT,
                  fontSize: "13px",
                  color: "rgba(0,0,0,0.3)",
                  textAlign: "right",
                }}>
                  {currentPage + 1}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px" }}>
            <motion.button
              onClick={goPrev}
              disabled={currentPage === 0}
              whileHover={currentPage > 0 ? { scale: 1.05 } : {}}
              whileTap={currentPage > 0 ? { scale: 0.95 } : {}}
              style={{
                fontFamily: FONT,
                fontSize: "13px",
                padding: "10px 20px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: currentPage === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)",
                cursor: currentPage === 0 ? "not-allowed" : "pointer",
                fontWeight: 400,
              }}
            >
              ← Previous
            </motion.button>

            <div style={{ display: "flex", gap: "8px" }}>
              {chapters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentPage ? 1 : -1); setCurrentPage(i); }}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background: i === currentPage ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)",
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={goNext}
              disabled={currentPage === chapters.length - 1}
              whileHover={currentPage < chapters.length - 1 ? { scale: 1.05 } : {}}
              whileTap={currentPage < chapters.length - 1 ? { scale: 0.95 } : {}}
              style={{
                fontFamily: FONT,
                fontSize: "13px",
                padding: "10px 20px",
                border: `1px solid ${currentPage === chapters.length - 1 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)"}`,
                background: "transparent",
                color: currentPage === chapters.length - 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.75)",
                cursor: currentPage === chapters.length - 1 ? "not-allowed" : "pointer",
                fontWeight: 400,
              }}
            >
              Next →
            </motion.button>
          </div>
        </motion.div>

        {currentPage === chapters.length - 1 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(255,255,255,0.45)",
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            &ldquo;The best chapters haven&apos;t been written yet.&rdquo;
          </motion.p>
        )}
      </div>
    </section>
  );
}
