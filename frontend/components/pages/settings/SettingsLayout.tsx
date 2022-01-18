import React from "react";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
  title: String;
}

const SettingsLayout = ({ children }: Props) => {
  return (
    <div className="settings-page">
      <Navigation />
      {children}
    </div>
  );
};

export default SettingsLayout;
