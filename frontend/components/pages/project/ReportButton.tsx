import Link from "next/link";
import React from "react";
import { authState } from "store";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";
import { fadeInVariants } from "utils/variants";
import button from "@/styles-modules/Button.module.scss";

interface IProps {
  id: string;
}

const ReportButton = ({ id }: IProps) => {
  const { isAuth } = useSnapshot(authState);

  if (isAuth) {
    return (
      <Link href={`/report/project/${id}`}>
        <a className="report-project-btn">
          <motion.button
            className={`report-project-btn ${button.lightRed}`}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            Report Project
          </motion.button>
        </a>
      </Link>
    );
  } else {
    return (
      <Link
        href={{
          pathname: "/login",
          query: { redirect: `/report/project/${id}` },
        }}
      >
        <a className="report-project-btn">
          <motion.button
            className={`report-project-btn ${button.lightRed}`}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            Report Project
          </motion.button>
        </a>
      </Link>
    );
  }
};

export default ReportButton;
