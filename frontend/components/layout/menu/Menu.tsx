import { useEffect } from "react";
import Link from "next/link";
import SignoutLink from "@components-modules/global/SignoutLink";
import Image from "next/image";
import { authState, navigationState } from "store";
import { useSnapshot } from "valtio";
import useWindowSize from "@hooks/useWindowSize";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.5,
    },
  },
};

const Menu = () => {
  const { menuOpen } = useSnapshot(navigationState);
  const { isAuth } = useSnapshot(authState);
  const { width } = useWindowSize();

  // Closes menu if screen size width goes beyond 920px
  useEffect(() => {
    if (width >= 920) {
      navigationState.menuOpen = false;
    }
  }, [width]);

  const closeMenu = () => {
    document.body.classList.remove("body-prevent-scroll");
    navigationState.menuOpen = false;
  };

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
                  <li onClick={() => closeMenu()}>
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
                  <li onClick={() => closeMenu()}>
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
              <li onClick={() => closeMenu()}>
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
              <li onClick={() => closeMenu()}>
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
                  <li onClick={() => closeMenu()}>
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
                  <li onClick={() => closeMenu()}>
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
                  <li onClick={() => closeMenu()}>
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
                  <li onClick={() => closeMenu()}>
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
                  <SignoutLink />
                </div>
              </>
            ) : (
              <>
                <Link href="/register">
                  <li onClick={() => closeMenu()}>
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
                  <li onClick={() => closeMenu()}>
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
