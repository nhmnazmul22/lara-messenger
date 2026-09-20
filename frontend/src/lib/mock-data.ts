export type Conversation = {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread?: number;
  online?: boolean;
};

export type TextMessage = {
  kind: "text";
  id: string;
  sender: "me" | "them";
  time: string;
  text: string;
};

export type AttachmentMessage = {
  kind: "attachment";
  id: string;
  sender: "me" | "them";
  time: string;
  fileName: string;
  fileMeta: string;
  fileIcon: "file" | "image";
};

export type ChatMessage = TextMessage | AttachmentMessage;

export const conversations: Conversation[] = [
  {
    id: "maya",
    name: "Maya Reyes",
    initials: "MR",
    preview: "Perfect, see you at eight.",
    time: "12:04 PM",
    online: true,
  },
  {
    id: "trends",
    name: "Design Trends",
    initials: "DT",
    preview: "That palette is 🔥",
    time: "11:58 AM",
    unread: 2,
  },
  {
    id: "trip",
    name: "Weekend Trip",
    initials: "WT",
    preview: "I say we leave by seven.",
    time: "11:32 AM",
  },
  {
    id: "mom",
    name: "Mom",
    initials: "M",
    preview: "Don't forget aunt's birthday 🎂",
    time: "10:15 AM",
    unread: 1,
  },
  {
    id: "alex",
    name: "Alex Chen",
    initials: "AC",
    preview: "Meeting moved to 3.",
    time: "9:47 AM",
  },
  {
    id: "weekly",
    name: "JavaScript Weekly",
    initials: "JW",
    preview: "Next.js 16 is finally here.",
    time: "Yesterday",
  },
  {
    id: "squad",
    name: "Laravel Squad",
    initials: "LS",
    preview: "Reverb migration is live.",
    time: "Yesterday",
    unread: 3,
  },
  {
    id: "bookclub",
    name: "Book Club",
    initials: "BC",
    preview: "I finished the last chapter!",
    time: "Tuesday",
  },
];

export const activeChat = {
  id: "maya",
  recipient: {
    name: "Maya Reyes",
    initials: "MR",
    status: "online",
    time: "last seen just now",
  },
  messages: [
    {
      kind: "text",
      id: "m1",
      sender: "them",
      time: "11:58 AM",
      text: "Do you have the updated hero for the auth pages?",
    },
    {
      kind: "text",
      id: "m2",
      sender: "me",
      time: "11:59 AM",
      text: "Just finished. Sending the figma over.",
    },
    {
      kind: "attachment",
      id: "m3",
      sender: "me",
      time: "11:59 AM",
      fileName: "auth-pages-v2.fig",
      fileMeta: "Figma · 24 MB",
      fileIcon: "file",
    },
    {
      kind: "text",
      id: "m4",
      sender: "them",
      time: "12:01 PM",
      text: "Love it. Did you keep the emerald green?",
    },
    {
      kind: "text",
      id: "m5",
      sender: "me",
      time: "12:02 PM",
      text: "Yep — semantic tokens, so dark mode is handled automatically.",
    },
    {
      kind: "text",
      id: "m6",
      sender: "me",
      time: "12:03 PM",
      text: "Absolutely. I'll bring the good coffee.",
    },
    {
      kind: "text",
      id: "m7",
      sender: "them",
      time: "12:04 PM",
      text: "Perfect, see you at eight.",
    },
  ] satisfies ChatMessage[],
};