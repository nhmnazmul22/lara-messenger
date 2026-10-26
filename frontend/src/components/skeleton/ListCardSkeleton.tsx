
interface ListCardSkeletonProps {
  count?: number;
}

export function ListCardSkeleton({ count = 5 }: ListCardSkeletonProps) {
  return (
    <section
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border
      scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Users"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center gap-3 rounded-2xl p-2.5 animate-pulse"
        >
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-muted"></div>
            <div className="min-w-0 flex-1">
              <div className="h-4 w-full rounded bg-muted mb-1.5"></div>
              <div className="h-3 w-5/6 rounded bg-muted"></div>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-muted"></div>
        </div>
      ))}
    </section>
  );
}
