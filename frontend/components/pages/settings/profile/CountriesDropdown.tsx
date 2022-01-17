import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@operations-queries/countries";
import { countries } from "generated/countries";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import useWindowSize from "@hooks/useWindowSize";

interface IProps {
  selected?: string | null;
  setCountry: (country: string) => void;
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

const CountriesDropdown = ({ selected, setCountry }: IProps) => {
  const [show, setShow] = useState(false);
  const { data, loading } = useQuery<countries>(GET_COUNTRIES);

  const { width } = useWindowSize();

  const activeRef: any = useRef<HTMLLIElement>(null);

  console.log(activeRef);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView();
    }
  }, [show]);

  return (
    <div className={`countries-dropdown${show ? " active" : ""}`}>
      <div className="label-text">
        <label htmlFor="country">Country</label>
      </div>
      <div onClick={() => setShow(!show)} className="show-dropdown-menu-btn">
        <span>{selected}</span>
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
        {show && (
          <motion.div
            className="dropdown-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={width < 768 ? mobileVariants : desktopVariants}
          >
            <div className="header-bar" onClick={() => setShow(false)}>
              <span className="selected-title">{selected}</span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list">
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountriesDropdown;
