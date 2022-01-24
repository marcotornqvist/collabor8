import { gql } from "@apollo/client";

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($data: UpdatePasswordInput!) {
    updatePassword(data: $data)
  }
`;
