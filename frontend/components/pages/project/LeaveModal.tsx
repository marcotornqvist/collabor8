import { useEffect, useState, useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useLeaveProjectMutation } from "generated/graphql";
import { dropInVariants } from "utils/variants";
import { useRouter } from "next/router";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useToast from "@/hooks/useToast";

interface IProps {
  id: string;
  show: boolean;
  onClose: () => void;
}

const LeaveModal = ({ id, show, onClose }: IProps) => {
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);
  const [error, setError] = useState("");

  const [leaveProject, { data }] = useLeaveProjectMutation({
    variables: {
      id,
    },
    update(cache, { data }) {
      // Remove project from cache
      if (data?.leaveProject) {
        const normalizedId = cache.identify({ id, __typename: "Project" });
        cache.evict({ id: normalizedId });
        cache.gc();
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

  useEffect(() => {
    if (data) {
      router.push("/projects");
    }
  }, [data]);

  useToast({
    error,
  });

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

export default LeaveModal;
