import { useState } from "react";
import button from "@/styles-modules/Button.module.scss";
import DeleteModal from "./DeleteModal";

const DeleteAccount = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="delete-account">
      <button className={button.lightRed} onClick={() => setToggle(!toggle)}>
        Delete Account
        <DeleteModal show={toggle} onClose={() => setToggle(false)} />
      </button>
    </div>
  );
};

export default DeleteAccount;
