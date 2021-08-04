import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Message {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => ID)
  fromId: string;

  @Field(() => ID)
  contactId: string;

  @Field(() => Date)
  createdAt: Date;
}
