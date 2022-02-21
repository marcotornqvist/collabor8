import { useEffect, useState } from "react";
import { authState } from "store";
import { useSnapshot } from "valtio";
import { useIsUserBlockedLazyQuery } from "generated/graphql";
import button from "@/styles-modules/Button.module.scss";
import BlockModal from "./BlockModal";

interface IProps {
  id: string;
  isVisible: boolean;
}

const BlockUserButton = ({ id, isVisible }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuth } = useSnapshot(authState);

  const [isUserBlocked, { data }] = useIsUserBlockedLazyQuery({
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (isVisible && isAuth) {
      isUserBlocked();
    }
  }, [isVisible, isAuth]);

  return isAuth ? (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={
          data?.isUserBlocked
            ? `success-button ${button.lightGreen}`
            : `danger-button ${button.lightRed}`
        }
      >
        {data?.isUserBlocked ? "Unblock" : "Block"} User
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

export default BlockUserButton;
