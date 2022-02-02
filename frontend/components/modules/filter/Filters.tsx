import { useEffect, useState } from "react";
import { IFilters } from "@/types-interfaces/filters";
import { useQueryParam, StringParam, withDefault } from "next-query-params";
import CountriesFilter from "./CountriesFilter";
import SearchFilter from "./SearchFilter";
import DisciplinesFilter from "./DisciplinesFilter";
import useWindowSize from "@/hooks/useWindowSize";
import SortFilter from "./SortFilter";
import button from "@/styles-modules/Button.module.scss";
import filterStyles from "@/styles-modules/Filter.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const mobileVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const desktopVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const Filters = ({ filters, setFilters }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const [show, setShow] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setShow(false);
    }
  }, [width]);

  return (
    <div className="filters">
      <div className="container">
        {width < 768 ? (
          <div className={filterStyles.mobile}>
            <button onClick={() => setShow(!show)} className="show-filters-btn">
              Show Filters
            </button>
            <AnimatePresence>
              {show && (
                <motion.div className="filters-menu">
                  <SearchFilter />
                  <CountriesFilter
                    variants={desktopVariants}
                    isMobile={false}
                  />
                  <DisciplinesFilter
                    variants={desktopVariants}
                    isMobile={false}
                  />
                  <SortFilter variants={desktopVariants} isMobile={false} />
                  <button
                    className={button.black}
                    onClick={() => {
                      // setSearchText("");
                      // setCountry(null);
                      // setDiscipline(null);
                      // setSort("desc");
                    }}
                  >
                    Remove Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className={filterStyles.desktop}>
            <h2>Desktop</h2>
            <SearchFilter />
            <CountriesFilter variants={desktopVariants} isMobile={false} />
            <DisciplinesFilter variants={desktopVariants} isMobile={false} />
            <SortFilter variants={desktopVariants} isMobile={false} />
            <button
              className={button.black}
              onClick={() => {
                // setSearchText("");
                // setCountry(null);
                // setDiscipline(null);
                // setSort("desc");
              }}
            >
              Remove Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
