import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "utils/variants";
import button from "@/styles-modules/Button.module.scss";
import DeleteProjectModal from "@/components-modules/project-settings/DeleteProjectModal";
import LeaveProjectModal from "@/components-modules/project-settings/LeaveProjectModal";

interface IProps {
  id: string;
}

const Settings = ({ id }: IProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  return (
    <div className="settings">
      <motion.button
        onClick={() => setShowLeaveModal(true)}
        className={`leave-project-btn ${button.lightRed}`}
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        Leave Project
      </motion.button>
      <LeaveProjectModal
        id={id}
        show={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
      />

      <motion.button
        onClick={() => setShowDeleteModal(true)}
        className={`delete-project-btn ${button.red}`}
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        Delete Project
      </motion.button>
      <DeleteProjectModal
        id={id}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default Settings;
