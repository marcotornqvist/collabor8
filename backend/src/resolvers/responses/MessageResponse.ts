import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Message } from "../../types/Message";

@ObjectType()
export class MessageResponse {
  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  fullname?: string | null;

  @Field(() => String, { nullable: true })
  profileImage?: string | null;
}

@ObjectType()
export class MessageSubscribtionResponse {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => ID)
  chatId?: string;

  @Field(() => String, { nullable: true })
  fullname?: string | null;

  @Field(() => String, { nullable: true })
  profileImage?: string | null;

  @Field(() => [String])
  authReceivers: string[];

  @Field(() => Date)
  createdAt: Date;
}
