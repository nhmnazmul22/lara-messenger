"use client";

import { MessageSquareIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConversationsList } from "./conversations";
import { UsersList } from "./users";
import type { Conversation } from "@/lib/mock-data";
import { useSidebar } from "@/contexts/SidebarContext";
import useUser from "@/store/useUser";

const iconTransition =
  "absolute transition-opacity transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]";

export function SidebarLists({
  conversations,
  activeId,
}: {
  conversations: Conversation[];
  activeId: string;
}) {
  const { showUsers, setShowUsers } = useSidebar();
  const users = useUser((state) => state.users);


  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-3 sm:px-4">
        <div className="flex min-w-0 flex-col">
          <h2 className="truncate font-display text-base font-semibold tracking-tight">
            {showUsers ? "People" : "Messages"}
          </h2>
          <p className="truncate text-xs text-muted-foreground">
            {showUsers
              ? `${users?.length} contacts`
              : `${conversations.length} conversations`}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-xl text-muted-foreground"
          onClick={() => setShowUsers((current) => !current)}
          aria-label={showUsers ? "Show conversations" : "Show users"}
        >
          <span className="relative flex size-4 items-center justify-center">
            <MessageSquareIcon
              aria-hidden
              className={cn(
                iconTransition,
                showUsers ? "scale-85 opacity-0" : "scale-100 opacity-100",
              )}
            />
            <UsersIcon
              aria-hidden
              className={cn(
                iconTransition,
                showUsers ? "scale-100 opacity-100" : "scale-85 opacity-0",
              )}
            />
          </span>
        </Button>
      </div>

      <div
        key={showUsers ? "users" : "conversations"}
        className="flex min-h-0 flex-1 flex-col animate-in fade-in-0 duration-200"
      >
        {showUsers ? (
          <UsersList />
        ) : (
          <ConversationsList
            conversations={conversations}
            activeId={activeId}
          />
        )}
      </div>
    </div>
  );
}
