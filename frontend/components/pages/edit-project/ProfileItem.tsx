import { fadeInVariants } from "utils/variants";
import { motion } from "framer-motion";
import { User } from "./Members";
import {
  MemberStatusCode,
  ProjectMembersDocument,
  ProjectMembersQuery,
  ProjectMembersQueryVariables,
  useAddMemberMutation,
  useKickMemberMutation,
} from "generated/graphql";
import ProfileImage from "@/components-modules/global/ProfileImage";
import React, { useState } from "react";
import button from "@/styles-modules/Button.module.scss";
import useHover from "@/hooks/useHover";
import useToast from "@/hooks/useToast";
import KickMemberModal from "./KickMemberModal";

interface IProps {
  id: string;
  isMobile: boolean;
  user: User;
  status?: MemberStatusCode;
  isAdded: boolean;
}

const ProfileItem = ({
  id,
  isMobile,
  user,
  user: { profile },
  status,
  isAdded,
}: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();

  const [addMember] = useAddMemberMutation({
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
      <motion.li initial="hidden" animate="visible" variants={fadeInVariants}>
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
            <span className="info-text">
              {profile?.discipline?.title}
              {profile?.discipline?.title && profile?.country && ", "}
              {profile?.country}
            </span>
          </div>
        </div>
        <div className="button-container">
          {!isAdded && (
            <button
              className={button.lightGreen}
              onClick={(e) => {
                e.preventDefault();
                addMember();
              }}
            >
              Add
            </button>
          )}
          {isAdded && (
            <>
              <button
                ref={hoverRef}
                className={isHovered ? button.red : button.lightGreen}
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                {isHovered
                  ? "Remove"
                  : status === MemberStatusCode.Accepted
                  ? "Member"
                  : "Pending"}
              </button>
              <KickMemberModal
                id={id}
                userId={user.id}
                show={showModal}
                onClose={() => setShowModal(false)}
              />
            </>
          )}
        </div>
      </motion.li>
    </>
  );
};

export default ProfileItem;
