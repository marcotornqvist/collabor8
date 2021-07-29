import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail } from "class-validator";
import { User } from "./User";

@ObjectType()
export class Profile {
  @Field((type) => ID)
  id: string;

  @Field(() => [User])
  user: User[];

  @Field(() => ID)
  userId: string;

  @Field(() => [String])
  disciplines: string[];

  @Field(() => ID)
  country: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
