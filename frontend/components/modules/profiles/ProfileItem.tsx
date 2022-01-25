import React, { RefObject, useEffect, useRef, useState } from "react";
import { users_users } from "generated/users";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import ProfileImage from "@/components-modules/global/ProfileImage";
import Link from "next/link";
import Settings from "./Settings";
import button from "@/styles-modules/Button.module.scss";
import("scroll-behavior-polyfill");

interface IProps {
  item: users_users;
  key: string;
}

type RefType = RefObject<HTMLDivElement>;

const ProfileItem = ({ item }: IProps) => {
  const { id, username, profile } = item;
  const [toggle, setToggle] = useState(false);

  const carouselRef: RefType = useRef<HTMLDivElement>(null);
  const contentRef: RefType = useRef<HTMLDivElement>(null);
  const settingsRef: RefType = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  // Sets the menu all the way to right to persist position
  useEffect(() => {
    if (toggle && carouselRef.current) {
      carouselRef.current.scroll({
        left: 1000,
      });
    }
  }, [width]);

  const handleToggle = () => {
    if (carouselRef.current) {
      carouselRef.current.scroll({
        left: toggle ? -24 : 1000,
        behavior: "smooth",
      });

      setToggle(!toggle);
    }
  };

  return (
    <div className="profile-item">
      <div className="toggle-button-wrapper">
        <div className="toggle-button" onClick={() => handleToggle()}>
          <Image
            src="/icons/cog-solid-fa-green.svg"
            alt="Cog wheel"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="carousel" ref={carouselRef}>
        <div className="profile-content carousel-item" ref={contentRef}>
          <div className="wrapper">
            <ProfileImage profileImage={profile?.profileImage} />
            <h4>
              {profile?.firstName} {profile?.lastName}
            </h4>
            <span>{profile?.discipline?.title}</span>
          </div>
          <Link href={`/profile/${username}`}>
            <a>
              <button className={`${button.lightGreen} check-profile-btn`}>
                See Profile
              </button>
            </a>
          </Link>
        </div>
        <Settings
          id={id}
          username={username}
          ref={settingsRef}
          isVisible={toggle}
        />
      </div>
    </div>
  );
};

export default ProfileItem;
