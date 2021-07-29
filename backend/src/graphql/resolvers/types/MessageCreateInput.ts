import "reflect-metadata";
import { InputType, Field } from "type-graphql";

@InputType({ description: "The data for a new recipe" })
export class MessageCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
}
