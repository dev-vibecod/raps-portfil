import Link from "next/link";

// Styled 404 inside the locale layout. Labels are inline-bilingual because
// not-found boundaries don't receive route params.
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-mono text-7xl font-semibold text-iris-400 sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
        Halaman tidak ditemukan · Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-mist/65">
        Halaman yang Anda cari tidak ada atau sudah dipindahkan. The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/id" className="rounded-full bg-iris-500 px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400">
          Beranda
        </Link>
        <Link href="/en" className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-veil-strong">
          Home (EN)
        </Link>
      </div>
    </main>
  );
}
