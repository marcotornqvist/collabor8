import React from "react";
import { useEffect, useState } from "react";
import { useLoggedInUserLazyQuery } from "generated/graphql";
import { useSnapshot } from "valtio";
import { authState, layoutState } from "store";

const Projects = () => {
  // const [loggedInUser, { data }] = useLoggedInUserLazyQuery();
  // const { isAuth, loading } = useSnapshot(authState);

  // console.log(data);

  // useEffect(() => {
  //   if (isAuth) {
  //     console.log("sf");
  //     loggedInUser();
  //   }
  // }, [isAuth]);
  return <div className="projects-page"></div>;
};

export default Projects;
