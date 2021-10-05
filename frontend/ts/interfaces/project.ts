import { ChatRoom } from "./chatRoom";
import { Discipline } from "./discipline";
import { Member } from "./member";
import { ReportProject } from "./report";

export interface Project {
  id: string;
  title: string;
  body?: string | null;
  country?: string | null;
  disciplines?: Discipline[] | null;
  members?: Member[] | null;
  reports?: ReportProject[] | null;
  chatRoom?: ChatRoom | null;
  disabled: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}