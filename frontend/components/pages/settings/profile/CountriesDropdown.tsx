import { RefObject, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@operations-queries/countries";
import { countries } from "generated/countries";
import { AnimatePresence, motion } from "framer-motion";
import useOnClickOutside from "@hooks/useOnClickOutside";
import Image from "next/image";
import useWindowSize from "@hooks/useWindowSize";
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
}

const CountriesDropdown = ({
  setFieldValue,
  selected,
  loading,
  variants,
}: IProps) => {
  const [show, setShow] = useState(false);
  const { data } = useQuery<countries>(GET_COUNTRIES);

  const { width } = useWindowSize();

  const activeRef: RefObject<HTMLLIElement> = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (width < 768 && activeRef.current) {
      activeRef.current.scrollIntoView();
    }
    // Prevent scrolling on body
    width < 768 && show
      ? document.body.classList.add("body-prevent-scroll")
      : document.body.classList.remove("body-prevent-scroll");
  }, [show, width]);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <div onClick={() => setShow(!show)} className="show-dropdown-menu-btn">
        <span className={selected ? "default-text" : "placeholder"}>
          {!loading ? (selected ? selected : "Selected Country") : ""}
        </span>
        <motion.div
          className="icon-container"
          initial="hidden"
          animate={{ rotate: width >= 768 && show ? 180 : 0 }}
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
        {data && show && (
          <motion.div
            className="dropdown-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={
              width < 768 ? variants.mobileVariants : variants.desktopVariants
            }
          >
            <div className="header-bar" onClick={() => handleClickOutside()}>
              <span className="selected-title">
                {selected ? selected : "Select Country"}
              </span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list">
              <li
                ref={!selected ? activeRef : null}
                onClick={() => {
                  setFieldValue("country", null);
                  handleClickOutside();
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
                    handleClickOutside();
                  }}
                >
                  <span>{item.country}</span>
                </li>
              ))}
              {data.countries && data.countries.length > 50 && (
                <li
                  onClick={() => {
                    setFieldValue("country", null);
                    handleClickOutside();
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
