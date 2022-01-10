import Image from "next/image";
import styles from "@styles-modules/ProfileImage.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

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

interface Props {
  loading?: boolean;
  profileImage?: string | null;
  size: number;
  quality?: number;
}

const ProfileImage = ({ loading, profileImage, size, quality }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
      className={`${styles.profileImage}`}
      style={{ width: size, height: size }}
    >
      {!loading && (
        <>
          {profileImage ? (
            <motion.div
              className="image-container"
              animate={imageLoaded ? "visible" : "hidden"}
              variants={variants}
            >
              <Image
                onLoadingComplete={(e) => {
                  setImageLoaded(true);
                }}
                src={profileImage}
                alt="profile image"
                quality={quality || 75}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          ) : (
            <Image
              src="/icons/user-solid-green.svg"
              alt="profile image"
              width={size - 24}
              height={size - 24}
              layout="fixed"
              className="user-icon"
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileImage;
