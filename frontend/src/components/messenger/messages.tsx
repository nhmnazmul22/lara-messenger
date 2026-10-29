"use client";

// import { FileTextIcon, ImageIcon } from "lucide-react";

// import {
//   Attachment,
//   AttachmentContent,
//   AttachmentDescription,
//   AttachmentMedia,
//   AttachmentTitle,
// } from "@/components/ui/attachment";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
// import { Marker, MarkerContent } from "@/components/ui/marker";
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
import UserAvatar from "../common/UserAvatar";

function MessageBubble({ message }: { message: MessageType }) {
  const { profile } = useAuth();

  const isMe = message.sender.id === profile?.id;

  return (
    <Message align={isMe ? "end" : "start"}>
      {!isMe && (
        <MessageAvatar>
          <UserAvatar
            avatar={message.sender.avatar}
            alt={message.sender.name}
            fallback={message.sender.name[0]}
          />
        </MessageAvatar>
      )}
      <MessageContent>
        {/* {message.kind === "attachment" ? (
          <Attachment>
            <AttachmentMedia variant="icon">
              {message.fileIcon === "image" ? <ImageIcon /> : <FileTextIcon />}
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
            <BubbleContent>{message.message}</BubbleContent>
          </Bubble>
        )} */}
        <Bubble
          variant={isMe ? "default" : "secondary"}
          align={isMe ? "end" : "start"}
        >
          <BubbleContent>{message.message}</BubbleContent>
        </Bubble>
        <MessageFooter>{formatDateTime(message.created_at)}</MessageFooter>
      </MessageContent>
    </Message>
  );
}

export function Messages({ messages }: { messages: MessageType[] }) {
  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller className="flex-1">
        <MessageScrollerViewport
          id="message-scroller-viewport"
          className="scrollbar-thumb-border scrollbar-track-transparent"
        >
          <MessageScrollerContent className="gap-6 px-3 py-4 sm:px-5">
            {/* <Marker variant="separator" className="px-2">
              <MarkerContent>Today</MarkerContent>
            </Marker> */}

            {messages?.map((message) => (
              <MessageScrollerItem
                key={message.id}
                messageId={message.id.toString()}
              >
                <MessageBubble message={message} />
              </MessageScrollerItem>
            ))}

            {/* <MessageScrollerItem messageId="typing">
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
            </MessageScrollerItem> */}
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
