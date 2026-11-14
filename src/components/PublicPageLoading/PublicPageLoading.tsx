export default function PublicPageLoading() {
  return (
    <div role="status" aria-label="Loading page" className="min-h-[70vh] bg-bg px-6 py-12 md:px-12">
      <span className="sr-only">Loading page…</span>
      <div className="mx-auto max-w-[1400px] animate-pulse">
        <div className="mb-10 h-3 w-28 rounded bg-ink/10" />
        <div className="mb-4 h-12 w-64 max-w-full rounded-lg bg-ink/10 md:h-16" />
        <div className="mb-12 h-4 w-[min(32rem,90%)] rounded bg-ink/8" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map(item => (
            <div key={item} className="overflow-hidden rounded-2xl border border-ink/8 bg-ink/5">
              <div className="aspect-[4/3] bg-ink/8" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-20 rounded bg-ink/10" />
                <div className="h-5 w-3/4 rounded bg-ink/10" />
                <div className="h-3 w-full rounded bg-ink/8" />
                <div className="h-3 w-2/3 rounded bg-ink/8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
