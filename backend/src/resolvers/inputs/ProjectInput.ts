import { Length } from "class-validator";
import { Field, InputType, ID } from "type-graphql";

@InputType({ description: "Input Arguments for Project" })
export class CreateProjectInput {
  @Length(1, 50)
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => [Number], { nullable: true })
  disciplines?: number[] | null;

  @Field(() => [String], { nullable: true })
  members?: string[] | null;
}

@InputType({ description: "Input Arguments for Project" })
export class UpdateProjectInput {
  @Field(() => ID)
  id: string;

  @Length(1, 50)
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => [Number], { nullable: true })
  disciplines?: number[] | null;
}

@InputType({
  description: "Input arguments for deleting a member from a project",
})
export class MemberInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  projectId: string;
}
