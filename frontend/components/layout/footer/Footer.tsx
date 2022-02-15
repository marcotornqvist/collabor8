import { useLoggedInUsernameQuery } from "generated/graphql";
import Link from "next/link";
import React from "react";
import { authState } from "store";
import { useSnapshot } from "valtio";

const Footer = () => {
  const { isAuth } = useSnapshot(authState);
  const { data } = useLoggedInUsernameQuery({
    fetchPolicy: "cache-only",
  });

  const authLinks = (
    <ul>
      <li>
        <Link href={`/profile/${data?.loggedInUser.username}`}>
          <a>My Profile</a>
        </Link>
      </li>
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
      <li>
        <Link href="/create-project">
          <a>Create Project</a>
        </Link>
      </li>
      <li>
        <Link href="/settings/profile">
          <a>Profile Settings</a>
        </Link>
      </li>
      <li>
        <Link href="/settings/account">
          <a>Account Settings</a>
        </Link>
      </li>
      <li>
        <Link href="/settings/socials">
          <a>Social Accounts</a>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
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
      <li>
        <Link href="/register">
          <a>Create Account</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>Sign In</a>
        </Link>
      </li>
    </ul>
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main-content">
          <div className="title-content">
            <h1>Collabor8</h1>
          </div>
          <div className="page-links">
            <h4>Pages</h4>
            <ul>{isAuth ? authLinks : guestLinks}</ul>
          </div>
          <div className="contact-links">
            <h4>About</h4>
            <ul>
              <li>
                <a href="mailto:marcotornqvist@gmail.com">
                  marcotornqvist@gmail.com
                </a>
              </li>
              <li>
                <Link href="/terms">
                  <a>Terms</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a>Privacy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom-content">
        <span>Collabor8 © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
