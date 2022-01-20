import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import image from "@styles-modules/Image.module.scss";

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
  profileImage?: string | null;
  size?: number;
  priority?: boolean;
}

const ProfileImage = ({ size = 40, profileImage, priority = false }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setError(false);
  }, [profileImage]);

  return (
    <div className={`profile-image ${image.profile}`}>
      {!error && profileImage && (
        <motion.div
          className="image-container"
          animate={imageLoaded ? "visible" : "hidden"}
          variants={variants}
        >
          <Image
            onLoadingComplete={(e) => {
              setImageLoaded(true);
            }}
            onError={(e) => {
              setError(true);
            }}
            src={profileImage}
            alt="profile image"
            layout="fill"
            objectFit="cover"
            className="profile"
            priority={priority ? true : false}
          />
        </motion.div>
      )}
      <AnimatePresence>
        {(profileImage === null || error) && (
          <motion.div
            className="image-container"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <Image
              src="/icons/user-solid-green.svg"
              alt="profile image"
              width={size}
              height={size}
              layout="fixed"
              className="user-icon"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileImage;
