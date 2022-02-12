import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "utils/variants";
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  ProjectByIdDocument,
  ProjectByIdQuery,
  ProjectMemberStatusDocument,
  ProjectMemberStatusQuery,
  Project_Member_Status,
  Role,
  useAcceptInviteMutation,
} from "generated/graphql";
import button from "@/styles-modules/Button.module.scss";
import useToast from "@/hooks/useToast";

interface IProps {
  id: string;
}

const AcceptButton = ({ id }: IProps) => {
  const [error, setError] = useState("");
  const [acceptInvite] = useAcceptInviteMutation({
    variables: {
      id,
    },
    update(cache, { data }) {
      const project = cache.readQuery<ProjectByIdQuery>({
        query: ProjectByIdDocument,
        variables: {
          id,
        },
      });

      const user = cache.readQuery<LoggedInUserQuery>({
        query: LoggedInUserDocument,
      });

      if (
        data?.acceptInvite &&
        project?.projectById?.members &&
        user?.loggedInUser
      ) {
        // Update memberStatus of logged in user to the value of "MEMBER"
        cache.writeQuery<ProjectMemberStatusQuery>({
          query: ProjectMemberStatusDocument,
          variables: {
            id,
          },
          data: {
            projectMemberStatus: Project_Member_Status.Member,
          },
        });

        // Add logged in user to members list
        cache.writeQuery<ProjectByIdQuery>({
          query: ProjectByIdDocument,
          variables: {
            id,
          },
          data: {
            projectById: {
              ...project.projectById,
              members: [
                ...project.projectById.members,
                // Adds new member object to the members list
                {
                  role: Role.Member,
                  userId: user.loggedInUser.id,
                  user: {
                    ...user.loggedInUser,
                  },
                },
              ],
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

  return (
    <motion.button
      className={`accept-project-btn ${button.lightGreen}`}
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      onClick={() => acceptInvite()}
    >
      Accept Invite
    </motion.button>
  );
};

export default AcceptButton;
