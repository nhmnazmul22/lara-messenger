import { UserStore } from "@/types/user";
import { create } from "zustand";

const useUser = create<UserStore>((set) => ({
  loading: false,
  error: null,
  users: [],

  setUsers: (users) => {
    set({ users });
  },
  setLoading: (loading) => {
    set({
      loading,
    });
  },
  setError: (error) => {
    set({
      error,
    });
  },
}));

export default useUser;
