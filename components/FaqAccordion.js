"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

/**
 * The open/close animation was `AnimatePresence` + `height: auto`, which
 * framer-motion implements by measuring the element every frame. The
 * `grid-template-rows: 0fr -> 1fr` transition below is the CSS-native way to
 * animate to an unknown height, and it composites without measuring anything.
 */
export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((qa, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={qa.q} className="surface overflow-hidden rounded-2xl">
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-white">{qa.q}</span>
              <Plus
                size={18}
                aria-hidden
                className={`shrink-0 text-iris-400 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            {/* `grid-rows-[0fr]` + overflow-hidden clips the answer visually
                but leaves it in the accessibility tree, which contradicts
                aria-expanded="false" — a screen reader would read every answer
                as if all panels were open. `aria-hidden` closes that gap; the
                panel holds no focusable content, so nothing becomes
                unreachable by keyboard. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-mist/70">{qa.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
