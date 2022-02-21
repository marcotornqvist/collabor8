import { useState } from "react";
import useHover from "@/hooks/useHover";
import DeleteContactModal from "./DeleteContactModal";
import button from "@/styles-modules/Button.module.scss";

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
        className={`danger-button ${button.lightRed}`}
      >
        {pendingState
          ? isHovered
            ? "Delete Contact Request"
            : "Pending Contact"
          : "Delete Contact"}
      </button>
      <DeleteContactModal
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
