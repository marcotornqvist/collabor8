import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Message } from "../../types/Message";
import { User } from "../../types/User";

@ObjectType()
export class MessageResponse {
  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  fullName?: string | null;

  @Field(() => String, { nullable: true })
  profileImage?: string | null;
}

@ObjectType()
export class MessageSubscribtionResponse {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  chatId: string;

  @Field(() => String)
  body: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  // @Field(() => String, { nullable: true })
  // fullName?: string | null;

  // @Field(() => String, { nullable: true })
  // username?: string | null;

  // @Field(() => String, { nullable: true })
  // profileImage?: string | null;

  @Field(() => [String])
  authReceivers: string[];

  @Field(() => Date)
  createdAt: Date;
}
