import "reflect-metadata";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { Project } from "./Project";
import { User } from "./User";
import { Violation } from ".prisma/client";
import { Length, MaxLength } from "class-validator";

@ObjectType()
export class ReportUser {
  @Field(() => ID)
  id: string;

  @Field(() => Violation)
  violation: Violation;

  @Length(10, 255)
  @Field(() => String)
  title: string;

  @MaxLength(1000)
  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => String)
  senderId: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class ReportProject {
  @Field(() => ID)
  id: string;

  @Field(() => Violation)
  violation: Violation;

  @Length(10, 255)
  @Field(() => String)
  title: string;

  @MaxLength(1000)
  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => String)
  senderId: string;

  @Field(() => Project, { nullable: true })
  project?: Project | null;

  @Field(() => String)
  projectId: string;

  @Field(() => Date)
  createdAt: Date;
}

registerEnumType(Violation, {
  name: "Violation",
  description: "Violation enum",
});
