import { ChatRoom } from "./chatRoom";
import { User } from "./user";

export interface Message {
  id: String;
  body: string;
  user?: User | null;
  userId: string;
  chatRoom?: ChatRoom | null;
  chatId: string;
  createdAt: Date;
}