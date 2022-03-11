import React from "react";
import { useProjectTitleQuery } from "generated/graphql";
import { layoutState } from "store";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  chatId: string;
}

const ProjectHeader = ({ chatId }: IProps) => {
  const { data } = useProjectTitleQuery({
    variables: {
      data: {
        id: chatId,
      },
    },
  });

  return (
    <div className="header project-header">
      <div className="title">
        <Link href={`/project/${data?.projectById?.id}`}>
          <a>
            <h4>{data?.projectById?.title}</h4>
          </a>
        </Link>
      </div>
      <a>
        <div
          className="go-back-btn"
          onClick={() => {
            layoutState.slide = false;
          }}
        >
          <Image
            src="/icons/chevron-solid-left-white.svg"
            alt={"Chevron"}
            width={18}
            height={18}
            layout="fixed"
          />
        </div>
      </a>
    </div>
  );
};

export default ProjectHeader;
