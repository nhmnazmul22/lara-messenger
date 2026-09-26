"use client";

import { toast } from "@/components/ui/toast";
import { logout, myProfile } from "@/services/auth";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  profile: User | null;
  setProfile: Dispatch<SetStateAction<User | null>>;
  isLoggingOut: boolean;

  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  const logoutUser = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message,
        });
        return;
      }

      toast.add({
        type: "success",
        description: result.message,
      });
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    (async () => {
      const user = await myProfile();
      if (user.success && user.data) {
        setProfile(user.data);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
        isLoggingOut,

        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be under the AuthContextProvider");
  }

  return context;
};
