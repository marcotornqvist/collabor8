import { FC } from "react";
import Dropdown from "@components-modules/menu/country/Dropdown";
// import Test from "@myapp-components/Test";
import { UploadFile } from "@components-pages/myprofile/UploadFile";

const MyProfile: FC = () => {
  return (
    <div className="my-profile-page">
      {/* <Dropdown /> */}
      <div className="container">
        <UploadFile />
      </div>
    </div>
  );
};

export default MyProfile;
