"use client";

import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CvActions({ lang, dict }) {
  return (
    <div className="no-print mx-auto mb-6 flex max-w-3xl items-center justify-between px-5">
      <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
        <ArrowLeft size={16} /> {dict.nav.home}
      </Link>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full bg-iris-500 px-5 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400"
      >
        <Download size={16} /> {dict.cv.download}
      </button>
    </div>
  );
}
