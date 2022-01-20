import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DISCIPLINES } from "@operations-queries/disciplines";
import { disciplines } from "generated/disciplines";
import { AnimatePresence, motion } from "framer-motion";
import { IDiscipline } from "@types-interfaces/form";
import Image from "next/image";
import useWindowSize from "@hooks/useWindowSize";
import dropdown from "@styles-modules/Dropdown.module.scss";

interface IProps {
  discipline: IDiscipline | null;
  setDiscipline: (discipline: IDiscipline | null) => void;
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

const DisciplinesDropdown = ({ discipline, setDiscipline }: IProps) => {
  const [show, setShow] = useState(false);
  const { data } = useQuery<disciplines>(GET_DISCIPLINES);

  const { width } = useWindowSize();

  const activeRef: any = useRef<HTMLLIElement>(null);

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
    <div className={`dropdown ${dropdown.default}${show ? " active" : ""}`}>
      <div className="label-text">
        <label htmlFor="discipline">Discipline</label>
      </div>
      <div onClick={() => setShow(!show)} className="show-dropdown-menu-btn">
        {discipline?.title ? (
          <span>{discipline.title}</span>
        ) : (
          <span className="placeholder">Select Discipline</span>
        )}
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
                {discipline?.title ? discipline.title : "Select Country"}
              </span>
              <span className="close-btn">Close</span>
            </div>
            <ul className="dropdown-list">
              <li
                ref={!discipline?.id ? activeRef : null}
                onClick={() => {
                  setDiscipline(null);
                  setShow(false);
                }}
                className={`list-item${!discipline?.id ? " active" : ""}`}
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
                    setDiscipline({ id: item.id, title: item.title });
                    setShow(false);
                  }}
                >
                  <span>{item.title}</span>
                </li>
              ))}
              {data.disciplines && data.disciplines.length > 50 && (
                <li
                  onClick={() => {
                    setDiscipline(null);
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
