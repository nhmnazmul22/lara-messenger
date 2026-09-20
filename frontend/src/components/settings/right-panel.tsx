"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RightPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div className="absolute inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 animate-in fade-in bg-background/60 backdrop-blur-sm duration-300 ease-out"
        onClick={close}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 flex h-full w-full animate-in slide-in-from-right-full flex-col border-l border-border bg-background shadow-2xl shadow-black/10 duration-500 ease-out sm:w-110"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
          <h1 className="font-display text-lg font-semibold tracking-tight">
            {title}
          </h1>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={close}
            aria-label={`Close ${title.toLowerCase()}`}
          >
            <XIcon />
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable">
          {children}
        </div>
      </div>
    </div>
  );
}
