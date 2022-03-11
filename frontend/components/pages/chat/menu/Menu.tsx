import React from "react";
import Contacts from "./Contacts";
import Projects from "./Projects";
import styles from "@/styles-modules/ChatMenu.module.scss";
import { useRouter } from "next/router";

interface IProps {
  isMobile: boolean;
}

const Menu = ({ isMobile }: IProps) => {
  let {
    query: { chatId },
  } = useRouter();
  chatId = typeof chatId === "string" ? chatId : "";

  return (
    <div className={`menu ${styles.menu}`}>
      <Projects chatId={chatId} isMobile={isMobile} />
      <Contacts chatId={chatId} isMobile={isMobile} />
    </div>
  );
};

export default Menu;
