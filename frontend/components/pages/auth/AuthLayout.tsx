import React, { Children } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authState } from "store";
import Link from "next/link";
import Branding from "@components-pages/auth/Branding";

interface Props {
  children: React.ReactNode;
  title: String;
}

const AuthLayout = ({ children, title }: Props) => {
  const router = useRouter();
  const { isAuth } = useSnapshot(authState);

  const redirect = router.query.redirect;

  useEffect(() => {
    // If there is no redirect query string and user is authenticated, redirect to projects.
    if (typeof redirect !== "string" && isAuth) {
      router.push("/projects");
    }
    return;
  }, [isAuth]);

  return (
    <div className="auth-page">
      <Branding />
      <div className="content">
        <div className="container">
          <div className="text-info">
            <Link href="/">
              <a className="brand">
                <h3>Collabor8</h3>
              </a>
            </Link>
            <h3 className="title">{title}</h3>
          </div>
          <hr />
          {children}
        </div>
        <span className="credits">Collabor8 © {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default AuthLayout;
