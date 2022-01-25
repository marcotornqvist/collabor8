import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_IMAGE } from "@/operations-mutations/deleteImage";
import { GET_PROFILE_IMAGE } from "@/operations-queries/getLoggedInProfile";
import { deleteImage } from "generated/deleteImage";
import { loggedInProfileImage } from "generated/loggedInProfileImage";
import { motion } from "framer-motion";
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
  show: boolean;
  onClose: () => void;
}

const DeleteModal = ({ show, onClose }: IProps) => {
  const [error, setError] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

  const [deleteImage, { data }] = useMutation<deleteImage>(DELETE_IMAGE, {
    update(cache, { data }) {
      cache.writeQuery<loggedInProfileImage>({
        query: GET_PROFILE_IMAGE,
        data: {
          loggedInProfile: {
            __typename: "Profile",
            profileImage: data?.deleteImage.profileImage || null,
          },
        },
      });
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

  useEffect(() => {
    if (data) {
      toastState.addToast("Image deleted successfully", ErrorStatus.success);
    }
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [data, error]);

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
        <h4>Are you sure you want to delete the image?</h4>
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
