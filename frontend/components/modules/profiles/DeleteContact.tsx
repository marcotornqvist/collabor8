import { useState, useRef, ReactPortal } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "@operations-mutations/deleteContact";
import { deleteContact, deleteContactVariables } from "generated/deleteContact";
import { CONTACT_STATUS } from "@operations-queries/contactStatus";
import useHover from "@hooks/useHover";
// import Modal from "@components-modules/modal/modal";
import Modal from "./Modal";

interface IProps {
  id: string;
  pendingState: boolean;
}

// This component works for both when a user has sent a contact request
// but is still in a pending state. And also when the contact state is active(true).
const DeleteContact = ({ id, pendingState }: IProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteContact, { data, error }] = useMutation<
    deleteContact,
    deleteContactVariables
  >(DELETE_CONTACT, {
    variables: {
      deleteContactId: id,
    },
    refetchQueries: [
      {
        query: CONTACT_STATUS, // DocumentNode object parsed with gql
        variables: {
          contactStatusId: id,
        },
      },
    ],
  });

  const [hoverRef, isHovered] = useHover<HTMLLIElement>();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <li onClick={() => deleteContact()} ref={hoverRef} className="danger-hover"> */}
      <li
        onClick={() => setShowModal(true)}
        ref={hoverRef}
        className="danger-hover"
      >
        {pendingState ? (
          <span>
            {isHovered ? "Delete Contact Request" : "Pending Contact"}
          </span>
        ) : (
          <span>Delete Contact</span>
        )}
      </li>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        Hello from the modal!
      </Modal>
    </>
  );
};

export default DeleteContact;
