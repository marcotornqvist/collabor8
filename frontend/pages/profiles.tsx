import { ReactElement } from "react";
import ProfileList from "@/components-pages/profiles/ProfileList";
import ContentLayout from "@/components-layout/content/ContentLayout";

const Profiles = () => {
  return <ProfileList />;
};

Profiles.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout className={"profiles-page"}>{page}</ContentLayout>;
};

export default Profiles;
