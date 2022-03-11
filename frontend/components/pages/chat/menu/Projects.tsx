import React, { useEffect, useRef, useState } from "react";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import ProjectItem from "./ProjectItem";
import {
  ProjectChatsQuery,
  ProjectChatsQueryVariables,
  useProjectChatsQuery,
} from "generated/graphql";

interface IProps {
  chatId: string;
  isMobile: boolean;
}

const limit = 15;

const Projects = ({ chatId, isMobile }: IProps) => {
  const [disableMore, setDisableMore] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const { data, fetchMore } = useProjectChatsQuery({
    variables: {
      data: {
        first: limit,
      },
    },
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const listRef = useRef<null | HTMLUListElement>(null);

  // Checks if scroll position is at bottom
  const onScroll = () => {
    if (listRef.current) {
      const position = listRef.current.scrollTop + listRef.current.clientHeight;
      setIsAtBottom(position === listRef.current.scrollHeight);
    }
  };

  // If element after last grid item is visible, fetch more messages if conditions match
  useEffect(() => {
    if (
      !disableMore &&
      isAtBottom &&
      data?.projectChats &&
      data.projectChats.length >= limit
    ) {
      fetchMore<ProjectChatsQuery, ProjectChatsQueryVariables>({
        variables: {
          data: {
            after: data.projectChats[data.projectChats.length - 1].id,
            first: limit,
          },
        },
      }).then(({ data: { projectChats } }) => {
        // Sets disableMore to true if less than limit was in response
        if (projectChats && projectChats.length < limit) {
          setDisableMore(true);
        }
      });
    }
  }, [isAtBottom, data?.projectChats]);

  return (
    <div className="projects">
      <motion.h4
        initial={"hidden"}
        animate={"visible"}
        variants={fadeInVariants}
      >
        Groups
      </motion.h4>
      <ul ref={listRef} onScroll={onScroll}>
        {data?.projectChats?.map((item) => (
          <ProjectItem
            key={item.id}
            id={item.id}
            selected={!isMobile && item.id === chatId}
            newMessages={item.newMessages}
            title={item.title}
          />
        ))}
      </ul>
    </div>
  );
};

export default Projects;
