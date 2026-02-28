import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-archivo)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        // Metallic theme tokens
        background: "#0a0a0a", // Deep dark gray/black
        foreground: "#e2e8f0", // Light metallic gray
        surface: "#171717", // Slightly lighter dark gray
        "surface-2": "#262626", // Medium dark gray
        border: "rgba(226, 232, 240, 0.15)", // Metallic border
        "border-hover": "rgba(226, 232, 240, 0.3)",
        muted: {
          DEFAULT: "#262626",
          foreground: "#94a3b8", // Slate gray
        },
        primary: {
          DEFAULT: "#f8fafc", // Almost white
          foreground: "#020617", // Very dark slate
        },
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
