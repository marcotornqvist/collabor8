import { User } from "./user";

export interface Social {
  user?: User | null;
  userId: string;
  instagram?: string | null;
  linkedin?: string | null;
  dribbble?: string | null;
  behance?: string | null;
  pinterest?: string | null;
  soundcloud?: string | null;
  spotify?: string | null;
  medium?: string | null;
  vimeo?: string | null;
  youtube?: string | null;
  github?: string | null;
  discord?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}
