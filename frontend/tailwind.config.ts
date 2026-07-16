import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      /* ─────────────────────────────────────────────
         Colors
      ───────────────────────────────────────────── */

      colors: {
        /* Brand */

        primary: {
          DEFAULT: "#4F46E5",
          dark: "#4338CA",
          light: "#EEF2FF",
        },

        secondary: {
          DEFAULT: "#F59E0B",
          dark: "#D97706",
          light: "#FEF3C7",
        },

        /* Background System */

        background: {
          light: "#FFFFFF",
          dark: "#0F172A",
        },

        surface: {
          light: "#F8FAFC",
          dark: "#111827",
        },

        card: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },

        overlay: {
          light: "#F1F5F9",
          dark: "#1E293B",
        },

        /* Text */

        text: {
          light: "#0F172A",
          muted: "#64748B",

          dark: "#F8FAFC",
          darkMuted: "#94A3B8",
        },

        /* Borders */

        border: {
          light: "#E2E8F0",
          dark: "#334155",
        },

        /* Success */

        green: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          900: "#14532D",

          border: "#166534",
        },

        /* Danger */

        red: {
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          900: "#2D1515",

          border: "#7F1D1D",
        },

        /* Warning */

        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
          900: "#1C1400",

          border: "#CA8A04",
        },

        /* Info */

        blue: {
          400: "#93C5FD",
          500: "#3B82F6",
          900: "#1E3A5F",

          border: "#1D4ED8",
        },
      },

      /* ─────────────────────────────────────────────
         Typography
      ───────────────────────────────────────────── */

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'Courier New'", "monospace"],
      },

      /* ─────────────────────────────────────────────
         Shadows
      ───────────────────────────────────────────── */

      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.05)",
        card: "0 1px 3px rgba(0,0,0,0.08)",
        modal: "0 8px 32px rgba(0,0,0,0.18)",
        navbar: "0 1px 2px rgba(0,0,0,0.04)",
      },

      /* ─────────────────────────────────────────────
         Container
      ───────────────────────────────────────────── */

      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "40rem", // 640px
          md: "48rem", // 768px
          lg: "64rem", // 1024px
          xl: "80rem", // 1280px
          "2xl": "87.5rem", // 1400px
        },
      },

      /* ─────────────────────────────────────────────
         Transition
      ───────────────────────────────────────────── */

      transitionDuration: {
        fast: "100ms",
        normal: "150ms",
        slow: "250ms",
      },

      /* ─────────────────────────────────────────────
         Keyframes
      ───────────────────────────────────────────── */

      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },

          "100%": {
            opacity: "1",
          },
        },

        "slide-down": {
          "0%": {
            transform: "translateY(-0.625rem)",
            opacity: "0",
          },

          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },

          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },

        "bar-pulse": {
          "0%, 100%": {
            transform: "scaleY(0.2)",
          },

          "50%": {
            transform: "scaleY(1)",
          },
        },

        blink: {
          "0%, 100%": {
            opacity: "1",
          },

          "50%": {
            opacity: "0",
          },
        },
      },

      /* ─────────────────────────────────────────────
         Animations
      ───────────────────────────────────────────── */

      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "slide-down": "slide-down 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "bar-pulse": "bar-pulse 1.1s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },

  plugins: [],
};

export default config;
