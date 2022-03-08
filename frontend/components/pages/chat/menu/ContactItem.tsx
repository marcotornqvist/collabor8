import Link from "next/link";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import { layoutState } from "store";
import React from "react";
import ProfileImage from "@/components-modules/global/ProfileImage";

interface IProps {
  id: string;
  selected: boolean;
  newMessages: boolean;
  firstName?: string | null;
  lastName?: string | null;
  title?: string;
  country?: string | null;
  profileImage?: string | null | undefined;
}

const ContactItem = ({
  id,
  selected,
  newMessages,
  firstName,
  lastName,
  title,
  country,
  profileImage,
}: IProps) => {
  return (
    <motion.li
      className={`list-item${selected ? " active" : ""}${
        newMessages ? " new-messages-available" : ""
      }`}
      initial={"hidden"}
      animate={"visible"}
      variants={fadeInVariants}
      onClick={() => {
        layoutState.slide = true;
      }}
    >
      <Link href={`/chat/contact/${id}`}>
        <a>
          <div className="profile-details">
            <ProfileImage
              size={"small"}
              profileImage={profileImage}
              priority={true}
              firstName={firstName}
              lastName={lastName}
            />
            <div className="wrapper">
              <div className="inner-wrapper">
                <span className="name">
                  {firstName} {lastName}
                </span>
              </div>
              <span className="info-text">
                {title}
                {title && country && ", "}
                {country}
              </span>
            </div>
          </div>
          {newMessages && (
            <div className="new-messages-box">
              <span>1</span>
            </div>
          )}
        </a>
      </Link>
    </motion.li>
  );
};

export default ContactItem;
