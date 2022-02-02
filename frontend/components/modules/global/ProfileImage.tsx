import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import image from "@/styles-modules/Image.module.scss";
import { imageFadeInVariants } from "utils/variants";

interface Props {
  profileImage?: string | null;
  size?: number;
  priority?: boolean;
}

const ProfileImage = ({ size = 40, profileImage, priority = false }: Props) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [profileImage]);

  return (
    <div className={`profile-image ${image.profile}`}>
      <AnimatePresence>
        {!error && profileImage && (
          <motion.div
            className="image-container"
            initial="hidden"
            animate="visible"
            variants={imageFadeInVariants}
          >
            <Image
              onError={() => setError(true)}
              src={profileImage}
              alt="profile image"
              layout="fill"
              objectFit="cover"
              className="profile"
              priority={priority ? true : false}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(error || profileImage === null) && (
          <motion.div
            className="image-container"
            initial="hidden"
            animate="visible"
            variants={imageFadeInVariants}
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
