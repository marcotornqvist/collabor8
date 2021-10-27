import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main-content">
          <div className="title-content">
            <h1>Collabor8</h1>
          </div>
          <div className="links">
            <div className="page-links">
              <h4>Pages</h4>
              <ul>
                <li>
                  <Link href="/profiles">
                    <a>Profiles</a>
                  </Link>
                </li>
                <li>
                  <Link href="/projects">
                    <a>Projects</a>
                  </Link>
                </li>
                <li>
                  <Link href="/my-profile">
                    <a>My Profile</a>
                  </Link>
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
            <div className="contact-links">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:marcotornqvist@gmail.com">
                    marcotornqvist@gmail.com
                  </a>
                </li>
              </ul>
            </div>
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
