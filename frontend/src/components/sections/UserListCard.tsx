"use client";

import { Button } from "@/components/ui/button";
import { Loader2, MessageCircle } from "lucide-react";
import { User } from "@/types/user";
import useConversation from "@/store/useConversation";
import { startConversation } from "@/services/conversation";
import { toast } from "../ui/toast";
import { conversation } from "@/types/conversation";
import { useSidebar } from "@/contexts/SidebarContext";
import UserAvatar from "../common/UserAvatar";

const UserListCard = ({ user }: { user: User }) => {
  const setConversation = useConversation((state) => state.setConversation);
  const startingConversation = useConversation(
    (state) => state.startingConversation,
  );
  const setStartingConversation = useConversation(
    (state) => state.setStartingConversation,
  );
  const { setShowUsers } = useSidebar();

  const handleStartConversation = async () => {
    try {
      setStartingConversation(user.id);
      const result = await startConversation(user.id);
      if (!result.success) {
        toast.add({ type: "error", description: result.message });
        return;
      }
      setConversation(result.data as conversation);
      setShowUsers(false);
      toast.add({ type: "success", description: "Conversation started" });
    } finally {
      setStartingConversation(null);
    }
  };

  return (
    <div
      key={user.id}
      className="flex justify-between items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-muted/70"
      onClick={handleStartConversation}
    >
      <div className="flex items-center gap-2">
        <UserAvatar
          avatar={user.avatar}
          alt={user.name}
          fallback={user.name[0]}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {user.email}
          </p>
        </div>
      </div>
      <Button
        size={"icon"}
        className={"cursor-pointer"}
        title="Start conversation"
      >
        {startingConversation && user.id === startingConversation ? (
          <Loader2 className="animate-spin" />
        ) : (
          <MessageCircle />
        )}
      </Button>
    </div>
  );
};

export default UserListCard;
