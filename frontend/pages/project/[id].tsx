import React, { useEffect } from "react";
import { authState } from "store";
import { useSnapshot } from "valtio";
import { MemberStatusCode, useProjectByIdQuery } from "generated/graphql";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import About from "@/components-pages/project/About";
import Members from "@/components-pages/project/Members";
import Settings from "@/components-pages/project/Settings";

const Project = () => {
  let {
    push,
    query: { id },
  } = useRouter();
  id = typeof id === "string" ? id : "";
  const { loading } = useSnapshot(authState);
  const {
    data,
    error,
    loading: dataLoading,
  } = useProjectByIdQuery({
    variables: {
      data: {
        id,
        status: [MemberStatusCode.Accepted],
      },
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      push("/projects");
    }
  }, [error]);

  return (
    <section className="project-page">
      <div className="container">
        {!loading && !dataLoading && !error && (
          <motion.article
            className="content"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <h3 className="title">{data?.projectById?.title}</h3>
            <About body={data?.projectById?.body} />
            <Members members={data?.projectById?.members} />
            <Settings id={typeof id === "string" ? id : ""} />
          </motion.article>
        )}
      </div>
    </section>
  );
};

export default Project;
