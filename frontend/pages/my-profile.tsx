import { useState } from "react";
import("scroll-behavior-polyfill");

const MyProfile = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="my-profile-page">
      <div className="container"></div>
    </div>
  );
};

export default MyProfile;
