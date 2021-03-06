import ProfileImage from "@/components-modules/global/ProfileImage";
import React from "react";
import button from "@/styles-modules/Button.module.scss";
import chip from "@/styles-modules/Chips.module.scss";
import Link from "next/link";
import { ProjectByIdQuery, Role } from "generated/graphql";

// Nested user object type
type User = NonNullable<
  NonNullable<ProjectByIdQuery["projectById"]>["members"]
>[0]["user"];

interface IProps {
  isMobile: boolean;
  user: User;
  role: Role;
}

const ProfileItem = ({ isMobile, user, role }: IProps) => {
  return (
    <li>
      <div className="profile-details">
        <ProfileImage
          size={isMobile ? "small" : "medium"}
          profileImage={user.profile?.profileImage}
          firstName={user.profile?.firstName}
          lastName={user.profile?.lastName}
          priority={true}
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
            <div className={`chip ${chip.lightGreen}`}>
              <span>{role}</span>
            </div>
          </div>
          <span className="info-text">
            {user.profile?.discipline?.title}
            {user.profile?.discipline?.title && user.profile?.country && ", "}
            {user.profile?.country}
          </span>
        </div>
      </div>
      <Link href={`/profile/${user.username}`}>
        <a className="link-btn button-container">
          <button className={button.green}>See Profile</button>
        </a>
      </Link>
    </li>
  );
};

export default ProfileItem;
