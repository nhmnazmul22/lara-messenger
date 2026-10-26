"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { getImgUrl } from "@/utils/img";
import { Button } from "@/components/ui/button";
import { Loader2, MessageCircle } from "lucide-react";
import { User } from "@/types/user";
import useConversation from "@/store/useConversation";
import { startConversation } from "@/services/conversation";
import { toast } from "../ui/toast";
import { conversation } from "@/types/conversation";

const UserListCard = ({ user }: { user: User }) => {
  const setConversation = useConversation((state) => state.setConversation);
  const loading = useConversation((state) => state.loading);
  const setLoading = useConversation((state) => state.setLoading);

  const handleStartConversation = async () => {
    try {
      setLoading(user.id);
      const result = await startConversation(user.id);
      if (!result.success) {
        toast.add({ type: "error", description: result.message });
        return;
      }
      setConversation(result.data as conversation);
      toast.add({ type: "success", description: "Conversation started" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      key={user.id}
      className="flex justify-between items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-muted/70"
      onClick={handleStartConversation}
    >
      <div className="flex items-center gap-2">
        <Avatar size="lg" className="shrink-0">
          {user.avatar ? (
            <Image
              src={getImgUrl(user.avatar) ?? ""}
              alt={user.name}
              width={400}
              height={400}
            />
          ) : (
            <AvatarFallback className={"bg-emerald-600 text-white"}>
              {user.name[0]}
            </AvatarFallback>
          )}
        </Avatar>
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
        {loading && user.id === loading ? <Loader2 className="animate-spin" /> : <MessageCircle />}
      </Button>
    </div>
  );
};

export default UserListCard;
