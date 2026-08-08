// Route-transition loading state: centered pulsing monogram.
export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center pt-24">
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-iris-500/15 ring-1 ring-iris-500/40">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-iris-500/20" />
        <span className="font-mono text-2xl font-semibold text-iris-400">R</span>
      </div>
    </div>
  );
}
