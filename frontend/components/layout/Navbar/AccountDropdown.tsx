import React, { useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSnapshot } from "valtio";
import { authState } from "store";
import { GET_LOGGED_IN_USER } from "@operations-queries/getLoggedInUser";
import Link from "next/link";
import Image from "next/image";
import SignoutLink from "@components-modules/menu/country/SignoutLink";
import { loggedInUser } from "generated/loggedInUser";
import useOnClickOutside from "@hooks/useOnClickOutside";

const AccountDropdown = () => {
  const [show, setShow] = useState(false);
  const { isAuth } = useSnapshot(authState);
  const [loggedInUser, { data, loading, error }] =
    useLazyQuery<loggedInUser>(GET_LOGGED_IN_USER);
  const ref = useRef(null);

  useEffect(() => {
    if (isAuth) {
      loggedInUser();
    }
  }, [isAuth]);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="account-dropdown" ref={ref}>
      <div className="profile-image" onClick={() => setShow(!show)}>
        {data?.loggedInUser.profile?.profileImage && (
          <Image
            src={data.loggedInUser.profile.profileImage}
            alt="profile image"
            width={42}
            height={42}
            layout="fixed"
            quality={100}
          />
        )}
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
