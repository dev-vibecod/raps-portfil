"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/lib/i18n";

// Swaps the locale prefix in the current path, preserving the rest.
export default function LangToggle({ lang }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next) => {
    if (next === lang) return;
    const rest = pathname.replace(/^\/(id|en)(?=\/|$)/, "");
    router.push(`/${next}${rest || ""}`);
  };

  return (
    <div className="flex items-center rounded-full border border-white/12 bg-white/[0.03] p-0.5 text-xs font-medium">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-label={`Switch to ${l.toUpperCase()}`}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            l === lang ? "bg-iris-500 text-ink-900" : "text-mist/60 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
