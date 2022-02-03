import React from "react";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
  title: String;
}

const SettingsLayout = ({ children }: Props) => {
  return (
    <section className="settings-page">
      <Navigation />
      {children}
    </section>
  );
};

export default SettingsLayout;
