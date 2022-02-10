import { authState } from "store";
import { useSnapshot } from "valtio";
import { useProjectByIdQuery } from "generated/graphql";
import About from "@/components-pages/project/About";
import Members from "@/components-pages/project/Members";
import Settings from "@/components-pages/project/Settings";
import React from "react";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";

const Project = () => {
  const { loading } = useSnapshot(authState);
  const { data, loading: dataLoading } = useProjectByIdQuery({
    variables: {
      id: "67fd29f7-6766-433c-9d4d-a57b60661bb2",
    },
  });

  return (
    <section className="project-page">
      <div className="container">
        {!dataLoading && (
          <motion.article
            className="content"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <h3 className="title">{data?.projectById?.title}</h3>
            <About body={data?.projectById?.body} />
            <Members members={data?.projectById?.members} />
            <Settings />
          </motion.article>
        )}
      </div>
    </section>
  );
};

export default Project;
