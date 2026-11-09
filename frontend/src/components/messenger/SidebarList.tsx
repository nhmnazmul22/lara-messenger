"use client";

import { useEffect, useState } from "react";
import { Layers2Icon, MessageSquareIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConversationsList } from "./ConversationsList";
import { UsersList } from "./UsersList";
import { GroupsList } from "./GroupsList";
import { useSidebar } from "@/contexts/SidebarContext";
import useUser from "@/store/useUser";
import useConversation from "@/store/useConversation";

const iconTransition =
  "absolute transition-opacity transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]";

type SidebarView = "users" | "conversations" | "groups";

export function SidebarLists() {
  const { showUsers, setShowUsers } = useSidebar();
  const [showGroups, setShowGroups] = useState(false);
  const [previousView, setPreviousView] = useState<"users" | "conversations">(
    "users",
  );

  const users = useUser((state) => state.users);
  const conversations = useConversation((state) => state.conversations);
  const conversation = useConversation((state) => state.conversation);
  const setConversation = useConversation((state) => state.setConversation);

  useEffect(() => {
    if (!conversation && conversations.length > 0) {
      setConversation(conversations[0]);
    }
  }, [conversation, conversations, setConversation]);

  const view: SidebarView = showGroups
    ? "groups"
    : showUsers
      ? "users"
      : "conversations";

  const openGroups = () => {
    setPreviousView(showUsers ? "users" : "conversations");
    setShowGroups(true);
  };

  const closeGroups = () => setShowGroups(false);

  const toggleUsersConversations = () => {
    if (showGroups) {
      return;
    }
    setShowUsers((current) => !current);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-3 sm:px-4">
        <div className="flex min-w-0 flex-col">
          <h2 className="truncate font-display text-base font-semibold tracking-tight">
            {view === "groups" ? "Groups" : showUsers ? "People" : "Messages"}
          </h2>
          <p className="truncate text-xs text-muted-foreground">
            {view === "groups"
              ? "Group chats"
              : showUsers
                ? `${users?.length} contacts`
                : `${conversations.length} conversations`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl text-muted-foreground"
            onClick={toggleUsersConversations}
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
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-xl transition-colors",
              showGroups
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted",
            )}
            onClick={showGroups ? closeGroups : openGroups}
            aria-label={
              showGroups
                ? `Back to ${previousView}`
                : showUsers
                  ? "Show groups from people list"
                  : "Show groups from messages list"
            }
          >
            <Layers2Icon
              aria-hidden
              className={cn(
                showGroups ? "text-accent-foreground" : "text-muted-foreground",
              )}
            />
          </Button>
        </div>
      </div>

      <div
        key={view}
        className="flex min-h-0 flex-1 flex-col animate-in fade-in-0 duration-200"
      >
        {view === "users" ? (
          <UsersList />
        ) : view === "conversations" ? (
          <ConversationsList />
        ) : (
          <GroupsList />
        )}
      </div>
    </div>
  );
}
