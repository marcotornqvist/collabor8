import { StatusCode } from "@prisma/client";
import { ContactStatus } from "../types/Enums";

type contact = {
  userId: string;
  contactId: string;
  status: StatusCode;
};

type payload = {
  userId: string;
};

export const getContactStatus = (
  contact: contact | null,
  payload?: payload
) => {
  // No contact exist
  if (!contact) {
    return ContactStatus.NO_CONTACT;
  }

  // Contact is sent but not accepted (PENDING)
  if (contact.status === "PENDING" && contact.userId === payload!.userId) {
    return ContactStatus.REQUEST_SENT;
  }

  // Contact is received but pending (PENDING)
  if (contact.status === "PENDING" && contact.contactId === payload!.userId) {
    return ContactStatus.REQUEST_RECEIVED;
  }

  // Contact is received but false (FALSE)
  if (contact.status === "FALSE" && contact.contactId === payload!.userId) {
    return ContactStatus.REQUEST_RECEIVED_FALSE;
  }

  // Contact is active and accepted (TRUE)
  if (contact.status === "TRUE") {
    return ContactStatus.ACTIVE_CONTACT;
  }

  return ContactStatus.NO_CONTACT;
};
