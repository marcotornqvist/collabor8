import { Field, InputType } from "type-graphql";

@InputType({
  description: "Get disciplines by id",
})
export class DisciplineInput {
  @Field(() => [Number], { nullable: true })
  disciplineIds?: number[] | null;
}
