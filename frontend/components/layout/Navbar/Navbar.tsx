import Link from "next/link";
import InboxIcon from "./InboxIcon";
import NotificationsIcon from "./NotificationsIcon";
import AccountDropdown from "./AccountDropdown";
import useWindowSize from "@hooks/useWindowSize";
import { useSnapshot } from "valtio";
import { authState, navigationState } from "store";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const { isAuth, loading } = useSnapshot(authState);
  const { menuOpen } = useSnapshot(navigationState);

  const desktop = (
    <>
      {!loading && (
        <>
          {isAuth ? (
            <div className="icons">
              <InboxIcon />
              <NotificationsIcon />
              <AccountDropdown />
            </div>
          ) : (
            <ul className="auth-links">
              <li>
                <Link href="/register">
                  <a>Create Account</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a>
                    <button>Sign In</button>
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </>
      )}
    </>
  );

  const burgerBtnClick = (menuOpen: boolean) => {
    // Prevents body from scrolling in the background whilst menu is open
    menuOpen
      ? document.body.classList.remove("body-prevent-scroll")
      : document.body.classList.add("body-prevent-scroll");
    navigationState.menuOpen = !menuOpen;
  };

  const mobile = (
    <div className="burger-button" onClick={() => burgerBtnClick(menuOpen)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return (
    <nav
      className={`navbar${
        router.asPath === "/" && !menuOpen ? " no-border-navbar" : ""
      }`}
    >
      <div className="container">
        <div className="links">
          <Link href="/">
            <a className="title">
              <h4>Collabor8</h4>
            </a>
          </Link>
          <ul>
            <li>
              <Link href="/profiles">
                <a>Browse People</a>
              </Link>
            </li>
            <li>
              <Link href="/projects">
                <a>Browse Projects</a>
              </Link>
            </li>
          </ul>
        </div>
        {width !== 0 && <>{width < 920 ? mobile : desktop}</>}
      </div>
    </nav>
  );
};

export default Navbar;
