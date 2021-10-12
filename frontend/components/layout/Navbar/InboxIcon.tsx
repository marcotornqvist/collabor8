import React from "react";
import Image from "next/image";

const InboxIcon = () => {
  return (
    <div className="inbox-icon">
      <Image src="/icons/inbox-solid.svg" alt="bell" width={24} height={24} />
    </div>
  );
};

export default InboxIcon;
