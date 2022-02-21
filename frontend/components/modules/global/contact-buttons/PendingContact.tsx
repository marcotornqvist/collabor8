import { useState } from "react";
import useHover from "@/hooks/useHover";
import PendingModal from "./PendingModal";

interface IProps {
  id: string;
  hideDelete?: boolean;
}

// This component works for both when a user has sent a contact request
// but is still in a pending state. And also when the contact state is active(true).
const PendingContact = ({ id, hideDelete }: IProps) => {
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        ref={hoverRef}
        className="success-button"
      >
        <span>{isHovered ? "Respond" : "Contact Received"}</span>
      </button>
      <PendingModal
        id={id}
        show={showModal}
        onClose={() => setShowModal(false)}
        hideDelete={hideDelete}
      />
    </>
  );
};

export default PendingContact;
