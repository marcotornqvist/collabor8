import { ReactElement } from "react";
import { useEffect, useState } from "react";
import {
  Sort,
  ProjectsQuery,
  ProjectsQueryVariables,
  useProjectsLazyQuery,
} from "generated/graphql";
import { isNumbersArray } from "utils/helpers";
import { useQueryParams, NumericArrayParam } from "next-query-params";
import { singleStringParam } from "utils/customQueryParams";
import ContentLayout from "@/components-layout/content/ContentLayout";
import useSkeleton from "@/hooks/useSkeleton";
import ProjectList from "@/components-modules/project-list/ProjectList";

const limit = 20;

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [disableMore, setDisableMore] = useState(false);
  const { showSkeleton, setShowSkeleton } = useSkeleton();
  const [query] = useQueryParams({
    search: singleStringParam,
    country: singleStringParam,
    disciplines: NumericArrayParam,
    sort: singleStringParam,
  });

  // Returns projects based on the filters provided
  const [getProjects, { data, loading, fetchMore, client }] =
    useProjectsLazyQuery({
      variables: {
        data: {
          first: limit,
          searchText: query.search,
          country: query.country,
          disciplines: isNumbersArray(query.disciplines),
          sort: query.sort !== "asc" ? Sort.Desc : Sort.Asc,
        },
      },
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    client.cache.evict({ id: "ROOT_QUERY", fieldName: "projects" });
    setShowSkeleton(true);
    getProjects();
    setDisableMore(false);
  }, [query]);

  // If element after last grid item is visible, fetch more users if conditions match
  useEffect(() => {
    // Checks if element is visible, if more than or equal to (limit) users fetched
    // is returned in response and if disableMore is false
    if (
      isVisible &&
      !disableMore &&
      data?.projects &&
      data.projects.length >= limit
    ) {
      fetchMore<ProjectsQuery, ProjectsQueryVariables>({
        variables: {
          data: {
            after: data.projects[data.projects.length - 1].id,
            first: limit,
            searchText: query.search,
            country: query.country,
            disciplines: isNumbersArray(query.disciplines),
            sort: query.sort !== "asc" ? Sort.Desc : Sort.Asc,
          },
        },
      }).then(({ data: { projects } }) => {
        // Sets disableMore to true if less than limit was in response
        if (projects && projects.length < limit) {
          setDisableMore(true);
        }
      });
    }
  }, [isVisible, data?.projects]);

  return (
    <ProjectList
      projects={data?.projects}
      loading={loading}
      setIsVisible={setIsVisible}
      skeleton={{ showSkeleton, setShowSkeleton }}
    />
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout className={"projects-page"}>{page}</ContentLayout>;
};

export default Projects;
