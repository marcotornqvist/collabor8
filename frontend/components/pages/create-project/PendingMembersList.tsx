import React from "react";
import ProfileItem from "./ProfileItem";
import styles from "@/styles-modules/Members.module.scss";
import { User } from "./Members";

interface IProps {
  members?: User[];
  isMobile: boolean;
  removeUser: (user: User) => void;
}

const PendingMembersList = ({ members, removeUser, isMobile }: IProps) => {
  return (
    <div className={`pending-members-list ${styles.members}`}>
      <h3>Pending Members</h3>
      <ul>
        {members?.map((item) => (
          <ProfileItem
            key={item.id}
            isMobile={isMobile}
            user={item}
            removeUser={removeUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default PendingMembersList;
