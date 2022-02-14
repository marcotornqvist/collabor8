import { useState, useMemo, useEffect } from "react";
import {
  UsersQuery,
  useUsersLazyQuery,
  useUsersQuery,
} from "generated/graphql";
import SearchInput from "./SearchInput";
import ProfileList from "./ProfileList";
import PendingMembersList from "./PendingMembersList";

export type User = NonNullable<UsersQuery["users"]>[0];

interface IProps {
  setFieldValue: (
    field: "members",
    value: string[],
    shouldValidate?: boolean | undefined
  ) => void;
  members: string[];
  isMobile: boolean;
}

const Members = ({ setFieldValue, isMobile, members }: IProps) => {
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

  const { data } = useUsersQuery({ fetchPolicy: "cache-only" });

  // Returns a list of all the users and filters out the users that are selected
  const users = useMemo(
    () => data?.users?.filter((item) => !members?.some((el) => item.id === el)),
    [data?.users, members]
  );

  // Adds members list to formik values
  useEffect(() => {
    if (selectedMembers) {
      const members = selectedMembers.map((item) => item.id);
      setFieldValue("members", members);
    }
  }, [selectedMembers]);

  // Adds user to selected list
  const addUser = (user: User) => {
    setSelectedMembers([...selectedMembers, user]);
  };

  // Removes user from selected list
  const removeUser = (user: User) => {
    const filtered = selectedMembers.filter((item) => item.id !== user.id);

    setSelectedMembers(filtered);
  };

  return (
    <div className={"step-two members"}>
      <SearchInput />
      <ProfileList members={users} addUser={addUser} isMobile={isMobile} />
      <PendingMembersList
        members={selectedMembers}
        removeUser={removeUser}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Members;
