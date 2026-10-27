"use client";

import useConversation from "@/store/useConversation";
import { ListCardSkeleton } from "@/components/skeleton/ListCardSkeleton";
import { NotFound } from "@/components/common/not-found";
import { Error } from "@/components/common/error";
import { ConversationListCard } from "@/components/sections/ConversationListCard";
import { useEffect } from "react";
import { getAllConversations } from "@/services/conversation";
import { conversation } from "@/types/conversation";
import { MessageCircleOff } from "lucide-react";

export function ConversationsList() {
  const conversations = useConversation((state) => state.conversations);
  const loading = useConversation((state) => state.loading);
  const error = useConversation((state) => state.error);
  const setLoading = useConversation((state) => state.setLoading);
  const setConversations = useConversation((state) => state.setConversations);
  const setError = useConversation((state) => state.setError);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = (await getAllConversations()) as {
        success: boolean;
        message?: string;
        data?: conversation[];
      };
      if (result.success) {
        setConversations(result.data ?? []);
      } else {
        setError(result.message ?? "Failed to load conversations");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <nav
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
        aria-label="Conversations"
      >
        <ListCardSkeleton />
      </nav>
    );
  }

  if (error) {
    return (
      <nav
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
        aria-label="Conversations"
      >
        <Error
          title="Failed to load conversations"
          description={error}
          onRetry={() => {
            void fetchConversations();
          }}
        />
      </nav>
    );
  }

  return (
    <nav
      className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scrollbar-gutter-stable"
      aria-label="Conversations"
    >
      {conversations.length ? (
        conversations.map((conv) => (
          <ConversationListCard key={conv.id} conv={conv} />
        ))
      ) : (
        <NotFound
          title="No conversations found"
          description="You don't have any conversations yet."
          icon={<MessageCircleOff className="w-4 h-4" />}
        />
      )}
    </nav>
  );
}
