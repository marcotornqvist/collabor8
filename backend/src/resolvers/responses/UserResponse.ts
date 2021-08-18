import "reflect-metadata";
import { User } from "../../types/User";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
