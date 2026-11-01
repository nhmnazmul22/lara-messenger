"use client";

import { Loader2, PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import useConversation from "@/store/useConversation";
import { sendMessage } from "@/services/message";
import { toast } from "../ui/toast";

export function Composer() {
  const sendingMessage = useConversation((state) => state.sendingMessage);
  const setSendingMessage = useConversation((state) => state.setSendingMessage);
  const sendMessageFromData = useConversation(
    (state) => state.sendMessageFormData,
  );
  const setMessagePayload = useConversation((state) => state.setMessagePayload);
  const resetMessagePayload = useConversation(
    (state) => state.resetMessagePayload,
  );
  const conversation = useConversation((state) => state.conversation);

  const handleMessageSend = async () => {
    try {
      setSendingMessage(true);
      const payload = new FormData();

      payload.append("senderId", String(conversation?.sender.id));
      payload.append("receiverId", String(conversation?.receiver.id));
      payload.append("conversationId", String(conversation?.id));
      payload.append("message", sendMessageFromData.message);

      if (sendMessageFromData.attachments?.length) {
        sendMessageFromData.attachments?.forEach((file) => {
          payload.append("attachments[]", file);
        });
      }

      const result = await sendMessage(payload);

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message,
        });
        return;
      }

      console.log(result);
      resetMessagePayload();
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="shrink-0 border-t p-3 sm:p-4">
      <InputGroup className="min-h-12">
        <InputGroupTextarea
          rows={1}
          placeholder="Type a message"
          className="min-h-10 self-center"
          aria-label="Type a message"
          value={sendMessageFromData.message}
          onChange={(e) => setMessagePayload("message", e.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            size="icon-sm"
            className="rounded-2xl text-muted-foreground"
            aria-label="Add an emoji"
          >
            <SmileIcon />
          </InputGroupButton>
          <InputGroupButton
            variant="ghost"
            size="icon-sm"
            className="rounded-2xl text-muted-foreground"
            aria-label="Attach a file"
          >
            <PaperclipIcon />
          </InputGroupButton>
          <InputGroupButton
            variant="default"
            size="icon-sm"
            className="rounded-2xl"
            aria-label="Send message"
            onClick={handleMessageSend}
          >
            {sendingMessage ? (
              <Loader2 className="animate-spin" />
            ) : (
              <SendIcon />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
