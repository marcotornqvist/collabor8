import Image from "next/image";
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
  profileImage?: string | null;
  size: number;
}

const ProfileImage = ({ size, profileImage }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="profile-image">
      <motion.div
        className="image-container"
        animate={imageLoaded ? "visible" : "hidden"}
        variants={variants}
      >
        {profileImage && (
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
            className={`profile${error ? " hide" : ""}`}
          />
        )}
        {/* Render image if profileImage doesn't exist or if image doesn't work */}
        {(!profileImage || error) && (
          <Image
            src="/icons/user-solid-green.svg"
            alt="profile image"
            width={size || 40}
            height={size || 40}
            layout="fixed"
            className="user-icon"
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProfileImage;
