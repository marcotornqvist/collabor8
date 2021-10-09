import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
      accessToken
      user {
        username
        profile {
          firstName
          lastName
        }
      }
    }
  }
`;
