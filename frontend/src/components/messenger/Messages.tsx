"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileTextIcon,
  XIcon,
} from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Message as MessageType } from "@/types/message";
import { useAuth } from "@/contexts/AuthContext";
import { formatDateTime } from "@/utils/date";
import ReusableImage from "../common/ReusableImage";
import useConversation from "@/store/useConversation";
import { MessagesSkeleton } from "@/components/skeleton/MessagesSkeleton";
import { Error } from "../common/error";
import { formatFileSize, getImgUrl } from "@/utils/file";

function MessageBubble({ message }: { message: MessageType }) {
  const { profile } = useAuth();
  const [selectedAttachmentIndex, setSelectedAttachmentIndex] = useState<
    number | null
  >(null);
  const attachments = message.attachments ?? [];
  const selectedAttachment =
    selectedAttachmentIndex === null
      ? null
      : attachments[selectedAttachmentIndex];
  const isMe = message.sender.id === profile?.id;

  useEffect(() => {
    if (selectedAttachmentIndex === null || attachments.length < 2) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setSelectedAttachmentIndex((index) =>
          index === null
            ? null
            : (index - 1 + attachments.length) % attachments.length,
        );
      } else if (event.key === "ArrowRight") {
        setSelectedAttachmentIndex((index) =>
          index === null ? null : (index + 1) % attachments.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [attachments.length, selectedAttachmentIndex]);

  return (
    <Message align={isMe ? "end" : "start"}>
      {!isMe && (
        <MessageAvatar>
          <ReusableImage
            avatar={message.sender.avatar}
            alt={message.sender.name}
            fallback={message.sender.name[0]}
          />
        </MessageAvatar>
      )}
      <MessageContent>
        {attachments.length ? (
          <div
            className={`flex max-w-full flex-wrap gap-2 ${isMe ? "self-end" : "self-start"}`}
            aria-label="Message attachments"
          >
            {attachments.map((attachment, index) => {
              const isImage = attachment.mime.startsWith("image/");

              return (
                <button
                  key={attachment.id}
                  type="button"
                  onClick={() => setSelectedAttachmentIndex(index)}
                  className="group block max-w-36 overflow-hidden rounded-xl border bg-background text-left outline-none transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/30"
                  aria-label={`Preview ${attachment.name}`}
                >
                  {isImage ? (
                    <Image
                      src={getImgUrl(attachment.path)}
                      alt={attachment.name}
                      width={144}
                      height={96}
                      unoptimized
                      className="h-24 w-36 object-cover"
                    />
                  ) : (
                    <span className="flex h-24 w-36 flex-col items-center justify-center gap-2 p-2 text-muted-foreground">
                      <FileTextIcon className="size-7" aria-hidden="true" />
                      <span className="w-full truncate text-center text-xs">
                        {attachment.name}
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : null}
        {message.message?.trim() ? (
          <Bubble
            variant={isMe ? "default" : "secondary"}
            align={isMe ? "end" : "start"}
          >
            <BubbleContent>{message.message}</BubbleContent>
          </Bubble>
        ) : null}
        <MessageFooter>{formatDateTime(message.created_at)}</MessageFooter>
      </MessageContent>
      <Dialog.Root
        open={selectedAttachment !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAttachmentIndex(null);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/75 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <Dialog.Popup className="flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl outline-none">
              {selectedAttachment ? (
                <>
                  <header className="flex min-w-0 items-center justify-between gap-3 border-b px-4 py-3">
                    <div className="min-w-0">
                      <Dialog.Title className="truncate text-sm font-medium">
                        {selectedAttachment.name}
                      </Dialog.Title>
                      <Dialog.Description className="text-xs text-muted-foreground">
                        {formatFileSize(selectedAttachment.size)} ·{" "}
                        {(selectedAttachmentIndex ?? 0) + 1} of{" "}
                        {attachments.length}
                      </Dialog.Description>
                    </div>
                    <Dialog.Close
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Close preview"
                        />
                      }
                    >
                      <XIcon />
                    </Dialog.Close>
                  </header>
                  <div className="relative flex min-h-56 flex-1 items-center justify-center overflow-auto bg-muted/30 p-4">
                    {selectedAttachment.mime.startsWith("image/") ? (
                      <Image
                        src={getImgUrl(selectedAttachment.path)}
                        alt={selectedAttachment.name}
                        width={1600}
                        height={1200}
                        unoptimized
                        className="max-h-[72dvh] w-auto max-w-full object-contain"
                      />
                    ) : (
                      <div className="flex max-w-md flex-col items-center gap-4 px-6 py-10 text-center">
                        <FileTextIcon
                          className="size-14 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="break-all font-medium">
                            {selectedAttachment.name}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {formatFileSize(selectedAttachment.size)}
                          </p>
                        </div>
                        <Button
                          render={
                            <a
                              href={getImgUrl(selectedAttachment.path)}
                              target="_blank"
                              rel="noreferrer"
                            />
                          }
                        >
                          <DownloadIcon />
                          Open file
                        </Button>
                      </div>
                    )}
                    {attachments.length > 1 ? (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-sm"
                          aria-label="Previous attachment"
                          onClick={() =>
                            setSelectedAttachmentIndex(
                              (selectedAttachmentIndex! -
                                1 +
                                attachments.length) %
                                attachments.length,
                            )
                          }
                        >
                          <ChevronLeftIcon />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-sm"
                          aria-label="Next attachment"
                          onClick={() =>
                            setSelectedAttachmentIndex(
                              (selectedAttachmentIndex! + 1) %
                                attachments.length,
                            )
                          }
                        >
                          <ChevronRightIcon />
                        </Button>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </Message>
  );
}

export function Messages() {
  const messages = useConversation((state) => state.messages);
  const loadingMessages = useConversation((state) => state.loadingMessages);

  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller className="flex-1">
        <MessageScrollerViewport
          id="message-scroller-viewport"
          className="scrollbar-thumb-border scrollbar-track-transparent"
        >
          <MessageScrollerContent className="gap-6 px-3 py-4 sm:px-5">
            {loadingMessages ? (
              <MessagesSkeleton />
            ) : !loadingMessages && !messages.length ? (
              <Error
                title="Conversation not started"
                description="Send a message to start the conversations"
              />
            ) : (
              messages?.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id.toString()}
                >
                  <MessageBubble message={message} />
                </MessageScrollerItem>
              ))
            )}
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
