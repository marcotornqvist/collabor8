import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { IS_USER_BLOCKED } from "@/operations-queries/isUserBlocked";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
} from "generated/graphql";
import { dropInVariants } from "utils/variants";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useToast from "@/hooks/useToast";

interface IProps {
  id: string;
  show: boolean;
  onClose: () => void;
  isBlocked: boolean;
}

const PendingModal = ({ id, show, onClose, isBlocked }: IProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [error, setError] = useState("");

  const [blockUser] = useBlockUserMutation({
    variables: {
      id,
    },
    refetchQueries: [
      {
        query: IS_USER_BLOCKED,
        variables: {
          id,
        },
      },
    ],
    onError: (error) => setError(error.message),
  });

  const [unblockUser] = useUnblockUserMutation({
    variables: {
      id,
    },
    refetchQueries: [
      {
        query: IS_USER_BLOCKED,
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

  const blockToggler = () => {
    setError("");
    if (isBlocked) {
      unblockUser();
    } else {
      blockUser();
    }

    onClose();
  };

  useToast({
    error,
  });

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handleCloseClick);

  const modalContent = show ? (
    <div className="modal-backdrop">
      <motion.div
        className="modal pending-modal"
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
          <h4>
            {isBlocked
              ? "Are you sure you want to Unblock User?"
              : "Are you sure you want to Block User?"}
          </h4>
        </div>
        <button
          className={isBlocked ? button.lightGreen : button.lightRed}
          onClick={() => blockToggler()}
        >
          {isBlocked ? "Unblock User" : "Block User"}
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

export default PendingModal;
