import { useEffect } from "react";
import { authState } from "store";
import { useSnapshot } from "valtio";
import { Sort, useUsersLazyQuery } from "generated/graphql";
import { isNumbersArray } from "utils/helpers";
import { useQueryParams, NumericArrayParam } from "next-query-params";
import { singleStringParam } from "utils/customQueryParams";
import ProfileItem from "@/components-modules/profileItem/ProfileItem";
import ProfileSkeleton from "@/components-modules/profileItem/ProfileSkeleton";

const ProfileList = () => {
  const [query, setQuery] = useQueryParams({
    search: singleStringParam,
    country: singleStringParam,
    disciplines: NumericArrayParam,
    sort: singleStringParam,
  });

  const { loading } = useSnapshot(authState);

  const [getUsers, { data }] = useUsersLazyQuery({
    variables: {
      data: {
        searchText: query.search,
        country: query.country,
        disciplines: isNumbersArray(query.disciplines),
        sort: query.sort !== "asc" ? Sort.Desc : Sort.Asc,
      },
    },
  });

  useEffect(() => {
    if (!loading) {
      getUsers();
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
