import { StatusCode } from "ts/enums/statusCode";
import { ChatRoom } from "./chatRoom";
import { User } from "./user";

export interface Contact {
  id: string;
  user?: User | null;
  userId: string;
  userReadChatAt: Date;
  contact?: Contact | null;
  contactId: string;
  contactReadChatAt: Date;
  chatRoom?: ChatRoom | null;
  status: StatusCode;
  createdAt: Date;
  updatedAt?: Date | null;
}
