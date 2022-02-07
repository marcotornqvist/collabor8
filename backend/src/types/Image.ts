import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Discipline } from "./Discipline";

@ObjectType()
export class Image {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  alt?: string;

  @Field(() => String, { nullable: true })
  large?: string;

  @Field(() => String, { nullable: true })
  medium?: string;

  @Field(() => String, { nullable: true })
  small?: string;

  @Field(() => String, { nullable: true })
  objectPosition?: string;

  @Field(() => [Discipline], { nullable: true })
  disciplines?: Discipline[] | null;

  @Field(() => Date)
  createdAt: Date;
}
