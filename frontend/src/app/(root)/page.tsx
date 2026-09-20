import { BrandLogo } from "@/components/brand-logo";
import { ChatWindow } from "@/components/messenger/chat-window";
import { ConversationsList } from "@/components/messenger/conversations";
import { UserMenu } from "@/components/messenger/user-menu";
import { activeChat, conversations } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-muted/50">
      <main className="mx-auto w-full max-w-[1600px] min-w-0 min-h-0 flex-1 px-3 py-3 sm:px-5 sm:py-4">
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-background shadow-lg shadow-black/5 ring-1 ring-border/70">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
            <BrandLogo />
            <UserMenu />
          </header>
          <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[340px_1fr]">
            <div className="hidden min-h-0 border-r border-border lg:block">
              <ConversationsList
                conversations={conversations}
                activeId={activeChat.id}
              />
            </div>
            <ChatWindow chat={activeChat} />
          </div>
        </div>
      </main>
    </div>
  );
}