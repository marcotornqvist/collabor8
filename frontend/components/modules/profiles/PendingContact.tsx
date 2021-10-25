import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "@operations-mutations/deleteContact";
import { deleteContact, deleteContactVariables } from "generated/deleteContact";
import { CONTACT_STATUS } from "@operations-queries/contactStatus";
import useHover from "@hooks/useHover";
import PendingModal from "@components-modules/profiles/PendingModal";

interface IProps {
  id: string;
}

// This component works for both when a user has sent a contact request
// but is still in a pending state. And also when the contact state is active(true).
const PendingContact = ({ id }: IProps) => {
  const [hoverRef, isHovered] = useHover<HTMLLIElement>();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li
        onClick={() => setShowModal(true)}
        ref={hoverRef}
        className="success-hover"
      >
        <span>
          {isHovered ? "Respond to request" : "Contact Request Received"}
        </span>
      </li>
      <PendingModal
        id={id}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default PendingContact;
