import { Profile } from "./profile";
import { Project } from "./project";

export interface Discipline {
  id: number;
  title: string;
  profiles?: Profile[] | null;
  projects?: Project[] | null;
  createdAt: Date;
  updatedAt?: Date | null;
}
