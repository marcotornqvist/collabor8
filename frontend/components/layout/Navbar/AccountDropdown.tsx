import React, { useState, useEffect, useRef, FC } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSnapshot } from "valtio";
import { authState } from "store";
import { GET_LOGGED_IN_USER } from "@operations-queries/getLoggedInUser";
import Link from "next/link";
import SignoutLink from "@components-modules/global/SignoutLink";
import { loggedInUser } from "generated/loggedInUser";
import useOnClickOutside from "@hooks/useOnClickOutside";
import ProfileImage from "@components-modules/global/ProfileImage";

const AccountDropdown: FC = () => {
  const { isAuth } = useSnapshot(authState);
  const [show, setShow] = useState(false);
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

  console.log(data);

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="account-dropdown" ref={ref}>
      <ProfileImage
        loading={loading}
        size={44}
        quality={100}
        show={show}
        setShow={(show) => setShow(show)}
        profileImage={data?.loggedInUser.profile?.profileImage}
      />
      {/* {show && ( */}
      <div className={`dropdown-menu ${show ? "fade-in" : "fade-out"}`}>
        <ul>
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
      </div>
      {/* )} */}
    </div>
  );
};

export default AccountDropdown;
