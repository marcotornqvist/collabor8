import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import { useDeleteAccountMutation } from "generated/graphql";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { authState } from "store";
import { useRouter } from "next/router";
import { dropInVariants } from "utils/variants";
import useToast from "@/hooks/useToast";

interface IProps {
  show: boolean;
  onClose: () => void;
}

const DeleteModal = ({ show, onClose }: IProps) => {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);
  const [error, setError] = useState("");

  const [deleteAccount, { loading, client }] = useDeleteAccountMutation({
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: MouseEvent<HTMLDivElement> | Event) => {
    e.preventDefault();
    onClose();
  };

  // Deletes account and sets auth state to false
  const deleteHandler = async () => {
    try {
      await deleteAccount();
      toastState.addToast("Account deleted successfully", ErrorStatus.success);
      onClose();
      authState.accessToken = "";
      authState.isAuth = false;
      await client!.resetStore();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useToast({
    error,
  });

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handleCloseClick);

  const modalContent = show ? (
    <div className="modal-backdrop">
      <motion.div
        className="modal delete-account-modal"
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
          <h4>Are you sure you want to delete your account?</h4>
          <p>
            This will permanently delete your account. All projects and contacts
            will also be removed in the process.
          </p>
        </div>
        <button
          onClick={() => deleteHandler()}
          className={loading ? button.red : button.lightRed}
        >
          Delete Account
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
