import { ConversationsList } from "../messenger/conversations";
import { ChatWindow } from "../messenger/chat-window";
import { activeChat, conversations } from "@/lib/mock-data";

const MobileView = () => {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[340px_1fr]">
      <div className="hidden min-h-0 border-r border-border lg:block">
        <ConversationsList
          conversations={conversations}
          activeId={activeChat.id}
        />
      </div>
      <ChatWindow chat={activeChat} />
    </div>
  );
};

export default MobileView;
