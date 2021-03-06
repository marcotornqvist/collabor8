import { useState } from "react";
import {
  ProjectMemberStatus,
  useProjectMemberStatusQuery,
} from "generated/graphql";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import button from "@/styles-modules/Button.module.scss";
import ReportButton from "./ReportButton";
import LeaveProjectModal from "@/components-modules/project-settings/LeaveProjectModal";
import AcceptButton from "./AcceptButton";
import Link from "next/link";

interface IProps {
  id: string;
}

const Settings = ({ id }: IProps) => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const { data } = useProjectMemberStatusQuery({
    variables: {
      id,
    },
  });

  // Create a accept invitation button for users that have a pending or false status
  // After accept refetch the user project
  const { Member, Admin, InvitedUser } = ProjectMemberStatus;

  return (
    <div className="settings">
      <div className="buttons">
        {(data?.projectMemberStatus === Member ||
          data?.projectMemberStatus === Admin) && (
          <>
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
          </>
        )}
        {data?.projectMemberStatus === InvitedUser && <AcceptButton id={id} />}
        {data?.projectMemberStatus === Admin ? (
          <Link href={`/edit-project/${id}`}>
            <a>
              <button className={`edit-project-btn ${button.lightGreen}`}>
                Edit Project
              </button>
            </a>
          </Link>
        ) : (
          <ReportButton id={id} />
        )}
      </div>
    </div>
  );
};

export default Settings;
