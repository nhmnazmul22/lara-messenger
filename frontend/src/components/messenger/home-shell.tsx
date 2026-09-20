"use client";

import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { ChatWindow } from "@/components/messenger/chat-window";
import { ConversationsList } from "@/components/messenger/conversations";
import { UserMenu } from "@/components/messenger/user-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { activeChat, conversations } from "@/lib/mock-data";

export function HomeShell() {
  const [conversationsOpen, setConversationsOpen] = useState(false);

  return (
    <div className="flex h-svh flex-col overflow-hidden bg-muted/50">
      <main className="mx-auto w-full max-w-[1600px] min-h-0 flex-1 px-3 py-3 sm:px-5 sm:py-4">
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-background shadow-lg shadow-black/5 ring-1 ring-border/70">
          <header className="relative z-50 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-xl lg:hidden"
                onClick={() => setConversationsOpen((open) => !open)}
                aria-label="Toggle conversation list"
                aria-expanded={conversationsOpen}
              >
                {conversationsOpen ? <XIcon /> : <MenuIcon />}
              </Button>
              <BrandLogo />
            </div>
            <UserMenu />
          </header>

          <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[340px_1fr]">
            <div className="hidden min-h-0 border-r border-border lg:block">
              <ConversationsList
                conversations={conversations}
                activeId={activeChat.id}
              />
            </div>
            <ChatWindow chat={activeChat} />
          </div>

          <div
              className={cn(
                "absolute inset-0 z-30 bg-background/60 transition-[opacity,backdrop-filter] duration-500 ease-out lg:hidden",
                conversationsOpen
                  ? "pointer-events-auto opacity-100 backdrop-blur-sm"
                  : "pointer-events-none opacity-0 backdrop-blur-0",
              )}
              onClick={() => setConversationsOpen(false)}
              aria-hidden="true"
            />

          <aside
            id="conversations-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Conversations"
            className={cn(
              "absolute top-16 bottom-0 left-0 z-40 w-1/2 min-w-64 max-w-full border-r border-border bg-background shadow-2xl shadow-black/10 transition-transform duration-300 ease-out lg:hidden",
              conversationsOpen
                ? "translate-x-0"
                : "pointer-events-none -translate-x-full",
            )}
          >
            <ConversationsList
              conversations={conversations}
              activeId={activeChat.id}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}