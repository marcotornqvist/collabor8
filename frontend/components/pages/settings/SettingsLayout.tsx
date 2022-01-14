import useWindowSize from "@hooks/useWindowSize";
import React from "react";
import Navigation from "./Navigation";
import Sidenav from "./Sidenav";

interface Props {
  children: React.ReactNode;
  title: String;
}

const SettingsLayout = ({ children }: Props) => {
  const { width } = useWindowSize();
  return (
    <div className="settings-page">
      <div className="container">
        {width < 920 ? <Navigation /> : <Sidenav />}
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
