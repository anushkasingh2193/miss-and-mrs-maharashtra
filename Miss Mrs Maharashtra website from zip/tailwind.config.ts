import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          page: "#020817",
          tint: "#071426",
          wash: "#0E1D33",
          ink: "#EEF6FF",
          body: "#C7D6E8",
          muted: "#8FA6C3",
          accent: "#D6AE4F",
          hover: "#E1BC62",
        },
      },
      fontFamily: {
        display: ["Bodoni Moda", "serif"],
        sans: ["Jost", "sans-serif"],
        marathi: ["Tiro Devanagari Marathi", "serif"],
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(26px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise .9s cubic-bezier(.2,.8,.2,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
