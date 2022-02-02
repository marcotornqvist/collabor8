import React from "react";
import Image from "next/image";

const NotificationsIcon = () => {
  // TODO: Display notifications and other color for logo
  return (
    <div className="notifications-icon">
      <Image
        src="/icons/bell-solid.svg"
        alt="bell"
        width={24}
        height={24}
        layout="fixed"
      />
    </div>
  );
};

export default NotificationsIcon;
