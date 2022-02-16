import "reflect-metadata";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { User } from "./User";
import { Project } from "./Project";
import { Role, StatusCode, MemberStatusCode } from "@prisma/client";

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

  @Field(() => MemberStatusCode)
  status: MemberStatusCode;

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

registerEnumType(MemberStatusCode, {
  name: "MemberStatusCode",
  description: "MemberStatus Code enum",
});
