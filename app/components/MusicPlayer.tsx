"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const tracks = [
  { title: "Autumn Leaves", artist: "Bill Evans", duration: "5:34", file: "/music/autumn-leaves.mp3" },
  { title: "La Vie en Rose", artist: "Édith Piaf", duration: "3:07", file: "/music/la-vie-en-rose.mp3" },
  { title: "Bittersweet Symphony", artist: "The Verve", duration: "5:58", file: "/music/bittersweet-symphony.mp3" },
  { title: "The Night We Met", artist: "Lord Huron", duration: "3:28", file: "/music/the-night-we-met.mp3" },
  { title: "Bloom", artist: "The Paper Kites", duration: "3:59", file: "/music/bloom.mp3" },
  { title: "Cherry Wine", artist: "Hozier", duration: "4:00", file: "/music/cherry-wine.mp3" },
];

export default function MusicPlayer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = tracks[currentTrack].file;
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setCurrentTrack((i) => (i < tracks.length - 1 ? i + 1 : 0));
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <audio ref={audioRef} style={{ display: "none" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)"
      }} />

      <div className="relative z-10 max-w-lg mx-auto w-full" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12" style={{ textAlign: "center" }}
        >
          <p className="mc-label" style={{
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}>
            A Soundtrack
          </p>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: 700,
            color: "#ffffff",
          }}>
            Music of the Story
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#0d0d0d",
            overflow: "hidden",
          }}
        >
          {/* Vinyl + track info */}
          <div style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            {/* Vinyl */}
            <div style={{ position: "relative", width: "144px", height: "144px" }}>
              <motion.div
                className={isPlaying ? "vinyl-spinning" : ""}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #080808 40%, #151515 60%, #080808 80%)",
                  boxShadow: isPlaying
                    ? "0 0 40px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.8)"
                    : "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                {[50, 42, 34, 26].map((size) => (
                  <div
                    key={size}
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.04)",
                      width: `${size}%`,
                      height: `${size}%`,
                      top: `${(100 - size) / 2}%`,
                      left: `${(100 - size) / 2}%`,
                    }}
                  />
                ))}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                }} />
              </motion.div>
            </div>

            <div style={{ textAlign: "center" }}>
              <h3 style={{
                fontFamily: FONT,
                fontSize: "18px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                marginBottom: "4px",
              }}>
                {tracks[currentTrack].title}
              </h3>
              <p style={{
                fontFamily: FONT,
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
              }}>
                {tracks[currentTrack].artist}
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  height: "3px",
                  background: "rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  if (audioRef.current && audioRef.current.duration) {
                    audioRef.current.currentTime = pct * audioRef.current.duration;
                  }
                  setProgress(Math.round(pct * 100));
                }}
              >
                <motion.div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "rgba(255,255,255,0.6)",
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              <button
                onClick={() => setCurrentTrack((i) => (i > 0 ? i - 1 : tracks.length - 1))}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.35)",
                  transition: "color 0.2s",
                }}
              >⏮</button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying((p) => !p)}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: "#ffffff",
                  color: "#080808",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isPlaying ? "⏸" : "▶"}
              </motion.button>
              <button
                onClick={() => setCurrentTrack((i) => (i < tracks.length - 1 ? i + 1 : 0))}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.35)",
                  transition: "color 0.2s",
                }}
              >⏭</button>
            </div>

            {!isPlaying && (
              <p style={{
                fontFamily: FONT,
                fontSize: "11px",
                color: "rgba(255,255,255,0.2)",
                fontStyle: "italic",
                fontWeight: 300,
              }}>
                press play to begin
              </p>
            )}
          </div>

          {/* Track list */}
          <div style={{ padding: "8px" }}>
            {tracks.map((track, i) => (
              <motion.button
                key={i}
                onClick={() => { setCurrentTrack(i); setIsPlaying(true); }}
                whileHover={{ x: 4 }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: i === currentTrack ? "rgba(255,255,255,0.05)" : "transparent",
                  border: i === currentTrack ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  marginBottom: "2px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{
                    fontFamily: FONT,
                    fontSize: "11px",
                    width: "20px",
                    textAlign: "right",
                    color: i === currentTrack ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                  }}>
                    {i === currentTrack && isPlaying ? "♪" : i + 1}
                  </span>
                  <div style={{ textAlign: "left" }}>
                    <p style={{
                      fontFamily: FONT,
                      fontSize: "13px",
                      color: i === currentTrack ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
                      fontWeight: i === currentTrack ? 500 : 400,
                    }}>
                      {track.title}
                    </p>
                    <p style={{
                      fontFamily: FONT,
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                      fontWeight: 300,
                    }}>
                      {track.artist}
                    </p>
                  </div>
                </div>
                <span style={{
                  fontFamily: FONT,
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.2)",
                }}>
                  {track.duration}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
