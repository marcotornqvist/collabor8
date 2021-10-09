import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
// import { accessToken } from "utils/accessToken";
import { useSnapshot } from "valtio";
import { state } from "store";

const GET_LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      id
      email
    }
  }
`;

const LoggedInUser = () => {
  const { accessToken } = useSnapshot(state);
  const [loggedInUser, { data, loading, error }] =
    useLazyQuery(GET_LOGGED_IN_USER);

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
