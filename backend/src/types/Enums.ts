import { registerEnumType } from "type-graphql";

export enum Sort {
  desc = "desc",
  asc = "asc",
}

// Returns the status of the logged in user
export enum ProjectMemberStatus {
  ADMIN = "ADMIN", // Admin of the project
  MEMBER = "MEMBER", // Member of the project
  INVITED_USER = "INVITED_USER", // Invited users are either pending or false of the project
  USER = "USER", // Authenticated but not a member
  GUEST = "GUEST", // Guest, meaning not authenticated
}

export enum ContactStatus {
  REQUEST_SENT = "REQUEST_SENT", // if contact request is sent
  REQUEST_RECEIVED = "REQUEST_RECEIVED", // if contact request is received
  REQUEST_RECEIVED_FALSE = "REQUEST_RECEIVED_FALSE", // if contact request is received but is false
  ACTIVE_CONTACT = "ACTIVE_CONTACT", // if contact exist
  NO_CONTACT = "NO_CONTACT", // if no contact request exist
}

registerEnumType(ContactStatus, {
  name: "ContactStatus",
  description: "Contact status enum",
});

registerEnumType(ProjectMemberStatus, {
  name: "ProjectMemberStatus",
  description: "Project member status enum",
});

// registerEnumType(, {
//   name: "ProjectMemberStatus",
//   description: "Project member status enum",
// });
