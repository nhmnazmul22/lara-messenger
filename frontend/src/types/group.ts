import { User } from "./user";

export interface Group {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  owner: User;
}

export interface GroupStore {
  groupsLoading: boolean;
  groups: Group[];
  error: string | null;
  activeGroup: Group | null;

  setGroups: (groups: Group[]) => void;
  setGroupLoading: (groupsLoading: boolean) => void;
  setGroupError: (error: string | null) => void;
  setActiveGroup: (group: Group | null) => void;
  fetchGroups: () => Promise<void>;
}
