"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// Scroll-triggered reveal. Primary trigger is IntersectionObserver (useInView);
// a timed fallback guarantees content is never left hidden if the observer
// doesn't fire (e.g. odd viewport/timing).
export default function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setForced(true), 900);
    return () => clearTimeout(t);
  }, []);

  const show = inView || forced;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay: inView ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
