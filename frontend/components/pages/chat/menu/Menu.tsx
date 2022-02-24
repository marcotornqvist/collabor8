import React from "react";
import Contacts from "./Contacts";
import Projects from "./Projects";
import styles from "@/styles-modules/ChatMenu.module.scss";

interface IProps {
  id: string;
  isMobile: boolean;
}

const Menu = ({ id, isMobile }: IProps) => {
  return (
    <div className={`menu ${styles.menu}`}>
      <Projects id={id} isMobile={isMobile} />
      <Contacts isMobile={isMobile} />
    </div>
  );
};

export default Menu;
