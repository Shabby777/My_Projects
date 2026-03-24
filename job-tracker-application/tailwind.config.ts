import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f6fafe",
        "surface-low": "#f0f4f8",
        surface: "#ffffff",
        primary: "#002c53",
        "primary-soft": "#1a426e",
        ink: "#171c1f",
        muted: "#43474f",
        outline: "#c3c6d0",
        accent: "#6ffbbe",
        success: "#29c48b",
        warn: "#c57a00",
        danger: "#ba1a1a"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        ambient: "0 20px 40px rgba(0, 44, 83, 0.06)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top left, rgba(111, 251, 190, 0.18), transparent 38%), radial-gradient(circle at top right, rgba(26, 66, 110, 0.2), transparent 32%)",
        "cta-gradient": "linear-gradient(135deg, #002c53 0%, #1a426e 100%)"
      }
    }
  },
  plugins: []
};

export default config;
