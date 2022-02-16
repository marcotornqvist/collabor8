import React, { useEffect, useState } from "react";
import {
  Project_Member_Status,
  useProjectMemberStatusLazyQuery,
  useProjectMemberStatusQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import Form from "@/components-pages/edit-project/Form";
import NavigationSlide from "@/components-modules/global/NavigationSlide";
import Settings from "@/components-pages/edit-project/Settings";
import { useSnapshot } from "valtio";
import { authState } from "store";

const EditProject = () => {
  const { loading } = useSnapshot(authState);
  let {
    push,
    query: { id },
  } = useRouter();
  const [navigation, setNavigation] = useState("Details");
  // Sets id to a string
  id = typeof id === "string" ? id : "";

  // Gets memberStatus of the logged in user or guest
  const [memberStatus, { data, error }] = useProjectMemberStatusLazyQuery({
    variables: {
      id,
    },
  });

  // Checks that authState has loaded before executing memberStatus
  useEffect(() => {
    if (!loading) {
      memberStatus();
    }
  }, [loading]);

  // If user is anything else but Admin, the user will be redirected to "/projects"
  useEffect(() => {
    if (
      error ||
      (data?.projectMemberStatus &&
        data.projectMemberStatus !== Project_Member_Status.Admin)
    ) {
      push("/projects");
    }
  }, [error, data?.projectMemberStatus]);

  if (data?.projectMemberStatus === Project_Member_Status.Admin) {
    return (
      <section className="edit-project-page">
        <div className="container">
          <h2 className="title">Edit Project</h2>
          <NavigationSlide
            items={["Details", "Members", "Settings"]}
            selected={navigation}
            setNavigation={setNavigation}
          />
          {(navigation === "Details" || navigation === "Members") && (
            <Form
              id={id}
              setNavigation={setNavigation}
              navigation={navigation}
            />
          )}
          {navigation === "Settings" && <Settings id={id} />}
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default EditProject;
