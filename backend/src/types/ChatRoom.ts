import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Project } from "./Project";
import { Contact } from "./Contact";
import { Message } from "./Message";

@ObjectType()
export class ChatRoom {
  @Field(() => ID)
  id: string;

  @Field(() => Project, { nullable: true })
  project?: Project | null;

  @Field(() => ID)
  projectId?: string;

  @Field(() => Contact, { nullable: true })
  contact?: Contact | null;

  @Field(() => ID)
  contactId?: string;

  @Field(() => [Message], { nullable: true })
  messages?: [Message] | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
