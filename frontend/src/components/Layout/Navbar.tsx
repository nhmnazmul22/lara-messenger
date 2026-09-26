"use client";

import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/messenger/user-menu";
import { MenuIcon, XIcon } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";
import { useConversation } from "@/contexts/ConversationContext";
import { usePanel } from "@/contexts/PanelContext";

const Navbar = () => {
  const { conversationsOpen, setConversationsOpen } = useConversation();
  const { setPanel } = usePanel();

  return (
    <header className="relative z-50 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-xl lg:hidden"
          onClick={() => setConversationsOpen((open) => !open)}
          aria-label="Toggle conversation list"
          aria-expanded={conversationsOpen}
        >
          {conversationsOpen ? <XIcon /> : <MenuIcon />}
        </Button>
        <BrandLogo />
      </div>
      <UserMenu onOpenPanel={setPanel} />
    </header>
  );
};

export default Navbar;
