import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class BlockedUser {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  senderId: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  createdAt: Date;
}
