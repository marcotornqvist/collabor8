import { useState } from "react";
import { motion } from "framer-motion";
import { imageFadeInVariants } from "utils/variants";
import Image from "next/image";

const Branding = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <aside>
      <motion.div
        className="image-container"
        animate={loaded ? "visible" : "hidden"}
        variants={imageFadeInVariants}
      >
        {loaded && (
          <div className="container">
            <motion.h1
              className="hero-text"
              initial="hidden"
              animate="visible"
              variants={imageFadeInVariants}
            >
              Find other creative people to collaborate with.
            </motion.h1>
          </div>
        )}
        <Image
          onLoadingComplete={(e) => {
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
