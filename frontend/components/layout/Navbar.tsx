import Link from "next/link";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { state } from "store";
import { LOGOUT_USER } from "@operations-mutations/logout";

const Navbar = () => {
  const router = useRouter();
  const [logout, { client }] = useMutation(LOGOUT_USER);

  const clickHandler = async () => {
    try {
      await logout();
      state.accessToken = "";
      await client!.resetStore();
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <ul style={{ display: "flex", marginBottom: "16px" }}>
          <li style={{ marginRight: "16px" }}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li style={{ marginRight: "16px" }}>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
          <li style={{ marginRight: "16px" }}>
            <Link href="/my-profile">
              <a>My Profile</a>
            </Link>
          </li>
          <li style={{ marginRight: "16px" }}>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li style={{ marginRight: "16px" }} onClick={() => clickHandler()}>
            <a>Sign Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
