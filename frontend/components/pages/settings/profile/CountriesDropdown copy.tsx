import { RefObject, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@operations-queries/countries";
import { countries } from "generated/countries";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import useWindowSize from "@hooks/useWindowSize";
import dropdown from "@styles-modules/Dropdown.module.scss";

interface IProps {
  selected?: string | null;
  setCountry: (country: string | null) => void;
  loading: boolean;
}

const mobileVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
    },
  },
};

const desktopVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
    },
  },
};

const CountriesDropdown = ({ selected, setCountry, loading }: IProps) => {
  const [show, setShow] = useState(false);
  const { data } = useQuery<countries>(GET_COUNTRIES);

  const { width } = useWindowSize();

  const activeRef: RefObject<HTMLLIElement> = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView();
    }
    // Prevent scrolling on body
    show
      ? document.body.classList.add("body-prevent-scroll")
      : document.body.classList.remove("body-prevent-scroll");
  }, [show]);

  return (
    <div className={`dropdown ${dropdown.default} ${show ? " active" : ""}`}>
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
            variants={width < 768 ? mobileVariants : desktopVariants}
          >
            <div className="header-bar" onClick={() => setShow(false)}>
              <span className="selected-title">
                {selected ? selected : "Select Country"}
              </span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list">
              <li
                ref={!selected ? activeRef : null}
                onClick={() => {
                  setCountry(null);
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
                    setCountry(item.country);
                    setShow(false);
                  }}
                >
                  <span>{item.country}</span>
                </li>
              ))}
              {data.countries && data.countries.length > 50 && (
                <li
                  onClick={() => {
                    setCountry(null);
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
