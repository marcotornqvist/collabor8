import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { authState } from "store";
import { ProfileStatus } from "@/types-enums/enums";
import {
  useLoggedInUsernameQuery,
  useProfileDetailsQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import NavigationSlide from "@/components-modules/global/NavigationSlide";
import Projects from "@/components-pages/profile/Projects";
import ProfileCard from "@/components-pages/profile/ProfileCard";

const Socials = dynamic(
  async () => (await import("@/components-pages/profile/Socials")).default
);

const Settings = dynamic(
  async () => (await import("@/components-pages/profile/Settings")).default
);

const Profile = () => {
  let {
    push,
    query: { username },
  } = useRouter();
  // Sets username to a string
  username = typeof username === "string" ? username : "";
  // Checks whether user owns this profile, or is just authenticated or a guest
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>(
    ProfileStatus.Guest
  );
  const [navigation, setNavigation] = useState("Projects");
  const { loading } = useSnapshot(authState);
  const { data: usernameData, loading: usernameLoading } =
    useLoggedInUsernameQuery({
      fetchPolicy: "cache-only",
    });

  useEffect(() => {
    if (!loading && !usernameLoading) {
      username === usernameData?.loggedInUser.username
        ? setProfileStatus(ProfileStatus.Auth)
        : setProfileStatus(ProfileStatus.User);
    }
  }, [loading, usernameLoading, usernameData, username]);

  const {
    data,
    loading: dataLoading,
    error,
  } = useProfileDetailsQuery({
    variables: {
      username,
    },
  });

  // Redirects client to "/profiles" if profile doesn't exist
  useEffect(() => {
    if ((!dataLoading && !data?.userByUsername) || error) {
      push("/profiles");
    }
  }, [data, dataLoading]);

  return (
    <section className="profile-page">
      <div className="container">
        {!usernameLoading && !dataLoading && (
          <>
            {data?.userByUsername?.profile && (
              <ProfileCard
                profile={data.userByUsername.profile}
                profileStatus={profileStatus}
                username={username}
              />
            )}
            <NavigationSlide
              items={["Projects", "Socials", "Settings"]}
              selected={navigation}
              setNavigation={setNavigation}
            />
            {navigation === "Projects" && <Projects />}
            {navigation === "Socials" && <Socials />}
            {navigation === "Settings" && <Settings id={"id"} />}
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;
