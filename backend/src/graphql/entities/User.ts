import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { IsEmail, MinLength, Length } from "class-validator";
import { Profile } from "./Profile";
import { Social } from "./Social";
import { Project } from "./Project";
import { Contact } from "./Contact";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Length(1, 255)
  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Length(1, 255)
  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field()
  @IsEmail()
  email: string;

  // @Field()
  @MinLength(6)
  password: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile | null;

  @Field(() => Social, { nullable: true })
  socials?: Social | null;

  @Field(() => [Project], { nullable: true })
  projects?: [Project] | null;

  @Field(() => [Contact], { nullable: true })
  contacts?: [Contact] | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  @Field(() => Int)
  tokenVersion: number;
}
