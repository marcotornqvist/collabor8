import { useEffect } from "react";
import { authState, layoutState } from "store";
import { useSnapshot } from "valtio";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useLoggedInUsernameQuery } from "generated/graphql";
import Link from "next/link";
import SignoutLink from "@/components-modules/global/SignoutLink";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";

const variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.3,
    },
  },
};

const Menu = () => {
  const { pathname, asPath } = useRouter();
  const { menuOpen } = useSnapshot(layoutState);
  const { isAuth } = useSnapshot(authState);
  const { width } = useWindowSize();

  const { data } = useLoggedInUsernameQuery({
    fetchPolicy: "cache-only",
  });

  const closeMenu = () => {
    document.body.classList.remove("body-prevent-scroll");
    layoutState.menuOpen = false;
  };

  // Closes menu if screen size width goes beyond 920px
  useEffect(() => {
    if (width >= 920) {
      closeMenu();
    }
  }, [width]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.nav
          className="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
        >
          <ul className="links">
            {isAuth && (
              <>
                <li
                  onClick={() => closeMenu()}
                  className={`list-item${
                    pathname === "/notifications" ? " active" : ""
                  }`}
                >
                  <Link href="/notifications">
                    <a>
                      <span>Notifications</span>
                      <Image
                        src="/icons/chevron-right-solid.svg"
                        alt="chevron right"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    </a>
                  </Link>
                </li>
                <li
                  onClick={() => closeMenu()}
                  className={`list-item${
                    pathname === "/chat" ? " active" : ""
                  }`}
                >
                  <Link href="/chat">
                    <a>
                      <span>Chat</span>
                      <Image
                        src="/icons/chevron-right-solid.svg"
                        alt="chevron right"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    </a>
                  </Link>
                </li>
                <li
                  onClick={() => closeMenu()}
                  className={`list-item${
                    asPath === `/profile/${data?.loggedInUser.username}`
                      ? " active"
                      : ""
                  }`}
                >
                  <Link href={`/profile/${data?.loggedInUser.username}`}>
                    <a>
                      <span>My Profile</span>
                      <Image
                        src="/icons/chevron-right-solid.svg"
                        alt="chevron right"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    </a>
                  </Link>
                </li>
              </>
            )}
            <li
              onClick={() => closeMenu()}
              className={`list-item${
                pathname === "/profiles" ? " active" : ""
              }`}
            >
              <Link href="/profiles">
                <a>
                  <span>Browse Profiles</span>
                  <Image
                    src="/icons/chevron-right-solid.svg"
                    alt="chevron right"
                    width={16}
                    height={16}
                    layout="fixed"
                  />
                </a>
              </Link>
            </li>
            <li
              onClick={() => closeMenu()}
              className={`list-item${
                pathname === "/projects" ? " active" : ""
              }`}
            >
              <Link href="/projects">
                <a>
                  <span>Browse Projects</span>
                  <Image
                    src="/icons/chevron-right-solid.svg"
                    alt="chevron right"
                    width={16}
                    height={16}
                    layout="fixed"
                  />
                </a>
              </Link>
            </li>
            {isAuth ? (
              <>
                <li
                  onClick={() => closeMenu()}
                  className={`list-item${
                    pathname === "/settings/profile" ? " active" : ""
                  }`}
                >
                  <Link href="/settings/profile">
                    <a>
                      <span>Profile Settings</span>
                      <Image
                        src="/icons/chevron-right-solid.svg"
                        alt="chevron right"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    </a>
                  </Link>
                </li>
                <li
                  onClick={() => closeMenu()}
                  className={`list-item${
                    pathname === "/settings/account" ? " active" : ""
                  }`}
                >
                  <Link href="/settings/account">
                    <a>
                      <span>Account Settings</span>
                      <Image
                        src="/icons/chevron-right-solid.svg"
                        alt="chevron right"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    </a>
                  </Link>
                </li>
                <li
                  onClick={() => closeMenu()}
                  className={`list-item${
                    pathname === "/settings/socials" ? " active" : ""
                  }`}
                >
                  <Link href="/settings/socials">
                    <a>
                      <span>Social Accounts</span>
                      <Image
                        src="/icons/chevron-right-solid.svg"
                        alt="chevron right"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    </a>
                  </Link>
                </li>
                <div onClick={() => closeMenu()}>
                  <SignoutLink size={18} />
                </div>
              </>
            ) : (
              <>
                <li
                  onClick={() => closeMenu()}
                  className={`list-item${
                    pathname === "/register" ? " active" : ""
                  }`}
                >
                  <Link href="/register">
                    <a>
                      <span>Create Account</span>
                      <Image
                        src="/icons/chevron-right-solid.svg"
                        alt="chevron right"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    </a>
                  </Link>
                </li>
                <li
                  onClick={() => closeMenu()}
                  className={`list-item${
                    pathname === "/login" ? " active" : ""
                  }`}
                >
                  <Link href="/login">
                    <a>
                      <span>Sign In</span>
                      <Image
                        src="/icons/chevron-right-solid.svg"
                        alt="chevron right"
                        width={16}
                        height={16}
                        layout="fixed"
                      />
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Menu;
