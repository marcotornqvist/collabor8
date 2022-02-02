import React, { RefObject, useRef, useState } from "react";
import Image from "next/image";
import input from "@/styles-modules/Input.module.scss";
import { useQueryParam, StringParam, withDefault } from "next-query-params";

// interface IProps {
//   searchText: string;
//   setSearchText: (searchText: string) => void;
// }

const SearchFilter = ({ searchText, setSearchText }: any) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const [name, setName] = useQueryParam("name", withDefault(StringParam, ""));

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
          value={searchText}
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setName(e.target.value);
            } else {
              setName(undefined);
            }
          }}
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
          width={18}
          height={18}
          layout="fixed"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
