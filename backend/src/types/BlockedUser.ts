import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class BlockedUser {
  @Field(() => User)
  user: User;

  @Field(() => String)
  userId: string;

  @Field(() => User)
  blockedUser: User;

  @Field(() => String)
  blockedUserById: string;

  @Field(() => Date)
  createdAt: Date;
}
