import ProfileItem from "@/components-pages/project/ProfileItem";
import { ProjectByIdQuery } from "generated/graphql";
import useIsMobile from "@/hooks/useIsMobile";
import styles from "@/styles-modules/Members.module.scss";

interface IProps {
  members: NonNullable<ProjectByIdQuery["projectById"]>["members"];
}

const Members = ({ members }: IProps) => {
  const { isMobile } = useIsMobile();

  if (members && members.length > 0) {
    return (
      <div className={`members ${styles.members}`}>
        <span className="sub-title">Members</span>
        <ul>
          {members?.map((item) => (
            <ProfileItem
              key={item.userId}
              isMobile={isMobile}
              user={item.user}
              role={item.role}
            />
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Members;
