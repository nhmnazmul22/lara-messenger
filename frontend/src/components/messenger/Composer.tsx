"use client";

import {
  Loader2,
  PaperclipIcon,
  SendIcon,
  SmileIcon,
  XIcon,
} from "lucide-react";
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
    fileInputRef,
    handleAttachmentSelect,
    handleAttachmentRemove,
    showPicker,
    setShowPicker,
  } = useComposer();

  return (
    <div className="shrink-0 border-t p-3 sm:p-4">
      {sendMessageFromData.attachments?.length ? (
        <div
          className="mb-3 flex flex-wrap gap-2"
          role="list"
          aria-label="Attached files"
        >
          {sendMessageFromData.attachments.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${file.size}-${index}`}
              className="flex max-w-full items-center gap-2 rounded-xl border bg-muted/40 py-1 pl-2.5 pr-1"
              role="listitem"
            >
              <PaperclipIcon
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="max-w-48 truncate text-sm" title={file.name}>
                {file.name}
              </span>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                className="rounded-full text-muted-foreground"
                aria-label={`Remove ${file.name}`}
                onClick={() => handleAttachmentRemove(index)}
              >
                <XIcon />
              </InputGroupButton>
            </div>
          ))}
        </div>
      ) : null}
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
            onClick={() => fileInputRef.current?.click()}
          >
            <PaperclipIcon />
          </InputGroupButton>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            aria-label="Choose files to attach"
            onChange={(event) => {
              handleAttachmentSelect(event.currentTarget.files);
              event.currentTarget.value = "";
            }}
          />
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
