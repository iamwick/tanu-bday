"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FONT = "'Press Start 2P', monospace";

const QUOTES = [
  { cat: "ฅ^•ﻌ•^ฅ", text: "Certified crier at cute animal videos" },
  { cat: "=^.^=", text: "Her love language: making sure you've eaten" },
  { cat: "~(=^.^)", text: "Will absolutely fight you for the window seat" },
  { cat: "(^._.^)~", text: "Remembers every small detail about people she loves" },
  { cat: "(=^-ω-^=)", text: "26 years of being the most thoughtful person in any room" },
  { cat: "~(=^‥^)", text: "Her smile should legally come with a warning label" },
  { cat: "ฅ(^・ω・^)ฅ", text: "Her hugs are scientifically proven to fix bad days" },
  { cat: "(^.^)", text: "Probably overthinking something adorable right now" },
  { cat: "(^≗ω≗^)", text: "Cares way more than she'll ever admit out loud" },
  { cat: "~(=^.^=)~", text: "Chapter 26: officially her best one yet" },
  { cat: "ฅ(=^.^=)ฅ", text: "World-class keeper of secrets AND snacks" },
  { cat: "(^-^)", text: "Side effect of knowing her: feeling genuinely seen" },
  { cat: "=^._.^=", text: "Always has the energy of someone who just got great news" },
  { cat: "ฅ^-ω-^ฅ", text: "Her laugh is the best sound in any room" },
  { cat: "(=^.^=)/", text: "Makes the world softer just by being in it" },
  { cat: "~(=^ ^=)", text: "Somehow makes everyone feel like the most important person" },
  { cat: "=^•ω•^=", text: "Radiates main character energy without even trying" },
  { cat: "ฅ(^ᵕ^)ฅ", text: "Probably has 47 tabs open and knows what's in each one" },
  { cat: "(^•ㅅ•^)", text: "The person you call when everything feels impossible" },
  { cat: "~(=^◡^=)", text: "Her kindness is not a weakness — it's a superpower" },
  { cat: "ฅ^⊙ω⊙^ฅ", text: "Makes 26 look like the coolest age to be" },
  { cat: "(=^ω^=)", text: "Her playlists go so hard it should be illegal" },
  { cat: "^(=•ω•=)^", text: "Lowkey the reason several people have better taste now" },
  { cat: "ฅ(=^◕ᴥ◕^=)", text: "Genuinely irreplaceable — not just because of the snacks" },
  { cat: "(^˘ᵕ˘^)", text: "The world is statistically better with her in it" },
  { cat: "~(=^‿^)", text: "Should come with a warning: may cause uncontrollable happiness" },
  { cat: "(=^._.^)", text: "Always the vibe. Never the villain." },
  { cat: "ฅ^•̀ω•́^ฅ", text: "Chapter 26: the plot thickens and it's brilliant" },
  { cat: "(^ↀᴥↀ^)", text: "A whole mood, a whole era, a whole personality" },
  { cat: "~(=^♡^=)", text: "The girl who turned caring into an art form" },
  { cat: "ฅ(^◡^)ฅ", text: "If she wrote a book, everyone would cry the best tears" },
  { cat: "(=^-.-^=)", text: "Still somehow everyone's favorite person in every room" },
];

// --- SVG Doodles ---

function CatDoodle({ color }: { color: string }) {
  return (
    <svg width="58" height="62" viewBox="0 0 58 62" fill="none">
      <polyline points="10,28 14,8 22,26" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="36,26 44,8 48,28" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="29" cy="40" rx="19" ry="17" stroke={color} strokeWidth="2.5"/>
      <circle cx="22" cy="37" r="2.5" fill={color}/>
      <circle cx="36" cy="37" r="2.5" fill={color}/>
      <path d="M27,43 L29,41 L31,43" stroke={color} strokeWidth="1.5" fill={color} strokeLinejoin="round"/>
      <path d="M26,46 Q29,50 32,46" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="10" y1="42" x2="20" y2="43" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="45" x2="20" y2="45" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="38" y1="43" x2="48" y2="42" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="38" y1="45" x2="48" y2="45" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DogDoodle({ color }: { color: string }) {
  return (
    <svg width="62" height="64" viewBox="0 0 62 64" fill="none">
      <path d="M10,22 Q4,14 6,30 Q8,42 14,40" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M52,22 Q58,14 56,30 Q54,42 48,40" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="31" cy="34" rx="21" ry="20" stroke={color} strokeWidth="2.5"/>
      <ellipse cx="31" cy="43" rx="10" ry="8" stroke={color} strokeWidth="2" fill="none"/>
      <ellipse cx="31" cy="40" rx="3.5" ry="2.5" fill={color}/>
      <circle cx="22" cy="28" r="3" fill={color}/>
      <circle cx="40" cy="28" r="3" fill={color}/>
      <path d="M27,51 Q31,57 35,51" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function BirdDoodle({ color }: { color: string }) {
  return (
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
      <ellipse cx="24" cy="36" rx="16" ry="14" stroke={color} strokeWidth="2.5"/>
      <circle cx="38" cy="22" r="12" stroke={color} strokeWidth="2.5"/>
      <path d="M50,21 L57,19 L50,24 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <circle cx="42" cy="19" r="2.5" fill={color}/>
      <path d="M10,32 Q4,26 8,40" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M10,40 Q4,34 6,48" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M22,50 L20,56 M20,56 L16,58 M20,56 L24,58" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function BunnyDoodle({ color }: { color: string }) {
  return (
    <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
      <path d="M16,34 Q12,20 16,6 Q20,0 24,6 Q26,20 24,34" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M30,34 Q28,20 30,6 Q34,0 38,6 Q42,20 38,34" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="27" cy="50" r="18" stroke={color} strokeWidth="2.5"/>
      <circle cx="20" cy="47" r="2.5" fill={color}/>
      <circle cx="34" cy="47" r="2.5" fill={color}/>
      <path d="M25,53 L27,51 L29,53" stroke={color} strokeWidth="1.5" fill={color} strokeLinejoin="round"/>
      <path d="M24,56 Q27,60 30,56" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function FishDoodle({ color }: { color: string }) {
  return (
    <svg width="70" height="48" viewBox="0 0 70 48" fill="none">
      <path d="M10,24 Q2,12 4,24 Q2,36 10,24" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <ellipse cx="40" cy="24" rx="24" ry="16" stroke={color} strokeWidth="2.5"/>
      <circle cx="54" cy="20" r="3.5" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="54" cy="20" r="1.5" fill={color}/>
      <path d="M30,8 Q38,2 46,8" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M30,22 Q34,17 38,22" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M24,28 Q28,23 32,28" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="62" cy="12" r="2.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="66" cy="7" r="1.5" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function ButterflyDoodle({ color }: { color: string }) {
  return (
    <svg width="68" height="58" viewBox="0 0 68 58" fill="none">
      <path d="M34,30 Q20,22 10,10 Q4,4 10,14 Q16,26 34,30" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M34,30 Q48,22 58,10 Q64,4 58,14 Q52,26 34,30" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M34,32 Q20,34 12,44 Q8,52 16,48 Q26,42 34,32" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M34,32 Q48,34 56,44 Q60,52 52,48 Q42,42 34,32" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="34" cy="31" rx="2.5" ry="12" stroke={color} strokeWidth="2"/>
      <path d="M32,19 Q28,12 26,7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="26" cy="7" r="2" fill={color}/>
      <path d="M36,19 Q40,12 42,7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="42" cy="7" r="2" fill={color}/>
      <circle cx="18" cy="20" r="3" stroke={color} strokeWidth="1.5"/>
      <circle cx="50" cy="20" r="3" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function FlowerDoodle({ color }: { color: string }) {
  const petals = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const cx = +(29 + Math.cos(angle) * 12).toFixed(1);
    const cy = +(26 + Math.sin(angle) * 12).toFixed(1);
    return (
      <ellipse
        key={i}
        cx={cx}
        cy={cy}
        rx="5"
        ry="9"
        stroke={color}
        strokeWidth="2"
        fill="none"
        transform={`rotate(${i * 60} ${cx} ${cy})`}
      />
    );
  });
  return (
    <svg width="58" height="70" viewBox="0 0 58 70" fill="none">
      {petals}
      <circle cx="29" cy="26" r="7" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="29" cy="26" r="3" fill={color}/>
      <path d="M29,48 Q27,57 28,66" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M28,57 Q16,53 14,59 Q20,61 28,57" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function StarDoodle({ color }: { color: string }) {
  return (
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
      <path d="M29,4 L33,21 L51,21 L37,31 L42,48 L29,38 L16,48 L21,31 L7,21 L25,21 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <line x1="50" y1="6" x2="50" y2="2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="48" y1="4" x2="52" y2="4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="50" x2="6" y2="46" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4" y1="48" x2="8" y2="48" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CloudDoodle({ color }: { color: string }) {
  return (
    <svg width="72" height="52" viewBox="0 0 72 52" fill="none">
      <path d="M14,36 Q6,36 6,28 Q6,20 14,20 Q14,12 22,10 Q28,6 34,10 Q40,6 48,10 Q56,12 56,20 Q64,20 66,28 Q66,36 58,36 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <line x1="22" y1="40" x2="20" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="34" y1="40" x2="32" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="46" y1="40" x2="44" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function MushroomDoodle({ color }: { color: string }) {
  return (
    <svg width="56" height="68" viewBox="0 0 56 68" fill="none">
      <path d="M18,42 Q16,54 20,64 Q24,68 28,68 Q32,68 36,64 Q40,54 38,42" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M4,42 Q2,20 28,16 Q54,20 52,42 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <circle cx="20" cy="26" r="3.5" stroke={color} strokeWidth="2"/>
      <circle cx="36" cy="22" r="2.5" stroke={color} strokeWidth="2"/>
      <circle cx="40" cy="34" r="3" stroke={color} strokeWidth="2"/>
      <circle cx="16" cy="36" r="2" stroke={color} strokeWidth="2"/>
    </svg>
  );
}

function SnailDoodle({ color }: { color: string }) {
  return (
    <svg width="70" height="56" viewBox="0 0 70 56" fill="none">
      <path d="M28,38 Q22,30 26,20 Q30,10 42,12 Q56,16 56,30 Q56,44 40,44 Q30,44 28,38" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M34,32 Q32,26 36,24 Q42,22 44,28 Q44,34 38,34 Q34,34 34,32" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M6,44 Q10,40 20,38 Q28,38 28,42 Q28,48 20,48 Q8,48 6,44 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      <circle cx="8" cy="40" r="7" stroke={color} strokeWidth="2.5" fill="none"/>
      <line x1="6" y1="33" x2="4" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="4" cy="25" r="2" fill={color}/>
      <line x1="10" y1="33" x2="10" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="25" r="2" fill={color}/>
    </svg>
  );
}

function FrogDoodle({ color }: { color: string }) {
  return (
    <svg width="66" height="60" viewBox="0 0 66 60" fill="none">
      <ellipse cx="33" cy="38" rx="22" ry="18" stroke={color} strokeWidth="2.5"/>
      <circle cx="20" cy="22" r="10" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="46" cy="22" r="10" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="20" cy="22" r="4" fill={color}/>
      <circle cx="46" cy="22" r="4" fill={color}/>
      <path d="M20,46 Q33,56 46,46" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="29" cy="38" r="2" fill={color}/>
      <circle cx="37" cy="38" r="2" fill={color}/>
    </svg>
  );
}

function MoonDoodle({ color }: { color: string }) {
  return (
    <svg width="54" height="60" viewBox="0 0 54 60" fill="none">
      <path d="M36,6 Q52,16 52,30 Q52,48 36,56 Q20,64 8,50 Q22,56 30,46 Q40,34 32,18 Q26,8 36,6 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <circle cx="34" cy="30" r="2.5" fill={color}/>
      <path d="M28,38 Q32,42 36,40" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M8,16 L9,12 L10,16 L14,17 L10,18 L9,22 L8,18 L4,17 Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M4,40 L5,37 L6,40 L9,41 L6,42 L5,45 L4,42 L1,41 Z" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

function HeartDoodle({ color }: { color: string }) {
  return (
    <svg width="58" height="56" viewBox="0 0 58 56" fill="none">
      <path d="M29,52 Q4,36 4,20 Q4,8 14,6 Q22,4 29,14 Q36,4 44,6 Q54,8 54,20 Q54,36 29,52 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <line x1="6" y1="8" x2="6" y2="4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4" y1="6" x2="8" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="50" y1="10" x2="50" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="48" y1="8" x2="52" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="46" y1="44" x2="48" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="44" y1="42" x2="50" y2="42" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function JellyfishDoodle({ color }: { color: string }) {
  return (
    <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
      <path d="M8,30 Q6,10 27,8 Q48,10 46,30 Q40,26 33,30 Q27,34 21,30 Q15,26 8,30 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <circle cx="22" cy="20" r="2.5" fill={color}/>
      <circle cx="32" cy="20" r="2.5" fill={color}/>
      <path d="M22,26 Q27,30 32,26" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M12,30 Q10,42 12,54 Q14,64 12,70" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M21,32 Q19,44 21,54 Q23,64 21,70" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M27,34 Q27,46 27,56 Q27,64 27,70" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M33,32 Q35,44 33,54 Q31,64 33,70" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M42,30 Q44,42 42,54 Q40,64 42,70" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function HedgehogDoodle({ color }: { color: string }) {
  return (
    <svg width="68" height="56" viewBox="0 0 68 56" fill="none">
      <ellipse cx="38" cy="38" rx="26" ry="16" stroke={color} strokeWidth="2.5"/>
      <line x1="18" y1="26" x2="16" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="22" x2="26" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="34" y1="20" x2="36" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="42" y1="22" x2="44" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="50" y1="26" x2="54" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="56" y1="32" x2="62" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="14" cy="36" r="10" stroke={color} strokeWidth="2.5" fill="none"/>
      <circle cx="8" cy="36" r="2.5" fill={color}/>
      <circle cx="16" cy="30" r="2" fill={color}/>
      <path d="M10,40 Q14,44 18,40" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// --- Config ---

const DOODLE_COMPONENTS = {
  cat: CatDoodle,
  dog: DogDoodle,
  bird: BirdDoodle,
  bunny: BunnyDoodle,
  fish: FishDoodle,
  butterfly: ButterflyDoodle,
  flower: FlowerDoodle,
  star: StarDoodle,
  cloud: CloudDoodle,
  mushroom: MushroomDoodle,
  snail: SnailDoodle,
  frog: FrogDoodle,
  moon: MoonDoodle,
  heart: HeartDoodle,
  jellyfish: JellyfishDoodle,
  hedgehog: HedgehogDoodle,
} as const;

type DoodleType = keyof typeof DOODLE_COMPONENTS;

interface DoodleConfig {
  id: number;
  type: DoodleType;
  color: string;
  pos: React.CSSProperties;
  rotate: number;
  delay: number;
  quoteIdx: number;
}

const DOODLES: DoodleConfig[] = [
  // Left edge
  { id: 0,  type: "cat",       color: "#ff9ed2", pos: { left: "2vw",   top: "10%" }, rotate: -12, delay: 0.0,  quoteIdx: 0  },
  { id: 1,  type: "flower",    color: "#fde68a", pos: { left: "3.5vw", top: "20%" }, rotate:   8, delay: 0.2,  quoteIdx: 1  },
  { id: 2,  type: "bunny",     color: "#c4b5fd", pos: { left: "1.5vw", top: "32%" }, rotate:  -5, delay: 0.4,  quoteIdx: 2  },
  { id: 3,  type: "snail",     color: "#86efac", pos: { left: "3vw",   top: "44%" }, rotate:   0, delay: 0.6,  quoteIdx: 3  },
  { id: 4,  type: "mushroom",  color: "#fca5a5", pos: { left: "2vw",   top: "56%" }, rotate:  10, delay: 0.8,  quoteIdx: 4  },
  { id: 5,  type: "heart",     color: "#fb7185", pos: { left: "4vw",   top: "66%" }, rotate:  -8, delay: 1.0,  quoteIdx: 5  },
  { id: 6,  type: "moon",      color: "#a78bfa", pos: { left: "1.5vw", top: "76%" }, rotate:   5, delay: 1.2,  quoteIdx: 6  },
  { id: 7,  type: "jellyfish", color: "#67e8f9", pos: { left: "3vw",   top: "87%" }, rotate:  -3, delay: 1.4,  quoteIdx: 7  },
  // Right edge
  { id: 8,  type: "dog",       color: "#fdba74", pos: { right: "2vw",   top: "14%" }, rotate:  10, delay: 0.1,  quoteIdx: 8  },
  { id: 9,  type: "bird",      color: "#6ee7b7", pos: { right: "3.5vw", top: "25%" }, rotate:  -8, delay: 0.3,  quoteIdx: 9  },
  { id: 10, type: "fish",      color: "#5eead4", pos: { right: "1.5vw", top: "37%" }, rotate:   5, delay: 0.5,  quoteIdx: 10 },
  { id: 11, type: "butterfly", color: "#f9a8d4", pos: { right: "2.5vw", top: "49%" }, rotate: -12, delay: 0.7,  quoteIdx: 11 },
  { id: 12, type: "frog",      color: "#4ade80", pos: { right: "1.5vw", top: "60%" }, rotate:   8, delay: 0.9,  quoteIdx: 12 },
  { id: 13, type: "star",      color: "#fde047", pos: { right: "4vw",   top: "71%" }, rotate:  15, delay: 1.1,  quoteIdx: 13 },
  { id: 14, type: "hedgehog",  color: "#fed7aa", pos: { right: "2vw",   top: "81%" }, rotate:  -5, delay: 1.3,  quoteIdx: 14 },
  { id: 15, type: "cloud",     color: "#bae6fd", pos: { right: "3vw",   top: "91%" }, rotate:   3, delay: 1.5,  quoteIdx: 15 },
  // Left edge extras (filling gaps)
  { id: 16, type: "star",      color: "#fde047", pos: { left: "3vw",   top: "3%"  }, rotate: -15, delay: 0.15, quoteIdx: 16 },
  { id: 17, type: "butterfly", color: "#f9a8d4", pos: { left: "2.5vw", top: "38%" }, rotate:  10, delay: 0.45, quoteIdx: 17 },
  { id: 18, type: "bird",      color: "#6ee7b7", pos: { left: "2vw",   top: "50%" }, rotate: -10, delay: 0.65, quoteIdx: 18 },
  { id: 19, type: "dog",       color: "#fdba74", pos: { left: "4vw",   top: "62%" }, rotate:  12, delay: 0.85, quoteIdx: 19 },
  { id: 20, type: "fish",      color: "#5eead4", pos: { left: "2.5vw", top: "95%" }, rotate:  -6, delay: 1.6,  quoteIdx: 20 },
  // Right edge extras (filling gaps)
  { id: 21, type: "flower",    color: "#fde68a", pos: { right: "3.5vw", top: "7%"  }, rotate:  12, delay: 0.25, quoteIdx: 21 },
  { id: 22, type: "cat",       color: "#ff9ed2", pos: { right: "2vw",   top: "32%" }, rotate: -12, delay: 0.55, quoteIdx: 22 },
  { id: 23, type: "mushroom",  color: "#fca5a5", pos: { right: "4vw",   top: "43%" }, rotate:   8, delay: 0.75, quoteIdx: 23 },
  { id: 24, type: "snail",     color: "#86efac", pos: { right: "2.5vw", top: "55%" }, rotate:  -5, delay: 0.95, quoteIdx: 24 },
  { id: 25, type: "bunny",     color: "#c4b5fd", pos: { right: "3vw",   top: "96%" }, rotate:   8, delay: 1.65, quoteIdx: 25 },
  // Inner left (7–12vw)
  { id: 26, type: "moon",      color: "#a78bfa", pos: { left: "9vw",   top: "8%"  }, rotate:  20, delay: 0.3,  quoteIdx: 26 },
  { id: 27, type: "jellyfish", color: "#67e8f9", pos: { left: "8vw",   top: "30%" }, rotate: -15, delay: 0.55, quoteIdx: 27 },
  { id: 28, type: "heart",     color: "#fb7185", pos: { left: "10vw",  top: "52%" }, rotate:   5, delay: 0.9,  quoteIdx: 28 },
  { id: 29, type: "cloud",     color: "#bae6fd", pos: { left: "7vw",   top: "74%" }, rotate:  -8, delay: 1.2,  quoteIdx: 29 },
  { id: 30, type: "frog",      color: "#4ade80", pos: { left: "11vw",  top: "90%" }, rotate:  15, delay: 1.55, quoteIdx: 30 },
  // Inner right (7–12vw)
  { id: 31, type: "hedgehog",  color: "#fed7aa", pos: { right: "9vw",  top: "15%" }, rotate: -10, delay: 0.4,  quoteIdx: 31 },
  { id: 32, type: "dog",       color: "#fdba74", pos: { right: "8vw",  top: "40%" }, rotate:  18, delay: 0.7,  quoteIdx: 0  },
  { id: 33, type: "star",      color: "#fde047", pos: { right: "11vw", top: "63%" }, rotate:  -8, delay: 1.05, quoteIdx: 1  },
  { id: 34, type: "fish",      color: "#5eead4", pos: { right: "7vw",  top: "78%" }, rotate: -12, delay: 1.35, quoteIdx: 2  },
  { id: 35, type: "butterfly", color: "#f9a8d4", pos: { right: "10vw", top: "95%" }, rotate:  10, delay: 1.7,  quoteIdx: 3  },
  // Mid-left (15–22vw)
  { id: 36, type: "flower",    color: "#fde68a", pos: { left: "16vw",  top: "5%"  }, rotate: -20, delay: 0.2,  quoteIdx: 4  },
  { id: 37, type: "mushroom",  color: "#fca5a5", pos: { left: "18vw",  top: "28%" }, rotate:  12, delay: 0.5,  quoteIdx: 5  },
  { id: 38, type: "bunny",     color: "#c4b5fd", pos: { left: "15vw",  top: "55%" }, rotate:  -8, delay: 0.85, quoteIdx: 6  },
  { id: 39, type: "moon",      color: "#a78bfa", pos: { left: "20vw",  top: "78%" }, rotate:  15, delay: 1.15, quoteIdx: 7  },
  { id: 40, type: "snail",     color: "#86efac", pos: { left: "17vw",  top: "93%" }, rotate:  -5, delay: 1.6,  quoteIdx: 8  },
  // Mid-right (15–22vw from right)
  { id: 41, type: "jellyfish", color: "#67e8f9", pos: { right: "16vw", top: "18%" }, rotate:  10, delay: 0.35, quoteIdx: 9  },
  { id: 42, type: "heart",     color: "#fb7185", pos: { right: "19vw", top: "45%" }, rotate: -15, delay: 0.65, quoteIdx: 10 },
  { id: 43, type: "frog",      color: "#4ade80", pos: { right: "15vw", top: "68%" }, rotate:  12, delay: 1.0,  quoteIdx: 11 },
  { id: 44, type: "bird",      color: "#6ee7b7", pos: { right: "21vw", top: "88%" }, rotate:  -8, delay: 1.4,  quoteIdx: 12 },
  { id: 45, type: "cloud",     color: "#bae6fd", pos: { right: "17vw", top: "3%"  }, rotate:   5, delay: 0.1,  quoteIdx: 13 },
];

// --- Component ---

export default function DoodleLayer() {
  const [activeQuote, setActiveQuote] = useState<{ cat: string; text: string; color: string } | null>(null);

  useEffect(() => {
    if (!activeQuote) return;
    const t = setTimeout(() => setActiveQuote(null), 4500);
    return () => clearTimeout(t);
  }, [activeQuote]);

  const handleClick = (quoteIdx: number, color: string) => {
    setActiveQuote({ ...QUOTES[quoteIdx % QUOTES.length], color });
  };

  return (
    <>
      {/* Doodles — visible on all screens, scaled for mobile */}
      <div
        className="absolute inset-0 z-20"
        style={{ pointerEvents: "none" }}
      >
        {DOODLES.map((d) => {
          const Comp = DOODLE_COMPONENTS[d.type];
          const isRight = "right" in d.pos;
          const wrapClass = isRight ? "doodle-wrap-right" : "doodle-wrap";
          return (
            <div
              key={d.id}
              className={wrapClass}
              style={{
                position: "absolute",
                ...d.pos,
              }}
            >
              <div style={{ transform: `rotate(${d.rotate}deg)` }}>
                <motion.button
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    pointerEvents: "auto",
                    filter: `drop-shadow(0 0 6px ${d.color}50)`,
                    display: "block",
                  }}
                  animate={{ y: [0, -9, 0] }}
                  transition={{
                    duration: 3.5 + d.delay * 0.3,
                    delay: d.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleClick(d.quoteIdx, d.color)}
                  title="click me!"
                >
                  <Comp color={d.color} />
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote popup */}
      <AnimatePresence>
        {activeQuote && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ pointerEvents: "all" }}
            onClick={() => setActiveQuote(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{
                background: "rgba(7,4,16,0.96)",
                border: `1px solid ${activeQuote.color}50`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                padding: "40px 36px",
                maxWidth: "340px",
                width: "90vw",
                textAlign: "center",
                boxShadow: `0 0 40px ${activeQuote.color}20`,
              }}
              initial={{ scale: 0.8, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 8 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.p
                style={{
                  fontFamily: FONT,
                  fontSize: "2.2rem",
                  marginBottom: "20px",
                  color: activeQuote.color,
                  filter: `drop-shadow(0 0 10px ${activeQuote.color}80)`,
                  lineHeight: 1.2,
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {activeQuote.cat}
              </motion.p>

              <p style={{
                fontFamily: FONT,
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.8,
                fontWeight: 400,
              }}>
                {activeQuote.text}
              </p>

              <button
                onClick={() => setActiveQuote(null)}
                style={{
                  marginTop: "28px",
                  fontFamily: FONT,
                  fontSize: "8px",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                  background: "none",
                  border: `1px solid ${activeQuote.color}30`,
                  padding: "8px 18px",
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                }}
              >
                tap anywhere to close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
