"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const CORNER_POSITIONS = [
  { pos: "top-0 left-0", hDir: "to right", vDir: "to bottom" },
  { pos: "top-0 right-0", hDir: "to left", vDir: "to bottom" },
  { pos: "bottom-0 left-0", hDir: "to right", vDir: "to top" },
  { pos: "bottom-0 right-0", hDir: "to left", vDir: "to top" },
];

const STATS = [
  { label: "Kind", value: "∞" },
  { label: "Stubborn", value: "100" },
  { label: "Loved", value: "∞" },
];

const FONT = "'Press Start 2P', monospace";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div className="absolute inset-0" style={{ background: "#080808" }} />
        <Image
          src="/images/tanu-1.png"
          alt="Tanu"
          fill
          className="object-cover object-center opacity-30"
          priority
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.1) 45%, rgba(8,8,8,0.85) 100%)"
        }} />
      </motion.div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%)",
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 90% at 50% 50%, transparent 35%, rgba(8,8,8,0.65) 100%)"
      }} />

      {/* Corner frames */}
      {CORNER_POSITIONS.map(({ pos, hDir, vDir }, i) => (
        <div key={i} className={`absolute ${pos} z-20 w-12 h-12 m-6`}>
          <div className="absolute top-0 left-0 w-full h-px" style={{
            background: `linear-gradient(${hDir}, rgba(255,255,255,0.5), transparent)`
          }} />
          <div className="absolute top-0 left-0 h-full w-px" style={{
            background: `linear-gradient(${vDir}, rgba(255,255,255,0.5), transparent)`
          }} />
        </div>
      ))}

      {/* Top HUD label */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex items-center gap-3 px-5 py-2" style={{
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="mc-label" style={{ color: "rgba(255,255,255,0.5)" }}>
            A Story In Chapters
          </span>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div className="relative z-20 text-center px-6 w-full" style={{ opacity }}>

        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div style={{ height: "1px", width: "52px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4))" }} />
          <span className="mc-label" style={{ color: "rgba(255,255,255,0.5)" }}>
            Chapter XXVI
          </span>
          <div style={{ height: "1px", width: "52px", background: "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)" }} />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: FONT,
            fontSize: "clamp(5.5rem, 22vw, 16rem)",
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            filter: "drop-shadow(0 0 60px rgba(255,255,255,0.12))",
          }}
        >
          Tanu
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 1 }}
          className="flex items-center justify-center gap-5 mt-5"
        >
          <div style={{ height: "1px", width: "70px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3))" }} />
          <p style={{
            fontFamily: FONT,
            fontSize: "1rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.5)",
            fontStyle: "italic",
            fontWeight: 300,
          }}>
            Twenty-Six
          </p>
          <div style={{ height: "1px", width: "70px", background: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)" }} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ bottom: "-88px" }}
        >
          <span style={{
            fontFamily: FONT,
            fontSize: "9px",
            letterSpacing: "0.55em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
          }}>scroll</span>
          <motion.div
            style={{ width: "1px", height: "36px", background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)" }}
            animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-stretch"
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-stretch">
            <div className="flex flex-col items-center justify-center px-6 py-3" style={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRight: i < STATS.length - 1 ? "none" : "1px solid rgba(255,255,255,0.1)",
              background: "rgba(8,8,8,0.7)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              minWidth: "88px",
            }}>
              <span style={{
                fontFamily: FONT,
                fontSize: "9px",
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginBottom: "4px",
                fontWeight: 500,
              }}>
                {stat.label}
              </span>
              <span style={{
                fontFamily: FONT,
                fontSize: "17px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
              }}>
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
