export interface User {
  name: string;
  email: string;
  avatar: string;
  is_admin: boolean;
  blocked_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
