import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#030305",
          950: "#020204",
          900: "#08080c",
          850: "#0d0e14",
          800: "#13141c",
        },
        neural: {
          cyan: "#00F5D4",
          violet: "#7B2CBF",
          gold: "#E2B86B",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
      backgroundImage: {
        "radial-highlight": "radial-gradient(circle at 50% 0%, rgba(0, 245, 212, 0.12), transparent 70%)",
        "neural-mesh": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(123, 44, 191, 0.25), transparent 80%)",
        "gold-shimmer": "linear-gradient(135deg, rgba(226, 184, 107, 0.3) 0%, rgba(226, 184, 107, 0.05) 50%, rgba(0, 245, 212, 0.2) 100%)",
      },
      boxShadow: {
        "specular": "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        "cyan-glow": "0 0 25px -5px rgba(0, 245, 212, 0.35)",
        "violet-glow": "0 0 25px -5px rgba(123, 44, 191, 0.35)",
        "gold-glow": "0 0 25px -5px rgba(226, 184, 107, 0.35)",
        "emerald-glow": "0 0 25px -5px rgba(16, 185, 129, 0.35)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "scanline": "scanline 4s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
