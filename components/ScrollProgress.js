"use client";

import { useEffect, useRef } from "react";

/**
 * Thin progress bar tracking page scroll.
 *
 * Two things were wrong with the previous version: it animated `width`, which
 * cannot be composited and forces layout + paint on every scroll frame, and it
 * did so through React state, re-rendering the tree at scroll frequency.
 *
 * Now it writes `transform: scaleX()` straight to the node — compositor-only,
 * no React render — and coalesces to one write per frame.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    const write = () => {
      frame = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="no-print pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]" aria-hidden>
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-iris-500"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
