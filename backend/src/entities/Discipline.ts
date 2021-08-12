import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Profile } from "./Profile";

@ObjectType()
export class Discipline {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => [Profile], { nullable: true })
  profiles?: [Profile] | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
