import React, { RefObject, useRef, useState } from "react";
import Image from "next/image";
import input from "@/styles-modules/Input.module.scss";
import { useQueryParam, StringParam, withDefault } from "next-query-params";
import { Formik } from "formik";

const SearchFilter = () => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useQueryParam(
    "search",
    withDefault(StringParam, "")
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{ search: search }}
      onSubmit={({ search }) => {
        if (search && search.length > 0) {
          setSearch(search);
        } else {
          setSearch(undefined);
        }
      }}
    >
      {({ values, handleSubmit, handleChange }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
                value={values.search}
                onChange={handleChange}
                type="text"
                className="input"
                placeholder="Search..."
                ref={inputRef}
                onFocus={() => setIsFocus(true)}
                onBlur={() => {
                  handleSubmit();
                  setIsFocus(false);
                }}
              />
              <div className="image-container">
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
        </form>
      )}
    </Formik>
  );
};

export default SearchFilter;
