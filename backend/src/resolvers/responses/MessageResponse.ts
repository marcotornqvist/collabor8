import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Length } from "class-validator";

@ObjectType()
export class MessageResponse {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  profileImage?: string | null;
}
