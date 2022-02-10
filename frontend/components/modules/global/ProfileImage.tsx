import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import image from "@/styles-modules/Image.module.scss";
import { imageFadeInVariants } from "utils/variants";

interface Props {
  profileImage?: string | null;
  size: "small" | "medium" | "large";
  priority?: boolean;
  firstName?: string | null;
  lastName?: string | null;
}

const ProfileImage = ({
  size = "small",
  profileImage,
  priority = false,
  firstName,
  lastName,
}: Props) => {
  const [error, setError] = useState(false);

  const getSize = () => {
    if (size === "large") return 40;
    else if (size === "medium") return 32;
    else return 24;
  };

  const getClassName = () => {
    if (size === "large") return image.large;
    else if (size === "medium") return image.medium;
    else return image.small;
  };

  useEffect(() => {
    setError(false);
  }, [profileImage]);

  return (
    <div className={`profile-image ${image.profile} ${getClassName()}`}>
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
          <>
            {firstName && lastName ? (
              <motion.span
                className="fullname-short"
                initial="hidden"
                animate="visible"
                variants={imageFadeInVariants}
              >
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </motion.span>
            ) : (
              <motion.div
                className="image-container"
                initial="hidden"
                animate="visible"
                variants={imageFadeInVariants}
              >
                <Image
                  src="/icons/user-solid-green.svg"
                  alt="profile image"
                  width={getSize()}
                  height={getSize()}
                  layout="fixed"
                  className="user-icon"
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileImage;
