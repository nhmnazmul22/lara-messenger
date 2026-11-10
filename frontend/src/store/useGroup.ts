import { GroupStore } from "@/types/group";
import { create } from "zustand";

const useGroup = create<GroupStore>((set) => ({
  groupsLoading: false,
  groups: [],
  error: null,

  setGroups: (groups) => {
    set({ groups });
  },
  setGroupLoading: (groupsLoading) => {
    set({ groupsLoading });
  },
  setGroupError: (error) => {
    set({ error });
  },
}));

export default useGroup;
