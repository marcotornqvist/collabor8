import { ReactElement } from "react";
import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "@operations-queries/getLoggedInUser";
import { loggedInUser } from "generated/loggedInUser";
import SettingsLayout from "@components-pages/settings/SettingsLayout";
import UpdateUsername from "@components-pages/settings/account/UpdateUsername";
import UpdateEmail from "@components-pages/settings/account/UpdateEmail";
import UpdatePassword from "@components-pages/settings/account/UpdatePassword";
import DeleteAccount from "@components-pages/settings/account/DeleteAccount";

// Fetch username, email

const Account = () => {
  const { data, loading } = useQuery<loggedInUser>(GET_LOGGED_IN_USER);
  return (
    <div className="settings-account">
      <div className="container">
        <h2 className="title">Account Settings</h2>
        <UpdateUsername
          currentUsername={data?.loggedInUser.username}
          loading={loading}
        />
        <UpdateEmail email={data?.loggedInUser.email} loading={loading} />
        <UpdatePassword loading={loading} />
        <DeleteAccount />
      </div>
    </div>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout title={"Register"}>{page}</SettingsLayout>;
};

export default Account;
