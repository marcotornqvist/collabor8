import { gql } from "@apollo/client";

export const REPORT_USER = gql`
  mutation reportUser($data: ReportUserInput!) {
    reportUser(data: $data) {
      id
      title
      body
      violation
      createdAt
    }
  }
`;

