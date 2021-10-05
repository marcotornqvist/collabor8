import { User } from "./user";

export interface BlockedUser {
  user: User;
  userId: string;
  blockedUser: User;
  blockedUserById: string;
  createdAt: Date;
}
