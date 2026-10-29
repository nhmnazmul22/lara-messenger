import { User } from "@/types/user";
import { Message } from "./message";

export type conversation = {
  id: number;
  sender: User;
  receiver: User;
  last_message: Message | null;
  created_at?: Date;
  updated_at?: Date;
};

export type ConversationWithMessages = {
  id: number;
  sender: User;
  receiver: User;
  last_message: Message | null;
  messages: Message[] | [];
  created_at?: Date;
  updated_at?: Date;
};

export interface ConversationStore {
  startingConversation: number | null;
  loading: boolean;
  error: string | null;
  conversation: conversation | null;
  conversationWithMessages: ConversationWithMessages | null;
  conversations: conversation[] | [];

  setStartingConversation: (conversationId: number | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConversation: (conversation: conversation) => void;
  setConversationWithMessages: (conversation: ConversationWithMessages) => void;
  setConversations: (conversations: conversation[]) => void;
}
