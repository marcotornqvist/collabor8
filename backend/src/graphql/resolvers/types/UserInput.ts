import "reflect-metadata";
import { InputType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";

@InputType({ description: "Create a new user" })
export class RegisterInput {
  @IsEmail()
  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @MinLength(6)
  @Field()
  password: string;

  @MinLength(6)
  @Field()
  confirmPassword: string;
}

@InputType({ description: "Login a User" })
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @MinLength(6)
  @Field()
  password: string;
}
