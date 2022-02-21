import { useEffect, useState } from "react";
import {
  ProjectsByUsernameQuery,
  ProjectsByUsernameQueryVariables,
  useProjectsByUsernameQuery,
} from "generated/graphql";
import useSkeleton from "@/hooks/useSkeleton";
import ProjectList from "@/components-modules/project-list/ProjectList";

interface IProps {
  username: string;
}

const limit = 20;

const Projects = ({ username }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [disableMore, setDisableMore] = useState(false);
  const skeleton = useSkeleton();

  const { data, loading, fetchMore } = useProjectsByUsernameQuery({
    variables: {
      data: {
        username,
        first: limit,
      },
    },
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  // If element after last grid item is visible, fetch more users if conditions match
  useEffect(() => {
    // Checks if element is visible, if more than or equal to (2) users fetched
    // is returned in response and if disableMore is false
    if (
      isVisible &&
      !disableMore &&
      data?.projectsByUsername &&
      data.projectsByUsername.length >= limit
    ) {
      fetchMore<ProjectsByUsernameQuery, ProjectsByUsernameQueryVariables>({
        variables: {
          data: {
            username,
            after:
              data.projectsByUsername[data.projectsByUsername.length - 1].id,
            first: limit,
          },
        },
      }).then(({ data: { projectsByUsername } }) => {
        // Sets disableMore to true if less than limit was in response
        if (projectsByUsername && projectsByUsername.length < limit) {
          setDisableMore(true);
        }
      });
    }
  }, [isVisible, data?.projectsByUsername]);

  return (
    <ProjectList
      projects={data?.projectsByUsername}
      loading={loading}
      skeleton={skeleton}
      setIsVisible={setIsVisible}
    />
  );
};

export default Projects;
