import ProfileItem from "./ProfileItem";
import { User } from "./Members";
import styles from "@/styles-modules/Members.module.scss";
import MemberSkeleton from "@/components-modules/global/MemberSkeleton";

interface IProps {
  users?: User[];
  isMobile: boolean;
  addUser: (user: User) => void;
  loading: boolean;
  showSkeleton: boolean;
}

const UserList = ({
  isMobile,
  users,
  addUser,
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
      {!showSkeleton && !loading && users && users.length === 0 && (
        <span className="no-users-found">No users found...</span>
      )}
    </div>
  );
};

export default UserList;
