import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="skeleton-item">
      <div className="skeleton-content">
        <div className="top-bar">
          <div className="skeleton cog-wheel"></div>
        </div>
        <div className="wrapper">
          <div className="skeleton thumbnail"></div>
          <div className="skeleton title"></div>
          <div className="skeleton subtitle"></div>
        </div>
        <div className="skeleton button"></div>
      </div>
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
