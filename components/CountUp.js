"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Animates the numeric part of a value ("20+", "~2,000", "99.9%") from 0 when
 * scrolled into view. Falls back to static text when there is no clean leading
 * number ("E2E", "Free").
 *
 * The initial state is the REAL value, not zero. Seeding with zero meant the
 * prerendered HTML literally said "0+ years exp. / 0+ projects / ~0 users" —
 * what a crawler indexed and what anyone with JS blocked read. The count-from-
 * zero is now a client-only effect layered on top of correct markup.
 */
export default function CountUp({ value, className }) {
  const ref = useRef(null);
  const m = String(value).match(/^([^\d]*)([\d.,]+)(.*)$/);
  const animatable = m && /^[^A-Za-z]*$/.test(m[1]) && /^[^A-Za-z]*$/.test(m[3]);
  const [disp, setDisp] = useState(value);

  useEffect(() => {
    if (!animatable) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(m[2].replace(/,/g, ""));
    const decimals = (m[2].split(".")[1] || "").length;
    const grouped = m[2].includes(",");
    const format = (n) =>
      decimals
        ? n.toFixed(decimals)
        : grouped
          ? Math.round(n).toLocaleString("en-US")
          : String(Math.round(n));

    let raf = 0;
    let timer = 0;
    const run = () => {
      const dur = 1100;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        setDisp(`${m[1]}${format(target * (1 - Math.pow(1 - p, 3)))}${m[3]}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      // Drop to zero and climb. This runs after hydration, so the server-
      // rendered markup was never wrong.
      setDisp(`${m[1]}${format(0)}${m[3]}`);
      raf = requestAnimationFrame(tick);
    };

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        clearTimeout(timer); // otherwise the timer below fires mid-count
        run();
      },
      { rootMargin: "-40px 0px" }
    );
    io.observe(el);

    // If the observer never fires, leave the real value in place rather than
    // animating — the markup already shows it.
    timer = setTimeout(() => io.disconnect(), 2500);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value, animatable]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {disp}
    </span>
  );
}
