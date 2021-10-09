import { useQuery } from "@apollo/client";
import { users, usersVariables } from "generated/users";
import { GET_USERS } from "@operations-queries/getAllUsers";

const Users = () => {
  const { data } = useQuery<users, usersVariables>(GET_USERS, {
    variables: {
      usersData: {},
    },
  });
  // console.log(data);
  return (
    <div className="users">
      {data?.users?.map((item: any) => (
        <h3 key={item.id}>{item.email}</h3>
      ))}
    </div>
  );
};

export default Users;
