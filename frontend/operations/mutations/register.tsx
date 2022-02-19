import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
      accessToken
      user {
        id
        username
        profile {
          userId
          firstName
          lastName
        }
      }
    }
  }
`;
