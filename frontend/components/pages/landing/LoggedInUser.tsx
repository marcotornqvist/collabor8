import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { authState } from "store";
import { GET_PROFILE_IMAGE } from "@operations-queries/getLoggedInUser";

const LoggedInUser = () => {
  const { accessToken } = useSnapshot(authState);
  const [loggedInUser, { data, loading, error }] =
    useLazyQuery(GET_PROFILE_IMAGE);

  useEffect(() => {
    if (accessToken !== "") {
      loggedInUser();
    }
  }, [accessToken]);

  if (loading) return <div>Loading</div>;

  return (
    <div className="user">
      <h3>Logged in user: {data && data.loggedInUser?.email}</h3>
      {/* <button onClick={() => refetchHandler()}>Refetch User</button> */}
    </div>
  );
};

export default LoggedInUser;
