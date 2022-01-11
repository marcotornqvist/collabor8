import { useEffect } from "react";
import { useRouter } from "next/router";
import { authState } from "store";
import { useSnapshot } from "valtio";
import Link from "next/link";
import LoginForm from "@components-pages/auth/LoginForm";
import Branding from "@components-pages/auth/Branding";

const Login = () => {
  const router = useRouter();
  const { isAuth } = useSnapshot(authState);

  useEffect(() => {
    // If authenticated redirect to projects
    if (isAuth) {
      router.push("/projects");
    }
  }, [isAuth]);

  return (
    <div className="login-page">
      <Branding />
      <div className="content">
        <div className="container">
          <div className="text-info">
            <Link href="/">
              <a className="brand">
                <h3>Collabor8</h3>
              </a>
            </Link>
            <h3 className="title">Sign In</h3>
          </div>
          <hr />
          <LoginForm />
        </div>
        <span className="credits">Collabor8 © {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Login;
