import { useEffect } from "react";
import ProfileItem from "./ProfileItem";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USERS } from "@operations-queries/getAllUsers";
import { users, usersVariables } from "generated/users";
import { authState } from "store";
import { useSnapshot } from "valtio";

// Check that user is not a friend
// Check that user is not you when returning

const Profiles = () => {
  const { loading } = useSnapshot(authState);
  const [users, { data }] = useLazyQuery<users, usersVariables>(GET_USERS, {
    // fetchPolicy: "no-cache",
    variables: {
      usersData: {
        // first: 3,
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
        </div>
      </div>
    </section>
  );
};

export default Profiles;
