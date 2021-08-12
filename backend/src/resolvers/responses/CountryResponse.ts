import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class CountryResponse {
  @Field(() => ID)
  key: string;

  @Field(() => String)
  country: string;
}
