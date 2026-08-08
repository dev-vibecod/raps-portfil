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
        // Near-black navy base. 900 is the page; 800/700/600 are solid surfaces.
        ink: {
          900: "#080a12", // page background
          800: "#0c0f1a",
          700: "#11151f",
          600: "#171c2b",
        },
        // Periwinkle accent. Used sparingly: primary CTA, active state, one figure per section.
        iris: {
          300: "#c3c8ff",
          400: "#a9b0ff",
          500: "#8b93ff",
          600: "#6f78f5",
        },
        mist: "#c7cbe6", // muted lavender text
        // Hairline tokens. These exist because Tailwind's opacity scale is
        // multiples of 5 — `border-white/8` compiles to nothing and falls
        // through to the preflight `#e5e7eb`, which is a light grey line on a
        // near-black page. Named colours can't silently fail that way.
        line: {
          DEFAULT: "rgba(255,255,255,0.09)",
          soft: "rgba(255,255,255,0.06)",
          strong: "rgba(255,255,255,0.16)",
        },
        // Low-alpha fills, same reasoning as `line`.
        veil: {
          DEFAULT: "rgba(255,255,255,0.03)",
          strong: "rgba(255,255,255,0.06)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // The signature: every number, label, tag and timestamp is set in mono.
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // 11px metadata size, previously written as `text-[11px]` in 12 places.
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        // Display sizes get real optical tracking; Tailwind's defaults are too
        // loose above 2rem and are the main reason the headings read as generic.
        "3xl": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.018em" }],
        "4xl": ["2.375rem", { lineHeight: "1.12", letterSpacing: "-0.024em" }],
        "5xl": ["3rem", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "6xl": ["3.75rem", { lineHeight: "1.02", letterSpacing: "-0.034em" }],
        "7xl": ["4.5rem", { lineHeight: "0.98", letterSpacing: "-0.038em" }],
      },
      letterSpacing: {
        label: "0.14em", // mono metadata
      },
      boxShadow: {
        card: "0 24px 60px -30px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};
