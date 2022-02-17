import { useEffect, useMemo, useState } from "react";
import {
  ProjectByIdQuery,
  Role,
  useProjectMembersQuery,
  useUsersLazyQuery,
  useUsersQuery,
} from "generated/graphql";
import SearchInput from "@/components-modules/project-details/SearchInput";
import ProfileList from "./ProfileList";
import MembersList from "./Memberslist";

export type User = NonNullable<
  NonNullable<ProjectByIdQuery["projectById"]>["members"]
>[0]["user"];

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

  const { data: membersData } = useProjectMembersQuery({
    variables: {
      data: {
        id,
        role: [Role.Member],
      },
    },
  });

  // Returns all the users in a variable called members
  const members = useMemo(() => {
    return membersData?.projectById?.members
      ? membersData.projectById?.members.map((item) => item.user)
      : [];
  }, [membersData?.projectById?.members]);

  // Returns a list of all the users and filters out the users that are in the "members" list
  const users = useMemo(
    () =>
      data?.users?.filter((item) => !members?.some((el) => item.id === el.id)),
    [data?.users, members]
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
      <MembersList members={members} isMobile={isMobile} loading={loading} />
    </div>
  );
};

export default Members;
