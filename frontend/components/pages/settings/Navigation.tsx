import React, { useEffect, useRef, RefObject } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import("scroll-behavior-polyfill");

const Navigation = () => {
  const router = useRouter();
  const pathname = router.pathname.split("/");
  const currentPath = pathname[pathname.length - 1];

  const activeRef: RefObject<HTMLLIElement> = useRef<HTMLLIElement>(null);
  const listRef: RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (activeRef.current && listRef.current) {
      const x: number = activeRef.current.offsetLeft;
      listRef.current.scroll({ left: x - 16, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className="settings-navigation">
      <ul ref={listRef}>
        <Link href="/settings/profile">
          <a>
            <li
              ref={currentPath === "profile" ? activeRef : null}
              className={`list-item${
                currentPath === "profile" ? " active" : ""
              }`}
            >
              <span>Profile Settings</span>
            </li>
          </a>
        </Link>
        <Link href="/settings/account">
          <a>
            <li
              ref={currentPath === "account" ? activeRef : null}
              className={`list-item${
                currentPath === "account" ? " active" : ""
              }`}
            >
              <span>Account Settings</span>
            </li>
          </a>
        </Link>
        <Link href="/settings/socials">
          <a>
            <li
              ref={currentPath === "socials" ? activeRef : null}
              className={`list-item${
                currentPath === "socials" ? " active" : ""
              }`}
            >
              <span>Social Accounts</span>
            </li>
          </a>
        </Link>
      </ul>
      <hr />
    </div>
  );
};

export default Navigation;
