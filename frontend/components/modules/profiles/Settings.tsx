import React, { forwardRef } from "react";
import { useSnapshot } from "valtio";
import PropTypes from "prop-types";

import { authState } from "store";
import ContactButtons from "./ContactButtons";
import BlockUser from "./BlockUser";
import ReportButton from "./ReportButton";

type ButtonProps = React.ComponentPropsWithoutRef<"div">;

interface IProps {
  id: string;
  username: string;
  isVisible: boolean;
}

// eslint-disable-next-line react/display-name
const Settings = forwardRef<HTMLDivElement, IProps>((props, settingsRef) => {
  const { id, username, isVisible } = props;
  const { isAuth } = useSnapshot(authState);

  return (
    <div className="settings carousel-item" ref={settingsRef}>
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
