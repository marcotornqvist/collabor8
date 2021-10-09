import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSnapshot } from "valtio";
import { state } from "store";
import { GET_LOGGED_IN_USER } from "@operations-queries/getLoggedInUser";
import Link from "next/link";
import Image from "next/image";
import SignoutLink from "@components-modules/menu/country/SignoutLink";

const AccountDropdown = () => {
  const [show, setShow] = useState(false);
  const { accessToken } = useSnapshot(state);
  const [loggedInUser, { data, loading, error }] =
    useLazyQuery(GET_LOGGED_IN_USER);

  useEffect(() => {
    if (accessToken !== "") {
      loggedInUser();
    }
  }, [accessToken]);

  return (
    <div className="account-icon">
      <div className="icon" onClick={() => setShow(!show)}>
        <Image
          src={"/icons/inbox-solid.svg"}
          alt="bell"
          width={32}
          height={32}
        />
      </div>
      {show && (
        <ul className="dropdown">
          <li>
            <Link href="/settings/profile">
              <a>Profile Settings</a>
            </Link>
          </li>
          <li>
            <Link href="/settings/account">
              <a>Account Settings</a>
            </Link>
          </li>
          <li>
            <Link href="/settings/socials">
              <a>Social Accounts</a>
            </Link>
          </li>
          <SignoutLink />
        </ul>
      )}
    </div>
  );
};

export default AccountDropdown;
