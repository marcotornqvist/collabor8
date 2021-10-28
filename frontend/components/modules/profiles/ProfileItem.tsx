import Image from "next/image";
import { users_users } from "generated/users";
import AliceCarousel from "react-alice-carousel";
import ProfileImage from "@components-modules/global/ProfileImage";
import Link from "next/link";
import Settings from "./Settings";
import { useState } from "react";

interface IProps {
  item: users_users;
  key: string;
}

const createItems = (length: any, [handleClick]: any, item: users_users) => {
  let deltaX = 0;
  let difference = 0;
  const swipeDelta = 20;

  const { id, username, profile } = item;

  return Array.from({ length }).map((item, i) => (
    <div
      data-value={i + 1}
      className="item"
      onMouseDown={(e) => (deltaX = e.pageX)}
      onMouseUp={(e) => (difference = Math.abs(e.pageX - deltaX))}
      onClick={() => difference < swipeDelta && handleClick(i)}
      key={i}
    >
      {i === 0 ? (
        <div className="carousel-item content-item">
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
        </div>
      ) : (
        <div className="carousel-item settings-item">
          <div className="wrapper">
            <Settings id={id} />
          </div>
        </div>
      )}
    </div>
  ));
};

const ProfileItem = ({ item }: IProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items] = useState(createItems(2, [setActiveIndex], item));

  const toggleSlide = () => {
    activeIndex === 0 ? setActiveIndex(1) : setActiveIndex(0);
  };

  return (
    <div className="profile-item">
      <div className="carousel">
        <AliceCarousel
          mouseTracking
          disableDotsControls
          disableButtonsControls
          items={items}
          activeIndex={activeIndex}
        />
        <div className="carousel-button" onClick={toggleSlide}>
          <Image
            src="/icons/cog-solid-fa-green.svg"
            alt="Cog wheel"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
