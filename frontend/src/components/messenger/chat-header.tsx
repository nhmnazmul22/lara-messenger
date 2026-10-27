"use client";

import { MoreVerticalIcon, SearchIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useConversation from "@/store/useConversation";
import UserAvatar from "../common/UserAvatar";

export function ChatHeader() {
  const conversation = useConversation((state) => state.conversation);

  if (!conversation) {
    return null;
  }

  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar avatar={conversation.receiver.avatar} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {conversation.receiver.name}
          </p>
          {/* <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {recipient.status}
          </p> */}
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-muted-foreground"
          aria-label="Search messages"
        >
          <SearchIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-muted-foreground"
          aria-label="Start a video call"
        >
          <VideoIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-muted-foreground"
          aria-label="More options"
        >
          <MoreVerticalIcon />
        </Button>
      </div>
    </div>
  );
}
