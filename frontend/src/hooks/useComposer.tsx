import useConversation from "@/store/useConversation";
import { sendMessage } from "@/services/message";
import { toast } from "@/components/ui/toast";
import { useRef, useState } from "react";

const useComposer = () => {
  const [showPicker, setShowPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleAttachmentSelect = (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    setMessagePayload("attachments", [
      ...(sendMessageFromData.attachments ?? []),
      ...Array.from(files),
    ]);
  };

  const handleAttachmentRemove = (indexToRemove: number) => {
    setMessagePayload(
      "attachments",
      (sendMessageFromData.attachments ?? []).filter(
        (_, index) => index !== indexToRemove,
      ),
    );
  };

  const handleMessageSend = async () => {
    try {
      setSendingMessage(true);
      const payload = new FormData();

      payload.append("senderId", String(conversation?.me.id));
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

  return {
    sendingMessage,
    setMessagePayload,
    sendMessageFromData,
    fileInputRef,
    handleAttachmentSelect,
    handleAttachmentRemove,
    showPicker,
    setShowPicker,

    handleMessageSend,
  };
};

export default useComposer;
