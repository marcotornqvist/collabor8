import React from "react";

interface IProps {
  // sort: "desc" | "asc";
  // setSort: (sort: "desc" | "asc") => void;
  variants: any;
  isMobile: boolean;
}

const SortFilter = ({ variants, isMobile }: IProps) => {
  return <div className="sort-filter"></div>;
};

export default SortFilter;
