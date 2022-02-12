import Link from "next/link";
import React from "react";
import button from "@/styles-modules/Button.module.scss";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="container">
        <div className="wrapper">
          <h1>404</h1>
          <h3>Page Not Found</h3>
        </div>
        <Link href="/">
          <a>
            <button className={button.lightGreen}>Go to home page</button>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
