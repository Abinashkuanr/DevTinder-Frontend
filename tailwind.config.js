/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F7FA",
        panel: "#FFFFFF",
        titlebar: "#14151F",
        ink: "#1B1E2B",
        muted: "#6B7280",
        line: "#E4E7EC",
        indigo: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          soft: "#EEF0FE",
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
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,30,43,0.04), 0 12px 24px -12px rgba(27,30,43,0.18)",
        pop: "0 20px 40px -18px rgba(27,30,43,0.35)",
      },
      keyframes: {
        "card-in": {
          "0%": { opacity: 0, transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        "swipe-approve": {
          "0%": { transform: "translate(0,0) rotate(0)", opacity: 1 },
          "100%": { transform: "translate(120%, -12%) rotate(10deg)", opacity: 0 },
        },
        "swipe-reject": {
          "0%": { transform: "translate(0,0) rotate(0)", opacity: 1 },
          "100%": { transform: "translate(-120%, -12%) rotate(-10deg)", opacity: 0 },
        },
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
      },
      animation: {
        "card-in": "card-in 0.35s cubic-bezier(.2,.7,.3,1) both",
        "swipe-approve": "swipe-approve 0.4s ease-in forwards",
        "swipe-reject": "swipe-reject 0.4s ease-in forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
