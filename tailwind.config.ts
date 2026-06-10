import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4d9e2",
          300: "#aeb7c8",
          400: "#8290a8",
          500: "#62718c",
          600: "#4d5a73",
          700: "#3f495e",
          800: "#373f50",
          900: "#0f172a",
          950: "#080d1a",
        },
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#bcdcff",
          300: "#8ec6ff",
          400: "#59a6ff",
          500: "#3385fc",
          600: "#1e66f1",
          700: "#1850dd",
          800: "#1a43b3",
          900: "#1b3c8d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06)",
        soft: "0 4px 16px rgba(16,24,40,.06), 0 2px 4px rgba(16,24,40,.04)",
        pop: "0 10px 40px rgba(16,24,40,.12)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0", transform: "translateY(4px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "scale-in": { "0%": { opacity: "0", transform: "scale(.97)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        "pulse-soft": { "0%,100%": { opacity: "1" }, "50%": { opacity: ".5" } },
      },
      animation: {
        "fade-in": "fade-in .25s ease-out",
        "scale-in": "scale-in .18s ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
