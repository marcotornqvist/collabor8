import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useCountriesQuery } from "generated/graphql";
import { chevronRotate } from "types/types";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import dropdown from "@/styles-modules/Dropdown.module.scss";
import ChevronIcon from "@/components-modules/global/ChevronIcon";

interface IProps {
  setFieldValue: (
    field: "country",
    value: string | null,
    shouldValidate?: boolean | undefined
  ) => void;
  selected: string | null;
  loading?: boolean;
  variants: Variants;
  isMobile: boolean;
  error: string;
  lastSubmitValue?: string | null;
  chevronRotate?: chevronRotate;
}

const CountriesDropdown = ({
  setFieldValue,
  selected,
  loading = false,
  variants,
  isMobile,
  error,
  lastSubmitValue,
  chevronRotate,
}: IProps) => {
  const [show, setShow] = useState(false);
  const { data } = useCountriesQuery();

  const activeRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // setShow to false to prevent glitch when variants change in dropdown menu
  useEffect(() => {
    setShow(false);
  }, [isMobile]);

  useEffect(() => {
    if (activeRef.current && listRef.current && show) {
      const activeElementY = activeRef.current.offsetTop;
      // scrolls screen to center
      listRef.current.scrollIntoView({ block: "center" });
      // Scrolls list to activeElementY y-axis position
      listRef.current.scroll({ top: activeElementY });
    }

    // Prevent scrolling on body
    isMobile && show
      ? document.body.classList.add("body-prevent-scroll")
      : document.body.classList.remove("body-prevent-scroll");
  }, [show, isMobile]);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <div
      className={`dropdown ${dropdown.default} ${show ? dropdown.active : ""}`}
      ref={dropdownRef}
    >
      <div className="input-text">
        <label htmlFor="country">Country</label>
        {!error && selected && lastSubmitValue === selected && (
          <span className="success-message">Country is valid</span>
        )}
      </div>
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="show-dropdown-menu-btn"
      >
        <span className={selected ? "default-text" : "placeholder"}>
          {!loading ? (selected ? selected : "Select Country") : ""}
        </span>
        <ChevronIcon
          isMobile={isMobile}
          show={show}
          chevronRotate={chevronRotate}
        />
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="dropdown-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
          >
            <div className="top-bar" onClick={() => setShow(false)}>
              <span className="selected-title">
                {selected ? selected : "Select Country"}
              </span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list single-selection" ref={listRef}>
              <li
                ref={!selected ? activeRef : null}
                onClick={() => {
                  setFieldValue("country", null);
                  setShow(false);
                }}
                className={`list-item${!selected ? " active" : ""}`}
              >
                <span>No Selection</span>
              </li>
              {data?.countries?.map((item) => (
                <li
                  ref={selected === item.country ? activeRef : null}
                  key={item.key}
                  className={`list-item${
                    selected === item.country ? " active" : ""
                  }`}
                  onClick={() => {
                    setFieldValue("country", item.country);
                    setShow(false);
                  }}
                >
                  <span>{item.country}</span>
                </li>
              ))}
              {data?.countries && data.countries.length > 50 && (
                <li
                  onClick={() => {
                    setFieldValue("country", null);
                    setShow(false);
                  }}
                  className="list-item"
                >
                  <span>No Selection</span>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountriesDropdown;
