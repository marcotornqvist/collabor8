import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { IDiscipline } from "@/types-interfaces/form";
import { UpdateProfileMutation, useDisciplinesQuery } from "generated/graphql";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import dropdown from "@/styles-modules/Dropdown.module.scss";
import ChevronIcon from "@/components-modules/global/ChevronIcon";

interface IProps {
  setFieldValue: (
    field: "discipline",
    // value: IDiscipline | null,
    value: NonNullable<UpdateProfileMutation["updateProfile"]>["discipline"],
    shouldValidate?: boolean | undefined
  ) => void;
  discipline: NonNullable<UpdateProfileMutation["updateProfile"]>["discipline"];
  loading: boolean;
  variants: Variants;
  isMobile: boolean;
  error: string;
  lastSubmitValue?: IDiscipline | null;
}

const DisciplinesDropdown = ({
  setFieldValue,
  discipline,
  loading,
  variants,
  isMobile,
  error,
  lastSubmitValue,
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

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <div
      className={`dropdown ${dropdown.default} ${show ? dropdown.active : ""}`}
      ref={dropdownRef}
    >
      <div className="input-text">
        <label htmlFor="discipline">Discipline</label>
        {!error && lastSubmitValue?.id === discipline?.id && discipline && (
          <span className="success-message">Discipline is valid</span>
        )}
      </div>
      <div onClick={() => setShow(!show)} className="show-dropdown-menu-btn">
        <span className={discipline ? "default-text" : "placeholder"}>
          {!loading
            ? discipline
              ? discipline.title
              : "Select Discipline"
            : ""}
        </span>
        <ChevronIcon
          isMobile={isMobile}
          show={show}
          initialRotate={"rotate(0deg)"}
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
              <span className="selected-title">
                {discipline ? discipline.title : "Select Discipline"}
              </span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list single-selection" ref={listRef}>
              <li
                ref={!discipline ? activeRef : null}
                onClick={() => {
                  setFieldValue("discipline", null);
                  setShow(false);
                }}
                className={`list-item${!discipline ? " active" : ""}`}
              >
                <span>No Selection</span>
              </li>
              {data?.disciplines?.map((item) => (
                <li
                  ref={discipline?.id === item.id ? activeRef : null}
                  key={item.id}
                  className={`list-item${
                    discipline?.id === item.id ? " active" : ""
                  }`}
                  onClick={() => {
                    setFieldValue("discipline", item);
                    setShow(false);
                  }}
                >
                  <span>{item.title}</span>
                </li>
              ))}
              {data?.disciplines && data.disciplines.length > 50 && (
                <li
                  onClick={() => {
                    setFieldValue("discipline", null);
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

export default DisciplinesDropdown;
