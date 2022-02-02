import { useEffect } from "react";
import { authState } from "store";
import { useSnapshot } from "valtio";
import { useUsersLazyQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { isNumbersArray } from "utils/helpers";
import ProfileItem from "@/components-modules/profileItem/ProfileItem";
import ProfileSkeleton from "@/components-modules/profileItem/ProfileSkeleton";

// Check that user is not a friend
// Check that user is not you when returning

const ProfileList = () => {
  const {
    query: { country, disciplines },
  } = useRouter();

  console.log(disciplines)

  const { loading } = useSnapshot(authState);
  const [users, { data }] = useUsersLazyQuery({
    variables: {
      data: {
        // first: 3,
        // country: typeof country === "string" ? country : undefined,
        disciplines: isNumbersArray(disciplines),
      },
    },
  });

  useEffect(() => {
    if (!loading) {
      users();
    }
  }, [loading]);

  return (
    <section className="profile-list">
      <div className="container">
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
                />
              ))
            : [1, 2, 3, 4, 5, 6].map((n) => <ProfileSkeleton key={n} />)}
        </div>
      </div>
    </section>
  );
};

export default ProfileList;
