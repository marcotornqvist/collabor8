import { forwardRef } from "react";
import ContactButtons from "@/components-modules/global/contact-buttons/ContactButtons";
import BlockUser from "./BlockUser";
import ReportButton from "./ReportButton";

interface IProps {
  id: string;
  username: string;
  isVisible: boolean;
}

// eslint-disable-next-line react/display-name
const Settings = forwardRef<HTMLDivElement, IProps>(
  ({ id, username, isVisible }, settingsRef) => {
    return (
      <div className="settings carousel-item" ref={settingsRef}>
        <div className="wrapper">
          <ContactButtons id={id} isVisible={isVisible} username={username} />
          <ReportButton id={id} />
          <BlockUser id={id} isVisible={isVisible} />
        </div>
      </div>
    );
  }
);

export default Settings;
