import { useState } from "react";
import ProfileItem from "@/components-pages/project/ProfileItem";
import useWindowSize from "@/hooks/useWindowSize";
import { ProjectByIdQuery } from "generated/graphql";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

interface IProps {
  members: NonNullable<ProjectByIdQuery["projectById"]>["members"];
}

const Members = ({ members }: IProps) => {
  const [isMobile, setIsMobile] = useState(true);
  const { width } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    width < 768 ? setIsMobile(true) : setIsMobile(false);
  }, [width]);

  if (members && members.length > 0) {
    return (
      <div className="members">
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
