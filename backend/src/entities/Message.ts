import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { ChatRoom } from "./ChatRoom";

@ObjectType()
export class Message {
  @Field(() => ID)
  id: String;

  @Field(() => String)
  body: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => ID)
  userId: string;

  @Field(() => ChatRoom, { nullable: true })
  chatRoom?: ChatRoom | null;

  @Field(() => ID)
  chatId: string;

  @Field(() => Date)
  createdAt: Date;
}
