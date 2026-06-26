"use client";

import { useRef, useState, useLayoutEffect } from "react";

// Renders children at a fixed design size, then uniformly scales the whole
// thing to fill the parent's width. Lets one fluid mockup look crisp both as a
// small card thumbnail and as a large detail-page screen.
export default function ScaledMockup({ designWidth = 800, designHeight = 500, children }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / designWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${designWidth} / ${designHeight}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
