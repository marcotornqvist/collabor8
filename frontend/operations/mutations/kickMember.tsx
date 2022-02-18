import { gql } from "@apollo/client";

export const KICK_MEMBER = gql`
  mutation kickMember($data: MemberInput!) {
    kickMember(data: $data)
  }
`;
