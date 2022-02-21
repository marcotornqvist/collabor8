import { useEffect } from "react";
import { authState } from "store";
import { useSnapshot } from "valtio";
import { UsersFilterArgs, useUsersLazyQuery } from "generated/graphql";
import ProfileItem from "../../modules/profile-item/ProfileItem";
import ProfileSkeleton from "../../modules/profile-item/ProfileSkeleton";

// Check that user is not a friend
// Check that user is not you when returning

const Profiles = ({
  after,
  before,
  first,
  last,
  searchText,
  disciplines,
  country,
  sort,
}: UsersFilterArgs) => {
  const { loading } = useSnapshot(authState);
  const [users, { data }] = useUsersLazyQuery({
    variables: {
      data: {
        first,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading) {
      users();
    }
  }, [loading]);

  return (
    <section className="profiles">
      <div className="container">
        <h2>Recent Profiles</h2>
        <div className="grid">
          {data?.users
            ? data.users.map((item) => (
                <ProfileItem
                  key={item.id}
                  id={item.id}
                  username={item.username}
                  firstName={item.profile?.firstName}
                  lastName={item.profile?.lastName}
                  profileImage={item.profile?.profileImage}
                  title={item.profile?.discipline?.title}
                  country={item.profile?.country}
                />
              ))
            : [1, 2, 3].map((n) => <ProfileSkeleton key={n} />)}
        </div>
      </div>
    </section>
  );
};

export default Profiles;
