import React from "react";
import Navigation from "./Navigation";

interface IProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: IProps) => {
  return (
    <section className="settings-page">
      <Navigation />
      {children}
    </section>
  );
};

export default SettingsLayout;
