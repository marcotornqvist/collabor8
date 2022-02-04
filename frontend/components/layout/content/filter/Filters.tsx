import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dropdownVariants, menuVariants } from "utils/variants";
import CountriesFilter from "./CountriesFilter";
import SearchFilter from "./SearchFilter";
import DisciplinesFilter from "./DisciplinesFilter";
import SortFilter from "./SortFilter";
import RemoveFilters from "./RemoveFilters";
import button from "@/styles-modules/Button.module.scss";
import Image from "next/image";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

interface IProps {
  isMobile: boolean;
}

const Filters = ({ isMobile }: IProps) => {
  const [show, setShow] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // Prevent scrolling on body
    isMobile && show
      ? document.body.classList.add("body-prevent-scroll")
      : document.body.classList.remove("body-prevent-scroll");
  }, [show, isMobile]);

  return (
    <div className="filters">
      {isMobile ? (
        <div className="filters-mobile">
          <button
            onClick={() => setShow(!show)}
            className={`show-filters-btn ${button.green}`}
          >
            <span className="text">Show Filters</span>
            <div className="filter-icon">
              <Image
                src="/icons/filter-icon-white.svg"
                alt="filtration"
                width={24}
                height={24}
                layout="fixed"
              />
            </div>
          </button>
          <AnimatePresence>
            {show && (
              <motion.div
                className="filters-menu"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
              >
                <div className="top-bar-menu" onClick={() => setShow(false)}>
                  <span className="title">Filters</span>
                  <span className="close-btn">Close</span>
                </div>
                <div className="filter-wrapper">
                  <div className="container">
                    <SearchFilter />
                    <CountriesFilter
                      variants={dropdownVariants.slideIn}
                      isMobile={true}
                    />
                    <DisciplinesFilter
                      variants={dropdownVariants.slideIn}
                      isMobile={true}
                    />
                    <SortFilter
                      variants={dropdownVariants.slideIn}
                      isMobile={true}
                    />
                  </div>
                </div>
                <div className="bottom-bar">
                  <RemoveFilters />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <aside className="filters-desktop">
          <div className="filter-wrapper">
            <SearchFilter />
            <CountriesFilter
              variants={dropdownVariants.desktop}
              isMobile={false}
            />
            <DisciplinesFilter
              variants={dropdownVariants.desktop}
              isMobile={false}
            />
            <SortFilter variants={dropdownVariants.desktop} isMobile={false} />
          </div>
          <RemoveFilters />
        </aside>
      )}
    </div>
  );
};

export default Filters;
