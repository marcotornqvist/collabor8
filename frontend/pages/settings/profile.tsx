import { ReactElement } from "react";
import { UploadFile } from "@/components-pages/settings/profile/UploadFile";
import { useProfileImageQuery } from "generated/graphql";
import SettingsLayout from "@/components-pages/settings/SettingsLayout";
import DeleteImage from "@/components-pages/settings/profile/DeleteImage";
import ProfileImage from "@/components-modules/global/ProfileImage";
import Form from "@/components-pages/settings/profile/Form";

const Profile = () => {
  const { data } = useProfileImageQuery({
    fetchPolicy: "cache-only", // Fetches from cache only, navbar fetches all the logged in user data when page is loaded and authState is true..
  });

  return (
    <div className="settings-profile">
      <div className="container">
        <h2 className="title">Profile Settings</h2>
        <div className="thumbnail-panel">
          <ProfileImage
            profileImage={data?.loggedInUser.profile?.profileImage}
            priority={true}
          />
          <div className="buttons">
            <UploadFile />
            <DeleteImage
              current={data?.loggedInUser.profile?.profileImage ? true : false}
            />
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default Profile;
