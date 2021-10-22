import React from "react";
import { useRouter } from "next/router";

const ReportUser = () => {
  const router = useRouter();

  return <div className="report-user-page">{router.asPath}</div>;
};

export default ReportUser;
