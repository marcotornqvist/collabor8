import React, { useEffect, useState } from "react";
import {
  ProjectMemberStatus,
  useProjectMemberStatusLazyQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authState } from "store";
import NavigationSlide from "@/components-modules/global/NavigationSlide";
import Form from "@/components-pages/edit-project/Form";
import useSkeleton from "@/hooks/useSkeleton";
import useIsMobile from "@/hooks/useIsMobile";
import dynamic from "next/dynamic";

const Members = dynamic(
  async () => (await import("@/components-pages/edit-project/Members")).default
);

const Settings = dynamic(
  async () => (await import("@/components-pages/edit-project/Settings")).default
);

const EditProject = () => {
  const { showSkeleton, setShowSkeleton } = useSkeleton();
  const { loading } = useSnapshot(authState);
  let {
    push,
    query: { id },
  } = useRouter();
  const [navigation, setNavigation] = useState("Details");
  // Sets id to a string
  id = typeof id === "string" ? id : "";

  // Gets memberStatus of the logged in user or guest
  const [memberStatus, { data: statusData, error, client }] =
    useProjectMemberStatusLazyQuery({
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
      (statusData?.projectMemberStatus &&
        statusData.projectMemberStatus !== ProjectMemberStatus.Admin)
    ) {
      push("/projects");
    }
  }, [error, statusData?.projectMemberStatus]);

  const { isMobile } = useIsMobile();

  // Deletes project from cache when component is unmounted (page is changed)
  useEffect(() => {
    return () => {
      const normalizedId = client.cache.identify({ id, __typename: "Project" });
      client.cache.evict({ id: normalizedId });
      client.cache.gc();
    };
  }, [id]);

  if (statusData?.projectMemberStatus === ProjectMemberStatus.Admin) {
    return (
      <section className="edit-project-page">
        <div className="container">
          <h2 className="title">Edit Project</h2>
          <NavigationSlide
            items={["Details", "Members", "Settings"]}
            selected={navigation}
            setNavigation={setNavigation}
          />
          {navigation === "Details" && (
            <Form
              isMobile={isMobile}
              id={id}
              setNavigation={setNavigation}
              navigation={navigation}
            />
          )}
          {navigation === "Members" && (
            <Members
              showSkeleton={showSkeleton}
              setShowSkeleton={setShowSkeleton}
              id={id}
              isMobile={isMobile}
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
