import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useProfileImageQuery } from "generated/graphql";
import SignoutLink from "@/components-modules/global/SignoutLink";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import ProfileImage from "@/components-modules/global/ProfileImage";

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
  const [show, setShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { data } = useProfileImageQuery({
    fetchPolicy: "cache-only", // Fetches from cache only, navbar fetches all the logged in user data when page is loaded
  });

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="account-dropdown" ref={ref}>
      <div onClick={() => setShow(!show)}>
        <ProfileImage
          size={24}
          profileImage={data?.loggedInUser.profile?.profileImage}
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
              <li onClick={() => setShow(false)}>
                <Link href="/my-profile">
                  <a>
                    <span>My Profile</span>
                  </a>
                </Link>
              </li>
              <li onClick={() => setShow(false)}>
                <Link href="/settings/profile">
                  <a>
                    <span>Profile Settings</span>
                  </a>
                </Link>
              </li>
              <li onClick={() => setShow(false)}>
                <Link href="/settings/account">
                  <a>
                    <span>Account Settings</span>
                  </a>
                </Link>
              </li>
              <li onClick={() => setShow(false)}>
                <Link href="/settings/socials">
                  <a>
                    <span>Social Accounts</span>
                  </a>
                </Link>
              </li>
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
