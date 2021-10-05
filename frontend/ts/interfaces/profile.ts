import { User } from "./user";
import { Discipline } from "./discipline";

export interface Profile {
  user?: User | null;
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  country?: string | null;
  bio?: string | null;
  discipline?: Discipline | null;
  disciplineId?: number | null;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}
