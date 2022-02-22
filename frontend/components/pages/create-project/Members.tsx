import { useMemo, useEffect, useState } from "react";
import { ProjectByIdQuery, useUsersLazyQuery } from "generated/graphql";
import SearchInput from "@/components-modules/global/SearchInput";
import ProfileList from "./ProfileList";
import MembersList from "./MembersList";
import useSkeleton from "@/hooks/useSkeleton";

export type User = NonNullable<
  NonNullable<ProjectByIdQuery["projectById"]>["members"]
>[0]["user"];

interface IProps {
  setFieldValue: (
    field: "members",
    value: User[],
    shouldValidate?: boolean | undefined
  ) => void;
  members: User[];
  isMobile: boolean;
}

const Members = ({ setFieldValue, isMobile, members }: IProps) => {
  const [search, setSearch] = useState("");
  const { showSkeleton, setShowSkeleton } = useSkeleton();
  const [getUsers, { data, loading, client }] = useUsersLazyQuery();

  useEffect(() => {
    client.cache.evict({ id: "ROOT_QUERY", fieldName: "users" });
    setShowSkeleton(true);
    getUsers({
      variables: {
        data: {
          first: 20,
          searchText: search,
        },
      },
    });
  }, [search]);

  // Returns a list of all the users and filters out the users that are selected
  const users = useMemo(
    () =>
      data?.users?.filter((item) => !members?.some((el) => item.id === el.id)),
    [data?.users, members]
  );

  // Sets skeleton loading state to true
  useEffect(() => {
    setShowSkeleton(true);
  }, [data]);

  // Adds user to selected list
  const addUser = (user: User) => {
    setFieldValue("members", [user, ...members]);
  };

  // Removes user from selected list
  const removeUser = (user: User) => {
    const filtered = members.filter((item) => item.id !== user.id);
    setFieldValue("members", filtered);
  };

  return (
    <div className={"step-two members"}>
      <SearchInput search={search} setSearch={setSearch} />
      <ProfileList
        users={users}
        addUser={addUser}
        isMobile={isMobile}
        loading={loading}
        showSkeleton={showSkeleton}
      />
      <MembersList
        members={members}
        removeUser={removeUser}
        isMobile={isMobile}
        loading={loading}
      />
    </div>
  );
};

export default Members;
