import { gql, useMutation, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query users($usersData: UsersFilterArgs!) {
    users(data: $usersData) {
      id
      username
      email
    }
  }
`;

const Users = () => {
  const { data } = useQuery(GET_USERS, {
    variables: {
      usersData: {},
    },
  });
  // console.log(data);
  return (
    <div className="users">
      {data?.users.map((item: any) => (
        <h3 key={item.id}>{item.email}</h3>
      ))}
    </div>
  );
};

export default Users;
