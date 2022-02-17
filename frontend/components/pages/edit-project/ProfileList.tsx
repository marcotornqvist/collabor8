import ProfileItem from "./ProfileItem";
import { User } from "./Members";
import styles from "@/styles-modules/Members.module.scss";
import MemberSkeleton from "@/components-modules/global/MemberSkeleton";

interface IProps {
  id: string;
  users?: User[];
  isMobile: boolean;
  loading: boolean;
  showSkeleton: boolean;
}

const ProfileList = ({
  id,
  isMobile,
  users,
  loading,
  showSkeleton,
}: IProps) => {
  return (
    <div className={`profile-list ${styles.members}`}>
      {!showSkeleton && users && users.length > 0 && (
        <ul>
          {users?.map((item) => (
            <ProfileItem
              key={item.id}
              id={id}
              isMobile={isMobile}
              user={item}
              isAdded={false}
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
      {!showSkeleton && !loading && users && users.length === 0 && (
        <span className="no-users-found">No users found...</span>
      )}
    </div>
  );
};

export default ProfileList;
