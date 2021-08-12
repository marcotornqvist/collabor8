import "reflect-metadata";
import { InputType, Field } from "type-graphql";
import {
  IsEmail,
  IsLowercase,
  Length,
  MinLength,
  MaxLength,
} from "class-validator";

@InputType({ description: "Create a new user" })
export class RegisterInput {
  @MaxLength(254)
  @IsEmail()
  @Field()
  email: string;

  @MaxLength(255)
  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @MaxLength(255)
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

@InputType({ description: "Update Username Input" })
export class UpdateUsernameInput {
  @IsLowercase()
  @Length(3, 50)
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
  @MinLength(6)
  @Field()
  currentPassword: string;

  @MinLength(6)
  @Field()
  newPassword: string;

  @MinLength(6)
  @Field()
  confirmPassword: string;
}
