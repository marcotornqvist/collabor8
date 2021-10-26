import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "@operations-mutations/deleteContact";
import { deleteContact, deleteContactVariables } from "generated/deleteContact";
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
  title: string;
  onClose: () => void;
}

const DeleteModal = ({ id, show, title, onClose }: IProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const [deleteContact, { data }] = useMutation<
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

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const onClickHandler = () => {
    deleteContact();
    if (data) {
      onClose();
    }
  };

  const ref = useRef(null);
  useOnClickOutside(ref, handleCloseClick);

  const modalContent = show ? (
    <div className="modal-backdrop">
      <motion.div
        className="modal delete-modal"
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
        <h4>{title}</h4>
        <button className="danger-color" onClick={() => onClickHandler()}>
          Delete
        </button>
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

export default DeleteModal;
