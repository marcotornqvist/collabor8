import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import ProfileImage from "@/components-modules/global/ProfileImage";
import React from "react";
import button from "@/styles-modules/Button.module.scss";
import useHover from "@/hooks/useHover";
import { User } from "./Members";

interface IProps {
  isMobile: boolean;
  user: User;
  addUser?: (user: User) => void;
  removeUser?: (user: User) => void;
}

const ProfileItem = ({ isMobile, user, addUser, removeUser }: IProps) => {
  const { profile } = user;
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();
  return (
    <>
      <motion.li
        initial={"hidden"}
        animate={"visible"}
        variants={fadeInVariants}
      >
        <div className="profile-details">
          <ProfileImage
            size={isMobile ? "small" : "medium"}
            profileImage={profile?.profileImage}
            priority={true}
            firstName={profile?.firstName}
            lastName={profile?.lastName}
          />
          <div className="wrapper">
            <div className="inner-wrapper">
              <span className="name">
                {profile?.firstName} {profile?.lastName}
              </span>
            </div>
            <span className="info-text">
              {profile?.discipline?.title}
              {profile?.discipline?.title && profile?.country && ", "}
              {profile?.country}
            </span>
          </div>
        </div>
        <div className="button-container">
          {addUser && (
            <button
              className={button.lightGreen}
              onClick={(e) => {
                e.preventDefault();
                addUser(user);
              }}
            >
              Add
            </button>
          )}
          {removeUser && (
            <button
              ref={hoverRef}
              className={isHovered ? button.red : button.lightGreen}
              onClick={(e) => {
                e.preventDefault();
                removeUser(user);
              }}
            >
              {isHovered ? "Remove" : "Pending"}
            </button>
          )}
        </div>
      </motion.li>
    </>
  );
};

export default ProfileItem;
