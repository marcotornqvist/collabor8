import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Member } from "./Member";
import { GroupMessage } from "./GroupMessage";

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field((type) => User, { nullable: true })
  creator?: User | null;

  @Field(() => ID)
  userId: string;

  @Field(() => [Member], { nullable: true })
  members?: [Member] | null;

  @Field(() => [GroupMessage], { nullable: true })
  messages?: [GroupMessage] | null;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
