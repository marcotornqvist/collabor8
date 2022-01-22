import Link from "next/link";
import InboxIcon from "./InboxIcon";
import NotificationsIcon from "./NotificationsIcon";
import AccountDropdown from "./AccountDropdown";
import useWindowSize from "@hooks/useWindowSize";
import { useSnapshot } from "valtio";
import { authState, layoutState } from "store";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

interface Props {
  hide: boolean;
}

const Navbar = ({ hide = false }: Props) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const { isAuth, loading } = useSnapshot(authState);
  const { menuOpen } = useSnapshot(layoutState);

  const desktop = (
    <>
      {!loading && (
        <>
          {isAuth ? (
            <motion.div
              className="icons"
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              <InboxIcon />
              <NotificationsIcon />
              <AccountDropdown />
            </motion.div>
          ) : (
            <motion.ul
              className="auth-links"
              initial="hidden"
              animate="visible"
              variants={variants}
            >
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
            </motion.ul>
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
    layoutState.menuOpen = !menuOpen;
  };

  const mobile = (
    <div className="burger-button" onClick={() => burgerBtnClick(menuOpen)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return (
    <>
      {(width < 920 || !hide) && (
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
                    <a>Browse Profiles</a>
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
      )}
    </>
  );
};

export default Navbar;
