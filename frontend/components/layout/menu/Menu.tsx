import { useEffect } from "react";
import Link from "next/link";
import SignoutLink from "@components-modules/global/SignoutLink";
import Image from "next/image";
import { authState, navigationState } from "store";
import { useSnapshot } from "valtio";
import useWindowSize from "@hooks/useWindowSize";

const Menu = () => {
  const { isAuth } = useSnapshot(authState);
  const { width } = useWindowSize();

  // Closes menu if screen size width goes beyond 920px
  useEffect(() => {
    if (width >= 920) {
      navigationState.menuOpen = false;
    }
  }, [width]);

  const closeMenu = () => {
    navigationState.menuOpen = false;
  };

  return (
    <nav className="mobile-menu">
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
        <Link href="/people">
          <li onClick={() => closeMenu()}>
            <a>Browse People</a>
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
            <li onClick={() => closeMenu()}>
              <Link href="/register">
                <a>Create Account</a>
                <Image
                  src="/icons/chevron-right-solid.svg"
                  alt="chevron right"
                  width={16}
                  height={16}
                />
              </Link>
            </li>
            <li onClick={() => closeMenu()}>
              <Link href="/login">
                <a>Sign In</a>
                <Image
                  src="/icons/chevron-right-solid.svg"
                  alt="chevron right"
                  width={16}
                  height={16}
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
