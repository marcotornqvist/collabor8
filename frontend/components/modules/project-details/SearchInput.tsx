import { RefObject, useRef, useState } from "react";
import input from "@/styles-modules/Input.module.scss";
import Image from "next/image";

interface IProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchInput = ({ search, setSearch }: IProps) => {
  // Local search value, get's passed up to parent component "search" state with setSearch
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const handleSearch = (
    e: React.FormEvent<HTMLInputElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    if (search !== value) {
      setSearch(value);
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="input"
          placeholder="Search for users..."
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
