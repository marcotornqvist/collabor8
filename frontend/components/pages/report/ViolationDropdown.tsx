import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Violation } from "generated/graphql";
import { ChevronRotate } from "types/types";
import { dropdownVariants } from "utils/variants";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import dropdown from "@/styles-modules/Dropdown.module.scss";
import ChevronIcon from "@/components-modules/global/ChevronIcon";
import useIsMobile from "@/hooks/useIsMobile";

interface IProps {
  setFieldValue: (
    field: "violation",
    value: Violation | null,
    shouldValidate?: boolean | undefined
  ) => void;
  selected: Violation | null;
  loading?: boolean;
  error: string;
  lastSubmitValue?: Violation | null;
  chevronRotate?: ChevronRotate;
}

const ViolationDropdown = ({
  setFieldValue,
  selected,
  loading = false,
  error,
  lastSubmitValue,
  chevronRotate,
}: IProps) => {
  const [show, setShow] = useState(false);
  const { isMobile } = useIsMobile();

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
      // scrolls screen to center
      listRef.current.scrollIntoView({ block: "center" });
      // Scrolls list to activeElementY y-axis position
      listRef.current.scroll({ top: activeElementY });
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

  const list = [
    { title: "Something Else", violation: Violation.Somethingelse },
    { title: "Fake", violation: Violation.Fake },
    { title: "Harrasment", violation: Violation.Harrasment },
    { title: "Adult Content", violation: Violation.Adultcontent },
    { title: "Plagiarism", violation: Violation.Plagiarism },
    { title: "Scam", violation: Violation.Scam },
    { title: "Spam", violation: Violation.Spam },
  ];

  // Returns title from list by selected violation
  const title = list?.find((item) => item.violation === selected)?.title;

  return (
    <div
      className={`dropdown ${dropdown.default} ${show ? dropdown.active : ""}`}
      ref={dropdownRef}
    >
      <div className="input-text">
        <label htmlFor="violation">Violation</label>
        {!error && selected && lastSubmitValue === selected && (
          <span className="success-message">Violation is valid</span>
        )}
      </div>
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="show-dropdown-menu-btn"
      >
        <span className={title ? "default-text" : "placeholder"}>
          {!loading ? (title ? title : "Select Violation") : ""}
        </span>
        <ChevronIcon
          isMobile={isMobile}
          show={show}
          chevronRotate={chevronRotate}
        />
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="dropdown-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={
              isMobile ? dropdownVariants.slideIn : dropdownVariants.desktop
            }
          >
            <div className="top-bar" onClick={() => setShow(false)}>
              <span className="selected-title">
                {title ? title : "Select Violation"}
              </span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list single-selection" ref={listRef}>
              {list.map((item) => (
                <li
                  ref={selected === item.violation ? activeRef : null}
                  className={`list-item${
                    selected === item.violation ? " active" : ""
                  }`}
                  onClick={() => {
                    setFieldValue("violation", item.violation);
                    setShow(false);
                  }}
                  key={item.title}
                >
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViolationDropdown;
