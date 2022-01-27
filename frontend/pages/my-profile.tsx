import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useUsersQuery } from "generated/graphql";
import("scroll-behavior-polyfill");

const MyProfile = () => {
  const [toggle, setToggle] = useState(false);
  const { data } = useUsersQuery({
    variables: {
      data: {},
    },
  });

  console.log(data);

  return (
    <div className="my-profile-page">
      <div className="container"></div>
    </div>
  );
};

export default MyProfile;
