import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Length } from "class-validator";
import { User } from "./User";
import { Member } from "./Member";
import { ReportProject } from "./Report";
import { ChatRoom } from "./ChatRoom";

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Length(1, 50)
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => User, { nullable: true })
  creator?: User | null;

  @Field(() => ID)
  userId: string;

  @Field(() => [Member], { nullable: true })
  members?: [Member] | null;

  @Field(() => [ReportProject], { nullable: true })
  reports?: [ReportProject] | null;

  @Field(() => ChatRoom, { nullable: true })
  chatRoom?: ChatRoom | null;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
