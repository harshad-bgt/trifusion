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
        // Trifusion Brand Colors
        tf: {
          // Primary blues
          navy:   "#0B1F4A",  // deep navy — primary brand
          blue:   "#1246A0",  // mid-blue
          sky:    "#0066FF",  // accent blue
          cyan:   "#00BFFF",  // electric cyan
          // Neutrals
          dark:   "#0D0D0D",
          gray:   "#6B7280",
          muted:  "#9CA3AF",
          light:  "#F0F4FF",
          bg:     "#F8FAFF",  // page background
          // Semantic
          border: "#E2E8F4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "tf-gradient": "linear-gradient(135deg, #0B1F4A 0%, #1246A0 50%, #0066FF 100%)",
        "tf-gradient-subtle": "linear-gradient(135deg, #F8FAFF 0%, #F0F4FF 100%)",
        "hero-mesh": "radial-gradient(at 40% 20%, hsla(215,100%,16%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(218,80%,35%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(215,100%,16%,0.8) 0px, transparent 50%)",
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgba(11,31,74,0.06), 0 1px 2px 0 rgba(11,31,74,0.04)",
        "card-hover": "0 10px 40px -8px rgba(11,31,74,0.15), 0 4px 16px -4px rgba(11,31,74,0.08)",
        "button": "0 2px 8px rgba(0,102,255,0.25)",
        "button-hover": "0 4px 16px rgba(0,102,255,0.35)",
        "nav": "0 1px 0 0 rgba(11,31,74,0.06)",
        "dropdown": "0 8px 40px rgba(11,31,74,0.12), 0 2px 8px rgba(11,31,74,0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
        "fade-in": "fadeIn 0.4s ease-out both",
        "slide-in": "slideIn 0.3s ease-out both",
        "counter": "counter 2s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        "tf": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
