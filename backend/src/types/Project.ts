import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Length, MaxLength } from "class-validator";
import { Member } from "./Member";
import { ReportProject } from "./Report";
import { ChatRoom } from "./ChatRoom";
import { Discipline } from "./Discipline";
import { Message } from "./Message";

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Length(10, 64)
  @Field(() => String)
  title: string;

  @MaxLength(1000)
  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => [Discipline], { nullable: true })
  disciplines?: Discipline[] | null;

  @Field(() => [Member], { nullable: true })
  members?: Member[] | null;

  @Field(() => [ReportProject], { nullable: true })
  reports?: ReportProject[] | null;

  @Field(() => [Message], { nullable: true })
  messages?: Message[] | null;

  @Field(() => Date, { nullable: true })
  latestMessageDate?: Date | null;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
