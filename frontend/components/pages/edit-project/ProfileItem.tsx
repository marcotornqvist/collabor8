import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import { User } from "./Members";
import {
  ProjectMembersDocument,
  ProjectMembersQuery,
  ProjectMembersQueryVariables,
  Role,
  useAddMemberMutation,
} from "generated/graphql";
import ProfileImage from "@/components-modules/global/ProfileImage";
import React, { useState } from "react";
import button from "@/styles-modules/Button.module.scss";
import useHover from "@/hooks/useHover";
import useToast from "@/hooks/useToast";

interface IProps {
  id: string;
  isMobile: boolean;
  user: User;
  isAdded: boolean;
}

const ProfileItem = ({ id, isMobile, user, isAdded }: IProps) => {
  const [error, setError] = useState("");
  const { profile } = user;
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();

  const [addUser] = useAddMemberMutation({
    variables: {
      data: {
        projectId: id,
        userId: user.id,
      },
    },
    update(cache, { data }) {
      const previousData = cache.readQuery<
        ProjectMembersQuery,
        ProjectMembersQueryVariables
      >({
        query: ProjectMembersDocument,
        variables: {
          data: {
            id,
            role: [Role.Member],
          },
        },
      });

      if (data?.addMember && previousData?.projectById) {
        cache.writeQuery<ProjectMembersQuery, ProjectMembersQueryVariables>({
          query: ProjectMembersDocument,
          variables: {
            data: {
              id,
            },
          },
          data: {
            projectById: {
              ...previousData.projectById,
              members: previousData.projectById.members
                ? [data.addMember, ...previousData.projectById.members]
                : [data.addMember],
            },
          },
        });
      }
    },
    onError: (error) => setError(error.message),
  });

  useToast({
    error,
  });

  return (
    <>
      <motion.li
        initial={"hidden"}
        animate={"visible"}
        variants={fadeInVariants}
      >
        <div className="profile-details">
          <ProfileImage
            size={isMobile ? "small" : "medium"}
            profileImage={profile?.profileImage}
            priority={true}
            firstName={profile?.firstName}
            lastName={profile?.lastName}
          />
          <div className="wrapper">
            <div className="inner-wrapper">
              <span className="name">
                {profile?.firstName} {profile?.lastName}
              </span>
            </div>
            <div className="info-text">
              <span className="discipline">{profile?.discipline?.title}</span>
              {profile?.discipline?.title && profile?.country && (
                <span className="pipe">|</span>
              )}
              <span className="country">{profile?.country}</span>
            </div>
          </div>
        </div>
        <div className="button-container">
          {!isAdded && (
            <button
              className={button.lightGreen}
              onClick={(e) => {
                e.preventDefault();
                addUser();
              }}
            >
              Add
            </button>
          )}
          {isAdded && (
            <button
              ref={hoverRef}
              className={isHovered ? button.red : button.lightGreen}
              onClick={(e) => {
                e.preventDefault();
                addUser();
              }}
            >
              {isHovered ? "Remove" : "Pending"}
            </button>
          )}
        </div>
      </motion.li>
    </>
  );
};

export default ProfileItem;
