import React, { RefObject, useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import ProfileImage from "@/components-modules/global/ProfileImage";
import Link from "next/link";
import Settings from "./Settings";
import profile from "@/styles-modules/ProfileItem.module.scss";
import button from "@/styles-modules/Button.module.scss";
import("scroll-behavior-polyfill");

interface Discipline {
  title: string;
}

interface IProps {
  key: string;
  id: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
  title?: string;
  country?: string | null;
}

type RefType = RefObject<HTMLDivElement>;

const ProfileItem = ({
  id,
  username,
  firstName,
  lastName,
  profileImage,
  title,
  country,
}: IProps) => {
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
    <div className={`profile-item ${profile.default}`}>
      <div className="toggle-button-wrapper">
        <div className="toggle-button" onClick={() => handleToggle()}>
          <Image
            src="/icons/cog-solid-fa-green.svg"
            alt="Cog wheel"
            width={24}
            height={24}
            layout="fixed"
          />
        </div>
      </div>
      <div className="carousel" ref={carouselRef}>
        <div className="profile-content carousel-item" ref={contentRef}>
          <div className="wrapper">
            <ProfileImage profileImage={profileImage} />
            <h4>
              {firstName} {lastName}
            </h4>
            <div className="info">{title && <span>{title}</span>} </div>
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
