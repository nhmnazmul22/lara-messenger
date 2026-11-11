import { MoreVerticalIcon, SearchIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReusableImage from "../common/ReusableImage";
import { conversation } from "@/types/conversation";
import { Group } from "@/types/group";

export function ChatHeader({
  conversation,
  group,
}: {
  conversation: conversation | null;
  group: Group | null;
}) {
  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        {group ? (
          <>
            <ReusableImage
              avatar={group.logo ?? ""}
              alt={group.name}
              fallback={group.name[0]}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {group.name}
              </p>
            </div>
          </>
        ) : (
          <>
            <ReusableImage
              avatar={conversation?.receiver.avatar ?? ""}
              alt={conversation?.receiver.name ?? "User"}
              fallback={conversation?.receiver.name?.[0] ?? "U"}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {conversation?.receiver.name}
              </p>
            </div>
          </>
        )}
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
