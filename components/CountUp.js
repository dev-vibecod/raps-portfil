"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

// Animates the numeric part of a value (e.g. "20+", "~2,000", "99.9%") from 0
// when scrolled into view. Falls back to static text when there's no clean
// leading number (e.g. "E2E", "Free").
export default function CountUp({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [forced, setForced] = useState(false);
  const m = String(value).match(/^([^\d]*)([\d.,]+)(.*)$/);
  const animatable = m && /^[^A-Za-z]*$/.test(m[1]) && /^[^A-Za-z]*$/.test(m[3]);
  const [disp, setDisp] = useState(animatable ? `${m[1]}0${m[3]}` : value);

  // Fallback so the number never sticks at 0 if the observer doesn't fire.
  useEffect(() => {
    const t = setTimeout(() => setForced(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if ((!inView && !forced) || !animatable) return;
    const target = parseFloat(m[2].replace(/,/g, ""));
    const decimals = (m[2].split(".")[1] || "").length;
    const grouped = m[2].includes(",");
    const dur = 1100;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      const num = decimals ? cur.toFixed(decimals) : grouped ? Math.round(cur).toLocaleString("en-US") : String(Math.round(cur));
      setDisp(`${m[1]}${num}${m[3]}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, forced, animatable]); // eslint-disable-line

  return <span ref={ref} className={className}>{disp}</span>;
}
