import { ConversationStore } from "@/types/conversation";
import { create } from "zustand";

const useConversation = create<ConversationStore>((set) => ({
  startingConversation: null,
  loading: false,
  error: null,
  conversation: null,
  messages: [],
  conversations: [],

  setLoading: (loading) => {
    set({
      loading,
    });
  },
  setStartingConversation: (conversationId) => {
    set({
      startingConversation: conversationId,
    });
  },
  setError: (error) => {
    set({
      error,
    });
  },
  setConversation: (conversation) => {
    set({
      conversation,
    });
  },
  setMessages: (messages) => {
    set({
      messages,
    });
  },
  setConversations: (conversations) => {
    set({
      conversations,
    });
  },
}));

export default useConversation;
