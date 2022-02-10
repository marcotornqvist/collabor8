import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { toastState } from "store";
import { ErrorStatus } from "@/types-enums/enums";
import { useDeleteProjectMutation } from "generated/graphql";
import { dropInVariants } from "utils/variants";
import { useRouter } from "next/router";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface IProps {
  id: string;
  show: boolean;
  onClose: () => void;
}

const DeleteModal = ({ id, show, onClose }: IProps) => {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);
  const [error, setError] = useState("");

  const [deleteProject, { data }] = useDeleteProjectMutation({
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
      router.events.on("routeChangeComplete", () =>
        toastState.addToast(
          "Project deleted successfully!",
          ErrorStatus.success
        )
      );
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
        className="modal delete-project-modal"
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
          <h4>Are you sure you want to delete this project?</h4>
          <p>
            This will permanently delete the project. All chats will be removed
            in the process.
          </p>
        </div>
        <button className={button.lightRed} onClick={() => deleteProject()}>
          Delete Project
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
