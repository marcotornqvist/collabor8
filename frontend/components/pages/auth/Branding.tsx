import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const textVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      damping: 20,
      stiffness: 125,
      type: "spring",
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Branding = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <aside>
      <motion.div
        className="image-container"
        animate={loaded ? "visible" : "hidden"}
        variants={imageVariants}
      >
        {loaded && (
          <div className="container">
            <motion.h1
              className="hero-text"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Find other creative people to collaborate with.
            </motion.h1>
          </div>
        )}
        <Image
          onLoad={(e) => {
            setLoaded(true);
          }}
          src="https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/more-big.jpg"
          alt="more"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </motion.div>
    </aside>
  );
};

export default Branding;
