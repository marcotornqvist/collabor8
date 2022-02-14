import React from "react";
import ProfileItem from "./ProfileItem";
import styles from "@/styles-modules/Members.module.scss";
import { User } from "./Members";

interface IProps {
  members?: User[];
  isMobile: boolean;
  addUser: (user: User) => void;
}

const ProfileList = ({ isMobile, members, addUser }: IProps) => {
  return (
    <div className={`profile-list ${styles.members}`}>
      <ul>
        {members?.map((item) => (
          <ProfileItem
            key={item.id}
            isMobile={isMobile}
            user={item}
            addUser={addUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
