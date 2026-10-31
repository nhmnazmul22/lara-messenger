"use client";

import { ChatHeader } from "@/components/messenger/ChatHeader";
import { Composer } from "@/components/messenger/composer";
import { Messages } from "@/components/messenger/messages";
import useConversation from "@/store/useConversation";
import { Error } from "@/components/common/error";
import { useEffect } from "react";
import { toast } from "../ui/toast";
import { getMessagesByConversation } from "@/services/message";
import { Message } from "@/types/message";

export function ChatWindow() {
  const conversation = useConversation((state) => state.conversation);
  const messages = useConversation((state) => state.messages);
  const setMessages = useConversation((state) => state.setMessages);

  const fetchMessages = async (conversationId: number) => {
    const result = await getMessagesByConversation(conversationId);
    if (!result.success) {
      toast.add({
        type: "error",
        description: result.message ?? "Conversation start failed",
      });
      return;
    }
    setMessages(result.data as Message[]);
  };

  useEffect(() => {
    if (conversation?.receiver.id) {
      fetchMessages(conversation.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  if (!conversation || !messages.length) {
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
      <Messages messages={messages} />
      <Composer />
    </div>
  );
}
