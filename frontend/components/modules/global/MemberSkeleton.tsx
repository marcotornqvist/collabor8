import React from "react";
import styles from "@/styles-modules/Members.module.scss";

const MemberSkeleton = () => {
  return (
    <div className={`skeleton-item ${styles.skeleton}`}>
      <div className="skeleton-content">
        <div className="profile-details">
          <div className="skeleton thumbnail"></div>
          <div className="wrapper">
            <div className="skeleton title"></div>
            <div className="skeleton subtitle"></div>
          </div>
        </div>
        <div className="skeleton button"></div>
      </div>
      <div className={`shimmer-wrapper ${styles.shimmerWrapper}`}>
        <div className="shimmer"></div>
      </div>
    </div>
  );
};

export default MemberSkeleton;
