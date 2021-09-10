import { Length } from "class-validator";
import { Field, InputType, ID, registerEnumType } from "type-graphql";
import { Sort } from "../../types/Enums";
import { PaginationArgs, SearchArgs } from "./GlobalInputs";

@InputType({ description: "Input Arguments for Project" })
export class CreateProjectInput {
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

@InputType({
  description: "Filter Projects",
})
export class ProjectsFilterArgs extends SearchArgs {
  @Field(() => [Number], { nullable: true })
  disciplines?: number[] | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => Sort, { nullable: true })
  sort?: Sort | null;
}

@InputType({
  description: "Pagination Args With UserId Argument",
})
export class PaginationUserArgs extends PaginationArgs {
  @Field(() => ID)
  id: string;
}

registerEnumType(Sort, {
  name: "Sort",
  description: "Sort by most recent or oldest",
});
