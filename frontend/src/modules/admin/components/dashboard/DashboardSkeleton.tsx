const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse p-10">
      <div className="space-y-3">
        <div className="h-8 w-56 rounded bg-muted" />
        <div className="h-4 w-80 rounded bg-muted" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="ls-card space-y-5 p-6">
            <div className="h-12 w-12 rounded-xl bg-muted" />

            <div className="space-y-3">
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-8 w-20 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="ls-card h-[380px]" />
        <div className="ls-card h-[380px]" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="ls-card h-[320px]" />
        <div className="ls-card h-[320px]" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="ls-card h-[320px]" />
        <div className="ls-card h-[320px]" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
