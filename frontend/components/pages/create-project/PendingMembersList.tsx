import React from "react";
import { User} from './Form'
import ProfileItem from "./ProfileItem";
import styles from "@/styles-modules/Members.module.scss";

interface IProps {
  members?: User[];
  isMobile: boolean;
  removeUser: (user: User) => void;
  loading: boolean;
}

const PendingMembersList = ({
  members,
  removeUser,
  isMobile,
  loading,
}: IProps) => {
  return (
    <div className={`pending-members-list ${styles.members}`}>
      {(!loading || (members && members.length > 0)) && (
        <>
          <h3>Pending Members</h3>
          {members && members.length > 0 ? (
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
          ) : (
            <span className="no-members-selected">No members selected...</span>
          )}
        </>
      )}
    </div>
  );
};

export default PendingMembersList;
