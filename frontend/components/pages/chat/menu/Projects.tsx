import React from "react";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import ProjectItem from "./ProjectItem";

interface IProps {
  id: string;
  isMobile: boolean;
}

const Projects = ({ id, isMobile }: IProps) => {
  return (
    <div className="projects">
      <motion.h4
        initial={"hidden"}
        animate={"visible"}
        variants={fadeInVariants}
      >
        Groups
      </motion.h4>
      <ul>
        <ProjectItem
          id={id}
          selected={!isMobile && true}
          newMessages={true}
          title={"Creative Project Name"}
        />
        <ProjectItem
          id={id}
          selected={!isMobile && id === `/chat/project/${"asf"}`}
          newMessages={false}
          title={"Creative Project Name"}
        />
      </ul>
    </div>
  );
};

export default Projects;
