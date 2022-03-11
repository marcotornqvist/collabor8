import React from "react";
import ProfileImage from "@/components-modules/global/ProfileImage";
import styles from "@/styles-modules/MessageItem.module.scss";

interface IProps {
  side: "left" | "right";
  body: string;
  profileImage?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  isMobile: boolean;
}

const MessageItem = ({
  side,
  body,
  profileImage,
  firstName,
  lastName,
  isMobile,
}: IProps) => {
  return (
    <div
      className={`message-item ${styles.item} ${
        side === "left" ? styles.left : styles.right
      }`}
    >
      {/* {!isMobile && (
        <ProfileImage
          profileImage={profileImage}
          size="small"
          firstName={firstName && firstName.trim()}
          lastName={lastName && lastName.trim()}
        />
      )} */}
      <div className="wrapper">
        <div className="name">
          <small>
            {firstName} {lastName}
          </small>
        </div>
        <div className="message-box">
          <p>{body && body.trim()}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
