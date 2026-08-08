"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Scroll-triggered reveal.
 *
 * Was a framer-motion `motion.div`. The animation is a fade and a 24px rise —
 * two composited properties a CSS transition does natively — so the library was
 * costing ~45 kB on every route to do what the browser does for free.
 *
 * The observer is the primary trigger; a 900ms timer is a safety net so content
 * is never left invisible if it never fires. `globals.css` carries a
 * `<noscript>` counterpart for the same reason.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-80px 0px" }
    );
    io.observe(el);

    const fallback = setTimeout(() => {
      setShown(true);
      io.disconnect();
    }, 900);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
