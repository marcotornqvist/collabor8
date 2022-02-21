import React from "react";
import { ProfileStatus } from "@/types-enums/enums";
import button from "@/styles-modules/Button.module.scss";
import ContactButtons from "@/components-modules/global/contact-buttons/ContactButtons";
import BlockUserButton from "@/components-modules/global/block-user-button/BlockUserButton";
import ReportUserButton from "@/components-modules/global/ReportUserButton";
import Link from "next/link";

interface IProps {
  id: string;
  username: string;
  profileStatus: ProfileStatus;
}

const Settings = ({ id, username, profileStatus }: IProps) => {
  return (
    <div className="settings">
      {profileStatus === ProfileStatus.Auth ? (
        <Link href="/settings/profile">
          <a>
            <button className={`profile-card-btn ${button.lightGreen}`}>
              Edit Profile
            </button>
          </a>
        </Link>
      ) : (
        <>
          <ContactButtons id={id} isVisible={true} username={username} />
          <ReportUserButton id={id} />
          <BlockUserButton id={id} isVisible={true} />
        </>
      )}
    </div>
  );
};

export default Settings;
