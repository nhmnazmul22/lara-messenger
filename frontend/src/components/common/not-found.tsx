"use client";

import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

interface NotFoundProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function NotFound({
  title = "No content found",
  description = "There are no content available right now.",
  icon,
  action,
  className,
}: NotFoundProps) {
  return (
    <Empty className={cn("min-h-0 flex-1 p-2.5", className)}>
      <EmptyHeader>
        {icon && (
          <EmptyMedia className="size-10 rounded-full bg-muted shrink-0">
            {icon}
          </EmptyMedia>
        )}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && <div className="mt-4">{action}</div>}
    </Empty>
  );
}
