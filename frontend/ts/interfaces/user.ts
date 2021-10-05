import { Profile } from "./profile";
import { Social } from "./social";
import { Member } from "./member";
import { Contact } from "./contact";
import { Message } from "./message";
import { BlockedUser } from "./blockedUser";
import { ReportUser } from "./report";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profile?: Profile | null;
  socials?: Social | null;
  memberOf?: Member[] | null;
  member?: Member[] | null;
  contactsSent?: Contact[] | null;
  contactsRcvd?: Contact[] | null;
  message?: Message[] | null;
  notifications?: Notification[] | null;
  blockedUsers?: BlockedUser[] | null;
  reports?: ReportUser[] | null;
  tokenVersion: number;
  disabled: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}
