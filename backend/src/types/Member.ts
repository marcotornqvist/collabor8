import "reflect-metadata";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { User } from "./User";
import { Project } from "./Project";
import { StatusCode } from "../types/Enums";

@ObjectType()
export class Member {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => ID)
  userId: string;

  @Field(() => Project, { nullable: true })
  project?: Project | null;

  @Field(() => ID)
  projectId: string;

  @Field(() => StatusCode)
  status: StatusCode;

  @Field(() => Date)
  assignedAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}

registerEnumType(StatusCode, {
  name: "StatusCode",
  description: "Status Code enum", // this one is optional
});
