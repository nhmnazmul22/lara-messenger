import { MinifiedUser } from "./user";

export interface Message {
  id: number;
  message: string;
  sender: MinifiedUser;
  receiver: MinifiedUser;
  group: number | null;
  conversation_id: number;
  created_at: string;
  updated_at: string;
}
