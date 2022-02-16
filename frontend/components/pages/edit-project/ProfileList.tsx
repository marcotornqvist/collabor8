import ProfileItem from "./ProfileItem";
import { User } from "./Members";
import styles from "@/styles-modules/Members.module.scss";
import MemberSkeleton from "@/components-modules/global/MemberSkeleton";

interface IProps {
  members?: User[];
  isMobile: boolean;
  addUser: (user: User) => void;
  loading: boolean;
  showSkeleton: boolean;
}

const ProfileList = ({
  isMobile,
  members,
  addUser,
  loading,
  showSkeleton,
}: IProps) => {
  return (
    <div className={`profile-list ${styles.members}`}>
      {!showSkeleton && members && members.length > 0 && (
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
      )}
      {(showSkeleton || loading) && (
        <ul>
          {[1, 2, 3].map((n) => (
            <MemberSkeleton key={n} />
          ))}
        </ul>
      )}
      {!showSkeleton && loading && members && members.length === 0 && (
        <span className="no-users-found">No users found...</span>
      )}
    </div>
  );
};

export default ProfileList;
