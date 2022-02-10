import "reflect-metadata";
import { InputType, Field, ObjectType } from "type-graphql";
import {
  IsEmail,
  Min,
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

  @Min(6)
  @Field()
  password: string;

  @Min(6)
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

  @Min(6)
  @Field()
  newPassword: string;

  @Min(6)
  @Field()
  confirmPassword: string;
}
