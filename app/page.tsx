"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import LandingSequence from "./components/LandingSequence";
import HeroSection from "./components/HeroSection";
import WhoIsTanu from "./components/WhoIsTanu";
import ThingsYouDontSee from "./components/ThingsYouDontSee";
import ShyGirl from "./components/ShyGirl";
import CharacterProfile from "./components/CharacterProfile";
import WishMachine from "./components/WishMachine";
import TwentySixReasons from "./components/TwentySixReasons";
import FinalSection from "./components/FinalSection";
import CatCompanion from "./components/CatCompanion";
import KonamiCode from "./components/KonamiCode";

const ParticleCanvas = dynamic(() => import("./components/ParticleCanvas"), { ssr: false });
const LenisProvider = dynamic(() => import("./components/LenisProvider"), { ssr: false });

export default function Home() {
  const [landingDone, setLandingDone] = useState(false);
  const [key, setKey] = useState(0);
  const bgAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (landingDone && bgAudioRef.current) {
      bgAudioRef.current.play().catch(() => {});
    }
  }, [landingDone]);

  const handleLandingComplete = useCallback(() => {
    setLandingDone(true);
  }, []);

  const handleReplay = useCallback(() => {
    setLandingDone(false);
    setKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <LenisProvider>
      <audio ref={bgAudioRef} src="/music/the-night-we-met.mp3" loop style={{ display: "none" }} />
      <main className="relative min-h-screen" style={{ background: "#070410" }}>
        {/* Ambient particles */}
        <ParticleCanvas />

        {/* Landing cinematic */}
        {!landingDone && (
          <LandingSequence key={key} onComplete={handleLandingComplete} />
        )}

        {/* Main content */}
        {landingDone && (
          <div className="relative z-10">
            <HeroSection />

            <div className="py-4">
              <div className="h-px max-w-4xl mx-auto" style={{ background: "linear-gradient(90deg,transparent,rgba(255,176,138,0.2),transparent)" }} />
            </div>

            <WhoIsTanu />
            <ThingsYouDontSee />
            <ShyGirl />
            <CharacterProfile />
            <TwentySixReasons />
            <WishMachine />
            <FinalSection onReplay={handleReplay} />
          </div>
        )}

        {/* Persistent elements */}
        {landingDone && (
          <>
            <CatCompanion />
            <KonamiCode />
          </>
        )}
      </main>
    </LenisProvider>
  );
}
