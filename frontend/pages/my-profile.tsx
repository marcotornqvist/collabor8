import { FC } from "react";
import Dropdown from "@components-modules/menu/country/Dropdown";
// import Test from "@myapp-components/Test";
import { UploadFile } from "@components-pages/myprofile/UploadFile";
import Image from "next/image";

const MyProfile: FC = () => {
  return (
    <div className="my-profile-page">
      <div className="container">
        <UploadFile />
        {/* <Image
          src={
            "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/c4bdf064-4be8-4d2c-b311-b4fa6e0c3f5c.jpg"
          }
          width={500}
          height={500}
        /> */}
      </div>
    </div>
  );
};

export default MyProfile;
