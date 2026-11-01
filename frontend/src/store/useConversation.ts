import { ConversationStore } from "@/types/conversation";
import { initialMessage } from "@/types/message";
import { create } from "zustand";

const useConversation = create<ConversationStore>((set) => ({
  startingConversation: null,
  loading: true,
  loadingMessages: true,
  error: null,
  sendingMessage: false,

  conversation: null,
  messages: [],
  conversations: [],
  sendMessageFormData: initialMessage,

  setLoading: (loading) => {
    set({
      loading,
    });
  },
  setLoadingMessages: (loadingMessages) => {
    set({
      loadingMessages,
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
  setSendingMessage: (sendingMessage) => {
    set({
      sendingMessage,
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

  setMessagePayload: (key, value) => {
    set((prev) => ({
      sendMessageFormData: {
        ...prev.sendMessageFormData,
        [key]: value,
      },
    }));
  },

  resetMessagePayload: () => {
    set({
      sendMessageFormData: initialMessage,
    });
  },
}));

export default useConversation;
