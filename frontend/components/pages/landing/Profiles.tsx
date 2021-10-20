import React from "react";
import ProfileItem from "./ProfileItem";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@operations-queries/getAllUsers";
import { users, usersVariables } from "generated/users";

// Check that user is not a friend

const Profiles = () => {
  const { data } = useQuery<users, usersVariables>(GET_USERS, {
    variables: {
      usersData: {
        first: 3,
      },
    },
  });

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
