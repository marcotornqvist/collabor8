import { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
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
import ContentLayout from "@/components-layout/content/ContentLayout";
import ProfileItem from "@/components-modules/profileItem/ProfileItem";
import ProfileSkeleton from "@/components-modules/profileItem/ProfileSkeleton";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useSkeleton from "@/hooks/useSkeleton";

const limit = 20;

const Profiles = () => {
  const [disableMore, setDisableMore] = useState(false);
  const { showSkeleton, setShowSkeleton } = useSkeleton();
  const [query, setQuery] = useQueryParams({
    search: singleStringParam,
    country: singleStringParam,
    disciplines: NumericArrayParam,
    sort: singleStringParam,
  });

  const { loading } = useSnapshot(authState);

  const [getUsers, { data, loading: dataLoading, fetchMore, client }] =
    useUsersLazyQuery({
      variables: {
        data: {
          first: limit,
          searchText: query.search,
          country: query.country,
          disciplines: isNumbersArray(query.disciplines),
          sort: query.sort !== "asc" ? Sort.Desc : Sort.Asc,
        },
      },
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    });

  // Get users and setDisableMore to false
  useEffect(() => {
    setShowSkeleton(true);
    // Remove users from cache to prevent caching bug
    client.cache.evict({ id: "ROOT_QUERY", fieldName: "users" });
    if (!loading) {
      getUsers();
      setDisableMore(false);
    }
  }, [loading, query]);

  // Checks if element after last grid item is visible (infinite scroll)
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  // If element after last grid item is visible, fetch more users if conditions match
  useEffect(() => {
    // Checks if element is visible, if more than or equal to (2) users fetched
    // is returned in response and if disableMore is false
    if (
      isVisible &&
      !disableMore &&
      data?.users &&
      data.users.length >= limit
    ) {
      fetchMore<UsersQuery, UsersQueryVariables>({
        variables: {
          data: {
            after: data.users[data.users.length - 1].id,
            first: limit,
            searchText: query.search,
            country: query.country,
            disciplines: isNumbersArray(query.disciplines),
            sort: query.sort !== "asc" ? Sort.Desc : Sort.Asc,
          },
        },
      }).then(({ data: { users } }) => {
        // Sets disableMore to true if less than limit was in response
        if (users && users.length < limit) {
          setDisableMore(true);
        }
      });
    }
  }, [isVisible, data?.users]);

  return (
    <div className="profile-list">
      {!showSkeleton && !dataLoading && data?.users && data.users.length === 0 && (
        <div className="no-profiles-found">
          <div className="content">
            <h3>We couldn&apos;t find any profiles.</h3>
            <span>Try adjusting the filters...</span>
          </div>
        </div>
      )}
      <div className="grid">
        {!showSkeleton &&
          data?.users?.map((item) => (
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
        {(showSkeleton || dataLoading) &&
          [1, 2, 3, 4, 5, 6].map((n) => <ProfileSkeleton key={n} />)}
      </div>
      <div ref={ref} className="bottom-visible"></div>
    </div>
  );
};

Profiles.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout className={"profiles-page"}>{page}</ContentLayout>;
};

export default Profiles;
