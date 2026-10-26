import { ConversationStore } from "@/types/conversation";
import { create } from "zustand";

const useConversation = create<ConversationStore>((set) => ({
  loading: null,
  error: null,
  conversation: null,

  setConversation: (conversation) => {
    set({
      conversation: conversation,
    });
  },
  setLoading: (loading) => {
    set({
      loading,
    });
  },
  setError: (message) => {
    set({
      error: message,
    });
  },
}));

export default useConversation;
