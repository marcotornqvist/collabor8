import React from "react";
import Testing from "@/components-modules/Testing";

// Check if logged in user matches [profile] username, then return different components such as edit

const Profile = () => {
  const items = [
    {
      name: "test",
      href: "/test",
      status: true,
    },
  ];
  return (
    <div className="profile-page">
      <div className="container">
        <Testing items={items} />
      </div>
    </div>
  );
};

export default Profile;
