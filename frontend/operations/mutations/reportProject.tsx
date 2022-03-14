import { gql } from "@apollo/client";

export const REPORT_PROJECT = gql`
  mutation reportProject($data: ReportProjectInput!) {
    reportProject(data: $data) {
      id
      title
      body
      violation
      createdAt
    }
  }
`;
