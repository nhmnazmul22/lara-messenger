import { SidebarLists } from "../messenger/SidebarList";
import { ChatWindow } from "../messenger/chat-window";
import { activeChat } from "@/lib/mock-data";

const MainContent = () => {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[340px_1fr]">
      <div className="hidden min-h-0 border-r border-border lg:block">
        <SidebarLists />
      </div>
      <ChatWindow chat={activeChat} />
    </div>
  );
};

export default MainContent;
