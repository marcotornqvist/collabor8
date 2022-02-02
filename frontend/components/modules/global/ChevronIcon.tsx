import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface IProps {
  show: boolean;
  isMobile: boolean;
  initialRotate?:
    | "rotate(0deg)"
    | "rotate(90deg)"
    | "rotate(180deg)"
    | "rotate(270deg)";
}

const ChevronIcon = ({
  show,
  isMobile,
  initialRotate = "rotate(0deg)",
}: IProps) => {
  return (
    <motion.div
      className="chevron-icon icon-container"
      initial="hidden"
      animate={{
        rotate: !isMobile && show ? 180 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="icon" style={{ transform: initialRotate }}>
        <Image
          src="/icons/chevron-down-solid.svg"
          alt="Chevron"
          width={18}
          height={18}
          layout="fixed"
        />
      </div>
    </motion.div>
  );
};

export default ChevronIcon;
