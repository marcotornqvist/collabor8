import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { MaxLength } from "class-validator";
import { User } from "./User";
import { Discipline } from "./Discipline";

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: number;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => ID)
  userId: string;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => String, { nullable: true })
  city?: string | null;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => [Discipline], { nullable: true })
  disciplines?: [Discipline] | null;

  @Field(() => String, { nullable: true })
  profileImage?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}
