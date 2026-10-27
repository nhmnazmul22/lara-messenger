"use client";

import { RefreshCw } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function Error({
  title = "Something went wrong",
  description = "Unable to load data. Please try again.",
  icon,
  onRetry,
  retryLabel = "Retry",
  className,
}: ErrorProps) {
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
      {onRetry && (
        <Button onClick={onRetry} size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> {retryLabel}
        </Button>
      )}
    </Empty>
  );
}
