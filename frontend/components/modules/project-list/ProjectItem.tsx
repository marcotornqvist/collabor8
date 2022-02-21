import React, { useState } from "react";
import { imageFadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import { objectPositionRegex } from "@/validations/regex";
import { truncateText } from "utils/helpers";
import button from "@/styles-modules/Button.module.scss";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles-modules/ProjectItem.module.scss";

interface IProps {
  id: string;
  title: string;
  src?: string | null;
  alt?: string | null;
  objectPosition?: string | null;
}

const ProjectItem = ({ id, title, src, alt, objectPosition }: IProps) => {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <div className={`project-item ${styles.item}`}>
      {src && (
        <motion.div
          className={`image-container`}
          animate={loaded && !imageError ? "visible" : "hidden"}
          variants={imageFadeInVariants}
        >
          <Image
            onLoadingComplete={() => {
              setLoaded(true);
            }}
            onError={() => {
              setImageError(true);
            }}
            src={src}
            alt={alt || undefined}
            layout="fill"
            objectFit="cover"
            objectPosition={objectPositionRegex(objectPosition)}
            quality={40}
          />
        </motion.div>
      )}
      {((loaded && imageError) || !src) && (
        <motion.div
          className="image-container"
          initial="hidden"
          animate="visible"
          variants={imageFadeInVariants}
        >
          <Image
            src="https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/more-small.jpg"
            alt="Person standing looking up"
            layout="fill"
            objectFit="cover"
            objectPosition={"50% 30%"}
            quality={40}
          />
        </motion.div>
      )}
      {/* Photographers join our action film set based in Helsinki! */}
      <div className="wrapper">
        <div className="title-container">
          <h4 className="title">{truncateText(title, 64)}</h4>
        </div>
        <Link href={`/project/${id}`}>
          <a>
            <button className={button.lightGreen}>
              <span>Show More</span>
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProjectItem;
