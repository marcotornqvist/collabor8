import React from "react";
import styles from "@styles-modules/Button.module.scss";

const DeleteImage = () => {
  return (
    <button className={`${styles.default} ${styles.lightRed}`}>
      Delete Picture
    </button>
  );
};

export default DeleteImage;
