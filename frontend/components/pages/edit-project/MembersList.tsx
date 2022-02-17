import React from "react";
import ProfileItem from "./ProfileItem";
import styles from "@/styles-modules/Members.module.scss";
import { User } from "./Members";

interface IProps {
  members?: User[];
  isMobile: boolean;
  loading: boolean;
}

const MembersList = ({ members, isMobile, loading }: IProps) => {
  return (
    <div className={`members-list ${styles.members}`}>
      {(!loading || (members && members.length > 0)) && (
        <>
          <h3>Members</h3>
          {members && members.length > 0 ? (
            <ul>
              {members?.map((item) => (
                <ProfileItem
                  key={item.id}
                  isMobile={isMobile}
                  user={item}
                  isAdded={true}
                />
              ))}
            </ul>
          ) : (
            <span className="no-members-selected">No members selected...</span>
          )}
        </>
      )}
    </div>
  );
};

export default MembersList;
