import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class GroupMessage {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => ID)
  fromId: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => Date)
  createdAt: Date;
}
