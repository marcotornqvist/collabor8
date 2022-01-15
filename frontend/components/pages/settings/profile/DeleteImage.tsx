import React, { useState } from "react";
import button from "@styles-modules/Button.module.scss";
import DeleteModal from "@components-pages/settings/profile/DeleteModal";

interface IProps {
  current: Boolean;
}

const DeleteImage = ({ current }: IProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    current && (
      <>
        <button
          className={`${button.lightRed} delete-image-btn`}
          onClick={() => setShowModal(true)}
        >
          Delete Image
        </button>
        <DeleteModal show={showModal} onClose={() => setShowModal(false)} />
      </>
    )
  );
};

export default DeleteImage;
