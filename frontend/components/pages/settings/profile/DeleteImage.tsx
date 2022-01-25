import React, { useState } from "react";
import button from "@/styles-modules/Button.module.scss";
import DeleteModal from "@/components-pages/settings/profile/DeleteModal";

interface IProps {
  current: Boolean;
}

const DeleteImage = ({ current }: IProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className={`${
          current ? button.lightRed : button.disabled
        } delete-image-btn`}
        onClick={() => setShowModal(current ? true : false)}
      >
        Delete Image
      </button>
      <DeleteModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );

  // return (
  //   current && (
  //     <>
  //       <button
  //         className={`${button.lightRed} delete-image-btn`}
  //         onClick={() => setShowModal(true)}
  //       >
  //         Delete Image
  //       </button>
  //       <DeleteModal show={showModal} onClose={() => setShowModal(false)} />
  //     </>
  //   )
  // );
};

export default DeleteImage;
