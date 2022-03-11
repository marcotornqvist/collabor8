import Link from "next/link";
import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import { layoutState } from "store";
import Image from "next/image";
import button from "@/styles-modules/Button.module.scss";
import React, { useState } from "react";
import useHover from "@/hooks/useHover";

interface IProps {
  id: string;
  selected: boolean;
  newMessages: boolean;
  title?: string | null;
}

const ProjectItem = ({ id, selected, newMessages, title }: IProps) => {
  const [hoverRef, isHovered] = useHover<HTMLLIElement>();
  const [hideNewMessages, setHideNewMessages] = useState(false);

  return (
    <motion.li
      className={`list-item${selected ? " active" : ""}`}
      ref={hoverRef}
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      onClick={() => {
        setHideNewMessages(true);
        layoutState.slide = true;
      }}
    >
      <Link href={`/chat/project/${id}`} scroll={false}>
        <a>
          <button className={`${button.lightGrey}`}>
            <div className="wrapper">
              <span>{title}</span>
              <div className="image-container">
                <Image
                  src={
                    selected || isHovered
                      ? "/icons/chevron-right-solid-green.svg"
                      : "/icons/chevron-right-solid-grey.svg"
                  }
                  alt="chevron right"
                  width={16}
                  height={16}
                  layout="fixed"
                />
              </div>
            </div>
            {!hideNewMessages && newMessages && (
              <div className="new-messages-box">
                <span>1</span>
              </div>
            )}
          </button>
        </a>
      </Link>
    </motion.li>
  );
};

export default ProjectItem;
