import Image from "next/image";
import { users_users } from "generated/users";
import AliceCarousel from "react-alice-carousel";
import ProfileImage from "@components-modules/global/ProfileImage";
import Link from "next/link";
import Settings from "./Settings";

interface IProps {
  item: users_users;
  key: string;
}

const ProfileItem = ({ item }: IProps) => {
  const { id, username, profile } = item;

  const content = (
    <div className="carousel-item content-item" data-value="1" key={1}>
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
  );

  const settings = (
    <div className="carousel-item settings-item" data-value="2" key={2}>
      <div className="wrapper">
        <Settings id={id} />
      </div>
    </div>
  );

  const items = [content, settings];

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
