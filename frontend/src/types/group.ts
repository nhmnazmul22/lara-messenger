import { User } from "./user";

export interface Group {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  owner: User;
}
