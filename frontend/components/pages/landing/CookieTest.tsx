import { gql, useMutation } from "@apollo/client";

const CREATE_COOKIE = gql`
  mutation createCookieMutation {
    createCookieMutation
  }
`;

const CookieTest = () => {
  const [createCookieMutation, { data, loading, error }] =
    useMutation(CREATE_COOKIE);

  console.log(data);
  return (
    <button onClick={() => createCookieMutation()}>
      Create HTTP Cookie GQL
    </button>
  );
};

export default CookieTest;
