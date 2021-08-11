import React from "react";
import styles from "@styles-modules/Button.module.scss";
import Menu from "./Menu";
import SearchInput from "./SearchInput";

const Dropdown = () => {
  return (
    <div className={styles.btn}>
      <SearchInput />
      <Menu />
    </div>
  );
};

export default Dropdown;
