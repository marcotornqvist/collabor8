import React, { useEffect, useState } from "react";
import { ErrorStatus } from "@/types-enums/enums";
import { toastState } from "store";
import { motion } from "framer-motion";
import { fadeInVariants } from "utils/variants";
import {
  ProjectByIdDocument,
  ProjectMemberStatusDocument,
  useAcceptInviteMutation,
} from "generated/graphql";
import button from "@/styles-modules/Button.module.scss";

interface IProps {
  id: string;
}

const AcceptButton = ({ id }: IProps) => {
  const [error, setError] = useState("");
  const [acceptInvite, { data }] = useAcceptInviteMutation({
    variables: {
      id,
    },
    refetchQueries: [
      {
        query: ProjectMemberStatusDocument, // DocumentNode object parsed with gql
        variables: {
          id,
        },
      },
      {
        query: ProjectByIdDocument, // DocumentNode object parsed with gql
        variables: {
          id,
        },
      },
    ],
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    if (error) {
      toastState.addToast(error, ErrorStatus.danger);
    }
  }, [data, error]);

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
