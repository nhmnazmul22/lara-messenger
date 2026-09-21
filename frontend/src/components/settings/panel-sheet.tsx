"use client";

import type { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function PanelSheet({
  title,
  children,
  open,
  onClose,
}: {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="w-full sm:w-110 sm:max-w-none"
        showCloseButton
      >
        <SheetHeader className="border-b border-border p-4 sm:px-6">
          <SheetTitle className="font-display text-lg font-semibold tracking-tight">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}