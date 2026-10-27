"use client";

import { cn } from "@/lib/utils";
import UserAvatar from "../common/UserAvatar";
import { formatDateTime } from "@/utils/date";
import { conversation } from "@/types/conversation";
import useConversation from "@/store/useConversation";

interface ConversationListCardProps {
  conv: conversation;
  active: boolean;
}

export function ConversationListCard({ conv, active }: ConversationListCardProps) {
  const setConversation = useConversation((state) => state.setConversation);

  return (
    <div
      key={conv.id}
      data-active={active}
      className={cn(
        "flex cursor-default items-center gap-3 rounded-2xl p-2.5 transition-colors",
        active ? "bg-accent text-accent-foreground" : "hover:bg-muted/70",
      )}
      onClick={() => setConversation(conv)}
    >
      <UserAvatar
        avatar={conv.receiver.avatar}
        fallback={conv.receiver.name[0]}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-semibold">{conv.receiver.name}</p>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatDateTime(conv.created_at)}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-muted-foreground">
            {conv?.last_message_id}
          </p>
        </div>
      </div>
    </div>
  );
}
