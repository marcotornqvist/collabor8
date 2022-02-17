import { gql } from "@apollo/client";

export const ADD_MEMBER = gql`
  mutation kickMember($data: MemberInput!) {
    kickMember(data: $data)
  }
`;
