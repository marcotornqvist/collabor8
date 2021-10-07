import { gql, useMutation, useQuery } from "@apollo/client";

const GET_LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      id
      email
    }
  }
`;

const LoggedInUser = () => {
  const { data, refetch } = useQuery(GET_LOGGED_IN_USER);

  const refetchHandler = () => {
    refetch();
    console.log(data);
  };
  console.log(data);
  return (
    <div className="logged-in-user">
      <button onClick={() => refetchHandler()}>Refetch User</button>
    </div>
  );
};

export default LoggedInUser;
