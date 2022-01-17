import { ReactElement } from "react";
import { UploadFile } from "@components-pages/settings/profile/UploadFile";
import { GET_PROFILE_IMAGE } from "@operations-queries/getLoggedInProfile";
import { loggedInProfileImage } from "generated/loggedInProfileImage";
import { useQuery } from "@apollo/client";
import SettingsLayout from "@components-pages/settings/SettingsLayout";
import DeleteImage from "@components-pages/settings/profile/DeleteImage";
import ProfileImage from "@components-modules/global/ProfileImage";
import Form from "@components-pages/settings/profile/Form";

interface Errors {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

const Profile = () => {
  const { data } = useQuery<loggedInProfileImage>(GET_PROFILE_IMAGE);

  // if (loading) return <div>Submitting...</div>;

  return (
    <div className="settings-profile">
      <div className="thumbnail-panel">
        <div className="image-container">
          <ProfileImage
            size={40}
            profileImage={data?.loggedInProfile?.profileImage}
            priority={true}
          />
        </div>
        <UploadFile />
        <DeleteImage
          current={data?.loggedInProfile?.profileImage ? true : false}
        />
      </div>
      <Form />
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout title={"Register"}>{page}</SettingsLayout>;
};

export default Profile;
