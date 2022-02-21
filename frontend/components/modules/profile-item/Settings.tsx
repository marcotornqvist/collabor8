import { forwardRef } from "react";
import ContactButtons from "@/components-modules/global/contact-buttons/ContactButtons";
import BlockUserButton from "@/components-modules/global/block-user-button/BlockUserButton";
import ReportUserButton from "@/components-modules/global/ReportUserButton";

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
          <ReportUserButton id={id} />
          <BlockUserButton id={id} isVisible={isVisible} />
        </div>
      </div>
    );
  }
);

export default Settings;
