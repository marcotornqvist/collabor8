import React from "react";
import styles from "@/styles-modules/ProjectItem.module.scss";

const ProjectSkeleton = () => {
  return (
    <div className={`skeleton-item skeleton-project ${styles.skeleton}`}>
      <div className="skeleton-content">
        <div className="skeleton image"></div>
        <div className="wrapper">
          <div className="title-container">
            <div className="skeleton title"></div>
          </div>
          <div className="skeleton button"></div>
        </div>
      </div>
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;
