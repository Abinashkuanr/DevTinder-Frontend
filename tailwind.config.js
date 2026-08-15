/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFF9FA",
        panel: "#FFFFFF",
        ink: "#26192F",
        muted: "#8B8394",
        line: "#F1E6EA",
        flame: {
          pink: "#FD297B",
          red: "#FF5864",
          orange: "#FF655B",
          DEFAULT: "#FE3C72",
          soft: "#FFEDF2",
        },
        indigo: {
          DEFAULT: "#7C5CFC",
          dark: "#6644E0",
          soft: "#F1EDFF",
        },
        emerald: {
          DEFAULT: "#10B981",
          soft: "#E7F8F1",
        },
        rose: {
          DEFAULT: "#F43F5E",
          soft: "#FDEAED",
        },
        amber: {
          DEFAULT: "#F59E0B",
          soft: "#FEF3E2",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      backgroundImage: {
        flame: "linear-gradient(90deg, #FD297B 0%, #FF5864 50%, #FF655B 100%)",
        "flame-vertical": "linear-gradient(180deg, #FD297B 0%, #FF655B 100%)",
        scrim: "linear-gradient(180deg, rgba(38,25,47,0) 0%, rgba(38,25,47,0.15) 55%, rgba(38,25,47,0.88) 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(38,25,47,0.04), 0 20px 40px -16px rgba(253,41,123,0.28)",
        pop: "0 20px 45px -18px rgba(253,41,123,0.45)",
        fab: "0 10px 20px -6px rgba(38,25,47,0.25)",
        glow: "0 0 0 6px rgba(253,41,123,0.08)",
      },
      keyframes: {
        "card-in": {
          "0%": { opacity: 0, transform: "translateY(14px) scale(0.96)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        "swipe-approve": {
          "0%": { transform: "translate(0,0) rotate(0)", opacity: 1 },
          "100%": { transform: "translate(130%, -10%) rotate(14deg)", opacity: 0 },
        },
        "swipe-reject": {
          "0%": { transform: "translate(0,0) rotate(0)", opacity: 1 },
          "100%": { transform: "translate(-130%, -10%) rotate(-14deg)", opacity: 0 },
        },
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-25px) scale(1.08)" },
          "66%": { transform: "translate(-15px,15px) scale(0.95)" },
        },
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
        },
      },
      animation: {
        "card-in": "card-in 0.4s cubic-bezier(.2,.7,.3,1) both",
        "swipe-approve": "swipe-approve 0.42s ease-in forwards",
        "swipe-reject": "swipe-reject 0.42s ease-in forwards",
        blink: "blink 1s step-end infinite",
        blob: "blob 12s ease-in-out infinite",
        "blob-delay": "blob 12s ease-in-out infinite 4s",
        heartbeat: "pulseHeart 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
