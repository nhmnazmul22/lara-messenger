import { User } from "@/types/user";

export type conversation = {
  id: number;
  sender: User;
  receiver: User;
  last_message_id: number | null;
  created_at?: Date;
  updated_at?: Date;
};

export type ConversationWithMessages = {
  id: number;
  sender: User;
  receiver: User;
  last_message_id: number | null;
  created_at?: Date;
  updated_at?: Date;
};

export interface ConversationStore {
  startingConversation: number | null;
  loading: boolean;
  error: string | null;
  conversation: conversation | null;
  conversations: conversation[] | [];

  setStartingConversation: (conversationId: number | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConversation: (conversation: conversation) => void;
  setConversations: (conversations: conversation[]) => void;
}
