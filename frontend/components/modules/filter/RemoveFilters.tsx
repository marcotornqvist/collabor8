import React from "react";
import {
  useQueryParams,
  StringParam,
  NumericArrayParam,
} from "next-query-params";
import button from "@/styles-modules/Button.module.scss";

const RemoveFilters = () => {
  const [query, setQuery] = useQueryParams({
    search: StringParam,
    country: StringParam,
    disciplines: NumericArrayParam,
    sort: StringParam,
  });
  return (
    <button
      className={button.black}
      onClick={() => {
        setQuery({
          search: undefined,
          country: undefined,
          disciplines: undefined,
          sort: undefined,
        });
      }}
    >
      Remove Filters
    </button>
  );
};

export default RemoveFilters;
