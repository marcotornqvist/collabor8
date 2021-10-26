import { registerEnumType } from "type-graphql";

export enum Sort {
  desc = "desc",
  asc = "asc",
}

export enum CONTACT_STATUS {
  REQUEST_SENT = "REQUEST_SENT", // if contact request is sent
  REQUEST_RECEIVED = "REQUEST_RECEIVED", // if contact request is received
  REQUEST_RECEIVED_FALSE = "REQUEST_RECEIVED_FALSE", // if contact request is received but is false
  ACTIVE_CONTACT = "ACTIVE_CONTACT", // if contact exist
  NO_CONTACT = "NO_CONTACT", // if no contact request exist
}

registerEnumType(CONTACT_STATUS, {
  name: "CONTACT_STATUS",
  description: "Contact status enum",
});
