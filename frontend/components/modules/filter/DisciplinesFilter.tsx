import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useDisciplinesQuery } from "generated/graphql";
import {
  useQueryParam,
  withDefault,
  NumericArrayParam,
} from "next-query-params";
import { IDiscipline } from "@/types-interfaces/form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import dropdown from "@/styles-modules/Dropdown.module.scss";
import ChevronIcon from "../global/ChevronIcon";
import Image from "next/image";

interface IProps {
  variants: Variants;
  isMobile: boolean;
}

const DisciplinesFilter = ({ variants, isMobile }: IProps) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const { data } = useDisciplinesQuery();

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
              <span className="selected-title">{title}</span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list multi-selections">
              <li
                className="list-item"
                onClick={() => setDisciplines(undefined)}
              >
                <span>No Selection</span>
              </li>
              {disciplineList?.map((item) => (
                <li
                  key={item.id}
                  className={`list-item${item.active ? " active" : ""}`}
                  onClick={() => disciplineHandler(item)}
                >
                  <span>{item.title}</span>
                  <div className="check-circle">
                    {item.active && (
                      <Image
                        src="/icons/check-solid-white.svg"
                        alt="Checkmark"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    )}
                  </div>
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
