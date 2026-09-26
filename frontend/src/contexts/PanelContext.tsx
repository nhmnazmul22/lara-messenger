"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PanelName = "profile" | "settings";

interface PanelContextType {
  panel: PanelName | null;
  setPanel: Dispatch<SetStateAction<PanelName | null>>;
}

export const PanelContext = createContext<PanelContextType | null>(null);

export const PanelContextProvider = ({ children }: { children: ReactNode }) => {
  const [panel, setPanel] = useState<PanelName | null>(null);

  return (
    <PanelContext.Provider
      value={{
        panel,
        setPanel,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export const usePanel = (): PanelContextType => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanel must be under the PanelContextProvider");
  }

  return context;
};
