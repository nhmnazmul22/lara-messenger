import { MoreVerticalIcon, SearchIcon, VideoIcon } from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function ChatHeader({
  recipient,
}: {
  recipient: { name: string; initials: string; status: string };
}) {
  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-9">
          <AvatarFallback>{recipient.initials}</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{recipient.name}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {recipient.status}
          </p>
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