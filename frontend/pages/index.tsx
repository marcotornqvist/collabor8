import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query {
    allUsers {
      email
      id
      name
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(QUERY);

  console.log(data);

  return <div className="home"></div>;
}
