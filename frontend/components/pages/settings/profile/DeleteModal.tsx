import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import {
  DeleteImageMutation,
  LoggedInUserDocument,
  LoggedInUserQuery,
  useDeleteImageMutation,
} from "generated/graphql";
import { dropInVariants } from "utils/variants";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useToast from "@/hooks/useToast";

interface IProps {
  show: boolean;
  onClose: () => void;
}

const DeleteModal = ({ show, onClose }: IProps) => {
  const [error, setError] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

  const [deleteImage, { data }] = useDeleteImageMutation({
    update(cache, { data }) {
      const user = cache.readQuery<LoggedInUserQuery>({
        query: LoggedInUserDocument,
      });

      if (data?.deleteImage && user?.loggedInUser?.profile) {
        cache.writeQuery<LoggedInUserQuery>({
          query: LoggedInUserDocument,
          data: {
            loggedInUser: {
              ...user.loggedInUser,
              profile: {
                ...user.loggedInUser.profile,
                profileImage: data.deleteImage.profileImage,
              },
            },
          },
        });
      }
    },
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: MouseEvent<HTMLDivElement> | Event) => {
    e.preventDefault();
    onClose();
  };

  const deleteHandler = () => {
    setError("");
    deleteImage();
    onClose();
  };

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handleCloseClick);

  useToast<DeleteImageMutation>({
    data,
    successMessage: "Image deleted successfully",
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
          <h4>Are you sure you want to delete the image?</h4>
        </div>
        <button className={button.lightRed} onClick={() => deleteHandler()}>
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
