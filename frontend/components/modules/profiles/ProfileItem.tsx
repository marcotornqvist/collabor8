import React, { useState } from "react";
import Image from "next/image";
import { users_users } from "generated/users";
import AliceCarousel from "react-alice-carousel";
import ProfileImage from "@components-modules/global/ProfileImage";
import Link from "next/link";
import AddUserButton from "./AddUserButton";
import BlockUserButton from "./BlockUserButton";

interface IProps {
  item: users_users;
}

const ProfileItem = ({ item }: IProps) => {
  const { id, username, profile } = item;

  const items = [
    <div className="carousel-item settings-item" data-value="2">
      <div className="wrapper">
        <ul className="settings">
          <AddUserButton id={id} />
          <Link href={`/report/user/${id}`}>
            <a>
              <li>
                <span>Report User</span>
              </li>
            </a>
          </Link>
          <BlockUserButton id={id} />
        </ul>
      </div>
    </div>,
    <div className="carousel-item content-item" data-value="1">
      <div className="wrapper">
        <div className="content">
          <ProfileImage size={80} profileImage={profile?.profileImage} />
          <h4>
            {profile?.firstName} {profile?.lastName}
          </h4>
          <span>{profile?.discipline?.title}</span>
        </div>
        <Link href={`/profile/${username}`}>
          <a>
            <button className="check-profile-btn">See Profile</button>
          </a>
        </Link>
      </div>
    </div>,
  ];

  const menuButton = () => {
    return (
      <div className="menu-button">
        <Image
          src="/icons/cog-solid-fa-green.svg"
          alt="Cog wheel"
          width={24}
          height={24}
        />
      </div>
    );
  };

  return (
    <div className="profile-item">
      <div className="carousel">
        <AliceCarousel
          items={items}
          infinite={true}
          disableSlideInfo={true}
          disableDotsControls={true}
          renderPrevButton={menuButton}
        />
      </div>
    </div>
  );
};

export default ProfileItem;
