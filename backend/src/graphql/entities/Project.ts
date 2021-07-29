import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => Boolean, { nullable: true })
  published?: boolean | null;

  @Field(() => Int)
  viewCount: number;

  @Field(() => User, { nullable: true })
  author?: User | null;
}
