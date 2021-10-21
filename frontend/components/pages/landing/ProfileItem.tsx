import React from "react";
import Image from "next/image";
import ProfileImage from "@components-modules/global/ProfileImage";
import Link from "next/link";
import { users_users } from "generated/users";
import AddUserButton from "@components-pages/landing/AddUserButton";

interface IProps {
  item: users_users;
}

const ProfileItem = ({ item }: IProps) => {
  const { id, username, profile } = item;

  return (
    <div className="profile-item">
      <div className="box">
        <div className="settings-button">
          <Image
            src="/icons/cog-solid-fa-green.svg"
            alt="Cog wheel"
            width={24}
            height={24}
            className="settings-button"
          />
        </div>
        <div className="content">
          <ProfileImage size={80} profileImage={profile?.profileImage} />
          <h4>
            {profile?.firstName} {profile?.lastName}
          </h4>
          <span>
            {profile?.discipline?.title} | {profile?.country}
          </span>
        </div>
        {/* <AddUserButton id={id} /> */}
        <Link href={`/profile/${username}`}>
          <a>
            <button className="check-profile-btn">See Profile</button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProfileItem;
