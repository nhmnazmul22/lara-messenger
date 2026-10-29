import { ConversationStore } from "@/types/conversation";
import { create } from "zustand";

const useConversation = create<ConversationStore>((set) => ({
  startingConversation: null,
  loading: false,
  error: null,
  conversation: null,
  conversationWithMessages: null,
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
  setConversationWithMessages: (conversationWithMessages) => {
    set({
      conversationWithMessages,
    });
  },
  setConversations: (conversations) => {
    set({
      conversations,
    });
  },
}));

export default useConversation;
