"use client";

import { useConversation } from "@/contexts/ConversationContext";
import { cn } from "@/lib/utils";

const BlurEffect = () => {
  const { conversationsOpen, setConversationsOpen } = useConversation();

  return (
    <div
      className={cn(
        "absolute inset-0 z-30 bg-background/60 transition-[opacity,backdrop-filter] duration-500 ease-out lg:hidden",
        conversationsOpen
          ? "pointer-events-auto opacity-100 backdrop-blur-sm"
          : "pointer-events-none opacity-0 backdrop-blur-0",
      )}
      onClick={() => setConversationsOpen(false)}
      aria-hidden="true"
    />
  );
};

export default BlurEffect;
