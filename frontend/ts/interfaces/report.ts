import { Violation } from "ts/enums/violation";
import { Project } from "./project";
import { User } from "./user";

export interface ReportUser {
  id: string;
  violation: Violation;
  title: string;
  body?: string | null;
  senderId: string;
  user?: User | null;
  userId: string;
  createdAt: Date;
}

export interface ReportProject {
  id: string;
  violation: Violation;
  title: string;
  body?: string | null;
  senderId: string;
  project?: Project | null;
  projectId: string;
  createdAt: Date;
}
