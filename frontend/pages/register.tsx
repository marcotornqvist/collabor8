import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authState } from "store";
import RegisterForm from "@components-pages/auth/RegisterForm";
import Link from "next/link";
import Branding from "@components-pages/auth/Branding";

const Register = () => {
  const router = useRouter();
  const { isAuth } = useSnapshot(authState);

  useEffect(() => {
    // If authenticated redirect to projects
    if (isAuth) {
      router.push("/projects");
    }
  }, [isAuth]);

  return (
    <div className="register-page">
      <Branding />
      <div className="content">
        <div className="container">
          <div className="text-info">
            <Link href="/">
              <a className="brand">
                <h3>Collabor8</h3>
              </a>
            </Link>
            <h3 className="title">Register</h3>
          </div>
          <hr />
          <RegisterForm />
        </div>
        <span className="credits">Collabor8 © {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Register;
