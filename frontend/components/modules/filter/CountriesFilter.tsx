import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useCountriesQuery } from "generated/graphql";
import { useQueryParam, StringParam, withDefault } from "next-query-params";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import dropdown from "@/styles-modules/Dropdown.module.scss";
import ChevronIcon from "../global/ChevronIcon";

interface IProps {
  variants: Variants;
  isMobile: boolean;
}

const CountriesFilter = ({ variants, isMobile }: IProps) => {
  const [show, setShow] = useState(false);
  const { data } = useCountriesQuery();

  const [country, setCountry] = useQueryParam(
    "country",
    withDefault(StringParam, "")
  );

  const activeRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // setShow to false to prevent glitch when variants change in dropdown menu
  useEffect(() => {
    setShow(false);
  }, [isMobile]);

  useEffect(() => {
    if (activeRef.current && listRef.current) {
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
      </div>
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="show-dropdown-menu-btn"
      >
        <span className={country ? "default-text" : "placeholder"}>
          {country ? country : "Select Country"}
        </span>
        <ChevronIcon
          isMobile={isMobile}
          show={show}
          initialRotate={isMobile ? "rotate(90deg)" : "rotate(0deg)"}
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
                {country ? country : "Select Country"}
              </span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list" ref={listRef}>
              <li
                ref={!country ? activeRef : null}
                onClick={() => {
                  setCountry(undefined);
                  setShow(false);
                }}
                className={`list-item${!country ? " active" : ""}`}
              >
                <span>No Selection</span>
              </li>
              {data?.countries?.map((item) => (
                <li
                  ref={country === item.country ? activeRef : null}
                  key={item.key}
                  className={`list-item${
                    country === item.country ? " active" : ""
                  }`}
                  onClick={() => {
                    setCountry(item.country);
                    setShow(false);
                  }}
                >
                  <span>{item.country}</span>
                </li>
              ))}
              {data?.countries && data.countries.length > 50 && (
                <li
                  onClick={() => {
                    setCountry(undefined);
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

export default CountriesFilter;
