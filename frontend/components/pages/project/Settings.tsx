import { useEffect } from "react";
import { useProjectMemberStatusLazyQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { authState } from "store";
import { useSnapshot } from "valtio";
import button from "@/styles-modules/Button.module.scss";
import Link from "next/link";

const Settings = () => {
  const { loading } = useSnapshot(authState);
  const {
    query: { id },
  } = useRouter();
  const [getStatus, { data }] = useProjectMemberStatusLazyQuery({
    variables: {
      id: typeof id === "string" ? id : "",
    },
  });

  useEffect(() => {
    if (!loading) {
      getStatus();
    }
  }, [!loading]);

  // console.log(data?.projectMemberStatus);

  // Create modals to delete project, leave project
  // Animate button after status has loaded
  // Divide into separate components
  // Update cache or refetch depending on case

  return (
    <div className="settings">
      <div className="buttons">
        <button className={`leave-project-btn ${button.red}`}>
          Leave Project
        </button>
        <Link href={`/report/project/${id}`}>
          <a className="report-project-btn">
            <button className={`report-project-btn ${button.lightRed}`}>
              Report Project
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
