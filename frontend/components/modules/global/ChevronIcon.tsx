import { motion } from "framer-motion";
import { ChevronRotate } from "types/types";
import Image from "next/image";

interface IProps {
  show: boolean;
  isMobile: boolean;
  chevronRotate?: ChevronRotate;
}

const ChevronIcon = ({
  show,
  isMobile,
  chevronRotate = "rotate(0deg)",
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
      <div className="icon" style={{ transform: chevronRotate }}>
        <Image
          src="/icons/chevron-down-solid.svg"
          alt={"Chevron"}
          width={18}
          height={18}
          layout="fixed"
        />
      </div>
    </motion.div>
  );
};

export default ChevronIcon;
