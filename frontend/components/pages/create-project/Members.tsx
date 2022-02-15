import { useMemo, useEffect } from "react";
import { useUsersQuery } from "generated/graphql";
import SearchInput from "./SearchInput";
import ProfileList from "./ProfileList";
import PendingMembersList from "./PendingMembersList";
import useSkeleton from "@/hooks/useSkeleton";
import { User } from "./Form";

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
  const { showSkeleton, setShowSkeleton } = useSkeleton();
  const { data, loading } = useUsersQuery({
    fetchPolicy: "cache-only",
    variables: {
      data: {
        first: 20,
      },
    },
  });

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
      <SearchInput />
      <ProfileList
        members={users}
        addUser={addUser}
        isMobile={isMobile}
        loading={loading}
        showSkeleton={showSkeleton}
      />
      <PendingMembersList
        members={members}
        removeUser={removeUser}
        isMobile={isMobile}
        loading={loading}
      />
    </div>
  );
};

export default Members;
