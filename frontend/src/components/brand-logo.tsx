import { MessagesSquareIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function BrandLogo({
  tone = "default",
  className,
}: {
  tone?: "default" | "on-primary";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-2xl ring-1",
          tone === "on-primary"
            ? "bg-primary-foreground/10 text-primary-foreground ring-primary-foreground/15"
            : "bg-primary/10 text-primary ring-primary/15",
        )}
      >
        <MessagesSquareIcon className="size-4.5" strokeWidth={2} />
      </span>
      <span
        className={cn(
          "font-display text-lg font-semibold tracking-tight",
          tone === "on-primary" ? "text-primary-foreground" : "text-foreground",
        )}
      >
        Lara Messenger
      </span>
    </div>
  );
}