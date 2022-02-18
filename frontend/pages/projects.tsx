import { ReactElement } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
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
import ProjectItem from "@/components-modules/projectItem/ProjectItem";
import ProjectSkeleton from "@/components-modules/projectItem/ProjectSkeleton";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useSkeleton from "@/hooks/useSkeleton";

const limit = 20;

const Projects = () => {
  const [disableMore, setDisableMore] = useState(false);
  const { showSkeleton, setShowSkeleton } = useSkeleton();
  const [query, setQuery] = useQueryParams({
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

  // Checks if element after last grid item is visible (infinite scroll)
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  // If element after last grid item is visible, fetch more users if conditions match
  useEffect(() => {
    // Checks if element is visible, if more than or equal to (2) users fetched
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

  const projects = useMemo(
    () =>
      data?.projects?.map((item) => {
        if (
          item.disciplines &&
          item.disciplines.length > 0 &&
          item.disciplines[0].image
        ) {
          const { small, alt, objectPosition } = item.disciplines[0].image;
          return (
            <ProjectItem
              key={item.id}
              id={item.id}
              title={item.title}
              src={small}
              alt={alt}
              objectPosition={objectPosition}
            />
          );
        }
        return <ProjectItem key={item.id} id={item.id} title={item.title} />;
      }),
    [data?.projects]
  );
  return (
    <div className="project-list">
      {!showSkeleton &&
        !loading &&
        data?.projects &&
        data.projects.length === 0 && (
          <div className="no-projects-found">
            <div className="content">
              <h3>We couldn&apos;t find any projects.</h3>
              <span>Try adjusting the filters...</span>
            </div>
          </div>
        )}
      <div className="grid">
        {!showSkeleton && projects}
        {(showSkeleton || loading) &&
          [1, 2, 3, 4, 5, 6].map((n) => <ProjectSkeleton key={n} />)}
      </div>
      <div ref={ref} className="bottom-visible"></div>
    </div>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout className={"projects-page"}>{page}</ContentLayout>;
};

export default Projects;
