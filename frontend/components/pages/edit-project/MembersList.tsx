import React from "react";
import ProfileItem from "./ProfileItem";
import styles from "@/styles-modules/Members.module.scss";
import { IMember } from "./Members";

interface IProps {
  id: string;
  members?: IMember[];
  isMobile: boolean;
  loading: boolean;
}

const MembersList = ({ id, members, isMobile, loading }: IProps) => {
  return (
    <div className={`members-list ${styles.members}`}>
      {(!loading || (members && members.length > 0)) && (
        <>
          <h3>Members</h3>
          {members && members.length > 0 ? (
            <ul>
              {members?.map((item) => (
                <ProfileItem
                  key={item.user.id}
                  id={id}
                  isMobile={isMobile}
                  user={item.user}
                  status={item.status}
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
