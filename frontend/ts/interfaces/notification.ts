import { User } from "./user";

export interface Notification {
  id: string;
  read: boolean;
  message: string;
  user?: User | null;
  userId: string;
  createdAt: Date;
  updatedAt?: Date | null;
}