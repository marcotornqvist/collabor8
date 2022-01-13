import { useEffect } from "react";
import ProfileItem from "./ProfileItem";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USERS } from "@operations-queries/getAllUsers";
import { users, usersVariables } from "generated/users";
import { authState } from "store";
import { useSnapshot } from "valtio";
import { UsersFilterArgs } from "generated/globalTypes";
import { motion } from "framer-motion";
import ProfileSkeleton from "./ProfileSkeleton";

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
  const [users, { data }] = useLazyQuery<users, usersVariables>(GET_USERS, {
    variables: {
      usersData: {
        first,
      },
    },
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
          {data?.users?.map((item) => (
            <ProfileItem key={item.id} item={item} />
          ))}
          {!data?.users && [1, 2, 3].map((n) => <ProfileSkeleton key={n} />)}
        </div>
      </div>
    </section>
  );
};

export default Profiles;
