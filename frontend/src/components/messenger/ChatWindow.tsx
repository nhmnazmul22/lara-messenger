"use client";

import { ChatHeader } from "@/components/messenger/ChatHeader";
import { Composer } from "@/components/messenger/composer";
import { Messages } from "@/components/messenger/messages";
import type { activeChat } from "@/lib/mock-data";
import useConversation from "@/store/useConversation";
import { Error } from "@/components/common/error";

export function ChatWindow({ chat }: { chat: typeof activeChat }) {
  const conversation = useConversation((state) => state.conversation);

  if (!conversation) {
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
        messages={chat.messages}
        senderName={chat.recipient.name}
        senderInitials={chat.recipient.initials}
      />
      <Composer />
    </div>
  );
}
