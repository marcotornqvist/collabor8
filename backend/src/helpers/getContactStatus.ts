import { StatusCode } from "@prisma/client";
import { Contact_Status } from "../types/Enums";

type contact = {
  userId: string;
  contactId: string;
  status: StatusCode;
};

type payload = {
  userId: string;
};

export const getContactStatus = (contact: contact | null, payload?: payload) => {
  // No contact exist
  if (!contact) {
    return Contact_Status.NO_CONTACT;
  }

  // Contact is sent but not accepted (PENDING)
  if (contact.status === "PENDING" && contact.userId === payload!.userId) {
    return Contact_Status.REQUEST_SENT;
  }

  // Contact is received but pending (PENDING)
  if (contact.status === "PENDING" && contact.contactId === payload!.userId) {
    return Contact_Status.REQUEST_RECEIVED;
  }

  // Contact is received but false (FALSE)
  if (contact.status === "FALSE" && contact.contactId === payload!.userId) {
    return Contact_Status.REQUEST_RECEIVED_FALSE;
  }

  // Contact is active and accepted (TRUE)
  if (contact.status === "TRUE") {
    return Contact_Status.ACTIVE_CONTACT;
  }

  return Contact_Status.NO_CONTACT;
};
