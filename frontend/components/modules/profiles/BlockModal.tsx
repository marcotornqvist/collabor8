import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { useMutation } from "@apollo/client";
import { blockUser, blockUserVariables } from "generated/blockUser";
import { unblockUser, unblockUserVariables } from "generated/unblockUser";
import { motion } from "framer-motion";
import { IS_USER_BLOCKED } from "@/operations-queries/isUserBlocked";
import { BLOCK_USER } from "@/operations-mutations/blockUser";
import { UNBLOCK_USER } from "@/operations-mutations/unblockUser";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
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
  isBlocked: boolean;
}

const PendingModal = ({ id, show, onClose, isBlocked }: IProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [error, setError] = useState("");

  const [blockUser] = useMutation<blockUser, blockUserVariables>(BLOCK_USER, {
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

  const [unblockUser] = useMutation<unblockUser, unblockUserVariables>(
    UNBLOCK_USER,
    {
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
    }
  );

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

  useEffect(() => {
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [error]);

  const ref = useRef<HTMLDivElement>(null);
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
        <h4>
          {isBlocked
            ? "Are you sure you want to Unblock User?"
            : "Are you sure you want to Block User?"}
        </h4>
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
