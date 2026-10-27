// import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import useConversation from "@/store/useConversation";
import UserAvatar from "../common/UserAvatar";
import { formatDateTime } from "@/utils/date";
import { useEffect } from "react";
import { getAllConversations } from "@/services/conversation";
import { conversation } from "@/types/conversation";

export function ConversationsList() {
  const conversations = useConversation((state) => state.conversations);
  const conversation = useConversation((state) => state.conversation);
  const setLoading = useConversation((state) => state.setLoading);
  const setConversations = useConversation((state) => state.setConversations);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await getAllConversations();
        if (result.success) {
          setConversations(result.data as conversation[]);
        }
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Conversations"
    >
      {conversations.map((conv) => {
        const active = conversation && conv.id === conversation.id;
        return (
          <div
            key={conv.id}
            data-active={active}
            className={cn(
              "flex cursor-default items-center gap-3 rounded-2xl p-2.5 transition-colors",
              active ? "bg-accent text-accent-foreground" : "hover:bg-muted/70",
            )}
          >
            <UserAvatar
              avatar={conv.receiver.avatar}
              fallback={conv.receiver.name[0]}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm font-semibold">
                  {conv.receiver.name}
                </p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDateTime(conv.created_at)}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <p className="truncate text-sm text-muted-foreground">
                  {conversation?.last_message_id}
                </p>
                {/* {conversation.unread ? (
                  <Badge className="size-5 shrink-0 justify-center rounded-full p-0 text-xs">
                    {conversation.unread}
                  </Badge>
                ) : null} */}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
