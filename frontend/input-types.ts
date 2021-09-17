import { Sort } from "enums";

export interface UserFilterArgs {
  loggedInUserId?: string | null;
  searchText?: string | null;
  disciplines?: number[] | null;
  country?: string | null;
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  sort?: Sort | null;
}
