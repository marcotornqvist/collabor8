import React, { RefObject, useEffect, useRef, useState } from "react";
import input from "@/styles-modules/Input.module.scss";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import { useUsersLazyQuery } from "generated/graphql";

const SearchInput = () => {
  // Local search value, get's passed up to parent component "search" state with setSearch
  const [lastSubmit, setLastSubmit] = useState("");
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const { isMobile } = useIsMobile();

  const [getUsers] = useUsersLazyQuery();

  const handleSearch = (
    e: React.FormEvent<HTMLInputElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    if (lastSubmit !== search) {
      getUsers({
        variables: {
          data: {
            searchText: search,
          },
        },
      });
      setLastSubmit(search);
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
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          className="input"
          placeholder="Search contacts..."
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
          onFocus={() => setIsFocus(true)}
          onBlur={(e) => {
            handleSearch(e);
            setIsFocus(false);
          }}
        />
        <div
          className="image-container"
          onClick={(e) => handleSearch(e)}
          style={{ cursor: "pointer" }}
        >
          <Image
            src="/icons/search-solid.svg"
            alt="Search"
            width={20}
            height={20}
            layout="fixed"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
