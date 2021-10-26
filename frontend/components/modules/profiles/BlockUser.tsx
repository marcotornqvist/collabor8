import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { isUserBlocked, isUserBlockedVariables } from "generated/isUserBlocked";
import BlockModal from "./BlockModal";
import { IS_USER_BLOCKED } from "@operations-queries/isUserBlocked";
import { authState, toastState } from "../../../store";
import { useSnapshot } from "valtio";
import { ErrorStatus } from "@types-enums/enums";

interface IProps {
  id: string;
  isVisible: boolean;
}

const BlockUser = ({ id, isVisible }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuth } = useSnapshot(authState);

  const [isUserBlocked, { data }] = useLazyQuery<
    isUserBlocked,
    isUserBlockedVariables
  >(IS_USER_BLOCKED, {
    variables: {
      isUserBlockedId: id,
    },
  });

  useEffect(() => {
    if (isVisible) {
      isUserBlocked();
    }
  }, [isVisible]);

  return isAuth ? (
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
  ) : null;
};

export default BlockUser;
