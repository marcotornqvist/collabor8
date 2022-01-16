import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyQuery } from "@apollo/client";
import { useSnapshot } from "valtio";
import { authState } from "store";
import { GET_PROFILE_IMAGE } from "@operations-queries/getLoggedInProfile";
import { loggedInProfileImage } from "generated/loggedInProfileImage";
import SignoutLink from "@components-modules/global/SignoutLink";
import useOnClickOutside from "@hooks/useOnClickOutside";
import ProfileImage from "@components-modules/global/ProfileImage";

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

const AccountDropdown = () => {
  const { isAuth } = useSnapshot(authState);
  const [show, setShow] = useState(false);
  const [loggedInProfileImage, { data, loading, error }] =
    useLazyQuery<loggedInProfileImage>(GET_PROFILE_IMAGE);
  const ref = useRef(null);

  useEffect(() => {
    if (isAuth) {
      loggedInProfileImage();
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
          size={24}
          profileImage={data?.loggedInProfile?.profileImage}
          priority={true}
        />
      </div>
      <AnimatePresence exitBeforeEnter>
        {show && (
          <motion.div
            className="dropdown"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
          >
            <ul>
              <Link href="/settings/profile">
                <a>
                  <li onClick={() => setShow(false)}>
                    <span>Profile Settings</span>
                  </li>
                </a>
              </Link>
              <Link href="/settings/account">
                <a>
                  <li onClick={() => setShow(false)}>
                    <span>Account Settings</span>
                  </li>
                </a>
              </Link>
              <Link href="/settings/socials">
                <a>
                  <li onClick={() => setShow(false)}>
                    <span>Social Accounts</span>
                  </li>
                </a>
              </Link>
              <hr />
              <SignoutLink size={16} />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountDropdown;
