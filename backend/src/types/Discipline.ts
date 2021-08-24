import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Profile } from "./Profile";
import { Project } from "./Project";

@ObjectType()
export class Discipline {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => [Profile], { nullable: true })
  profiles?: Profile[] | null;

  @Field(() => [Project], { nullable: true })
  projects?: Project[] | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
