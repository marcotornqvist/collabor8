import React, { ReactElement } from "react";
import SettingsLayout from "@components-pages/settings/SettingsLayout";

const Account = () => {
  return <div className="settings-account">account</div>;
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout title={"Register"}>{page}</SettingsLayout>;
};

export default Account;
