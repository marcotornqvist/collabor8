import Link from "next/link";
import InboxIcon from "./InboxIcon";
import NotificationsIcon from "./NotificationsIcon";
import AccountDropdown from "./AccountDropdown";
import { useSnapshot } from "valtio";
import { authState, navigationState } from "store";
import useWindowSize from "@hooks/useWindowSize";

const Navbar = () => {
  const { width } = useWindowSize();
  const { isAuth, loading } = useSnapshot(authState);
  const { menuOpen } = useSnapshot(navigationState);

  const desktop = (
    <>
      <div className="flex-item">
        <ul className="links">
          <li>
            <Link href="/people">
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
      <div className="flex-item">
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
      </div>
    </>
  );

  const mobile = (
    <div
      className="burger-button"
      onClick={() => (navigationState.menuOpen = !menuOpen)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex-item">
          <Link href="/">
            <a className="title">
              <h4>Collabor8</h4>
            </a>
          </Link>
        </div>
        {width !== 0 && <>{width < 768 ? mobile : desktop}</>}
      </div>
    </nav>
  );
};

export default Navbar;
