import { useEffect, useMemo, useState } from "react";
import {
  MemberStatusCode,
  ProjectByIdQuery,
  Role,
  useProjectMembersQuery,
  useUsersQuery,
} from "generated/graphql";
import SearchInput from "@/components-modules/project-details/SearchInput";
import ProfileList from "./ProfileList";
import MembersList from "./MembersList";

export type User = NonNullable<
  NonNullable<ProjectByIdQuery["projectById"]>["members"]
>[0]["user"];

export interface IMember {
  user: User;
  status: MemberStatusCode;
}

interface IProps {
  isMobile: boolean;
  id: string;
  showSkeleton: boolean;
  setShowSkeleton: (showSkeleton: boolean) => void;
}

const Members = ({ id, isMobile, showSkeleton, setShowSkeleton }: IProps) => {
  const [search, setSearch] = useState("");
  const { data, loading, client, refetch } = useUsersQuery({
    variables: {
      data: {
        first: 20,
        searchText: search,
      },
    },
    nextFetchPolicy: "cache-only",
  });

  useEffect(() => {
    setShowSkeleton(true);
    client.cache.evict({ id: "ROOT_QUERY", fieldName: "users" });
    refetch();
  }, [search]);

  // Returns members with a role of "Member"
  // & Status of Rejected, Pending & Accepted
  const { data: membersData } = useProjectMembersQuery({
    variables: {
      data: {
        id,
        role: [Role.Member],
        status: [
          MemberStatusCode.Rejected,
          MemberStatusCode.Pending,
          MemberStatusCode.Accepted,
        ],
      },
    },
  });

  // Returns users with the status of ACCEPTED & PENDING in an array of objects
  const members = useMemo(() => {
    return membersData?.projectById?.members
      ? membersData.projectById?.members.filter((item) => {
          if (item.status !== MemberStatusCode.Rejected) {
            return {
              user: item.user,
              status: item.status,
            };
          }
        })
      : [];
  }, [membersData?.projectById?.members]);

  // Returns a list of all the users and filters out the users that are in the "members" list
  const users = useMemo(
    () =>
      data?.users?.filter(
        (item) =>
          !membersData?.projectById?.members?.some(
            (el) => item.id === el.user.id
          )
      ),
    [data?.users, membersData?.projectById?.members]
  );

  return (
    <div className={"step-two members"}>
      <SearchInput search={search} setSearch={setSearch} />
      <ProfileList
        id={id}
        users={users}
        isMobile={isMobile}
        loading={loading}
        showSkeleton={showSkeleton}
      />
      <MembersList
        id={id}
        members={members}
        isMobile={isMobile}
        loading={loading}
      />
    </div>
  );
};

export default Members;
