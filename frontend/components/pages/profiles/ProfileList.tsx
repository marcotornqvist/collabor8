import { useEffect, useState } from "react";
import { authState } from "store";
import { useSnapshot } from "valtio";
import {
  Sort,
  UsersQuery,
  UsersQueryVariables,
  useUsersLazyQuery,
} from "generated/graphql";
import { isNumbersArray } from "utils/helpers";
import { useQueryParams, NumericArrayParam } from "next-query-params";
import { singleStringParam } from "utils/customQueryParams";
import ProfileItem from "@/components-modules/profileItem/ProfileItem";
import ProfileSkeleton from "@/components-modules/profileItem/ProfileSkeleton";
import button from "@/styles-modules/Button.module.scss";

const ProfileList = () => {
  const [preventQuery, setPreventQuery] = useState(false);
  const [disableMore, setDisableMore] = useState(false);
  const [query, setQuery] = useQueryParams({
    search: singleStringParam,
    country: singleStringParam,
    disciplines: NumericArrayParam,
    sort: singleStringParam,
  });

  const { loading } = useSnapshot(authState);

  const [getUsers, { data, loading: dataLoading, fetchMore }] =
    useUsersLazyQuery({
      variables: {
        data: {
          // first: 2,
          searchText: query.search,
          country: query.country,
          disciplines: isNumbersArray(query.disciplines),
          sort: query.sort !== "asc" ? Sort.Desc : Sort.Asc,
        },
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    if (!loading) {
      getUsers();
    }
    setDisableMore(false);
  }, [loading, query]);

  // If no users are returned, prevent additional filtration
  useEffect(() => {
    if (data?.users && data.users.length <= 0) {
      setPreventQuery(true);
    } else {
      setPreventQuery(false);
    }
  }, [data?.users]);

  return (
    <>
      <div className="profile-list">
        {preventQuery && (
          <div className="no-profiles-found">
            <div className="content">
              <h3>We couldn't find any profiles.</h3>
              <span>Try adjusting the filters...</span>
            </div>
          </div>
        )}
        <div className="grid">
          {data?.users?.map((item) => (
            <ProfileItem
              key={item.id}
              id={item.id}
              username={item.username}
              firstName={item.profile?.firstName}
              lastName={item.profile?.lastName}
              profileImage={item.profile?.profileImage}
              title={item.profile?.discipline?.title}
            />
          ))}
          {!preventQuery &&
            (loading || dataLoading) &&
            [1, 2, 3, 4, 5, 6].map((n) => <ProfileSkeleton key={n} />)}
        </div>
      </div>
      {!preventQuery && (
        <button
          disabled={disableMore}
          className={`more-profiles-btn ${
            !disableMore ? button.green : button.disabled
          }`}
          onClick={() => {
            if (data?.users && data?.users.length >= 1) {
              fetchMore<UsersQuery, UsersQueryVariables>({
                variables: {
                  data: {
                    after: data.users[data.users.length - 1].id,
                    first: 20,
                  },
                },
              }).then(({ data }) => {
                if (data?.users && data.users.length < 20) {
                  setDisableMore(true);
                }
              });
            }
          }}
        >
          Get More Profiles
        </button>
      )}
    </>
  );
};

export default ProfileList;
