import React, { useState, useEffect, useRef, FC } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSnapshot } from "valtio";
import { authState } from "store";
import { GET_PROFILE_IMAGE } from "@operations-queries/getLoggedInUser";
import Link from "next/link";
import SignoutLink from "@components-modules/global/SignoutLink";
import { loggedInProfile } from "generated/loggedInProfile";
import useOnClickOutside from "@hooks/useOnClickOutside";
import ProfileImage from "@components-modules/global/ProfileImage";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const AccountDropdown: FC = () => {
  const { isAuth } = useSnapshot(authState);
  const [show, setShow] = useState(false);
  const [loggedInUser, { data, loading, error }] =
    useLazyQuery<loggedInProfile>(GET_PROFILE_IMAGE);
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
      <div onClick={() => setShow(!show)}>
        <ProfileImage
          loading={loading}
          size={44}
          quality={100}
          profileImage={data?.loggedInProfile?.profileImage}
        />
      </div>
      <AnimatePresence exitBeforeEnter>
        {show && (
          <motion.div
            className="dropdown-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountDropdown;
