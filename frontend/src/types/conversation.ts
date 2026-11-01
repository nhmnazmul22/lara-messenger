import { User } from "@/types/user";
import { Message, SendMessageFromDataType } from "./message";

export type conversation = {
  id: number;
  sender: User;
  receiver: User;
  last_message: Message | null;
  created_at?: Date;
  updated_at?: Date;
};

export interface ConversationStore {
  startingConversation: number | null;
  loading: boolean;
  loadingMessages: boolean;
  error: string | null;
  sendingMessage: boolean;

  conversation: conversation | null;
  messages: Message[] | [];
  conversations: conversation[] | [];
  sendMessageFormData: SendMessageFromDataType;

  setStartingConversation: (conversationId: number | null) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMessages: (loadingMessages: boolean) => void;
  setError: (error: string | null) => void;
  setSendingMessage: (sendingMessage: boolean) => void;

  setConversation: (conversation: conversation) => void;
  setMessages: (messages: Message[]) => void;
  setConversations: (conversations: conversation[]) => void;
  setMessagePayload: (
    key: keyof SendMessageFromDataType,
    value: string,
  ) => void;
  resetMessagePayload: () => void;
}
