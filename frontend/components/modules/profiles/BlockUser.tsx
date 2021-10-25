import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { isUserBlocked, isUserBlockedVariables } from "generated/isUserBlocked";
import BlockModal from "./BlockModal";
import { IS_USER_BLOCKED } from "@operations-queries/isUserBlocked";

interface IProps {
  id: string;
  isVisible: boolean;
}

const BlockUser = ({ id, isVisible }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const [isUserBlocked, { data }] = useLazyQuery<
    isUserBlocked,
    isUserBlockedVariables
  >(IS_USER_BLOCKED, {
    variables: {
      isUserBlockedId: id,
    },
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    if (isVisible) {
      isUserBlocked();
    }
  }, [isVisible]);

  return (
    <>
      <li
        onClick={() => setShowModal(true)}
        className={data?.isUserBlocked ? "success-hover" : "danger-hover"}
      >
        <span>{data?.isUserBlocked ? "Unblock" : "Block"} User</span>
      </li>
      <BlockModal
        id={id}
        show={showModal}
        onClose={() => setShowModal(false)}
        isBlocked={data?.isUserBlocked ? true : false}
      />
    </>
  );
};

export default BlockUser;
