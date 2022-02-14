import React, { useState } from "react";
import Form from "@/components-pages/create-project/Form";

const CreateProject = () => {
  const [navigation, setNavigation] = useState(true);
  return (
    <section className="create-project-page">
      <div className="container">
        <h2 className="title">Create Project</h2>
        <nav className="navigation">
          <ul>
            <li
              className={`navigation-item${navigation ? " active" : ""}`}
              onClick={() => setNavigation(false)}
            >
              Details
            </li>
            <li
              className={`navigation-item${!navigation ? " active" : ""}`}
              onClick={() => setNavigation(true)}
            >
              Members
            </li>
          </ul>
        </nav>
        <Form navigation={navigation} />
      </div>
    </section>
  );
};

export default CreateProject;
