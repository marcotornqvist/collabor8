import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@operations-queries/countries";
import { countries } from "generated/countries";
import { AnimatePresence, motion } from "framer-motion";
import useOnClickOutside from "@hooks/useOnClickOutside";
import Image from "next/image";
import dropdown from "@styles-modules/Dropdown.module.scss";

interface IProps {
  setFieldValue: (
    field: "country",
    value: string | null,
    shouldValidate?: boolean | undefined
  ) => void;
  selected: string;
  loading: boolean;
  variants: any;
  isMobile: boolean;
}

const CountriesDropdown = ({
  setFieldValue,
  selected,
  loading,
  variants,
  isMobile,
}: IProps) => {
  const [show, setShow] = useState(false);
  const { data } = useQuery<countries>(GET_COUNTRIES);

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
      <div className="label-text">
        <label htmlFor="country">Country</label>
      </div>
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="show-dropdown-menu-btn"
      >
        <span className={selected ? "default-text" : "placeholder"}>
          {!loading ? (selected ? selected : "Selected Country") : ""}
        </span>
        <motion.div
          className="icon-container"
          initial="hidden"
          animate={{ rotate: !isMobile && show ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/icons/chevron-down-solid.svg"
            alt="Chevron"
            width={18}
            height={18}
          />
        </motion.div>
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
            <div className="header-bar" onClick={() => setShow(false)}>
              <span className="selected-title">
                {selected ? selected : "Select Country"}
              </span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list" ref={listRef}>
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
