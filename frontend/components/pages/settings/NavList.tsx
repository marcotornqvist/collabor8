import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavList = () => {
  // Check if navbar and footer should be loaded
  const router = useRouter();
  const pathname = router.asPath.split("/");
  const currentPath = pathname[pathname.length - 1];

  return (
    <ul>
      <Link href="/settings/profile">
        <a>
          <li
            className={`list-item${currentPath === "profile" ? " active" : ""}`}
          >
            <span>Profile Settings</span>
          </li>
        </a>
      </Link>
      <Link href="/settings/account">
        <a>
          <li
            className={`list-item${currentPath === "account" ? " active" : ""}`}
          >
            <span>Account Settings</span>
          </li>
        </a>
      </Link>
      <Link href="/settings/socials">
        <a>
          <li
            className={`list-item${currentPath === "socials" ? " active" : ""}`}
          >
            <span>Social Accounts</span>
          </li>
        </a>
      </Link>
    </ul>
  );
};

export default NavList;
