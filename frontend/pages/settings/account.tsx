import React, { ReactElement } from "react";
import SettingsLayout from "@components-pages/settings/SettingsLayout";

const Account = () => {
  return (
    <div className="settings-account">
      <div className="container">account</div>
    </div>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout title={"Register"}>{page}</SettingsLayout>;
};

export default Account;
