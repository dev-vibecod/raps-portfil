/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black navy base + glass surfaces
        ink: {
          900: "#080a12", // page background
          800: "#0c0f1a",
          700: "#11151f",
          600: "#171c2b",
        },
        // Periwinkle / lavender accent (from reference)
        iris: {
          400: "#a9b0ff",
          500: "#8b93ff",
          600: "#6f78f5",
        },
        mist: "#c7cbe6", // muted lavender text
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(139,147,255,0.35)",
        card: "0 24px 60px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};
