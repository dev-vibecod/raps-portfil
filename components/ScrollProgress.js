"use client";

import { useEffect, useState } from "react";

// Thin gradient progress bar tracking page scroll (works with Lenis, which
// drives native window scroll).
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="no-print fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-iris-600 via-iris-400 to-iris-500 shadow-[0_0_12px_rgba(139,147,255,0.6)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
