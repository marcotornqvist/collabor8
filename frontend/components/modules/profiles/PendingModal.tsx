import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useMutation } from "@apollo/client";
import { REJECT_CONTACT } from "@operations-mutations/rejectContact";
import { rejectContact, rejectContactVariables } from "generated/rejectContact";
import { ACCEPT_CONTACT } from "@operations-mutations/acceptContact";
import { acceptContact, acceptContactVariables } from "generated/acceptContact";
import { CONTACT_STATUS } from "@operations-queries/contactStatus";
import { motion } from "framer-motion";
import useOnClickOutside from "@hooks/useOnClickOutside";

const dropIn = {
  hidden: {
    y: "-100px",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
  },
};

interface IProps {
  id: string;
  show: boolean;
  onClose: () => void;
}

const PendingModal = ({ id, show, onClose }: IProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const [acceptContact] = useMutation<acceptContact, acceptContactVariables>(
    ACCEPT_CONTACT,
    {
      variables: {
        acceptContactId: id,
      },
      refetchQueries: [
        {
          query: CONTACT_STATUS,
          variables: {
            contactStatusId: id,
          },
        },
      ],
    }
  );

  const [rejectContact] = useMutation<rejectContact, rejectContactVariables>(
    REJECT_CONTACT,
    {
      variables: {
        rejectContactId: id,
      },
      refetchQueries: [
        {
          query: CONTACT_STATUS,
          variables: {
            contactStatusId: id,
          },
        },
      ],
    }
  );

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const rejectHandler = () => {
    rejectContact();
    onClose();
  };

  const acceptHandler = () => {
    acceptContact();
    onClose();
  };

  const ref = useRef(null);
  useOnClickOutside(ref, handleCloseClick);

  const modalContent = show ? (
    <div className="modal-backdrop">
      <motion.div
        className="modal pending-modal"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={ref}
      >
        <div className="modal-header">
          <div className="close-button" onClick={handleCloseClick}>
            <span>&times;</span>
          </div>
        </div>
        <h4>Delete or accept contact request</h4>
        <div className="buttons">
          <button className="success-color" onClick={() => acceptHandler()}>
            Accept
          </button>
          <button className="danger-color" onClick={() => rejectHandler()}>
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }
};

export default PendingModal;
