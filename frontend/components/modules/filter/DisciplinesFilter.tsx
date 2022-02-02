import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDisciplinesQuery } from "generated/graphql";
import {
  useQueryParam,
  withDefault,
  NumericArrayParam,
} from "next-query-params";
import { IDiscipline } from "@/types-interfaces/form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Image from "next/image";
import dropdown from "@/styles-modules/Dropdown.module.scss";

interface IProps {
  variants: any;
  isMobile: boolean;
}

const DisciplinesFilter = ({ variants, isMobile }: IProps) => {
  const [show, setShow] = useState(false);
  const { data } = useDisciplinesQuery();
  const [title, setTitle] = useState("");

  const [disciplines, setDisciplines] = useQueryParam(
    "disciplines",
    withDefault(NumericArrayParam, [])
  );

  const disciplineHandler = (item: IDiscipline) => {
    const findItem = disciplines.find((el) => el === item.id);
    // If item exists in array it gets filtered out, else it gets added to array
    if (findItem) {
      const filterItem = disciplines.filter((el) => el !== item.id);
      setDisciplines(filterItem);
    } else {
      setDisciplines([...disciplines, item.id]);
    }
  };

  useEffect(() => {
    // Sets the title
    if (data?.disciplines && disciplines.length === 1) {
      const findTitle = data.disciplines.find((item) => {
        if (item.id === disciplines[0]) return item.title;
      });
      setTitle(findTitle?.title || "No Title Found");
    } else if (disciplines.length > 1) {
      setTitle("Multiple Disciplines");
    } else {
      setTitle("Select Discipline");
    }
  }, [disciplines, data]);

  // Add boolean property named active to every element
  // with the value of true to elements that are selected
  const disciplineList = data?.disciplines?.map((item) => {
    const found = disciplines.some((el) => el === item.id);
    return {
      ...item,
      active: found,
    };
  });

  // setShow to false to prevent glitch when variants change in dropdown menu
  useEffect(() => {
    setShow(false);
  }, [isMobile]);

  useEffect(() => {
    // Prevent scrolling on body
    isMobile && show
      ? document.body.classList.add("body-prevent-scroll")
      : document.body.classList.remove("body-prevent-scroll");
  }, [show, isMobile]);

  const handleClickOutside = () => {
    setShow(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <div
      className={`dropdown ${dropdown.default} ${show ? dropdown.active : ""}`}
      ref={dropdownRef}
    >
      <div className="input-text">
        <label htmlFor="discipline">Discipline</label>
      </div>
      <div onClick={() => setShow(!show)} className="show-dropdown-menu-btn">
        <span
          className={disciplines.length >= 1 ? "default-text" : "placeholder"}
        >
          {title}
        </span>
        <motion.div
          className="icon-container"
          initial="hidden"
          animate={{ rotate: isMobile && show ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/icons/chevron-down-solid.svg"
            alt="Chevron"
            width={18}
            height={18}
            layout="fixed"
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
            <ul className="dropdown-list">
              <li
                className="list-item"
                onClick={() => setDisciplines(undefined)}
              >
                <span>No Selection</span>
              </li>
              {disciplineList?.map((item) => (
                <li
                  key={item.id}
                  className={`list-item${item.active && " active"}`}
                  onClick={() => disciplineHandler(item)}
                >
                  <span>{item.title}</span>
                </li>
              ))}
              {data?.disciplines && data.disciplines.length > 50 && (
                <li
                  className="list-item"
                  onClick={() => setDisciplines(undefined)}
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

export default DisciplinesFilter;
