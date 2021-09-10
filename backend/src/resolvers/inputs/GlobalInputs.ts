import { Field, InputType } from "type-graphql";

@InputType({
  description: "Pagination Args",
})
export class PaginationArgs {
  @Field(() => String, { nullable: true })
  after?: string | null;

  @Field(() => String, { nullable: true })
  before?: string | null;

  @Field(() => Number, { nullable: true })
  first?: number | null;

  @Field(() => Number, { nullable: true })
  last?: number | null;
}

@InputType({
  description: "Search Args",
})
export class SearchArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  searchText?: string | null;
}
