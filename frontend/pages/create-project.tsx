import React, { useState } from "react";
import Form from "@/components-pages/create-project/Form";
import NavigationSlide from "@/components-modules/global/NavigationSlide";

const CreateProject = () => {
  const [navigation, setNavigation] = useState("Details");

  return (
    <section className="create-project-page">
      <div className="container">
        <h2 className="title">Create Project</h2>
        <NavigationSlide
          items={["Details", "Members"]}
          selected={navigation}
          setNavigation={setNavigation}
        />
        <Form setNavigation={setNavigation} navigation={navigation} />
      </div>
    </section>
  );
};

export default CreateProject;
