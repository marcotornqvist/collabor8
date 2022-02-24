import { ReactElement } from "react";
import ChatLayout from "@/components-pages/chat/ChatLayout";

const Project = () => {
  return <div>Project</div>;
};

Project.getLayout = function getLayout(page: ReactElement) {
  return <ChatLayout>{page}</ChatLayout>;
};

export default Project;
