import { ChatHeader } from "@/components/messenger/chat-header";
import { Composer } from "@/components/messenger/composer";
import { Messages } from "@/components/messenger/messages";
import type { activeChat } from "@/lib/mock-data";

export function ChatWindow({ chat }: { chat: typeof activeChat }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col">
      <ChatHeader recipient={chat.recipient} />
      <Messages
        messages={chat.messages}
        senderName={chat.recipient.name}
        senderInitials={chat.recipient.initials}
      />
      <Composer />
    </div>
  );
}