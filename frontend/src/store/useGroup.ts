import { GroupStore } from "@/types/group";
import { create } from "zustand";
import { getAllGroups } from "@/services/gruop";

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
  fetchGroups: async () => {
    set({ groupsLoading: true, error: null });
    try {
      const result = await getAllGroups();
      if (!result.success) {
        set({ error: result.message ?? "Failed to load groups" });
        return;
      }
      set({ groups: result.data ?? [] });
    } catch (err) {
      set({ error: String(err) });
    } finally {
      set({ groupsLoading: false });
    }
  },
}));

export default useGroup;
