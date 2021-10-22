import React from "react";
import { useRouter } from "next/router";

const ReportProject = () => {
  const router = useRouter();

  return <div className="report-project-page">{router.asPath}</div>;
};

export default ReportProject;
