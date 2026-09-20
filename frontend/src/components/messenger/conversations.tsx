import { ListFilterIcon } from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/mock-data";

export function ConversationsList({
  conversations,
  activeId,
}: {
  conversations: Conversation[];
  activeId: string;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex h-14 shrink-0 items-center justify-between px-4">
        <h2 className="font-display text-base font-semibold tracking-tight">
          Messages
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-muted-foreground"
          aria-label="Filter conversations"
        >
          <ListFilterIcon />
        </Button>
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
        aria-label="Conversations"
      >
        {conversations.map((conversation) => {
          const active = conversation.id === activeId;
          return (
            <div
              key={conversation.id}
              data-active={active}
              className={cn(
                "flex cursor-default items-center gap-3 rounded-2xl p-2.5 transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted/70",
              )}
            >
              <Avatar size="lg" className="shrink-0">
                <AvatarFallback>{conversation.initials}</AvatarFallback>
                {conversation.online ? <AvatarBadge /> : null}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-semibold">
                    {conversation.name}
                  </p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {conversation.time}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p className="truncate text-sm text-muted-foreground">
                    {conversation.preview}
                  </p>
                  {conversation.unread ? (
                    <Badge className="size-5 shrink-0 justify-center rounded-full p-0 text-xs">
                      {conversation.unread}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}