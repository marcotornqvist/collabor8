import ReactDOM from "react-dom";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  KickMemberMutation,
  ProjectMembersDocument,
  ProjectMembersQuery,
  ProjectMembersQueryVariables,
  useKickMemberMutation,
} from "generated/graphql";
import { dropInVariants } from "utils/variants";
import button from "@/styles-modules/Button.module.scss";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useToast from "@/hooks/useToast";

interface IProps {
  id: string;
  userId: string;
  show: boolean;
  onClose: () => void;
}

const KickMemberModal = ({ id, userId, show, onClose }: IProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [error, setError] = useState("");

  const [kickMember] = useKickMemberMutation({
    variables: {
      data: {
        projectId: id,
        userId,
      },
    },
    update(cache, { data }) {
      const previousData = cache.readQuery<
        ProjectMembersQuery,
        ProjectMembersQueryVariables
      >({
        query: ProjectMembersDocument,
        variables: {
          data: {
            id,
          },
        },
      });

      if (data && previousData?.projectById) {
        cache.writeQuery<ProjectMembersQuery, ProjectMembersQueryVariables>({
          query: ProjectMembersDocument,
          variables: {
            data: {
              id,
            },
          },
          data: {
            projectById: {
              ...previousData.projectById,
              members: previousData?.projectById?.members?.filter(
                (item) => item.userId !== userId
              ),
            },
          },
        });
      }
    },
    onError: (error) => setError(error.message),
  });

  useToast({
    error,
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: MouseEvent<HTMLDivElement> | Event) => {
    e.preventDefault();
    onClose();
  };

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
          <h4>Are you sure you want to remove this member?</h4>
        </div>
        <button className={button.lightRed} onClick={() => kickMember()}>
          Remove Member
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

export default KickMemberModal;
