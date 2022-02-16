import React from "react";
import button from "@/styles-modules/Button.module.scss";

interface IProps {
  id: string;
}

const Settings = ({ id }: IProps) => {
  return (
    <div className="settings">
      <button className={button.lightRed}>Disable Project</button>
      <button className={button.red}>Delete Project</button>
    </div>
  );
};

export default Settings;
