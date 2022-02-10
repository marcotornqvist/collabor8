import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import { useLeaveProjectMutation } from "generated/graphql";
import { dropInVariants } from "utils/variants";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRouter } from "next/router";

interface IProps {
  id: string;
  show: boolean;
  onClose: () => void;
}

const DeleteModal = ({ id, show, onClose }: IProps) => {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);
  const [error, setError] = useState("");

  const [leaveProject, { data }] = useLeaveProjectMutation({
    variables: {
      id,
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

  useEffect(() => {
    if (data) {
      router.push("/projects");
    }
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [error, data]);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handleCloseClick);

  const modalContent = show ? (
    <div className="modal-backdrop">
      <motion.div
        className="modal leave-project-modal"
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
          <h4>Are you sure you want to leave this project?</h4>
        </div>
        <button className={button.lightRed} onClick={() => leaveProject()}>
          Leave Project
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
