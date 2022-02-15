import { User } from "./Form";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import ProfileImage from "@/components-modules/global/ProfileImage";
import React from "react";
import button from "@/styles-modules/Button.module.scss";
import Link from "next/link";
import useHover from "@/hooks/useHover";

interface IProps {
  isMobile: boolean;
  user: User;
  addUser?: (user: User) => void;
  removeUser?: (user: User) => void;
}

const ProfileItem = ({ isMobile, user, addUser, removeUser }: IProps) => {
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
            profileImage={user.profile?.profileImage}
            priority={true}
            firstName={user.profile?.firstName}
            lastName={user.profile?.lastName}
          />
          <div className="wrapper">
            <div className="inner-wrapper">
              <Link href={`/profile/${user.username}`}>
                <a>
                  <span className="name">
                    {user.profile?.firstName} {user.profile?.lastName}
                  </span>
                </a>
              </Link>
            </div>
            <div className="info-text">
              <span className="discipline">
                {user.profile?.discipline?.title}
              </span>
              {user.profile?.discipline?.title && user.profile?.country && (
                <span className="pipe">|</span>
              )}
              <span className="country">{user.profile?.country}</span>
            </div>
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
