import { useEffect } from "react";
import Link from "next/link";
import SignoutLink from "@components-modules/global/SignoutLink";
import Image from "next/image";
import { authState, navigationState } from "store";
import { useSnapshot } from "valtio";
import useWindowSize from "@hooks/useWindowSize";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

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
  const { pathname } = useRouter();
  const { menuOpen } = useSnapshot(navigationState);
  const { isAuth } = useSnapshot(authState);
  const { width } = useWindowSize();

  const closeMenu = () => {
    document.body.classList.remove("body-prevent-scroll");
    navigationState.menuOpen = false;
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
                <Link href="/notifications">
                  <li
                    onClick={() => closeMenu()}
                    className={`list-item${
                      pathname === "/notifications" ? " active" : ""
                    }`}
                  >
                    <a>Notifications</a>
                    <Image
                      src="/icons/chevron-right-solid.svg"
                      alt="chevron right"
                      width={16}
                      height={16}
                    />
                  </li>
                </Link>
                <Link href="/chat">
                  <li
                    onClick={() => closeMenu()}
                    className={`list-item${
                      pathname === "/chat" ? " active" : ""
                    }`}
                  >
                    <a>Chat</a>
                    <Image
                      src="/icons/chevron-right-solid.svg"
                      alt="chevron right"
                      width={16}
                      height={16}
                    />
                  </li>
                </Link>
              </>
            )}
            <Link href="/profiles">
              <li
                onClick={() => closeMenu()}
                className={`list-item${
                  pathname === "/profiles" ? " active" : ""
                }`}
              >
                <a>Browse Profiles</a>
                <Image
                  src="/icons/chevron-right-solid.svg"
                  alt="chevron right"
                  width={16}
                  height={16}
                />
              </li>
            </Link>
            <Link href="/projects">
              <li
                onClick={() => closeMenu()}
                className={`list-item${
                  pathname === "/projects" ? " active" : ""
                }`}
              >
                <a>Browse Projects</a>
                <Image
                  src="/icons/chevron-right-solid.svg"
                  alt="chevron right"
                  width={16}
                  height={16}
                />
              </li>
            </Link>
            {isAuth ? (
              <>
                <Link href="/my-profile">
                  <li
                    onClick={() => closeMenu()}
                    className={`list-item${
                      pathname === "/my-profile" ? " active" : ""
                    }`}
                  >
                    <a>My Profile</a>
                    <Image
                      src="/icons/chevron-right-solid.svg"
                      alt="chevron right"
                      width={16}
                      height={16}
                    />
                  </li>
                </Link>
                <Link href="/settings/profile">
                  <li
                    onClick={() => closeMenu()}
                    className={`list-item${
                      pathname === "/settings/profile" ? " active" : ""
                    }`}
                  >
                    <a>Profile Settings</a>
                    <Image
                      src="/icons/chevron-right-solid.svg"
                      alt="chevron right"
                      width={16}
                      height={16}
                    />
                  </li>
                </Link>
                <Link href="/settings/account">
                  <li
                    onClick={() => closeMenu()}
                    className={`list-item${
                      pathname === "/settings/account" ? " active" : ""
                    }`}
                  >
                    <a>Account Settings</a>
                    <Image
                      src="/icons/chevron-right-solid.svg"
                      alt="chevron right"
                      width={16}
                      height={16}
                    />
                  </li>
                </Link>
                <Link href="/settings/socials">
                  <li
                    onClick={() => closeMenu()}
                    className={`list-item${
                      pathname === "/settings/socials" ? " active" : ""
                    }`}
                  >
                    <a>Social Accounts</a>
                    <Image
                      src="/icons/chevron-right-solid.svg"
                      alt="chevron right"
                      width={16}
                      height={16}
                    />
                  </li>
                </Link>
                <div onClick={() => closeMenu()}>
                  <SignoutLink size={18} />
                </div>
              </>
            ) : (
              <>
                <Link href="/register">
                  <li
                    onClick={() => closeMenu()}
                    className={`list-item${
                      pathname === "/register" ? " active" : ""
                    }`}
                  >
                    <a>Create Account</a>
                    <Image
                      src="/icons/chevron-right-solid.svg"
                      alt="chevron right"
                      width={16}
                      height={16}
                    />
                  </li>
                </Link>
                <Link href="/login">
                  <li
                    onClick={() => closeMenu()}
                    className={`list-item${
                      pathname === "/login" ? " active" : ""
                    }`}
                  >
                    <a>Sign In</a>
                    <Image
                      src="/icons/chevron-right-solid.svg"
                      alt="chevron right"
                      width={16}
                      height={16}
                    />
                  </li>
                </Link>
              </>
            )}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Menu;
