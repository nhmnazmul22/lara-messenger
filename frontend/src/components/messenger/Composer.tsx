"use client";

import { Loader2, PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import useComposer from "@/hooks/useComposer";

export function Composer() {
  const {
    sendingMessage,
    sendMessageFromData,
    setMessagePayload,
    handleMessageSend,
    showPicker,
    setShowPicker,
  } = useComposer();

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
        <InputGroupAddon align="inline-end" className="relative">
          <Popover open={showPicker} onOpenChange={setShowPicker}>
            <PopoverTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-2xl text-muted-foreground"
                  aria-label="Add an emoji"
                />
              }
            >
              <SmileIcon />
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-auto p-0">
              <EmojiPicker
                onEmojiClick={(emojiData) =>
                  setMessagePayload(
                    "message",
                    `${sendMessageFromData.message} ${emojiData.emoji}`,
                  )
                }
              />
            </PopoverContent>
          </Popover>
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
