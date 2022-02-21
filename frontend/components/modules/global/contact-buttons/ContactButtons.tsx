import React, { useEffect } from "react";
import { ContactStatus, useContactStatusLazyQuery } from "generated/graphql";
import { useSnapshot } from "valtio";
import { authState } from "store";
import Link from "next/link";
import AddContact from "./AddContact";
import DeleteContact from "./DeleteContact";
import PendingContact from "./PendingContact";

interface IProps {
  id: string;
  isVisible: boolean;
  username: string;
}

// Check if user is already in contact list
// - If you have sent contact request: Request Pending (you can also delete the request now) success colors
// - If you have received contact request: Modal - Accept Contact
// - If you have received contact request: Modal - Decline Contact
// - If you contact request is accepted: Delete Contact
// - If no contact is returned: Add Person

const ContactButtons = ({ id, isVisible, username }: IProps) => {
  const { isAuth } = useSnapshot(authState);

  const [getContactStatus, { data, loading, error }] =
    useContactStatusLazyQuery();

  useEffect(() => {
    if (isVisible && isAuth) {
      getContactStatus({
        variables: {
          id,
        },
      });
    }
  }, [isVisible, isAuth]);

  // Returns a button depending on the contactStatus
  // Example: if a user has received a contact request a certain button will be rendered
  if (isAuth) {
    switch (data?.contactStatus) {
      case ContactStatus.RequestSent:
        return <DeleteContact id={id} pendingState={true} />;
      case ContactStatus.ActiveContact:
        return <DeleteContact id={id} pendingState={false} />;
      case ContactStatus.RequestReceived:
        return <PendingContact id={id} />;
      case ContactStatus.RequestReceivedFalse:
        return <PendingContact id={id} hideDelete={true} />;
      case ContactStatus.NoContact:
        return <AddContact id={id} />;
      default:
        return (
          <button>
            {loading && <span>Loading...</span>}
            {error && <span>Error...</span>}
          </button>
        );
    }
  } else {
    return (
      <Link
        href={{
          pathname: "/login",
          query: { redirect: `/profile/${username}` },
        }}
      >
        <a>
          <button className="success-button">Add Person</button>
        </a>
      </Link>
    );
  }
};

export default ContactButtons;
