import React, { useEffect } from "react";
import styles from "@/styles-modules/Navigation.module.scss";

interface IProps {
  selected: string;
  setNavigation: (navigation: string) => void;
  items: string[];
}

const NavigationSlide = ({ selected, setNavigation, items }: IProps) => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [selected]);

  return (
    <nav className={`navigation-slide ${styles.slide}`}>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={`navigation-item${selected === item ? " active" : ""}`}
            onClick={() => setNavigation(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationSlide;
