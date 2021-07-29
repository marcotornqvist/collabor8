import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail } from "class-validator";
// import { Project } from "./Project";

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field((type) => String)
  content: string;

  @Field((type) => String)
  from: string;

  // @Field((type) => User)
  // author?: User | null;
}
