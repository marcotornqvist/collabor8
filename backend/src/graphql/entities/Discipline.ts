import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Social {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => [String], { nullable: true })
  users?: [String] | null;
}
