import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { ChatRoom } from "./ChatRoom";
import { StatusCode } from "../types/Enums";

@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => ID)
  userId: string;

  @Field(() => Contact, { nullable: true })
  contact?: Contact | null;

  @Field(() => ID)
  contactId: string;

  @Field(() => ChatRoom, { nullable: true })
  chatRoom?: ChatRoom | null;

  @Field(() => StatusCode)
  status: StatusCode;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
