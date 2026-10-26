import { User } from "@/types/user";

export type conversation = {
  id: number;
  sender: User;
  receiver: User;
  last_message_id: number | null;
  created_at?: Date;
  updated_at?: Date;
};

export interface ConversationStore {
  loading: number | null;
  error: string | null;
  conversation: conversation | null;

  setConversation: (conversation: conversation) => void;
  setLoading: (loading: number | null) => void;
  setError: (message: string | null) => void;
}
