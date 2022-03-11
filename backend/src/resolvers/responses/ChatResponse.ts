import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Message } from "../../types/Message";
import { Project } from "../../types/Project";
import { User } from "../../types/User";

@ObjectType()
export class ProjectResponse extends Project {
  @Field(() => Boolean)
  newMessages: boolean;
}

@ObjectType()
export class ContactResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  newMessages: boolean;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  loggedInUserReadChatAt: Date;
}

@ObjectType()
export class ChatMessagesResponse {
  @Field(() => [Message])
  messages: Message[];

  @Field(() => Boolean)
  hasMore: boolean;
}
