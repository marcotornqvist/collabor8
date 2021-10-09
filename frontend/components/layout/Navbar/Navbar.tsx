import Link from "next/link";
import InboxIcon from "./InboxIcon";
import NotificationsIcon from "./NotificationsIcon";
import AccountDropdown from "./AccountDropdown";
import { useSnapshot } from "valtio";
import { state } from "store";

const Navbar = () => {
  const { isAuth, loading } = useSnapshot(state);

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/">
          <a className="title">
            <h3>Collabor8</h3>
          </a>
        </Link>
        <ul className="links">
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
        {/* Check loading to not make navigation flicker */}
        {!loading && (
          <>
            {!isAuth ? (
              <div className="buttons">
                <InboxIcon />
                <NotificationsIcon />
                <AccountDropdown />
              </div>
            ) : (
              <ul className="auth-links">
                <li>
                  <Link href="/login">
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

        {/*  */}
      </div>
    </nav>
  );
};

export default Navbar;
