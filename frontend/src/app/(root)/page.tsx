import { BrandLogo } from "@/components/brand-logo";
import { ChatWindow } from "@/components/messenger/chat-window";
import { ConversationsList } from "@/components/messenger/conversations";
import { UserMenu } from "@/components/messenger/user-menu";
import { activeChat, conversations } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-muted/50">
      <header className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
        <BrandLogo />
        <UserMenu />
      </header>

      <main className="mx-auto w-full max-w-[1600px] min-w-0 min-h-0 flex-1 px-4 pb-4 sm:px-6 sm:pb-5">
        <div className="grid h-full min-h-0 grid-cols-1 overflow-hidden rounded-3xl bg-background shadow-lg shadow-black/5 ring-1 ring-border/70 lg:grid-cols-[340px_1fr]">
          <div className="hidden min-h-0 border-r border-border lg:block">
            <ConversationsList
              conversations={conversations}
              activeId={activeChat.id}
            />
          </div>
          <ChatWindow chat={activeChat} />
        </div>
      </main>
    </div>
  );
}