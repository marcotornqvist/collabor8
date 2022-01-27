import { useState } from "react";
import useHover from "@/hooks/useHover";
import DeleteModal from "@/components-modules/profiles/DeleteModal";

interface IProps {
  id: string;
  pendingState: boolean;
}

// This component works for both when a user has sent a contact request
// but is still in a pending state. And also when the contact state is active(true).
const DeleteContact = ({ id, pendingState }: IProps) => {
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
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
      </button>
      <DeleteModal
        id={id}
        show={showModal}
        title={
          pendingState
            ? "Are you sure you want to delete the contact request?"
            : "Are you sure you want to delete the contact?"
        }
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default DeleteContact;
