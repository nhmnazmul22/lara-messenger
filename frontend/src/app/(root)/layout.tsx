import { AuthContextProvider } from "@/contexts/AuthContext";
import { ConversationContextProvider } from "@/contexts/ConversationContext";
import { PanelContextProvider } from "@/contexts/PanelContext";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <ConversationContextProvider>
        <PanelContextProvider>{children}</PanelContextProvider>
      </ConversationContextProvider>
    </AuthContextProvider>
  );
}
