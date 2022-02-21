import React, { useState } from "react";
import { ProfileDetailsQuery } from "generated/graphql";
import { truncateText } from "utils/helpers";
import { ProfileStatus } from "@/types-enums/enums";
import ProfileImage from "@/components-modules/global/ProfileImage";
import useIsMobile from "@/hooks/useIsMobile";
import button from "@/styles-modules/Button.module.scss";
import Link from "next/link";
import ContactButtons from "@/components-modules/global/contact-buttons/ContactButtons";

export type Profile = NonNullable<
  ProfileDetailsQuery["userByUsername"]
>["profile"];

interface IProps {
  profile: Exclude<Profile, null | undefined>;
  profileStatus: ProfileStatus;
  username: string;
}

const ProfileCard = ({ profile, profileStatus, username }: IProps) => {
  const [show, setShow] = useState(false);
  const { isMobile } = useIsMobile();

  // const {add}

  return (
    <div className="profile-card">
      <ProfileImage
        size={isMobile ? "medium" : "large"}
        profileImage={profile.profileImage}
        firstName={profile.firstName}
        lastName={profile.lastName}
        priority={true}
      />
      <div className="wrapper">
        <h3 className="name">
          {profile.firstName} {profile.lastName}
        </h3>
        <span className="info-text">
          {profile.discipline?.title}
          {profile.discipline?.title && profile.country && ", "}
          {profile.country}
        </span>
        <div className="bio">
          <p className="text">
            {!show && profile.bio && profile.bio.length > 250
              ? truncateText(profile.bio, 250, "")
              : profile.bio}
            {profile.bio && profile.bio.length > 250 && (
              <span onClick={() => setShow(!show)} className="show-more-btn">
                {" "}
                {!show ? "Show More" : "Show Less"}
              </span>
            )}
          </p>
        </div>
        {profileStatus === ProfileStatus.Auth ? (
          <Link href="/settings/profile">
            <a>
              <button className={`profile-card-btn ${button.lightGreen}`}>
                Edit Profile
              </button>
            </a>
          </Link>
        ) : (
          <ContactButtons
            id={profile.userId}
            isVisible={true}
            username={username}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
