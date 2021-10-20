import Image from "next/image";
import styles from "@styles-modules/ProfileImage.module.scss";

interface Props {
  loading?: boolean;
  profileImage?: string | null;
  size: number;
  quality?: number;
}

const ProfileImage = ({ loading, profileImage, size, quality }: Props) => {
  return (
    <div
      className={`${styles.profileImage}`}
      style={{ width: size, height: size }}
    >
      {!loading && (
        <>
          {profileImage ? (
            <Image
              src={profileImage}
              alt="profile image"
              quality={quality || 75}
              layout="fill"
              objectFit="cover"
            />
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
