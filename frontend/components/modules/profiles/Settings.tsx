import { forwardRef, LegacyRef } from "react";
import { useSnapshot } from "valtio";
import { authState } from "store";
import ContactButtons from "./ContactButtons";
import BlockUser from "./BlockUser";
import ReportButton from "./ReportButton";

interface IProps {
  id: string;
  username: string;
  isVisible: boolean;
}

const Settings = forwardRef(({ id, username, isVisible }: IProps, ref: any) => {
  const { isAuth } = useSnapshot(authState);

  return (
    <div className="settings carousel-item" ref={ref}>
      <div className="wrapper">
        <ContactButtons
          id={id}
          isVisible={isVisible}
          isAuth={isAuth}
          username={username}
        />
        <ReportButton id={id} isAuth={isAuth} />
        <BlockUser id={id} isVisible={isVisible} />
      </div>
    </div>
  );
});

export default Settings;
