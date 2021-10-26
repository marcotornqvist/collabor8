import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { useSnapshot } from "valtio";
import { authState } from "store";
import { CONTACT_STATUS } from "@operations-queries/contactStatus";
import { contactStatus, contactStatusVariables } from "generated/contactStatus";
import { CONTACT_STATUS as STATUS_ENUM } from "generated/globalTypes";
import AddContact from "./AddContact";
import DeleteContact from "./DeleteContact";
import PendingContact from "./PendingContact";

interface IProps {
  id: string;
  isVisible: boolean;
}

// Check if user is already in contact list
// - If you have sent contact request: Request Pending (you can also delete the request now) success colors
// - If you have received contact request: Modal - Accept Contact
// - If you have received contact request: Modal - Decline Contact
// - If you contact request is accepted: Delete Contact
// - If no contact is returned: Add Person

const ContactButtons = ({ id, isVisible }: IProps) => {
  const { isAuth } = useSnapshot(authState);

  const [getContactStatus, { data, loading, error }] = useLazyQuery<
    contactStatus,
    contactStatusVariables
  >(CONTACT_STATUS, {
    variables: {
      contactStatusId: id,
    },
  });

  useEffect(() => {
    if (isVisible) {
      getContactStatus();
    }
  }, [isVisible]);

  if (!isAuth) {
    return (
      <Link href={`/login`}>
        <a>
          <li>
            <span>Add Person</span>
          </li>
        </a>
      </Link>
    );
  }

  return <AddContact id={id} />;

  switch (data?.contactStatus) {
    case STATUS_ENUM.REQUEST_SENT:
      return <DeleteContact id={id} pendingState={true} />;
    case STATUS_ENUM.ACTIVE_CONTACT:
      return <DeleteContact id={id} pendingState={false} />;
    case STATUS_ENUM.REQUEST_RECEIVED:
      return <PendingContact id={id} />;
    case STATUS_ENUM.REQUEST_RECEIVED_FALSE:
      return <PendingContact id={id} hideDelete={true} />;
    case STATUS_ENUM.NO_CONTACT:
      return <AddContact id={id} />;
    default:
      return (
        <li>
          {loading && <span>Loading...</span>}
          {error && <span>Error...</span>}
        </li>
      );
  }
};

export default ContactButtons;
