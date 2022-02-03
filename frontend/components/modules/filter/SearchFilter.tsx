import React, { RefObject, useRef, useState } from "react";
import Image from "next/image";
import input from "@/styles-modules/Input.module.scss";
import { useQueryParam, StringParam, withDefault } from "next-query-params";

const SearchFilter = () => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useQueryParam(
    "search",
    withDefault(StringParam, "")
  );

  const handleChange = (value: string) => {
    if (value && value.length > 0) {
      setSearch(value);
    } else {
      setSearch(undefined);
    }
  };

  return (
    <div className={`input-group ${input.search}`}>
      <div className="input-text">
        <label htmlFor="search">Search</label>
      </div>
      <div
        className={`input-field${isFocus ? " focus" : ""}`}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          name="search"
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          className="input"
          placeholder="Search..."
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <Image
          src="/icons/search-solid.svg"
          alt="Search"
          width={20}
          height={20}
          layout="fixed"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
