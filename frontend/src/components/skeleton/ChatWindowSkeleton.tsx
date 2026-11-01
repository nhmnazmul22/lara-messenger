import { Skeleton } from "@/components/ui/skeleton";
import { MessagesSkeleton } from "@/components/skeleton/MessagesSkeleton";

export function ChatWindowSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading conversation"
      aria-busy="true"
      className="flex h-full min-h-0 min-w-0 flex-col"
    >
      <span className="sr-only">Loading conversation</span>

      {/* Header */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 border-b p-3"
      >
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <MessagesSkeleton />
      </div>

      {/* Composer */}
      <div aria-hidden="true" className="flex items-center gap-2 border-t p-3">
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="size-10 rounded-full" />
      </div>
    </div>
  );
}
