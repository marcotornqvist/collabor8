import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { IDiscipline } from "@/types-interfaces/form";
import { useDisciplinesQuery } from "generated/graphql";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import dropdown from "@/styles-modules/Dropdown.module.scss";
import ChevronIcon from "@/components-modules/global/ChevronIcon";
import DisciplineItem from "@/components-modules/global/DisciplineItem";

interface IProps {
  setFieldValue: (
    field: "disciplines",
    value: number[],
    shouldValidate?: boolean | undefined
  ) => void;
  disciplines: number[];
  loading: boolean;
  variants: Variants;
  isMobile: boolean;
  error: string;
  lastSubmittedValues?: number[];
}

const Members = ({
  setFieldValue,
  disciplines,
  loading,
  variants,
  isMobile,
  error,
  lastSubmittedValues,
}: IProps) => {
  const [show, setShow] = useState(false);
  const { data } = useDisciplinesQuery();

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
      // Scrolls list to activeElementY y-axis position
      listRef.current.scroll({ top: activeElementY });
      // scrolls screen to center
      listRef.current.scrollIntoView({ block: "center" });
    }

    // Prevent scrolling on body
    isMobile && show
      ? document.body.classList.add("body-prevent-scroll")
      : document.body.classList.remove("body-prevent-scroll");
  }, [show, isMobile]);

  // Returns the proper title depending on what disciplines are selected
  const title: string = useMemo(() => {
    if (data?.disciplines && disciplines.length === 1) {
      const find = data.disciplines.find((item) => {
        if (item.id === disciplines[0]) return item.title;
      });
      return find?.title || "No Title Found";
    } else if (disciplines.length > 1) {
      return "Multiple Disciplines";
    } else {
      return "Select Discipline";
    }
  }, [disciplines, data]);

  // Add boolean property named active to every element
  // with the value of true to elements that are selected
  // useMemo makes disciplineList re-render only if disciplines or data?.disciplines changes
  const disciplineList = useMemo(
    () =>
      data?.disciplines?.map((item) => {
        const found = disciplines.some((el) => el === item.id);
        return {
          ...item,
          active: found,
        };
      }),
    [disciplines, data?.disciplines]
  );

  // Handle the discipline and pass them up to parent component
  const disciplineHandler = (item: IDiscipline) => {
    const findItem = disciplines.find((el) => el === item.id);
    // If item exists in array it gets filtered out, else it gets added to array
    if (findItem) {
      const filterItem = disciplines.filter((el) => el !== item.id);
      setFieldValue("disciplines", filterItem);
    } else {
      setFieldValue("disciplines", [...disciplines, item.id]);
    }
  };

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <div
      className={`members-dropdown ${dropdown.default} ${
        show ? dropdown.active : ""
      }`}
      ref={dropdownRef}
    >
      <div className="input-text">
        <label htmlFor="members">members</label>
      </div>
      <div onClick={() => setShow(!show)} className="show-dropdown-menu-btn">
        {/* <span
          className={members.length >= 1 ? "default-text" : "placeholder"}
        >
          {title}
        </span> */}
        <ChevronIcon
          isMobile={isMobile}
          show={show}
          chevronRotate={isMobile ? "rotate(90deg)" : "rotate(0deg)"}
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
              <span className="selected-title">{title}</span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list multi-selections">
              <li
                className="list-item"
                onClick={() => {
                  setFieldValue("disciplines", []);
                }}
              >
                <span>No Selection</span>
              </li>
              {disciplineList?.map((item) => (
                <DisciplineItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  active={item.active}
                  disciplineHandler={disciplineHandler}
                />
              ))}
              {data?.disciplines && data.disciplines.length > 50 && (
                <li
                  className="list-item"
                  onClick={() => {
                    setFieldValue("disciplines", []);
                  }}
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

export default Members;
