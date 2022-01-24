import { gql } from "@apollo/client";

export const UPDATE_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateEmail(email: $email)
  }
`;
