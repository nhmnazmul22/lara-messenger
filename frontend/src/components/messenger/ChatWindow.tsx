"use client";

import { ChatHeader } from "@/components/messenger/ChatHeader";
import { Composer } from "@/components/messenger/composer";
import { Messages } from "@/components/messenger/messages";
import useConversation from "@/store/useConversation";
import { Error } from "@/components/common/error";
import { useEffect } from "react";
import { startConversation } from "@/services/conversation";
import { toast } from "../ui/toast";
import { ConversationWithMessages } from "@/types/conversation";

export function ChatWindow() {
  const conversation = useConversation((state) => state.conversation);
  const conversationWithMessages = useConversation(
    (state) => state.conversationWithMessages,
  );
  const setConversationWithMessages = useConversation(
    (state) => state.setConversationWithMessages,
  );

  const fetchConversation = async (receiverId: number) => {
    const result = await startConversation(receiverId);
    if (!result.success) {
      toast.add({
        type: "error",
        description: result.message ?? "Conversation start failed",
      });
      return;
    }

    setConversationWithMessages(result.data as ConversationWithMessages);
  };

  useEffect(() => {
    if (conversation?.receiver.id) {
      fetchConversation(conversation.receiver.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  if (!conversation || !conversationWithMessages) {
    return (
      <Error
        title="Conversation not found"
        description="The conversation you are looking for does not exist."
      />
    );
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-col">
      <ChatHeader conversation={conversation} />
      <Messages
        messages={conversationWithMessages.messages}
        senderName={conversation.receiver.name}
        senderInitials={conversation.receiver.name[0]}
      />
      <Composer />
    </div>
  );
}
