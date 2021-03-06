import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import {
  ContactStatusDocument,
  DeleteContactMutation,
  useDeleteContactMutation,
} from "generated/graphql";
import { dropInVariants } from "utils/variants";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useToast from "@/hooks/useToast";

interface IProps {
  id: string;
  show: boolean;
  title: string;
  onClose: () => void;
}

const DeleteContactModal = ({ id, show, title, onClose }: IProps) => {
  const [error, setError] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

  const [deleteContact, { data }] = useDeleteContactMutation({
    variables: {
      id,
    },
    refetchQueries: [
      {
        query: ContactStatusDocument, // DocumentNode object parsed with gql
        variables: {
          id,
        },
      },
    ],
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: MouseEvent<HTMLDivElement> | Event) => {
    e.preventDefault();
    onClose();
  };

  const onClickHandler = () => {
    setError("");
    deleteContact();
    if (data) {
      onClose();
    }
  };

  const ref = useRef(null);
  useOnClickOutside(ref, handleCloseClick);

  useToast<DeleteContactMutation>({
    data,
    successMessage: "Contact deleted",
    error,
  });

  const modalContent = show ? (
    <div className="modal-backdrop">
      <motion.div
        className="modal delete-modal"
        onClick={(e) => e.stopPropagation()}
        variants={dropInVariants}
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
        <div className="modal-content">
          <h4>{title}</h4>
        </div>
        <button className={button.lightRed} onClick={() => onClickHandler()}>
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

export default DeleteContactModal;
