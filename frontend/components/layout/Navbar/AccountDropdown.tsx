import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoggedInUsernameQuery, useProfileImageQuery } from "generated/graphql";
import { dropdownVariants } from "utils/variants";
import Link from "next/link";
import SignoutLink from "@/components-modules/global/SignoutLink";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import ProfileImage from "@/components-modules/global/ProfileImage";


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

  const { data: usernameData } = useLoggedInUsernameQuery({
    fetchPolicy: "cache-only",
  });

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
            variants={dropdownVariants.desktop}
          >
            <ul>
              <li onClick={() => setShow(false)}>
                <Link href={`/profile/${usernameData?.loggedInUser.username}`}>
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
