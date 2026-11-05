import { MinifiedUser } from "./user";

export interface Message {
  id: number;
  message: string | null;
  sender: MinifiedUser;
  receiver: MinifiedUser;
  group: number | null;
  conversation_id: number;
  attachments?: MessageAttachment[];
  created_at: string;
  updated_at: string;
}

export interface MessageAttachment {
  id: number;
  message_id: number;
  name: string;
  path: string;
  mime: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface SendMessageFromDataType {
  message: string;
  attachments?: File[];
}

export const initialMessage: SendMessageFromDataType = {
  message: "",
};
