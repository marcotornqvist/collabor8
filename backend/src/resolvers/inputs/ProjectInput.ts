import { Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Discipline } from "../../types/Discipline";
import { Member } from "../../types/Member";

@InputType({ description: "Input Arguments for Project" })
export class CreateProjectInput {
  @Length(1, 50)
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => [Number], { nullable: true })
  disciplines?: number[] | null;

  @Field(() => [String], { nullable: true })
  members?: string[] | null;
}
