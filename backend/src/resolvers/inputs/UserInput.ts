import "reflect-metadata";
import { InputType, Field, ObjectType } from "type-graphql";
import {
  IsEmail,
  IsLowercase,
  Length,
  MinLength,
  MaxLength,
} from "class-validator";
import { Sort } from "../../types/Enums";
import { PaginationArgs } from "./GlobalInputs";

@InputType({
  description: "Test Input Type Delete Later",
})
export class Test {
  @Field(() => String)
  body: string;

  @Field(() => String)
  text: string;
}

@ObjectType({
  description: "Test Input Type Delete Later",
})
export class TestResponse {
  @Field(() => String)
  body: string;

  @Field(() => String)
  text: string;
}

@InputType({
  description: "Filter Users",
})
export class UsersFilterArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  searchText?: string | null;

  @Field(() => [Number], { nullable: true })
  disciplines?: number[] | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => Sort, { nullable: true })
  sort?: Sort | null;
}

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

@InputType({ description: "Update Password Input" })
export class UpdatePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;

  @Field()
  confirmPassword: string;
}
