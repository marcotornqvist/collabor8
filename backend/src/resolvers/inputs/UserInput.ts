import "reflect-metadata";
import { InputType, Field } from "type-graphql";
import {
  IsEmail,
  IsLowercase,
  Length,
  MinLength,
  MaxLength,
} from "class-validator";
import { Sort } from "../../types/Enums";

@InputType({ description: "Create a new user" })
export class RegisterInput {
  @IsEmail()
  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}

@InputType({ description: "Login a User" })
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType({ description: "Update Username Input" })
export class UpdateUsernameInput {
  @Field(() => String)
  username: string;
}

@InputType({ description: "Update Email Input" })
export class UpdateEmailInput {
  @IsEmail()
  @Field()
  email: string;
}

@InputType({ description: "Update Password Input" })
export class UpdatePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;

  @Field()
  confirmPassword: string;
}

@InputType({
  description: "Filter Users",
})
export class UsersFilterArgs {
  @Field(() => String, { nullable: true })
  searchText?: string | null;

  @Field(() => [Number], { nullable: true })
  disciplines?: number[] | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => String, { nullable: true })
  after?: string | null;

  @Field(() => String, { nullable: true })
  before?: string | null;

  @Field(() => Number, { nullable: true })
  first?: number | null;

  @Field(() => Number, { nullable: true })
  last?: number | null;

  @Field(() => Sort, { nullable: true })
  sort?: Sort | null;
}
