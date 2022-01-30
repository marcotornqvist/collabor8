import { ReactElement } from "react";
import { useLoggedInAccountDetailsQuery } from "generated/graphql";
import SettingsLayout from "@/components-pages/settings/SettingsLayout";
import UpdateUsername from "@/components-pages/settings/account/UpdateUsername";
import UpdateEmail from "@/components-pages/settings/account/UpdateEmail";
import UpdatePassword from "@/components-pages/settings/account/UpdatePassword";
import DeleteAccount from "@/components-pages/settings/account/DeleteAccount";

const Account = () => {
  const { data, loading } = useLoggedInAccountDetailsQuery({
    fetchPolicy: "cache-only", // Fetches from cache only, navbar fetches all the logged in user data when page is loaded and authState is true..
  });

  return (
    <div className="settings-account">
      <div className="container">
        <h2 className="title">Account Settings</h2>
        <UpdateUsername
          currentUsername={data?.loggedInUser.username}
          loading={loading}
        />
        <UpdateEmail
          currentEmail={data?.loggedInUser.email}
          loading={loading}
        />
        <UpdatePassword loading={loading} />
        {!loading && <DeleteAccount />}
      </div>
    </div>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout title={"Register"}>{page}</SettingsLayout>;
};

export default Account;
