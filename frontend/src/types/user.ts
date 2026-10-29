export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  is_admin: boolean;
  blocked_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface MinifiedUser {
  id: number;
  name: string;
  avatar: string;
}


export interface UserStore {
  loading: boolean;
  error: string | null;
  users: User[] | [];

  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
