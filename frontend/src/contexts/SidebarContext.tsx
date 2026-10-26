"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SidebarContextType {
  showUsers: boolean;
  setShowUsers: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        showUsers,
        setShowUsers,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be under the SidebarContextProvider");
  }

  return context;
};
