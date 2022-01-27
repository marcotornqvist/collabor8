import { useEffect, useState } from "react";
import BlockModal from "./BlockModal";
import { authState } from "../../../store";
import { useSnapshot } from "valtio";
import { useIsUserBlockedLazyQuery } from "generated/graphql";

interface IProps {
  id: string;
  isVisible: boolean;
}

const BlockUser = ({ id, isVisible }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuth } = useSnapshot(authState);

  const [isUserBlocked, { data }] = useIsUserBlockedLazyQuery({
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (isVisible) {
      isUserBlocked();
    }
  }, [isVisible]);

  return isAuth ? (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={data?.isUserBlocked ? "success-hover" : "danger-hover"}
      >
        <span>{data?.isUserBlocked ? "Unblock" : "Block"} User</span>
      </button>
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
