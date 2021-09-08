import "reflect-metadata";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { User } from "./User";
import { Project } from "./Project";
import { Role, StatusCode } from "@prisma/client";

@ObjectType()
export class Member {
  @Field(() => User)
  user: User;

  @Field(() => ID)
  userId: string;

  @Field(() => Project, { nullable: true })
  project?: Project | null;

  @Field(() => ID)
  projectId: string;

  @Field(() => Date)
  readChatAt: Date;

  @Field(() => Role)
  role: Role;

  @Field(() => StatusCode)
  status: StatusCode;

  @Field(() => Date)
  assignedAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}

registerEnumType(Role, {
  name: "Role",
  description: "Role enum for projects ADMIN/MEMBER",
});

registerEnumType(StatusCode, {
  name: "StatusCode",
  description: "Status Code enum",
});
