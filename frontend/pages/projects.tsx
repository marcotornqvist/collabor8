import { ReactElement } from "react";
import ProfileList from "@/components-pages/profiles/ProfileList";
import ContentLayout from "@/components-layout/content/ContentLayout";

const Projects = () => {
  return <ProfileList />;
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout className={"projects-page"}>{page}</ContentLayout>;
};

export default Projects;
