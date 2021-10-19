import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles-modules/Button.module.scss";
import { authState } from "store";
import { useSnapshot } from "valtio";

const About = () => {
  const { isAuth } = useSnapshot(authState);
  return (
    <section className="about">
      <div className="container">
        <div className="wrapper">
          <div className="flex-item">
            <h1>Collabor8</h1>
            <h3>Find other creatives.</h3>
            <p>
              Whether you are looking to hop in on a project or perhaps you have
              a project of your own. Collabor8 will help you find whatever it is
              that you need.
            </p>
            <Link href={isAuth ? "/projects" : "/register"}>
              <a>
                <button className={styles.defaultButton}>
                  {isAuth ? "Browse Projects" : "Create Account"}
                </button>
              </a>
            </Link>
          </div>
          <div className="flex-item">
            <Image
              src="/icons/high-five.svg"
              alt="High five illustration"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
