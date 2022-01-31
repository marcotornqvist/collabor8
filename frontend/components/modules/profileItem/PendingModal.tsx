import { MouseEvent, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { CONTACT_STATUS } from "@/operations-queries/contactStatus";
import { motion } from "framer-motion";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import {
  useAcceptContactMutation,
  useRejectContactMutation,
} from "generated/graphql";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";

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
  hideDelete?: boolean;
}

const PendingModal = ({ id, show, onClose, hideDelete = false }: IProps) => {
  const [error, setError] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

  const [acceptContact] = useAcceptContactMutation({
    variables: {
      id,
    },
    refetchQueries: [
      {
        query: CONTACT_STATUS,
        variables: {
          id,
        },
      },
    ],
    onError: (error) => setError(error.message),
  });

  const [rejectContact] = useRejectContactMutation({
    variables: {
      id,
    },
    refetchQueries: [
      {
        query: CONTACT_STATUS,
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

  const acceptHandler = () => {
    setError("");
    acceptContact();
    onClose();
  };

  const rejectHandler = () => {
    setError("");
    rejectContact();
    onClose();
  };

  const ref = useRef(null);
  useOnClickOutside(ref, handleCloseClick);

  useEffect(() => {
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [error]);

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
        <div className="modal-content">
          <h4>Delete or accept contact request</h4>
        </div>
        <div className="buttons">
          <button className={button.lightGreen} onClick={() => acceptHandler()}>
            Accept
          </button>
          {!hideDelete && (
            <button className={button.lightRed} onClick={() => rejectHandler()}>
              Delete
            </button>
          )}
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
