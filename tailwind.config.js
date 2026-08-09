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
        // Elevation, as a separate group from `ink` on purpose. Renumbering
        // ink.800/700/600 would silently restyle ~20 usages inside
        // components/mockups/Mockups.js, ArchFlow and BackendInfo, which use
        // them as literal mockup-interior colours rather than as elevation.
        //
        // The old `.surface` sat at 1.034:1 against the page — every card,
        // chip, tile and panel on the site was drawn with one 1px hairline and
        // a fill the eye could not separate from the background, so nothing
        // could be made to feel more important than anything else.
        surface: {
          band: "#0d111c", // 1.049:1 — full-bleed chapter background
          card: "#141926", // 1.126:1 — a discrete object
          raised: "#1e2537", // 1.294:1 — hover, and the one climax element
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
        // The 20-28px band was empty: the page ran 11px (x70) and 13px (x42)
        // straight to a 48px heading, so scale could not carry hierarchy.
        xl: ["1.25rem", { lineHeight: "1.55" }],
        "2xl": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.012em" }],
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
