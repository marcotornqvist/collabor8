import { Length, Max } from "class-validator";
import { Field, InputType, ID, registerEnumType } from "type-graphql";
import { Sort } from "../../types/Enums";
import { PaginationArgs, SearchArgs } from "./GlobalInputs";

@InputType({ description: "Input Arguments for Project" })
export class CreateProjectInput {
  @Length(10, 50)
  @Field(() => String)
  title: string;

  @Max(1000)
  @Field(() => String)
  body: string;

  @Field(() => String)
  country?: string | null;

  @Field(() => [Number])
  disciplines?: number[];

  @Field(() => [String])
  members?: string[];
}

@InputType({ description: "Input Arguments for Project" })
export class UpdateProjectInput {
  @Field(() => ID)
  id: string;

  @Length(10, 50)
  @Field(() => String)
  title: string;

  @Max(1000)
  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => [Number])
  disciplines?: number[];

  @Field(() => [String])
  members?: string[];
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
