import { Contact } from "./contact";
import { Message } from "./message";
import { Project } from "./project";

export interface ChatRoom {
  id: string;
  project?: Project | null;
  projectId?: string;
  contact?: Contact | null;
  contactId?: string;
  messages?: Message[] | null;
  createdAt: Date;
  updatedAt?: Date | null;
}
