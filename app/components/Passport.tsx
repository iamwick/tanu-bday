"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FONT = "'Poppins', sans-serif";

const destinations = [
  {
    country: "Italy",
    emoji: "🇮🇹",
    places: ["Venice", "Rome", "Florence", "Lake Como"],
    description: "Cobblestones, canals, espresso, and the kind of beauty that makes you stop walking.",
    imageBg: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
    image: "/images/scene-venice.png",
  },
  {
    country: "Japan",
    emoji: "🇯🇵",
    places: ["Tokyo", "Kyoto", "Osaka", "Nara"],
    description: "Cherry blossoms, quiet temples, ramen at midnight, and a thousand little perfect moments.",
    imageBg: "linear-gradient(135deg, #1a1a1a, #252525)",
    image: "/images/scene-kyoto.png",
  },
];

export default function Passport() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [stampedCountries, setStampedCountries] = useState<string[]>([]);

  const handleStamp = (country: string) => {
    if (!stampedCountries.includes(country)) {
      setStampedCountries((prev) => [...prev, country]);
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)"
      }} />

      <div className="relative z-10 max-w-3xl mx-auto w-full" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
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
            Future Adventures
          </p>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "12px",
          }}>
            Places Waiting For You
          </h2>
          <p style={{
            fontFamily: FONT,
            fontSize: "13px",
            color: "rgba(255,255,255,0.35)",
            fontStyle: "italic",
            fontWeight: 300,
          }}>
            Tap a destination to stamp your passport
          </p>
        </motion.div>

        {/* Passport book */}
        <motion.div
          initial={{ opacity: 0, rotateY: -12 }}
          animate={inView ? { opacity: 1, rotateY: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0d0d0d",
            overflow: "hidden",
          }}
        >
          {/* Passport header */}
          <div style={{
            padding: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <p style={{
                fontFamily: FONT,
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginBottom: "4px",
                fontWeight: 500,
              }}>Passport of Adventure</p>
              <p style={{
                fontFamily: FONT,
                fontSize: "22px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
              }}>Tanu</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{
                fontFamily: FONT,
                fontSize: "11px",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "2px",
              }}>Status</p>
              <p style={{
                fontFamily: FONT,
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                fontStyle: "italic",
              }}>Future adventures pending.</p>
            </div>
          </div>

          {/* Destinations */}
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
            className="grid-cols-1 sm:grid-cols-2"
          >
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.country}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.7 }}
                onClick={() => handleStamp(dest.country)}
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image area */}
                <div style={{ height: "140px", position: "relative", background: dest.imageBg }}>
                  <Image
                    src={dest.image}
                    alt={dest.country}
                    fill
                    className="object-cover object-center opacity-60"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}>
                    <span style={{ fontSize: "48px", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}>{dest.emoji}</span>
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(13,13,13,0.5) 100%)" }} />

                  <AnimatePresence>
                    {stampedCountries.includes(dest.country) && (
                      <motion.div
                        initial={{ scale: 3, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: -15 }}
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          border: "2px solid rgba(255,255,255,0.6)",
                          color: "rgba(255,255,255,0.85)",
                          background: "rgba(8,8,8,0.7)",
                          padding: "2px 10px",
                        }}
                      >
                        <span style={{
                          fontFamily: FONT,
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                        }}>STAMPED</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)" }}>
                  <h3 style={{
                    fontFamily: FONT,
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: "8px",
                  }}>{dest.country}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                    {dest.places.map((place) => (
                      <span key={place} style={{
                        fontFamily: FONT,
                        fontSize: "11px",
                        padding: "2px 8px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.45)",
                        fontWeight: 400,
                      }}>{place}</span>
                    ))}
                  </div>
                  <p style={{
                    fontFamily: FONT,
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}>{dest.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ padding: "0 24px 24px" }}>
            <p style={{
              fontFamily: FONT,
              fontSize: "11px",
              color: "rgba(255,255,255,0.2)",
              fontStyle: "italic",
              textAlign: "center",
            }}>
              {stampedCountries.length === 0
                ? "Tap a destination above to begin stamping"
                : stampedCountries.length === destinations.length
                ? "All destinations stamped. Adventures await."
                : `${stampedCountries.length} of ${destinations.length} destinations stamped`}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
