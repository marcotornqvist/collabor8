import { useEffect, useMemo, useRef } from "react";
import { ProjectsQuery } from "generated/graphql";
import ProjectItem from "./ProjectItem";
import ProjectSkeleton from "./ProjectSkeleton";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import styles from "@/styles-modules/ProjectItem.module.scss";
import { Skeleton } from "types/types";

interface IProps {
  projects: ProjectsQuery["projects"];
  loading: boolean;
  setIsVisible: (isVisible: boolean) => void;
  skeleton: Skeleton;
}

const ProjectList = ({
  projects,
  loading,
  setIsVisible,
  skeleton: { showSkeleton },
}: IProps) => {
  // Checks if element after last grid item is visible (infinite scroll)
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});

  useEffect(() => {
    setIsVisible(!!entry?.isIntersecting);
  }, [entry]);

  const projectsList = useMemo(
    () =>
      projects?.map((item: any) => {
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
    [projects]
  );

  return (
    <div className="project-list">
      {!showSkeleton && !loading && projectsList && projectsList.length === 0 && (
        <div className={`no-projects-found ${styles.noProjectsFound}`}>
          <div className="content">
            <h3>We couldn&apos;t find any projects.</h3>
            <span>Try adjusting the filters...</span>
          </div>
        </div>
      )}
      <div className="grid">
        {!showSkeleton && projectsList}
        {(showSkeleton || loading) &&
          [1, 2, 3, 4, 5, 6].map((n) => <ProjectSkeleton key={n} />)}
      </div>
      <div ref={ref} className="bottom-visible"></div>
    </div>
  );
};

export default ProjectList;
