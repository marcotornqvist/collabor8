import { ReactElement } from "react";
import ContentLayout from "@/components-layout/content/ContentLayout";
import ProjectList from "@/components-pages/projects/ProjectList";

const Projects = () => {
  return <ProjectList />;
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout className={"projects-page"}>{page}</ContentLayout>;
};

export default Projects;
