import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  read: boolean;

  @Field(() => String)
  message: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => ID)
  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
