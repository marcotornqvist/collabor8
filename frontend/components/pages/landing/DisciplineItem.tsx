import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { imageFadeInVariants } from "utils/variants";

interface IProps {
  title: string;
  src: string;
  link?: number;
  alt: string;
}

const DisciplineItem = ({ title, src, link, alt }: IProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={{
        pathname: `/profiles`,
        query: link ? { disciplines: link } : null,
      }}
    >
      <a className="grid-item">
        <motion.div
          className="image-container"
          animate={loaded ? "visible" : "hidden"}
          variants={imageFadeInVariants}
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
