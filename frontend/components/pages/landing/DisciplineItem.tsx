import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const variants = {
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

interface IProps {
  title: string;
  src: string;
  link: string;
  alt: string;
}

const DisciplineItem = ({ title, src, link, alt }: IProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={"/profiles/" + link}>
      <a className="grid-item">
        <motion.div
          className="image-container"
          animate={loaded ? "visible" : "hidden"}
          variants={variants}
        >
          {loaded && <h3>{title}</h3>}
          <Image
            onLoadingComplete={(e) => {
              setLoaded(true);
            }}
            src={src}
            alt={alt} 
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
          />
        </motion.div>
      </a>
    </Link>
  );
};

export default DisciplineItem;
