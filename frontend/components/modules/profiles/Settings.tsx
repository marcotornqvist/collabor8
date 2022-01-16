import { useRef } from "react";
import { useSnapshot } from "valtio";
import { authState } from "store";
import ContactButtons from "./ContactButtons";
import BlockUser from "./BlockUser";
import useOnScreen from "@hooks/useOnScreen";
import ReportButton from "./ReportButton";

interface IProps {
  id: string;
  username: string;
}

const Settings = ({ id, username }: IProps) => {
  const ref: any = useRef<HTMLDivElement>();
  const isVisible = useOnScreen(ref);
  const { isAuth } = useSnapshot(authState);

  return (
    <ul className="settings" ref={ref}>
      <ContactButtons
        id={id}
        isVisible={isVisible}
        isAuth={isAuth}
        username={username}
      />
      <ReportButton id={id} isAuth={isAuth} />
      <BlockUser id={id} isVisible={isVisible} />
    </ul>
  );
};

export default Settings;
