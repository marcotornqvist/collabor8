import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Length, MaxLength } from "class-validator";
import { User } from "./User";
import { Member } from "./Member";
import { ReportProject } from "./Report";
import { ChatRoom } from "./ChatRoom";
import { Discipline } from "./Discipline";

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Length(1, 50)
  @Field(() => String)
  title: string;

  @MaxLength(1000)
  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => User, { nullable: true })
  owner?: User | null;

  @Field(() => ID, { nullable: true })
  userId?: string | null;

  @Field(() => [Discipline], { nullable: true })
  disciplines?: Discipline[] | null;

  @Field(() => [Member], { nullable: true })
  members?: Member[] | null;

  @Field(() => [ReportProject], { nullable: true })
  reports?: ReportProject[] | null;

  @Field(() => ChatRoom, { nullable: true })
  chatRoom?: ChatRoom | null;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
