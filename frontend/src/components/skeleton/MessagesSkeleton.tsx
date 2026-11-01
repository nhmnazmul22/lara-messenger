import { Skeleton } from "@/components/ui/skeleton";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";

const rows = [
  { align: "start", lines: ["w-48", "w-32"] },
  { align: "end", lines: ["w-40"] },
  { align: "start", lines: ["w-56", "w-24"] },
  { align: "end", lines: ["w-36", "w-20"] },
  { align: "start", lines: ["w-48", "w-32"] },
  { align: "end", lines: ["w-40"] },
  { align: "start", lines: ["w-56", "w-24"] },
  { align: "end", lines: ["w-36", "w-20"] },
  { align: "start", lines: ["w-56", "w-24"] },
] as const;

export function MessagesSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading messages"
      aria-busy="true"
      className="flex flex-col gap-6"
    >
      <span className="sr-only">Loading messages</span>

      <div aria-hidden="true" className="flex flex-col gap-6">
        {rows.map(({ align, lines }, i) => (
          <Message key={i} align={align}>
            <MessageAvatar>
              <Skeleton className="size-8 rounded-full" />
            </MessageAvatar>
            <MessageContent className="flex flex-col gap-2">
              {lines.map((width, l) => (
                <Skeleton key={l} className={`h-3 max-w-full ${width}`} />
              ))}
            </MessageContent>
          </Message>
        ))}
      </div>
    </div>
  );
}
