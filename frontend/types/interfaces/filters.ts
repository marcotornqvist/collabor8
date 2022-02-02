import { IDiscipline } from "./form";

export interface IFilters {
  searchText: string;
  country: string | null;
  discipline: IDiscipline | null;
  sort: "desc" | "asc";
}
