import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Member {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  projectId: string;

  @Field(() => Date)
  assignedAt: Date;
}
