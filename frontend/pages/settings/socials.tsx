import React, { ReactElement } from "react";
import SettingsLayout from "@components-pages/settings/SettingsLayout";

const Socials = () => {
  return (
    <div className="settings-socials">
      <div className="container">socials</div>
    </div>
  );
};

Socials.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout title={"Register"}>{page}</SettingsLayout>;
};

export default Socials;
