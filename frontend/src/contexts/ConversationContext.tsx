"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ConversationContextType {
  conversationsOpen: boolean;
  setConversationsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ConversationContext =
  createContext<ConversationContextType | null>(null);

export const ConversationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [conversationsOpen, setConversationsOpen] = useState(false);

  return (
    <ConversationContext.Provider
      value={{
        conversationsOpen,
        setConversationsOpen,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be under the ConversationContextProvider",
    );
  }

  return context;
};
