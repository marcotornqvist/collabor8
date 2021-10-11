import { useState } from "react";
import Image from "next/image";
import styles from "@styles-modules/ProfileImage.module.scss";

interface Props {
  loading: boolean;
  profileImage?: string | null;
  size: number;
  quality: number;
  show: boolean;
  setShow: (show: boolean) => void;
}

const ProfileImage = ({
  loading,
  profileImage,
  size,
  quality,
  show,
  setShow,
}: Props) => {
  return (
    <div
      className={`${styles.profileImage}`}
      style={{ width: size, height: size }}
      onClick={() => setShow(!show)}
    >
      {!loading && (
        <>
          {profileImage ? (
            <Image
              src={profileImage}
              alt="profile image"
              width={size - 6}
              height={size - 6}
              layout="fixed"
              quality={quality}
            />
          ) : (
            <Image
              src="/icons/user-solid-green.svg"
              alt="profile image"
              width={size - 16}
              height={size - 16}
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
