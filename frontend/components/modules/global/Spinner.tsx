import { motion } from "framer-motion";
import styles from "@/styles-modules/Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <motion.h1
        animate={{ rotate: 360 }}
        transition={{
          flip: Infinity,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        8
      </motion.h1>
    </div>
  );
};

export default Spinner;
