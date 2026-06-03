import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50: "#fff8f5",
          100: "#ffe8dc",
          200: "#ffd0b8",
          300: "#ffb08a",
          400: "#ff8c5c",
          500: "#f97040",
          DEFAULT: "#ffb08a",
        },
        blush: {
          50: "#fff5f7",
          100: "#ffe4ea",
          200: "#ffc9d5",
          300: "#ff9db2",
          400: "#ff6b8a",
          DEFAULT: "#ffc9d5",
        },
        lavender: {
          50: "#f8f5ff",
          100: "#ede8ff",
          200: "#ddd5ff",
          300: "#c4b5fd",
          400: "#a78bfa",
          DEFAULT: "#ddd5ff",
        },
        cream: {
          50: "#fefdf8",
          100: "#fdf6e3",
          200: "#f9ecc6",
          300: "#f4dca0",
          DEFAULT: "#fdf6e3",
        },
        gold: {
          100: "#fff8e1",
          200: "#ffecb3",
          300: "#ffe082",
          400: "#ffd54f",
          500: "#ffca28",
          DEFAULT: "#ffd54f",
        },
        rosegold: {
          100: "#fce4e4",
          200: "#f8bbb0",
          300: "#ef9a9a",
          400: "#e57373",
          DEFAULT: "#f8bbb0",
        },
        midnight: "#0d0a0f",
        dusk: "#1a1025",
        twilight: "#2d1b3d",
      },
      fontFamily: {
        serif: ["'Poppins'", "sans-serif"],
        sans: ["'Poppins'", "sans-serif"],
        mono: ["'Poppins'", "sans-serif"],
        display: ["'Poppins'", "sans-serif"],
      },
      animation: {
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "float-medium": "floatMedium 4s ease-in-out infinite",
        "float-fast": "floatFast 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "typewriter": "typewriter 3s steps(40) forwards",
        "fade-up": "fadeUp 1s ease forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(-1deg)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 176, 138, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 176, 138, 0.8)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "sunset-gradient": "linear-gradient(135deg, #ff9966 0%, #ff5e62 25%, #c471ed 50%, #f64f59 75%, #ffd54f 100%)",
        "dawn-gradient": "linear-gradient(180deg, #0d0a0f 0%, #1a1025 30%, #3d1a52 60%, #ff9966 100%)",
        "peach-gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        "rose-gradient": "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(255,213,79,0.3), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
