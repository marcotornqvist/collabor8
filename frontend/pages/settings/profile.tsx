import { ReactElement } from "react";
import { UploadFile } from "@components-pages/settings/profile/UploadFile";
import { GET_PROFILE_IMAGE } from "@operations-queries/getLoggedInProfile";
import { loggedInProfileImage } from "generated/loggedInProfileImage";
import { useQuery } from "@apollo/client";
import SettingsLayout from "@components-pages/settings/SettingsLayout";
import DeleteImage from "@components-pages/settings/profile/DeleteImage";
import ProfileImage from "@components-modules/global/ProfileImage";
import Form from "@components-pages/settings/profile/Form";
// import useWindowSize from "@hooks/useWindowSize";

const Profile = () => {
  const { data } = useQuery<loggedInProfileImage>(GET_PROFILE_IMAGE);

  // const { width } = useWindowSize();

  return (
    <div className="settings-profile">
      <div className="container">
        <h2 className="title">Profile Settings</h2>
        <div className="thumbnail-panel">
          <ProfileImage
            profileImage={data?.loggedInProfile?.profileImage}
            priority={true}
          />
          <div className="buttons">
            <UploadFile />
            <DeleteImage
              current={data?.loggedInProfile?.profileImage ? true : false}
            />
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout title={"Register"}>{page}</SettingsLayout>;
};

export default Profile;
