"use client";

import { FileTextIcon, ImageIcon } from "lucide-react";

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Marker, MarkerContent } from "@/components/ui/marker";
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
import type { ChatMessage } from "@/lib/mock-data";

function MessageBubble({
  message,
  senderInitials,
}: {
  message: ChatMessage;
  senderInitials: string;
}) {
  const isMe = message.sender === "me";

  return (
    <Message align={isMe ? "end" : "start"}>
      {!isMe && (
        <MessageAvatar>
          <Avatar className="size-8">
            <AvatarFallback>{senderInitials}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
      )}
      <MessageContent>
        {message.kind === "attachment" ? (
          <Attachment>
            <AttachmentMedia variant="icon">
              {message.fileIcon === "image" ? (
                <ImageIcon />
              ) : (
                <FileTextIcon />
              )}
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{message.fileName}</AttachmentTitle>
              <AttachmentDescription>{message.fileMeta}</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ) : (
          <Bubble
            variant={isMe ? "default" : "secondary"}
            align={isMe ? "end" : "start"}
          >
            <BubbleContent>{message.text}</BubbleContent>
          </Bubble>
        )}
        <MessageFooter>{message.time}</MessageFooter>
      </MessageContent>
    </Message>
  );
}

export function Messages({
  messages,
  senderName,
  senderInitials,
}: {
  messages: ChatMessage[];
  senderName: string;
  senderInitials: string;
}) {
  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller className="flex-1">
        <MessageScrollerViewport id="message-scroller-viewport">
          <MessageScrollerContent className="gap-6 px-3 py-4 sm:px-5">
            <Marker variant="separator" className="px-2">
              <MarkerContent>Today</MarkerContent>
            </Marker>

            {messages.map((message) => (
              <MessageScrollerItem key={message.id} messageId={message.id}>
                <MessageBubble
                  message={message}
                  senderInitials={senderInitials}
                />
              </MessageScrollerItem>
            ))}

            <MessageScrollerItem messageId="typing">
              <Message align="start">
                <MessageAvatar>
                  <Avatar className="size-8">
                    <AvatarFallback>{senderInitials}</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <Bubble variant="muted" align="start">
                    <BubbleContent>
                      <span className="shimmer">{senderName} is typing</span>
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}