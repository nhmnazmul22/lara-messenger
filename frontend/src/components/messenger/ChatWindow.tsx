"use client";

import { ChatHeader } from "@/components/messenger/ChatHeader";
import { Composer } from "@/components/messenger/Composer";
import { Messages } from "@/components/messenger/Messages";
import useConversation from "@/store/useConversation";
import useGroup from "@/store/useGroup";
import { Error } from "@/components/common/error";
import { useEffect } from "react";
import { toast } from "../ui/toast";
import {
  getMessagesByConversation,
  getMessagesByGroup,
} from "@/services/message";
import { Message } from "@/types/message";
import { ChatWindowSkeleton } from "../skeleton/ChatWindowSkeleton";

export function ChatWindow() {
  const conversation = useConversation((state) => state.conversation);
  const setMessages = useConversation((state) => state.setMessages);
  const loading = useConversation((state) => state.loading);
  const setLoadingMessages = useConversation(
    (state) => state.setLoadingMessages,
  );
  const activeGroup = useGroup((state) => state.activeGroup);
  const groupsLoading = useGroup((state) => state.groupsLoading);

  const fetchMessages = async (id: number) => {
    try {
      setLoadingMessages(true);
      let result = null;

      if (activeGroup) {
        result = await getMessagesByGroup(id);
      } else {
        result = await getMessagesByConversation(id);
      }

      if (!result || !result.success) {
        toast.add({
          type: "error",
          description: result?.message ?? "Conversation start failed",
        });
        return;
      }
      setMessages(result.data as Message[]);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (activeGroup?.id && !conversation) {
      fetchMessages(activeGroup.id);
    }

    if (conversation?.id && !activeGroup) {
      fetchMessages(conversation.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?.id, activeGroup?.id]);

  if (loading || groupsLoading) {
    return <ChatWindowSkeleton />;
  }

  if (!conversation && !activeGroup) {
    return (
      <Error
        title="Conversation not found"
        description="The conversation you are looking for does not exist."
      />
    );
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-col">
      <ChatHeader conversation={conversation} group={activeGroup} />
      <Messages />
      <Composer />
    </div>
  );
}
