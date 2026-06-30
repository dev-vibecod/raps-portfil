"use client";

import { useEffect } from "react";

// Single delegated listener: sets --mx/--my on whichever .glass card the cursor
// is over, powering the radial spotlight defined in globals.css.
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch
    const onMove = (e) => {
      const el = e.target.closest?.(".glass");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
