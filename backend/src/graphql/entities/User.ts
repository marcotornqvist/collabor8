import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail } from "class-validator";
import { Profile } from "./Profile";
import { Project } from "./Project";
import { Contact } from "./Contact";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field()
  @IsEmail()
  email: string;

  // @Field()
  // password: string;

  // @Field(() => Profile)
  // profile: Profile;

  // @Field(() => Date)
  // createdAt: Date;

  // @Field(() => Date)
  // updatedAt: Date;

  // @Field(() => [Project])
  // projects: Project[];

  // @Field(() => [Contact])
  // contacts: Contact[];
}
