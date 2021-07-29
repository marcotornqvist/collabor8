import "reflect-metadata";
import { InputType, Field } from "type-graphql";

@InputType({ description: "The data for a new user" })
export class UserCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}
