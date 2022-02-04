import { useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useQueryParam, withDefault } from "next-query-params";
import { singleStringParam } from "utils/customQueryParams";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import dropdown from "@/styles-modules/Dropdown.module.scss";
import ChevronIcon from "../global/ChevronIcon";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

interface IProps {
  variants: Variants;
  isMobile: boolean;
}

const SortFilter = ({ variants, isMobile }: IProps) => {
  const [show, setShow] = useState(false);
  const [sort, setSort] = useQueryParam(
    "sort",
    withDefault(singleStringParam, "")
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // setShow to false to prevent glitch when variants change in dropdown menu
  useIsomorphicLayoutEffect(() => {
    setShow(false);
  }, [isMobile]);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <div
      className={`sort-dropdown ${dropdown.default} ${
        show ? dropdown.active : ""
      }`}
      ref={dropdownRef}
    >
      <div className="input-text">
        <label htmlFor="sort">Sort</label>
      </div>
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="show-dropdown-menu-btn"
      >
        <span className={sort === "asc" ? "default-text" : "placeholder"}>
          {sort === "asc" ? "Oldest to Newest" : "Newest to Oldest"}
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
              <span className="title">Sort</span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list single-selection">
              <li
                className={`list-item${sort !== "asc" ? " active" : ""}`}
                onClick={() => {
                  setShow(false);
                  setSort(undefined);
                }}
              >
                <span>Sort Newest to Oldest</span>
              </li>
              <li
                className={`list-item${sort === "asc" ? " active" : ""}`}
                onClick={() => {
                  setShow(false);
                  setSort("asc");
                }}
              >
                <span>Sort Oldest to Newest</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortFilter;
