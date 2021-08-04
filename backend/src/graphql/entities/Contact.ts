import "reflect-metadata";
import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { Message } from "./Message";

@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  contactId: string;

  @Field(() => [Message], { nullable: true })
  messages?: [Message] | null;

  @Field(() => StatusCode) // it's very important
  status: StatusCode;

  @Field(() => Date)
  createdAt: Date;
}

enum StatusCode {
  NOTFRIEND = "NOTFRIEND",
  PENDING = "PENDING",
  FRIEND = "FRIEND",
}

registerEnumType(StatusCode, {
  name: "StatusCode",
  description: "Status Code enum", // this one is optional
});
