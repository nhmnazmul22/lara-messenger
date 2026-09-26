"use client";

import { useConversation } from "@/contexts/ConversationContext";
import { cn } from "@/lib/utils";
import { ConversationsList } from "../messenger/conversations";
import { activeChat, conversations } from "@/lib/mock-data";

const Sidebar = () => {
  const { conversationsOpen } = useConversation();
  return (
    <aside
      id="conversations-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Conversations"
      className={cn(
        "absolute top-16 bottom-0 left-0 z-40 w-1/2 min-w-64 max-w-full border-r border-border bg-background shadow-2xl shadow-black/10 transition-transform duration-300 ease-out lg:hidden",
        conversationsOpen
          ? "translate-x-0"
          : "pointer-events-none -translate-x-full",
      )}
    >
      <ConversationsList
        conversations={conversations}
        activeId={activeChat.id}
      />
    </aside>
  );
};

export default Sidebar;
