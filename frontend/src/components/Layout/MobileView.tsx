import { SidebarLists } from "../messenger/sidebar-lists";
import { ChatWindow } from "../messenger/chat-window";
import { activeChat, conversations, users } from "@/lib/mock-data";

const MobileView = () => {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[340px_1fr]">
      <div className="hidden min-h-0 border-r border-border lg:block">
        <SidebarLists
          conversations={conversations}
          users={users}
          activeId={activeChat.id}
        />
      </div>
      <ChatWindow chat={activeChat} />
    </div>
  );
};

export default MobileView;
