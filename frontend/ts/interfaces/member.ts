import { Role } from "ts/enums/role";
import { StatusCode } from "ts/enums/statusCode";
import { Project } from "./project";
import { User } from "./user";

export interface Member {
  user: User;
  userId: string;
  project?: Project | null;
  projectId: string;
  readChatAt: Date;
  role: Role;
  status: StatusCode;
  assignedAt: Date;
  updatedAt?: Date | null;
}
