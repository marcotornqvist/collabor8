import React from "react";
import Image from "next/image";
import Link from "next/link";

const InboxIcon = () => {
  return (
    <Link href="/chat">
      <a>
        <div className="inbox-icon">
          <Image
            src="/icons/inbox-solid.svg"
            alt="bell"
            width={24}
            height={24}
            layout="fixed"
          />
        </div>
      </a>
    </Link>
  );
};

export default InboxIcon;
