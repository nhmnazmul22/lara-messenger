import { AuthContextProvider } from "@/contexts/AuthContext";
import { ConversationContextProvider } from "@/contexts/ConversationContext";
import { PanelContextProvider } from "@/contexts/PanelContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <ConversationContextProvider>
        <PanelContextProvider>
          <SidebarContextProvider>{children}</SidebarContextProvider>
        </PanelContextProvider>
      </ConversationContextProvider>
    </AuthContextProvider>
  );
}
